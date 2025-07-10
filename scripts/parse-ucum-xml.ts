import { XMLParser } from 'fast-xml-parser';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

interface UcumPrefix {
  code: string;
  codeUC: string;
  name: string;
  printSymbol: string;
  value: number;
}

interface UcumUnit {
  code: string;
  codeUC: string;
  name: string;
  printSymbol?: string;
  property: string;
  isMetric: boolean;
  isSpecial?: boolean;
  class: string;
  value: {
    unit: string;
    unitUC: string;
    value: number;
    text?: string;
  };
  dimension?: string;
}

interface ParsedUcumData {
  prefixes: UcumPrefix[];
  baseUnits: UcumUnit[];
  derivedUnits: UcumUnit[];
  specialUnits: UcumUnit[];
}

function parseUcumXML(xmlPath: string): ParsedUcumData {
  const xmlContent = readFileSync(xmlPath, 'utf-8');
  
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '',
    textNodeName: 'text',
    parseAttributeValue: true,
    trimValues: true
  });
  
  const parsed = parser.parse(xmlContent);
  const root = parsed.root;
  
  const prefixes: UcumPrefix[] = [];
  const baseUnits: UcumUnit[] = [];
  const derivedUnits: UcumUnit[] = [];
  const specialUnits: UcumUnit[] = [];
  
  // Parse prefixes
  if (root.prefix) {
    const prefixArray = Array.isArray(root.prefix) ? root.prefix : [root.prefix];
    prefixArray.forEach((prefix: any) => {
      prefixes.push({
        code: String(prefix.Code || ''),
        codeUC: String(prefix.CODE || ''),
        name: String(prefix.name || ''),
        printSymbol: String(prefix.printSymbol || ''),
        value: parseFloat(prefix.value.value)
      });
    });
  }
  
  // Parse base units
  if (root['base-unit']) {
    const baseUnitArray = Array.isArray(root['base-unit']) ? root['base-unit'] : [root['base-unit']];
    baseUnitArray.forEach((unit: any) => {
      const unitData: UcumUnit = {
        code: String(unit.Code || ''),
        codeUC: String(unit.CODE || ''),
        name: String(unit.name || ''),
        printSymbol: unit.printSymbol ? String(unit.printSymbol) : undefined,
        property: String(unit.property || ''),
        isMetric: true, // base units are metric
        isSpecial: false,
        class: 'si',
        value: {
          unit: '',
          unitUC: '',
          value: 1
        },
        dimension: unit.dim // Store dimension attribute
      };
      baseUnits.push(unitData);
    });
  }
  
  // Parse derived units
  if (root.unit) {
    const unitArray = Array.isArray(root.unit) ? root.unit : [root.unit];
    unitArray.forEach((unit: any) => {
      const unitData: UcumUnit = {
        code: String(unit.Code || ''),
        codeUC: String(unit.CODE || ''),
        name: String(unit.name || ''),
        printSymbol: unit.printSymbol ? String(unit.printSymbol) : undefined,
        property: String(unit.property || ''),
        isMetric: unit.isMetric === 'yes',
        isSpecial: unit.isSpecial === 'yes',
        class: String(unit.class || ''),
        value: {
          unit: String(unit.value?.Unit || ''),
          unitUC: String(unit.value?.UNIT || ''),
          value: unit.value?.value ? parseFloat(unit.value.value) : 1,
          text: unit.value?.text ? String(unit.value.text) : undefined
        }
      };
      
      // Categorize units
      if (unit.isSpecial === 'yes') {
        specialUnits.push(unitData);
      } else if (unit.class === 'si' && !unit.value?.Unit) {
        baseUnits.push(unitData);
      } else {
        derivedUnits.push(unitData);
      }
    });
  }
  
  return { prefixes, baseUnits, derivedUnits, specialUnits };
}

function escapeString(str: string | undefined | any): string {
  if (!str || typeof str !== 'string') return '';
  return str.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function generateTypeScriptDefinitions(data: ParsedUcumData): string {
  const lines: string[] = [];
  
  lines.push('// Generated from UCUM essence XML');
  lines.push('// DO NOT EDIT MANUALLY - This file is auto-generated');
  lines.push('');
  
  // Generate prefix constants
  lines.push('export const UCUM_PREFIXES = {');
  data.prefixes.forEach(prefix => {
    lines.push(`  '${escapeString(prefix.code)}': {`);
    lines.push(`    code: '${escapeString(prefix.code)}',`);
    lines.push(`    codeUC: '${escapeString(prefix.codeUC)}',`);
    lines.push(`    name: '${escapeString(prefix.name)}',`);
    lines.push(`    printSymbol: '${escapeString(prefix.printSymbol)}',`);
    lines.push(`    value: ${prefix.value}`);
    lines.push('  },');
  });
  lines.push('} as const;');
  lines.push('');
  
  // Generate base units
  lines.push('export const UCUM_BASE_UNITS = {');
  data.baseUnits.forEach(unit => {
    lines.push(`  '${escapeString(unit.code)}': {`);
    lines.push(`    code: '${escapeString(unit.code)}',`);
    lines.push(`    codeUC: '${escapeString(unit.codeUC)}',`);
    lines.push(`    name: '${escapeString(unit.name)}',`);
    if (unit.printSymbol) {
      lines.push(`    printSymbol: '${escapeString(unit.printSymbol)}',`);
    }
    lines.push(`    property: '${escapeString(unit.property)}',`);
    lines.push(`    isMetric: ${unit.isMetric},`);
    lines.push(`    class: '${escapeString(unit.class)}'`);
    lines.push('  },');
  });
  lines.push('} as const;');
  lines.push('');
  
  // Generate derived units
  lines.push('export const UCUM_DERIVED_UNITS = {');
  data.derivedUnits.forEach(unit => {
    lines.push(`  '${escapeString(unit.code)}': {`);
    lines.push(`    code: '${escapeString(unit.code)}',`);
    lines.push(`    codeUC: '${escapeString(unit.codeUC)}',`);
    lines.push(`    name: '${escapeString(unit.name)}',`);
    if (unit.printSymbol) {
      lines.push(`    printSymbol: '${escapeString(unit.printSymbol)}',`);
    }
    lines.push(`    property: '${escapeString(unit.property)}',`);
    lines.push(`    isMetric: ${unit.isMetric},`);
    lines.push(`    class: '${escapeString(unit.class)}',`);
    lines.push('    value: {');
    lines.push(`      unit: '${escapeString(unit.value.unit)}',`);
    lines.push(`      unitUC: '${escapeString(unit.value.unitUC)}',`);
    lines.push(`      value: ${unit.value.value}`);
    lines.push('    }');
    lines.push('  },');
  });
  lines.push('} as const;');
  lines.push('');
  
  // Generate special units
  lines.push('export const UCUM_SPECIAL_UNITS = {');
  data.specialUnits.forEach(unit => {
    lines.push(`  '${escapeString(unit.code)}': {`);
    lines.push(`    code: '${escapeString(unit.code)}',`);
    lines.push(`    codeUC: '${escapeString(unit.codeUC)}',`);
    lines.push(`    name: '${escapeString(unit.name)}',`);
    if (unit.printSymbol) {
      lines.push(`    printSymbol: '${escapeString(unit.printSymbol)}',`);
    }
    lines.push(`    property: '${escapeString(unit.property)}',`);
    lines.push(`    isMetric: ${unit.isMetric},`);
    lines.push(`    isSpecial: true,`);
    lines.push(`    class: '${escapeString(unit.class)}',`);
    lines.push('    value: {');
    lines.push(`      unit: '${escapeString(unit.value.unit)}',`);
    lines.push(`      unitUC: '${escapeString(unit.value.unitUC)}',`);
    lines.push(`      value: ${unit.value.value}`);
    if (unit.value.text) {
      lines.push(`      // ${unit.value.text}`);
    }
    lines.push('    }');
    lines.push('  },');
  });
  lines.push('} as const;');
  lines.push('');
  
  // Generate dimension mapping
  lines.push('// Dimension vectors: [length, mass, time, current, temperature, substance, luminosity]');
  lines.push('export const DIMENSION_MAP: Record<string, number[]> = {');
  lines.push("  // Base units");
  lines.push("  'm': [1, 0, 0, 0, 0, 0, 0],  // meter");
  lines.push("  'g': [0, 1, 0, 0, 0, 0, 0],  // gram");
  lines.push("  's': [0, 0, 1, 0, 0, 0, 0],  // second");
  lines.push("  'A': [0, 0, 0, 1, 0, 0, 0],  // ampere");
  lines.push("  'K': [0, 0, 0, 0, 1, 0, 0],  // kelvin");
  lines.push("  'mol': [0, 0, 0, 0, 0, 1, 0],  // mole");
  lines.push("  'cd': [0, 0, 0, 0, 0, 0, 1],  // candela");
  lines.push('};');
  
  return lines.join('\n');
}

// Main execution
const xmlPath = join(__dirname, '..', 'ucum-lhc', 'data', 'ucum-essence.xml');
const outputPath = join(__dirname, '..', 'src', 'generated', 'ucum-definitions.ts');

console.log('Parsing UCUM XML...');
const data = parseUcumXML(xmlPath);

console.log(`Found ${data.prefixes.length} prefixes`);
console.log(`Found ${data.baseUnits.length} base units`);
console.log(`Found ${data.derivedUnits.length} derived units`);
console.log(`Found ${data.specialUnits.length} special units`);

const tsContent = generateTypeScriptDefinitions(data);

// Create generated directory
import { mkdirSync } from 'fs';
mkdirSync(join(__dirname, '..', 'src', 'generated'), { recursive: true });

writeFileSync(outputPath, tsContent);
console.log(`Generated TypeScript definitions at ${outputPath}`);