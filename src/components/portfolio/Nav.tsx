import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { Download, Menu, X } from "lucide-react";
import { NAV_LINKS, scrollToId } from "./shared";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (href: string) => {
    setOpen(false);
    setTimeout(() => scrollToId(href), 80);
  };

  return (
    <>
      <motion.header
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
        style={
          scrolled
            ? {
                backgroundColor: "rgba(10,10,15,0.88)",
                backdropFilter: "blur(20px)",
                borderBottom: "1px solid rgba(168,85,247,0.22)",
              }
            : { borderBottom: "1px solid transparent" }
        }
      >
        <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="shimmer-text font-display text-lg font-bold tracking-tight"
          >
            Rahul R
          </button>

          <div className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((l) => (
              <button
                key={l.href}
                type="button"
                onClick={() => go(l.href)}
                className="text-sm text-white/75 transition-colors hover:text-white"
              >
                {l.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/resume.pdf"
              download
              className="hidden items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold text-white sm:inline-flex"
              style={{ backgroundImage: "linear-gradient(135deg,#a855f7,#22d3ee)" }}
            >
              <Download className="h-3.5 w-3.5" />
              Download Resume
            </a>
            <button
              type="button"
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-lg text-white lg:hidden"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col justify-between px-6 pb-10 pt-24 lg:hidden"
            style={{ backgroundColor: "#031226" }}
          >
            <div className="flex flex-col gap-5">
              {NAV_LINKS.map((l, i) => (
                <motion.button
                  key={l.href}
                  type="button"
                  onClick={() => go(l.href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="text-left font-display text-3xl font-semibold text-white"
                >
                  {l.label}
                </motion.button>
              ))}
            </div>
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center justify-center gap-2 rounded-xl py-4 font-semibold text-white"
              style={{ backgroundImage: "linear-gradient(135deg,#a855f7,#22d3ee)" }}
            >
              <Download className="h-4 w-4" /> Download Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
