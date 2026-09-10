import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Public endpoint — returns the current active CV metadata
export async function GET() {
  const cv = await prisma.cvMetadata.findFirst({ orderBy: { updatedAt: "desc" } });
  if (!cv) return NextResponse.json({ cv: null });
  return NextResponse.json({
    cv: {
      fileId: cv.fileId,
      fileName: cv.fileName,
      viewUrl: cv.viewUrl,
      updatedAt: cv.updatedAt,
    },
  });
}
