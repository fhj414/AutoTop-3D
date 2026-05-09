export function LoadingCar() {
  return (
    <div className="absolute inset-0 z-10 grid place-items-center bg-slate-950/40 backdrop-blur-sm">
      <div className="w-72 rounded-[1.5rem] border border-white/10 bg-white/8 p-5">
        <div className="h-4 w-28 animate-pulse rounded-full bg-cyan-200/30" />
        <div className="mt-5 h-28 animate-pulse rounded-3xl bg-white/10" />
        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="h-3 animate-pulse rounded-full bg-white/10" />
          <div className="h-3 animate-pulse rounded-full bg-white/10" />
          <div className="h-3 animate-pulse rounded-full bg-white/10" />
        </div>
      </div>
    </div>
  );
}
