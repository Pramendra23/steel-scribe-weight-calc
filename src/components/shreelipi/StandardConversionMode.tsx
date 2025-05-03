
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ArrowRight, RotateCw } from "lucide-react";
import { FontSelector } from "./FontSelector";
import { TextConverterArea } from "./TextConverterArea";
import { FileUploadArea } from "./FileUploadArea";

interface StandardConversionModeProps {
  conversionMode: "shreelipi-to-unicode" | "unicode-to-shreelipi";
  inputText: string;
  setInputText: (text: string) => void;
  outputText: string;
  isConverting: boolean;
  handleConvert: () => void;
  handleClearAll: () => void;
  handleFilesAdded: (files: File[]) => void;
  sourceFont?: string;
  setSourceFont?: (font: string) => void;
  targetFont?: string;
  setTargetFont?: (font: string) => void;
}

export function StandardConversionMode({
  conversionMode,
  inputText,
  setInputText,
  outputText,
  isConverting,
  handleConvert,
  handleClearAll,
  handleFilesAdded,
  sourceFont,
  setSourceFont,
  targetFont,
  setTargetFont
}: StandardConversionModeProps) {
  const isShreeToUnicode = conversionMode === "shreelipi-to-unicode";
  
  const inputLabel = isShreeToUnicode ? "Shree Lipi Text" : "Unicode Text";
  const outputLabel = isShreeToUnicode ? "Unicode Text" : "Shree Lipi Text";
  const inputPlaceholder = `Type or paste ${isShreeToUnicode ? "Shree Lipi" : "Unicode"} text here...`;
  
  // Default source and target fonts based on conversion mode
  const defaultSourceFont = isShreeToUnicode ? "shreelipi" : "unicode";
  const defaultTargetFont = isShreeToUnicode ? "unicode" : "shreelipi";
  
  // Use the props if provided, otherwise use defaults
  const currentSourceFont = sourceFont || defaultSourceFont;
  const currentTargetFont = targetFont || defaultTargetFont;
  
  // Handle font change if setSourceFont is provided, otherwise do nothing
  const handleSourceFontChange = (font: string) => {
    if (setSourceFont) {
      setSourceFont(font);
    }
  };
  
  // Handle font change if setTargetFont is provided, otherwise do nothing
  const handleTargetFontChange = (font: string) => {
    if (setTargetFont) {
      setTargetFont(font);
    }
  };
  
  return (
    <div className="grid grid-cols-1 gap-6">
      <TextConverterArea 
        inputText={inputText}
        setInputText={setInputText}
        outputText={outputText}
        inputLabel={inputLabel}
        outputLabel={outputLabel}
        inputPlaceholder={inputPlaceholder}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="sourceFont" className="mb-2 block">Font Options</Label>
          <FontSelector 
            value={currentSourceFont}
            onChange={handleSourceFontChange}
            disabled={!setSourceFont}
          />
        </div>
        
        <div className="flex items-end">
          <Button
            onClick={handleConvert}
            disabled={!inputText || isConverting}
            className="w-full"
          >
            {isConverting ? (
              <>
                <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                Converting...
              </>
            ) : (
              <>
                <ArrowRight className="mr-2 h-4 w-4" />
                Convert Now
              </>
            )}
          </Button>
        </div>
        
        <div className="flex items-end">
          <Button variant="outline" onClick={handleClearAll} className="w-full">
            Clear All
          </Button>
        </div>
      </div>
      
      <FileUploadArea 
        handleFilesAdded={handleFilesAdded}
        isSimple={true}
      />
    </div>
  );
}
