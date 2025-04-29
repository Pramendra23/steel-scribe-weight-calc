
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

  return (
    <Select
      value={value}
      onValueChange={onChange}
      disabled={disabled}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select font" />
      </SelectTrigger>
      <SelectContent>
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
