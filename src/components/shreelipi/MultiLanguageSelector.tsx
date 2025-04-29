
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MultiLanguageSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function MultiLanguageSelector({ value, onChange }: MultiLanguageSelectorProps) {
  const languages = [
    { value: "english", label: "English" },
    { value: "hindi", label: "हिन्दी (Hindi)" },
    { value: "marathi", label: "मराठी (Marathi)" }
  ];

  return (
    <Select
      value={value}
      onValueChange={onChange}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select language" />
      </SelectTrigger>
      <SelectContent>
        {languages.map((language) => (
          <SelectItem key={language.value} value={language.value}>
            {language.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
