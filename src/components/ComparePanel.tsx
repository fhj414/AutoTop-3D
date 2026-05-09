"use client";

import Link from "next/link";
import { GitCompareArrows, X } from "lucide-react";
import type { Car } from "@/types/car";
import { categoryLabel, energyLabel, formatSales } from "@/lib/format";
import { useCarStore } from "@/store/useCarStore";

export function ComparePanel({ cars }: { cars: Car[] }) {
  const compareIds = useCarStore((state) => state.compareIds);
  const clearCompare = useCarStore((state) => state.clearCompare);
  const selected = cars.filter((car) => compareIds.includes(car.id));

  if (selected.length === 0) return null;

  return (
    <div className="fixed inset-x-4 bottom-4 z-40 mx-auto max-w-5xl rounded-[1.5rem] border border-cyan-200/20 bg-slate-950/90 p-4 shadow-glow backdrop-blur-xl">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-cyan-300 text-slate-950">
            <GitCompareArrows size={18} />
          </div>
          <div>
            <p className="font-semibold text-white">车型对比</p>
            <p className="text-sm text-slate-400">最多选择 3 辆，当前 {selected.length} 辆</p>
          </div>
        </div>
        <div className="grid flex-1 gap-2 md:grid-cols-3">
          {selected.map((car) => (
            <Link key={car.id} href={`/cars/${car.id}`} className="rounded-2xl bg-white/5 p-3 text-sm hover:bg-white/10">
              <p className="font-semibold text-white">{car.name}</p>
              <p className="mt-1 text-slate-400">
                {formatSales(car.monthlySales)} / {energyLabel(car.energyType)} / {categoryLabel(car.category)}
              </p>
            </Link>
          ))}
        </div>
        <button onClick={clearCompare} className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-slate-200 hover:bg-white/15" aria-label="清空对比">
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
