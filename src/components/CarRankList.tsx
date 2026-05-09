"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { Car } from "@/types/car";
import { CarCard } from "@/components/CarCard";
import { useCarStore } from "@/store/useCarStore";
import { ComparePanel } from "@/components/ComparePanel";

export function CarRankList({ cars }: { cars: Car[] }) {
  const query = useCarStore((state) => state.query.trim().toLowerCase());
  const filter = useCarStore((state) => state.filter);

  const filtered = cars.filter((car) => {
    const matchesQuery = [car.brand, car.name, car.fullName].join(" ").toLowerCase().includes(query);
    const matchesFilter =
      filter === "all" ||
      (filter === "new-energy" && car.energyType !== "ICE") ||
      (filter === "fuel" && car.energyType === "ICE") ||
      car.category === filter;
    return matchesQuery && matchesFilter;
  });

  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm text-cyan-200">Top10 Ranking</p>
          <h2 className="text-3xl font-semibold text-white">畅销车型 Top10</h2>
        </div>
        <p className="text-sm text-slate-400">演示数据，可接入实时销量源</p>
      </div>
      {filtered.length === 0 ? (
        <div className="glass rounded-[1.75rem] p-10 text-center text-slate-300">
          没有找到匹配车型，试试切换筛选或搜索其他品牌。
        </div>
      ) : (
        <motion.div layout className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence>
            {filtered.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
      <ComparePanel cars={cars} />
    </section>
  );
}
