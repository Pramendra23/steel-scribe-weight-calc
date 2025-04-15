
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Material } from "@/types/calculator";

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
    <div className="space-y-2">
      <div>
        <Label htmlFor="material" className="text-sm font-medium">Material</Label>
        <Select value={material} onValueChange={onMaterialChange}>
          <SelectTrigger id="material">
            <SelectValue placeholder="Select a material" />
          </SelectTrigger>
          <SelectContent>
            {materials.map((m) => (
              <SelectItem key={m.name} value={m.name}>
                {m.name} {m.name !== "Custom" && `(${m.density} kg/m³)`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {material === "Custom" && (
        <div>
          <Label htmlFor="custom-density" className="text-sm font-medium">Custom Density (kg/m³)</Label>
          <Input
            id="custom-density"
            type="number"
            value={customDensity}
            onChange={(e) => onCustomDensityChange(e.target.value)}
            placeholder="Enter material density"
            className={`${customDensityError ? "border-red-500" : ""}`}
          />
          {customDensityError && <p className="text-red-500 text-xs mt-1">{customDensityError}</p>}
        </div>
      )}
    </div>
  );
}
