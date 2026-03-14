/* eslint-disable @next/next/no-img-element */
"use client";

import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import CertificateViewer from "@/components/certificate-viewer";

interface Certificate {
  title: string;
  organization: string;
  logoUrl: string;
  issued: string;
  pdfUrl: string;
}

export default function CertificateRow({ cert }: { cert: Certificate }) {
  return (
    <div className="flex items-center gap-4 px-5 py-4 bg-card hover:bg-muted/40 transition-colors">
      <div className="size-9 rounded-full border border-border bg-background flex items-center justify-center shrink-0 overflow-hidden">
        <img src={cert.logoUrl} alt={cert.organization} className="size-5 object-contain" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{cert.title}</p>
        <p className="text-xs text-muted-foreground">{cert.organization} · {cert.issued}</p>
      </div>
      <CertificateViewer title={cert.title} pdfUrl={cert.pdfUrl}>
        <Button variant="outline" size="sm" className="rounded-lg gap-1.5 text-xs shrink-0">
          <ExternalLink className="size-3.5" /> View
        </Button>
      </CertificateViewer>
    </div>
  );
}
