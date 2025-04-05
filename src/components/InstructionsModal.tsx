
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { HelpCircle } from "lucide-react";

export function InstructionsModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <HelpCircle className="h-4 w-4" />
          How to Use
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>How to Use the Square Pipe Weight Calculator</DialogTitle>
          <DialogDescription>
            Follow these simple steps to calculate the weight of square pipes
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-4">
            <h3 className="font-medium text-blue-600 dark:text-blue-400">Basic Usage</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Enter the pipe dimensions (width, thickness, and length)</li>
              <li>Select the appropriate unit for each dimension</li>
              <li>Choose a material from the dropdown or enter a custom density</li>
              <li>Click "Calculate" to see the weight result</li>
            </ol>

            <h3 className="font-medium text-blue-600 dark:text-blue-400">Advanced Features</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Add multiple pipes for batch calculations using the "Add Pipe" button</li>
              <li>Switch between kg and lbs for the result using the unit selector</li>
              <li>Generate a PDF report of your calculations using the "Download PDF" button</li>
              <li>Toggle between light and dark mode using the theme switch</li>
            </ol>

            <h3 className="font-medium text-blue-600 dark:text-blue-400">Formula Used</h3>
            <p className="text-sm">
              Weight = [(Width × Width) - ((Width - 2 × Thickness) × (Width - 2 × Thickness))] × Length × Density
            </p>

            <h3 className="font-medium text-blue-600 dark:text-blue-400">Notes</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>All inputs are validated to prevent incorrect calculations</li>
              <li>Results are rounded to 2 decimal places</li>
              <li>The calculator automatically converts between different units</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
