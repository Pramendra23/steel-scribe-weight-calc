
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface TubeDimensionInputProps {
  label: string;
  value: number | string;
  unit: string;
  error?: string;
  tooltip: string;
  onChange: (value: string) => void;
}

export function TubeDimensionInput({
  label,
  value,
  unit,
  error,
  tooltip,
  onChange
}: TubeDimensionInputProps) {
  return (
    <div className="input-group">
      <div className="flex items-center justify-between">
        <Label htmlFor={label.toLowerCase().replace(/\s+/g, '-')} className="text-sm font-medium">
          {label}
        </Label>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="cursor-help">
              <Info className="h-4 w-4 text-muted-foreground" />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="flex items-center">
        <Input 
          id={label.toLowerCase().replace(/\s+/g, '-')}
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Enter ${label.toLowerCase()}`}
          className={`${error ? "border-red-500" : ""}`}
        />
        <span className="ml-2 text-sm text-muted-foreground">{unit}</span>
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
