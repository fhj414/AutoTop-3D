export type EnergyType = "EV" | "PHEV" | "EREV" | "ICE";
export type CarCategory = "Sedan" | "SUV" | "MPV";

export interface CarColor {
  name: string;
  value: string;
}

export interface CarSpecs {
  length: number;
  width: number;
  height: number;
  wheelbase: number;
  range?: string;
  power?: string;
  acceleration?: string;
}

export interface SalesTrendPoint {
  month: string;
  sales: number;
}

export interface Car {
  id: string;
  rank: number;
  brand: string;
  name: string;
  fullName: string;
  monthlySales: number;
  priceRange: string;
  energyType: EnergyType;
  category: CarCategory;
  coverImage: string;
  modelUrl: string;
  colors: CarColor[];
  specs: CarSpecs;
  trend: SalesTrendPoint[];
  highlight: string;
  yoy: string;
  mom: string;
}
