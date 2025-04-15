
import { Header } from "@/components/Header";
import { PipeCalculator } from "@/components/PipeCalculator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen bg-blue-50/50 dark:bg-gray-900">
      <Header />
      <main className="flex-grow pb-12">
        <div className="max-w-6xl mx-auto pt-8 px-4 sm:px-6">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-primary mb-4">Welcome to the Tube Weight Calculator</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Professional calculators for determining the weight of square tubes and pipes based on dimensions and material properties. 
              Get precise measurements for your construction and manufacturing projects.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle>Square Pipe Calculator</CardTitle>
                <CardDescription>Calculate the weight of square pipes with customizable dimensions and materials</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  The Square Pipe Calculator helps you determine the weight of square pipes based on their 
                  width, thickness, length, and material. Ideal for construction and engineering projects.
                </p>
                <Button asChild>
                  <Link to="/square-pipe">Go to Square Pipe Calculator</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle>Square Tube Calculator</CardTitle>
                <CardDescription>Calculate the weight of square tubes with enhanced features and unit conversions</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  The Square Tube Calculator offers advanced features including unit conversion, 
                  weight per unit length calculations, and the ability to save and share your results.
                </p>
                <Button asChild>
                  <Link to="/square-tube">Go to Square Tube Calculator</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="border-t pt-8">
            <h3 className="text-xl font-bold mb-4">Default Square Pipe Calculator</h3>
            <PipeCalculator />
          </div>
        </div>
      </main>
      <footer className="text-center p-4 text-sm text-muted-foreground border-t">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center">
          <div className="space-x-4 mb-4 sm:mb-0">
            <a href="#" className="hover:text-primary transition-colors">About this Tool</a>
            <a href="#" className="hover:text-primary transition-colors">Help / FAQ</a>
            <a href="#" className="hover:text-primary transition-colors">Contact</a>
          </div>
          <p>© {new Date().getFullYear()} Tube Weight Calculator. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
