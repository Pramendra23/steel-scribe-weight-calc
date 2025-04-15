
export type Unit = "meters" | "cm" | "inches" | "ft";
export type WeightUnit = "kg" | "lbs";

export type Material = {
  name: string;
  density: number; // kg/m³
};

export type PipeData = {
  id: string;
  width: number;
  thickness: number;
  length: number;
  widthUnit: Unit;
  thicknessUnit: Unit;
  lengthUnit: Unit;
  material: string;
  customDensity?: number;
  weight: number; // kg
};

export const materials: Material[] = [
  { name: "Steel", density: 7850 },
  { name: "Aluminum", density: 2700 },
  { name: "Copper", density: 8960 },
  { name: "Custom", density: 0 }
];

export const unitConversionMap: Record<Unit, number> = {
  "meters": 1,
  "cm": 0.01,
  "inches": 0.0254,
  "ft": 0.3048
};

export const weightConversionMap: Record<WeightUnit, number> = {
  "kg": 1,
  "lbs": 2.20462
};
