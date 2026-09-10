/**
 * One-time script to obtain a Google OAuth refresh token.
 *
 * Uses a local HTTP callback server on http://localhost:4242/oauth2callback
 * — a currently supported flow (no deprecated OOB).
 *
 * Prerequisites
 * ─────────────
 * 1. Go to https://console.cloud.google.com/
 * 2. Select your project → APIs & Services → Enabled APIs → enable "Google Drive API"
 * 3. APIs & Services → OAuth consent screen
 *      • User type: External
 *      • Fill in App name, support email, developer email → Save
 *      • Scopes: skip (the script requests the scope at runtime)
 *      • Test users: add YOUR Google account email → Save
 * 4. APIs & Services → Credentials → Create Credentials → OAuth 2.0 Client ID
 *      • Application type: Web application   ← must be Web, NOT Desktop
 *      • Name: anything (e.g. "Portfolio local")
 *      • Authorised redirect URIs: add exactly →  http://localhost:4242/oauth2callback
 *      • Save → copy Client ID and Client Secret into .env
 * 5. Fill .env:
 *      GOOGLE_CLIENT_ID="..."
 *      GOOGLE_CLIENT_SECRET="..."
 * 6. Run:
 *      node scripts/get-refresh-token.mjs
 *
 * Why https://www.googleapis.com/auth/drive and not drive.file?
 * ─────────────────────────────────────────────────────────────
 * The portfolio backend needs to:
 *   • files.list  — find the old CV in the folder on a cold server start
 *   • files.delete — delete the old CV (which may have been uploaded in a
 *                    previous server session)
 *   • files.create — upload the new CV
 *   • permissions.create — make the new CV public
 *
 * The drive.file scope only grants access to files created in the *current*
 * OAuth session. A previously uploaded CV from a prior session would be
 * invisible and un-deletable under drive.file. The full drive scope is
 * therefore the minimum that makes the safe-replacement flow work correctly.
 */

import http from "http";
import { google } from "googleapis";
import { config } from "dotenv";
import { exec } from "child_process";
import { URL } from "url";

config();

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error(
    "\n✗ GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET must be set in .env before running this script.\n"
  );
  process.exit(1);
}

const PORT = 4242;
const REDIRECT_URI = `http://localhost:${PORT}/oauth2callback`;
const SCOPE = "https://www.googleapis.com/auth/drive";

const oauth2 = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const authUrl = oauth2.generateAuthUrl({
  access_type: "offline",
  prompt: "consent", // force refresh_token to always be returned
  scope: [SCOPE],
});

// Start a temporary local server to catch the redirect
const server = http.createServer(async (req, res) => {
  if (!req.url?.startsWith("/oauth2callback")) return;

  const params = new URL(req.url, `http://localhost:${PORT}`).searchParams;
  const code = params.get("code");
  const error = params.get("error");

  if (error || !code) {
    res.writeHead(400, { "Content-Type": "text/html" });
    res.end("<h2>Authorization failed or was denied.</h2><p>Check your terminal.</p>");
    console.error("\n✗ Authorization error:", error ?? "no code returned");
    server.close();
    process.exit(1);
  }

  try {
    const { tokens } = await oauth2.getToken(code);

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(
      "<h2 style='font-family:sans-serif;color:green'>✓ Authorization successful!</h2>" +
      "<p style='font-family:sans-serif'>You can close this tab and return to your terminal.</p>"
    );

    console.log("\n✓ Authorization successful!\n");

    if (!tokens.refresh_token) {
      console.warn(
        "⚠  No refresh_token was returned. This usually means the account already\n" +
        "   granted access previously. To force a new refresh token:\n" +
        "   1. Go to https://myaccount.google.com/permissions\n" +
        "   2. Remove access for your app\n" +
        "   3. Run this script again\n"
      );
    } else {
      console.log("Add this line to your .env file:\n");
      console.log(`GOOGLE_REFRESH_TOKEN="${tokens.refresh_token}"\n`);
    }
  } catch (err) {
    res.writeHead(500, { "Content-Type": "text/html" });
    res.end("<h2>Token exchange failed.</h2><p>Check your terminal.</p>");
    console.error("\n✗ Token exchange failed:", err.message);
  } finally {
    server.close();
  }
});

server.listen(PORT, () => {
  console.log("\nOpening your browser for Google authorization...");
  console.log("(If the browser does not open, visit this URL manually:)\n");
  console.log(authUrl, "\n");

  // Try to open the browser automatically
  const cmd =
    process.platform === "win32"
      ? `start "" "${authUrl}"`
      : process.platform === "darwin"
      ? `open "${authUrl}"`
      : `xdg-open "${authUrl}"`;

  exec(cmd, (err) => {
    if (err) {
      // Non-fatal — user can open manually
    }
  });

  console.log(`Waiting for Google to redirect to http://localhost:${PORT}/oauth2callback ...\n`);
});
