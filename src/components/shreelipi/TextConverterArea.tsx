
import { useState, useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CopyIcon, DownloadIcon, CheckIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface TextConverterAreaProps {
  inputText: string;
  setInputText: (text: string) => void;
  outputText: string;
  inputLabel: string;
  outputLabel: string;
  inputPlaceholder: string;
}

export function TextConverterArea({
  inputText,
  setInputText,
  outputText,
  inputLabel,
  outputLabel,
  inputPlaceholder
}: TextConverterAreaProps) {
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  // Copy output text to clipboard
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
        
        // Reset copied state after 2 seconds
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

  // Download output text as file
  const handleDownloadOutput = () => {
    if (!outputText) return;
    
    const blob = new Blob([outputText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    
    link.href = url;
    link.download = `converted_${new Date().toISOString().slice(0, 10)}.txt`;
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <Label htmlFor="inputText" className="mb-2 block">
          {inputLabel}
        </Label>
        <Textarea
          id="inputText"
          ref={inputRef}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={inputPlaceholder}
          className="h-80 font-mono resize-y"
        />
      </div>
      
      <div>
        <Label htmlFor="outputText" className="mb-2 block">
          {outputLabel}
        </Label>
        <div className="relative">
          <Textarea 
            id="outputText"
            readOnly
            value={outputText}
            className="h-80 font-mono resize-y"
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
    </div>
  );
}
