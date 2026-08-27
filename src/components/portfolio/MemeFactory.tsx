import { motion } from "motion/react";
import { Instagram, Sparkles } from "lucide-react";
import { FadeUp, GradientButton, Section, SectionHeading, SOCIALS } from "./shared";

const FEATURES = [
  {
    icon: "✨",
    title: "Zero-Cost Reel Pipeline",
    body: "AI keywords → stock clips (Pexels/Pixabay) → FFmpeg Ken Burns assembly → auto-publish via Instagram Graph API.",
  },
  {
    icon: "🤖",
    title: "Multi-Provider AI Layer",
    body: "Groq / OpenRouter / offline fallback — automatic failover for uninterrupted content generation.",
  },
  {
    icon: "📊",
    title: "Analytics Pipeline",
    body: "Scheduled follower-snapshot jobs + growth-tracking API feeding a React dashboard with live charts.",
  },
];

const TECH = [
  "Laravel",
  "React.js",
  "FFmpeg",
  "Instagram Graph API",
  "Queue Jobs",
  "AI Integration",
  "MySQL",
];

export function MemeFactory() {
  return (
    <Section id="meme-factory" tone="secondary">
      <FadeUp className="mb-6">
        <span
          className="mono-label inline-flex items-center gap-2 rounded-full px-4 py-2"
          style={{ border: "1px solid rgba(236,72,153,0.45)", color: "#f9a8d4" }}
        >
          <Sparkles className="h-3.5 w-3.5" /> Featured Build · Personal Product
        </span>
      </FadeUp>

      <SectionHeading
        number="05. Meme Factory"
        numberColor="#ec4899"
        title="Meme Factory"
        subtitle="An end-to-end Instagram content automation platform — built solo, shipped in production."
      />

      <FadeUp>
        <div className="relative">
          <div
            aria-hidden
            className="absolute -inset-6 rounded-[2.5rem]"
            style={{
              background:
                "radial-gradient(circle at 70% 20%, rgba(236,72,153,0.28), transparent 60%)",
              filter: "blur(30px)",
              animation: "pulse-glow 6s ease-in-out infinite",
            }}
          />
          <div
            className="relative rounded-[2rem] p-[1px]"
            style={{ backgroundImage: "linear-gradient(135deg,#ec4899,#a855f7,#22d3ee)" }}
          >
            <div
              className="relative overflow-hidden rounded-[2rem] p-7 sm:p-10"
              style={{ backgroundColor: "#0b0912" }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full"
                style={{ background: "rgba(168,85,247,0.22)", filter: "blur(70px)" }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full"
                style={{ background: "rgba(34,211,238,0.18)", filter: "blur(70px)" }}
              />

              <div className="relative">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="font-display text-3xl font-bold text-white sm:text-4xl">
                      🏭 <span className="gradient-text">Meme Factory</span>
                    </h3>
                    <p className="mono-label mt-3 text-white/45">
                      Laravel + React.js | Solo Build | Production Automated Pipeline
                    </p>
                  </div>
                  <span
                    className="glass-card mono-label inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2"
                    style={{ color: "#34d399" }}
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                    </span>
                    Generating content daily
                  </span>
                </div>

                <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">
                  Powers the meme page{" "}
                  <a
                    href={SOCIALS.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold underline decoration-dotted"
                    style={{ color: "#ec4899" }}
                  >
                    @404_humor_not_found_26
                  </a>{" "}
                  with a domain-driven Laravel architecture (Domain/{"{"}Feature{"}"}/{"{"}Services,
                  Jobs{"}"}) and a React dashboard — automating the entire content lifecycle
                  end-to-end.
                </p>

                <div className="mt-9 grid grid-cols-1 gap-5 md:grid-cols-3">
                  {FEATURES.map((f, i) => (
                    <motion.div
                      key={f.title}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, type: "spring", stiffness: 220, damping: 22 }}
                      className="glass-card rounded-2xl p-5"
                    >
                      <p className="text-2xl">{f.icon}</p>
                      <p className="mt-3 font-display text-base font-semibold text-white">
                        {f.title}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-white/55">{f.body}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-2">
                  {TECH.map((t) => (
                    <span
                      key={t}
                      className="glass-card rounded-full px-3.5 py-1.5 font-mono text-[11px] text-white/70"
                    >
                      ▹ {t}
                    </span>
                  ))}
                </div>

                <div className="mt-9">
                  <GradientButton href={SOCIALS.instagram} glow="rgba(236,72,153,0.85)">
                    <Instagram className="h-4 w-4" /> Follow @404_humor_not_found_26
                  </GradientButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeUp>
    </Section>
  );
}
