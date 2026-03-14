"use client";

import { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  title: string;
  pdfUrl: string;
  children: React.ReactNode;
}

export default function CertificateViewer({ title, pdfUrl, children }: Props) {
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const fullUrl = origin ? `${origin}${pdfUrl}` : "";
  const viewerUrl = fullUrl
    ? `https://docs.google.com/viewer?url=${encodeURIComponent(fullUrl)}&embedded=true`
    : "";

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 duration-200" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-3xl h-[85vh] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border bg-card shadow-xl flex flex-col data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 duration-200">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
            <Dialog.Title className="text-sm font-semibold truncate pr-4">{title}</Dialog.Title>
            <div className="flex items-center gap-2 shrink-0">
              <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="rounded-lg gap-1.5 text-xs">
                  <ExternalLink className="size-3.5" /> Open
                </Button>
              </a>
              <Dialog.Close asChild>
                <button className="rounded-lg p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                  <X className="size-4" />
                </button>
              </Dialog.Close>
            </div>
          </div>
          <div className="flex-1 overflow-hidden rounded-b-2xl bg-muted/30">
            {viewerUrl ? (
              <iframe
                src={viewerUrl}
                className="w-full h-full"
                title={title}
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-sm text-muted-foreground">Loading...</p>
              </div>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
