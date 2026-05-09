"use client";

import { BatteryCharging, CarFront, Flame, Grid3X3, Rows3, Shield } from "lucide-react";
import { useCarStore } from "@/store/useCarStore";

const filters = [
  { key: "all", label: "全部", icon: Grid3X3 },
  { key: "new-energy", label: "新能源", icon: BatteryCharging },
  { key: "fuel", label: "燃油", icon: Flame },
  { key: "Sedan", label: "轿车", icon: CarFront },
  { key: "SUV", label: "SUV", icon: Shield },
  { key: "MPV", label: "MPV", icon: Rows3 }
] as const;

export function FilterBar() {
  const active = useCarStore((state) => state.filter);
  const setFilter = useCarStore((state) => state.setFilter);

  return (
    <div className="scrollbar-none flex gap-2 overflow-x-auto rounded-full border border-white/10 bg-white/5 p-1">
      {filters.map((item) => {
        const Icon = item.icon;
        const selected = active === item.key;
        return (
          <button
            key={item.key}
            onClick={() => setFilter(item.key)}
            className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm transition ${
              selected ? "bg-cyan-300 text-slate-950 shadow-glow" : "text-slate-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Icon size={16} />
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
