
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ShreeLipiConverterTool } from "@/components/shreelipi/ShreeLipiConverterTool";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SunIcon, MoonIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ShreeLipiConverter = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    // Get theme from localStorage or default to 'light'
    const savedTheme = localStorage.getItem('shreelipi-theme') as 'light' | 'dark';
    return savedTheme || 'light';
  });
  
  const { toast } = useToast();

  // Apply theme when component mounts and when theme changes
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem('shreelipi-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    toast({
      title: `${newTheme.charAt(0).toUpperCase() + newTheme.slice(1)} mode activated`,
      description: `You've switched to ${newTheme} mode.`,
      duration: 2000,
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50/50 to-white dark:from-gray-900 dark:to-gray-800">
      <Header />
      <main className="flex-grow pb-12">
        <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-primary">Shree Lipi Converter</h2>
              <p className="text-muted-foreground mt-2">Convert between Shree Lipi, Unicode, and other Indian language fonts</p>
            </div>
            <button 
              onClick={toggleTheme} 
              className="mt-4 md:mt-0 p-2 rounded-full bg-accent hover:bg-accent/80 transition-colors"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
            </button>
          </div>
          
          <Card className="border-0 shadow-lg mb-8">
            <CardContent className="p-6">
              <p className="text-muted-foreground leading-relaxed">
                Welcome to our Shree Lipi Converter! This powerful tool allows you to seamlessly convert text between various Indian language fonts including Shree Lipi, Unicode, Krutidev, Mangal, and more. Whether you need to convert legacy documents or create new content, our converter offers accurate, real-time conversion with preview functionality.
              </p>
            </CardContent>
          </Card>

          {/* Top AdSense Placement */}
          <div className="w-full h-[250px] bg-white dark:bg-gray-800 mb-8 flex items-center justify-center border rounded-lg shadow-lg">
            <p className="text-muted-foreground">Advertisement Space</p>
          </div>
          
          <Tabs defaultValue="shreelipi-to-unicode" className="w-full mb-8">
            <TabsList className="w-full justify-start mb-6 bg-transparent flex flex-wrap border-b overflow-x-auto">
              <TabsTrigger value="shreelipi-to-unicode" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none border-b-2 border-transparent px-4 py-2">
                Shree Lipi → Unicode
              </TabsTrigger>
              <TabsTrigger value="unicode-to-shreelipi" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none border-b-2 border-transparent px-4 py-2">
                Unicode → Shree Lipi
              </TabsTrigger>
              <TabsTrigger value="batch-conversion" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none border-b-2 border-transparent px-4 py-2">
                Batch Conversion
              </TabsTrigger>
              <TabsTrigger value="font-detection" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none border-b-2 border-transparent px-4 py-2">
                Auto Font Detection
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="shreelipi-to-unicode" className="mt-0">
              <ShreeLipiConverterTool conversionMode="shreelipi-to-unicode" />
            </TabsContent>
            
            <TabsContent value="unicode-to-shreelipi" className="mt-0">
              <ShreeLipiConverterTool conversionMode="unicode-to-shreelipi" />
            </TabsContent>
            
            <TabsContent value="batch-conversion" className="mt-0">
              <ShreeLipiConverterTool conversionMode="batch" />
            </TabsContent>
            
            <TabsContent value="font-detection" className="mt-0">
              <ShreeLipiConverterTool conversionMode="auto-detect" />
            </TabsContent>
          </Tabs>
          
          {/* Features section */}
          <h3 className="text-2xl font-bold mb-6">Key Features</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card className="border-0 shadow-md hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="text-primary text-xl mb-3">Multiple Font Support</div>
                <p className="text-muted-foreground">
                  Convert between Shree Lipi, Unicode, Krutidev, Devlys, and Mangal fonts with accurate mapping.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-md hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="text-primary text-xl mb-3">Real-Time Preview</div>
                <p className="text-muted-foreground">
                  See the converted text instantly as you type or upload, ensuring accuracy before finalizing.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-md hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="text-primary text-xl mb-3">Batch Processing</div>
                <p className="text-muted-foreground">
                  Upload and convert multiple files at once, saving valuable time on large conversion projects.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-md hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="text-primary text-xl mb-3">Drag & Drop Support</div>
                <p className="text-muted-foreground">
                  Easily drag and drop files for conversion without navigating through complex menus.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-md hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="text-primary text-xl mb-3">Multilingual Interface</div>
                <p className="text-muted-foreground">
                  Use our converter in Hindi, Marathi, or English for a comfortable experience in your preferred language.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-md hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="text-primary text-xl mb-3">Save & Download</div>
                <p className="text-muted-foreground">
                  Copy converted text to clipboard or download as .txt or .docx files for further use.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* FAQ section */}
          <h3 className="text-2xl font-bold mb-6">Frequently Asked Questions</h3>
          <div className="space-y-4 mb-8">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <h4 className="text-lg font-medium mb-2">What is Shree Lipi?</h4>
                <p className="text-muted-foreground">
                  Shree Lipi is a popular font and typing system for Indian languages, especially widely used for Marathi and Hindi. It was developed before Unicode standardization and is still commonly found in legacy documents.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <h4 className="text-lg font-medium mb-2">Why convert between Shree Lipi and Unicode?</h4>
                <p className="text-muted-foreground">
                  Unicode is the modern standard for text encoding, ensuring compatibility across all devices and platforms. Converting legacy Shree Lipi text to Unicode helps preserve content and makes it universally accessible.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <h4 className="text-lg font-medium mb-2">Is my data secure during conversion?</h4>
                <p className="text-muted-foreground">
                  Yes, all conversions are performed locally in your browser. Your text is never sent to our servers, ensuring complete privacy and security for sensitive documents.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <h4 className="text-lg font-medium mb-2">Which file formats are supported?</h4>
                <p className="text-muted-foreground">
                  Our converter supports plain text (.txt) files and Microsoft Word (.docx) documents for batch conversion. We're constantly working to add support for more formats.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Bottom AdSense Placement */}
          <div className="w-full h-[250px] bg-white dark:bg-gray-800 mt-8 flex items-center justify-center border rounded-lg shadow-lg">
            <p className="text-muted-foreground">Advertisement Space</p>
          </div>
        </div>
      </main>
      <footer className="text-center p-4 text-sm text-muted-foreground border-t">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center">
          <div className="space-x-4 mb-4 sm:mb-0">
            <Link to="/about" className="hover:text-primary transition-colors">About</Link>
            <Link to="/help" className="hover:text-primary transition-colors">Help</Link>
            <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
            <Link to="/blog" className="hover:text-primary transition-colors">Blog</Link>
          </div>
          <p>© {new Date().getFullYear()} Shree Lipi Converter. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ShreeLipiConverter;
