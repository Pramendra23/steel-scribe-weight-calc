
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { TubeData } from "./types";
import { Unit, WeightUnit, unitConversionMap, weightConversionMap, materials } from "@/types/calculator";

// Convert value from any unit to meters
export const convertToMeters = (value: number, unit: Unit): number => {
  return value * unitConversionMap[unit];
};

// Calculate tube weight
export const calculateTubeWeight = (tube: Omit<TubeData, "id" | "weight" | "weightPerUnit">): { weight: number; weightPerUnit: number } => {
  // Convert all dimensions to meters
  const width = convertToMeters(tube.width, tube.widthUnit);
  const thickness = convertToMeters(tube.thickness, tube.thicknessUnit);
  const length = convertToMeters(tube.length, tube.lengthUnit);
  
  // Find density based on material selection
  let density = 0;
  if (tube.material === "Custom" && tube.customDensity) {
    density = tube.customDensity;
  } else {
    const material = materials.find(m => m.name === tube.material);
    if (material) {
      density = material.density;
    }
  }

  // Calculate outer and inner areas
  const outerArea = width * width;
  const innerArea = (width - 2 * thickness) * (width - 2 * thickness);
  
  // Calculate weight using the formula: Weight = (outer_area - inner_area) * length * density
  const weight = (outerArea - innerArea) * length * density;
  
  // Calculate weight per unit length (in original unit system)
  const unitLength = tube.lengthUnit === "meters" ? 1 : (tube.lengthUnit === "cm" ? 0.01 : 0.3048); // 1m or 1ft
  const weightPerUnit = weight * (unitLength / length);
  
  // Convert to selected weight unit if needed
  const finalWeight = tube.weightUnit === "kg" ? weight : weight * weightConversionMap.lbs;
  const finalWeightPerUnit = tube.weightUnit === "kg" ? weightPerUnit : weightPerUnit * weightConversionMap.lbs;
  
  return { 
    weight: finalWeight,
    weightPerUnit: finalWeightPerUnit
  };
};

// Format weight to 2 decimal places
export const formatWeight = (weight: number): string => {
  return weight.toFixed(2);
};

// Export to PDF
export const exportToPDF = (tubes: TubeData[]): void => {
  // Create a new jsPDF instance
  const doc = new jsPDF();
  
  // Title
  doc.setFontSize(20);
  doc.setTextColor(33, 33, 33);
  doc.text("Square Tube Weight Calculation Report", 20, 20);
  
  // Date
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 20, 30);
  
  // Create data for table
  const tableData = tubes.map((tube, index) => {
    const material = tube.material === "Custom" ? `Custom (${tube.customDensity} kg/m³)` : tube.material;
    
    return [
      index + 1,
      `${tube.width} ${tube.widthUnit}`,
      `${tube.thickness} ${tube.thicknessUnit}`,
      `${tube.length} ${tube.lengthUnit}`,
      material,
      `${formatWeight(tube.weight)} ${tube.weightUnit}`,
      `${formatWeight(tube.weightPerUnit)} ${tube.weightUnit}/${tube.lengthUnit === "meters" ? "m" : "ft"}`
    ];
  });
  
  // Add table
  autoTable(doc, {
    head: [["#", "Width", "Thickness", "Length", "Material", `Total Weight`, `Weight per Unit`]],
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
  
  // Get the final Y position after the table
  // @ts-ignore - Using a known property in jspdf-autotable
  const finalY = (doc as any).lastAutoTable.finalY + 10;
  
  // Add notes
  doc.setFontSize(12);
  doc.setTextColor(33, 33, 33);
  doc.setFont(undefined, 'bold');
  doc.text("Notes:", 20, finalY);
  doc.setFont(undefined, 'normal');
  doc.setFontSize(10);
  doc.text("1. Weight calculations are based on theoretical density values and may vary slightly from actual weights.", 20, finalY + 10);
  doc.text("2. For custom materials, user-provided density values were used in calculations.", 20, finalY + 20);
  
  // Save PDF
  doc.save("square-tube-weight-calculation.pdf");
};
