
import { useState } from "react";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { Material } from "../../types/calculator";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface MaterialSelectorProps {
  material: string;
  customDensity: number | string;
  customDensityError?: string;
  materials: Material[];
  onMaterialChange: (material: string) => void;
  onCustomDensityChange: (density: string) => void;
}

export function MaterialSelector({
  material,
  customDensity,
  customDensityError,
  materials,
  onMaterialChange,
  onCustomDensityChange
}: MaterialSelectorProps) {
  return (
    <>
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
        <Select value={material} onValueChange={onMaterialChange}>
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
              onChange={(e) => onCustomDensityChange(e.target.value)}
              placeholder="Enter density in kg/m³"
              className={customDensityError ? "border-red-500" : ""}
            />
            <div className="flex items-center px-3 border rounded-md bg-muted text-muted-foreground text-sm">
              kg/m³
            </div>
          </div>
          {customDensityError && <p className="text-red-500 text-xs mt-1">{customDensityError}</p>}
        </div>
      )}
    </>
  );
}
