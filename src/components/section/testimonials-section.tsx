"use client";

import { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, Quote, Star } from "lucide-react";
import BlurFade from "@/components/magicui/blur-fade";
import { Button } from "@/components/ui/button";

const BLUR_FADE_DELAY = 0.04;

interface Testimonial {
  name: string;
  role: string;
  company: string;
  description: string;
  rating: number;
}

const SAMPLE_TESTIMONIALS: Testimonial[] = [];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`size-3.5 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"}`}
        />
      ))}
    </div>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="flex flex-col gap-3 border border-border rounded-xl p-5 bg-card h-full">
      <div className="flex items-start justify-between gap-2">
        <Quote className="size-5 text-primary/40 shrink-0 mt-0.5" />
        <StarRating rating={t.rating} />
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed flex-1">
        &ldquo;{t.description}&rdquo;
      </p>
      <div className="flex items-center gap-3 pt-2 border-t border-border">
        <div className="size-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <span className="text-sm font-semibold text-primary">
            {t.name.charAt(0)}
          </span>
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-semibold truncate">{t.name}</span>
          <span className="text-xs text-muted-foreground truncate">
            {t.role} · {t.company}
          </span>
        </div>
      </div>
    </div>
  );
}

function countWords(str: string) {
  return str.trim() === "" ? 0 : str.trim().split(/\s+/).length;
}

function TestimonialModal({ onSubmit }: { onSubmit: () => void }) {
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
    if (words.length <= 50) {
      setForm((f) => ({ ...f, description: val }));
    } else {
      // allow editing but cap at 50 words
      setForm((f) => ({ ...f, description: words.slice(0, 50).join(" ") }));
    }
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
        onSubmit();
        setTimeout(() => { setOpen(false); setSuccess(false); }, 1500);
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button variant="outline" className="rounded-xl px-6">
          Submit Testimonial
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border bg-card p-6 shadow-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
          <div className="flex items-center justify-between mb-5">
            <div>
              <Dialog.Title className="text-lg font-semibold">Submit a Testimonial</Dialog.Title>
              <Dialog.Description className="text-xs text-muted-foreground mt-0.5">
                Share your experience working with Aman.
              </Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <button className="rounded-lg p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                <X className="size-4" />
              </button>
            </Dialog.Close>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Full Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">Full Name</label>
              <input
                type="text"
                placeholder="e.g. Rahul Sharma"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className={`w-full rounded-xl border px-3 py-2.5 text-sm bg-background outline-none transition-colors placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30 ${errors.name ? "border-red-500 focus:ring-red-500/30" : "border-border"}`}
              />
              {errors.name && <span className="text-xs text-red-500">{errors.name}</span>}
            </div>

            {/* Role + Company */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium">Role</label>
                <input
                  type="text"
                  placeholder="e.g. Senior Engineer"
                  value={form.role}
                  onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                  className={`w-full rounded-xl border px-3 py-2.5 text-sm bg-background outline-none transition-colors placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30 ${errors.role ? "border-red-500 focus:ring-red-500/30" : "border-border"}`}
                />
                {errors.role && <span className="text-xs text-red-500">{errors.role}</span>}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium">Company</label>
                <input
                  type="text"
                  placeholder="e.g. Google"
                  value={form.company}
                  onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                  className={`w-full rounded-xl border px-3 py-2.5 text-sm bg-background outline-none transition-colors placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30 ${errors.company ? "border-red-500 focus:ring-red-500/30" : "border-border"}`}
                />
                {errors.company && <span className="text-xs text-red-500">{errors.company}</span>}
              </div>
            </div>

            {/* Star Rating */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">Rating</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHovered(star)}
                    onMouseLeave={() => setHovered(0)}
                    onClick={() => setRating(star)}
                    className="p-0.5 transition-transform hover:scale-110"
                  >
                    <Star
                      className={`size-6 transition-colors ${star <= (hovered || rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"}`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Description</label>
                <span className={`text-xs ${wordsLeft < 10 ? "text-red-500" : "text-muted-foreground"}`}>
                  {wordsLeft} words left
                </span>
              </div>
              <textarea
                rows={4}
                placeholder="Share your experience in up to 50 words..."
                value={form.description}
                onChange={(e) => handleDescriptionChange(e.target.value)}
                className={`w-full rounded-xl border px-3 py-2.5 text-sm bg-background outline-none transition-colors placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30 resize-none ${errors.description ? "border-red-500 focus:ring-red-500/30" : "border-border"}`}
              />
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

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(SAMPLE_TESTIMONIALS);

  useEffect(() => {
    fetch("/api/testimonials")
      .then((r) => r.json())
      .then((data) => setTestimonials(data))
      .catch(() => {});
  }, []);

  return (
    <section id="testimonials">
      <div className="flex min-h-0 flex-col gap-y-8">
        <BlurFade delay={BLUR_FADE_DELAY * 14}>
          <div className="flex flex-col gap-y-4 items-center justify-center">
            <div className="flex items-center w-full">
              <div className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
              <div className="border bg-primary z-10 rounded-xl px-4 py-1">
                <span className="text-background text-sm font-medium">Testimonials</span>
              </div>
              <div className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
            </div>
            <div className="flex flex-col gap-y-3 items-center justify-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">What people say</h2>
              <p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed text-balance text-center">
                Kind words from seniors and colleagues I&apos;ve had the pleasure of working with.
              </p>
            </div>
          </div>
        </BlurFade>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {testimonials.length === 0 ? (
            <div className="col-span-2 flex flex-col items-center justify-center gap-2 py-12 text-center border border-dashed border-border rounded-xl">
              <p className="text-muted-foreground text-sm">No testimonials yet. Be the first to submit one!</p>
            </div>
          ) : (
            testimonials.map((t, i) => (
              <BlurFade key={i} delay={BLUR_FADE_DELAY * 15 + i * 0.05}>
                <TestimonialCard t={t} />
              </BlurFade>
            ))
          )}
        </div>

        <BlurFade delay={BLUR_FADE_DELAY * 16} className="flex justify-center">
          <TestimonialModal onSubmit={() => {}} />
        </BlurFade>
      </div>
    </section>
  );
}
