import { BadgeDollarSign, BatteryCharging, CarFront, Ruler, TrendingUp } from "lucide-react";
import type { Car } from "@/types/car";
import { categoryLabel, cnNumber, energyLabel, formatSales } from "@/lib/format";

export function CarInfoPanel({ car }: { car: Car }) {
  const specs = [
    { label: "指导价", value: car.priceRange, icon: BadgeDollarSign },
    { label: "动力类型", value: energyLabel(car.energyType), icon: BatteryCharging },
    { label: "续航/油耗", value: car.specs.range ?? "待补充", icon: TrendingUp },
    { label: "车型级别", value: categoryLabel(car.category), icon: CarFront },
    { label: "尺寸", value: `${car.specs.length} / ${car.specs.width} / ${car.specs.height} mm`, icon: Ruler },
    { label: "轴距", value: `${car.specs.wheelbase} mm`, icon: Ruler }
  ];

  return (
    <aside className="glass rounded-[2rem] p-6">
      <div className="flex items-center justify-between">
        <div className="rounded-2xl bg-cyan-300 px-3 py-2 text-sm font-semibold text-slate-950">TOP {car.rank}</div>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-300">演示数据</span>
      </div>
      <div className="mt-6">
        <p className="text-sm text-cyan-200">{car.brand}</p>
        <h1 className="mt-2 text-4xl font-semibold text-white">{car.name}</h1>
        <p className="mt-2 text-slate-400">{car.fullName}</p>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-3">
        <div className="rounded-2xl bg-white/5 p-4">
          <p className="text-xs text-slate-500">月销量</p>
          <p className="mt-2 text-lg font-semibold text-cyan-100">{formatSales(car.monthlySales)}</p>
          <p className="mt-1 text-xs text-slate-500">{cnNumber(car.monthlySales)} 台</p>
        </div>
        <div className="rounded-2xl bg-white/5 p-4">
          <p className="text-xs text-slate-500">同比</p>
          <p className="mt-2 text-lg font-semibold text-emerald-200">{car.yoy}</p>
        </div>
        <div className="rounded-2xl bg-white/5 p-4">
          <p className="text-xs text-slate-500">环比</p>
          <p className="mt-2 text-lg font-semibold text-violet-200">{car.mom}</p>
        </div>
      </div>
      <div className="mt-5 grid gap-3">
        {specs.map((item) => (
          <div key={item.label} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-cyan-300/10 text-cyan-200">
              <item.icon size={18} />
            </span>
            <div>
              <p className="text-xs text-slate-500">{item.label}</p>
              <p className="mt-1 text-sm font-medium text-white">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-3xl border border-cyan-200/20 bg-cyan-300/10 p-5">
        <p className="text-sm text-cyan-100">一句话推荐理由</p>
        <p className="mt-2 leading-7 text-slate-100">{car.highlight}</p>
      </div>
    </aside>
  );
}
