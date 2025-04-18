import { Header } from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="flex flex-col min-h-screen bg-blue-50/50 dark:bg-gray-900">
      <Header />
      <main className="flex-grow pb-12">
        <div className="max-w-6xl mx-auto pt-8 px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-primary mb-6">About This Tool</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="text-xl font-semibold">What is MetalCalc Pro?</h3>
              <p className="text-muted-foreground leading-relaxed">
                MetalCalc Pro is a specialized suite of calculators designed for professionals in the metal fabrication, 
                construction, and engineering industries. Our tools provide precise calculations for weight estimation
                of various metal profiles, starting with our Square Pipe and Square Tube calculators.
              </p>
              
              <h3 className="text-xl font-semibold mt-6">Why Use Our Calculators?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Accurate weight calculations are essential for various aspects of project planning, including:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Material estimation and procurement</li>
                <li>Cost calculation and budgeting</li>
                <li>Structural load analysis</li>
                <li>Transportation and logistics planning</li>
                <li>Installation requirements assessment</li>
              </ul>
              
              <h3 className="text-xl font-semibold mt-6">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                We aim to provide the most accurate, user-friendly, and comprehensive metal calculation tools available 
                online. Our calculators are constantly updated with the latest industry standards and enhanced with 
                features based on user feedback.
              </p>
              
              <h3 className="text-xl font-semibold mt-6">Technology Behind Our Tools</h3>
              <p className="text-muted-foreground leading-relaxed">
                MetalCalc Pro uses advanced algorithms that consider the specific geometry of different metal profiles 
                along with precise material density data. Our calculations have been verified against industry standards 
                to ensure accuracy.
              </p>
              
              <h3 className="text-xl font-semibold mt-6">Future Development</h3>
              <p className="text-muted-foreground leading-relaxed">
                We are actively developing additional calculators for various metal profiles and applications, including:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Rectangular tube and pipe calculators</li>
                <li>Round tube and pipe calculators</li>
                <li>Angle, channel, and beam calculators</li>
                <li>Sheet metal weight calculators</li>
                <li>Material cost estimators</li>
              </ul>
            </CardContent>
          </Card>
          
          {/* AdSense Placement */}
          <div className="w-full h-[250px] bg-card my-8 flex items-center justify-center border rounded-lg">
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

export default About;
