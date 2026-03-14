/* eslint-disable @next/next/no-img-element */
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DATA } from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";
import ContactSection from "@/components/section/contact-section";
import ProjectsSection from "@/components/section/projects-section";
import TestimonialsSection from "@/components/section/testimonials-section";
import CertificatesSection from "@/components/section/certificates-section";
import HeroStatus from "@/components/hero-status";
import { ArrowUpRight } from "lucide-react";

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  return (
    <main className="min-h-dvh flex flex-col gap-14 relative">
      <section id="hero">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <div className="gap-2 gap-y-6 flex flex-col md:flex-row justify-between">
            <div className="gap-2 flex flex-col order-2 md:order-1">
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="text-3xl font-semibold tracking-tighter sm:text-4xl lg:text-5xl"
                yOffset={8}
                text={`Hi, I'm ${DATA.name.split(" ")[0]}`}
              />
              <BlurFadeText
                className="text-muted-foreground max-w-[600px] md:text-lg lg:text-xl"
                delay={BLUR_FADE_DELAY}
                text={DATA.description}
              />
              <BlurFade delay={BLUR_FADE_DELAY * 2}>
                <HeroStatus />
              </BlurFade>
            </div>
            <BlurFade delay={BLUR_FADE_DELAY} className="order-1 md:order-2">
              <Avatar className="size-24 md:size-32 border rounded-full shadow-lg ring-4 ring-muted">
                <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
                <AvatarFallback>{DATA.initials}</AvatarFallback>
              </Avatar>
            </BlurFade>
          </div>
        </div>
      </section>
      <section id="about">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <h2 className="text-xl font-bold">About</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <div className="prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
              <Markdown>
                {DATA.summary}
              </Markdown>
            </div>
          </BlurFade>
        </div>
      </section>
      {/* <section id="work">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-xl font-bold">Work Experience</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <WorkSection />
          </BlurFade>
        </div>
      </section> */}
      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-8">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <div className="flex flex-col gap-y-4 items-center justify-center">
              <div className="flex items-center w-full">
                <div className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
                <div className="border bg-primary z-10 rounded-xl px-4 py-1">
                  <span className="text-background text-sm font-medium">Skills</span>
                </div>
                <div className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
              </div>
              <div className="flex flex-col gap-y-3 items-center justify-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">What I work with</h2>
                <p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed text-balance text-center">
                  Technologies and tools I use to build software.
                </p>
              </div>
            </div>
          </BlurFade>
          <div className="flex flex-col gap-y-5">
            {DATA.skills.map((group, groupIdx) => (
              <BlurFade key={group.category} delay={BLUR_FADE_DELAY * 6 + groupIdx * 0.05}>
                <div className="flex flex-col gap-y-2">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">{group.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <div key={skill.name} className="border bg-background border-border ring-2 ring-border/20 rounded-xl h-8 w-fit px-4 flex items-center gap-2">
                        {skill.icon && (
                          typeof skill.icon === "string"
                            ? <img src={skill.icon} alt={skill.name} className="size-4 rounded overflow-hidden object-contain" />
                            : <skill.icon className="size-4 rounded overflow-hidden object-contain" />
                        )}
                        <span className="text-foreground text-sm font-medium">{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-8">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <div className="flex flex-col gap-y-4 items-center justify-center">
              <div className="flex items-center w-full">
                <div className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
                <div className="border bg-primary z-10 rounded-xl px-4 py-1">
                  <span className="text-background text-sm font-medium">Education</span>
                </div>
                <div className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
              </div>
              <div className="flex flex-col gap-y-3 items-center justify-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">My Academic Background</h2>
                <p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed text-balance text-center">
                  Where I studied and the degrees I earned.
                </p>
              </div>
            </div>
          </BlurFade>
          <div className="flex flex-col gap-8">
            {DATA.education.map((education, index) => (
              <BlurFade
                key={education.key}
                delay={BLUR_FADE_DELAY * 8 + index * 0.05}
              >
                <Link
                  href={education.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-x-3 justify-between group"
                >
                  <div className="flex items-center gap-x-3 flex-1 min-w-0">
                    {education.logoUrl ? (
                      <img
                        src={education.logoUrl}
                        alt={education.school}
                        className="size-8 md:size-10 rounded-full overflow-hidden object-contain flex-none"
                      />
                    ) : (
                      <div className="size-8 md:size-10 rounded-full bg-muted flex-none" />
                    )}
                    <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                      <div className="font-semibold leading-none flex items-center gap-2">
                        {education.school}
                        <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" aria-hidden />
                      </div>
                      <div className="font-sans text-sm text-muted-foreground">
                        {education.degree}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs tabular-nums text-muted-foreground text-right flex-none">
                    <span>
                      {education.start} {education.start ? "-" : ""} {education.end}
                    </span>
                  </div>
                </Link>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="projects">
        <BlurFade delay={BLUR_FADE_DELAY * 11}>
          <ProjectsSection />
        </BlurFade>
      </section>
      <section id="certifications">
        <BlurFade delay={BLUR_FADE_DELAY * 12}>
          <CertificatesSection />
        </BlurFade>
      </section>
      <section id="testimonials">
        <BlurFade delay={BLUR_FADE_DELAY * 13}>
          <TestimonialsSection />
        </BlurFade>
      </section>
      <section id="contact">
        <BlurFade delay={BLUR_FADE_DELAY * 16}>
          <ContactSection />
        </BlurFade>
      </section>
    </main>
  );
}
