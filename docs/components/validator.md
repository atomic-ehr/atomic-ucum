# Validator Documentation

The UCUM validator ensures that unit expressions comply with the UCUM specification by rejecting invalid patterns and providing clear error messages.

## 📁 Files

- **`src/parser/validator.ts`** - Main validation logic
- **`src/parser/validator.test.ts`** - Comprehensive test suite

## 🏗️ Architecture

The validator is integrated into both the tokenizer and parser to catch errors early and provide helpful feedback.

### UCUMValidator Class

```typescript
export class UCUMValidator {
  constructor();
  
  // Main validation methods
  validateUnitCode(unitCode: string): void;
  validateAnnotation(annotation: string): void;
  validateNumberUnitPattern(value: string): boolean;
  hasInvalidOperators(expression: string): boolean;
}
```

## 📋 Validation Rules

### 1. Unit Code Validation

The validator checks for common mistakes in unit codes:

#### Invalid Chemical Formulas
```typescript
// ❌ Invalid
parser.parse('[H20]');     // Error: should be [H2O] not [H20]
parser.parse('kg[H20]');   // Error: Invalid unit: kg[H20]

// ✅ Valid
parser.parse('[H2O]');     // Water
parser.parse('kg[H2O]');   // Kilogram of water
```

#### Invalid Unit Codes
```typescript
// ❌ Invalid
parser.parse('[iIU]');     // Error: [iIU] is not a valid UCUM unit
parser.parse('m[iIU]/L');  // Error: Invalid unit: m[iIU]/L

// ✅ Valid
parser.parse('[IU]');      // International Unit
parser.parse('m[IU]/L');   // milli-International Units per liter
```

### 2. Number-Unit Pattern Validation

UCUM requires operators between numbers and time units in certain contexts:

```typescript
// ❌ Invalid in division context
parser.parse('g/12h');     // Error: Invalid unit pattern: 12h - use 12.h instead
parser.parse('mg/48h');    // Error: Invalid unit pattern: 48h - use 48.h instead
parser.parse('U/2h');      // Error: Invalid unit pattern: 2h - use 2.h instead

// ✅ Valid
parser.parse('g/12.h');    // Grams per 12 hours
parser.parse('mg/48.h');   // Milligrams per 48 hours
parser.parse('U/2.h');     // Units per 2 hours
```

Time units that require operators: `h` (hour), `d` (day), `wk` (week), `mo` (month), `a` (year)

### 3. Annotation Validation

Annotations must contain only ASCII characters:

```typescript
// ❌ Invalid - Non-ASCII characters
parser.parse('{錠}');      // Error: Annotation contains non-ASCII characters: {錠}
parser.parse('mg{µ}');     // Error: Annotation contains non-ASCII characters: {µ}
parser.parse('rad{°}');    // Error: Annotation contains non-ASCII characters: {°}

// ❌ Invalid - Special characters
parser.parse('{|}1');      // Error: Invalid annotation content: {|}

// ✅ Valid
parser.parse('{dose}');    // ASCII letters
parser.parse('{tab_1}');   // Letters, numbers, underscore
parser.parse('{a-b}');     // Hyphen allowed
```

### 4. Operator Validation

The validator checks for invalid operators and syntax:

#### Plus Operator
```typescript
// ❌ Invalid - Plus not allowed except in scientific notation
parser.parse('10+3');      // Error: Invalid operator in expression: 10+3
parser.parse('m+s');       // Error: Invalid operator in expression: m+s

// ✅ Valid - Plus allowed in scientific notation
parser.parse('10*+3/ul');  // 10³ per microliter
parser.parse('10*+23');    // 10²³
```

#### Parentheses Misuse
```typescript
// ❌ Invalid - Parentheses as annotation delimiters
parser.parse('ug(8.h)');   // Error: Invalid operator in expression: ug(8.h)
parser.parse('mg(24hr)');  // Error: Invalid operator in expression: mg(24hr)

// ✅ Valid - Parentheses for grouping
parser.parse('(m/s)');     // Meters per second
parser.parse('kg.(m/s2)'); // Kilogram times (meters per second squared)
```

## 🔍 Validation Process

### 1. Pre-validation (Tokenizer)

Before tokenization begins, the expression is checked for:
- Invalid operators (`+` outside scientific notation)
- Parentheses misuse patterns

### 2. During Tokenization

- Annotations are validated for ASCII-only content
- Arbitrary units are checked for known invalid patterns

### 3. During Parsing

- Number-unit patterns are validated in division contexts
- Unit codes are validated when resolved

## 💡 Error Messages

The validator provides clear, actionable error messages:

| Error Type | Example | Message |
|------------|---------|---------|
| Invalid unit pattern | `g/12h` | `Invalid unit pattern: 12h - use 12.h instead` |
| Non-ASCII annotation | `{錠}` | `Annotation contains non-ASCII characters: {錠}` |
| Invalid unit code | `[H20]` | `Invalid unit: [H20] - should be [H2O] not [H20]` |
| Invalid operator | `10+3` | `Invalid operator in expression: 10+3` |
| Parentheses misuse | `ug(8hr)` | `Invalid operator in expression: ug(8hr)` |

## 🧪 Testing

The validator includes comprehensive tests in `src/parser/validator.test.ts`:

```typescript
describe('UCUMValidator', () => {
  // Unit code validation
  test('should reject H20 instead of H2O');
  test('should reject iIU units');
  
  // Annotation validation
  test('should accept ASCII annotations');
  test('should reject non-ASCII characters');
  
  // Number-unit patterns
  test('should reject time units without operators');
  
  // Operator validation
  test('should reject plus operator');
  test('should reject parentheses as annotation delimiters');
});
```

## 🚀 Usage

The validator is automatically used by the parser and tokenizer:

```typescript
import { UCUMParser } from '@atomic-ehr/ucum';

const parser = new UCUMParser();

try {
  parser.parse('g/12h');
} catch (error) {
  console.log(error.message); // "Invalid unit pattern: 12h - use 12.h instead"
}
```

For direct validation:

```typescript
import { UCUMValidator } from '@atomic-ehr/ucum/parser/validator';

const validator = new UCUMValidator();

// Validate unit code
validator.validateUnitCode('[H2O]'); // OK
validator.validateUnitCode('[H20]'); // Throws error

// Validate annotation
validator.validateAnnotation('dose'); // OK
validator.validateAnnotation('錠'); // Throws error

// Check number-unit pattern
validator.validateNumberUnitPattern('12h'); // false (invalid)
validator.validateNumberUnitPattern('12m'); // true (valid)
```

## 📊 Performance

The validator adds minimal overhead:
- Pre-validation: < 1ms for typical expressions
- Pattern matching: Optimized regex patterns
- Caching: Validation results are implicitly cached with parsed expressions

## 🔮 Future Enhancements

1. **Context-aware validation**: Different rules for different contexts
2. **Suggestion system**: "Did you mean [H2O]?" for common mistakes
3. **Custom validation rules**: Allow users to add domain-specific rules
4. **Performance profiling**: Detailed metrics for validation overhead