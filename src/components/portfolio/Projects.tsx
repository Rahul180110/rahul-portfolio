import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useState } from "react";
import { ArrowUpRight, Sparkles, X } from "lucide-react";
import { FadeUp, Section, scrollToId } from "./shared";

type Project = {
  number: string;
  name: string;
  category: string;
  role: string;
  year: string;
  tags: string[];
  description: string;
  url: string;
  accent: string;
};

const PROJECTS: Project[] = [
  {
    number: "01",
    name: "Trillage",
    category: "Community Platform",
    role: "Frontend Developer",
    year: "2025",
    tags: ["React.js", "JavaScript", "Laravel", "REST APIs"],
    description:
      "A web platform helping school communities support and manage meaningful initiatives — end-to-end React.js frontend wired to a Laravel REST API backend.",
    url: "https://www.trillage.io/",
    accent: "#a78bfa",
  },
  {
    number: "02",
    name: "Snuggle Dispatch",
    category: "Dispatch Management",
    role: "Backend Developer",
    year: "2025",
    tags: ["Laravel", "PHP", "MySQL", "Eloquent ORM"],
    description:
      "Full-featured dispatch & operations management system. Engineered the Laravel/PHP backend with Eloquent ORM, API-driven architecture, and complex business logic.",
    url: "https://dispatch.snuggle.ltd/",
    accent: "#22d3ee",
  },
  {
    number: "03",
    name: "ASORC",
    category: "App Migration",
    role: "Full-Stack Developer",
    year: "2025",
    tags: ["React Native", "Laravel", "PHP", "MySQL"],
    description:
      "Modernizing a legacy PHP web app into a mobile experience — Laravel API backend + cross-platform React Native app, preserving all existing business workflows.",
    url: "https://app.bie.com.au/asorc/",
    accent: "#f472b6",
  },
];

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        ry.set(((e.clientX - r.left) / r.width - 0.5) * 10);
        rx.set(-((e.clientY - r.top) / r.height - 0.5) * 10);
      }}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      whileHover={{ y: -6 }}
      className="glass-card group block w-full overflow-hidden rounded-3xl p-6 text-left sm:p-8"
    >
      <div className="grid grid-cols-1 gap-7 md:grid-cols-2 md:items-center">
        <div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-3xl font-bold text-white/15">{project.number}</span>
            <span
              className="mono-label rounded-full px-3 py-1.5"
              style={{ color: project.accent, background: `${project.accent}1f` }}
            >
              {project.category}
            </span>
          </div>

          <h3 className="mt-4 font-display text-3xl font-bold text-white">{project.name}</h3>
          <p className="mono-label mt-2 text-white/40">
            {project.role} · {project.year}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-white/60">{project.description}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span
                key={t}
                className="glass-card rounded-full px-3 py-1.5 font-mono text-[11px] text-white/70"
              >
                {t}
              </span>
            ))}
          </div>

          <span
            className="mt-6 inline-flex items-center gap-1.5 font-mono text-xs"
            style={{ color: project.accent }}
          >
            View project <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>

        <div
          className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl"
          style={{
            background: `radial-gradient(circle at 30% 20%, ${project.accent}33, transparent 60%), linear-gradient(135deg,#0c0919,#060811)`,
            border: `1px solid ${project.accent}33`,
          }}
        >
          <span
            className="glass-card mono-label absolute left-4 top-4 flex items-center gap-1.5 rounded-full px-3 py-1.5"
            style={{ color: project.accent }}
          >
            <Sparkles className="h-3 w-3" /> Client Project
          </span>
          <p
            className="gradient-text font-display text-4xl font-bold tracking-tight sm:text-5xl"
            style={{ opacity: 0.9 }}
          >
            {project.name.split(" ")[0]}
          </p>
        </div>
      </div>
    </motion.button>
  );
}

export function Projects() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <Section id="projects">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <FadeUp>
            <p className="mono-label mb-3" style={{ color: "#a855f7" }}>
              04. Projects
            </p>
            <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
              Client Work /<br />
              <span className="gradient-text italic">we ship.</span>
            </h2>
            <p className="mt-5 max-w-sm text-base text-white/55">
              Production-grade full-stack products built end-to-end — from React frontends to
              Laravel APIs and mobile apps.
            </p>
            <p className="mono-label mt-4 text-white/30">3 production projects shipped</p>

            <button
              type="button"
              onClick={() => scrollToId("#contact")}
              className="mt-7 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white"
              style={{ backgroundImage: "linear-gradient(135deg,#a855f7,#22d3ee)" }}
            >
              Let's work together <ArrowUpRight className="h-4 w-4" />
            </button>

            <div className="glass-card mt-8 rounded-2xl p-5">
              <p className="text-lg" style={{ color: "#c084fc" }}>
                ✦
              </p>
              <p className="mt-2 font-display text-sm font-semibold text-white">
                Production-ready code
              </p>
              <p className="mono-label mt-3 text-white/35">
                React · Laravel · React Native · MySQL
              </p>
            </div>
          </FadeUp>
        </div>

        <div className="space-y-7">
          {PROJECTS.map((p, i) => (
            <FadeUp key={p.name} delay={i * 0.06}>
              <ProjectCard project={p} onOpen={() => setActive(p)} />
            </FadeUp>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[70] grid place-items-center overflow-y-auto p-5"
            style={{ backgroundColor: "rgba(3,4,10,0.8)", backdropFilter: "blur(8px)" }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card relative w-full max-w-xl rounded-3xl p-7"
              style={{ backgroundColor: "#0c0919", borderColor: `${active.accent}55` }}
            >
              <button
                type="button"
                aria-label="Close"
                onClick={() => setActive(null)}
                className="absolute right-5 top-5 text-white/50 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
              <span
                className="mono-label rounded-full px-3 py-1.5"
                style={{ color: active.accent, background: `${active.accent}1f` }}
              >
                {active.category}
              </span>
              <h3 className="mt-4 font-display text-3xl font-bold text-white">{active.name}</h3>
              <p className="mono-label mt-2 text-white/40">
                {active.role} · {active.year}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-white/70">{active.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {active.tags.map((t) => (
                  <span
                    key={t}
                    className="glass-card rounded-full px-3 py-1.5 font-mono text-[11px] text-white/70"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <a
                href={active.url}
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white"
                style={{ backgroundImage: "linear-gradient(135deg,#a855f7,#22d3ee)" }}
              >
                Visit Live Project <ArrowUpRight className="h-4 w-4" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
