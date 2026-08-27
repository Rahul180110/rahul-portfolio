import { motion, useScroll, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 40, mass: 0.3 });
  return (
    <motion.div
      style={{
        scaleX,
        transformOrigin: "0%",
        backgroundImage: "linear-gradient(90deg,#a855f7,#22d3ee,#ec4899)",
      }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px]"
    />
  );
}

export function CursorGlow() {
  const [pos, setPos] = useState({ x: -500, y: -500 });
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed z-0 hidden h-[400px] w-[400px] rounded-full md:block"
      style={{
        left: pos.x - 200,
        top: pos.y - 200,
        background:
          "radial-gradient(circle, rgba(168,85,247,0.14), rgba(168,85,247,0.05) 45%, transparent 70%)",
        transition: "left 120ms linear, top 120ms linear",
      }}
    />
  );
}

export function Blobs() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute -left-24 top-10 h-[420px] w-[420px] rounded-full opacity-[0.18]"
        style={{ background: "#a855f7", filter: "blur(90px)", animation: "blob-a 12s ease-in-out infinite" }}
      />
      <div
        className="absolute right-0 top-1/3 h-[380px] w-[380px] rounded-full opacity-[0.18]"
        style={{ background: "#22d3ee", filter: "blur(90px)", animation: "blob-b 14s ease-in-out infinite" }}
      />
      <div
        className="absolute bottom-0 left-1/3 h-[360px] w-[360px] rounded-full opacity-[0.18]"
        style={{ background: "#ec4899", filter: "blur(90px)", animation: "blob-c 16s ease-in-out infinite" }}
      />
    </div>
  );
}

export function DotGrid() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-[0.35]"
      style={{
        backgroundImage: "radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)",
        backgroundSize: "26px 26px",
      }}
    />
  );
}

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <motion.button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      initial={false}
      animate={show ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.6, y: 16 }}
      whileHover={{ scale: 1.1 }}
      style={{
        backgroundImage: "linear-gradient(135deg,#a855f7,#22d3ee)",
        pointerEvents: show ? "auto" : "none",
      }}
      className="fixed bottom-6 right-6 z-50 grid h-12 w-12 place-items-center rounded-full text-white shadow-[0_10px_40px_-8px_rgba(168,85,247,0.8)]"
    >
      <ArrowUp className="h-5 w-5" />
    </motion.button>
  );
}
