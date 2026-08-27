import { motion } from "motion/react";
import { useState } from "react";
import { Github, Linkedin, Loader2, Mail, Phone, Send, Check } from "lucide-react";
import { FadeUp, Section, SectionHeading, SOCIALS } from "./shared";

const INFO = [
  {
    Icon: Mail,
    label: "Email",
    value: "rahulajay558@gmail.com",
    href: "mailto:rahulajay558@gmail.com",
    color: "#a855f7",
  },
  { Icon: Phone, label: "Phone", value: "+91 9159187311", href: "tel:+919159187311", color: "#22d3ee" },
  {
    Icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/rahul-r-8a1385267",
    href: SOCIALS.linkedin,
    color: "#38bdf8",
  },
  { Icon: Github, label: "GitHub", value: "github.com/Rahul180110", href: SOCIALS.github, color: "#c084fc" },
];

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [state, setState] = useState<"idle" | "loading" | "sent">("idle");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setState("loading");
    setTimeout(() => {
      const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
      window.location.href = `mailto:rahulajay558@gmail.com?subject=${encodeURIComponent(
        `Portfolio enquiry from ${form.name}`,
      )}&body=${body}`;
      setState("sent");
      setTimeout(() => setState("idle"), 5000);
    }, 800);
  };

  const inputClass =
    "w-full rounded-xl bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-shadow focus:border-cyan-400/60 focus:shadow-[0_0_0_3px_rgba(34,211,238,0.18)]";

  return (
    <Section id="contact" tone="secondary">
      <SectionHeading
        number="07. Contact"
        numberColor="#22d3ee"
        title="Let's Build Together"
        subtitle="Have a project in mind or just want to say hi? Drop a message — I'm always open to discussing new opportunities."
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          {INFO.map((item, i) => (
            <FadeUp key={item.label} delay={i * 0.07}>
              <motion.a
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                whileHover={{ x: 4, borderColor: item.color }}
                className="glass-card flex items-center gap-4 rounded-2xl p-5"
              >
                <span
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-xl"
                  style={{ background: `${item.color}1f`, color: item.color }}
                >
                  <item.Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="mono-label block text-white/35">{item.label}</span>
                  <span className="block truncate text-sm text-white/85">{item.value}</span>
                </span>
              </motion.a>
            </FadeUp>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="glass-card rounded-3xl p-6 sm:p-8"
        >
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="mono-label mb-2 block text-white/40" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your name"
                className={inputClass}
                style={{ border: "1px solid rgba(255,255,255,0.1)" }}
              />
            </div>
            <div>
              <label className="mono-label mb-2 block text-white/40" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@company.com"
                className={inputClass}
                style={{ border: "1px solid rgba(255,255,255,0.1)" }}
              />
            </div>
            <div>
              <label className="mono-label mb-2 block text-white/40" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell me about your project…"
                className={inputClass}
                style={{ border: "1px solid rgba(255,255,255,0.1)" }}
              />
            </div>

            <button
              type="submit"
              disabled={state !== "idle"}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 font-semibold text-white disabled:opacity-90"
              style={
                state === "sent"
                  ? { backgroundColor: "rgba(52,211,153,0.15)", color: "#34d399" }
                  : { backgroundImage: "linear-gradient(135deg,#a855f7,#22d3ee)" }
              }
            >
              {state === "idle" && (
                <>
                  <Send className="h-4 w-4" /> Send Message
                </>
              )}
              {state === "loading" && (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Sending message...
                </>
              )}
              {state === "sent" && (
                <>
                  <Check className="h-4 w-4" /> Message Sent!
                </>
              )}
            </button>
            <p className="mono-label text-center text-white/30">
              Opens your mail client with the message pre-filled.
            </p>
          </form>
        </motion.div>
      </div>
    </Section>
  );
}
