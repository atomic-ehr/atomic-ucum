# API Usage Guide

Complete reference for using the UCUM TypeScript implementation with practical examples and common patterns.

## 🚀 Quick Start

### Installation

```bash
# Install dependencies
bun install

# Generate UCUM definitions
bun run generate

# Run tests
bun test
```

### Basic Import

```typescript
import { 
  UCUMParser, 
  UCUMConverter, 
  UnitRegistry, 
  UCUMDisplayNameGenerator 
} from '@atomic-ehr/ucum';
```

## 🔍 Core APIs

### Parser API

#### Basic Parsing

```typescript
import { UCUMParser } from '@atomic-ehr/ucum';

const parser = new UCUMParser();

// Simple units
const meter = parser.parse('m');
console.log(meter);
// { value: 1, units: { 'm': 1 } }

// Complex expressions
const force = parser.parse('kg.m.s-2');
console.log(force);
// { value: 1, units: { 'kg': 1, 'm': 1, 's': -2 } }

// With coefficients
const energy = parser.parse('4.5.J');
console.log(energy);
// { value: 4.5, units: { 'J': 1 } }
```

#### Advanced Parsing

```typescript
// Parenthetical expressions
const acceleration = parser.parse('m/(s.s)');
console.log(acceleration);
// { value: 1, units: { 'm': 1, 's': -2 } }

// Scientific notation
const avogadro = parser.parse('6.022.10*23');
console.log(avogadro);
// { value: 6.022, units: { '10*23': 1 } }

// With annotations
const velocity = parser.parse('m{distance}/s{time}');
console.log(velocity);
// { value: 1, units: { 'm': 1, 's': -1 }, annotations: ['distance', 'time'] }
```

#### Error Handling

```typescript
function safeParse(expression: string) {
  try {
    return parser.parse(expression);
  } catch (error) {
    console.error(`Parse error: ${error.message}`);
    return null;
  }
}

// Valid expression
const valid = safeParse('kg.m.s-2');  // Returns ParsedUnit

// Invalid expression
const invalid = safeParse('kg..m');   // Returns null, logs error
```

### Unit Registry API

#### Basic Lookups

```typescript
import { UnitRegistry } from '@atomic-ehr/ucum';

const registry = UnitRegistry.getInstance();

// Get unit information
const meter = registry.getUnit('m');
console.log(meter?.name);          // "meter"
console.log(meter?.property);      // "length"
console.log(meter?.isMetric);      // true

// Get prefix information
const kilo = registry.getPrefix('k');
console.log(kilo?.name);           // "kilo"
console.log(kilo?.value);          // 1000
```

#### Validation

```typescript
// Check if units exist
console.log(registry.isValidUnit('m'));     // true
console.log(registry.isValidUnit('xyz'));   // false

// Check prefix compatibility
console.log(registry.canHavePrefix('m'));   // true (meter)
console.log(registry.canHavePrefix('K'));   // false (Kelvin)

// Case-insensitive lookups
const newton = registry.getUnit('N', false);
const newtonCI = registry.getUnit('n', false);
console.log(newton === newtonCI);  // true
```

#### Advanced Queries

```typescript
// Find units by property
const lengthUnits = registry.getUnitByProperty('length');
console.log(lengthUnits.map(u => u.code));
// ['m', 'ft', 'in', 'yd', 'mi', ...]

// Find units by dimension
const forceDimension = [1, 1, -2, 0, 0, 0, 0]; // Length × Mass × Time⁻²
const forceUnits = registry.getUnitsByDimension(forceDimension);
console.log(forceUnits.map(u => u.code));
// ['N', 'dyn', 'lbf', ...]

// Get dimensional vector
const newtonDim = registry.getDimension('N');
console.log(newtonDim);
// [1, 1, -2, 0, 0, 0, 0]
```

### Converter API

#### Basic Conversions

```typescript
import { UCUMConverter } from '@atomic-ehr/ucum';

const converter = new UCUMConverter();

// Simple unit conversions
const kilometers = converter.convert(1000, 'm', 'km');
console.log(kilometers);  // 1

const grams = converter.convert(1, 'kg', 'g');
console.log(grams);       // 1000

const hours = converter.convert(3600, 's', 'h');
console.log(hours);       // 1
```

#### Complex Conversions

```typescript
// Velocity conversions
const kmh = converter.convert(1, 'm/s', 'km/h');
console.log(kmh);         // 3.6

// Energy conversions
const joules = converter.convert(1, 'cal', 'J');
console.log(joules);      // 4.184

// Force conversions
const newtons = converter.convert(1, 'kg.m.s-2', 'N');
console.log(newtons);     // 1 (same unit)
```

#### Compatibility Checking

```typescript
// Check if units are compatible
console.log(converter.areCompatible('m', 'ft'));        // true
console.log(converter.areCompatible('kg', 'lb'));       // true
console.log(converter.areCompatible('m', 'kg'));        // false

// Safe conversion with validation
function safeConvert(value: number, from: string, to: string): number | null {
  if (!converter.areCompatible(from, to)) {
    console.warn(`Cannot convert ${from} to ${to}: incompatible dimensions`);
    return null;
  }
  
  try {
    return converter.convert(value, from, to);
  } catch (error) {
    console.error(`Conversion error: ${error.message}`);
    return null;
  }
}
```

#### Base Unit Conversion

```typescript
// Convert to base units
const parsed = parser.parse('N.m');
const baseUnits = converter.toBaseUnits(parsed);
console.log(baseUnits);
// { value: 1, units: { 'kg': 1, 'm': 2, 's': -2 } }
```

### Display Name Generator API

#### Basic Display Names

```typescript
import { UCUMDisplayNameGenerator } from '@atomic-ehr/ucum';

const generator = new UCUMDisplayNameGenerator();

// Simple units
console.log(generator.generate('m'));          // "(meter)"
console.log(generator.generate('kg'));         // "(kilogram)"
console.log(generator.generate('s'));          // "(second)"

// Complex expressions
console.log(generator.generate('m/s'));        // "(meter) / (second)"
console.log(generator.generate('kg.m.s-2'));   // "(kilogram) * (meter) * (second ^ -2)"
```

#### Special Cases

```typescript
// Empty expression
console.log(generator.generate(''));           // "(unity)"

// Prefixed units
console.log(generator.generate('mm'));         // "(millimeter)"
console.log(generator.generate('kW'));         // "(kilowatt)"

// Special numbers
console.log(generator.generate('10*23'));      // "(the number ten for arbitrary powers ^ 23)"
console.log(generator.generate('[pi]'));       // "(the number pi)"

// Annotated units
console.log(generator.generate('m[H2O]'));     // "(meter of water column)"
```

## 🏥 Medical Use Cases

### Laboratory Values

```typescript
// Blood glucose conversion
const glucose_mgdL = 100;  // mg/dL
const glucose_mmolL = converter.convert(glucose_mgdL, 'mg/dL', 'mmol/L');
// Note: Requires molecular weight for accurate conversion

// Blood pressure units
const pressure_mmHg = 120;  // mmHg
const pressure_kPa = converter.convert(pressure_mmHg, 'mm[Hg]', 'kPa');

// Medication dosing
const dose_mg = 500;  // milligrams
const dose_g = converter.convert(dose_mg, 'mg', 'g');  // 0.5
```

### Drug Concentrations

```typescript
// Convert between concentration units
const concentration_mgL = 50;  // mg/L
const concentration_mgdL = converter.convert(concentration_mgL, 'mg/L', 'mg/dL');

// Volume conversions for dosing
const volume_mL = 5;  // milliliters
const volume_L = converter.convert(volume_mL, 'mL', 'L');  // 0.005

// Display for UI
const doseDisplay = generator.generate('mg/kg');  // "(milligram) / (kilogram)"
```

### Physiological Measurements

```typescript
// Heart rate and frequency
const heartRate_bpm = 72;  // beats per minute
const heartRate_Hz = converter.convert(heartRate_bpm, '/min', 'Hz');

// Body temperature
// Note: Temperature conversions require special handling
const temp_C = 37;  // Celsius
// const temp_F = converter.convert(temp_C, 'Cel', '[degF]');  // Future feature

// Blood flow rates
const flow_mLmin = 250;  // mL/min
const flow_Ls = converter.convert(flow_mLmin, 'mL/min', 'L/s');
```

## 🔧 Engineering Use Cases

### Mechanical Engineering

```typescript
// Force and pressure calculations
const force_lbf = 100;  // pound-force
const force_N = converter.convert(force_lbf, 'lbf', 'N');

const pressure_psi = 30;  // pounds per square inch
const pressure_Pa = converter.convert(pressure_psi, 'psi', 'Pa');

// Energy and power
const energy_BTU = 1000;  // British Thermal Units
const energy_J = converter.convert(energy_BTU, 'BTU', 'J');

const power_hp = 10;  // horsepower
const power_W = converter.convert(power_hp, 'hp', 'W');
```

### Electrical Engineering

```typescript
// Electrical units
const voltage_V = 120;  // volts
const voltage_kV = converter.convert(voltage_V, 'V', 'kV');  // 0.12

const current_A = 15;  // amperes
const current_mA = converter.convert(current_A, 'A', 'mA');  // 15000

const resistance_ohm = 1000;  // ohms
const resistance_kohm = converter.convert(resistance_ohm, 'Ω', 'kΩ');

// Power calculations
const power_W = voltage_V * current_A;  // 1800 watts
const power_kW = converter.convert(power_W, 'W', 'kW');  // 1.8
```

### Fluid Dynamics

```typescript
// Flow rates
const flow_gpm = 100;  // gallons per minute
const flow_Ls = converter.convert(flow_gpm, 'gal/min', 'L/s');

// Viscosity units
const viscosity_cp = 1;  // centipoise
const viscosity_Pas = converter.convert(viscosity_cp, 'cP', 'Pa.s');

// Density conversions
const density_lbft3 = 62.4;  // lb/ft³
const density_kgm3 = converter.convert(density_lbft3, 'lb/ft3', 'kg/m3');
```

## 🧪 Scientific Applications

### Chemistry

```typescript
// Concentration units
const molarity = 0.1;  // mol/L
const molarity_mmolL = converter.convert(molarity, 'mol/L', 'mmol/L');  // 100

// Gas law calculations
const pressure_atm = 1;  // atmospheres
const pressure_Pa = converter.convert(pressure_atm, 'atm', 'Pa');  // 101325

const volume_L = 22.4;  // liters (STP molar volume)
const volume_m3 = converter.convert(volume_L, 'L', 'm3');  // 0.0224
```

### Physics

```typescript
// Fundamental constants and units
const lightSpeed = 299792458;  // m/s
const lightSpeed_kmh = converter.convert(lightSpeed, 'm/s', 'km/h');

// Energy scales
const eV = 1;  // electron volt
const eV_J = converter.convert(eV, 'eV', 'J');

// Wavelength and frequency
const wavelength_nm = 500;  // nanometers
const wavelength_m = converter.convert(wavelength_nm, 'nm', 'm');
```

## 🔄 Batch Operations

### Processing Arrays

```typescript
function convertArray(
  values: number[], 
  fromUnit: string, 
  toUnit: string
): number[] {
  return values.map(value => converter.convert(value, fromUnit, toUnit));
}

// Temperature array (hypothetical - requires special conversion)
const temperaturesC = [0, 25, 37, 100];
// const temperaturesF = convertArray(temperaturesC, 'Cel', '[degF]');

// Pressure array
const pressures_mmHg = [80, 120, 140, 160];
const pressures_kPa = convertArray(pressures_mmHg, 'mm[Hg]', 'kPa');
```

### Unit Validation

```typescript
function validateUnits(units: string[]): { valid: string[], invalid: string[] } {
  const registry = UnitRegistry.getInstance();
  const valid: string[] = [];
  const invalid: string[] = [];
  
  units.forEach(unit => {
    if (registry.isValidUnit(unit)) {
      valid.push(unit);
    } else {
      invalid.push(unit);
    }
  });
  
  return { valid, invalid };
}

const testUnits = ['m', 'kg', 'xyz', 's', 'invalid'];
const result = validateUnits(testUnits);
console.log(result);
// { valid: ['m', 'kg', 's'], invalid: ['xyz', 'invalid'] }
```

## 🌐 Web Integration

### REST API Endpoints

```typescript
// Bun.serve integration
import { UCUMConverter, UCUMDisplayNameGenerator } from '@atomic-ehr/ucum';

const converter = new UCUMConverter();
const generator = new UCUMDisplayNameGenerator();

Bun.serve({
  routes: {
    "/api/convert": {
      POST: async (req) => {
        const { value, fromUnit, toUnit } = await req.json();
        
        try {
          const result = converter.convert(value, fromUnit, toUnit);
          return new Response(JSON.stringify({ 
            success: true, 
            value: result 
          }));
        } catch (error) {
          return new Response(JSON.stringify({ 
            success: false, 
            error: error.message 
          }), { status: 400 });
        }
      }
    },
    
    "/api/display": {
      POST: async (req) => {
        const { expression } = await req.json();
        
        try {
          const displayName = generator.generate(expression);
          return new Response(JSON.stringify({ 
            success: true, 
            displayName 
          }));
        } catch (error) {
          return new Response(JSON.stringify({ 
            success: false, 
            error: error.message 
          }), { status: 400 });
        }
      }
    }
  }
});
```

### Frontend Integration

```typescript
// React component example
import React, { useState } from 'react';
import { UCUMConverter, UCUMDisplayNameGenerator } from '@atomic-ehr/ucum';

const UnitConverter: React.FC = () => {
  const [value, setValue] = useState<number>(1);
  const [fromUnit, setFromUnit] = useState<string>('m');
  const [toUnit, setToUnit] = useState<string>('ft');
  const [result, setResult] = useState<number | null>(null);
  
  const converter = new UCUMConverter();
  const generator = new UCUMDisplayNameGenerator();
  
  const handleConvert = () => {
    try {
      const converted = converter.convert(value, fromUnit, toUnit);
      setResult(converted);
    } catch (error) {
      console.error('Conversion error:', error);
      setResult(null);
    }
  };
  
  return (
    <div>
      <input 
        type="number" 
        value={value} 
        onChange={(e) => setValue(Number(e.target.value))} 
      />
      <input 
        type="text" 
        value={fromUnit} 
        onChange={(e) => setFromUnit(e.target.value)}
        placeholder="From unit (e.g., m)" 
      />
      <input 
        type="text" 
        value={toUnit} 
        onChange={(e) => setToUnit(e.target.value)}
        placeholder="To unit (e.g., ft)" 
      />
      <button onClick={handleConvert}>Convert</button>
      
      {result !== null && (
        <div>
          <p>{value} {generator.generate(fromUnit)} = {result} {generator.generate(toUnit)}</p>
        </div>
      )}
    </div>
  );
};
```

## 📊 Performance Optimization

### Efficient Usage Patterns

```typescript
// Reuse instances
const parser = new UCUMParser();  // Create once, reuse
const converter = new UCUMConverter();  // Create once, reuse
const registry = UnitRegistry.getInstance();  // Singleton

// Batch parsing with caching
const expressions = ['m/s', 'kg.m.s-2', 'J', 'W'];
const parsed = expressions.map(expr => parser.parse(expr));  // Cache hits after first

// Pre-validate units
function efficientConvert(value: number, from: string, to: string): number {
  // Fast path: check compatibility first
  if (!converter.areCompatible(from, to)) {
    throw new Error('Incompatible units');
  }
  
  return converter.convert(value, from, to);
}
```

### Memory Management

```typescript
// For large datasets, consider streaming
function* convertStream(
  values: Iterable<number>, 
  fromUnit: string, 
  toUnit: string
): Generator<number> {
  for (const value of values) {
    yield converter.convert(value, fromUnit, toUnit);
  }
}

// Usage with large array
const largeArray = new Array(10000).fill(0).map((_, i) => i);
const converted = Array.from(convertStream(largeArray, 'm', 'ft'));
```

## 📚 References

- **[Component Documentation](./README.md)** - Overview of all components
- **[Parser Documentation](./parser.md)** - Detailed parser API
- **[Converter Documentation](./converter.md)** - Conversion engine API
- **[Type System](./type-system.md)** - TypeScript interfaces
- **[Official UCUM](https://ucum.org/)** - UCUM specification website