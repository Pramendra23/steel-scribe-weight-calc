/**
 * Utility functions for Shree Lipi to Unicode conversion and vice versa.
 */

// Enhanced character mapping for more accurate conversions
const shreeLipiToUnicodeMap: Record<string, string> = {
  // Vowels
  'A': 'अ',
  'Aa': 'आ',
  'i': 'इ',
  'I': 'ई',
  'u': 'उ',
  'U': 'ऊ',
  'e': 'ए',
  'E': 'ऐ',
  'ao': 'ओ',
  'AO': 'औ',
  
  // Consonants
  'k': 'क',
  'K': 'ख',
  'g': 'ग',
  'G': 'घ',
  'c': 'च',
  'C': 'छ',
  'j': 'ज',
  'J': 'झ',
  'T': 'ट',
  'Th': 'ठ',
  'd': 'द',
  'D': 'ध',
  'N': 'ण',
  't': 'त',
  'th': 'थ',
  'dh': 'ढ',
  'n': 'न',
  'p': 'प',
  'P': 'फ',
  'b': 'ब',
  'B': 'भ',
  'm': 'म',
  'y': 'य',
  'r': 'र',
  'l': 'ल',
  'v': 'व',
  'sh': 'श',
  'Sh': 'ष',
  's': 'स',
  'h': 'ह',
  
  // Special characters
  '.': '।',
  'OM': 'ॐ',
  
  // Common conjuncts
  'tr': 'त्र',
  'kr': 'क्र',
  'pr': 'प्र',
  
  // Add more mappings as needed
};

const unicodeToShreeLipiMap: Record<string, string> = {
  // This is the reverse mapping of the above
  'अ': 'A',
  'आ': 'Aa',
  'इ': 'i',
  'ई': 'I',
  'उ': 'u',
  'ऊ': 'U',
  'ए': 'e',
  'ऐ': 'E',
  'ओ': 'ao',
  'औ': 'AO',
  
  'क': 'k',
  'ख': 'K',
  'ग': 'g',
  'घ': 'G',
  'च': 'c',
  'छ': 'C',
  'ज': 'j',
  'झ': 'J',
  'ट': 'T',
  'ठ': 'Th',
  'द': 'd',
  'ध': 'D',
  'ण': 'N',
  'त': 't',
  'थ': 'th',
  'न': 'n',
  'प': 'p',
  'फ': 'P',
  'ब': 'b',
  'भ': 'B',
  'म': 'm',
  'य': 'y',
  'र': 'r',
  'ल': 'l',
  'व': 'v',
  'श': 'sh',
  'ष': 'Sh',
  'स': 's',
  'ह': 'h',
  'ढ': 'dh',
  
  '।': '.',
  'ॐ': 'OM',
  
  'त्र': 'tr',
  'क्र': 'kr',
  'प्र': 'pr',
  
  // Add more mappings as needed
};

/**
 * Improved implementation to convert Shree Lipi text to Unicode text
 */
export function convertShreeLipiToUnicode(text: string): string {
  if (!text) return "";
  
  console.log("Converting from Shree Lipi to Unicode:", text);
  
  // Handle complex character combinations first
  let result = text;
  
  // Look for multi-character patterns first
  Object.keys(shreeLipiToUnicodeMap)
    .filter(key => key.length > 1)
    .sort((a, b) => b.length - a.length) // Process longer patterns first
    .forEach(key => {
      const regex = new RegExp(key, 'g');
      result = result.replace(regex, shreeLipiToUnicodeMap[key]);
    });
  
  // Then handle single characters
  let finalResult = '';
  for (let i = 0; i < result.length; i++) {
    const char = result[i];
    finalResult += shreeLipiToUnicodeMap[char] || char;
  }
  
  console.log("Conversion result:", finalResult);
  return finalResult;
}

/**
 * Improved implementation to convert Unicode text to Shree Lipi text
 */
export function convertUnicodeToShreelipi(text: string): string {
  if (!text) return "";
  
  console.log("Converting from Unicode to Shree Lipi:", text);
  
  // Handle complex character combinations first
  let result = text;
  
  // Look for multi-character patterns first
  Object.keys(unicodeToShreeLipiMap)
    .filter(key => key.length > 1)
    .sort((a, b) => b.length - a.length) // Process longer patterns first
    .forEach(key => {
      const regex = new RegExp(key, 'g');
      result = result.replace(regex, unicodeToShreeLipiMap[key]);
    });
  
  // Then handle single characters
  let finalResult = '';
  for (let i = 0; i < result.length; i++) {
    const char = result[i];
    finalResult += unicodeToShreeLipiMap[char] || char;
  }
  
  console.log("Conversion result:", finalResult);
  return finalResult;
}

/**
 * Improved font detection logic for more accurate results
 */
export function autoDetectFont(text: string): string | null {
  if (!text || text.length < 5) {
    return null;
  }
  
  // Check for Unicode character ranges
  const hasDevanagariUnicode = /[\u0900-\u097F]/.test(text);
  if (hasDevanagariUnicode) {
    return "unicode";
  }
  
  // Check for specific Krutidev patterns
  if (/kR/.test(text) || /js/.test(text) || /fd/.test(text) || /fn/.test(text)) {
    return "krutidev";
  }
  
  // Check for specific Shree Lipi patterns
  if (/AE/.test(text) || /BD/.test(text) || /Aa/.test(text) || /ee/.test(text)) {
    return "shreelipi";
  }
  
  // Check for Mangal specific patterns
  if (/k\^/.test(text) || /j\^/.test(text)) {
    return "mangal";
  }
  
  // Check for Devlys specific patterns
  if (/J_/.test(text) || /V_/.test(text)) {
    return "devlys";
  }
  
  // Default to null if unable to detect
  return null;
}

/**
 * Improved implementation to convert between any two supported fonts
 */
export function convertBetweenFonts(
  text: string, 
  sourceFont: string, 
  targetFont: string
): string {
  if (!text || sourceFont === targetFont) {
    return text;
  }
  
  console.log(`Converting from ${sourceFont} to ${targetFont}:`, text);
  
  try {
    // First convert to Unicode as an intermediary format
    let unicodeText = text;
    
    switch (sourceFont) {
      case "shreelipi":
        unicodeText = convertShreeLipiToUnicode(text);
        break;
      case "krutidev":
        // In a real implementation, you'd have a specific converter for Krutidev
        unicodeText = `Converted from krutidev to unicode: ${text}`;
        break;
      case "devlys":
        // In a real implementation, you'd have a specific converter for Devlys
        unicodeText = `Converted from devlys to unicode: ${text}`;
        break;
      case "mangal":
        // In a real implementation, you'd have a specific converter for Mangal
        unicodeText = `Converted from mangal to unicode: ${text}`;
        break;
      // Unicode is already unicode, so no conversion needed
    }
    
    // Then convert from Unicode to the target font
    let result = unicodeText;
    
    if (targetFont !== "unicode") {
      switch (targetFont) {
        case "shreelipi":
          result = convertUnicodeToShreelipi(unicodeText);
          break;
        case "krutidev":
          // In a real implementation, you'd have a specific converter from Unicode to Krutidev
          result = `Converted from unicode to krutidev: ${unicodeText}`;
          break;
        case "devlys":
          // In a real implementation, you'd have a specific converter from Unicode to Devlys
          result = `Converted from unicode to devlys: ${unicodeText}`;
          break;
        case "mangal":
          // In a real implementation, you'd have a specific converter from Unicode to Mangal
          result = `Converted from unicode to mangal: ${unicodeText}`;
          break;
      }
    }
    
    console.log("Final conversion result:", result);
    return result;
  } catch (error) {
    console.error("Error during conversion:", error);
    return `Error: Could not convert from ${sourceFont} to ${targetFont}`;
  }
}
