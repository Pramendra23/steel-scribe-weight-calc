
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, RotateCw, CheckIcon, CopyIcon, DownloadIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { DropzoneArea } from "./DropzoneArea";
import { FontSelector } from "./FontSelector";

interface BatchConversionModeProps {
  sourceFont: string;
  setSourceFont: (value: string) => void;
  targetFont: string;
  setTargetFont: (value: string) => void;
  outputText: string;
  setOutputText: (text: string) => void;
  uploadedFiles: File[];
  setUploadedFiles: (files: File[]) => void;
  isConverting: boolean;
  handleBatchConvert: () => void;
  handleClearAll: () => void;
}

export function BatchConversionMode({
  sourceFont,
  setSourceFont,
  targetFont,
  setTargetFont,
  outputText,
  setOutputText,
  uploadedFiles,
  setUploadedFiles,
  isConverting,
  handleBatchConvert,
  handleClearAll
}: BatchConversionModeProps) {
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
    link.download = `converted_batch_${new Date().toISOString().slice(0, 10)}.txt`;
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
    <div className="grid grid-cols-1 gap-8">
      <div>
        <Label className="mb-2 block">Upload Files</Label>
        <DropzoneArea 
          onFilesAdded={setUploadedFiles} 
          acceptedFileTypes={['.txt', '.docx']}
          maxFiles={10} 
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="sourceFont" className="mb-2 block">Source Font</Label>
          <FontSelector 
            value={sourceFont} 
            onChange={setSourceFont} 
          />
        </div>
        <div>
          <Label htmlFor="targetFont" className="mb-2 block">Target Font</Label>
          <FontSelector 
            value={targetFont} 
            onChange={setTargetFont} 
            disableOption={sourceFont}
          />
        </div>
      </div>
      
      <div className="flex justify-between flex-wrap gap-4">
        <Button
          onClick={handleBatchConvert}
          disabled={uploadedFiles.length === 0 || isConverting}
          className="flex-grow sm:flex-grow-0"
        >
          {isConverting ? (
            <>
              <RotateCw className="mr-2 h-4 w-4 animate-spin" />
              Converting...
            </>
          ) : (
            <>
              <ArrowRight className="mr-2 h-4 w-4" />
              Convert Files
            </>
          )}
        </Button>
        
        <div className="flex gap-2 flex-grow sm:flex-grow-0 justify-end">
          <Button 
            variant="outline" 
            onClick={handleClearAll}
          >
            Clear All
          </Button>
          <Button 
            variant="outline" 
            onClick={handleDownloadOutput}
            disabled={!outputText}
          >
            <DownloadIcon className="mr-2 h-4 w-4" />
            Download All
          </Button>
        </div>
      </div>
      
      {outputText && (
        <div>
          <Label htmlFor="outputPreview" className="mb-2 block">
            Conversion Preview (First File)
          </Label>
          <div className="relative">
            <Textarea 
              id="outputPreview"
              readOnly
              value={outputText}
              className="h-[200px] font-mono"
            />
            <Button
              size="sm"
              variant="ghost"
              onClick={handleCopyOutput}
              className="absolute top-2 right-2"
              disabled={copied}
            >
              {copied ? (
                <CheckIcon className="h-4 w-4 text-green-500" />
              ) : (
                <CopyIcon className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
