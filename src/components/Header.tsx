
import { ThemeToggle } from "./ThemeToggle";
import { InstructionsModal } from "./InstructionsModal";
import { Button } from "./ui/button";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="w-full py-4 px-4 sm:px-6 flex flex-wrap justify-between items-center border-b gap-4">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-blue-700 dark:text-blue-400">Pipe Weight Calculator</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <Button variant="ghost" asChild className="flex items-center gap-2">
          <Link to="/">
            <Home className="h-4 w-4" />
            <span>Home</span>
          </Link>
        </Button>
      </div>
      
      <div className="flex items-center gap-2">
        <InstructionsModal />
        <ThemeToggle />
      </div>
    </header>
  );
}
