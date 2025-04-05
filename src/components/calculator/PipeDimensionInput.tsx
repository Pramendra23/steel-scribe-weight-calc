
import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Unit } from "../../types/calculator";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface PipeDimensionInputProps {
  label: string;
  value: number | string;
  unit: Unit;
  error?: string;
  tooltip: string;
  onChange: (value: string) => void;
  onUnitChange: (value: Unit) => void;
}

export function PipeDimensionInput({
  label,
  value,
  unit,
  error,
  tooltip,
  onChange,
  onUnitChange
}: PipeDimensionInputProps) {
  return (
    <div className="input-group">
      <div className="flex items-center justify-between">
        <Label htmlFor={label.toLowerCase()} className="text-sm font-medium">
          {label}
        </Label>
        <Tooltip>
          <TooltipTrigger>
            <Info className="h-4 w-4 text-muted-foreground" />
          </TooltipTrigger>
          <TooltipContent>
            <p>{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="flex space-x-2">
        <Input 
          id={label.toLowerCase()}
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Enter ${label.toLowerCase()}`}
          className={error ? "border-red-500" : ""}
        />
        <Select value={unit} onValueChange={(value: Unit) => onUnitChange(value)}>
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
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
