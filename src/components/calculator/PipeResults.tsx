
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { PipeData, WeightUnit } from "../../types/calculator";
import { convertWeight, formatWeight } from "../../utils/calculationUtils";
import { FilePlus, FileDown, Trash2 } from "lucide-react";

interface PipeResultsProps {
  pipes: PipeData[];
  weightUnit: WeightUnit;
  onAddPipe: () => void;
  onRemovePipe: (id: string) => void;
  onDownloadPDF: () => void;
}

export function PipeResults({ 
  pipes, 
  weightUnit, 
  onAddPipe, 
  onRemovePipe, 
  onDownloadPDF 
}: PipeResultsProps) {
  if (pipes.length === 0) return null;
  
  // Calculate total weight
  const totalWeight = pipes.reduce((sum, pipe) => sum + pipe.weight, 0);
  const totalWeightConverted = convertWeight(totalWeight, weightUnit);
  
  return (
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
                        onClick={() => onRemovePipe(pipe.id)}
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
        <Button onClick={onAddPipe} className="w-full sm:w-auto" variant="outline">
          <FilePlus className="mr-2 h-4 w-4" /> Add Another Pipe
        </Button>
        <Button onClick={onDownloadPDF} className="w-full sm:w-auto">
          <FileDown className="mr-2 h-4 w-4" /> Download PDF
        </Button>
      </CardFooter>
    </Card>
  );
}
