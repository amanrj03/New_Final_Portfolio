"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import LocationMap from "@/components/location-map";
import { DATA } from "@/data/resume";

const CONTACT_DETAILS = [
  {
    icon: Mail,
    label: "Email",
    value: DATA.contact.email,
    href: `mailto:${DATA.contact.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: DATA.contact.tel,
    href: `tel:${DATA.contact.tel}`,
  },
  {
    icon: MapPin,
    label: "Location",
    value: DATA.location,
    href: DATA.locationLink,
  },
];

const SOCIALS = [
  { icon: Github, label: "GitHub", href: DATA.contact.social.GitHub.url },
  { icon: Linkedin, label: "LinkedIn", href: DATA.contact.social.LinkedIn.url },
  { icon: Twitter, label: "Twitter / X", href: DATA.contact.social.X.url },
];

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [submitted, setSubmitted] = useState(false);

  function validate() {
    const e: Partial<typeof form> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email address";
    if (!form.subject.trim()) e.subject = "Subject is required";
    if (!form.message.trim()) e.message = "Message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    setForm({ name: "", email: "", subject: "", message: "" });
    setErrors({});
  }

  const inputClass = (err?: string) =>
    `w-full rounded-xl border px-3 py-2.5 text-sm bg-background outline-none transition-colors placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30 ${err ? "border-red-500 focus:ring-red-500/30" : "border-border"}`;

  return (
    <section id="contact">
      <div className="border rounded-xl p-8 relative">
        {/* Pill badge */}
        <div className="absolute -top-4 border bg-primary z-10 rounded-xl px-4 py-1 left-1/2 -translate-x-1/2">
          <span className="text-background text-sm font-medium">Contact</span>
        </div>

        {/* Flickering grid top half */}
        <div className="absolute inset-0 top-0 left-0 right-0 h-1/4 rounded-xl overflow-hidden">
          <FlickeringGrid
            className="h-full w-full"
            squareSize={2}
            gridGap={2}
            style={{
              maskImage: "linear-gradient(to bottom, black, transparent)",
              WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative flex flex-col gap-8">
          {/* Header */}
          <div className="flex flex-col items-center gap-3 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Get in Touch</h2>
            <p className="mx-auto max-w-lg text-muted-foreground text-balance">
              Have a project in mind or just want to say hi? My inbox is always open.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Left — contact info + map */}
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-3">
                {CONTACT_DETAILS.map(({ icon: Icon, label, value, href }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-3 group"
                  >
                    <div className="size-9 rounded-xl border border-border bg-background flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:border-primary group-hover:text-primary-foreground transition-colors">
                      <Icon className="size-4" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs text-muted-foreground">{label}</span>
                      <span className="text-sm font-medium truncate group-hover:text-primary transition-colors">{value}</span>
                    </div>
                  </a>
                ))}
              </div>

              {/* Socials */}
              <div className="flex gap-2">
                {SOCIALS.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="size-9 rounded-xl border border-border bg-background flex items-center justify-center text-muted-foreground hover:bg-primary hover:border-primary hover:text-primary-foreground transition-colors"
                  >
                    <Icon className="size-4" />
                  </a>
                ))}
              </div>

              {/* Map */}
              <div className="rounded-xl overflow-hidden border border-border aspect-square w-full">
                <LocationMap
                  lat={DATA.coordinates.lat}
                  lng={DATA.coordinates.lng}
                  label={DATA.location}
                />
              </div>
            </div>

            {/* Right — contact form */}
            <div className="flex flex-col gap-4">
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 border border-border rounded-xl p-8 text-center bg-background/60">
                  <div className="size-14 rounded-full bg-primary/10 flex items-center justify-center">
                    <Send className="size-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg">Message sent!</p>
                    <p className="text-sm text-muted-foreground mt-1">Thanks for reaching out. I&apos;ll get back to you soon.</p>
                  </div>
                  <Button variant="outline" className="rounded-xl" onClick={() => setSubmitted(false)}>
                    Send another
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium">Full Name</label>
                    <input type="text" placeholder="Your name" value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      className={inputClass(errors.name)} />
                    {errors.name && <span className="text-xs text-red-500">{errors.name}</span>}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium">Email</label>
                    <input type="email" placeholder="you@example.com" value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      className={inputClass(errors.email)} />
                    {errors.email && <span className="text-xs text-red-500">{errors.email}</span>}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium">Subject</label>
                    <input type="text" placeholder="What's this about?" value={form.subject}
                      onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                      className={inputClass(errors.subject)} />
                    {errors.subject && <span className="text-xs text-red-500">{errors.subject}</span>}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium">Message</label>
                    <textarea rows={5} placeholder="Write your message here..." value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      className={`${inputClass(errors.message)} resize-none`} />
                    {errors.message && <span className="text-xs text-red-500">{errors.message}</span>}
                  </div>
                  <Button type="submit" className="w-full rounded-xl gap-2">
                    <Send className="size-4" />
                    Send Message
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
