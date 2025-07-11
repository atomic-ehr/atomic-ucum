# Special Unit Conversions Implementation [pending]

## Overview

Implement special unit conversions to handle temperature, logarithmic, and arbitrary units. This is the #1 priority feature blocking 87 tests and required for UCUM compliance.

## Background

Special units in UCUM are marked with `isSpecial="yes"` in the XML and require custom conversion logic beyond simple multiplication by a factor. The current implementation only handles regular linear conversions.

## Requirements

### 1. Temperature Conversions
Implement bidirectional conversions between:
- Celsius (Cel) ↔ Fahrenheit ([degF])
- Celsius (Cel) ↔ Kelvin (K)
- Fahrenheit ([degF]) ↔ Kelvin (K)

Formulas:
- °C to °F: `F = C × 9/5 + 32`
- °C to K: `K = C + 273.15`
- °F to K: `K = (F - 32) × 5/9 + 273.15`

### 2. Logarithmic Units
Implement conversions for:
- pH (pH) - negative log base 10 of molar concentration
- Bel (B) - logarithmic ratio
- Neper (Np) - natural logarithmic ratio

### 3. Arbitrary Units
Handle special cases like:
- Molar mass conversions (g/mol relationships)
- Equivalents (chemical equivalents)
- Osmoles and related units

## Technical Design

### Architecture Changes

1. **Create SpecialConverter class**
   ```typescript
   class SpecialConverter {
     private converters: Map<string, SpecialConversionFunction>;
     
     register(fromUnit: string, toUnit: string, converter: SpecialConversionFunction): void;
     canConvert(from: string, to: string): boolean;
     convert(value: number, from: string, to: string): number;
   }
   ```

2. **Modify UCUMConverter**
   - Check for special conversions before regular conversions
   - Integrate SpecialConverter into conversion pipeline
   - Handle edge cases and error conditions

3. **Add conversion functions**
   - Temperature conversion functions
   - Logarithmic conversion functions
   - Arbitrary unit handlers

### Implementation Steps

1. [ ] Create `src/special-converter.ts` with SpecialConverter class
2. [ ] Define SpecialConversionFunction type in `types.ts`
3. [ ] Implement temperature conversion functions
4. [ ] Implement logarithmic conversion functions
5. [ ] Register special conversions in converter initialization
6. [ ] Update UCUMConverter to use SpecialConverter
7. [ ] Add comprehensive unit tests
8. [ ] Fix failing functional tests
9. [ ] Update documentation

## Test Cases

### Temperature Tests
```typescript
// Celsius to Fahrenheit
expect(converter.convert(0, 'Cel', '[degF]')).toBe(32);
expect(converter.convert(100, 'Cel', '[degF]')).toBe(212);
expect(converter.convert(37, 'Cel', '[degF]')).toBeCloseTo(98.6);

// Fahrenheit to Celsius
expect(converter.convert(32, '[degF]', 'Cel')).toBe(0);
expect(converter.convert(212, '[degF]', 'Cel')).toBe(100);

// Kelvin conversions
expect(converter.convert(0, 'Cel', 'K')).toBe(273.15);
expect(converter.convert(273.15, 'K', 'Cel')).toBe(0);
```

### Edge Cases
- Negative temperatures
- Very large/small values
- Chained conversions
- Units with prefixes (e.g., mCel)

## Success Criteria

- [ ] All 87 failing tests now pass
- [ ] Temperature conversions accurate to 6 decimal places
- [ ] Logarithmic conversions working correctly
- [ ] No regression in existing tests
- [ ] Performance impact < 10% for regular conversions
- [ ] Clear documentation and examples

## Estimated Time

- Implementation: 3-4 days
- Testing: 2-3 days
- Documentation: 1 day
- Total: ~1 week

## Notes

- Check ucum-essence.xml for complete list of special units
- Review UCUM specification section on special units
- Consider future extensibility for custom special conversions
- Ensure proper error handling for invalid conversions

## References

- UCUM Special Units: https://ucum.org/ucum#section-Special-Units
- Temperature conversion formulas: Standard physics references
- Logarithmic units: UCUM specification appendix