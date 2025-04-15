
import { Unit, WeightUnit } from "@/types/calculator";

export type UnitSystem = "metric" | "imperial";

export type TubeData = {
  id: string;
  width: number;
  thickness: number;
  length: number;
  widthUnit: Unit;
  thicknessUnit: Unit;
  lengthUnit: Unit;
  weightUnit: WeightUnit;
  material: string;
  unitSystem: UnitSystem;
  customDensity?: number;
  weight: number;
  weightPerUnit: number;
};
