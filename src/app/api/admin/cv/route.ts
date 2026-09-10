import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  listCvFilesInFolder,
  uploadCvToFolder,
  makeFilePublic,
  deleteFile,
  buildViewUrl,
} from "@/lib/google-drive";

function isAuthorized(req: NextRequest) {
  return req.headers.get("x-admin-token") === process.env.ADMIN_SECRET;
}

// GET — return current CV status for the admin dashboard
export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const cv = await prisma.cvMetadata.findFirst({ orderBy: { updatedAt: "desc" } });
  const folderId = process.env.GOOGLE_DRIVE_CV_FOLDER_ID ?? null;

  return NextResponse.json({ cv, folderId });
}

// POST — replace (or create) the active CV
export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const folderId = process.env.GOOGLE_DRIVE_CV_FOLDER_ID;
  if (!folderId) {
    return NextResponse.json(
      {
        error:
          "GOOGLE_DRIVE_CV_FOLDER_ID is not set. Create a folder in Google Drive, copy its ID from the URL, and add it to your .env file.",
      },
      { status: 500 }
    );
  }

  // Parse multipart form
  const formData = await req.formData();
  const file = formData.get("cv") as File | null;
  if (!file) return NextResponse.json({ error: "No file provided." }, { status: 400 });
  if (file.type !== "application/pdf") {
    return NextResponse.json({ error: "Only PDF files are accepted." }, { status: 400 });
  }

  // Sanitise filename — always normalise to Aman_Ranjan_CV.pdf
  const fileName = "Aman_Ranjan_CV.pdf";

  // Read the existing CV record (to delete later, only after success)
  const existingCv = await prisma.cvMetadata.findFirst({ orderBy: { updatedAt: "desc" } });

  // Also find any orphan files in the folder (belt-and-suspenders)
  const orphanFiles = await listCvFilesInFolder(folderId);

  // --- Step 1: Upload new CV ---
  const buffer = Buffer.from(await file.arrayBuffer());
  let newFileId: string;
  try {
    newFileId = await uploadCvToFolder(folderId, fileName, buffer);
  } catch (err) {
    return NextResponse.json(
      { error: `Upload to Google Drive failed: ${(err as Error).message}` },
      { status: 500 }
    );
  }

  // --- Step 2: Make new CV public ---
  try {
    await makeFilePublic(newFileId);
  } catch (err) {
    // Clean up the just-uploaded file so Drive stays tidy
    await deleteFile(newFileId).catch(() => {});
    return NextResponse.json(
      { error: `Setting public permission failed: ${(err as Error).message}` },
      { status: 500 }
    );
  }

  const viewUrl = buildViewUrl(newFileId);

  // --- Step 3: Persist to database ---
  try {
    if (existingCv) {
      await prisma.cvMetadata.update({
        where: { id: existingCv.id },
        data: { fileId: newFileId, fileName, folderId, viewUrl },
      });
    } else {
      await prisma.cvMetadata.create({
        data: { fileId: newFileId, fileName, folderId, viewUrl },
      });
    }
  } catch (err) {
    // DB failed — clean up the new upload, keep old CV intact
    await deleteFile(newFileId).catch(() => {});
    return NextResponse.json(
      { error: `Database update failed: ${(err as Error).message}` },
      { status: 500 }
    );
  }

  // --- Step 4: Delete old CV files from Drive (only after DB is updated) ---
  const deletedIds: string[] = [];
  const failedDeletes: string[] = [];

  // Delete the previous DB-tracked file
  if (existingCv && existingCv.fileId !== newFileId) {
    try {
      await deleteFile(existingCv.fileId);
      deletedIds.push(existingCv.fileId);
    } catch {
      failedDeletes.push(existingCv.fileId);
    }
  }

  // Delete any other orphan files that were already in the folder
  for (const f of orphanFiles) {
    if (f.id && f.id !== newFileId && !deletedIds.includes(f.id)) {
      try {
        await deleteFile(f.id);
        deletedIds.push(f.id);
      } catch {
        failedDeletes.push(f.id ?? "unknown");
      }
    }
  }

  return NextResponse.json({
    success: true,
    fileId: newFileId,
    fileName,
    viewUrl,
    deletedIds,
    failedDeletes,
  });
}
