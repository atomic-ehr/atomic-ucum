import { UCUMDisplayNameGenerator } from '../src/display-name';

// Let me manually test the regex and logic
const expression = "4.[pi].10*-7.N/A2";

console.log("Testing expression:", expression);

// Test the regex that should match
const complexMatch = expression.match(/^(\d+)\.(\[[\w]+\])\.(\d+\*-?\d+)\.([A-Z]+)\/([A-Z]+)(\d*)$/);
console.log("Regex match:", complexMatch);

if (complexMatch) {
  const [, leadingNum, bracket, powerExpr, numeratorUnit, denominatorUnit, denomExponent] = complexMatch;
  
  console.log("Parts:", {
    leadingNum,
    bracket,
    powerExpr,
    numeratorUnit,
    denominatorUnit,
    denomExponent
  });
  
  const parts: string[] = [];
  parts.push(leadingNum);
  
  // Handle [pi] or other bracketed expressions
  if (bracket === '[pi]') {
    parts.push('(the number pi)');
  }
  
  // Handle 10*-7 style expressions
  const powerParts = powerExpr.split('*');
  if (powerParts[0] === '10') {
    parts.push(`(the number ten for arbitrary powers ^ ${powerParts[1]})`);
  }
  
  // Handle units
  const numDisplayName = numeratorUnit; // Using simple name for now
  parts.push(`(Newton)`); // Using Newton for N
  
  // Handle denominator with exponent
  const denomDisplayName = denominatorUnit;
  const finalExponent = denomExponent || '2';
  
  const result = `${parts.join(' * ')} / (Amp&#232;re ^ ${finalExponent})`;
  console.log("Expected result:", result);
}

const generator = new UCUMDisplayNameGenerator();

// Test if the parser can parse this expression
const parser = (generator as any).parser;
try {
  const parsed = parser.parse(expression);
  console.log("Parser succeeded with:", JSON.stringify(parsed, null, 2));
} catch (error) {
  console.log("Parser failed with:", error.message);
}

// Test generateSimple directly
const simpleResult = (generator as any).generateSimple(expression);
console.log("generateSimple result:", simpleResult);

console.log("Actual result:", generator.generate(expression));

// Test specific unit lookups
console.log("N unit lookup:", (generator as any).getUnitDisplayName('N'));
console.log("A unit lookup:", (generator as any).getUnitDisplayName('A'));