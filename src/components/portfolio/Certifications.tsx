import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import {
  Award,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  X,
  ArrowUpRight,
  FileText,
  ExternalLink,
  Layers,
  LayoutGrid,
  Sparkles,
} from "lucide-react";
import { FadeUp, Section, SectionHeading } from "./shared";

type CertGroup = "national" | "iit" | "specialized";

type Cert = {
  group: CertGroup;
  category: string;
  color: string;
  title: string;
  issuer: string;
  recipient: string;
  date: string;
  credential?: string;
  verify?: string;
  pdf?: string;
  tags: string[];
};

const CERTS: Cert[] = [
  {
    group: "national",
    category: "National Competition Winner",
    color: "#f59e0b",
    title: "Winner — IIT Bombay FOSSEE Mapathon 2023",
    issuer: "IIT Bombay · FOSSEE Project & IIT Tirupati I-Hub",
    recipient: "R.Rahul (Team Participant 1159)",
    date: "Feb 22 – May 06, 2023",
    credential: "Verification Code: 50c36",
    verify: "https://fossee.in/certificates/verify",
    pdf: "/certificates/iit-fossee-mapathon.pdf",
    tags: ["GIS & Mapping", "FOSSEE", "IIT Bombay", "Open Source Data"],
  },
  {
    group: "national",
    category: "Govt Apprenticeship Scheme",
    color: "#a855f7",
    title: "Certificate of Proficiency — NATS 2.0",
    issuer: "Ministry of Education (MoE), Govt of India · Tender Software",
    recipient: "Rahul Ramachandran",
    date: "Feb 17, 2025 – Feb 16, 2026 (12 Months)",
    credential: "Enrolment: ATNMY5780170 | Reg: CPYPOPGE24022113710",
    verify: "https://nats.education.gov.in/",
    pdf: "/certificates/nats-proficiency.pdf",
    tags: ["Software Development", "NATS 2.0", "Govt of India"],
  },
  {
    group: "iit",
    category: "Core Database & Backend",
    color: "#ec4899",
    title: "RDBMS PostgreSQL Training Certification",
    issuer: "IIT Bombay · Spoken Tutorial (MoE, Govt of India)",
    recipient: "Rahul R (A.V.C College of Engineering)",
    date: "18 April 2022",
    credential: "Remote Exam Conducted by IIT Bombay",
    pdf: "/certificates/spoken-tutorial-rdbms.pdf",
    tags: ["RDBMS", "PostgreSQL", "SQL", "IIT Bombay"],
  },
  {
    group: "iit",
    category: "Core Programming",
    color: "#38bdf8",
    title: "Java Training Certification",
    issuer: "IIT Bombay · Spoken Tutorial (MoE, Govt of India)",
    recipient: "Rahul R (A.V.C College of Engineering)",
    date: "11 October 2021",
    credential: "Remote Exam Conducted by IIT Bombay",
    pdf: "/certificates/spoken-tutorial-java.pdf",
    tags: ["Java", "OOP", "IIT Bombay"],
  },
  {
    group: "iit",
    category: "Web Development",
    color: "#fb923c",
    title: "HTML Training Certification",
    issuer: "IIT Bombay · Spoken Tutorial (MoE, Govt of India)",
    recipient: "Rahul R (A.V.C College of Engineering)",
    date: "11 September 2022",
    credential: "Remote Exam Conducted by IIT Bombay",
    pdf: "/certificates/spoken-tutorial-html.pdf",
    tags: ["HTML5", "Web Standards", "IIT Bombay"],
  },
  {
    group: "specialized",
    category: "Technical Certification",
    color: "#10b981",
    title: "JavaScript Certificate of Achievement",
    issuer: "GUVI · Google for Education Partner",
    recipient: "Rahul Rahul",
    date: "August 13, 2024",
    credential: "Certificate ID: m2v2g71b137950t4J7",
    verify: "https://www.guvi.in/certificate?id=m2v2g71b137950t4J7",
    tags: ["JavaScript", "ES6+", "Web Development", "GUVI"],
  },
  {
    group: "specialized",
    category: "Core Computer Science",
    color: "#22d3ee",
    title: "Cloud Computing Certification",
    issuer: "NPTEL · IIT Kharagpur",
    recipient: "Rahul R.",
    date: "2023",
    tags: ["Cloud Computing", "Distributed Systems", "NPTEL"],
  },
];

type ViewMode = "deck" | "grid";
type FilterCategory = "all" | CertGroup;

const FILTER_TABS: { id: FilterCategory; label: string }[] = [
  { id: "all", label: "All Credentials" },
  { id: "national", label: "National & Govt" },
  { id: "iit", label: "IIT Spoken Tutorial" },
  { id: "specialized", label: "Specialized" },
];

export function Certifications() {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState<Cert | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("deck");
  const [filter, setFilter] = useState<FilterCategory>("all");
  const [isDragging, setIsDragging] = useState(false);

  const go = (dir: number) => setIndex((i) => (i + dir + CERTS.length) % CERTS.length);

  // Keyboard navigation for deck mode
  useEffect(() => {
    if (viewMode !== "deck" || open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [viewMode, open]);

  const filteredCerts =
    filter === "all" ? CERTS : CERTS.filter((cert) => cert.group === filter);

  return (
    <Section id="certifications">
      <SectionHeading
        number="06. Certifications & Badges"
        numberColor="#f59e0b"
        title="Recognized Credentials"
        subtitle="Official certifications, government apprenticeships, and national competition awards."
        right={
          <div className="flex flex-wrap items-center gap-3">
            {/* View Mode Toggle */}
            <div
              className="flex items-center rounded-xl p-1"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <button
                type="button"
                onClick={() => setViewMode("deck")}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-all ${
                  viewMode === "deck"
                    ? "bg-amber-500/20 text-amber-300 shadow-sm"
                    : "text-white/60 hover:text-white"
                }`}
                aria-label="3D Deck View"
              >
                <Layers className="h-3.5 w-3.5" />
                <span>Deck</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-all ${
                  viewMode === "grid"
                    ? "bg-amber-500/20 text-amber-300 shadow-sm"
                    : "text-white/60 hover:text-white"
                }`}
                aria-label="Grid View"
              >
                <LayoutGrid className="h-3.5 w-3.5" />
                <span>Grid ({CERTS.length})</span>
              </button>
            </div>

            {/* Next/Prev buttons for Deck mode */}
            {viewMode === "deck" && (
              <div className="flex gap-2">
                <button
                  type="button"
                  aria-label="Previous certificate"
                  onClick={() => go(-1)}
                  className="glass-card grid h-10 w-10 place-items-center rounded-xl text-white/70 transition-colors hover:text-white"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-label="Next certificate"
                  onClick={() => go(1)}
                  className="glass-card grid h-10 w-10 place-items-center rounded-xl text-white/70 transition-colors hover:text-white"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        }
      />

      {/* ===================== VIEW MODE 1: 3D DECK (SWIPEABLE BY MOUSE & TOUCH) ===================== */}
      {viewMode === "deck" && (
        <FadeUp>
          {/* Subtle Swipe Hint */}
          <div className="mb-6 flex justify-center">
            <span
              className="mono-label inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs select-none"
              style={{
                background: "rgba(245,158,11,0.08)",
                border: "1px solid rgba(245,158,11,0.25)",
                color: "#fcd34d",
              }}
            >
              <Sparkles className="h-3 w-3 animate-pulse" />
              <span>Drag or swipe cards with mouse / touch · Click to inspect</span>
            </span>
          </div>

          <div
            tabIndex={0}
            aria-label="Swipeable certificate deck. Use left and right arrow keys to navigate."
            className="relative mx-auto h-[420px] w-full max-w-[720px] outline-none sm:h-[380px]"
          >
            {CERTS.map((cert, i) => {
              const offset = (i - index + CERTS.length) % CERTS.length;
              const visible = offset < 3;
              const isFront = offset === 0;

              return (
                <motion.div
                  key={cert.title}
                  onClick={() => {
                    if (!isDragging) {
                      if (isFront) {
                        setOpen(cert);
                      } else {
                        setIndex(i);
                      }
                    }
                  }}
                  drag={isFront ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.4}
                  onDragStart={() => setIsDragging(true)}
                  onDragEnd={(_, info) => {
                    setTimeout(() => setIsDragging(false), 80);
                    const threshold = 55;
                    const velocity = 250;
                    if (info.offset.x < -threshold || info.velocity.x < -velocity) {
                      go(1);
                    } else if (info.offset.x > threshold || info.velocity.x > velocity) {
                      go(-1);
                    }
                  }}
                  whileDrag={{ scale: 1.02, rotate: 2 }}
                  animate={{
                    x: offset * 26,
                    y: offset * 16,
                    scale: 1 - offset * 0.05,
                    opacity: visible ? 1 : 0,
                    filter: isFront ? "brightness(1)" : "brightness(0.45)",
                    zIndex: CERTS.length - offset,
                  }}
                  transition={{ type: "spring", stiffness: 260, damping: 28 }}
                  className={`absolute inset-0 overflow-hidden rounded-3xl p-6 text-left sm:p-8 select-none transition-shadow ${
                    isFront
                      ? "cursor-grab active:cursor-grabbing shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                      : "cursor-pointer"
                  }`}
                  style={{
                    background: `linear-gradient(140deg, ${cert.color}1f, rgba(10,10,15,0.94))`,
                    border: `1px solid ${cert.color}44`,
                    backdropFilter: "blur(16px)",
                    pointerEvents: visible ? "auto" : "none",
                  }}
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-14 -top-14 h-52 w-52 rounded-full"
                    style={{ background: `${cert.color}33`, filter: "blur(60px)" }}
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -bottom-14 -left-14 h-52 w-52 rounded-full"
                    style={{ background: `${cert.color}22`, filter: "blur(60px)" }}
                  />

                  <div className="relative flex h-full flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <span
                        className="mono-label inline-flex items-center gap-2 rounded-full px-3 py-1.5"
                        style={{ color: cert.color, background: `${cert.color}1f` }}
                      >
                        <Award className="h-3.5 w-3.5" /> {cert.category}
                      </span>
                      <div className="flex items-center gap-2">
                        {cert.pdf && (
                          <a
                            href={cert.pdf}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-white transition hover:scale-105 hover:opacity-90"
                            style={{ backgroundColor: cert.color }}
                            title="Open Certificate PDF directly"
                          >
                            <FileText className="h-3 w-3" /> PDF
                          </a>
                        )}
                        <span
                          className="mono-label inline-flex items-center gap-1.5"
                          style={{ color: "#34d399" }}
                        >
                          <CheckCircle2 className="h-3.5 w-3.5" /> Verified
                        </span>
                      </div>
                    </div>

                    <h3 className="mt-6 font-display text-2xl font-bold leading-snug text-white sm:text-[28px]">
                      {cert.title}
                    </h3>
                    <p className="mt-3 text-sm text-white/60">{cert.issuer}</p>
                    <p className="mono-label mt-2 text-white/35">{cert.recipient}</p>

                    <div className="mt-auto flex flex-col gap-4 pt-6 sm:flex-row sm:items-end sm:justify-between">
                      <div>
                        <p className="mono-label text-white/40">{cert.date}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {cert.tags.map((t) => (
                            <span
                              key={t}
                              className="glass-card rounded-full px-3 py-1 font-mono text-[10px] text-white/65"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className="mono-label inline-flex shrink-0 items-center gap-1.5"
                          style={{ color: cert.color }}
                        >
                          {cert.pdf ? "Inspect & Verify" : "View Details"}{" "}
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Dots Indicator */}
          <div className="mt-10 flex justify-center gap-2">
            {CERTS.map((c, i) => (
              <button
                key={c.title}
                type="button"
                aria-label={`Show certificate ${i + 1}`}
                onClick={() => setIndex(i)}
                className="h-1.5 rounded-full transition-all"
                style={{
                  width: i === index ? 28 : 10,
                  background: i === index ? c.color : "rgba(255,255,255,0.18)",
                }}
              />
            ))}
          </div>
        </FadeUp>
      )}

      {/* ===================== VIEW MODE 2: EXPANSIVE GRID SHOWCASE ===================== */}
      {viewMode === "grid" && (
        <div>
          {/* Category Filter Pills */}
          <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
            {FILTER_TABS.map((tab) => {
              const count =
                tab.id === "all"
                  ? CERTS.length
                  : CERTS.filter((c) => c.group === tab.id).length;
              const active = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFilter(tab.id)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                    active
                      ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                      : "glass-card text-white/70 hover:text-white"
                  }`}
                >
                  {tab.label} ({count})
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCerts.map((cert) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -4, borderColor: cert.color }}
                onClick={() => setOpen(cert)}
                className="glass-card group relative flex flex-col justify-between overflow-hidden rounded-3xl p-6 text-left cursor-pointer"
                style={{
                  background: `linear-gradient(145deg, ${cert.color}14, rgba(10,10,15,0.92))`,
                  border: `1px solid ${cert.color}33`,
                }}
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span
                      className="mono-label inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px]"
                      style={{ color: cert.color, background: `${cert.color}1f` }}
                    >
                      <Award className="h-3 w-3" /> {cert.category}
                    </span>
                    <span
                      className="mono-label inline-flex items-center gap-1 text-[11px]"
                      style={{ color: "#34d399" }}
                    >
                      <CheckCircle2 className="h-3 w-3" /> Verified
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-xl font-bold text-white transition-colors group-hover:text-white">
                    {cert.title}
                  </h3>
                  <p className="mt-2 text-xs text-white/60">{cert.issuer}</p>
                  <p className="mono-label mt-1 text-[11px] text-white/35">{cert.recipient}</p>
                  <p className="mono-label mt-3 text-xs text-white/45">{cert.date}</p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {cert.tags.map((t) => (
                      <span
                        key={t}
                        className="glass-card rounded-full px-2.5 py-0.5 font-mono text-[10px] text-white/65"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div
                  className="mt-6 flex items-center justify-between gap-3 pt-4"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
                >
                  {cert.pdf ? (
                    <a
                      href={cert.pdf}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-semibold text-white transition hover:opacity-90"
                      style={{ backgroundColor: cert.color }}
                    >
                      <FileText className="h-3.5 w-3.5" /> View PDF
                    </a>
                  ) : (
                    <span className="mono-label text-[11px] text-white/40">Verified Online</span>
                  )}
                  <span
                    className="mono-label inline-flex items-center gap-1 text-xs"
                    style={{ color: cert.color }}
                  >
                    Details <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* ===================== DETAILED VERIFICATION MODAL ===================== */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[70] grid place-items-center overflow-y-auto p-5"
            style={{ backgroundColor: "rgba(3,4,10,0.82)", backdropFilter: "blur(10px)" }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg rounded-3xl p-7 sm:p-8"
              style={{ backgroundColor: "#0c0919", border: `1px solid ${open.color}55` }}
            >
              <button
                type="button"
                aria-label="Close"
                onClick={() => setOpen(null)}
                className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full text-white/50 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>

              <span
                className="mono-label rounded-full px-3 py-1.5 text-xs"
                style={{ color: open.color, background: `${open.color}1f` }}
              >
                {open.category}
              </span>

              <h3 className="mt-4 font-display text-2xl font-bold leading-snug text-white">
                {open.title}
              </h3>

              <dl className="mt-6 space-y-3.5 text-sm">
                {[
                  ["Issuer", open.issuer],
                  ["Recipient", open.recipient],
                  ["Date", open.date],
                  ["Credential", open.credential ?? "Verified on Official Records"],
                ].map(([k, v]) => (
                  <div key={k} className="flex flex-col gap-1 sm:flex-row sm:gap-3">
                    <dt className="mono-label w-28 shrink-0 text-white/35">{k}</dt>
                    <dd className="text-white/80">{v}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8 flex flex-wrap gap-3">
                {open.pdf && (
                  <a
                    href={open.pdf}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-lg transition-opacity hover:opacity-90"
                    style={{ backgroundColor: open.color }}
                  >
                    <FileText className="h-4 w-4" /> Open Certificate PDF
                  </a>
                )}
                {open.verify && (
                  <a
                    href={open.verify}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white/85 transition-colors hover:text-white"
                    style={{
                      border: "1px solid rgba(255,255,255,0.18)",
                      background: "rgba(255,255,255,0.06)",
                    }}
                  >
                    <ExternalLink className="h-4 w-4" /> Verify on Official Portal{" "}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}

