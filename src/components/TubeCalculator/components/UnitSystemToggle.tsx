
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Ruler, Scale } from "lucide-react";
import { UnitSystem } from "../types";

interface UnitSystemToggleProps {
  unitSystem: UnitSystem;
  onUnitSystemChange: (system: UnitSystem) => void;
}

export function UnitSystemToggle({
  unitSystem,
  onUnitSystemChange
}: UnitSystemToggleProps) {
  return (
    <Card className="bg-muted/30">
      <CardContent className="pt-4">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="text-sm font-medium">Unit System:</div>
          <ToggleGroup 
            type="single" 
            value={unitSystem} 
            onValueChange={(value) => {
              if (value) onUnitSystemChange(value as UnitSystem);
            }}
            className="justify-start"
          >
            <ToggleGroupItem value="metric" className="px-3 gap-2">
              <Ruler className="h-4 w-4" />
              <span>Metric (cm, m, kg)</span>
            </ToggleGroupItem>
            <ToggleGroupItem value="imperial" className="px-3 gap-2">
              <Scale className="h-4 w-4" />
              <span>Imperial (in, ft, lbs)</span>
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </CardContent>
    </Card>
  );
}
