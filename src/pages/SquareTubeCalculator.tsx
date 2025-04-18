
import { Header } from "@/components/Header";
import { TubeCalculator } from "@/components/TubeCalculator";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const SquareTubeCalculator = () => {
  return (
    <div className="flex flex-col min-h-screen bg-blue-50/50 dark:bg-gray-900">
      <Header />
      <main className="flex-grow pb-12">
        <div className="max-w-6xl mx-auto pt-8 px-4 sm:px-6">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-primary">Square Tube Weight Calculator</h2>
            <Card className="mt-6">
              <CardContent className="p-6">
                <p className="text-muted-foreground leading-relaxed">
                  Welcome to our Square Tube Weight Calculator, a specialized tool designed for professionals working with hollow structural sections (HSS) and square tubing. This calculator provides precise weight calculations for square tubes, taking into account their unique structural characteristics and material properties. Whether you're involved in architectural design, manufacturing, or construction, this tool helps you accurately determine the weight of your square tube materials.
                  <br /><br />
                  Square tubes are widely used in construction and manufacturing due to their excellent strength-to-weight ratio and versatile applications. Our calculator considers the specific geometry of square tubes, including outer dimensions and wall thickness, to provide accurate weight calculations that help in project planning and execution.
                  <br /><br />
                  Advanced features of our Square Tube Weight Calculator include:
                  • Comprehensive material selection with standard density values
                  • Multiple unit system support for global usage
                  • Precise wall thickness calculations
                  • Weight per unit length calculations
                  • Total weight estimation for specified lengths
                  <br /><br />
                  Square tubes are essential in:
                  • Structural frameworks
                  • Machinery construction
                  • Furniture manufacturing
                  • Industrial equipment
                  • Architectural applications
                  <br /><br />
                  Understanding tube weight is vital for:
                  • Project cost estimation
                  • Load-bearing calculations
                  • Material handling planning
                  • Transportation logistics
                  • Installation specifications
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* AdSense Placement */}
          <div className="w-full h-[250px] bg-card mb-8 flex items-center justify-center border rounded-lg">
            <p className="text-muted-foreground">Advertisement Space</p>
          </div>
          
          <TubeCalculator />
          
          {/* Bottom AdSense Placement */}
          <div className="w-full h-[250px] bg-card mt-8 flex items-center justify-center border rounded-lg">
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
          <p>© {new Date().getFullYear()} Square Tube Weight Calculator. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default SquareTubeCalculator;
