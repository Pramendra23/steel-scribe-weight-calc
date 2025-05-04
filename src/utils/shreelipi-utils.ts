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
  
  // Additional common mappings for better conversion
  'kh': 'ख',
  'gh': 'घ',
  'ch': 'च',
  'jh': 'झ',
  'Th': 'ठ',
  'Dh': 'ढ',
  'ph': 'फ',
  'bh': 'भ',
  
  // Matras (vowel signs)
  'a': 'ा',  // aa matra
  'i': 'ि',  // i matra
  'ee': 'ी',  // ii matra
  'u': 'ु',  // u matra
  'oo': 'ू',  // uu matra
  'R': 'ृ',  // ri matra
  'e': 'े',  // e matra
  'ai': 'ै',  // ai matra
  'o': 'ो',  // o matra
  'au': 'ौ',  // au matra
  
  // Halfforms
  'k-': 'क्',
  'g-': 'ग्',
  'ch-': 'च्',
  'j-': 'ज्',
  't-': 'त्',
  'd-': 'द्',
  'n-': 'न्',
  'p-': 'प्',
  'b-': 'ब्',
  'm-': 'म्',
  'y-': 'य्',
  'r-': 'र्',
  'l-': 'ल्',
  'v-': 'व्',
  's-': 'स्',
  'h-': 'ह्',
  
  // Numbers
  '0': '०',
  '1': '१',
  '2': '२',
  '3': '३',
  '4': '४',
  '5': '५',
  '6': '६',
  '7': '७',
  '8': '८',
  '9': '९',
};

// Create the reverse mapping for Unicode to Shree Lipi conversion
const unicodeToShreeLipiMap: Record<string, string> = {};
Object.entries(shreeLipiToUnicodeMap).forEach(([key, value]) => {
  unicodeToShreeLipiMap[value] = key;
});

/**
 * Improved implementation to convert Shree Lipi text to Unicode text
 */
export function convertShreeLipiToUnicode(text: string): string {
  if (!text) return "";
  
  console.log("Converting from Shree Lipi to Unicode:", text);
  
  // First handle multi-character patterns
  let result = text;
  
  // Sort keys by length (longest first) to ensure longer patterns are matched before shorter ones
  const sortedKeys = Object.keys(shreeLipiToUnicodeMap)
    .filter(key => key.length > 1)
    .sort((a, b) => b.length - a.length);
  
  // Replace multi-character patterns
  for (const key of sortedKeys) {
    const regex = new RegExp(key, 'g');
    result = result.replace(regex, shreeLipiToUnicodeMap[key]);
  }
  
  // Then handle single character replacements
  let finalResult = '';
  for (let i = 0; i < result.length; i++) {
    const char = result[i];
    // If we have a mapping for this character, use it; otherwise keep the original
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
  
  // Handle multi-character patterns first
  let result = text;
  
  // Sort keys by length (longest first) for Unicode to Shree Lipi
  const sortedKeys = Object.keys(unicodeToShreeLipiMap)
    .filter(key => key.length > 1)
    .sort((a, b) => b.length - a.length);
  
  // Replace multi-character patterns
  for (const key of sortedKeys) {
    const regex = new RegExp(key, 'g');
    result = result.replace(regex, unicodeToShreeLipiMap[key]);
  }
  
  // Then handle single character replacements
  let finalResult = '';
  for (let i = 0; i < result.length; i++) {
    const char = result[i];
    // If we have a mapping for this character, use it; otherwise keep the original
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
  
  // Default to shreelipi if unable to detect but there are common patterns
  if (/[A-Z][a-z]/.test(text) || /[a-z]{2,}/.test(text)) {
    return "shreelipi";
  }
  
  // Default to null if really unable to detect
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
    
    switch (sourceFont.toLowerCase()) {
      case "shreelipi":
        unicodeText = convertShreeLipiToUnicode(text);
        break;
      case "krutidev":
        // For now just pass through since we don't have a specific implementation
        console.log("Krutidev to Unicode conversion not fully implemented yet");
        break;
      case "devlys":
        console.log("Devlys to Unicode conversion not fully implemented yet");
        break;
      case "mangal":
        console.log("Mangal to Unicode conversion not fully implemented yet");
        break;
      // Unicode is already unicode, so no conversion needed
    }
    
    // Then convert from Unicode to the target font
    let result = unicodeText;
    
    if (targetFont.toLowerCase() !== "unicode") {
      switch (targetFont.toLowerCase()) {
        case "shreelipi":
          result = convertUnicodeToShreelipi(unicodeText);
          break;
        case "krutidev":
          console.log("Unicode to Krutidev conversion not fully implemented yet");
          break;
        case "devlys":
          console.log("Unicode to Devlys conversion not fully implemented yet");
          break;
        case "mangal":
          console.log("Unicode to Mangal conversion not fully implemented yet");
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
