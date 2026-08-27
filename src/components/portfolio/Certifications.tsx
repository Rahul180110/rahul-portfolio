import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Award, ChevronLeft, ChevronRight, CheckCircle2, X, ArrowUpRight } from "lucide-react";
import { FadeUp, Section, SectionHeading } from "./shared";

type Cert = {
  category: string;
  color: string;
  title: string;
  issuer: string;
  recipient: string;
  date: string;
  credential?: string;
  verify?: string;
  tags: string[];
};

const CERTS: Cert[] = [
  {
    category: "National Competition",
    color: "#f59e0b",
    title: "Winner — IIT Bombay FOSSEE Mapathon 2023",
    issuer: "IIT Bombay · FOSSEE Project & IIT Tirupati I-Hub",
    recipient: "R.Rahul (Team Participant 1159)",
    date: "Feb 22 – May 06, 2023",
    credential: "Verification Code: 50c36",
    verify: "https://fossee.in/certificates/verify",
    tags: ["GIS & Mapping", "FOSSEE", "IIT Bombay", "Open Source Data"],
  },
  {
    category: "Apprenticeship Scheme",
    color: "#a855f7",
    title: "Certificate of Proficiency — NATS 2.0",
    issuer: "Ministry of Education (MoE), Govt of India · Tender Software",
    recipient: "Rahul Ramachandran",
    date: "Feb 17, 2025 – Feb 16, 2026 (12 Months)",
    credential: "Enrolment: ATNMY5780170 | Reg: CPYPOPGE24022113710",
    verify: "https://nats.education.gov.in/",
    tags: ["Software Development", "NATS 2.0", "Govt of India"],
  },
  {
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
    category: "Core Computer Science",
    color: "#22d3ee",
    title: "Cloud Computing Certification",
    issuer: "NPTEL · IIT Kharagpur",
    recipient: "Rahul R.",
    date: "2023",
    tags: ["Cloud Computing", "Distributed Systems", "NPTEL"],
  },
  {
    category: "Core Computer Science",
    color: "#ec4899",
    title: "RDBMS Training Certification",
    issuer: "IIT Bombay · Spoken Tutorial",
    recipient: "Rahul R.",
    date: "2023",
    tags: ["RDBMS", "SQL", "Database Systems"],
  },
];

export function Certifications() {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState<Cert | null>(null);

  const go = (dir: number) => setIndex((i) => (i + dir + CERTS.length) % CERTS.length);

  return (
    <Section id="certifications">
      <SectionHeading
        number="06. Certifications & Badges"
        numberColor="#f59e0b"
        title="Recognized Credentials"
        subtitle="Official certifications, government apprenticeships, and national competition awards."
        right={
          <div className="flex gap-3">
            <button
              type="button"
              aria-label="Previous certificate"
              onClick={() => go(-1)}
              className="glass-card grid h-11 w-11 place-items-center rounded-xl text-white/70 hover:text-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next certificate"
              onClick={() => go(1)}
              className="glass-card grid h-11 w-11 place-items-center rounded-xl text-white/70 hover:text-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        }
      />

      <FadeUp>
        <div className="relative mx-auto h-[420px] w-full max-w-[720px] sm:h-[380px]">
          {CERTS.map((cert, i) => {
            const offset = (i - index + CERTS.length) % CERTS.length;
            const visible = offset < 3;
            return (
              <motion.button
                key={cert.title}
                type="button"
                onClick={() => (offset === 0 ? setOpen(cert) : setIndex(i))}
                animate={{
                  x: offset * 26,
                  y: offset * 16,
                  scale: 1 - offset * 0.05,
                  opacity: visible ? 1 : 0,
                  filter: offset === 0 ? "brightness(1)" : "brightness(0.45)",
                  zIndex: CERTS.length - offset,
                }}
                transition={{ type: "spring", stiffness: 240, damping: 28 }}
                className="absolute inset-0 overflow-hidden rounded-3xl p-6 text-left sm:p-8"
                style={{
                  background: `linear-gradient(140deg, ${cert.color}1f, rgba(10,10,15,0.92))`,
                  border: `1px solid ${cert.color}44`,
                  backdropFilter: "blur(14px)",
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
                    <span
                      className="mono-label inline-flex items-center gap-1.5"
                      style={{ color: "#34d399" }}
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" /> Verified
                    </span>
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
                    <span
                      className="mono-label inline-flex shrink-0 items-center gap-1.5"
                      style={{ color: cert.color }}
                    >
                      Verify <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </FadeUp>

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

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[70] grid place-items-center overflow-y-auto p-5"
            style={{ backgroundColor: "rgba(3,4,10,0.8)", backdropFilter: "blur(8px)" }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg rounded-3xl p-7"
              style={{ backgroundColor: "#0c0919", border: `1px solid ${open.color}55` }}
            >
              <button
                type="button"
                aria-label="Close"
                onClick={() => setOpen(null)}
                className="absolute right-5 top-5 text-white/50 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
              <span
                className="mono-label rounded-full px-3 py-1.5"
                style={{ color: open.color, background: `${open.color}1f` }}
              >
                {open.category}
              </span>
              <h3 className="mt-4 font-display text-2xl font-bold text-white">{open.title}</h3>
              <dl className="mt-5 space-y-3 text-sm">
                {[
                  ["Issuer", open.issuer],
                  ["Recipient", open.recipient],
                  ["Date", open.date],
                  ["Credential", open.credential ?? "—"],
                ].map(([k, v]) => (
                  <div key={k} className="flex flex-col gap-1 sm:flex-row sm:gap-3">
                    <dt className="mono-label w-28 shrink-0 text-white/35">{k}</dt>
                    <dd className="text-white/75">{v}</dd>
                  </div>
                ))}
              </dl>
              {open.verify && (
                <a
                  href={open.verify}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-7 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white"
                  style={{ backgroundColor: open.color }}
                >
                  Verify credential <ArrowUpRight className="h-4 w-4" />
                </a>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
