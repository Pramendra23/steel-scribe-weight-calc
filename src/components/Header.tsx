
import { ThemeToggle } from "./ThemeToggle";
import { InstructionsModal } from "./InstructionsModal";
import { Button } from "./ui/button";
import { Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Separator } from "./ui/separator";

export function Header() {
  const location = useLocation();
  const isOnTubePage = location.pathname === '/square-tube';

  return (
    <header className="w-full py-4 px-4 sm:px-6 flex flex-wrap justify-between items-center border-b gap-4">
      <div className="flex flex-col items-start gap-2">
        <span className="text-sm font-medium text-muted-foreground">MetalCalc Pro</span>
        <Button variant="ghost" asChild size="sm" className="flex items-center gap-2">
          <Link to="/">
            <Home className="h-4 w-4" />
            <span>Home</span>
          </Link>
        </Button>
      </div>
      
      <div className="flex items-center gap-4">
        <Button variant={!isOnTubePage ? "default" : "outline"} asChild>
          <Link to="/">Square Pipe Calculator</Link>
        </Button>
        <Button variant={isOnTubePage ? "default" : "outline"} asChild>
          <Link to="/square-tube">Square Tube Calculator</Link>
        </Button>
      </div>
      
      <div className="flex items-center gap-2">
        <InstructionsModal />
        <ThemeToggle />
      </div>
    </header>
  );
}
