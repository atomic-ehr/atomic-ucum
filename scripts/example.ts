import { UCUMParser, UCUMConverter, UnitRegistry } from '../src';

// Initialize the parser and converter
const parser = new UCUMParser();
const converter = new UCUMConverter();
const registry = UnitRegistry.getInstance();

console.log('=== UCUM Example Usage ===\n');

// Example 1: Parse unit expressions
console.log('1. Parsing unit expressions:');
const parsed1 = parser.parse('mg/dL');
console.log('mg/dL:', JSON.stringify(parsed1, null, 2));

const parsed2 = parser.parse('km/h');
console.log('km/h:', JSON.stringify(parsed2, null, 2));

// Example 2: Convert between units
console.log('\n2. Converting between units:');
const result1 = converter.convert(100, 'mg/dL', 'g/L');
console.log(`100 mg/dL = ${result1.value} g/L`);

const result2 = converter.convert(60, 'km/h', 'm/s');
console.log(`60 km/h = ${result2.value} m/s`);

// Example 3: Temperature conversions
console.log('\n3. Temperature conversions:');
const tempResult1 = converter.convert(37, 'Cel', '[degF]');
console.log(`37 Cel = ${tempResult1.value} [degF]`);

const tempResult2 = converter.convert(98.6, '[degF]', 'Cel');
console.log(`98.6 [degF] = ${tempResult2.value} Cel`);

// Example 4: Check unit compatibility
console.log('\n4. Checking unit compatibility:');
try {
  const invalid = converter.convert(1, 'kg', 'm');
} catch (error) {
  console.log('kg to m:', error instanceof Error ? error.message : String(error));
}

// Example 5: Get units by property
console.log('\n5. Units by property:');
const lengthUnits = registry.getUnitsByProperty('length');
console.log(`Length units: ${lengthUnits.map((u: any) => u.code).slice(0, 5).join(', ')}...`);

const timeUnits = registry.getUnitsByProperty('time');
console.log(`Time units: ${timeUnits.map((u: any) => u.code).slice(0, 5).join(', ')}...`);

// Example 6: Complex unit expressions
console.log('\n6. Complex unit expressions:');
const complex1 = parser.parse('mL/min/1.73.m2');
console.log('mL/min/1.73.m2:', JSON.stringify(complex1, null, 2));

const complex2 = converter.convert(60, 'mL/min', 'L/h');
console.log(`60 mL/min = ${complex2.value} L/h`);

// Example 7: Working with prefixes
console.log('\n7. Working with prefixes:');
const kilo = registry.getPrefix('k');
console.log(`Kilo prefix: ${kilo?.code} = ${kilo?.value}`);

const milli = registry.getPrefix('m');
console.log(`Milli prefix: ${milli?.code} = ${milli?.value}`);

// Try parsing a prefixed unit
const prefixed = registry.tryPrefixedUnit('km');
if (prefixed) {
  console.log(`km = ${prefixed.prefix.code} (${prefixed.prefix.value}) + ${prefixed.unit.code} (${prefixed.unit.name})`);
}