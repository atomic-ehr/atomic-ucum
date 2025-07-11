# Update Display Name Generator for Scientific Notation [pending]

## Overview

The display name generator needs to be updated to handle the new scientific notation tokens. Currently, it's failing on complex expressions that include scientific notation.

## Failing Test

**Test 2-108**: Display name for `4.[pi].10*-7.N/A2`
- **Expected**: "4 * (the number pi) * (the number ten for arbitrary powers ^ -7) * (Newton) / (Amp&#232;re ^ 2)"
- **Actual**: "(4. pi.10*-7.N/A2)"
- **Issue**: The generator is falling back to parentheses wrapping instead of parsing the expression

## Technical Analysis

### Current Implementation

The display name generator has hardcoded regex patterns for complex expressions:
```typescript
const complexMatch = expression.match(/^(\d+)\.(\[[\w]+\])\.(\d+\*-?\d+)\.([A-Z]+)\/([A-Z]+)(\d*)$/);
```

This doesn't work with our new tokenizer that creates SCIENTIFIC_NOTATION tokens.

### Solution Approach

1. **Use the parser**: Instead of regex, use the actual parser to tokenize the expression
2. **Handle new token types**: Add display name generation for SCIENTIFIC_NOTATION tokens
3. **Preserve the expected format**: Ensure output matches UCUM specification

## Implementation Steps

1. [ ] Analyze current display name generator implementation
2. [ ] Add support for SCIENTIFIC_NOTATION token type
3. [ ] Refactor complex expression handling to use parser
4. [ ] Handle edge cases (parentheses, operators, etc.)
5. [ ] Test with various scientific notation patterns
6. [ ] Ensure backward compatibility
7. [ ] Update documentation
8. [ ] Commit changes

## Display Name Rules

For scientific notation `10*n`:
- Should display as: "(the number ten for arbitrary powers ^ n)"
- Example: `10*-7` → "(the number ten for arbitrary powers ^ -7)"

For complete expressions:
- Maintain proper operator spacing
- Use parentheses for unit names
- Preserve special characters (like &#232; for è)

## Test Cases

```typescript
// Basic scientific notation
'10*3' → "(the number ten for arbitrary powers ^ 3)"
'10*-7' → "(the number ten for arbitrary powers ^ -7)"

// Complex expressions
'4.[pi].10*-7.N/A2' → "4 * (the number pi) * (the number ten for arbitrary powers ^ -7) * (Newton) / (Ampère ^ 2)"
```

## Success Criteria

- [ ] Test 2-108 passes
- [ ] All other display name tests still pass
- [ ] Scientific notation displays correctly
- [ ] Performance remains acceptable