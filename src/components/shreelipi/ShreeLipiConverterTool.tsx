
import { useState, useEffect, useRef, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { MultiLanguageSelector } from "./MultiLanguageSelector";
import { 
  convertShreeLipiToUnicode, 
  convertUnicodeToShreelipi, 
  autoDetectFont,
  convertBetweenFonts
} from "@/utils/shreelipi-utils";
import { StandardConversionMode } from "./StandardConversionMode";
import { BatchConversionMode } from "./BatchConversionMode";
import { AutoDetectMode } from "./AutoDetectMode";

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
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [detectedFont, setDetectedFont] = useState<string | null>(null);
  
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  // Set initial fonts based on conversion mode
  useEffect(() => {
    if (conversionMode === "shreelipi-to-unicode") {
      setSourceFont("shreelipi");
      setTargetFont("unicode");
    } else if (conversionMode === "unicode-to-shreelipi") {
      setSourceFont("unicode");
      setTargetFont("shreelipi");
    }
  }, [conversionMode]);
  
  // Handle real-time conversion as user types - disabled for more explicit control
  // We'll rely on the Convert button for better user experience
  
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
  }, [inputText, conversionMode, sourceFont, toast]);

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
  }, [toast]);

  // Convert text based on selected mode and fonts
  const handleConvert = useCallback(() => {
    if (!inputText) return;
    
    setIsConverting(true);
    console.log("Starting conversion with:", {
      inputText,
      sourceFont,
      targetFont,
      conversionMode
    });
    
    try {
      let result = "";
      
      if (sourceFont === "shreelipi" && targetFont === "unicode") {
        console.log("Converting Shree Lipi to Unicode");
        result = convertShreeLipiToUnicode(inputText);
      } else if (sourceFont === "unicode" && targetFont === "shreelipi") {
        console.log("Converting Unicode to Shree Lipi");
        result = convertUnicodeToShreelipi(inputText);
      } else {
        // Use the general conversion function for other combinations
        console.log(`Converting from ${sourceFont} to ${targetFont}`);
        result = convertBetweenFonts(inputText, sourceFont, targetFont);
      }
      
      console.log("Conversion completed:", result);
      setOutputText(result);
      
      // Show toast for successful conversion
      toast({
        title: "Conversion Complete",
        description: `Successfully converted from ${sourceFont} to ${targetFont}`,
        duration: 2000
      });
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
  }, [inputText, sourceFont, targetFont, toast, conversionMode]);

  // Read file content as text
  const readFileAsText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = (e) => reject(e);
      reader.readAsText(file);
    });
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
      // Process each file
      const results = [];
      
      for (const file of uploadedFiles) {
        const content = await readFileAsText(file);
        let convertedContent;
        
        if (sourceFont === "shreelipi" && targetFont === "unicode") {
          convertedContent = convertShreeLipiToUnicode(content);
        } else if (sourceFont === "unicode" && targetFont === "shreelipi") {
          convertedContent = convertUnicodeToShreelipi(content);
        } else {
          // Use the general conversion function for other combinations
          convertedContent = convertBetweenFonts(content, sourceFont, targetFont);
        }
        
        results.push({
          fileName: file.name,
          content: convertedContent
        });
      }
      
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

  // Render the appropriate conversion mode component
  const renderConverter = () => {
    switch (conversionMode) {
      case "batch":
        return (
          <BatchConversionMode
            sourceFont={sourceFont}
            setSourceFont={setSourceFont}
            targetFont={targetFont}
            setTargetFont={setTargetFont}
            outputText={outputText}
            setOutputText={setOutputText}
            uploadedFiles={uploadedFiles}
            setUploadedFiles={setUploadedFiles}
            isConverting={isConverting}
            handleBatchConvert={handleBatchConvert}
            handleClearAll={handleClearAll}
          />
        );
        
      case "auto-detect":
        return (
          <AutoDetectMode
            inputText={inputText}
            setInputText={setInputText}
            targetFont={targetFont}
            setTargetFont={setTargetFont}
            outputText={outputText}
            detectedFont={detectedFont}
            isConverting={isConverting}
            handleConvert={handleConvert}
          />
        );
        
      default:
        // For shreelipi-to-unicode and unicode-to-shreelipi
        return (
          <StandardConversionMode
            conversionMode={conversionMode as "shreelipi-to-unicode" | "unicode-to-shreelipi"}
            inputText={inputText}
            setInputText={setInputText}
            outputText={outputText}
            isConverting={isConverting}
            handleConvert={handleConvert}
            handleClearAll={handleClearAll}
            handleFilesAdded={handleFilesAdded}
            sourceFont={sourceFont}
            setSourceFont={setSourceFont}
            targetFont={targetFont}
            setTargetFont={setTargetFont}
          />
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
