import { useEffect, useState } from "react";
import { ArrowRight, Check, X, Loader2 } from "lucide-react";
import { useInView, useCountUp } from "@/hooks/useCountUp";
import { useScrollProgress } from "@/hooks/useMousePosition";
import AnimatedBackground from "@/components/AnimatedBackground";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import WorkflowVisual from "@/components/WorkflowVisual";
import TiltCard from "@/components/TiltCard";
import AuditFormModal from "@/components/AuditFormModal";

const AnimatedSection = ({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => {
  const { ref, inView } = useInView(0.15);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0) blur(0)" : "translateY(32px) blur(4px)",
        transition: `opacity 0.8s ease ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

const CTAButton = ({
  size = "default",
  className = "",
  onClick,
}: {
  size?: "default" | "large";
  className?: string;
  onClick?: () => void;
}) => (
  <button
    onClick={onClick}
    className={`group relative inline-flex items-center gap-3 bg-white text-black font-semibold tracking-tight rounded-full transition-all duration-300 hover:bg-neutral-100 hover:scale-[1.02] active:scale-[0.98] hover:shadow-[0_0_40px_rgba(16,185,129,0.3)] ${size === "large" ? "px-10 py-5 text-lg" : "px-8 py-4 text-base"} ${className}`}
  >
    Request an Automation Audit
    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-black text-white transition-transform duration-300 group-hover:translate-x-1">
      <ArrowRight className="w-3 h-3" />
    </span>
  </button>
);

const Divider = () => (
  <div className="w-full h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent" />
);

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <span className="text-xs font-medium tracking-widest uppercase text-neutral-600 mb-4 block">
    {children}
  </span>
);

const SectionGlow = () => (
  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-emerald-500/[0.03] blur-[80px] pointer-events-none -z-10" />
);

function StatItem({ value, suffix, label, start }: { value: number; suffix: string; label: string; start: boolean }) {
  const count = useCountUp(value, 2000, start);
  return (
    <div className="bg-neutral-900/80 p-8 text-center relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative text-4xl font-bold text-white mb-2 tabular-nums">
        {count}
        {suffix}
      </div>
      <div className="relative text-xs text-neutral-500 leading-relaxed">{label}</div>
    </div>
  );
}

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const scrollProgress = useScrollProgress();
  const { ref: statsRef, inView: statsInView } = useInView(0.3);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const forItems = [
    { title: "You run a real operation", desc: "You have processes, people, and workflows — not just an idea." },
    { title: "Your team does repetitive manual work", desc: "Data entry, report generation, handoffs, follow-ups — tasks that happen on a schedule." },
    { title: "You want clarity before committing", desc: "You're not looking to spend blindly. You want to understand what's possible first." },
    { title: "Your tools don't talk to each other", desc: "You're copying data between systems, or relying on people to bridge the gaps." },
  ];

  const notForItems = [
    { title: "You're looking for a magic button", desc: "Automation is engineering, not a shortcut. It requires understanding your system first." },
    { title: "It's a hobby project or experiment", desc: "We work with businesses where the stakes are real and the workflows are established." },
    { title: "You expect instant results", desc: "Good systems take time to design correctly. We won't rush something that needs to last." },
    { title: "You want someone to decide for you", desc: "We provide recommendations. You make the call. We don't push, and we don't oversell." },
  ];

  const processSteps = [
    { step: "01", title: "Understand the current system", desc: "We map how work actually flows through your business — not how it's supposed to, but how it does." },
    { step: "02", title: "Identify bottlenecks and waste", desc: "We look for the places where time, attention, and money are being spent on things that don't require a human." },
    { step: "03", title: "Design practical automations", desc: "We propose specific, scoped solutions — not a platform overhaul. Each automation has a clear purpose and measurable outcome." },
    { step: "04", title: "Decide together what makes sense", desc: "You review the recommendations. We answer questions. You choose what to move forward with, if anything." },
  ];

  const industries = ["Professional Services", "E-commerce", "Healthcare Admin", "Logistics", "Financial Operations", "SaaS", "Real Estate", "Manufacturing"];

  const timeline = [
    { num: "1", title: "We review your submission", desc: "Within 48 hours, we'll look at what you've shared and confirm we're a good fit for the audit.", note: null as string | null },
    { num: "2", title: "Short intro call — 20 minutes", desc: "We ask questions about your workflows, team, and where you feel the most friction. You ask us anything you want.", note: "No pitch. No deck. Just a conversation." },
    { num: "3", title: "We do the audit", desc: "Based on what we learn, we map your current workflows and identify automation opportunities. This takes 3–5 business days.", note: null },
    { num: "4", title: "You receive the findings", desc: "A clear, written summary of what we found — what's worth automating, what isn't, and why.", note: null },
    { num: "5", title: "You decide what to do next", desc: "If you want to move forward with us, we'll talk about scope and approach. If not, the audit is yours to keep and use however you like.", note: "No pressure. No follow-up sequence." },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans antialiased overflow-x-hidden relative">
      <AnimatedBackground />
      <ScrollProgressBar progress={scrollProgress} />
      <AuditFormModal open={modalOpen} onClose={closeModal} />

      {/* ── NAV ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-neutral-800/60"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="1" y="1" width="5" height="5" rx="1" fill="#0a0a0a" />
                <rect x="8" y="1" width="5" height="5" rx="1" fill="#0a0a0a" />
                <rect x="1" y="8" width="5" height="5" rx="1" fill="#0a0a0a" />
                <rect x="8" y="8" width="5" height="5" rx="1" fill="#0a0a0a" opacity="0.4" />
              </svg>
            </div>
            <span className="text-sm font-semibold tracking-tight text-white">Meridian Systems</span>
          </div>
          <button
            onClick={openModal}
            className="hidden sm:inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors duration-200 border border-neutral-700 hover:border-neutral-500 rounded-full px-5 py-2.5"
          >
            Request Audit
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-12 text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-white/[0.02] blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto">
          <div style={{ opacity: 1, animation: "fadeSlideUp 0.8s ease forwards" }}>
            <span className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-neutral-500 border border-neutral-800 rounded-full px-4 py-2 mb-10 animate-pulseGlow">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              AI Automation Agency
            </span>
          </div>

          <div style={{ opacity: 0, animation: "fadeSlideUp 0.8s ease 0.15s forwards" }}>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] mb-8">
              Your operations
              <br />
              <span className="text-neutral-600">shouldn't run on</span>
              <br />
              manual effort.
            </h1>
          </div>

          <div style={{ opacity: 0, animation: "fadeSlideUp 0.8s ease 0.3s forwards" }}>
            <p className="text-lg sm:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed mb-12">
              Most businesses aren't missing technology — they're missing a coherent
              system. We design automations that fit how your business actually works,
              not how a software vendor thinks it should.
            </p>
          </div>

          <div style={{ opacity: 0, animation: "fadeSlideUp 0.8s ease 0.45s forwards" }}>
            <CTAButton size="large" onClick={openModal} />
            <p className="mt-5 text-sm text-neutral-600">No commitment. No sales call. Just clarity.</p>
          </div>
        </div>

        {/* Workflow visual */}
        <div
          className="relative w-full mt-20"
          style={{ opacity: 0, animation: "fadeSlideUp 1s ease 0.8s forwards" }}
        >
          <WorkflowVisual />
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
          style={{ animation: "fadeIn 1s ease 1.2s forwards", opacity: 0 }}
        >
          <span className="text-xs tracking-widest uppercase text-neutral-500">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-neutral-500 to-transparent" />
        </div>
      </section>

      <Divider />

      {/* ── WHO IT'S FOR / NOT FOR ── */}
      <section className="relative py-28 px-6">
        <SectionGlow />
        <div className="max-w-6xl mx-auto relative">
          <AnimatedSection className="text-center mb-16">
            <SectionLabel>Fit</SectionLabel>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
              This is built for a specific kind of business.
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6">
            <TiltCard
              delay={100}
              className="relative bg-neutral-900/60 border border-neutral-800 rounded-2xl p-8 lg:p-10 overflow-hidden"
            >
              <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-emerald-500/[0.06] blur-3xl" />
              <div className="flex items-center gap-3 mb-8 relative">
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">This is for you if…</h3>
              </div>
              <ul className="space-y-5 relative">
                {forItems.map((item) => (
                  <li key={item.title} className="flex gap-4 group">
                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0 group-hover:shadow-[0_0_8px_rgba(16,185,129,0.8)] transition-shadow duration-300" />
                    <div>
                      <p className="text-white font-medium text-sm mb-1">{item.title}</p>
                      <p className="text-neutral-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </TiltCard>

            <TiltCard
              delay={200}
              className="relative bg-neutral-900/30 border border-neutral-800/50 rounded-2xl p-8 lg:p-10 overflow-hidden"
            >
              <div className="flex items-center gap-3 mb-8 relative">
                <div className="w-8 h-8 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center">
                  <X className="w-3.5 h-3.5 text-neutral-400" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-400">This isn't for you if…</h3>
              </div>
              <ul className="space-y-5 relative">
                {notForItems.map((item) => (
                  <li key={item.title} className="flex gap-4">
                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-neutral-600 flex-shrink-0" />
                    <div>
                      <p className="text-neutral-400 font-medium text-sm mb-1">{item.title}</p>
                      <p className="text-neutral-600 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </TiltCard>
          </div>
        </div>
      </section>

      <Divider />

      {/* ── HOW IT WORKS ── */}
      <section className="relative py-28 px-6">
        <SectionGlow />
        <div className="max-w-6xl mx-auto relative">
          <AnimatedSection className="text-center mb-20">
            <SectionLabel>Process</SectionLabel>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-5">How we approach it.</h2>
            <p className="text-neutral-500 text-lg max-w-xl mx-auto">
              No proprietary frameworks. No jargon. Just a structured way of understanding
              your business before touching anything.
            </p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((item, i) => (
              <AnimatedSection key={item.step} delay={i * 100} className="relative">
                <div className="relative bg-neutral-900/40 border border-neutral-800 rounded-2xl p-7 h-full hover:border-neutral-700 transition-all duration-300 hover:bg-neutral-900/60 overflow-hidden group">
                  <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-emerald-500/[0.04] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="text-xs font-mono text-neutral-700 mb-5 block group-hover:text-emerald-600 transition-colors duration-300">
                    {item.step}
                  </span>
                  <h3 className="text-white font-semibold text-base mb-3 leading-snug">{item.title}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
                {i < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-neutral-700 z-10" />
                )}
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ── CREDIBILITY ── */}
      <section className="relative py-28 px-6">
        <SectionGlow />
        <div className="max-w-6xl mx-auto relative">
          <AnimatedSection className="text-center mb-16">
            <SectionLabel>Background</SectionLabel>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Built on systems experience,
              <br />
              not theory.
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-800 rounded-2xl overflow-hidden mb-12">
              <StatItem value={8} suffix="+" label="Years working with operational systems" start={statsInView} />
              <StatItem value={120} suffix="+" label="Automations running in production today" start={statsInView} />
              <StatItem value={14} suffix="" label="Industries worked across" start={statsInView} />
              <StatItem value={0} suffix="" label="Automations built without a clear brief" start={statsInView} />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={200} className="text-center">
            <p className="text-sm text-neutral-600 mb-5 tracking-wide">Work across sectors including</p>
            <div className="flex flex-wrap justify-center gap-2">
              {industries.map((tag, i) => (
                <span
                  key={tag}
                  className="text-xs text-neutral-500 border border-neutral-800 rounded-full px-4 py-2 hover:border-emerald-600/40 hover:text-emerald-400 hover:bg-emerald-500/[0.05] transition-all duration-200"
                  style={{
                    opacity: 0,
                    animation: `slideUp 0.5s ease ${i * 60}ms forwards`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={300} className="mt-16">
            <div className="flex flex-wrap justify-center items-center gap-10 opacity-30">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center gap-2 text-neutral-400">
                  <div className={`rounded-lg bg-neutral-700 flex items-center justify-center ${i % 2 === 0 ? "w-8 h-8" : "w-6 h-6"}`} />
                  <div className="h-2 bg-neutral-700 rounded-full w-16" />
                </div>
              ))}
            </div>
            <p className="text-center text-xs text-neutral-700 mt-4">Client logos available upon request</p>
          </AnimatedSection>
        </div>
      </section>

      <Divider />

      {/* ── AUDIT OFFER ── */}
      <section className="relative py-28 px-6">
        <div className="max-w-4xl mx-auto relative">
          <SectionGlow />
          <AnimatedSection className="text-center mb-16">
            <SectionLabel>The Offer</SectionLabel>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">Free Automation Audit.</h2>
            <p className="text-neutral-400 text-lg max-w-2xl mx-auto leading-relaxed">
              A structured review of your current workflows — where time is being lost,
              where handoffs break down, and where automation would actually make a
              difference.
            </p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            {[
              { title: "Workflow Review", desc: "We examine how work moves through your business — inputs, outputs, and everything in between." },
              { title: "Opportunity Mapping", desc: "We identify specific points where automation would reduce friction, cost, or error." },
              { title: "Clear Recommendations", desc: "You receive a written summary of findings — useful regardless of whether we work together." },
            ].map((item, i) => (
              <AnimatedSection
                key={item.title}
                delay={i * 100}
                className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-7 text-center hover:border-neutral-700 hover:bg-neutral-900/70 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-neutral-800 group-hover:bg-emerald-500/10 group-hover:border group-hover:border-emerald-500/20 flex items-center justify-center mx-auto mb-5 transition-all duration-300">
                  <div className="w-4 h-4 rounded-full bg-neutral-600 group-hover:bg-emerald-400 group-hover:shadow-[0_0_10px_rgba(16,185,129,0.6)] transition-all duration-300" />
                </div>
                <h3 className="text-white font-semibold text-sm mb-3">{item.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{item.desc}</p>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection
            delay={300}
            className="bg-neutral-900/30 border border-neutral-800 rounded-2xl p-8 text-center"
          >
            <p className="text-neutral-400 text-base leading-relaxed max-w-2xl mx-auto">
              The audit is genuinely useful on its own. If you take the findings and
              implement them yourself, or work with someone else — that's completely
              fine. We'd rather give you something valuable than waste your time.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <Divider />

      {/* ── WHAT HAPPENS NEXT ── */}
      <section className="relative py-28 px-6">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <SectionLabel>After You Submit</SectionLabel>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">Here's exactly what happens.</h2>
          </AnimatedSection>

          <div className="relative">
            <div className="absolute left-[19px] sm:left-[23px] top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/30 via-neutral-800 to-neutral-800" />

            <div className="space-y-10">
              {timeline.map((item, i) => (
                <AnimatedSection key={item.num} delay={i * 80}>
                  <div className="flex gap-6 sm:gap-8 group">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-neutral-900 border border-neutral-700 group-hover:border-emerald-500/40 flex items-center justify-center z-10 transition-colors duration-300">
                      <span className="text-xs font-mono text-neutral-400 group-hover:text-emerald-400 transition-colors duration-300">
                        {item.num}
                      </span>
                    </div>
                    <div className="pt-2 pb-2">
                      <h3 className="text-white font-semibold text-base mb-2">{item.title}</h3>
                      <p className="text-neutral-500 text-sm leading-relaxed mb-2">{item.desc}</p>
                      {item.note && (
                        <span className="inline-block text-xs text-neutral-600 border border-neutral-800 rounded-full px-3 py-1">
                          {item.note}
                        </span>
                      )}
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* ── FINAL CTA ── */}
      <section className="relative py-32 px-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-emerald-500/[0.04] blur-[100px] pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative">
          <AnimatedSection>
            <SectionLabel>Get Started</SectionLabel>
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-tight mb-8">
              Start with
              <br />
              <span className="text-neutral-600">a conversation.</span>
            </h2>
            <p className="text-neutral-500 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
              Request a free Automation Audit. We'll review your workflows, identify
              what's worth automating, and give you a clear picture of what's possible
              — no strings attached.
            </p>
            <CTAButton size="large" onClick={openModal} />
            <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-neutral-600">
              {["No commitment required", "No sales pressure", "Findings are yours to keep"].map((item) => (
                <span key={item} className="flex items-center gap-2">
                  <Check className="w-3 h-3 text-neutral-700" />
                  {item}
                </span>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-neutral-900 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-white flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <rect x="1" y="1" width="5" height="5" rx="1" fill="#0a0a0a" />
                <rect x="8" y="1" width="5" height="5" rx="1" fill="#0a0a0a" />
                <rect x="1" y="8" width="5" height="5" rx="1" fill="#0a0a0a" />
                <rect x="8" y="8" width="5" height="5" rx="1" fill="#0a0a0a" opacity="0.4" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-neutral-500">Meridian Systems</span>
          </div>
          <p className="text-xs text-neutral-700">
            © {new Date().getFullYear()} Meridian Systems. All rights reserved.
          </p>
        </div>
      </footer>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}
