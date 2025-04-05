
import { Header } from "@/components/Header";
import { PipeCalculator } from "@/components/PipeCalculator";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen bg-blue-50/50 dark:bg-gray-900">
      <Header />
      <main className="flex-grow pb-12">
        <PipeCalculator />
      </main>
      <footer className="text-center p-4 text-sm text-muted-foreground border-t">
        <p>© {new Date().getFullYear()} Square Pipe Weight Calculator. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
