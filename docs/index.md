# UCUM TypeScript Documentation

Welcome to the UCUM TypeScript implementation documentation. This library provides a complete solution for parsing, validating, and converting units according to the UCUM (Unified Code for Units of Measure) specification.

## Documentation Structure

### 📚 [Overview](./README.md)
Main documentation with quick start guide and project status.

### 🏗️ [Architecture](./architecture.md)
System design, component relationships, and technical decisions.

### 📖 Guides
- [UCUM Overview](./guides/UCUM-OVERVIEW.md) - Introduction to UCUM standard

### 🔧 Components
Detailed documentation for each core component:
- [Parser](./components/parser.md) - UCUM expression parser
- [Converter](./components/converter.md) - Unit conversion engine
- [Unit Registry](./components/unit-registry.md) - Unit and prefix registry
- [Display Name Generator](./components/display-name-generator.md) - Human-readable names
- [Type System](./components/type-system.md) - TypeScript type definitions

### 📋 Reference
- [API Usage Guide](./reference/api-usage.md) - Complete API reference with examples

### 🛠️ Development
- [Design Document](./development/DESIGN.md) - Implementation details and status
- [Testing Guide](./development/testing.md) - Test suite and coverage
- [Research Notes](./RESEARCH.md) - Gap analysis and findings

## Quick Links

- **Current Status**: 70% complete, 526/613 tests passing
- **Main Issues**: Special conversions (temperature, pH), 217 missing units
- **Next Steps**: See [Roadmap](./roadmap.md) (to be created)

## Project Structure

```
ucum-typescript/
├── src/                 # Source code
├── test/               # Test files  
├── docs/               # This documentation
├── refs/ucum/          # UCUM specification
├── scripts/            # Build and utility scripts
└── tmp/                # Temporary files
```

## Getting Started

```typescript
import { UCUMConverter } from '@atomicer/ucum';

const converter = new UCUMConverter();
const result = converter.convert(100, 'mg/dL', 'mmol/L');
console.log(result.value); // 5.551
```

For more examples and detailed usage, see the [API Usage Guide](./reference/api-usage.md).