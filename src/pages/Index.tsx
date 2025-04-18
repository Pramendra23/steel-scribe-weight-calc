
import { Header } from "@/components/Header";
import { PipeCalculator } from "@/components/PipeCalculator";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen bg-blue-50/50 dark:bg-gray-900">
      <Header />
      <main className="flex-grow pb-12">
        <div className="max-w-6xl mx-auto pt-8 px-4 sm:px-6">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-primary">Square Pipe Weight Calculator</h2>
            <Card className="mt-6">
              <CardContent className="p-6">
                <p className="text-muted-foreground leading-relaxed">
                  Welcome to our Square Pipe Weight Calculator, an essential tool for construction professionals, engineers, and DIY enthusiasts. This calculator helps you determine the exact weight of square pipes based on their dimensions and material composition. Whether you're planning a construction project, estimating material costs, or ensuring structural integrity, our calculator provides precise measurements for your metal pipe requirements.
                  <br /><br />
                  Square pipes are crucial components in various applications, from structural support to fluid transportation systems. Our calculator takes into account multiple factors including the pipe's outer dimensions, wall thickness, and material density to provide accurate weight calculations. This helps in proper material selection, cost estimation, and load calculations for your projects.
                  <br /><br />
                  Key features of our Square Pipe Weight Calculator include:
                  • Support for multiple measurement units (metric and imperial)
                  • Various material options with precise density values
                  • Custom density input for specialized materials
                  • Instant weight calculations with detailed results
                  • Ability to save and compare multiple calculations
                  <br /><br />
                  Understanding pipe weight is crucial for:
                  • Structural load calculations
                  • Transportation planning
                  • Material cost estimation
                  • Installation requirements
                  • Safety compliance
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* AdSense Placement */}
          <div className="w-full h-[250px] bg-card mb-8 flex items-center justify-center border rounded-lg">
            <p className="text-muted-foreground">Advertisement Space</p>
          </div>
          
          <PipeCalculator />
          
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
          <p>© {new Date().getFullYear()} Pipe Weight Calculator. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
