# Parser Edge Cases and Invalid Unit Validation [pending]

## Overview

After implementing scientific notation support, several edge cases remain in the parser and unit validation. This task addresses the remaining 41 failing tests that are not related to scientific notation.

## Categories of Failing Tests

### 1. Annotation Parsing Issues (2 tests)
- `{a}.rad2{b}` - Annotation at start of expression
- Parser expects a unit or number, not an annotation as the first token

### 2. Invalid Unit Validation (35 tests)
Many tests expect certain patterns to be rejected but are currently parsed:
- Number followed by unit without operator: `12h`, `48h`, `4h`
- Invalid unit codes: `kg[H20]` (should be `kg[H2O]`)
- Invalid annotation content: `rad2{錠}` (non-ASCII)
- Invalid syntax: `{|}1`, `{a}rad2{b}` (missing operator)

### 3. Special Unit Conversions (3 tests)
- `[mu_0]` permeability of vacuum conversion
- `m[Hg]` mercury column conversion
- `[ly]` light-year conversion

### 4. Display Name Generation (1 test)
- Complex expression `4.[pi].10*-7.N/A2` needs proper tokenization support

## Technical Analysis

### Parser Issues

1. **Leading annotations**: The parser's `parseExpression` doesn't handle annotations as the first token
2. **Number-unit parsing**: When parsing "5m", the parser consumes "5" as a standalone number
3. **Validation logic**: Need stricter validation for:
   - Unit codes (only valid characters)
   - Annotation content (UTF-8 restrictions)
   - Syntax rules (operators between terms)

### Implementation Strategy

1. **Fix annotation parsing**:
   - Update `parseExpression` to handle leading annotations
   - Ensure annotations can appear anywhere in valid positions

2. **Improve number-unit handling**:
   - Tokenizer should recognize patterns like "12h" differently
   - Parser should validate that units after numbers need operators

3. **Add validation layer**:
   - Create validation rules for unit syntax
   - Check annotation content for valid characters
   - Validate operator placement

## Test Groups to Fix

### Group 1: Annotation at Start
```
1-116: '{a}.rad2{b}' - should parse
1-116a: '{a}rad2{b}' - should reject (missing operator)
```

### Group 2: Invalid Time Units
```
1-263: 'g/12h' - should reject
1-264: 'g/48h' - should reject  
1-265: 'g/4h' - should reject
1-266: 'g/6h' - should reject
...
```

### Group 3: Special Characters
```
1-115a: 'rad2{錠}' - should reject (non-ASCII in annotation)
1-118: '{|}1' - should reject (invalid annotation)
k=1=010: 'cm[H20]' - should reject (H20 vs H2O)
```

## Success Criteria

- [ ] All 41 failing tests pass
- [ ] No regression in existing tests
- [ ] Clear error messages for validation failures
- [ ] Maintain parsing performance

## Implementation Steps

1. [ ] Fix annotation parsing at expression start
2. [ ] Implement stricter number-unit tokenization
3. [ ] Add validation rules for units and annotations
4. [ ] Fix special unit conversion issues
5. [ ] Update display name generator for new token types
6. [ ] Run full test suite
7. [ ] Document changes
8. [ ] Update this task file

## Notes

- Some validation may require checking against the unit registry
- UTF-8 validation in annotations needs careful handling
- Consider if we need a separate validation phase or inline checks