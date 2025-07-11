# UCUM TypeScript Implementation Architecture

## Overview

This document describes the architecture of the TypeScript UCUM (Unified Code for Units of Measure) implementation. The library provides a complete solution for parsing, validating, and converting units according to the UCUM specification.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         Public API Layer                         │
│                          (index.ts)                              │
├─────────────────────────────────────────────────────────────────┤
│  UCUMConverter │ UCUMParser │ UnitRegistry │ DisplayNameGen      │
├────────────────┴────────────┴──────────────┴───────────────────┤
│                       Core Components                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐    │
│  │  Converter  │  │   Parser    │  │   UnitRegistry      │    │
│  │             │  │             │  │   (Singleton)       │    │
│  └──────┬──────┘  └──────┬──────┘  └──────────┬──────────┘    │
│         │                 │                     │                │
│  ┌─────────────┐                                                │
│  │   Special   │  (Temperature, Logarithmic, Molecular)         │
│  │  Converter  │                                                │
│  └─────────────┘                                                │
├─────────┴─────────────────┴─────────────────────┴───────────────┤
│                    Infrastructure Layer                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐    │
│  │  Tokenizer  │  │  Dimension  │  │  UCUM Definitions   │    │
│  │             │  │  Analyzer   │  │  (Generated)        │    │
│  └─────────────┘  └─────────────┘  └─────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

## Directory Structure

```
src/
├── index.ts              # Main entry point and public API exports
├── types.ts              # TypeScript type definitions
├── converter.ts          # Unit conversion engine
├── special-converter.ts  # Special unit conversions (temperature, logarithmic, etc.)
├── unit-registry.ts      # Unit and prefix registry (singleton)
├── display-name.ts       # Human-readable name generator
├── parser.ts             # Re-export for parser module
├── parser/               # Parser implementation
│   ├── parser.ts         # Recursive descent parser
│   └── tokenizer.ts      # High-performance tokenizer
└── generated/            # Auto-generated from UCUM XML
    ├── dimension-analyzer.ts  # Dimension calculations
    └── ucum-definitions.ts    # UCUM unit definitions
```

## Core Components

### 1. UCUMParser (`parser/parser.ts`)

**Purpose**: Parses UCUM unit expressions into structured data

**Key Features**:
- Recursive descent parser implementation
- Expression caching with LRU eviction (1000 entries)
- Support for complete UCUM grammar
- Annotation preservation
- Base unit expansion

**Public API**:
```typescript
parse(expression: string): ParsedUnit
normalize(expression: string): string
```

### 2. UCUMConverter (`converter.ts`)

**Purpose**: Handles conversions between compatible units

**Key Features**:
- Regular unit conversions (magnitude-based)
- Special conversions via SpecialConverter
- Dimension compatibility validation
- Annotation handling
- Error handling for incompatible units

**Dependencies**:
- Uses SpecialConverter for non-linear conversions
- Integrates with UCUMParser for unit parsing
- Queries UnitRegistry for unit definitions

**Public API**:
```typescript
convert(value: number, from: string, to: string, options?: ConversionOptions): ConversionResult
canConvert(from: string, to: string): boolean
toBaseUnits(expression: string): ParsedUnit
```

### 3. SpecialConverter (`special-converter.ts`)

**Purpose**: Handles non-linear unit conversions that require special formulas

**Key Features**:
- Temperature conversions (Celsius, Fahrenheit, Kelvin, Réaumur)
- Logarithmic conversions (pH, Bel, Neper, Decibel)
- Molecular conversions (mol to mass, equivalents)
- Extensible architecture for adding new conversions
- Bidirectional conversion registration

**Special Conversions Supported**:
- Temperature: Cel ↔ K ↔ [degF] ↔ [degRe]
- pH: pH ↔ mol/L (hydrogen ion concentration)
- Logarithmic: B ↔ Np ↔ dB
- Molecular: mol ↔ g (requires molecular weight), mol ↔ eq (requires charge)

**Public API**:
```typescript
register(fromUnit: string, toUnit: string, converter: SpecialConversionFunction): void
canConvert(fromUnit: string, toUnit: string): boolean
convert(value: number, fromUnit: string, toUnit: string, options?: ConversionOptions): number | null
isSpecialUnit(unit: string): boolean
```

### 4. UnitRegistry (`unit-registry.ts`)

**Purpose**: Singleton registry for all UCUM units and prefixes

**Key Features**:
- Multiple lookup indices (case-sensitive/insensitive)
- Prefixed unit resolution
- O(1) lookup performance
- ~3MB memory footprint
- Thread-safe singleton pattern

**Public API**:
```typescript
getInstance(): UnitRegistry
getUnit(code: string, caseSensitive?: boolean): Unit | undefined
getPrefix(code: string, caseSensitive?: boolean): Prefix | undefined
isValidUnit(code: string): boolean
tryPrefixedUnit(code: string): { prefix: Prefix; unit: Unit } | undefined
```

### 5. UCUMDisplayNameGenerator (`display-name.ts`)

**Purpose**: Generates human-readable names for UCUM expressions

**Key Features**:
- Multi-layer generation strategy
- Special unit handling ([pi], [H2O], etc.)
- Exponent formatting (superscript)
- Fallback strategies for edge cases

**Public API**:
```typescript
generate(expression: string): string
```

### 5. Tokenizer (`parser/tokenizer.ts`)

**Purpose**: High-performance tokenization of UCUM expressions

**Key Features**:
- Character type lookup table for O(1) performance
- Token buffer pre-allocation
- Support for all UCUM operators and syntax
- Scientific notation handling

## Data Flow

### Parsing Flow
```
Input Expression → Tokenizer → Parser → ParsedUnit
                      ↓           ↓
                   Tokens    UnitRegistry
```

### Conversion Flow
```
convert(value, from, to)
    ↓
Parser.parse(from) → ParsedUnit
    ↓
Parser.parse(to) → ParsedUnit
    ↓
DimensionAnalyzer.areCompatible()
    ↓
Calculate conversion factor
    ↓
Apply special conversions if needed
    ↓
Return ConversionResult
```

## Key Design Decisions

### 1. Parser Architecture
- **Decision**: Custom recursive descent parser
- **Rationale**: Better error messages, full control, no external dependencies
- **Alternative considered**: Parser generators (too heavy for client-side)

### 2. Code Generation
- **Decision**: Generate definitions from UCUM XML
- **Rationale**: Single source of truth, easy updates, type safety
- **Implementation**: Custom scripts process ucum-essence.xml

### 3. Performance Optimizations
- **Expression caching**: LRU cache with 1000 entries
- **Token buffer reuse**: Pre-allocated buffers in tokenizer
- **Lookup tables**: O(1) character type checking
- **Singleton registry**: Shared instance across all components

### 4. Memory Management
- **Registry**: ~3MB for all units and prefixes
- **Cache**: Limited to 1000 entries to prevent memory leaks
- **Immutable data**: All unit definitions are read-only

## Integration Points

### With React Applications
```typescript
import { UCUMConverter } from '@atomicer/ucum';

const converter = new UCUMConverter();
const result = converter.convert(100, 'mg/dL', 'mmol/L');
```

### With Node.js Services
```typescript
import { UnitRegistry } from '@atomicer/ucum';

const registry = UnitRegistry.getInstance();
const isValid = registry.isValidUnit('mg/dL');
```

### With Web Workers
The library is designed to work in Web Workers for heavy calculations without blocking the UI thread.

## Error Handling

### Parser Errors
- Invalid syntax: Clear error messages with position
- Unknown units: Suggests similar units
- Malformed expressions: Detailed parsing errors

### Converter Errors
- Incompatible dimensions: Lists expected vs actual dimensions
- Special conversion failures: Specific error messages
- Overflow/underflow: Numeric range checking

## Future Architecture Considerations

### 1. Plugin System
- Allow custom unit definitions
- Support domain-specific conversions
- Extensible special conversions

### 2. Internationalization
- Localized display names
- Culture-specific formatting
- Multi-language error messages

### 3. Performance Enhancements
- WebAssembly for numeric operations
- Parallel conversion for batch operations
- Progressive parsing for large expressions

### 4. Module System
- Tree-shakeable exports
- Separate bundles for different use cases
- Dynamic loading of rarely used units

## Testing Architecture

### Unit Tests
- Component isolation
- Mock dependencies
- Edge case coverage

### Integration Tests
- Real UCUM test cases
- Cross-component workflows
- Performance benchmarks

### Functional Tests
- Official UCUM validation suite
- Medical use case scenarios
- Engineering calculations

## Build and Distribution

### Build Process
1. TypeScript compilation
2. Bundle generation (ESM and CJS)
3. Type definition generation
4. Minification for production

### Distribution Targets
- NPM package (@atomicer/ucum)
- CDN distribution
- Direct browser usage
- Node.js environments

## Security Considerations

### Input Validation
- Expression length limits
- Character whitelisting
- Injection prevention

### Resource Limits
- Cache size boundaries
- Computation timeouts
- Memory usage caps

## Performance Characteristics

### Time Complexity
- Parsing: O(n) where n is expression length
- Lookup: O(1) for unit registry
- Conversion: O(1) for simple units, O(n) for complex expressions

### Space Complexity
- Registry: ~3MB constant
- Cache: ~100KB for 1000 entries
- Parser: O(n) temporary allocation

## Conclusion

The architecture follows SOLID principles with clear separation of concerns, efficient resource usage, and extensibility for future enhancements. The modular design allows for easy testing, maintenance, and feature additions while maintaining high performance and accuracy.