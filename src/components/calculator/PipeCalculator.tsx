
import { useState } from "react";
import { PipeData, Unit, WeightUnit, materials } from "../../types/calculator";
import { calculatePipeWeight, generatePDF } from "../../utils/calculationUtils";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { PipeForm } from "./PipeForm";
import { PipeResults } from "./PipeResults";

export function PipeCalculator() {
  // State for form inputs
  const [width, setWidth] = useState<number | string>("");
  const [thickness, setThickness] = useState<number | string>("");
  const [length, setLength] = useState<number | string>("");
  const [widthUnit, setWidthUnit] = useState<Unit>("cm");
  const [thicknessUnit, setThicknessUnit] = useState<Unit>("cm");
  const [lengthUnit, setLengthUnit] = useState<Unit>("meters");
  const [material, setMaterial] = useState("Steel");
  const [customDensity, setCustomDensity] = useState<number | string>("");
  
  // State for calculation outputs
  const [weightUnit, setWeightUnit] = useState<WeightUnit>("kg");
  const [pipes, setPipes] = useState<PipeData[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Validate form inputs
  const validateInputs = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!width) newErrors.width = "Width is required";
    else if (Number(width) <= 0) newErrors.width = "Width must be positive";
    
    if (!thickness) newErrors.thickness = "Thickness is required";
    else if (Number(thickness) <= 0) newErrors.thickness = "Thickness must be positive";
    else if (Number(thickness) * 2 >= Number(width)) newErrors.thickness = "Thickness must be less than half the width";
    
    if (!length) newErrors.length = "Length is required";
    else if (Number(length) <= 0) newErrors.length = "Length must be positive";
    
    if (material === "Custom" && (!customDensity || Number(customDensity) <= 0)) {
      newErrors.customDensity = "Valid density is required for custom material";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Calculate the weight of a pipe
  const handleCalculate = () => {
    if (!validateInputs()) return;
    
    const pipeData: Omit<PipeData, "id" | "weight"> = {
      width: Number(width),
      thickness: Number(thickness),
      length: Number(length),
      widthUnit,
      thicknessUnit,
      lengthUnit,
      material,
      ...(material === "Custom" && { customDensity: Number(customDensity) })
    };
    
    const weight = calculatePipeWeight(pipeData);
    
    const newPipe: PipeData = {
      ...pipeData,
      id: uuidv4(),
      weight
    };
    
    setPipes([...pipes, newPipe]);
    toast.success("Pipe weight calculated successfully");
  };

  // Remove a pipe from the list
  const handleRemovePipe = (id: string) => {
    setPipes(pipes.filter(pipe => pipe.id !== id));
    toast.info("Pipe removed from calculations");
  };

  // Download PDF report
  const handleDownloadPDF = () => {
    if (pipes.length === 0) {
      toast.error("No pipes to include in the report");
      return;
    }
    
    try {
      generatePDF(pipes, weightUnit);
      toast.success("PDF report generated successfully");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate PDF report");
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-6 px-4 sm:px-6 space-y-8">
      <PipeForm
        width={width}
        thickness={thickness}
        length={length}
        widthUnit={widthUnit}
        thicknessUnit={thicknessUnit}
        lengthUnit={lengthUnit}
        material={material}
        customDensity={customDensity}
        weightUnit={weightUnit}
        errors={errors}
        materials={materials}
        onWidthChange={setWidth}
        onThicknessChange={setThickness}
        onLengthChange={setLength}
        onWidthUnitChange={setWidthUnit}
        onThicknessUnitChange={setThicknessUnit}
        onLengthUnitChange={setLengthUnit}
        onMaterialChange={setMaterial}
        onCustomDensityChange={setCustomDensity}
        onWeightUnitChange={setWeightUnit}
        onCalculate={handleCalculate}
      />
      
      <PipeResults
        pipes={pipes}
        weightUnit={weightUnit}
        onAddPipe={handleCalculate}
        onRemovePipe={handleRemovePipe}
        onDownloadPDF={handleDownloadPDF}
      />
    </div>
  );
}
