import { useEffect, useState } from "react";
import {
  Shield,
  Server,
  Network,
  Cloud,
  Database,
  Lock,
  ArrowRight,
  Activity,
  GitBranch,
  AlertTriangle,
  CheckCircle2,
  Terminal,
} from "lucide-react";
import { useInView, useCountUp, useScrollProgress } from "@/hooks";

/* ── Shared components ── */

const Reveal = ({
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
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

const SectionDivider = () => (
  <div className="w-full h-px bg-gradient-to-r from-transparent via-ink-700 to-transparent" />
);

const SectionTag = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-2 text-xs font-mono font-medium tracking-widest uppercase text-signal-500/70 mb-5">
    <span className="w-1 h-1 rounded-full bg-signal-500" />
    {children}
  </span>
);

/* ── Logo placeholder ── */

const LogoPlaceholder = ({ name }: { name: string }) => (
  <div className="flex items-center justify-center h-12 px-6 opacity-40 hover:opacity-70 transition-opacity duration-300">
    <span className="text-sm font-semibold tracking-tight text-neutral-400 whitespace-nowrap">
      {name}
    </span>
  </div>
);

/* ── Capability card ── */

const CapabilityCard = ({
  icon: Icon,
  title,
  risk,
  desc,
  delay,
}: {
  icon: typeof Shield;
  title: string;
  risk: string;
  desc: string;
  delay: number;
}) => {
  const { ref, inView } = useInView(0.2);
  return (
    <div
      ref={ref}
      className="group relative bg-ink-850/80 border border-ink-700/60 rounded-xl p-7 hover:border-signal-500/30 transition-all duration-300 overflow-hidden"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms, border-color 0.3s ease`,
      }}
    >
      <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-signal-500/[0.04] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-ink-700/80 border border-ink-600/50 flex items-center justify-center group-hover:bg-signal-500/10 group-hover:border-signal-500/20 transition-all duration-300">
          <Icon className="w-5 h-5 text-neutral-400 group-hover:text-signal-400 transition-colors duration-300" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-semibold text-sm tracking-tight mb-1">
            {title}
          </h3>
          <p className="text-xs font-mono text-signal-500/60 mb-2.5">{risk}</p>
          <p className="text-neutral-500 text-sm leading-relaxed">{desc}</p>
        </div>
      </div>
    </div>
  );
};

/* ── Metric item ── */

const MetricItem = ({
  value,
  suffix,
  label,
  start,
}: {
  value: number;
  suffix: string;
  label: string;
  start: boolean;
}) => {
  const count = useCountUp(value, 2200, start);
  return (
    <div className="flex flex-col items-center text-center px-4 py-6">
      <div className="text-3xl sm:text-4xl font-bold text-white tabular-nums mb-2 font-mono">
        {count}
        {suffix}
      </div>
      <div className="text-xs text-neutral-500 leading-relaxed max-w-[140px]">
        {label}
      </div>
    </div>
  );
};

/* ── Attack path diagram node ── */

const AttackNode = ({
  label,
  side,
  active,
  delay,
}: {
  label: string;
  side: "left" | "right";
  active: boolean;
  delay: number;
}) => {
  const { ref, inView } = useInView(0.3);
  return (
    <div
      ref={ref}
      className={`flex items-center gap-3 ${side === "right" ? "flex-row-reverse text-right" : ""}`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateX(0)" : side === "left" ? "translateX(-16px)" : "translateX(16px)",
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
      }}
    >
      <div
        className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
          active ? "bg-signal-400 animate-pulseDot" : "bg-neutral-700"
        }`}
      />
      <span
        className={`text-xs font-mono ${
          active ? "text-signal-400" : "text-neutral-500"
        }`}
      >
        {label}
      </span>
    </div>
  );
};

/* ── Main page ── */

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const scrollProgress = useScrollProgress();
  const { ref: metricsRef, inView: metricsInView } = useInView(0.3);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const capabilities = [
    {
      icon: Server,
      title: "Infrastructure Hardening",
      risk: "reduces lateral movement",
      desc: "Baseline configurations, access boundaries, and runtime policies that contain compromise within a single segment.",
    },
    {
      icon: Network,
      title: "API Security Posture",
      risk: "limits exposure from misconfigured endpoints",
      desc: "Continuous discovery of API surface, authentication gaps, and excessive scopes across internal and external endpoints.",
    },
    {
      icon: Cloud,
      title: "Cloud Configuration Guardrails",
      risk: "prevents privilege escalation paths",
      desc: "Policy-as-code enforcement across cloud accounts, preventing drift that creates unintended access paths.",
    },
    {
      icon: Database,
      title: "Data Pipeline Integrity",
      risk: "reduces risk of exfiltration via ETL/streams",
      desc: "Monitoring of data flows, access patterns, and egress points across pipelines and streaming infrastructure.",
    },
    {
      icon: Lock,
      title: "Internal Tool Segmentation",
      risk: "contains blast radius of compromised accounts",
      desc: "Network zoning and identity-aware proxies that limit what a single compromised credential can reach.",
    },
    {
      icon: GitBranch,
      title: "CI/CD Supply Chain Controls",
      risk: "reduces risk of malicious dependency injection",
      desc: "Signed builds, dependency pinning, and pipeline controls that prevent tampering between source and production.",
    },
  ];

  const sectors = ["Finance", "SaaS", "Healthcare", "E-commerce", "Infrastructure / DevOps"];

  const logos = [
    "Northwind Capital",
    "VaultGrid",
    "Meridian Health",
    "CommerceLogic",
    "StrataCloud",
    "Aperture Data",
    "SentinelOps",
    "Kestrel Pay",
  ];

  return (
    <div className="min-h-screen bg-ink-950 text-white font-sans antialiased overflow-x-hidden relative">
      {/* Background grid */}
      <div className="fixed inset-0 grid-bg grid-bg-fade pointer-events-none -z-10" />

      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-0.5 bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-signal-500 to-signal-300 transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* ── NAV ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-ink-950/85 backdrop-blur-xl border-b border-ink-800/60"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-signal-500/10 border border-signal-500/20 flex items-center justify-center">
              <Shield className="w-4 h-4 text-signal-400" />
            </div>
            <span className="text-sm font-semibold tracking-tight text-white">
              Aegis Security
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-7">
            <a href="#capabilities" className="text-sm text-neutral-400 hover:text-white transition-colors duration-200">
              Capabilities
            </a>
            <a href="#proof" className="text-sm text-neutral-400 hover:text-white transition-colors duration-200">
              Proof
            </a>
            <a href="#engage" className="text-sm text-neutral-400 hover:text-white transition-colors duration-200">
              Engagement
            </a>
          </div>
          <a
            href="#engage"
            className="inline-flex items-center gap-2 text-sm text-white border border-ink-600 hover:border-signal-500/40 rounded-full px-5 py-2.5 transition-all duration-200 hover:bg-signal-500/5"
          >
            Speak to security engineering
          </a>
        </div>
      </nav>

      {/* ── 1. POSITIONING (HERO) ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 text-center overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-signal-500/[0.04] blur-[120px] pointer-events-none" />

        {/* Terminal status bar */}
        <div
          className="relative mb-8 inline-flex items-center gap-2.5 font-mono text-xs text-signal-400 bg-signal-500/[0.06] border border-signal-500/20 rounded-full px-4 py-2"
          style={{ opacity: 0, animation: "fadeIn 0.6s ease 0.1s forwards" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-signal-400 animate-pulseDot" />
          <span className="tracking-wider">SYSTEM STATUS: MONITORING</span>
        </div>

        <div style={{ opacity: 0, animation: "fadeUp 0.8s ease 0.15s forwards" }}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] max-w-4xl mb-8">
            Reducing attack surface
            <br />
            <span className="text-neutral-500">across modern infrastructure.</span>
          </h1>
        </div>

        <div style={{ opacity: 0, animation: "fadeUp 0.8s ease 0.3s forwards" }}>
          <p className="text-lg sm:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed mb-10">
            We protect cloud infrastructure, APIs, internal tools, and data
            pipelines. Security engineering that maps to how your systems
            actually run — not a checklist.
          </p>
        </div>

        {/* Protected systems indicator */}
        <div style={{ opacity: 0, animation: "fadeUp 0.8s ease 0.45s forwards" }}>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { icon: Cloud, label: "Cloud" },
              { icon: Network, label: "APIs" },
              { icon: Lock, label: "Internal Tools" },
              { icon: Database, label: "Data Pipelines" },
            ].map((item) => (
              <span
                key={item.label}
                className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 border border-ink-700 bg-ink-850/60 rounded-lg px-3.5 py-2"
              >
                <item.icon className="w-3.5 h-3.5 text-signal-500/60" />
                {item.label}
              </span>
            ))}
          </div>
        </div>

        {/* No CTA in hero per spec — scroll indicator only */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ animation: "fadeIn 1s ease 1.2s forwards", opacity: 0 }}
        >
          <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-600">
            Continue
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-neutral-600 to-transparent" />
        </div>
      </section>

      <SectionDivider />

      {/* ── 2. WHO TRUSTS YOU ── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-12">
            <SectionTag>Trusted By</SectionTag>
            <p className="text-neutral-400 text-sm leading-relaxed max-w-md mx-auto">
              Trusted by teams operating in regulated and high-risk environments.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-8 mb-14">
              {logos.map((logo) => (
                <LogoPlaceholder key={logo} name={logo} />
              ))}
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="flex flex-wrap justify-center gap-2.5">
              {sectors.map((sector) => (
                <span
                  key={sector}
                  className="text-xs font-mono text-neutral-500 border border-ink-700 bg-ink-850/40 rounded-full px-4 py-2 hover:border-signal-500/30 hover:text-signal-400/80 transition-all duration-200"
                >
                  {sector}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <SectionDivider />

      {/* ── 3. CAPABILITIES ── */}
      <section id="capabilities" className="py-28 px-6 scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-16">
            <SectionTag>Capabilities</SectionTag>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-5">
              What we reduce.
            </h2>
            <p className="text-neutral-400 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              Each capability is framed by the risk it reduces — not the feature
              it is.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {capabilities.map((cap, i) => (
              <CapabilityCard
                key={cap.title}
                icon={cap.icon}
                title={cap.title}
                risk={cap.risk}
                desc={cap.desc}
                delay={i * 80}
              />
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ── 4. PROOF OF CONTROL ── */}
      <section id="proof" className="py-28 px-6 scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-16">
            <SectionTag>Proof of Control</SectionTag>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-5">
              Where controls intervene.
            </h2>
            <p className="text-neutral-400 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              A typical attack path and the points where our controls intercept
              lateral movement and escalation.
            </p>
          </Reveal>

          {/* Attack path diagram */}
          <Reveal delay={100}>
            <div className="relative bg-ink-900/60 border border-ink-700/50 rounded-2xl p-8 sm:p-10 mb-12 overflow-hidden">
              {/* Central spine */}
              <div className="relative">
                <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-neutral-700 via-neutral-700 to-neutral-800" />

                <div className="space-y-7">
                  {/* Step: Initial Access */}
                  <div className="grid grid-cols-2 gap-8 items-center">
                    <AttackNode label="Initial access — phished credential" side="left" active={false} delay={0} />
                    <div className="hidden sm:block" />
                  </div>

                  {/* Control 1 */}
                  <div className="grid grid-cols-2 gap-8 items-center">
                    <div className="hidden sm:block" />
                    <div
                      className="flex items-center gap-3 flex-row-reverse"
                      style={{ opacity: 0, animation: "fadeUp 0.5s ease 0.3s forwards" }}
                    >
                      <div className="w-2.5 h-2.5 rounded-full bg-signal-400 animate-pulseDot flex-shrink-0" />
                      <div className="text-right">
                        <span className="text-xs font-mono text-signal-400 block">
                          Internal Tool Segmentation
                        </span>
                        <span className="text-[10px] font-mono text-neutral-600">
                          blocks lateral access to admin tools
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Step: Privilege attempt */}
                  <div className="grid grid-cols-2 gap-8 items-center">
                    <AttackNode label="Privilege escalation attempt" side="left" active={false} delay={0.4} />
                    <div className="hidden sm:block" />
                  </div>

                  {/* Control 2 */}
                  <div className="grid grid-cols-2 gap-8 items-center">
                    <div className="hidden sm:block" />
                    <div
                      className="flex items-center gap-3 flex-row-reverse"
                      style={{ opacity: 0, animation: "fadeUp 0.5s ease 0.5s forwards" }}
                    >
                      <div className="w-2.5 h-2.5 rounded-full bg-signal-400 animate-pulseDot flex-shrink-0" />
                      <div className="text-right">
                        <span className="text-xs font-mono text-signal-400 block">
                          Cloud Configuration Guardrails
                        </span>
                        <span className="text-[10px] font-mono text-neutral-600">
                          prevents role assumption path
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Step: Data access */}
                  <div className="grid grid-cols-2 gap-8 items-center">
                    <AttackNode label="Data pipeline access attempt" side="left" active={false} delay={0.6} />
                    <div className="hidden sm:block" />
                  </div>

                  {/* Control 3 */}
                  <div className="grid grid-cols-2 gap-8 items-center">
                    <div className="hidden sm:block" />
                    <div
                      className="flex items-center gap-3 flex-row-reverse"
                      style={{ opacity: 0, animation: "fadeUp 0.5s ease 0.7s forwards" }}
                    >
                      <div className="w-2.5 h-2.5 rounded-full bg-signal-400 animate-pulseDot flex-shrink-0" />
                      <div className="text-right">
                        <span className="text-xs font-mono text-signal-400 block">
                          Data Pipeline Integrity
                        </span>
                        <span className="text-[10px] font-mono text-neutral-600">
                          detects anomalous egress pattern
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Terminal: contained */}
                  <div className="flex justify-center pt-2">
                    <div
                      className="inline-flex items-center gap-2 text-xs font-mono text-signal-400 bg-signal-500/[0.06] border border-signal-500/20 rounded-full px-4 py-2"
                      style={{ opacity: 0, animation: "fadeUp 0.5s ease 0.9s forwards" }}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Blast radius contained — alert triggered
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Metrics strip */}
          <Reveal delay={150}>
            <div ref={metricsRef} className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-ink-700/60 rounded-xl overflow-hidden border border-ink-700/50">
              <MetricItem value={11} suffix="m" label="Mean time to detect" start={metricsInView} />
              <MetricItem value={40} suffix="%" label="False positive reduction" start={metricsInView} />
              <MetricItem value={300} suffix="+" label="Cloud accounts covered" start={metricsInView} />
              <MetricItem value={1200} suffix="+" label="APIs under continuous scan" start={metricsInView} />
            </div>
          </Reveal>

          {/* Note */}
          <Reveal delay={200}>
            <p className="text-center text-xs text-neutral-600 mt-5 font-mono">
              Metrics from representative engagements. Actual results vary by
              environment scope and baseline maturity.
            </p>
          </Reveal>
        </div>
      </section>

      <SectionDivider />

      {/* ── 5. HOW WE ENGAGE ── */}
      <section id="engage" className="py-28 px-6 scroll-mt-20">
        <div className="max-w-3xl mx-auto">
          <Reveal className="text-center mb-14">
            <SectionTag>How We Engage</SectionTag>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-5">
              Start with a scoped assessment.
            </h2>
          </Reveal>

          <Reveal delay={100}>
            <div className="space-y-6 mb-12">
              <div className="flex gap-5">
                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-ink-850 border border-ink-700 flex items-center justify-center">
                  <span className="text-xs font-mono text-signal-400">01</span>
                </div>
                <div className="pt-1.5">
                  <p className="text-white font-medium text-sm mb-1.5">
                    Scoped assessment of your surface
                  </p>
                  <p className="text-neutral-500 text-sm leading-relaxed">
                    We start with a scoped assessment of your cloud, API, and
                    internal tool surface. No broad audits, no unnecessary
                    access.
                  </p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-ink-850 border border-ink-700 flex items-center justify-center">
                  <span className="text-xs font-mono text-signal-400">02</span>
                </div>
                <div className="pt-1.5">
                  <p className="text-white font-medium text-sm mb-1.5">
                    Attack path mapping
                  </p>
                  <p className="text-neutral-500 text-sm leading-relaxed">
                    We map likely attack paths and prioritise fixes by business
                    impact — not by theoretical severity scores alone.
                  </p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-ink-850 border border-ink-700 flex items-center justify-center">
                  <span className="text-xs font-mono text-signal-400">03</span>
                </div>
                <div className="pt-1.5">
                  <p className="text-white font-medium text-sm mb-1.5">
                    Flexible engagement models
                  </p>
                  <p className="text-neutral-500 text-sm leading-relaxed">
                    Advisory, co-managed, or embedded support — depending on your
                    team's capacity and the scope of work.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* CTA */}
          <Reveal delay={200}>
            <div className="bg-ink-900/60 border border-ink-700/50 rounded-2xl p-8 text-center">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-signal-400 mb-5">
                <Terminal className="w-3.5 h-3.5" />
                No commitment. No sales cycle.
              </div>
              <p className="text-neutral-400 text-sm leading-relaxed max-w-md mx-auto mb-7">
                Speak directly with a security engineer. We'll walk through your
                current setup and identify where your exposure is highest.
              </p>
              <a
                href="mailto:engineering@aegis-security.io"
                className="group inline-flex items-center gap-3 bg-white text-ink-950 font-semibold tracking-tight rounded-full px-8 py-4 text-base transition-all duration-300 hover:bg-neutral-200 hover:shadow-[0_0_40px_rgba(52,211,153,0.2)]"
              >
                Request a technical overview
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-ink-800 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-signal-500/10 border border-signal-500/20 flex items-center justify-center">
              <Shield className="w-3.5 h-3.5 text-signal-400" />
            </div>
            <span className="text-sm font-semibold text-neutral-500">
              Aegis Security
            </span>
          </div>
          <div className="flex items-center gap-5 text-xs text-neutral-600">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-signal-400 animate-pulseDot" />
              SOC 2 Type II
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-signal-400 animate-pulseDot" />
              ISO 27001
            </span>
            <span>© {new Date().getFullYear()} Aegis Security</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
