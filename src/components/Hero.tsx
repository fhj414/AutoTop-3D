import { Gauge, Rotate3D, TrendingUp } from "lucide-react";
import { FilterBar } from "@/components/FilterBar";
import { SearchBar } from "@/components/SearchBar";

export function Hero() {
  return (
    <section className="mx-auto grid max-w-7xl gap-10 px-4 pb-10 pt-14 sm:px-6 lg:grid-cols-[1fr_420px] lg:px-8 lg:pt-20">
      <div>
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-100">
          <TrendingUp size={16} />
          演示数据，可接入实时销量源
        </div>
        <h1 className="max-w-4xl text-5xl font-semibold leading-tight text-white sm:text-6xl lg:text-7xl">
          开进畅销榜前十的 3D 车库
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          用 3D 方式浏览当前最火车型，切换车漆、观察姿态、查看销量趋势和核心参数。
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <SearchBar />
        </div>
        <div className="mt-5">
          <FilterBar />
        </div>
      </div>
      <div className="glass neon-border hidden min-h-[360px] overflow-hidden rounded-[2rem] p-6 lg:block">
        <div className="relative h-full rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/40 p-6">
          <div className="absolute left-8 right-8 top-12 h-40 rounded-full bg-cyan-400/20 blur-3xl" />
          <div className="relative flex h-full flex-col justify-between">
            <div className="flex items-center justify-between text-sm text-slate-400">
              <span>Live showroom</span>
              <span>Top 10</span>
            </div>
            <div className="grid place-items-center">
              <div className="relative h-44 w-80">
                <div className="absolute bottom-6 left-6 right-6 h-10 rounded-full bg-cyan-200/20 blur-xl" />
                <div className="absolute bottom-14 left-4 h-20 w-72 rounded-[2rem] bg-slate-200 shadow-2xl" />
                <div className="absolute bottom-28 left-20 h-20 w-40 skew-x-[-18deg] rounded-t-[2rem] bg-slate-100" />
                <div className="absolute bottom-14 left-14 h-16 w-16 rounded-full border-[10px] border-slate-500 bg-slate-950" />
                <div className="absolute bottom-14 right-14 h-16 w-16 rounded-full border-[10px] border-slate-500 bg-slate-950" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Rotate3D, label: "拖拽旋转" },
                { icon: Gauge, label: "销量趋势" },
                { icon: TrendingUp, label: "智能推荐" }
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center text-xs text-slate-300">
                  <item.icon className="mx-auto mb-2 text-cyan-200" size={18} />
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
