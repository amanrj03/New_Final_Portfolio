"use client"

import React, { forwardRef, useRef } from "react"

import { cn } from "@/lib/utils"
import { AnimatedBeam } from "@/components/ui/animated-beam"
import BlurFade from "@/components/magicui/blur-fade"

const BLUR_FADE_DELAY = 0.04

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-2 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      {children}
    </div>
  )
})

Circle.displayName = "Circle"
function SocialBeam() {
  const containerRef = useRef<HTMLDivElement>(null)
  const div1Ref = useRef<HTMLDivElement>(null)
  const div2Ref = useRef<HTMLDivElement>(null)
  const div3Ref = useRef<HTMLDivElement>(null)
  const div4Ref = useRef<HTMLDivElement>(null)
  const div5Ref = useRef<HTMLDivElement>(null)
  const div6Ref = useRef<HTMLDivElement>(null)
  const div7Ref = useRef<HTMLDivElement>(null)

  return (
    <div
      className="relative flex h-[300px] w-full items-center justify-center overflow-hidden p-10"
      ref={containerRef}
    >
      <div className="flex size-full max-h-[200px] max-w-lg flex-col items-stretch justify-between gap-10">
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div1Ref}>
            <a
              href="https://leetcode.com/u/amanrj03"
              target="_blank"
              rel="noopener noreferrer"
              className="flex size-full items-center justify-center transition-transform hover:scale-110"
            >            
            <img src={Icons.github} alt="github" />
            </a>
          </Circle>
          <Circle ref={div5Ref}>
            <a
              href="https://leetcode.com/u/amanrj03"
              target="_blank"
              rel="noopener noreferrer"
              className="flex size-full items-center justify-center transition-transform hover:scale-110"
            >
              <img src={Icons.leetcode} alt="leetcode" />
            </a>
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div2Ref}>
            <a 
              href="https://x.com/amanrj03" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex size-full items-center justify-center transition-transform hover:scale-110"
            >
              <img src={Icons.x} alt="x" />
            </a>
          </Circle>
          <Circle ref={div4Ref} className="size-16">
            <a 
              href="/"
              rel="noopener noreferrer" 
              className="flex size-full items-center justify-center transition-transform hover:scale-110"
            >
              <img src={Icons.aman} alt="aman" />
            </a>
          </Circle>
          <Circle ref={div6Ref}>
            <a 
              href="https://codeforces.com/profile/amanrj03" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex size-full items-center justify-center transition-transform hover:scale-110"
            >
              <img src={Icons.codeforces} alt="codeforces" />
            </a>
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div3Ref}>
            <a 
              href="https://linkedin.com/in/amanranjan03" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex size-full items-center justify-center transition-transform hover:scale-110"
            >
            <img src={Icons.linkedin} alt="linkedin" />
            </a>
          </Circle>
          <Circle ref={div7Ref}>
            <a
              href="https://discord.com/users/1259008327824965757" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex size-full items-center justify-center transition-transform hover:scale-110"
            >
            <img src={Icons.discord} alt="discord" />
            </a>
          </Circle>
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div4Ref}
        curvature={-75}
        endYOffset={-10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div4Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={div4Ref}
        curvature={75}
        endYOffset={10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div5Ref}
        toRef={div4Ref}
        curvature={-75}
        endYOffset={-10}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div6Ref}
        toRef={div4Ref}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div7Ref}
        toRef={div4Ref}
        curvature={75}
        endYOffset={10}
        reverse
      />
    </div>
  )
}

const Icons = {
  github: "/github.svg",
  linkedin: "/linkedin.svg",
  x: "/x.svg",
  leetcode: "/leetcode.svg",
  aman: "/amanSocial.png",
  discord: "/discord.svg",
  codeforces: "/codeforces.svg",

}

export default function SocialSection() {
  return (
    <div className="flex min-h-0 flex-col gap-y-8">
      <BlurFade delay={BLUR_FADE_DELAY * 17}>
        <div className="flex flex-col gap-y-4 items-center justify-center">
          <div className="flex items-center w-full">
            <div className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-foreground/25 via-95% to-transparent" />
            <div className="border bg-primary z-10 rounded-xl px-4 py-1">
              <span className="text-background text-sm font-medium">Socials</span>
            </div>
            <div className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-foreground/25 via-95% to-transparent" />
          </div>
          <div className="flex flex-col gap-y-3 items-center justify-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Find me online</h2>
            <p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed text-balance text-center">
              Connect with me across platforms — coding, networking, or just chatting.
            </p>
          </div>
        </div>
      </BlurFade>
      <BlurFade delay={BLUR_FADE_DELAY * 18}>
        <SocialBeam />
      </BlurFade>
    </div>
  )
}