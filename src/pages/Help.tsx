import { Header } from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "react-router-dom";

const Help = () => {
  return (
    <div className="flex flex-col min-h-screen bg-blue-50/50 dark:bg-gray-900">
      <Header />
      <main className="flex-grow pb-12">
        <div className="max-w-6xl mx-auto pt-8 px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-primary mb-6">Help & FAQ</h2>
          <Card>
            <CardContent className="p-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How accurate are the weight calculations?</AccordionTrigger>
                  <AccordionContent>
                    Our calculators use industry-standard formulas and material densities to provide highly accurate weight estimations. 
                    For steel, aluminum, and other common materials, the calculations typically have an accuracy within 1-2% of actual weights.
                    For custom materials, accuracy depends on the precision of the density value you provide.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger>What's the difference between a square pipe and square tube?</AccordionTrigger>
                  <AccordionContent>
                    In engineering terminology, a "pipe" typically refers to a conduit for fluids or gases and is often specified by 
                    nominal pipe size (NPS) and schedule. A "tube" is generally used for structural or mechanical applications and is 
                    specified by actual outer dimensions and wall thickness. Our calculators accommodate both types with appropriate 
                    measurement inputs.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger>Can I use custom material densities?</AccordionTrigger>
                  <AccordionContent>
                    Yes, both calculators include an option to select "Custom" material and input your own density value. 
                    This allows you to calculate weights for specialty alloys or materials not included in our standard list.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger>Which unit system should I use?</AccordionTrigger>
                  <AccordionContent>
                    You can use either metric or imperial units based on your preference or project requirements. 
                    The calculator handles all necessary conversions internally to ensure accurate results regardless of your chosen unit system.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5">
                  <AccordionTrigger>How do I download or save my calculations?</AccordionTrigger>
                  <AccordionContent>
                    After performing a calculation, you can use the "Download PDF" button to generate a detailed report of your calculations. 
                    This PDF can be saved to your device or printed for future reference.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-6">
                  <AccordionTrigger>Are coating weights included in the calculations?</AccordionTrigger>
                  <AccordionContent>
                    No, our calculators provide the base metal weight only. Coatings such as galvanization, paint, or powder coating will add 
                    slightly to the overall weight. For highly precise requirements, you may need to add an additional factor for coatings.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-7">
                  <AccordionTrigger>Why are my results different from another calculator?</AccordionTrigger>
                  <AccordionContent>
                    Differences may arise from variations in the density values used, rounding methods, or calculation approaches. 
                    Our calculators use widely accepted density values and precise mathematical formulas. You can adjust the material 
                    density if needed to match other reference sources.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-8">
                  <AccordionTrigger>Can I calculate weights for non-square profiles?</AccordionTrigger>
                  <AccordionContent>
                    Currently, our calculators are optimized for square profiles. We are working on additional calculators for rectangular, 
                    round, and other profile shapes. These will be added to our suite of tools in future updates.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
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

export default Help;
