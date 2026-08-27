import { Counter, FadeUp, Section, SectionHeading } from "./shared";
import { motion } from "motion/react";

export function About() {
  return (
    <Section id="about" tone="secondary">
      <SectionHeading number="01. About" title="Who I Am" />

      <div className="grid grid-cols-1 gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <FadeUp className="flex justify-center">
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-3 rounded-full"
              style={{
                background: "conic-gradient(from 0deg,#a855f7,#22d3ee,#ec4899,#a855f7)",
                filter: "blur(3px)",
                animation: "spin-slow 8s linear infinite",
              }}
            />
            <div
              className="relative grid h-56 w-56 place-items-center rounded-full sm:h-72 sm:w-72"
              style={{ backgroundColor: "#0a0a0f" }}
            >
              <div className="text-center">
                <p className="gradient-text font-display text-6xl font-bold sm:text-7xl">RR</p>
                <p className="mono-label mt-2 text-white/40">Chennai, TN</p>
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="glass-card mono-label absolute -bottom-2 -right-3 rounded-full px-4 py-2"
              style={{ color: "#22d3ee" }}
            >
              💼 Full Stack Dev
            </motion.div>

            <div
              className="glass-card mono-label absolute -left-4 -top-2 rounded-full px-4 py-2"
              style={{ color: "#c084fc" }}
            >
              🎓 CGPA <Counter to={8.1} decimals={1} />
            </div>
          </div>
        </FadeUp>

        <div className="space-y-5">
          <FadeUp delay={0.05}>
            <div className="glass-card rounded-2xl p-6 text-base leading-relaxed text-white/70 sm:text-lg">
              I'm a{" "}
              <span className="font-semibold" style={{ color: "#c084fc" }}>
                Chennai-based Full Stack Developer
              </span>{" "}
              at{" "}
              <span className="font-semibold" style={{ color: "#22d3ee" }}>
                Tender Software Pvt Ltd
              </span>
              , passionate about building products end-to-end — from pixel-perfect React UIs to
              robust Laravel APIs.
            </div>
          </FadeUp>

          <FadeUp delay={0.12}>
            <div className="glass-card rounded-2xl p-6 text-base leading-relaxed text-white/70 sm:text-lg">
              Graduated with a B.E. in Computer Science & Engineering from{" "}
              <span className="font-semibold" style={{ color: "#ec4899" }}>
                A.V.C College of Engineering
              </span>{" "}
              (CGPA 8.1). Beyond client work, I build independent ventures — like{" "}
              <span className="font-semibold" style={{ color: "#c084fc" }}>
                Meme Factory
              </span>
              , an AI-automated Instagram content platform I built and ship solo.
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              { icon: "📍", label: "Location", value: <>Chennai, TN</> },
              {
                icon: "⚡",
                label: "Experience",
                value: (
                  <>
                    <Counter to={1.5} decimals={1} />+ Years
                  </>
                ),
              },
              { icon: "💼", label: "Role", value: <>Assoc. SWE</> },
              { icon: "🚀", label: "Speciality", value: <>Full Stack</> },
            ].map((f, i) => (
              <FadeUp key={f.label} delay={0.18 + i * 0.07}>
                <div className="glass-card rounded-2xl p-5">
                  <p className="mono-label text-white/40">
                    {f.icon} {f.label}
                  </p>
                  <p className="mt-2 font-display text-lg font-semibold text-white">{f.value}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
