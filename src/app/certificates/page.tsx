import BlurFade from "@/components/magicui/blur-fade";
import { DATA } from "@/data/resume";
import CertificateRow from "@/components/certificate-row";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const BLUR_FADE_DELAY = 0.04;

export default function CertificatesPage() {
  return (
    <main className="min-h-dvh flex flex-col gap-8">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <Link
          href="/"
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
        >
          <ArrowLeft className="size-4" /> Back
        </Link>
      </BlurFade>

      <BlurFade delay={BLUR_FADE_DELAY * 2}>
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tighter">All Certifications</h1>
          <p className="text-muted-foreground">Every course and certification I&apos;ve completed.</p>
        </div>
      </BlurFade>

      <div className="flex flex-col divide-y divide-border border border-border rounded-xl overflow-hidden">
        {DATA.certificates.map((cert, i) => (
          <BlurFade key={`${cert.title}-${i}`} delay={BLUR_FADE_DELAY * 3 + i * 0.05}>
            <CertificateRow cert={cert} />
          </BlurFade>
        ))}
      </div>
    </main>
  );
}
