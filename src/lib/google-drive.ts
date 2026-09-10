import { google } from "googleapis";
import { Readable } from "stream";

function getDriveClient() {
  // No redirect URI needed here — the backend only uses the refresh token
  // to silently obtain new access tokens; it never performs an auth redirect.
  const oauth2 = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );
  oauth2.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  });
  return google.drive({ version: "v3", auth: oauth2 });
}

/** Find all CV files currently in the configured folder */
export async function listCvFilesInFolder(folderId: string) {
  const drive = getDriveClient();
  const res = await drive.files.list({
    q: `'${folderId}' in parents and trashed = false`,
    fields: "files(id, name)",
    spaces: "drive",
  });
  return res.data.files ?? [];
}

/** Upload a buffer as a PDF into the folder, return the new file id */
export async function uploadCvToFolder(
  folderId: string,
  fileName: string,
  buffer: Buffer
): Promise<string> {
  const drive = getDriveClient();
  const readable = Readable.from(buffer);

  const res = await drive.files.create({
    requestBody: {
      name: fileName,
      parents: [folderId],
      mimeType: "application/pdf",
    },
    media: {
      mimeType: "application/pdf",
      body: readable,
    },
    fields: "id",
  });

  const fileId = res.data.id;
  if (!fileId) throw new Error("Google Drive did not return a file ID.");
  return fileId;
}

/** Set a file to "anyone with the link → viewer" */
export async function makeFilePublic(fileId: string): Promise<void> {
  const drive = getDriveClient();
  await drive.permissions.create({
    fileId,
    requestBody: {
      role: "reader",
      type: "anyone",
    },
  });
}

/** Delete a file by id */
export async function deleteFile(fileId: string): Promise<void> {
  const drive = getDriveClient();
  await drive.files.delete({ fileId });
}

/** Build a public view URL from a file id */
export function buildViewUrl(fileId: string): string {
  return `https://drive.google.com/file/d/${fileId}/view?usp=sharing`;
}
