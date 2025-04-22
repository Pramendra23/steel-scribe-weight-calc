
import { Header } from "@/components/Header";
import { PipeCalculator } from "@/components/PipeCalculator";
import { Link } from "react-router-dom";

const SquarePipeCalculator = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50/50 to-white dark:from-gray-900 dark:to-gray-800">
      <Header />
      <main className="flex-grow pb-12">
        <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6">
          {/* Top AdSense Placement */}
          <div className="w-full h-[250px] bg-white dark:bg-gray-800 mb-8 flex items-center justify-center border rounded-lg shadow-lg">
            <p className="text-muted-foreground">Advertisement Space</p>
          </div>
          
          <PipeCalculator />
          
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
          <p>© {new Date().getFullYear()} Square Pipe Weight Calculator. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default SquarePipeCalculator;
