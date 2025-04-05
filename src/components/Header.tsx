
import { ThemeToggle } from "./ThemeToggle";
import { InstructionsModal } from "./InstructionsModal";

export function Header() {
  return (
    <header className="w-full py-4 px-4 sm:px-6 flex justify-between items-center border-b">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-blue-700 dark:text-blue-400">Square Pipe Weight Calculator</h1>
      </div>
      <div className="flex items-center gap-2">
        <InstructionsModal />
        <ThemeToggle />
      </div>
    </header>
  );
}
