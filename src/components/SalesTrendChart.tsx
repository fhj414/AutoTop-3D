"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { Car } from "@/types/car";
import { cnNumber } from "@/lib/format";

export function SalesTrendChart({ car }: { car: Car }) {
  return (
    <section className="glass rounded-[2rem] p-6">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm text-cyan-200">Sales Trend</p>
          <h2 className="text-2xl font-semibold text-white">销量趋势</h2>
        </div>
        <p className="text-sm text-slate-400">Mock 最近 6 个月</p>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={car.trend} margin={{ left: 4, right: 12, top: 10, bottom: 0 }}>
            <defs>
              <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22D3EE" stopOpacity={0.55} />
                <stop offset="95%" stopColor="#22D3EE" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.12)" />
            <XAxis dataKey="month" stroke="#94A3B8" tickLine={false} axisLine={false} />
            <YAxis stroke="#94A3B8" tickLine={false} axisLine={false} tickFormatter={(value) => `${Number(value) / 10000}万`} />
            <Tooltip
              contentStyle={{ background: "#0F172A", border: "1px solid rgba(148,163,184,0.2)", borderRadius: 16, color: "#E2E8F0" }}
              formatter={(value) => [`${cnNumber(Number(value))} 台`, "销量"]}
            />
            <Area type="monotone" dataKey="sales" stroke="#22D3EE" strokeWidth={3} fill="url(#salesGradient)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
