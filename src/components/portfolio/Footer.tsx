import { Github, Instagram, Linkedin, Mail } from "lucide-react";
import { NAV_LINKS, SOCIALS, scrollToId } from "./shared";

export function Footer() {
  return (
    <footer className="relative" style={{ backgroundColor: "#031226" }}>
      <div
        className="h-px w-full"
        style={{
          backgroundImage:
            "linear-gradient(90deg, transparent, #a855f7, #22d3ee, #ec4899, transparent)",
        }}
      />
      <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          <div>
            <p className="shimmer-text font-display text-xl font-bold">Rahul R</p>
            <p className="mono-label mt-3 text-white/45">Full Stack Developer · Chennai</p>
          </div>

          <div className="flex flex-col gap-2.5">
            {NAV_LINKS.map((l) => (
              <button
                key={l.href}
                type="button"
                onClick={() => scrollToId(l.href)}
                className="mono-label text-left text-white/50 transition-colors hover:text-white"
              >
                {l.label}
              </button>
            ))}
          </div>

          <div className="flex gap-3 sm:justify-end">
            {[
              { Icon: Github, href: SOCIALS.github, label: "GitHub" },
              { Icon: Linkedin, href: SOCIALS.linkedin, label: "LinkedIn" },
              { Icon: Mail, href: SOCIALS.email, label: "Email" },
              { Icon: Instagram, href: SOCIALS.instagram, label: "Instagram" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="glass-card grid h-10 w-10 place-items-center rounded-xl text-white/70 transition-colors hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div
          className="mt-12 flex items-center justify-center pt-6 text-center"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <p className="mono-label text-white/35">© 2026 Rahul R. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
