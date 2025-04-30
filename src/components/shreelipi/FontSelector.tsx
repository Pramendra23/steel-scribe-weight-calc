
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";

interface FontSelectorProps {
  value: string;
  onChange: (value: string) => void;
  disableOption?: string;
  disabled?: boolean;
}

export function FontSelector({ 
  value, 
  onChange, 
  disableOption,
  disabled = false
}: FontSelectorProps) {
  const fonts = [
    { value: "shreelipi", label: "Shree Lipi" },
    { value: "unicode", label: "Unicode" },
    { value: "krutidev", label: "Krutidev" },
    { value: "devlys", label: "Devlys" },
    { value: "mangal", label: "Mangal" },
  ];
  
  // Force update state if initial value doesn't match any option
  const [internalValue, setInternalValue] = useState(value);
  
  useEffect(() => {
    // Make sure the selected font is valid
    const isValidFont = fonts.some(font => font.value === value);
    if (!isValidFont && fonts.length > 0) {
      // If value is not valid, set it to the first available font
      onChange(fonts[0].value);
    }
    setInternalValue(value);
  }, [value, onChange, fonts]);

  return (
    <Select
      value={internalValue}
      onValueChange={(newValue) => {
        setInternalValue(newValue);
        onChange(newValue);
      }}
      disabled={disabled}
    >
      <SelectTrigger className="w-full bg-white dark:bg-gray-800">
        <SelectValue placeholder="Select font" />
      </SelectTrigger>
      <SelectContent className="bg-white dark:bg-gray-800">
        {fonts.map((font) => (
          <SelectItem
            key={font.value}
            value={font.value}
            disabled={font.value === disableOption}
          >
            {font.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
