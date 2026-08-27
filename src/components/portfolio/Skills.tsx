import { motion } from "motion/react";
import { FadeUp, Section, SectionHeading } from "./shared";

const GROUPS = [
  {
    title: "Frontend",
    color: "#a855f7",
    items: [
      "React.js",
      "React Native",
      "JavaScript (ES6+)",
      "Tailwind CSS",
      "Bootstrap",
      "HTML5",
      "CSS3",
    ],
  },
  {
    title: "Backend",
    color: "#22d3ee",
    items: ["Laravel", "PHP", "REST APIs", "MVC Architecture"],
  },
  { title: "Database", color: "#ec4899", items: ["MySQL", "Schema Design"] },
  {
    title: "Tools & Practices",
    color: "#facc15",
    items: ["Git", "Component Architecture", "State Management"],
  },
];

export function Skills() {
  return (
    <Section id="skills">
      <SectionHeading
        number="02. Skills"
        title="Tech Arsenal"
        subtitle="Technologies I work with daily to build full-stack products."
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {GROUPS.map((g, gi) => (
          <FadeUp key={g.title} delay={gi * 0.08}>
            <div className="glass-card h-full rounded-2xl p-6">
              <p className="mono-label" style={{ color: g.color }}>
                {g.title}
              </p>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {g.items.map((item, i) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, type: "spring", stiffness: 300, damping: 20 }}
                    whileHover={{
                      y: -3,
                      boxShadow: "0 8px 26px -10px rgba(34,211,238,0.75)",
                      borderColor: "rgba(34,211,238,0.5)",
                    }}
                    className="glass-card flex items-center gap-2 rounded-full px-4 py-2 font-mono text-xs text-white/80"
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: g.color }}
                    />
                    {item}
                  </motion.span>
                ))}
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </Section>
  );
}
