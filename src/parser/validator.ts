import { UnitRegistry } from '../unit-registry';

export class UCUMValidator {
  private registry: UnitRegistry;

  constructor() {
    this.registry = UnitRegistry.getInstance();
  }

  /**
   * Validates that a unit code is valid according to UCUM rules
   */
  validateUnitCode(unitCode: string): void {
    // Check for invalid unit patterns first
    if (this.isInvalidUnitPattern(unitCode)) {
      throw new Error(`Invalid unit: ${unitCode}`);
    }

    // Special handling for units with inline exponents
    const exponentMatch = unitCode.match(/^([a-zA-Z\[\]]+)(-?\d+)$/);
    if (exponentMatch) {
      const baseUnit = exponentMatch[1];
      // Recursively validate the base unit
      if (baseUnit) {
        this.validateUnitCode(baseUnit);
      }
      return;
    }

    // Don't validate existence in registry - that's done elsewhere
    // This method only checks for invalid patterns
  }

  /**
   * Checks if a unit code matches known invalid patterns
   */
  private isInvalidUnitPattern(unitCode: string): boolean {
    // Check for invalid unit codes that should be rejected
    const invalidPatterns = [
      /\[H20\]/,          // Should be H2O, not H20 (anywhere in the unit)
      /\[iIU\]/,          // iIU is not a valid UCUM unit
      /^\d+h$/,           // e.g., 12h, 48h - missing operator
      /^\d+hr$/,          // e.g., 8hr - not valid
      /^\d+d$/,           // e.g., 2d - missing operator
    ];

    return invalidPatterns.some(pattern => pattern.test(unitCode));
  }

  /**
   * Validates annotation content - must be ASCII only
   */
  validateAnnotation(annotation: string): void {
    // Check for non-ASCII characters
    if (!/^[\x00-\x7F]*$/.test(annotation)) {
      throw new Error(`Annotation contains non-ASCII characters: {${annotation}}`);
    }

    // Check for invalid annotation patterns
    if (annotation === '|') {
      throw new Error(`Invalid annotation content: {${annotation}}`);
    }
  }

  /**
   * Validates that a number-unit pattern is valid
   * e.g., "5m" is valid, but "5m2" needs to be "5.m2"
   */
  validateNumberUnitPattern(value: string): boolean {
    // Pattern: number directly followed by unit without operator
    // This is only valid for simple units like "5m", "10kg"
    // Not valid for "12h" in contexts like "g/12h"
    const match = value.match(/^(\d+(?:\.\d+)?)([a-zA-Z_\[\]]+)$/);
    if (!match) return true; // Not a number-unit pattern

    const [, numberPart, unitPart] = match;

    // Check if this is a time unit that requires an operator
    const timeUnitsRequiringOperator = ['h', 'd', 'wk', 'mo', 'a'];
    if (unitPart && timeUnitsRequiringOperator.includes(unitPart)) {
      // In division context (e.g., g/12h), this is invalid
      return false;
    }

    // Check for other invalid patterns
    if (unitPart && /^\d+$/.test(unitPart)) {
      // Unit part is all digits - invalid
      return false;
    }

    return true;
  }

  /**
   * Checks if an expression contains invalid operators
   */
  hasInvalidOperators(expression: string): boolean {
    // Check for + operator (not valid in UCUM except in scientific notation)
    // Scientific notation pattern: 10*+3, 10*+23, etc.
    if (expression.includes('+')) {
      // Allow + only in scientific notation context
      const scientificPattern = /10\*\+\d+/;
      if (!scientificPattern.test(expression)) {
        return true;
      }
    }

    // Check for parentheses used as annotation delimiters (invalid)
    // Valid: (m/s), Invalid: ug(8.h), ug(8hr)
    const parenMatch = expression.match(/[a-zA-Z]\([^)]+\)/);
    if (parenMatch) {
      // Check if this looks like an invalid annotation pattern
      // If there's a unit directly before '(' and content inside looks like time/annotation
      const innerContent = parenMatch[0].match(/\(([^)]+)\)/);
      if (innerContent && innerContent[1]) {
        // Check for patterns like "8.h", "8hr", "24.hr" etc.
        if (/^\d+\.?\w+$/.test(innerContent[1])) {
          return true;
        }
      }
    }

    return false;
  }
}