
import { useState, useEffect, useRef, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  CopyIcon, 
  DownloadIcon, 
  UploadIcon, 
  ArrowRight, 
  RotateCw, 
  CheckIcon,
  FileText
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { DropzoneArea } from "./DropzoneArea";
import { MultiLanguageSelector } from "./MultiLanguageSelector";
import { FontSelector } from "./FontSelector";
import { 
  convertShreeLipiToUnicode, 
  convertUnicodeToShreelipi, 
  autoDetectFont 
} from "@/utils/shreelipi-utils";

type ConversionMode = "shreelipi-to-unicode" | "unicode-to-shreelipi" | "batch" | "auto-detect";

interface ShreeLipiConverterToolProps {
  conversionMode: ConversionMode;
}

export function ShreeLipiConverterTool({ conversionMode }: ShreeLipiConverterToolProps) {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [sourceFont, setSourceFont] = useState("shreelipi");
  const [targetFont, setTargetFont] = useState("unicode");
  const [interfaceLanguage, setInterfaceLanguage] = useState("english");
  const [isConverting, setIsConverting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [detectedFont, setDetectedFont] = useState<string | null>(null);
  
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();
  
  // Handle real-time conversion as user types
  useEffect(() => {
    if (inputText && (conversionMode === "shreelipi-to-unicode" || conversionMode === "unicode-to-shreelipi")) {
      const timeoutId = setTimeout(() => {
        handleConvert();
      }, 500);
      
      return () => clearTimeout(timeoutId);
    }
  }, [inputText, conversionMode, sourceFont, targetFont]);

  // Auto font detection when mode is "auto-detect"
  useEffect(() => {
    if (conversionMode === "auto-detect" && inputText) {
      const detected = autoDetectFont(inputText);
      setDetectedFont(detected);
      
      if (detected && detected !== sourceFont) {
        setSourceFont(detected);
        toast({
          title: "Font Detected",
          description: `Detected ${detected.charAt(0).toUpperCase() + detected.slice(1)} font!`,
          duration: 3000
        });
      }
    }
  }, [inputText, conversionMode]);

  // Handle file uploads
  const handleFilesAdded = useCallback((files: File[]) => {
    setUploadedFiles(files);
    
    // Process the first file to show a preview
    if (files.length > 0) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setInputText(content || "");
      };
      reader.readAsText(files[0]);
      
      toast({
        title: "Files Added",
        description: `Added ${files.length} file(s) for conversion`,
        duration: 3000
      });
    }
  }, []);

  // Convert text based on selected mode
  const handleConvert = () => {
    if (!inputText) return;
    
    setIsConverting(true);
    
    try {
      let result = "";
      
      if (sourceFont === "shreelipi" && targetFont === "unicode") {
        result = convertShreeLipiToUnicode(inputText);
      } else if (sourceFont === "unicode" && targetFont === "shreelipi") {
        result = convertUnicodeToShreelipi(inputText);
      } else if (sourceFont === "krutidev" && targetFont === "unicode") {
        // This would be the actual implementation for Krutidev conversion
        result = `Converted from Krutidev to Unicode: ${inputText}`;
      } else {
        // For demonstration purposes
        result = `Converted from ${sourceFont} to ${targetFont}: ${inputText}`;
      }
      
      setOutputText(result);
    } catch (error) {
      console.error("Conversion error:", error);
      toast({
        title: "Conversion Error",
        description: "An error occurred during conversion. Please try again.",
        variant: "destructive",
        duration: 3000
      });
    } finally {
      setIsConverting(false);
    }
  };

  // Handle batch conversion
  const handleBatchConvert = async () => {
    if (uploadedFiles.length === 0) {
      toast({
        title: "No Files Selected",
        description: "Please upload files to convert",
        variant: "destructive",
        duration: 3000
      });
      return;
    }
    
    setIsConverting(true);
    
    try {
      // Process each file (in a real implementation, you'd convert each file)
      const results = [];
      
      for (const file of uploadedFiles) {
        const content = await readFileAsText(file);
        let convertedContent;
        
        if (sourceFont === "shreelipi" && targetFont === "unicode") {
          convertedContent = convertShreeLipiToUnicode(content);
        } else if (sourceFont === "unicode" && targetFont === "shreelipi") {
          convertedContent = convertUnicodeToShreelipi(content);
        } else {
          // Simulated conversion for other formats
          convertedContent = `Converted ${file.name} from ${sourceFont} to ${targetFont}`;
        }
        
        results.push({
          fileName: file.name,
          content: convertedContent
        });
      }
      
      // For demo, we'll just show the number of converted files
      toast({
        title: "Batch Conversion Complete",
        description: `Successfully converted ${uploadedFiles.length} file(s)`,
        duration: 3000
      });
      
      // Show the first converted file content as a preview
      if (results.length > 0) {
        setOutputText(results[0].content);
      }
    } catch (error) {
      console.error("Batch conversion error:", error);
      toast({
        title: "Conversion Error",
        description: "An error occurred during batch conversion",
        variant: "destructive",
        duration: 3000
      });
    } finally {
      setIsConverting(false);
    }
  };

  const readFileAsText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = (e) => reject(e);
      reader.readAsText(file);
    });
  };

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

  // Clear all fields
  const handleClearAll = () => {
    setInputText("");
    setOutputText("");
    setUploadedFiles([]);
    setDetectedFont(null);
    
    if (inputRef.current) {
      inputRef.current.focus();
    }
    
    toast({
      title: "Cleared",
      description: "All fields have been cleared",
      duration: 2000
    });
  };

  // Render converter UI based on conversion mode
  const renderConverter = () => {
    switch (conversionMode) {
      case "batch":
        return (
          <div className="grid grid-cols-1 gap-8">
            <div>
              <Label className="mb-2 block">Upload Files</Label>
              <DropzoneArea 
                onFilesAdded={handleFilesAdded} 
                acceptedFileTypes={['.txt', '.docx']}
                maxFiles={10} 
              />
              
              {uploadedFiles.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Uploaded Files ({uploadedFiles.length})</h4>
                  <div className="bg-background border rounded-md p-3 max-h-[200px] overflow-y-auto">
                    <ul className="space-y-1">
                      {uploadedFiles.map((file, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{file.name}</span>
                          <span className="text-xs text-muted-foreground ml-auto">
                            {(file.size / 1024).toFixed(1)} KB
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
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
                  disableOption={sourceFont} // Can't convert to the same font
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
        
      case "auto-detect":
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
                ref={inputRef}
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
        
      default:
        // For shreelipi-to-unicode and unicode-to-shreelipi
        return (
          <div className="grid grid-cols-1 gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="inputText" className="mb-2 block">
                  {conversionMode === "shreelipi-to-unicode" 
                    ? "Shree Lipi Text" 
                    : "Unicode Text"}
                </Label>
                <Textarea
                  id="inputText"
                  ref={inputRef}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={`Type or paste ${conversionMode === "shreelipi-to-unicode" 
                    ? "Shree Lipi" 
                    : "Unicode"} text here...`}
                  className="h-80 font-mono resize-y"
                />
              </div>
              
              <div>
                <Label htmlFor="outputText" className="mb-2 block">
                  {conversionMode === "shreelipi-to-unicode" 
                    ? "Unicode Text" 
                    : "Shree Lipi Text"}
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
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="sourceFont" className="mb-2 block">Font Options</Label>
                <FontSelector 
                  value={conversionMode === "shreelipi-to-unicode" ? "shreelipi" : "unicode"} 
                  onChange={() => {}} // Fixed for this mode
                  disabled={true}
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
            
            <div className="mt-4">
              <Label className="mb-2 block">Or upload a file:</Label>
              <div className="flex items-center gap-2">
                <Input 
                  type="file" 
                  accept=".txt,.docx" 
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    if (files.length > 0) {
                      handleFilesAdded(files);
                    }
                  }}
                  className="flex-grow"
                />
                <Button variant="outline">
                  <UploadIcon className="h-4 w-4 mr-2" />
                  Upload
                </Button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <Card className="border shadow-lg">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">
            {conversionMode === "shreelipi-to-unicode" && "Shree Lipi to Unicode Converter"}
            {conversionMode === "unicode-to-shreelipi" && "Unicode to Shree Lipi Converter"}
            {conversionMode === "batch" && "Batch File Conversion"}
            {conversionMode === "auto-detect" && "Auto Font Detection & Conversion"}
          </h3>
          
          <div>
            <MultiLanguageSelector
              value={interfaceLanguage}
              onChange={setInterfaceLanguage}
            />
          </div>
        </div>
        
        {renderConverter()}
      </CardContent>
    </Card>
  );
}
