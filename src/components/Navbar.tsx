import Link from "next/link";
import { Car, Database, Info, Sparkles } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/70 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-cyan-400/15 text-cyan-200 ring-1 ring-cyan-300/25">
            <Car size={22} />
          </span>
          <span>
            <span className="block text-sm font-semibold tracking-wide text-white">AutoTop 3D</span>
            <span className="block text-xs text-slate-400">畅销车型 3D 展厅</span>
          </span>
        </Link>
        <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 text-sm text-slate-300">
          <Link className="flex items-center gap-2 rounded-full px-3 py-2 hover:bg-white/10 hover:text-white" href="/">
            <Sparkles size={16} />
            <span className="hidden sm:inline">榜单</span>
          </Link>
          <Link className="flex items-center gap-2 rounded-full px-3 py-2 hover:bg-white/10 hover:text-white" href="/data-source">
            <Database size={16} />
            <span className="hidden sm:inline">数据源</span>
          </Link>
          <Link className="flex items-center gap-2 rounded-full px-3 py-2 hover:bg-white/10 hover:text-white" href="/about">
            <Info size={16} />
            <span className="hidden sm:inline">关于</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
