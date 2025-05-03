
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, RotateCw, CheckIcon, CopyIcon, DownloadIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { FontSelector } from "./FontSelector";

interface AutoDetectModeProps {
  inputText: string;
  setInputText: (text: string) => void;
  targetFont: string;
  setTargetFont: (value: string) => void;
  outputText: string;
  detectedFont: string | null;
  isConverting: boolean;
  handleConvert: () => void;
}

export function AutoDetectMode({
  inputText,
  setInputText,
  targetFont,
  setTargetFont,
  outputText,
  detectedFont,
  isConverting,
  handleConvert
}: AutoDetectModeProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopyOutput = () => {
    if (!outputText) return;
    
    navigator.clipboard.writeText(outputText)
      .then(() => {
        setCopied(true);
        toast({
          title: "Copied!",
          description: "Text copied to clipboard",
          duration: 2000
        });
        
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error("Failed to copy:", err);
        toast({
          title: "Copy Failed",
          description: "Failed to copy text to clipboard",
          variant: "destructive",
          duration: 3000
        });
      });
  };

  const handleDownloadOutput = () => {
    if (!outputText) return;
    
    const blob = new Blob([outputText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    
    link.href = url;
    link.download = `converted_auto_${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Downloaded!",
      description: "Text downloaded as file",
      duration: 2000
    });
  };
  
  return (
    <div className="grid grid-cols-1 gap-6">
      <div>
        <div className="flex justify-between items-center mb-2">
          <Label htmlFor="inputText" className="block">Input Text</Label>
          {detectedFont && (
            <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded-md">
              Detected: {detectedFont.charAt(0).toUpperCase() + detectedFont.slice(1)}
            </span>
          )}
        </div>
        <Textarea
          id="inputText"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type or paste text here for automatic font detection..."
          className="h-40 font-mono resize-y"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
        <div>
          <Label htmlFor="targetFont" className="mb-2 block">Convert To</Label>
          <FontSelector 
            value={targetFont} 
            onChange={setTargetFont} 
            disableOption={detectedFont || undefined}
          />
        </div>
        
        <Button
          onClick={handleConvert}
          disabled={!inputText || !detectedFont || isConverting}
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
              Convert Text
            </>
          )}
        </Button>
      </div>
      
      {outputText && (
        <div>
          <Label htmlFor="outputText" className="mb-2 block">
            Converted Text
          </Label>
          <div className="relative">
            <Textarea 
              id="outputText"
              readOnly
              value={outputText}
              className="h-40 font-mono resize-y"
            />
            <div className="absolute top-2 right-2 flex gap-1">
              <Button
                size="sm"
                variant="ghost"
                onClick={handleCopyOutput}
              >
                {copied ? (
                  <CheckIcon className="h-4 w-4 text-green-500" />
                ) : (
                  <CopyIcon className="h-4 w-4" />
                )}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleDownloadOutput}
              >
                <DownloadIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
