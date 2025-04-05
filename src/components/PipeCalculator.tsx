
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { PipeData, Unit, WeightUnit, materials } from "../types/calculator";
import { calculatePipeWeight, convertWeight, formatWeight, generatePDF } from "../utils/calculationUtils";
import { toast } from "./ui/sonner";
import { FilePlus, FileDown, Trash2, Calculator, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { v4 as uuidv4 } from "uuid";

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
    
    generatePDF(pipes, weightUnit);
    toast.success("PDF report generated successfully");
  };

  // Calculate total weight of all pipes
  const totalWeight = pipes.reduce((sum, pipe) => sum + pipe.weight, 0);
  const totalWeightConverted = convertWeight(totalWeight, weightUnit);

  return (
    <div className="w-full max-w-6xl mx-auto py-6 px-4 sm:px-6 space-y-8">
      <Card className="calculator-shadow">
        <CardHeader>
          <CardTitle>Pipe Dimensions</CardTitle>
          <CardDescription>Enter the dimensions of your square pipe</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Width Input */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="input-group">
              <div className="flex items-center justify-between">
                <Label htmlFor="width" className="text-sm font-medium">
                  Width
                </Label>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Outer width of the square pipe</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="flex space-x-2">
                <Input 
                  id="width"
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  placeholder="Enter width"
                  className={errors.width ? "border-red-500" : ""}
                />
                <Select value={widthUnit} onValueChange={(value: Unit) => setWidthUnit(value)}>
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="meters">meters</SelectItem>
                    <SelectItem value="cm">cm</SelectItem>
                    <SelectItem value="inches">inches</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {errors.width && <p className="text-red-500 text-xs mt-1">{errors.width}</p>}
            </div>

            {/* Thickness Input */}
            <div className="input-group">
              <div className="flex items-center justify-between">
                <Label htmlFor="thickness" className="text-sm font-medium">
                  Thickness
                </Label>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Wall thickness of the square pipe</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="flex space-x-2">
                <Input 
                  id="thickness"
                  type="number"
                  value={thickness}
                  onChange={(e) => setThickness(e.target.value)}
                  placeholder="Enter thickness"
                  className={errors.thickness ? "border-red-500" : ""}
                />
                <Select value={thicknessUnit} onValueChange={(value: Unit) => setThicknessUnit(value)}>
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="meters">meters</SelectItem>
                    <SelectItem value="cm">cm</SelectItem>
                    <SelectItem value="inches">inches</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {errors.thickness && <p className="text-red-500 text-xs mt-1">{errors.thickness}</p>}
            </div>

            {/* Length Input */}
            <div className="input-group">
              <div className="flex items-center justify-between">
                <Label htmlFor="length" className="text-sm font-medium">
                  Length
                </Label>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Total length of the square pipe</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="flex space-x-2">
                <Input 
                  id="length"
                  type="number"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  placeholder="Enter length"
                  className={errors.length ? "border-red-500" : ""}
                />
                <Select value={lengthUnit} onValueChange={(value: Unit) => setLengthUnit(value)}>
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="meters">meters</SelectItem>
                    <SelectItem value="cm">cm</SelectItem>
                    <SelectItem value="inches">inches</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {errors.length && <p className="text-red-500 text-xs mt-1">{errors.length}</p>}
            </div>
          </div>

          {/* Material Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="input-group">
              <div className="flex items-center justify-between">
                <Label htmlFor="material" className="text-sm font-medium">
                  Material
                </Label>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Pipe material affecting density</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Select value={material} onValueChange={setMaterial}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select material" />
                </SelectTrigger>
                <SelectContent>
                  {materials.map(mat => (
                    <SelectItem key={mat.name} value={mat.name}>
                      {mat.name}{mat.name !== "Custom" && ` (${mat.density} kg/m³)`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Custom Density Input (conditionally rendered) */}
            {material === "Custom" && (
              <div className="input-group">
                <div className="flex items-center justify-between">
                  <Label htmlFor="customDensity" className="text-sm font-medium">
                    Custom Density
                  </Label>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Material density in kg/m³</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="flex space-x-2">
                  <Input 
                    id="customDensity"
                    type="number"
                    value={customDensity}
                    onChange={(e) => setCustomDensity(e.target.value)}
                    placeholder="Enter density in kg/m³"
                    className={errors.customDensity ? "border-red-500" : ""}
                  />
                  <div className="flex items-center px-3 border rounded-md bg-muted text-muted-foreground text-sm">
                    kg/m³
                  </div>
                </div>
                {errors.customDensity && <p className="text-red-500 text-xs mt-1">{errors.customDensity}</p>}
              </div>
            )}
          </div>
          
          {/* Weight Unit Selection */}
          <div className="flex items-center space-x-4">
            <Label className="text-sm font-medium">Weight Unit:</Label>
            <div className="flex space-x-2">
              <Button 
                type="button" 
                variant={weightUnit === "kg" ? "default" : "outline"}
                size="sm"
                onClick={() => setWeightUnit("kg")}
              >
                Kilograms (kg)
              </Button>
              <Button 
                type="button" 
                variant={weightUnit === "lbs" ? "default" : "outline"}
                size="sm"
                onClick={() => setWeightUnit("lbs")}
              >
                Pounds (lbs)
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <Button onClick={handleCalculate} className="w-full sm:w-auto">
            <Calculator className="mr-2 h-4 w-4" /> Calculate
          </Button>
        </CardFooter>
      </Card>

      {/* Results Section */}
      {pipes.length > 0 && (
        <Card className="calculator-shadow">
          <CardHeader>
            <CardTitle>Results</CardTitle>
            <CardDescription>All calculated pipe weights</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Dimensions</th>
                    <th className="text-left py-3 px-4">Material</th>
                    <th className="text-right py-3 px-4">Weight</th>
                    <th className="text-right py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pipes.map((pipe) => {
                    const weightInSelectedUnit = convertWeight(pipe.weight, weightUnit);
                    const material = pipe.material === "Custom" 
                      ? `Custom (${pipe.customDensity} kg/m³)` 
                      : pipe.material;
                    
                    return (
                      <tr key={pipe.id} className="border-b">
                        <td className="py-3 px-4">
                          <div className="text-sm">
                            <p>Width: {pipe.width} {pipe.widthUnit}</p>
                            <p>Thickness: {pipe.thickness} {pipe.thicknessUnit}</p>
                            <p>Length: {pipe.length} {pipe.lengthUnit}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4">{material}</td>
                        <td className="py-3 px-4 text-right font-medium">
                          {formatWeight(weightInSelectedUnit)} {weightUnit}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleRemovePipe(pipe.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="font-bold bg-muted/50">
                    <td className="py-3 px-4" colSpan={2}>Total Weight</td>
                    <td className="py-3 px-4 text-right">
                      {formatWeight(totalWeightConverted)} {weightUnit}
                    </td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <Button onClick={handleCalculate} className="w-full sm:w-auto" variant="outline">
              <FilePlus className="mr-2 h-4 w-4" /> Add Another Pipe
            </Button>
            <Button onClick={handleDownloadPDF} className="w-full sm:w-auto">
              <FileDown className="mr-2 h-4 w-4" /> Download PDF
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
