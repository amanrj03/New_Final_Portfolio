"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { Star, Check, Trash2, RotateCcw, Upload, Eye, Download, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type Status = "PENDING" | "APPROVED" | "REJECTED";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  description: string;
  rating: number;
  status: Status;
  createdAt: string;
}

interface CvInfo {
  fileId: string;
  fileName: string;
  viewUrl: string;
  updatedAt: string;
}

const TABS: { label: string; value: Status | "ALL" }[] = [
  { label: "All", value: "ALL" },
  { label: "Pending", value: "PENDING" },
  { label: "Approved", value: "APPROVED" },
  { label: "Rejected", value: "REJECTED" },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star key={s} className={`size-3.5 ${s <= rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"}`} />
      ))}
    </div>
  );
}

// ─── CV Management Section ───────────────────────────────────────────────────

function CvSection({ token }: { token: string }) {
  const [cv, setCv] = useState<CvInfo | null>(null);
  const [folderId, setFolderId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const fetchCvStatus = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/cv", { headers: { "x-admin-token": token } });
    if (res.ok) {
      const data = await res.json();
      setCv(data.cv ?? null);
      setFolderId(data.folderId ?? null);
    }
    setLoading(false);
  }, [token]);

  useEffect(() => { fetchCvStatus(); }, [fetchCvStatus]);

  async function handleReplace(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      setResult({ ok: false, message: "Only PDF files are accepted." });
      return;
    }

    setUploading(true);
    setResult(null);

    const form = new FormData();
    form.append("cv", file);

    const res = await fetch("/api/admin/cv", {
      method: "POST",
      headers: { "x-admin-token": token },
      body: form,
    });
    const data = await res.json();

    if (res.ok && data.success) {
      setResult({
        ok: true,
        message: "✓ CV updated successfully. ✓ Old CV deleted. ✓ New CV uploaded to Google Drive. ✓ Public access enabled. ✓ Portfolio Resume button updated.",
      });
      await fetchCvStatus();
    } else {
      setResult({ ok: false, message: data.error ?? "Upload failed." });
    }

    setUploading(false);
    // reset file input
    if (fileRef.current) fileRef.current.value = "";
  }

  if (loading) {
    return (
      <div className="border border-border rounded-xl p-5 bg-card flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="size-4 animate-spin" /> Loading CV status…
      </div>
    );
  }

  const folderConfigured = !!folderId;

  return (
    <div className="border border-border rounded-xl p-5 bg-card flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-base">CV Management</h2>
        {cv && (
          <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
            Active
          </span>
        )}
      </div>

      {/* Status rows */}
      <div className="flex flex-col gap-1.5 text-sm">
        <div className="flex items-center gap-2">
          {cv ? <CheckCircle2 className="size-4 text-green-500 shrink-0" /> : <AlertCircle className="size-4 text-yellow-500 shrink-0" />}
          <span className="text-muted-foreground">Current CV:</span>
          <span className="font-medium">{cv ? cv.fileName : "None uploaded yet"}</span>
        </div>
        <div className="flex items-center gap-2">
          {folderConfigured ? <CheckCircle2 className="size-4 text-green-500 shrink-0" /> : <AlertCircle className="size-4 text-red-500 shrink-0" />}
          <span className="text-muted-foreground">Google Drive Folder:</span>
          <span className="font-medium">{folderConfigured ? "✓ Configured" : "✗ GOOGLE_DRIVE_CV_FOLDER_ID not set"}</span>
        </div>
        <div className="flex items-center gap-2">
          {cv ? <CheckCircle2 className="size-4 text-green-500 shrink-0" /> : <AlertCircle className="size-4 text-muted-foreground shrink-0" />}
          <span className="text-muted-foreground">Public Access:</span>
          <span className="font-medium">{cv ? "✓ Anyone with the link → Viewer" : "—"}</span>
        </div>
        {cv && (
          <div className="flex items-center gap-2">
            <CheckCircle2 className="size-4 text-green-500 shrink-0" />
            <span className="text-muted-foreground">Last Updated:</span>
            <span className="font-medium">{new Date(cv.updatedAt).toLocaleString("en-IN")}</span>
          </div>
        )}
      </div>

      {/* Actions */}
      {cv && (
        <div className="flex gap-2 flex-wrap">
          <a href={cv.viewUrl} target="_blank" rel="noopener noreferrer">
            <Button size="sm" variant="outline" className="rounded-lg gap-1.5">
              <Eye className="size-3.5" /> Preview CV
            </Button>
          </a>
          <a href={`https://drive.google.com/uc?export=download&id=${cv.fileId}`} target="_blank" rel="noopener noreferrer">
            <Button size="sm" variant="outline" className="rounded-lg gap-1.5">
              <Download className="size-3.5" /> Download CV
            </Button>
          </a>
        </div>
      )}

      {/* Upload / Replace */}
      {!folderConfigured ? (
        <div className="rounded-lg border border-yellow-300 bg-yellow-50 dark:bg-yellow-900/10 dark:border-yellow-700 p-4 text-sm text-yellow-800 dark:text-yellow-300 flex flex-col gap-2">
          <p className="font-semibold">Setup required</p>
          <ol className="list-decimal list-inside space-y-1 text-xs">
            <li>Open Google Drive and create a folder, e.g. <code>Portfolio/CV</code></li>
            <li>Open the folder — copy its ID from the URL: <code>drive.google.com/drive/folders/<strong>THIS_PART</strong></code></li>
            <li>Add <code>GOOGLE_DRIVE_CV_FOLDER_ID=&lt;id&gt;</code> to your <code>.env</code> file</li>
            <li>Also add your service account credentials: <code>GOOGLE_CLIENT_EMAIL</code> and <code>GOOGLE_PRIVATE_KEY</code></li>
            <li>Share the folder with your service account email (Editor access)</li>
            <li>Restart the dev server</li>
          </ol>
        </div>
      ) : (
        <div>
          <input
            ref={fileRef}
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={handleReplace}
            disabled={uploading}
          />
          <Button
            size="sm"
            className="rounded-lg gap-1.5"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? <Loader2 className="size-3.5 animate-spin" /> : <Upload className="size-3.5" />}
            {uploading ? "Uploading…" : cv ? "Replace CV" : "Upload CV"}
          </Button>
        </div>
      )}

      {/* Result message */}
      {result && (
        <div className={`rounded-lg border p-3 text-xs leading-relaxed ${result.ok ? "border-green-300 bg-green-50 dark:bg-green-900/10 dark:border-green-700 text-green-800 dark:text-green-300" : "border-red-300 bg-red-50 dark:bg-red-900/10 dark:border-red-700 text-red-800 dark:text-red-300"}`}>
          {result.message}
        </div>
      )}
    </div>
  );
}

// ─── Main Admin Page ─────────────────────────────────────────────────────────

export default function AdminPage() {
  const [token, setToken] = useState("");
  const [authed, setAuthed] = useState(false);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [tab, setTab] = useState<Status | "ALL">("ALL");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTestimonials = useCallback(async (t: string) => {
    setLoading(true);
    const url = tab === "ALL" ? "/api/admin/testimonials" : `/api/admin/testimonials?status=${tab}`;
    const res = await fetch(url, { headers: { "x-admin-token": t } });
    if (res.status === 401) { setAuthed(false); setError("Invalid token"); setLoading(false); return; }
    const data = await res.json();
    setTestimonials(data);
    setLoading(false);
  }, [tab]);

  useEffect(() => {
    if (authed) fetchTestimonials(token);
  }, [authed, tab, fetchTestimonials, token]);

  async function updateStatus(id: string, status: Status) {
    await fetch(`/api/admin/testimonials/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "x-admin-token": token },
      body: JSON.stringify({ status }),
    });
    fetchTestimonials(token);
  }

  async function deleteTestimonial(id: string) {
    if (!confirm("Delete this testimonial?")) return;
    await fetch(`/api/admin/testimonials/${id}`, {
      method: "DELETE",
      headers: { "x-admin-token": token },
    });
    fetchTestimonials(token);
  }

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col gap-4 w-full max-w-sm border border-border rounded-2xl p-8 bg-card">
          <h1 className="text-xl font-semibold">Admin Login</h1>
          <input
            type="password"
            placeholder="Enter admin secret"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && setAuthed(true)}
            className="w-full rounded-xl border border-border px-3 py-2.5 text-sm bg-background outline-none focus:ring-2 focus:ring-primary/30"
          />
          {error && <p className="text-xs text-red-500">{error}</p>}
          <Button className="rounded-xl" onClick={() => { setError(""); setAuthed(true); }}>
            Login
          </Button>
        </div>
      </div>
    );
  }

  const filtered = tab === "ALL" ? testimonials : testimonials.filter((t) => t.status === tab);

  return (
    <div className="min-h-screen p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <Button variant="outline" className="rounded-xl text-xs" onClick={() => setAuthed(false)}>
          Logout
        </Button>
      </div>

      {/* CV Management */}
      <div className="mb-10">
        <CvSection token={token} />
      </div>

      {/* Testimonials */}
      <h2 className="text-xl font-semibold mb-4">Testimonials</h2>
      <div className="flex gap-2 mb-6">
        {TABS.map((t) => (
          <button
            key={t.value}
            onClick={() => setTab(t.value)}
            className={`px-4 py-1.5 rounded-xl text-sm font-medium border transition-colors ${tab === t.value ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:text-foreground"}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-muted-foreground text-sm">Loading…</p>
      ) : filtered.length === 0 ? (
        <p className="text-muted-foreground text-sm">No testimonials found.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {filtered.map((t) => (
            <div key={t.id} className="border border-border rounded-xl p-5 bg-card flex flex-col gap-3">
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-0.5">
                  <span className="font-semibold">{t.name}</span>
                  <span className="text-xs text-muted-foreground">{t.role} · {t.company}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${t.status === "APPROVED" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : t.status === "REJECTED" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"}`}>
                    {t.status}
                  </span>
                  <StarRating rating={t.rating} />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">&ldquo;{t.description}&rdquo;</p>
              <div className="flex gap-2 pt-1 border-t border-border">
                {t.status !== "APPROVED" && (
                  <Button size="sm" variant="outline" className="rounded-lg gap-1.5 text-green-600 border-green-200 hover:bg-green-50 dark:hover:bg-green-900/20" onClick={() => updateStatus(t.id, "APPROVED")}>
                    <Check className="size-3.5" /> Approve
                  </Button>
                )}
                {t.status !== "PENDING" && (
                  <Button size="sm" variant="outline" className="rounded-lg gap-1.5" onClick={() => updateStatus(t.id, "PENDING")}>
                    <RotateCcw className="size-3.5" /> Move to Pending
                  </Button>
                )}
                {t.status !== "APPROVED" && (
                  <Button size="sm" variant="outline" className="rounded-lg gap-1.5 text-red-600 border-red-200 hover:bg-red-50 dark:hover:bg-red-900/20" onClick={() => deleteTestimonial(t.id)}>
                    <Trash2 className="size-3.5" /> Reject & Delete
                  </Button>
                )}
                {t.status === "APPROVED" && (
                  <Button size="sm" variant="outline" className="rounded-lg gap-1.5 text-red-600 border-red-200 hover:bg-red-50 dark:hover:bg-red-900/20 ml-auto" onClick={() => deleteTestimonial(t.id)}>
                    <Trash2 className="size-3.5" /> Delete
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
