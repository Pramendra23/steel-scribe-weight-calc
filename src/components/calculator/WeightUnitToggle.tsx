
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { WeightUnit } from "../../types/calculator";

interface WeightUnitToggleProps {
  weightUnit: WeightUnit;
  onWeightUnitChange: (unit: WeightUnit) => void;
}

export function WeightUnitToggle({ weightUnit, onWeightUnitChange }: WeightUnitToggleProps) {
  return (
    <div className="flex items-center space-x-4">
      <Label className="text-sm font-medium">Weight Unit:</Label>
      <div className="flex space-x-2">
        <Button 
          type="button" 
          variant={weightUnit === "kg" ? "default" : "outline"}
          size="sm"
          onClick={() => onWeightUnitChange("kg")}
        >
          Kilograms (kg)
        </Button>
        <Button 
          type="button" 
          variant={weightUnit === "lbs" ? "default" : "outline"}
          size="sm"
          onClick={() => onWeightUnitChange("lbs")}
        >
          Pounds (lbs)
        </Button>
      </div>
    </div>
  );
}
