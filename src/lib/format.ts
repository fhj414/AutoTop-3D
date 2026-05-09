import type { CarCategory, EnergyType } from "@/types/car";

export function formatSales(value: number) {
  return `${(value / 10000).toFixed(2)} 万辆`;
}

export function energyLabel(type: EnergyType) {
  const labels: Record<EnergyType, string> = {
    EV: "纯电",
    PHEV: "插混",
    EREV: "增程",
    ICE: "燃油"
  };
  return labels[type];
}

export function categoryLabel(category: CarCategory) {
  const labels: Record<CarCategory, string> = {
    Sedan: "轿车",
    SUV: "SUV",
    MPV: "MPV"
  };
  return labels[category];
}

export function cnNumber(value: number) {
  return new Intl.NumberFormat("zh-CN").format(value);
}
