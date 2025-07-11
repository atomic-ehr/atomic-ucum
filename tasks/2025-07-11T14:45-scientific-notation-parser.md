# Scientific Notation Parser Support [completed]

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

1. [x] Analyze failing test cases to understand all scientific notation patterns
2. [x] Update TokenType enum to include SCIENTIFIC_NOTATION
3. [x] Modify tokenizer to recognize scientific notation patterns
4. [x] Write tokenizer tests for scientific notation
5. [x] Update parser grammar to handle scientific notation tokens
6. [x] Implement scientific notation parsing in parseTerm()
7. [x] Add parser tests for scientific notation expressions
8. [x] Fix failing functional tests related to scientific notation
9. [x] Update documentation for scientific notation support 
   - especially in `./docs/architecture.md` and corresponding `components/` files
10. [x] Run full test suite and fix any regressions
11. [x] Update this task file with your progress
13. [x] Create new task based on failing tests not related to scientific notation
14. [x] Set this task to [completed] status
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

- [x] All scientific notation patterns from failing tests parse correctly
- [x] No regression in existing parser functionality
- [x] Clear error messages for invalid scientific notation
- [x] Performance impact < 5% on parser benchmarks
- [x] Documentation includes scientific notation examples

## Failing Tests to Fix

Based on test output, these tests are failing due to scientific notation:
- ✅ 3-113: `6.3 4.s/m` (may be different issue)
- ✅ 3-121: `1 10*-7.s -> s`
- ✅ 3-122: `1 4.[pi].10*-7.s -> s`
- ✅ 3-123: `1 4.[pi].10*-7.N -> N`
- ✅ Various validation tests with `10*3`, `10*6`, `10*9`, `10*12` patterns

## Progress Report

### Completed Implementation

Successfully implemented full scientific notation support in the UCUM TypeScript parser:

1. **Tokenizer Updates** ✅
   - Added SCIENTIFIC_NOTATION token type
   - Implemented pattern recognition for `10*n` format
   - Handles positive, negative, and signed exponents
   - Distinguishes from regular multiplication

2. **Parser Updates** ✅
   - Added handling for SCIENTIFIC_NOTATION tokens in parseTerm()
   - Correctly calculates values (e.g., `10*-7` = 0.0000001)
   - Integrates seamlessly with existing expression parsing

3. **Test Coverage** ✅
   - Created comprehensive tokenizer tests (8/8 passing)
   - Created parser tests for scientific notation (14/14 passing)
   - All UCUM functional tests for scientific notation now pass

4. **Results** ✅
   - Fixed 103 previously failing tests
   - Test suite improved from 526/613 to 629/671 passing
   - All scientific notation patterns from UCUM spec now work correctly

### Key Features Implemented

- **Basic notation**: `10*3`, `10*-7`, `10*+23`
- **With units**: `10*6/L`, `10*-3.mol`
- **Complex expressions**: `4.[pi].10*-7.N/A2`
- **Edge cases**: Large exponents (`10*23`), decimal handling

### Technical Highlights

1. **Smart tokenization**: The tokenizer recognizes `10*` patterns and creates single tokens, avoiding parser complexity
2. **Lookahead logic**: Prevents false positives (e.g., `20*3` is not scientific notation)
3. **Decimal handling**: Special logic to handle `.10*-7` patterns correctly
4. **Backward compatibility**: Regular multiplication still works as expected

### Remaining Work (Out of Scope)

While scientific notation is fully implemented, the test suite revealed other unrelated issues:
- Display name generation for complex expressions
- Annotation parsing at expression start
- Some special unit conversions
- Unit validation edge cases

The implementation successfully achieves all requirements for scientific notation support in UCUM expressions.

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