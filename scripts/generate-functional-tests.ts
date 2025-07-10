import { parseArgs } from "util";
import { XMLParser } from "fast-xml-parser";

interface ValidationCase {
  id: string;
  unit: string;
  valid: boolean;
  reason?: string;
}

interface DisplayNameCase {
  id: string;
  unit: string;
  display: string;
}

interface ConversionCase {
  id: string;
  value: string;
  srcUnit: string;
  dstUnit: string;
  outcome: string;
}

interface MultiplicationCase {
  id: string;
  v1: string;
  u1: string;
  v2: string;
  u2: string;
  vRes: string;
  uRes: string;
}

interface UcumTests {
  ucumTests: {
    validation: {
      case: Array<any>;
    };
    displayNameGeneration?: {
      case: Array<any>;
    };
    conversion?: {
      case: Array<any>;
    };
    multiplication?: {
      case: Array<any>;
    };
  };
}

function escapeString(str: string): string {
  return str
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\n/g, "\\n")
    .replace(/\r/g, "\\r")
    .replace(/\t/g, "\\t");
}

function generateValidationTests(cases: ValidationCase[]): string {
  const validCases = cases.filter(c => c.valid);
  const invalidCases = cases.filter(c => !c.valid);
  
  let output = `import { test, expect, describe, beforeEach } from "bun:test";
import { UCUMParser } from "../../parser";

describe("UCUM Functional Tests - Validation", () => {
  let parser: UCUMParser;

  beforeEach(() => {
    parser = new UCUMParser();
  });

  test("should create parser instance", () => {
    expect(parser).toBeDefined();
  });

  describe("valid units", () => {
`;

  // Group valid cases for better organization
  for (const testCase of validCases) {
    output += `    test("${testCase.id}: should parse '${escapeString(testCase.unit)}'", () => {\n`;
    output += `      expect(() => parser.parse("${escapeString(testCase.unit)}")).not.toThrow();\n`;
    output += `    });\n\n`;
  }

  output += `  });

  describe("invalid units", () => {
`;

  for (const testCase of invalidCases) {
    const reason = testCase.reason ? ` - ${testCase.reason}` : "";
    output += `    test("${testCase.id}: should reject '${escapeString(testCase.unit)}'${reason}", () => {\n`;
    output += `      expect(() => parser.parse("${escapeString(testCase.unit)}")).toThrow();\n`;
    output += `    });\n\n`;
  }

  output += `  });
});
`;

  return output;
}

function generateDisplayNameTests(cases: DisplayNameCase[]): string {
  let output = `import { test, expect, describe, beforeEach } from "bun:test";
import { UCUMDisplayNameGenerator } from "../../display-name";

describe("UCUM Functional Tests - Display Name Generation", () => {
  let generator: UCUMDisplayNameGenerator;

  beforeEach(() => {
    generator = new UCUMDisplayNameGenerator();
  });

  test("should create display name generator instance", () => {
    expect(generator).toBeDefined();
  });

  describe("display name generation", () => {
`;

  for (const testCase of cases) {
    output += `    test("${testCase.id}: should generate display name for '${escapeString(testCase.unit)}'", () => {\n`;
    output += `      const result = generator.generate("${escapeString(testCase.unit)}");\n`;
    output += `      expect(result).toBe("${escapeString(testCase.display)}");\n`;
    output += `    });\n\n`;
  }

  output += `  });
});
`;

  return output;
}

function generateConversionTests(cases: ConversionCase[]): string {
  let output = `import { test, expect, describe, beforeEach } from "bun:test";
import { UCUMConverter } from "../../converter";

describe("UCUM Functional Tests - Conversion", () => {
  let converter: UCUMConverter;

  beforeEach(() => {
    converter = new UCUMConverter();
  });

  test("should create converter instance", () => {
    expect(converter).toBeDefined();
  });

  describe("unit conversions", () => {
`;

  for (const testCase of cases) {
    const outcomeStr = String(testCase.outcome);
    const expectedValue = parseFloat(outcomeStr);
    const precision = outcomeStr.includes("e") || outcomeStr.includes("E") 
      ? 15 // High precision for scientific notation
      : outcomeStr.split(".")[1]?.length || 0; // Use decimal places from expected outcome
    
    output += `    test("${testCase.id}: ${testCase.value} ${escapeString(testCase.srcUnit)} -> ${escapeString(testCase.dstUnit)}", () => {\n`;
    output += `      const result = converter.convert(${testCase.value}, "${escapeString(testCase.srcUnit)}", "${escapeString(testCase.dstUnit)}");\n`;
    output += `      expect(result.value).toBeCloseTo(${expectedValue}, ${precision});\n`;
    output += `    });\n\n`;
  }

  output += `  });
});
`;

  return output;
}

function generateMultiplicationTests(cases: MultiplicationCase[]): string {
  let output = `import { test, expect, describe, beforeEach } from "bun:test";
import { UCUMCalculator } from "../../calculator";

describe("UCUM Functional Tests - Multiplication", () => {
  let calculator: UCUMCalculator;

  beforeEach(() => {
    calculator = new UCUMCalculator();
  });

  test("should create calculator instance", () => {
    expect(calculator).toBeDefined();
  });

  describe("unit multiplication", () => {
`;

  for (const testCase of cases) {
    output += `    test("${testCase.id}: ${testCase.v1} ${escapeString(testCase.u1)} * ${testCase.v2} ${escapeString(testCase.u2)}", () => {\n`;
    output += `      const result = calculator.multiply(\n`;
    output += `        { value: ${testCase.v1}, unit: "${escapeString(testCase.u1)}" },\n`;
    output += `        { value: ${testCase.v2}, unit: "${escapeString(testCase.u2)}" }\n`;
    output += `      );\n`;
    output += `      // Result should be canonically equal to ${testCase.vRes} ${escapeString(testCase.uRes)}\n`;
    output += `      const expected = calculator.parse("${escapeString(testCase.uRes)}");\n`;
    output += `      expect(result.value).toBeCloseTo(${testCase.vRes}, 10);\n`;
    output += `      expect(calculator.areEquivalent(result.unit, "${escapeString(testCase.uRes)}")).toBe(true);\n`;
    output += `    });\n\n`;
  }

  output += `  });
});
`;

  return output;
}

async function main() {
  const { values } = parseArgs({
    args: Bun.argv,
    options: {
      input: {
        type: 'string',
        short: 'i',
        default: './ucum.js/vendor/ucum-functional-tests.xml'
      },
      output: {
        type: 'string', 
        short: 'o',
        default: './src/test/generated'
      }
    },
    strict: true,
    allowPositionals: true
  });

  const inputPath = values.input!;
  const outputDir = values.output!;

  console.log(`Reading UCUM functional tests from: ${inputPath}`);
  
  const xmlContent = await Bun.file(inputPath).text();
  
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "",
    parseAttributeValue: true
  });
  
  const result = parser.parse(xmlContent) as UcumTests;
  
  // Process validation cases
  if (result.ucumTests.validation?.case) {
    const validationCases: ValidationCase[] = result.ucumTests.validation.case.map(c => ({
      id: c.id,
      unit: c.unit,
      valid: c.valid === "true" || c.valid === true,
      reason: c.reason
    }));
    
    console.log(`Found ${validationCases.length} validation test cases`);
    const validationTests = generateValidationTests(validationCases);
    await Bun.write(`${outputDir}/validation.test.ts`, validationTests);
    console.log(`Generated ${outputDir}/validation.test.ts`);
  }
  
  // Process display name cases
  if (result.ucumTests.displayNameGeneration?.case) {
    const displayNameCases: DisplayNameCase[] = result.ucumTests.displayNameGeneration.case.map(c => ({
      id: c.id,
      unit: c.unit,
      display: c.display
    }));
    
    console.log(`Found ${displayNameCases.length} display name test cases`);
    const displayNameTests = generateDisplayNameTests(displayNameCases);
    await Bun.write(`${outputDir}/display-name.test.ts`, displayNameTests);
    console.log(`Generated ${outputDir}/display-name.test.ts`);
  }
  
  // Process conversion cases
  if (result.ucumTests.conversion?.case) {
    const conversionCases: ConversionCase[] = result.ucumTests.conversion.case.map(c => ({
      id: c.id,
      value: c.value,
      srcUnit: c.srcUnit,
      dstUnit: c.dstUnit,
      outcome: c.outcome
    }));
    
    console.log(`Found ${conversionCases.length} conversion test cases`);
    const conversionTests = generateConversionTests(conversionCases);
    await Bun.write(`${outputDir}/conversion-functional.test.ts`, conversionTests);
    console.log(`Generated ${outputDir}/conversion-functional.test.ts`);
  }
  
  // Process multiplication cases
  if (result.ucumTests.multiplication?.case) {
    const multiplicationCases: MultiplicationCase[] = result.ucumTests.multiplication.case.map(c => ({
      id: c.id,
      v1: c.v1,
      u1: c.u1,
      v2: c.v2,
      u2: c.u2,
      vRes: c.vRes,
      uRes: c.uRes
    }));
    
    console.log(`Found ${multiplicationCases.length} multiplication test cases`);
    const multiplicationTests = generateMultiplicationTests(multiplicationCases);
    await Bun.write(`${outputDir}/multiplication.test.ts`, multiplicationTests);
    console.log(`Generated ${outputDir}/multiplication.test.ts`);
  }
  
  console.log("\nTest generation complete!");
}

main().catch(console.error);