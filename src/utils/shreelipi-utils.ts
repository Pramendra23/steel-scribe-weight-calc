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
  'dh': 'ध', // This is a duplicate key with 'D' above - both map to 'ध'
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
  'ध': 'D', // Fixed: removed the duplicate entry for 'ध'
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
  
  // Handle complex character combinations first
  // This is a simplified implementation - a real one would be more complex
  let result = text;
  
  // Look for multi-character patterns first
  Object.keys(shreeLipiToUnicodeMap).forEach(key => {
    if (key.length > 1) {
      const regex = new RegExp(key, 'g');
      result = result.replace(regex, shreeLipiToUnicodeMap[key]);
    }
  });
  
  // Then handle single characters
  let finalResult = '';
  for (let i = 0; i < result.length; i++) {
    const char = result[i];
    finalResult += shreeLipiToUnicodeMap[char] || char;
  }
  
  return finalResult;
}

/**
 * Improved implementation to convert Unicode text to Shree Lipi text
 */
export function convertUnicodeToShreelipi(text: string): string {
  if (!text) return "";
  
  // Handle complex character combinations first
  // This is a simplified implementation - a real one would be more complex
  let result = text;
  
  // Look for multi-character patterns first
  Object.keys(unicodeToShreeLipiMap).forEach(key => {
    if (key.length > 1) {
      const regex = new RegExp(key, 'g');
      result = result.replace(regex, unicodeToShreeLipiMap[key]);
    }
  });
  
  // Then handle single characters
  let finalResult = '';
  for (let i = 0; i < result.length; i++) {
    const char = result[i];
    finalResult += unicodeToShreeLipiMap[char] || char;
  }
  
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
    switch (targetFont) {
      case "shreelipi":
        return convertUnicodeToShreelipi(unicodeText);
      case "krutidev":
        // In a real implementation, you'd have a specific converter from Unicode to Krutidev
        return `Converted from unicode to krutidev: ${unicodeText}`;
      case "devlys":
        // In a real implementation, you'd have a specific converter from Unicode to Devlys
        return `Converted from unicode to devlys: ${unicodeText}`;
      case "mangal":
        // In a real implementation, you'd have a specific converter from Unicode to Mangal
        return `Converted from unicode to mangal: ${unicodeText}`;
      default:
        return unicodeText; // If target is unicode or unknown, return Unicode text
    }
  } catch (error) {
    console.error("Error during conversion:", error);
    return `Error: Could not convert from ${sourceFont} to ${targetFont}`;
  }
}
