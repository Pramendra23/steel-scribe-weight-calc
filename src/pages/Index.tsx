
import { Header } from "@/components/Header";
import { PipeCalculator } from "@/components/PipeCalculator";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50/50 to-white dark:from-gray-900 dark:to-gray-800 font-inter">
      <Header />
      <main className="flex-grow pb-12">
        <div className="max-w-6xl mx-auto pt-8 px-4 sm:px-6">
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-primary mb-4">Square Pipe Weight Calculator</h2>
            <div className="relative rounded-xl overflow-hidden mb-6">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&h=400&q=80"
                alt="Metal engineering workspace"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
                <div className="p-8 text-white max-w-2xl">
                  <h3 className="text-3xl font-bold mb-4">Professional Metal Weight Calculations</h3>
                  <p className="text-lg opacity-90">
                    Get precise weight calculations for your metal pipe projects with our advanced calculator.
                  </p>
                </div>
              </div>
            </div>
            
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <p className="text-muted-foreground leading-relaxed">
                  Welcome to our Square Pipe Weight Calculator, an essential tool for construction professionals, engineers, and DIY enthusiasts. This calculator helps you determine the exact weight of square pipes based on their dimensions and material composition.
                  <br /><br />
                  Square pipes are crucial components in various applications, from structural support to fluid transportation systems. Our calculator takes into account multiple factors including the pipe's outer dimensions, wall thickness, and material density to provide accurate weight calculations.
                  <br /><br />
                  Key features of our Square Pipe Weight Calculator include:
                  • Support for multiple measurement units (metric and imperial)
                  • Various material options with precise density values
                  • Custom density input for specialized materials
                  • Instant weight calculations with detailed results
                  • Ability to save and compare multiple calculations
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Top AdSense Placement */}
          <div className="w-full h-[250px] bg-white dark:bg-gray-800 mb-8 flex items-center justify-center border rounded-lg shadow-lg">
            <p className="text-muted-foreground">Advertisement Space</p>
          </div>
          
          <PipeCalculator />
          
          {/* Middle AdSense Placement */}
          <div className="w-full h-[250px] bg-white dark:bg-gray-800 my-8 flex items-center justify-center border rounded-lg shadow-lg">
            <p className="text-muted-foreground">Advertisement Space</p>
          </div>
          
          {/* Bottom Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Why Choose Our Calculator?</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li>• Precise calculations based on industry standards</li>
                  <li>• User-friendly interface for quick results</li>
                  <li>• Support for various measurement units</li>
                  <li>• Detailed output with comprehensive measurements</li>
                  <li>• Free to use with no registration required</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Applications</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li>• Construction projects</li>
                  <li>• Industrial manufacturing</li>
                  <li>• Architectural design</li>
                  <li>• Engineering calculations</li>
                  <li>• Material cost estimation</li>
                </ul>
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
            <Link to="/about" className="hover:text-primary transition-colors">About this Tool</Link>
            <Link to="/help" className="hover:text-primary transition-colors">Help / FAQ</Link>
            <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
          </div>
          <p>© {new Date().getFullYear()} MetalCalc Pro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
