"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

function countWords(str: string) {
  return str.trim() === "" ? 0 : str.trim().split(/\s+/).length;
}

export default function TestimonialModal() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", role: "", company: "", description: "" });
  const [rating, setRating] = useState(5);
  const [hovered, setHovered] = useState(0);
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const wordCount = countWords(form.description);
  const wordsLeft = 50 - wordCount;

  function handleDescriptionChange(val: string) {
    const words = val.trim() === "" ? [] : val.trim().split(/\s+/);
    setForm((f) => ({ ...f, description: words.length <= 50 ? val : words.slice(0, 50).join(" ") }));
  }

  function validate() {
    const e: Partial<typeof form> = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.role.trim()) e.role = "Role is required";
    if (!form.company.trim()) e.company = "Company is required";
    if (!form.description.trim()) e.description = "Description is required";
    else if (wordCount > 50) e.description = "Max 50 words allowed";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, rating }),
      });
      if (res.ok) {
        setSuccess(true);
        setForm({ name: "", role: "", company: "", description: "" });
        setRating(5);
        setErrors({});
        setTimeout(() => { setOpen(false); setSuccess(false); }, 1500);
      }
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass = (err?: string) =>
    `w-full rounded-xl border px-3 py-2.5 text-sm bg-background outline-none transition-colors placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30 ${err ? "border-red-500 focus:ring-red-500/30" : "border-border"}`;

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button variant="outline" className="rounded-xl px-6">Submit Testimonial</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 duration-200" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border bg-card p-6 shadow-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 duration-200">
          <div className="flex items-center justify-between mb-5">
            <div>
              <Dialog.Title className="text-lg font-semibold">Submit a Testimonial</Dialog.Title>
              <Dialog.Description className="text-xs text-muted-foreground mt-0.5">Share your experience working with Aman.</Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <button className="rounded-lg p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                <X className="size-4" />
              </button>
            </Dialog.Close>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">Full Name</label>
              <input type="text" placeholder="e.g. Rahul Sharma" value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className={inputClass(errors.name)} />
              {errors.name && <span className="text-xs text-red-500">{errors.name}</span>}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium">Role</label>
                <input type="text" placeholder="e.g. Senior Engineer" value={form.role}
                  onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                  className={inputClass(errors.role)} />
                {errors.role && <span className="text-xs text-red-500">{errors.role}</span>}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium">Company</label>
                <input type="text" placeholder="e.g. Google" value={form.company}
                  onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                  className={inputClass(errors.company)} />
                {errors.company && <span className="text-xs text-red-500">{errors.company}</span>}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">Rating</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} type="button"
                    onMouseEnter={() => setHovered(star)} onMouseLeave={() => setHovered(0)}
                    onClick={() => setRating(star)} className="p-0.5 transition-transform hover:scale-110">
                    <Star className={`size-6 transition-colors ${star <= (hovered || rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"}`} />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Description</label>
                <span className={`text-xs ${wordsLeft < 10 ? "text-red-500" : "text-muted-foreground"}`}>{wordsLeft} words left</span>
              </div>
              <textarea rows={4} placeholder="Share your experience in up to 50 words..." value={form.description}
                onChange={(e) => handleDescriptionChange(e.target.value)}
                className={`${inputClass(errors.description)} resize-none`} />
              {errors.description && <span className="text-xs text-red-500">{errors.description}</span>}
            </div>

            <Button type="submit" className="w-full rounded-xl mt-1" disabled={submitting}>
              {success ? "Submitted! Under review." : submitting ? "Submitting..." : "Submit Testimonial"}
            </Button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
