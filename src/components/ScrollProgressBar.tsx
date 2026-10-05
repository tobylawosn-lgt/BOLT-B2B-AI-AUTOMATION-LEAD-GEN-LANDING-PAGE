export default function ScrollProgressBar({
  progress,
}: {
  progress: number;
}) {
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-0.5 bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-sky-400 transition-all duration-75 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
