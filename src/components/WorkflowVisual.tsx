const nodes = [
  { label: "Input", sublabel: "Data arrives", delay: 0 },
  { label: "Process", sublabel: "Rules applied", delay: 0.5 },
  { label: "Automate", sublabel: "Action taken", delay: 1.0 },
  { label: "Output", sublabel: "Result delivered", delay: 1.5 },
];

export default function WorkflowVisual() {
  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <div className="flex items-center justify-between gap-2 sm:gap-4 px-2">
        {nodes.map((node, i) => (
          <div key={node.label} className="flex items-center flex-1 last:flex-none">
            <div
              className="flex flex-col items-center gap-2 sm:gap-3 flex-shrink-0"
              style={{
                animation: `scaleIn 0.6s cubic-bezier(0.16,1,0.3,1) ${0.8 + node.delay}s forwards`,
                opacity: 0,
              }}
            >
              <div className="relative group">
                <div className="absolute inset-0 rounded-xl bg-emerald-500/10 blur-xl animate-pulseGlow" />
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl border border-neutral-700/80 bg-neutral-900/80 backdrop-blur-sm flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.6)]" />
                </div>
              </div>
              <div className="text-center">
                <p className="text-[10px] sm:text-xs font-semibold text-white tracking-tight">
                  {node.label}
                </p>
                <p className="text-[9px] sm:text-[10px] text-neutral-500 mt-0.5 hidden sm:block">
                  {node.sublabel}
                </p>
              </div>
            </div>

            {i < nodes.length - 1 && (
              <div className="flex-1 relative mx-1 sm:mx-2 h-px bg-neutral-800 self-start mt-7 sm:mt-8 min-w-[24px]">
                <div className="absolute inset-0 overflow-hidden">
                  <div
                    className="absolute top-0 bottom-0 w-1 h-1 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.8)]"
                    style={{ animation: `flowDot 2.5s linear ${1 + node.delay}s infinite` }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
