# Implement Invalid Unit Validation [pending]

## Overview

The parser currently accepts many invalid unit patterns that should be rejected according to UCUM specification. This task addresses 35 failing validation tests.

## Categories of Invalid Units

### 1. Number-Unit Without Operator (20 tests)
These patterns should be rejected but are currently parsed:
- `g/12h` - should be `g/12.h`
- `g/48h`, `g/4h`, `g/6h`, `g/72h`
- `mg/12h`, `mL/10h`, `mL/12h`, `mL/2h`, `mL/4h`, `mL/5h`, `mL/6h`, `mL/72h`, `mL/8h`
- `mmol/12h`, `mmol/5h`, `mmol/6h`
- `U/12h`, `U/1h`, `U/2h`

### 2. Invalid Unit Codes (4 tests)
- `kg[H20]` - should be `kg[H2O]` (zero vs letter O)
- `m[iIU]/L` - `iIU` is not a valid unit
- `u[iIU]/mL` - same issue
- `cm[H20]` - same H2O issue

### 3. Invalid Characters/Syntax (11 tests)
- `rad2{錠}` - non-ASCII characters in annotation
- `{|}1` - invalid annotation content
- `ug(8.h)` - parentheses not allowed for annotations
- `ug(8hr)` - same issue
- `10+3/ul` - plus sign not valid in this context

## Technical Analysis

### Current Issues

1. **Tokenizer**: Treats patterns like `12h` as valid tokens
2. **Parser**: No validation layer for unit codes
3. **Character validation**: No UTF-8/ASCII checks for annotations

### Solution Approach

1. **Stricter tokenization**: Distinguish between valid unit patterns and invalid number-unit combinations
2. **Validation layer**: Add checks for:
   - Valid unit codes against registry
   - Proper operator placement
   - Character restrictions in annotations
3. **Better error messages**: Specific errors for each validation failure

## Implementation Steps

1. [ ] Create validation utilities for unit codes
2. [ ] Add character validation for annotations (ASCII only)
3. [ ] Implement number-unit pattern detection
4. [ ] Update tokenizer to mark invalid patterns
5. [ ] Add validation phase to parser
6. [ ] Write comprehensive validation tests
7. [ ] Fix all 35 failing validation tests
8. [ ] Update error messages
9. [ ] Document validation rules
10. [ ] Commit changes

## Validation Rules

1. **Unit codes**: Must exist in registry or follow prefix+unit pattern
2. **Number-unit**: Requires operator (`.` or `*`) between number and unit
3. **Annotations**: ASCII characters only, no special symbols except specific allowed ones
4. **Operators**: Required between all terms (except number.unit)

## Success Criteria

- [ ] All 35 invalid unit tests properly reject
- [ ] Clear, specific error messages
- [ ] No regression in valid unit parsing
- [ ] Performance impact < 10%