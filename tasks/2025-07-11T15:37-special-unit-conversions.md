# Fix Remaining Special Unit Conversions [pending]

## Overview

Three special unit conversion tests are failing. These involve units that require special handling beyond the already implemented temperature and logarithmic conversions.

## Failing Tests

### 1. Test 3-124: `[mu_0]` (Permeability of vacuum)
- **From**: `[mu_0]`
- **To**: `g.m.C-2`
- **Error**: "Units are incompatible: [mu_0] (1) and g.m.C-2 (L·M·T^-2·I^-2)"
- **Issue**: `[mu_0]` is defined as `4.[pi].10*-7.N/A2` but the parser may not be expanding it correctly

### 2. Test 3-125: `m[Hg]` (Meter of mercury column)
- **From**: `m[Hg]`
- **To**: `g.s-2.m-1`
- **Error**: Likely a missing special conversion for mercury column pressure

### 3. Test 3-127/3-128: `[ly]` (Light-year)
- **From**: `[ly]` and `1/[ly]`
- **To**: `cm` and `cm-1`
- **Error**: Light-year may not be properly defined or expanded

## Technical Analysis

### Issues

1. **Unit expansion**: Some special units have complex definitions that need proper parsing
   - `[mu_0]` = `4.[pi].10*-7.N/A2`
   - This involves our newly implemented scientific notation!

2. **Missing conversions**: Mercury column and light-year may need special handling

3. **Dimension mismatch**: The error shows `[mu_0]` as dimension "1" (dimensionless) when it should have proper electromagnetic dimensions

## Implementation Steps

1. [ ] Debug why `[mu_0]` is showing as dimensionless
2. [ ] Check if unit definitions are properly expanded
3. [ ] Implement mercury column pressure conversion
4. [ ] Fix light-year conversion and its reciprocal
5. [ ] Add any missing special conversions to SpecialConverter
6. [ ] Write tests for these specific conversions
7. [ ] Update documentation
8. [ ] Commit changes

## Expected Conversions

### Permeability of vacuum
- `[mu_0]` should expand to its definition value
- Has dimensions of magnetic permeability (M·L·T^-2·I^-2)

### Mercury column
- `m[Hg]` represents pressure from mercury column height
- Needs conversion factor to pascals or equivalent

### Light-year
- `[ly]` = distance light travels in one year
- Should convert to standard length units

## Success Criteria

- [ ] Test 3-124 passes ([mu_0] conversion)
- [ ] Test 3-125 passes (m[Hg] conversion)
- [ ] Test 3-127 passes ([ly] to cm)
- [ ] Test 3-128 passes (1/[ly] to cm-1)
- [ ] No regression in other conversions