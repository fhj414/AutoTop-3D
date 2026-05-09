"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, BadgeCheck, Check, Plus } from "lucide-react";
import type { Car } from "@/types/car";
import { categoryLabel, energyLabel, formatSales } from "@/lib/format";
import { useCarStore } from "@/store/useCarStore";

export function CarCard({ car }: { car: Car }) {
  const compareIds = useCarStore((state) => state.compareIds);
  const toggleCompare = useCarStore((state) => state.toggleCompare);
  const selected = compareIds.includes(car.id);
  const medal = car.rank <= 3;

  return (
    <motion.article
      layout
      whileHover={{ y: -8 }}
      className="group glass relative overflow-hidden rounded-[1.75rem] transition hover:border-cyan-200/40 hover:shadow-glow"
    >
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-cyan-300/12 to-transparent" />
      <div className="relative p-5">
        <div className="flex items-start justify-between">
          <div className={`rounded-2xl px-3 py-2 text-sm font-semibold ${medal ? "bg-cyan-300 text-slate-950" : "bg-white/10 text-slate-200"}`}>
            TOP {car.rank}
          </div>
          {medal && (
            <div className="flex items-center gap-1 rounded-full bg-violet-400/15 px-3 py-1 text-xs text-violet-100">
              <BadgeCheck size={14} />
              热榜徽章
            </div>
          )}
        </div>
        <Link href={`/cars/${car.id}`} className="mt-4 block">
          <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-white/10 bg-slate-950/40">
            <Image
              src={car.coverImage}
              alt={car.fullName}
              fill
              priority={car.rank <= 3}
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          </div>
        </Link>
        <div className="mt-5">
          <p className="text-sm text-slate-400">{car.brand}</p>
          <h2 className="mt-1 text-2xl font-semibold text-white">{car.name}</h2>
          <p className="mt-1 line-clamp-2 min-h-10 text-sm leading-5 text-slate-400">{car.highlight}</p>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-2xl bg-white/5 p-3">
            <p className="text-slate-500">月销量</p>
            <p className="mt-1 font-semibold text-cyan-100">{formatSales(car.monthlySales)}</p>
          </div>
          <div className="rounded-2xl bg-white/5 p-3">
            <p className="text-slate-500">指导价</p>
            <p className="mt-1 font-semibold text-white">{car.priceRange}</p>
          </div>
          <div className="rounded-2xl bg-white/5 p-3">
            <p className="text-slate-500">能源</p>
            <p className="mt-1 font-semibold text-white">{energyLabel(car.energyType)}</p>
          </div>
          <div className="rounded-2xl bg-white/5 p-3">
            <p className="text-slate-500">级别</p>
            <p className="mt-1 font-semibold text-white">{categoryLabel(car.category)}</p>
          </div>
        </div>
        <div className="mt-5 flex items-center gap-3">
          <Link
            href={`/cars/${car.id}`}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
          >
            进入 3D 展厅
            <ArrowUpRight size={17} />
          </Link>
          <button
            onClick={() => toggleCompare(car.id)}
            className={`grid h-12 w-12 place-items-center rounded-full border transition ${
              selected ? "border-cyan-200 bg-cyan-300 text-slate-950" : "border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
            }`}
            aria-label="加入对比"
          >
            {selected ? <Check size={18} /> : <Plus size={18} />}
          </button>
        </div>
      </div>
    </motion.article>
  );
}
