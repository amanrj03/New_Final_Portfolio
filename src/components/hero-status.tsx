"use client";

import { useEffect, useState } from "react";
import { Github, Linkedin, FileText } from "lucide-react";
import { DATA } from "@/data/resume";

export default function HeroStatus() {
  const [time, setTime] = useState("");

  useEffect(() => {
    function update() {
      setTime(new Date().toLocaleString("en-IN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }));
    }
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col gap-3">
      {/* Available + live clock */}
      <div className="flex flex-col gap-1">
        <span className="flex items-center gap-1.5 text-sm font-medium">
          <span className="relative flex size-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full size-2 bg-green-500" />
          </span>
          Available for work
        </span>
        <span className="text-xs text-muted-foreground tabular-nums pl-3.5">{time}</span>
      </div>

      {/* Buttons */}
      <div className="flex gap-2 flex-wrap">
        <a
          href={DATA.contact.social.GitHub.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-border bg-background hover:bg-muted transition-colors"
        >
          <Github className="size-3.5" />
          GitHub
        </a>
        <a
          href={DATA.contact.social.LinkedIn.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-border bg-background hover:bg-muted transition-colors"
        >
          <Linkedin className="size-3.5" />
          LinkedIn
        </a>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-border bg-background hover:bg-muted transition-colors"
        >
          <FileText className="size-3.5" />
          Resume
        </a>
      </div>
    </div>
  );
}
