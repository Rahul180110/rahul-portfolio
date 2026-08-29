import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { ArrowDown, Download, Github, Instagram, Linkedin, Mail } from "lucide-react";
import { Blobs, DotGrid } from "./Chrome";
import { SOCIALS, scrollToId } from "./shared";

const ROLES = [
  "React.js Developer",
  "Laravel Developer",
  "React Native Developer",
  "Full Stack Developer",
];

function Typing() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [erasing, setErasing] = useState(false);

  useEffect(() => {
    const full = ROLES[index] ?? ROLES[0]!;
    if (!erasing && text === full) {
      const t = setTimeout(() => setErasing(true), 1500);
      return () => clearTimeout(t);
    }
    if (erasing && text === "") {
      setErasing(false);
      setIndex((i) => (i + 1) % ROLES.length);
      return;
    }
    const t = setTimeout(
      () => setText(erasing ? full.slice(0, text.length - 1) : full.slice(0, text.length + 1)),
      erasing ? 40 : 70,
    );
    return () => clearTimeout(t);
  }, [text, erasing, index]);

  return (
    <span className="font-mono text-xl text-white sm:text-2xl">
      {text}
      <span
        className="ml-0.5 inline-block"
        style={{ color: "#22d3ee", animation: "blink-caret 1s step-end infinite" }}
      >
        |
      </span>
    </span>
  );
}

const HEADLINE = ["Hi,", "I'm", "Rahul", "R"];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden pb-24 pt-28"
      style={{
        background:
          "radial-gradient(circle at 80% 20%, rgba(168,85,247,0.18), transparent 40%), radial-gradient(circle at 20% 80%, rgba(34,211,238,0.12), transparent 50%), linear-gradient(135deg,#0a0a0f,#0d0d15)",
      }}
    >
      <DotGrid />
      <Blobs />

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-16 px-5 sm:px-8 lg:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7"
        >
          <div
            className="mono-label inline-flex items-center gap-2 rounded-full px-4 py-2 text-white/70"
            style={{ border: "1px solid rgba(168,85,247,0.4)", background: "rgba(168,85,247,0.08)" }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="gradient-text">Available for opportunities</span>
          </div>

          <h1 className="mt-7 font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-[72px]">
            {HEADLINE.map((word, i) => (
              <motion.span
                key={word + i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 * i, duration: 0.5 }}
                className={`mr-3 inline-block ${i >= 2 ? "gradient-text" : ""}`}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <div className="mt-4 h-9">
            <Typing />
          </div>

          <p className="mt-6 max-w-[480px] text-base leading-relaxed text-white/60 sm:text-lg">
            <span className="gradient-text font-semibold">1.5+ years</span> building{" "}
            <span className="gradient-text font-semibold">production-ready</span> full-stack
            applications — React / React Native frontends seamlessly integrated with Laravel / PHP
            backends and MySQL.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            {[
              { icon: "📍", text: "Chennai, TN", color: "#a855f7" },
              { icon: "⚡", text: "1.5+ Yrs Exp", color: "#22d3ee" },
              { icon: "💼", text: "Assoc. Software Engineer", color: "#ec4899" },
            ].map((chip) => (
              <div
                key={chip.text}
                className="glass-card mono-label flex items-center gap-2 rounded-full px-4 py-2 text-white/70"
              >
                <span style={{ color: chip.color }}>{chip.icon}</span>
                {chip.text}
              </div>
            ))}
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => scrollToId("#projects")}
              className="rounded-xl px-6 py-3.5 font-semibold text-white shadow-[0_14px_44px_-16px_rgba(168,85,247,0.9)]"
              style={{ backgroundImage: "linear-gradient(135deg,#a855f7,#22d3ee)" }}
            >
              View Projects
            </button>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              download="Rahul_R_Resume.pdf"
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 font-semibold text-white/85 transition-colors hover:text-white"
              style={{ border: "1px solid rgba(255,255,255,0.16)" }}
            >
              <Download className="h-4 w-4" /> Download Resume
            </a>
          </div>

          <div className="mt-8 flex gap-3">
            {[
              { Icon: Github, href: SOCIALS.github, label: "GitHub" },
              { Icon: Linkedin, href: SOCIALS.linkedin, label: "LinkedIn" },
              { Icon: Mail, href: SOCIALS.email, label: "Email" },
              { Icon: Instagram, href: SOCIALS.instagram, label: "Instagram" },
            ].map(({ Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                whileHover={{ scale: 1.15, y: -3, borderColor: "rgba(168,85,247,0.6)" }}
                className="glass-card grid h-11 w-11 place-items-center rounded-xl text-white/80"
              >
                <Icon className="h-5 w-5" />
              </motion.a>
            ))}
          </div>
        </motion.div>

        <div className="relative lg:col-span-5">
          <div
            aria-hidden
            className="absolute inset-0 m-auto h-[380px] w-[380px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(168,85,247,0.35), transparent 65%)",
              filter: "blur(40px)",
              animation: "pulse-glow 5s ease-in-out infinite",
            }}
          />
          <div
            className="relative mx-auto w-full max-w-[360px] rounded-3xl p-[1px]"
            style={{
              backgroundImage: "linear-gradient(135deg,#a855f7,#22d3ee,#ec4899)",
              animation: "float-soft 6s ease-in-out infinite",
            }}
          >
            <div
              className="flex aspect-[4/5] flex-col justify-between rounded-3xl p-6"
              style={{ backgroundColor: "#0c0919" }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="mono-label rounded-full px-3 py-1.5"
                  style={{ color: "#c084fc", background: "rgba(168,85,247,0.12)" }}
                >
                  Full Stack Engineer
                </span>
                <span
                  className="mono-label rounded-full px-3 py-1.5"
                  style={{ color: "#34d399", background: "rgba(52,211,153,0.12)" }}
                >
                  CGPA 8.1
                </span>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="relative grid h-32 w-32 place-items-center">
                  <div
                    aria-hidden
                    className="absolute -inset-1 rounded-full"
                    style={{
                      background: "conic-gradient(from 0deg,#a855f7,#22d3ee,#ec4899,#a855f7)",
                      animation: "spin-slow 8s linear infinite",
                      filter: "blur(2px)",
                    }}
                  />
                  <div
                    className="relative h-[7.5rem] w-[7.5rem] overflow-hidden rounded-full p-0.5"
                    style={{ backgroundColor: "#0c0919" }}
                  >
                    <img
                      src="/logo.jpg"
                      alt="Rahul R Emblem"
                      className="h-full w-full rounded-full object-cover shadow-[0_0_25px_rgba(168,85,247,0.5)]"
                    />
                  </div>
                </div>
                <p className="mt-5 font-display text-2xl font-bold text-white">Rahul R</p>
                <p className="mt-1 font-mono text-xs" style={{ color: "#22d3ee" }}>
                  Associate Software Engineer
                </p>
                <p className="mt-1 text-xs text-white/50">Tender Software Pvt Ltd</p>
              </div>

              <div
                className="flex items-end justify-between gap-3 pt-5"
                style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div>
                  <p className="mono-label text-white/40">Primary Stack</p>
                  <p className="mt-1 font-mono text-[11px] text-white/80">React · Laravel · MySQL</p>
                </div>
                <div className="text-right">
                  <p className="mono-label text-white/40">Location</p>
                  <p className="mt-1 font-mono text-[11px] text-white/80">Chennai, TN</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <motion.button
        type="button"
        onClick={() => scrollToId("#about")}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
      >
        <span className="mono-label text-white/40">Scroll</span>
        <ArrowDown className="h-4 w-4" style={{ color: "#a855f7" }} />
      </motion.button>
    </section>
  );
}
