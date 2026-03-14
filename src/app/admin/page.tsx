"use client";

import { useEffect, useState, useCallback } from "react";
import { Star, Check, Trash2, RotateCcw } from "lucide-react";
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
        <h1 className="text-2xl font-bold">Testimonials Admin</h1>
        <Button variant="outline" className="rounded-xl text-xs" onClick={() => setAuthed(false)}>
          Logout
        </Button>
      </div>

      {/* Tabs */}
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
        <p className="text-muted-foreground text-sm">Loading...</p>
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
