import { useTilt } from "@/hooks/useTilt";

export default function TiltCard({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, tilt, glowPos, handleMouseMove, handleMouseLeave } = useTilt(6);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.2s ease-out, box-shadow 0.3s ease",
        transformStyle: "preserve-3d",
        animation: `slideUp 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}ms forwards`,
        opacity: 0,
      }}
    >
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(400px circle at ${glowPos.x}% ${glowPos.y}%, rgba(16,185,129,0.08), transparent 40%)`,
        }}
      />
      {children}
    </div>
  );
}
