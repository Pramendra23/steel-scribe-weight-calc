import { PipeData, Unit, WeightUnit, unitConversionMap, weightConversionMap, materials } from "../types/calculator";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

// Convert value from any unit to meters
export const convertToMeters = (value: number, unit: Unit): number => {
  return value * unitConversionMap[unit];
};

// Calculate pipe weight in kg
export const calculatePipeWeight = (pipe: Omit<PipeData, "id" | "weight">): number => {
  // Convert all dimensions to meters
  const width = convertToMeters(pipe.width, pipe.widthUnit);
  const thickness = convertToMeters(pipe.thickness, pipe.thicknessUnit);
  const length = convertToMeters(pipe.length, pipe.lengthUnit);
  
  // Find density based on material selection
  let density = 0;
  if (pipe.material === "Custom" && pipe.customDensity) {
    density = pipe.customDensity;
  } else {
    const material = materials.find(m => m.name === pipe.material);
    if (material) {
      density = material.density;
    }
  }

  // Calculate outer and inner areas
  const outerArea = width * width;
  const innerArea = (width - 2 * thickness) * (width - 2 * thickness);
  
  // Calculate weight using the formula: Weight = (outer_area - inner_area) * length * density
  const weight = (outerArea - innerArea) * length * density;
  
  return weight;
};

// Convert weight to selected unit
export const convertWeight = (weight: number, unit: WeightUnit): number => {
  return weight * weightConversionMap[unit];
};

// Format weight to 2 decimal places
export const formatWeight = (weight: number): string => {
  return weight.toFixed(2);
};

// Generate PDF report
export const generatePDF = (pipes: PipeData[], weightUnit: WeightUnit): void => {
  // Create a new jsPDF instance
  const doc = new jsPDF();
  
  // Add autoTable to jsPDF instance
  const jspdfInstance = doc as unknown as jsPDF & { autoTable: typeof autoTable };
  
  // Title
  doc.setFontSize(20);
  doc.setTextColor(33, 33, 33);
  doc.text("Square Pipe Weight Calculation Report", 20, 20);
  
  // Date
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 20, 30);
  
  // Create data for table
  const tableData = pipes.map((pipe, index) => {
    const material = pipe.material === "Custom" ? `Custom (${pipe.customDensity} kg/m³)` : pipe.material;
    const weightInSelectedUnit = convertWeight(pipe.weight, weightUnit);
    
    return [
      index + 1,
      `${pipe.width} ${pipe.widthUnit}`,
      `${pipe.thickness} ${pipe.thicknessUnit}`,
      `${pipe.length} ${pipe.lengthUnit}`,
      material,
      `${formatWeight(weightInSelectedUnit)} ${weightUnit}`
    ];
  });
  
  // Add table
  jspdfInstance.autoTable({
    head: [["#", "Width", "Thickness", "Length", "Material", `Weight (${weightUnit})`]],
    body: tableData,
    startY: 40,
    headStyles: {
      fillColor: [41, 128, 185],
      textColor: [255, 255, 255],
      fontStyle: 'bold'
    },
    alternateRowStyles: {
      fillColor: [240, 240, 240]
    }
  });
  
  // Add total weight
  const totalWeight = pipes.reduce((sum, pipe) => sum + convertWeight(pipe.weight, weightUnit), 0);
  const finalY = (jspdfInstance.autoTable as any).previous.finalY + 10;
  
  doc.setFontSize(12);
  doc.setTextColor(33, 33, 33);
  doc.setFont(undefined, 'bold');
  doc.text(`Total Weight: ${formatWeight(totalWeight)} ${weightUnit}`, 20, finalY);
  
  // Save PDF
  doc.save("square-pipe-weight-calculation.pdf");
};
