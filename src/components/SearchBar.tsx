"use client";

import { Search } from "lucide-react";
import { useCarStore } from "@/store/useCarStore";

export function SearchBar() {
  const query = useCarStore((state) => state.query);
  const setQuery = useCarStore((state) => state.setQuery);

  return (
    <label className="group flex w-full items-center gap-3 rounded-full border border-white/10 bg-white/8 px-4 py-3 text-slate-300 shadow-card backdrop-blur-xl transition focus-within:border-cyan-300/50 focus-within:bg-white/12 sm:max-w-xl">
      <Search size={20} className="text-cyan-200" />
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="搜索车型 / 品牌"
        className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
      />
    </label>
  );
}
