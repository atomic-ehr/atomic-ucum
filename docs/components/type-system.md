# Type System Documentation

The UCUM implementation uses a comprehensive TypeScript type system to ensure type safety, provide excellent developer experience, and maintain consistency across all components.

## 📁 Files

- **`src/types.ts`** - Core type definitions and interfaces

## 🏗️ Type Architecture

### Core Types Overview

```typescript
// Fundamental dimensional representation
type DimensionVector = [number, number, number, number, number, number, number];

// Core data structures
interface Unit { /* Unit metadata */ }
interface Prefix { /* Metric prefix data */ }
interface ParsedUnit { /* Parser output */ }

// Operational interfaces
interface ConversionResult { /* Conversion output */ }
interface ConversionOptions { /* Conversion parameters */ }
```

## 📊 Core Type Definitions

### DimensionVector

Represents the 7 fundamental physical dimensions in UCUM:

```typescript
type DimensionVector = [number, number, number, number, number, number, number];

// Dimension indices:
// [0] Length (L)      - meter, foot, inch
// [1] Mass (M)        - gram, kilogram, pound
// [2] Time (T)        - second, minute, hour
// [3] Current (I)     - ampere, milliampere
// [4] Temperature (Θ) - kelvin, celsius
// [5] Amount (N)      - mole, kilomole
// [6] Luminosity (J)  - candela, lumen

// Examples:
const lengthDim: DimensionVector = [1, 0, 0, 0, 0, 0, 0];    // meter
const massDim: DimensionVector = [0, 1, 0, 0, 0, 0, 0];      // gram
const velocityDim: DimensionVector = [1, 0, -1, 0, 0, 0, 0]; // meter/second
const forceDim: DimensionVector = [1, 1, -2, 0, 0, 0, 0];    // Newton
```

### Unit Interface

Complete metadata for a UCUM unit:

```typescript
interface Unit {
  code: string;              // Case-sensitive UCUM code (e.g., "m", "kg", "N")
  codeUC: string;            // Case-insensitive code (e.g., "M", "KG", "N")
  name: string;              // Human-readable name (e.g., "meter", "kilogram")
  printSymbol?: string;      // Print representation (e.g., "m", "kg", "N")
  property: string;          // Physical property (e.g., "length", "mass", "force")
  dimension?: DimensionVector; // 7-element dimensional vector
  magnitude?: number;        // Conversion factor to base unit
  isBase: boolean;           // Is this a fundamental SI unit?
  isMetric: boolean;         // Can this unit accept metric prefixes?
  isSpecial: boolean;        // Requires special conversion function?
  isArbitrary?: boolean;     // Arbitrary/procedure-defined unit?
  value?: {                  // Value definition from UCUM XML
    unit: string;            // Base unit for conversion
    unitUC: string;          // Case-insensitive base unit
    value: number;           // Conversion factor
  };
}
```

#### Unit Examples

```typescript
// Base unit example
const meter: Unit = {
  code: "m",
  codeUC: "M",
  name: "meter",
  printSymbol: "m",
  property: "length",
  dimension: [1, 0, 0, 0, 0, 0, 0],
  magnitude: 1,
  isBase: true,
  isMetric: true,
  isSpecial: false
};

// Derived unit example
const newton: Unit = {
  code: "N",
  codeUC: "N",
  name: "newton",
  printSymbol: "N",
  property: "force",
  dimension: [1, 1, -2, 0, 0, 0, 0],
  magnitude: 1,
  isBase: false,
  isMetric: true,
  isSpecial: false,
  value: {
    unit: "kg.m.s-2",
    unitUC: "KG.M.S-2",
    value: 1
  }
};

// Special unit example
const celsius: Unit = {
  code: "Cel",
  codeUC: "CEL",
  name: "degree Celsius",
  printSymbol: "°C",
  property: "temperature",
  dimension: [0, 0, 0, 0, 1, 0, 0],
  magnitude: 1,
  isBase: false,
  isMetric: false,
  isSpecial: true,  // Requires special conversion function
  value: {
    unit: "K",
    unitUC: "K",
    value: 1
  }
};
```

### Prefix Interface

Metric prefix metadata:

```typescript
interface Prefix {
  code: string;              // Case-sensitive code (e.g., "k", "m", "μ")
  codeUC: string;            // Case-insensitive code (e.g., "K", "M", "U")
  name: string;              // Full name (e.g., "kilo", "milli", "micro")
  printSymbol: string;       // Print symbol (e.g., "k", "m", "μ")
  value: number;             // Multiplication factor (e.g., 1000, 0.001, 0.000001)
}
```

#### Prefix Examples

```typescript
const kilo: Prefix = {
  code: "k",
  codeUC: "K",
  name: "kilo",
  printSymbol: "k",
  value: 1000
};

const milli: Prefix = {
  code: "m",
  codeUC: "M",
  name: "milli",
  printSymbol: "m",
  value: 0.001
};

const micro: Prefix = {
  code: "μ",
  codeUC: "U",
  name: "micro",
  printSymbol: "μ",
  value: 0.000001
};
```

### ParsedUnit Interface

Structured representation of a parsed UCUM expression:

```typescript
interface ParsedUnit {
  value: number;               // Numeric coefficient (default: 1)
  units: Record<string, number>; // Map of unit codes to exponents
  annotations?: string[];      // Preserved annotation text
}
```

#### ParsedUnit Examples

```typescript
// Simple unit: "m"
const meterParsed: ParsedUnit = {
  value: 1,
  units: { "m": 1 }
};

// Complex expression: "kg.m.s-2"
const newtonParsed: ParsedUnit = {
  value: 1,
  units: { "kg": 1, "m": 1, "s": -2 }
};

// With coefficient: "4.5.J"
const energyParsed: ParsedUnit = {
  value: 4.5,
  units: { "J": 1 }
};

// With annotations: "m{length}/s{time}"
const velocityParsed: ParsedUnit = {
  value: 1,
  units: { "m": 1, "s": -1 },
  annotations: ["length", "time"]
};
```

## 🔄 Operational Types

### ConversionResult Interface

Output from conversion operations:

```typescript
interface ConversionResult {
  value: number;               // Converted numeric value
  fromUnit: string;            // Original unit expression
  toUnit: string;              // Target unit expression  
  annotations?: string[];      // Preserved annotations
}
```

### ConversionOptions Interface

Parameters for advanced conversions:

```typescript
interface ConversionOptions {
  molecularWeight?: number;    // For mol-mass conversions (g/mol)
  charge?: number;             // For equivalent conversions
  temperature?: number;        // For temperature-dependent conversions
  precision?: number;          // Decimal places for result
}
```

#### ConversionOptions Examples

```typescript
// Mol to mass conversion (glucose: C6H12O6 = 180 g/mol)
const molToGramOptions: ConversionOptions = {
  molecularWeight: 180
};

// Equivalent to mole conversion (Ca²⁺ has charge +2)
const eqToMolOptions: ConversionOptions = {
  charge: 2
};

// Temperature-dependent conversion
const tempOptions: ConversionOptions = {
  temperature: 298.15  // 25°C in Kelvin
};
```

## 🛡️ Type Guards and Utilities

### Type Guard Functions

```typescript
// Type guards for runtime type checking
function isValidDimensionVector(dim: any): dim is DimensionVector {
  return Array.isArray(dim) && 
         dim.length === 7 && 
         dim.every(n => typeof n === 'number');
}

function isBaseUnit(unit: Unit): boolean {
  return unit.isBase === true;
}

function isSpecialUnit(unit: Unit): boolean {
  return unit.isSpecial === true;
}

function isMetricUnit(unit: Unit): boolean {
  return unit.isMetric === true;
}

function hasAnnotations(parsed: ParsedUnit): boolean {
  return parsed.annotations !== undefined && parsed.annotations.length > 0;
}
```

### Utility Types

```typescript
// Derived utility types
type UnitCode = string;                    // UCUM unit code
type PrefixCode = string;                  // UCUM prefix code
type UnitProperty = string;                // Physical property name
type ExponentMap = Record<UnitCode, number>; // Unit to exponent mapping

// Union types for specific categories
type BaseUnitCode = 'm' | 'g' | 's' | 'A' | 'K' | 'mol' | 'cd';
type CommonPrefixCode = 'k' | 'm' | 'μ' | 'n' | 'p';
type TemperatureUnit = 'K' | 'Cel' | '[degF]' | '[degRe]';

// Physical property categories
type PhysicalProperty = 
  | 'length' | 'mass' | 'time' | 'electric current'
  | 'thermodynamic temperature' | 'amount of substance' 
  | 'luminous intensity' | 'force' | 'energy' | 'power'
  | 'pressure' | 'frequency' | 'electric charge';
```

## 🔧 Type Composition Examples

### Complex Type Usage

```typescript
// Function signatures using the type system
function parseExpression(expression: string): ParsedUnit;

function convertUnits(
  value: number, 
  from: UnitCode, 
  to: UnitCode, 
  options?: ConversionOptions
): ConversionResult;

function getUnitsByProperty(property: PhysicalProperty): Unit[];

function calculateDimension(parsed: ParsedUnit): DimensionVector;

function areCompatible(
  dim1: DimensionVector, 
  dim2: DimensionVector
): boolean;
```

### Advanced Type Patterns

```typescript
// Generic type for unit operations
interface UnitOperation<T> {
  operand1: ParsedUnit;
  operand2: ParsedUnit;
  operator: '*' | '/' | '^';
  result: T;
}

// Type for unit validation results
interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  suggestions: UnitCode[];
}

// Type for registry queries
interface RegistryQuery {
  pattern?: string;
  property?: PhysicalProperty;
  dimension?: DimensionVector;
  isMetric?: boolean;
  isSpecial?: boolean;
}
```

## 📱 Integration Examples

### With React Components

```typescript
import { Unit, ParsedUnit, ConversionResult } from '@atomic-ehr/ucum';

interface UnitDisplayProps {
  unit: Unit;
  showDetails?: boolean;
}

const UnitDisplay: React.FC<UnitDisplayProps> = ({ unit, showDetails }) => {
  return (
    <div>
      <span className="unit-code">{unit.code}</span>
      <span className="unit-name">({unit.name})</span>
      {showDetails && (
        <div className="unit-details">
          <p>Property: {unit.property}</p>
          <p>Metric: {unit.isMetric ? 'Yes' : 'No'}</p>
          <p>Base: {unit.isBase ? 'Yes' : 'No'}</p>
        </div>
      )}
    </div>
  );
};
```

### With API Endpoints

```typescript
import { ConversionOptions, ConversionResult } from '@atomic-ehr/ucum';

// API request/response types
interface ConversionRequest {
  value: number;
  fromUnit: string;
  toUnit: string;
  options?: ConversionOptions;
}

interface ConversionResponse {
  success: boolean;
  result?: ConversionResult;
  error?: string;
}

// Bun.serve handler with proper typing
const conversionHandler = async (req: Request): Promise<Response> => {
  const data: ConversionRequest = await req.json();
  
  try {
    const result = converter.convert(
      data.value, 
      data.fromUnit, 
      data.toUnit, 
      data.options
    );
    
    const response: ConversionResponse = {
      success: true,
      result: {
        value: result,
        fromUnit: data.fromUnit,
        toUnit: data.toUnit
      }
    };
    
    return new Response(JSON.stringify(response));
  } catch (error) {
    const response: ConversionResponse = {
      success: false,
      error: error.message
    };
    
    return new Response(JSON.stringify(response), { status: 400 });
  }
};
```

## 🧪 Type Testing

### Type-Level Tests

```typescript
// Compile-time type checking tests
type AssertEqual<T, U> = T extends U ? U extends T ? true : false : false;
type AssertTrue<T extends true> = T;

// Test dimension vector type
type TestDimensionVector = AssertTrue<
  AssertEqual<DimensionVector, [number, number, number, number, number, number, number]>
>;

// Test unit property type
type TestUnit = AssertTrue<
  AssertEqual<Unit['property'], string>
>;

// Test parsed unit structure
type TestParsedUnit = AssertTrue<
  AssertEqual<ParsedUnit['units'], Record<string, number>>
>;
```

### Runtime Type Validation

```typescript
import { Unit, Prefix, ParsedUnit } from '@atomic-ehr/ucum';

function validateUnit(unit: any): unit is Unit {
  return (
    typeof unit === 'object' &&
    typeof unit.code === 'string' &&
    typeof unit.name === 'string' &&
    typeof unit.property === 'string' &&
    typeof unit.isBase === 'boolean' &&
    typeof unit.isMetric === 'boolean' &&
    typeof unit.isSpecial === 'boolean'
  );
}

function validateParsedUnit(parsed: any): parsed is ParsedUnit {
  return (
    typeof parsed === 'object' &&
    typeof parsed.value === 'number' &&
    typeof parsed.units === 'object' &&
    Object.values(parsed.units).every(exp => typeof exp === 'number')
  );
}
```

## 🚀 Best Practices

### Type Safety Guidelines

1. **Always Use Interfaces**: Define interfaces for all data structures
2. **Leverage Union Types**: Use unions for restricted string values  
3. **Type Guards**: Implement runtime type checking for external data
4. **Generic Functions**: Use generics for reusable type-safe functions
5. **Strict Null Checks**: Handle undefined/null cases explicitly

### Performance Considerations

1. **Minimal Runtime Overhead**: Types are compile-time only
2. **Tree Shaking**: Unused type definitions are eliminated
3. **Type Inference**: Let TypeScript infer types when possible
4. **Readonly Modifiers**: Use readonly for immutable data

### Code Organization

```typescript
// types.ts - Core type definitions
export interface Unit { /* ... */ }
export interface Prefix { /* ... */ }
export type DimensionVector = [number, number, number, number, number, number, number];

// unit-registry.ts - Implementation with types
import { Unit, Prefix } from './types';
export class UnitRegistry {
  getUnit(code: string): Unit | null { /* ... */ }
}

// parser.ts - Parser with typed output
import { ParsedUnit } from './types';
export class UCUMParser {
  parse(expression: string): ParsedUnit { /* ... */ }
}
```

## 📚 References

- **[TypeScript Handbook](https://www.typescriptlang.org/docs/)** - TypeScript language reference
- **[Interface Design](https://www.typescriptlang.org/docs/handbook/2/objects.html)** - Object type definitions
- **[Type Guards](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)** - Runtime type checking
- **[Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)** - Built-in type utilities
- **[Generated Types](../src/generated/ucum-definitions.ts)** - Auto-generated unit types