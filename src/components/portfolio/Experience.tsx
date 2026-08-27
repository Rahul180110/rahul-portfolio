import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { FadeUp, Section, SectionHeading } from "./shared";

const ITEMS = [
  {
    role: "Associate Software Engineer",
    company: "Tender Software Pvt Ltd",
    period: "Feb 2026 – Present",
    type: "Full-time",
    color: "#a855f7",
    current: true,
    points: [
      "Built responsive React.js UIs with reusable components and custom hooks.",
      "Developed cross-platform React Native apps integrating REST APIs.",
      "Designed RESTful APIs connecting React front-ends to Laravel back-ends.",
      "Engineered MySQL schemas optimised for scalable production performance.",
      "Handled debugging, maintenance cycles, and direct client collaboration.",
    ],
  },
  {
    role: "Software Trainee",
    company: "Tender Software Pvt Ltd",
    period: "Feb 2025 – Jan 2026",
    type: "Trainee",
    color: "#22d3ee",
    current: false,
    points: [
      "Feature development in React.js and Laravel across live client projects.",
      "REST API integration and testing for data integrity and performance.",
    ],
  },
  {
    role: "Intern — Software Developer",
    company: "Tender Software Pvt Ltd",
    period: "Jan 2025",
    type: "Internship",
    color: "#ec4899",
    current: false,
    points: [
      "Built web components in React.js and PHP as part of onboarding.",
      "Debugging support and codebase familiarisation across active projects.",
    ],
  },
];

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 60%"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <Section id="experience" tone="secondary">
      <SectionHeading number="03. Experience" numberColor="#22d3ee" title="Work History" />

      <div ref={ref} className="relative pl-8 sm:pl-12">
        <div className="absolute bottom-0 left-[7px] top-0 w-px bg-white/10 sm:left-[15px]" />
        <motion.div
          style={{
            scaleY,
            transformOrigin: "top",
            backgroundImage: "linear-gradient(180deg,#a855f7,#22d3ee,#ec4899)",
            boxShadow: "0 0 14px rgba(168,85,247,0.7)",
          }}
          className="absolute bottom-0 left-[7px] top-0 w-px sm:left-[15px]"
        />

        <div className="space-y-8">
          {ITEMS.map((item, i) => (
            <FadeUp key={item.role} delay={i * 0.08}>
              <div className="relative">
                <span
                  className="absolute -left-8 top-6 grid h-4 w-4 place-items-center sm:-left-12"
                  style={{ marginLeft: 0 }}
                >
                  {item.current && (
                    <span
                      className="absolute h-4 w-4 animate-ping rounded-full opacity-70"
                      style={{ backgroundColor: item.color }}
                    />
                  )}
                  <span
                    className="relative h-3 w-3 rounded-full"
                    style={{ backgroundColor: item.color, boxShadow: `0 0 12px ${item.color}` }}
                  />
                </span>

                <motion.div
                  whileHover={{ borderColor: item.color, y: -2 }}
                  className="glass-card rounded-2xl p-6"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="font-display text-xl font-bold text-white">{item.role}</h3>
                      <p className="mt-1 font-mono text-sm" style={{ color: item.color }}>
                        {item.company}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="glass-card mono-label rounded-full px-3 py-1.5 text-white/60">
                        {item.period}
                      </span>
                      <span
                        className="mono-label rounded-full px-3 py-1.5"
                        style={{ color: item.color, background: `${item.color}1f` }}
                      >
                        {item.type}
                      </span>
                    </div>
                  </div>

                  <ul className="mt-5 space-y-2.5">
                    {item.points.map((p) => (
                      <li key={p} className="flex gap-3 text-sm text-white/70 sm:text-base">
                        <span
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        {p}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </Section>
  );
}
