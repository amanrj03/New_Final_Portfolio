/* eslint-disable @next/next/no-img-element */
import BlurFade from "@/components/magicui/blur-fade";
import { DATA } from "@/data/resume";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import CertificateRow from "@/components/certificate-row";

const BLUR_FADE_DELAY = 0.04;
const PREVIEW_COUNT = 4;

export default function CertificatesSection() {
  const preview = DATA.certificates.slice(0, PREVIEW_COUNT);

  return (
    <section id="certifications">
      <div className="flex min-h-0 flex-col gap-y-8">
        <BlurFade delay={BLUR_FADE_DELAY * 12}>
          <div className="flex flex-col gap-y-4 items-center justify-center">
            <div className="flex items-center w-full">
              <div className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-foreground/25 via-95% to-transparent" />
              <div className="border bg-primary z-10 rounded-xl px-4 py-1">
                <span className="text-background text-sm font-medium">Certifications</span>
              </div>
              <div className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-foreground/25 via-95% to-transparent" />
            </div>
            <div className="flex flex-col gap-y-3 items-center justify-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Certifications</h2>
              <p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed text-balance text-center">
                Courses and certifications I&apos;ve completed.
              </p>
            </div>
          </div>
        </BlurFade>

        <div className="flex flex-col divide-y divide-border border border-border rounded-xl overflow-hidden">
          {preview.map((cert, i) => (
            <BlurFade key={`${cert.title}-${i}`} delay={BLUR_FADE_DELAY * 13 + i * 0.05}>
              <CertificateRow cert={cert} />
            </BlurFade>
          ))}
        </div>

        <BlurFade delay={BLUR_FADE_DELAY * 14} className="flex justify-center">
          <Link
            href="/certificates"
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            See all certificates <ArrowRight className="size-4" />
          </Link>
        </BlurFade>
      </div>
    </section>
  );
}
