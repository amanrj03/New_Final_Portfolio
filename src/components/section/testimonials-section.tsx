import { Quote, Star } from "lucide-react";
import BlurFade from "@/components/magicui/blur-fade";
import { prisma } from "@/lib/prisma";
import TestimonialModal from "@/components/testimonial-modal";

const BLUR_FADE_DELAY = 0.04;

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  description: string;
  rating: number;
}

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
          <span className="text-sm font-semibold text-primary">{t.name.charAt(0)}</span>
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-semibold truncate">{t.name}</span>
          <span className="text-xs text-muted-foreground truncate">{t.role} · {t.company}</span>
        </div>
      </div>
    </div>
  );
}

export default async function TestimonialsSection() {
  const testimonials = await prisma.testimonial.findMany({
    where: { status: "APPROVED" },
    orderBy: { createdAt: "desc" },
  });

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
              <BlurFade key={t.id} delay={BLUR_FADE_DELAY * 15 + i * 0.05}>
                <TestimonialCard t={t} />
              </BlurFade>
            ))
          )}
        </div>

        <BlurFade delay={BLUR_FADE_DELAY * 16} className="flex justify-center">
          <TestimonialModal />
        </BlurFade>
      </div>
    </section>
  );
}
