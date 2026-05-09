"use client";

import { create } from "zustand";

type FilterKey = "all" | "new-energy" | "fuel" | "Sedan" | "SUV" | "MPV";

interface CarStore {
  query: string;
  filter: FilterKey;
  compareIds: string[];
  setQuery: (query: string) => void;
  setFilter: (filter: FilterKey) => void;
  toggleCompare: (id: string) => void;
  clearCompare: () => void;
}

export const useCarStore = create<CarStore>((set) => ({
  query: "",
  filter: "all",
  compareIds: [],
  setQuery: (query) => set({ query }),
  setFilter: (filter) => set({ filter }),
  toggleCompare: (id) =>
    set((state) => {
      if (state.compareIds.includes(id)) {
        return { compareIds: state.compareIds.filter((item) => item !== id) };
      }
      if (state.compareIds.length >= 3) return state;
      return { compareIds: [...state.compareIds, id] };
    }),
  clearCompare: () => set({ compareIds: [] })
}));
