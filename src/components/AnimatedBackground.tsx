export default function AnimatedBackground() {
  return (
    <>
      {/* Aurora blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[10%] left-[15%] w-[400px] h-[400px] rounded-full bg-emerald-500/[0.06] blur-[100px] animate-aurora1" />
        <div className="absolute top-[50%] right-[10%] w-[350px] h-[350px] rounded-full bg-sky-500/[0.04] blur-[100px] animate-aurora2" />
        <div className="absolute bottom-[20%] left-[40%] w-[300px] h-[300px] rounded-full bg-emerald-400/[0.05] blur-[80px] animate-aurora3" />
      </div>

      {/* Grid with radial fade */}
      <div
        className="fixed inset-0 pointer-events-none -z-10"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          opacity: 0.025,
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 100%)",
        }}
      />

      {/* Grain texture */}
      <div className="grain-texture fixed inset-0 pointer-events-none -z-10 opacity-[0.015]" />
    </>
  );
}
