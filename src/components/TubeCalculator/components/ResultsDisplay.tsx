
import { Card, CardContent } from "@/components/ui/card";
import { formatWeight } from "../utils";
import { TubeData } from "../types";

interface ResultsDisplayProps {
  tube: TubeData;
  density: number;
}

export function ResultsDisplay({ tube, density }: ResultsDisplayProps) {
  // Determine appropriate unit abbreviations
  const lengthUnitAbbr = tube.lengthUnit === "meters" ? "m" : 
                         tube.lengthUnit === "cm" ? "cm" : "ft";
  
  return (
    <Card className="bg-primary/5 border-primary/20 animate-fade-in">
      <CardContent className="pt-4">
        <h3 className="text-lg font-medium mb-2">Results</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3 bg-background rounded-md border">
            <div className="text-sm text-muted-foreground">Total Weight:</div>
            <div className="text-2xl font-bold">{formatWeight(tube.weight)} {tube.weightUnit}</div>
          </div>
          
          <div className="p-3 bg-background rounded-md border">
            <div className="text-sm text-muted-foreground">Weight per {lengthUnitAbbr}:</div>
            <div className="text-2xl font-bold">{formatWeight(tube.weightPerUnit)} {tube.weightUnit}/{lengthUnitAbbr}</div>
          </div>
          
          <div className="p-3 bg-background rounded-md border">
            <div className="text-sm text-muted-foreground">Material Density:</div>
            <div className="text-2xl font-bold">{density} kg/m³</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
