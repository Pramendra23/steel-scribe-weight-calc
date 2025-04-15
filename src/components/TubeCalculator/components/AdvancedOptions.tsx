
import { Button } from "@/components/ui/button";
import { Save, FileDown, Share2 } from "lucide-react";

interface AdvancedOptionsProps {
  onSave: () => void;
  onExport: () => void;
  onShare: () => void;
  savedCount: number;
}

export function AdvancedOptions({
  onSave,
  onExport,
  onShare,
  savedCount
}: AdvancedOptionsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" onClick={onSave} className="flex items-center gap-2">
        <Save className="h-4 w-4" />
        <span>Save Calculation {savedCount > 0 && `(${savedCount})`}</span>
      </Button>
      
      <Button variant="outline" onClick={onExport} className="flex items-center gap-2">
        <FileDown className="h-4 w-4" />
        <span>Export as PDF</span>
      </Button>
      
      <Button variant="outline" onClick={onShare} className="flex items-center gap-2">
        <Share2 className="h-4 w-4" />
        <span>Share Link</span>
      </Button>
    </div>
  );
}
