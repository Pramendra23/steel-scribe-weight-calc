
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Calculator } from "lucide-react";
import { PipeDimensionInput } from "./PipeDimensionInput";
import { MaterialSelector } from "./MaterialSelector";
import { WeightUnitToggle } from "./WeightUnitToggle";
import { Unit, WeightUnit, Material } from "../../types/calculator";

interface PipeFormProps {
  width: number | string;
  thickness: number | string;
  length: number | string;
  widthUnit: Unit;
  thicknessUnit: Unit;
  lengthUnit: Unit;
  material: string;
  customDensity: number | string;
  weightUnit: WeightUnit;
  errors: Record<string, string>;
  materials: Material[];
  onWidthChange: (value: string) => void;
  onThicknessChange: (value: string) => void;
  onLengthChange: (value: string) => void;
  onWidthUnitChange: (unit: Unit) => void;
  onThicknessUnitChange: (unit: Unit) => void;
  onLengthUnitChange: (unit: Unit) => void;
  onMaterialChange: (material: string) => void;
  onCustomDensityChange: (density: string) => void;
  onWeightUnitChange: (unit: WeightUnit) => void;
  onCalculate: () => void;
}

export function PipeForm({
  width,
  thickness,
  length,
  widthUnit,
  thicknessUnit,
  lengthUnit,
  material,
  customDensity,
  weightUnit,
  errors,
  materials,
  onWidthChange,
  onThicknessChange,
  onLengthChange,
  onWidthUnitChange,
  onThicknessUnitChange,
  onLengthUnitChange,
  onMaterialChange,
  onCustomDensityChange,
  onWeightUnitChange,
  onCalculate
}: PipeFormProps) {
  return (
    <Card className="calculator-shadow">
      <CardHeader>
        <CardTitle>Pipe Dimensions</CardTitle>
        <CardDescription>Enter the dimensions of your square pipe</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Width, Thickness, Length Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PipeDimensionInput
            label="Width"
            value={width}
            unit={widthUnit}
            error={errors.width}
            tooltip="Outer width of the square pipe"
            onChange={onWidthChange}
            onUnitChange={onWidthUnitChange}
          />
          
          <PipeDimensionInput
            label="Thickness"
            value={thickness}
            unit={thicknessUnit}
            error={errors.thickness}
            tooltip="Wall thickness of the square pipe"
            onChange={onThicknessChange}
            onUnitChange={onThicknessUnitChange}
          />
          
          <PipeDimensionInput
            label="Length"
            value={length}
            unit={lengthUnit}
            error={errors.length}
            tooltip="Total length of the square pipe"
            onChange={onLengthChange}
            onUnitChange={onLengthUnitChange}
          />
        </div>

        {/* Material Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MaterialSelector
            material={material}
            customDensity={customDensity}
            customDensityError={errors.customDensity}
            materials={materials}
            onMaterialChange={onMaterialChange}
            onCustomDensityChange={onCustomDensityChange}
          />
        </div>
        
        {/* Weight Unit Selection */}
        <WeightUnitToggle 
          weightUnit={weightUnit} 
          onWeightUnitChange={onWeightUnitChange} 
        />
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
        <Button onClick={onCalculate} className="w-full sm:w-auto">
          <Calculator className="mr-2 h-4 w-4" /> Calculate
        </Button>
      </CardFooter>
    </Card>
  );
}
