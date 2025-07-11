# Scientific Notation Parser Support [pending]

## Overview

Implement support for parsing scientific notation in UCUM expressions. Currently, the parser fails on expressions like "10*-7", "4.[pi].10*-7", and similar scientific notation patterns that are valid in UCUM.

## Background

The UCUM specification allows scientific notation in unit expressions using the format `10*n` or `10*-n` where n is an integer. This is commonly used for:
- Physical constants (e.g., `[mu_0]` = `4.[pi].10*-7.N/A2`)
- Very large or small quantities (e.g., `10*6/L` for cells per liter)
- Prefix-like notation without actual prefixes

Current parser errors show it's failing to handle the `*` operator after numbers in these contexts.

## Requirements

### 1. Parse Scientific Notation
- Support `10*n` format (e.g., `10*6`)
- Support `10*-n` format (e.g., `10*-7`)
- Support within complex expressions (e.g., `4.[pi].10*-7.N`)
- Maintain backward compatibility with regular multiplication

### 2. Tokenizer Updates
- Recognize `10*` as a special pattern
- Handle negative exponents after `*`
- Distinguish from regular multiplication operator

### 3. Parser Updates
- Add grammar rules for scientific notation
- Integrate with existing expression parsing
- Proper precedence handling

## Technical Design

### Tokenizer Changes

1. **Add Scientific Notation Token Type**
   ```typescript
   enum TokenType {
     // ... existing types
     SCIENTIFIC_NOTATION = 'SCIENTIFIC_NOTATION'
   }
   ```

2. **Pattern Recognition**
   - Look for pattern: `10*` followed by optional `-` and digits
   - Create single token for the entire scientific notation

3. **Token Value**
   - Store the exponent value in the token
   - Calculate the actual multiplier (e.g., 10^6 = 1000000)

### Parser Changes

1. **Update parseTerm()**
   - Handle SCIENTIFIC_NOTATION tokens
   - Apply the multiplier to the current value

2. **Grammar Extension**
   ```
   term := unit | number | scientific_notation | '(' expression ')'
   scientific_notation := '10*' ['-'] digit+
   ```

3. **Value Calculation**
   - Convert scientific notation to actual numeric value
   - Multiply with other terms appropriately

## Implementation Steps

1. [ ] Analyze failing test cases to understand all scientific notation patterns
2. [ ] Update TokenType enum to include SCIENTIFIC_NOTATION
3. [ ] Modify tokenizer to recognize scientific notation patterns
4. [ ] Write tokenizer tests for scientific notation
5. [ ] Update parser grammar to handle scientific notation tokens
6. [ ] Implement scientific notation parsing in parseTerm()
7. [ ] Add parser tests for scientific notation expressions
8. [ ] Fix failing functional tests related to scientific notation
9. [ ] Update documentation for scientific notation support 
   - especially in `./docs/architecture.md` and corresponding `components/` files
10. [ ] Run full test suite and fix any regressions
11. [ ] Update this task file with your progress
13. [ ] Create new task based on failing tests not related to scientific notation
14. [ ] Set this task to [completed] status
15. [ ] Commit and push changes to github

## Test Cases

### Basic Scientific Notation
```typescript
// Positive exponents
expect(parser.parse('10*3')).toEqual({ value: 1000, units: {} });
expect(parser.parse('10*6')).toEqual({ value: 1000000, units: {} });

// Negative exponents
expect(parser.parse('10*-3')).toEqual({ value: 0.001, units: {} });
expect(parser.parse('10*-7')).toEqual({ value: 0.0000001, units: {} });
```

### Scientific Notation in Expressions
```typescript
// With units
expect(parser.parse('10*3.L')).toEqual({ value: 1000, units: { 'L': 1 } });
expect(parser.parse('10*6/L')).toEqual({ value: 1000000, units: { 'L': -1 } });

// Complex expressions
expect(parser.parse('4.[pi].10*-7.N/A2')).toEqual({
  value: 4 * Math.PI * 0.0000001,
  units: { 'N': 1, 'A': -2 }
});
```

### Edge Cases
```typescript
// Multiple scientific notations
expect(parser.parse('10*3.10*-2')).toEqual({ value: 10, units: {} });

// Scientific notation with prefixes
expect(parser.parse('k10*3')).toThrow(); // Should this be valid?

// Parentheses
expect(parser.parse('(10*3).m')).toEqual({ value: 1000, units: { 'm': 1 } });
```

## Success Criteria

- [ ] All scientific notation patterns from failing tests parse correctly
- [ ] No regression in existing parser functionality
- [ ] Clear error messages for invalid scientific notation
- [ ] Performance impact < 5% on parser benchmarks
- [ ] Documentation includes scientific notation examples

## Failing Tests to Fix

Based on test output, these tests are failing due to scientific notation:
- 3-113: `6.3 4.s/m` (may be different issue)
- 3-121: `1 10*-7.s -> s`
- 3-122: `1 4.[pi].10*-7.s -> s`
- 3-123: `1 4.[pi].10*-7.N -> N`
- Various validation tests with `10*3`, `10*6`, `10*9`, `10*12` patterns

## Notes

- Check UCUM specification section on numeric values
- Consider if we need to support other bases (e.g., `2*3` for 2^3)
- Ensure compatibility with UCUM reference implementation
- May need to handle scientific notation in display name generation

## References

- UCUM Specification: https://ucum.org/ucum#section-Syntax
- Current parser implementation: src/parser/parser.ts
- Tokenizer: src/parser/tokenizer.ts
- Failing tests: test/generated/conversion-functional.test.ts

Update this file with your progress.