
import { Header } from "@/components/Header";
import { PipeCalculator } from "@/components/PipeCalculator";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen bg-blue-50/50 dark:bg-gray-900">
      <Header />
      <main className="flex-grow pb-12">
        <div className="max-w-6xl mx-auto pt-8 px-4 sm:px-6">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-primary">Pipe Weight Calculator</h2>
          </div>
          
          <PipeCalculator />
        </div>
      </main>
      <footer className="text-center p-4 text-sm text-muted-foreground border-t">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center">
          <div className="space-x-4 mb-4 sm:mb-0">
            <a href="#" className="hover:text-primary transition-colors">About this Tool</a>
            <a href="#" className="hover:text-primary transition-colors">Help / FAQ</a>
            <a href="#" className="hover:text-primary transition-colors">Contact</a>
          </div>
          <p>© {new Date().getFullYear()} Pipe Weight Calculator. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
