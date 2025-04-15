
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "@/components/ui/collapsible";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Calculator,
  ChevronDown,
  ChevronUp,
  Share2,
  Save,
  FileDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { unitConversionMap, weightConversionMap, materials } from "@/types/calculator";
import { 
  TubeDimensionInput,
  MaterialSelector,
  UnitSystemToggle,
  ResultsDisplay,
  AdvancedOptions
} from "./components";
import { TubeData, UnitSystem } from "./types";
import { calculateTubeWeight, exportToPDF, formatWeight } from "./utils";

export function TubeCalculator() {
  // State for unit system
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("metric");
  
  // State for form inputs
  const [width, setWidth] = useState<number | string>("");
  const [thickness, setThickness] = useState<number | string>("");
  const [length, setLength] = useState<number | string>("");
  const [material, setMaterial] = useState("Steel");
  const [customDensity, setCustomDensity] = useState<number | string>("");
  
  // State for advanced options
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  
  // State for calculation outputs
  const [calculatedTube, setCalculatedTube] = useState<TubeData | null>(null);
  const [savedTubes, setSavedTubes] = useState<TubeData[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Handle unit system toggle
  const handleUnitSystemChange = (system: UnitSystem) => {
    setUnitSystem(system);
    // Reset inputs when changing unit system
    setWidth("");
    setThickness("");
    setLength("");
    setCalculatedTube(null);
  };

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

  // Calculate the weight of a tube
  const handleCalculate = () => {
    if (!validateInputs()) return;
    
    // Get the appropriate units based on the unit system
    const widthUnit = unitSystem === "metric" ? "cm" : "inches";
    const thicknessUnit = unitSystem === "metric" ? "cm" : "inches";
    const lengthUnit = unitSystem === "metric" ? "meters" : "ft";
    const weightUnit = unitSystem === "metric" ? "kg" : "lbs";
    
    // Create tube data object
    const tubeData: Omit<TubeData, "id" | "weight" | "weightPerUnit"> = {
      width: Number(width),
      thickness: Number(thickness),
      length: Number(length),
      widthUnit,
      thicknessUnit,
      lengthUnit,
      weightUnit,
      material,
      unitSystem,
      ...(material === "Custom" && { customDensity: Number(customDensity) })
    };
    
    // Calculate weight
    const { weight, weightPerUnit } = calculateTubeWeight(tubeData);
    
    // Create complete tube data
    const newTube: TubeData = {
      ...tubeData,
      id: uuidv4(),
      weight,
      weightPerUnit
    };
    
    setCalculatedTube(newTube);
    toast.success("Tube weight calculated successfully");
  };

  // Save the current calculation
  const handleSaveTube = () => {
    if (!calculatedTube) {
      toast.error("Calculate tube weight first");
      return;
    }
    
    setSavedTubes((prev) => [...prev, calculatedTube]);
    toast.success("Tube calculation saved");
  };

  // Export calculations to PDF
  const handleExportPDF = () => {
    if (!calculatedTube && savedTubes.length === 0) {
      toast.error("No calculations to export");
      return;
    }
    
    const tubesToExport = calculatedTube 
      ? [calculatedTube, ...savedTubes] 
      : savedTubes;
    
    try {
      exportToPDF(tubesToExport);
      toast.success("PDF exported successfully");
    } catch (error) {
      console.error("Error exporting PDF:", error);
      toast.error("Failed to export PDF");
    }
  };

  // Share calculation link
  const handleShareLink = () => {
    if (!calculatedTube) {
      toast.error("Calculate tube weight first");
      return;
    }
    
    // Create query parameters from the calculation
    const params = new URLSearchParams({
      w: calculatedTube.width.toString(),
      t: calculatedTube.thickness.toString(),
      l: calculatedTube.length.toString(),
      m: calculatedTube.material,
      us: calculatedTube.unitSystem,
      ...(calculatedTube.customDensity && { cd: calculatedTube.customDensity.toString() })
    });
    
    // Create shareable URL
    const shareableUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    
    // Copy to clipboard
    navigator.clipboard.writeText(shareableUrl)
      .then(() => toast.success("Link copied to clipboard"))
      .catch(() => toast.error("Failed to copy link"));
  };

  // Get material density
  const getMaterialDensity = (): number => {
    if (material === "Custom" && customDensity) {
      return Number(customDensity);
    }
    
    const selectedMaterial = materials.find(m => m.name === material);
    return selectedMaterial ? selectedMaterial.density : 0;
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-6 px-4 sm:px-6 space-y-8">
      <Card className="calculator-shadow">
        <CardHeader>
          <CardTitle className="text-2xl font-poppins">Square Tube Weight Calculator</CardTitle>
          <CardDescription>Enter dimensions to calculate the weight of a square tube</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Unit System Toggle */}
          <UnitSystemToggle 
            unitSystem={unitSystem} 
            onUnitSystemChange={handleUnitSystemChange} 
          />
          
          {/* Dimensions Input */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TubeDimensionInput
              label="Outer Width"
              value={width}
              unit={unitSystem === "metric" ? "cm" : "inches"}
              error={errors.width}
              tooltip="Outer width of the square tube"
              onChange={setWidth}
            />
            
            <TubeDimensionInput
              label="Wall Thickness"
              value={thickness}
              unit={unitSystem === "metric" ? "cm" : "inches"}
              error={errors.thickness}
              tooltip="Wall thickness of the square tube"
              onChange={setThickness}
            />
            
            <TubeDimensionInput
              label="Length"
              value={length}
              unit={unitSystem === "metric" ? "meters" : "ft"}
              error={errors.length}
              tooltip="Total length of the square tube"
              onChange={setLength}
            />
          </div>
          
          {/* Material Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MaterialSelector
              material={material}
              customDensity={customDensity}
              customDensityError={errors.customDensity}
              materials={materials}
              onMaterialChange={setMaterial}
              onCustomDensityChange={setCustomDensity}
            />
          </div>
          
          {/* Results Display */}
          {calculatedTube && (
            <ResultsDisplay 
              tube={calculatedTube}
              density={getMaterialDensity()}
            />
          )}
        </CardContent>
        
        <CardFooter className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <Button onClick={handleCalculate} className="w-full sm:w-auto">
            <Calculator className="mr-2 h-4 w-4" /> Calculate Weight
          </Button>
          
          {/* Advanced Options */}
          <Collapsible
            open={isAdvancedOpen}
            onOpenChange={setIsAdvancedOpen}
            className="w-full"
          >
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto">
                Advanced Options
                {isAdvancedOpen ? (
                  <ChevronUp className="ml-2 h-4 w-4" />
                ) : (
                  <ChevronDown className="ml-2 h-4 w-4" />
                )}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4 space-y-4">
              <AdvancedOptions
                onSave={handleSaveTube}
                onExport={handleExportPDF}
                onShare={handleShareLink}
                savedCount={savedTubes.length}
              />
            </CollapsibleContent>
          </Collapsible>
        </CardFooter>
      </Card>
    </div>
  );
}
