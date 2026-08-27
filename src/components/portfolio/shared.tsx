import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Meme Factory", href: "#meme-factory" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

export const SOCIALS = {
  github: "https://github.com/Rahul180110",
  linkedin: "https://linkedin.com/in/rahul-r-8a1385267",
  email: "mailto:rahulajay558@gmail.com",
  instagram: "https://www.instagram.com/404_humor_not_found_26",
};

export function scrollToId(hash: string) {
  const el = document.querySelector(hash);
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Section({
  id,
  tone = "primary",
  children,
  className = "",
}: {
  id: string;
  tone?: "primary" | "secondary";
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative overflow-hidden py-24 ${className}`}
      style={{ backgroundColor: tone === "primary" ? "#0a0a0f" : "#0d0d15" }}
    >
      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">{children}</div>
    </section>
  );
}

export function SectionHeading({
  number,
  numberColor = "var(--purple)",
  title,
  italicTail,
  subtitle,
  right,
}: {
  number: string;
  numberColor?: string;
  title: string;
  italicTail?: string;
  subtitle?: string;
  right?: ReactNode;
}) {
  return (
    <div className="mb-14 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <FadeUp>
        <p className="mono-label mb-3" style={{ color: numberColor }}>
          {number}
        </p>
        <h2 className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
          <span className="gradient-text">{title}</span>
          {italicTail ? <span className="gradient-text italic"> {italicTail}</span> : null}
        </h2>
        {subtitle ? (
          <p className="mt-4 max-w-xl text-base text-white/50 sm:text-lg">{subtitle}</p>
        ) : null}
      </FadeUp>
      {right}
    </div>
  );
}

export function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Counter({
  to,
  decimals = 0,
  suffix = "",
  className = "",
}: {
  to: number;
  decimals?: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const total = 48;
    const tick = () => {
      frame += 1;
      const t = Math.min(frame / total, 1);
      setValue(to * (1 - Math.pow(1 - t, 3)));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, to]);

  return (
    <span ref={ref} className={className}>
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export function GradientButton({
  children,
  onClick,
  href,
  className = "",
  glow = "rgba(168,85,247,0.6)",
}: {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  glow?: string;
}) {
  const cls = `group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl px-5 py-3 font-medium text-white transition-shadow ${className}`;
  const style = {
    backgroundImage: "linear-gradient(135deg,#a855f7,#22d3ee)",
    boxShadow: `0 12px 40px -14px ${glow}`,
  };
  const inner = (
    <>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <span
        aria-hidden
        className="absolute inset-0 -translate-x-full opacity-60 transition-transform duration-700 group-hover:translate-x-full"
        style={{
          backgroundImage:
            "linear-gradient(100deg, transparent, rgba(255,255,255,0.35), transparent)",
        }}
      />
    </>
  );
  if (href)
    return (
      <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className={cls} style={style}>
        {inner}
      </a>
    );
  return (
    <button type="button" onClick={onClick} className={cls} style={style}>
      {inner}
    </button>
  );
}
