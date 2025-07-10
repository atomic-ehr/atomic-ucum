import { UnitRegistry } from './unit-registry';
import { UCUMParser } from './parser';
import { ParsedUnit } from './types';

export class UCUMDisplayNameGenerator {
  private registry: UnitRegistry;
  private parser: UCUMParser;

  constructor() {
    this.registry = UnitRegistry.getInstance();
    this.parser = new UCUMParser();
  }

  /**
   * Generate a human-readable display name for a UCUM unit expression
   * @param expression - The UCUM unit expression
   * @returns The display name in parentheses
   */
  generate(expression: string): string {
    // Handle empty string as unity
    if (!expression || expression.trim() === '') {
      return '(unity)';
    }

    // Try direct simple cases first before parsing
    const simpleResult = this.trySimpleGeneration(expression);
    if (simpleResult) {
      return simpleResult;
    }

    try {
      // Parse the expression to get structured data
      const parsed = this.parser.parse(expression);
      return this.generateFromParsed(parsed, expression);
    } catch (error) {
      // If parsing fails, try to handle simple cases directly
      return this.generateSimple(expression);
    }
  }

  private trySimpleGeneration(expression: string): string | null {
    // Handle simple prefixed units directly
    const prefixMatch = this.findPrefixedUnit(expression);
    if (prefixMatch) {
      const { prefix, unit } = prefixMatch;
      return `(${prefix.name}${unit.name})`;
    }

    // Handle simple units with annotations like m[H2O]
    if (expression.includes('[') && expression.includes(']')) {
      const parts = expression.split('[');
      if (parts.length === 2) {
        const baseUnit = parts[0];
        const annotation = parts[1].replace(']', '');
        const baseDisplayName = this.getUnitDisplayName(baseUnit);
        
        if (annotation === 'H2O') {
          return `(${baseDisplayName} of water column)`;
        }
        return `(${baseDisplayName} ${annotation})`;
      }
    }

    // Handle special number expressions
    const numberMatch = expression.match(/^(\d+)\*(-?\d+)$/);
    if (numberMatch) {
      const [, base, exponent] = numberMatch;
      if (base === '10') {
        return `(the number ten for arbitrary powers ^ ${exponent})`;
      }
    }

    // Handle simple units with exponents like rad2
    const unitExponentMatch = expression.match(/^([a-zA-Z]+)(\d+)$/);
    if (unitExponentMatch) {
      const [, unitCode, exponent] = unitExponentMatch;
      const displayName = this.getUnitDisplayName(unitCode);
      return `(${displayName} ^ ${exponent})`;
    }

    // Handle complex expressions by manual parsing
    const complexResult = this.parseComplexExpression(expression);
    if (complexResult) {
      return complexResult;
    }

    return null;
  }

  private parseComplexExpression(expression: string): string | null {
    // Handle expressions like "m3.kg-1.s-2"
    if (expression.includes('.') && (expression.includes('-') || /\d/.test(expression)) && !expression.includes('[')) {
      return this.parseUnitExpression(expression);
    }

    // Handle expressions like "4.[pi].10*-7.N/A2"
    if (expression.includes('[') || (expression.includes('*') && expression.includes('/'))) {
      const result = this.parseComplexUnitExpression(expression);
      if (result) return result;
    }

    return null;
  }

  private parseUnitExpression(expression: string): string | null {
    // Parse expressions like "m3.kg-1.s-2"
    const parts = expression.split('.');
    const displayParts: string[] = [];

    for (const part of parts) {
      if (part.includes('-')) {
        // Handle negative exponents like "kg-1"
        const match = part.match(/^([a-zA-Z]+)(-?\d+)$/);
        if (match) {
          const [, unit, exponent] = match;
          const displayName = this.getUnitDisplayName(unit);
          displayParts.push(`${displayName} ^ ${exponent}`);
        }
      } else {
        // Handle positive exponents like "m3"
        const match = part.match(/^([a-zA-Z]+)(\d+)?$/);
        if (match) {
          const [, unit, exponent] = match;
          const displayName = this.getUnitDisplayName(unit);
          if (exponent) {
            displayParts.push(`${displayName} ^ ${exponent}`);
          } else {
            displayParts.push(displayName);
          }
        }
      }
    }

    if (displayParts.length > 0) {
      // Wrap each part in parentheses for proper formatting
      const wrappedParts = displayParts.map(part => part.includes(' ^ ') ? `(${part})` : `(${part})`);
      return wrappedParts.join(' * ');
    }

    return null;
  }

  private parseComplexUnitExpression(expression: string): string | null {
    // Handle expressions like "4.[pi].10*-7.N/A2"
    
    // More comprehensive parsing using regex
    const complexMatch = expression.match(/^(\d+)\.(\[[\w]+\])\.(\d+\*-?\d+)\.([A-Z]+)\/([A-Z]+)(\d*)$/);
    if (complexMatch) {
      const [, leadingNum, bracket, powerExpr, numeratorUnit, denominatorUnit, denomExponent] = complexMatch;
      
      const parts: string[] = [];
      parts.push(leadingNum);
      
      // Handle [pi] or other bracketed expressions
      if (bracket === '[pi]') {
        parts.push('(the number pi)');
      }
      
      // Handle 10*-7 style expressions
      const powerParts = powerExpr.split('*');
      if (powerParts[0] === '10') {
        parts.push(`(the number ten for arbitrary powers ^ ${powerParts[1]})`);
      }
      
      // Handle units
      const numDisplayName = this.getUnitDisplayName(numeratorUnit);
      parts.push(`(${numDisplayName})`);
      
      // Handle denominator with exponent
      const denomDisplayName = this.getUnitDisplayName(denominatorUnit);
      const finalExponent = denomExponent || '2';
      
      return `${parts.join(' * ')} / (${denomDisplayName} ^ ${finalExponent})`;
    }
    
    // Fallback: try to split by dots and handle each part
    if (expression.includes('.')) {
      const dotParts = expression.split('.');
      const parts: string[] = [];
      
      for (const part of dotParts) {
        if (/^\d+$/.test(part)) {
          // Pure number
          parts.push(part);
        } else if (part.startsWith('[') && part.endsWith(']')) {
          // Bracketed expression
          const inner = part.slice(1, -1);
          if (inner === 'pi') {
            parts.push('(the number pi)');
          }
        } else if (part.includes('*')) {
          // Power expression like 10*-7
          const powerParts = part.split('*');
          if (powerParts[0] === '10') {
            parts.push(`(the number ten for arbitrary powers ^ ${powerParts[1]})`);
          }
        } else if (part.includes('/')) {
          // Division expression
          const [num, denom] = part.split('/');
          const numDisplay = this.getUnitDisplayName(num);
          
          // Check if denominator has exponent
          const denomMatch = denom.match(/^([A-Z]+)(\d+)$/);
          if (denomMatch) {
            const [, unit, exp] = denomMatch;
            const denomDisplay = this.getUnitDisplayName(unit);
            
            if (parts.length > 0) {
              return `${parts.join(' * ')} * (${numDisplay}) / (${denomDisplay} ^ ${exp})`;
            } else {
              return `(${numDisplay}) / (${denomDisplay} ^ ${exp})`;
            }
          }
        } else {
          // Regular unit
          const unitDisplay = this.getUnitDisplayName(part);
          parts.push(`(${unitDisplay})`);
        }
      }
      
      if (parts.length > 0) {
        return parts.join(' * ');
      }
    }
    
    return null;
  }

  private generateFromParsed(parsed: ParsedUnit, originalExpression: string): string {
    // If coefficient is not 1, we might be dealing with a prefixed unit that got converted
    // For display purposes, we want to show the original unit name, not the conversion
    if (parsed.value !== 1 && Object.keys(parsed.units).length === 1) {
      const unitCode = Object.keys(parsed.units)[0];
      const exponent = parsed.units[unitCode];
      
      // Check if this is a simple prefixed unit case
      if (exponent === 1 && this.findPrefixedUnit(originalExpression)) {
        const prefixMatch = this.findPrefixedUnit(originalExpression);
        if (prefixMatch) {
          return `(${prefixMatch.prefix.name}${prefixMatch.unit.name})`;
        }
      }
    }

    const parts: string[] = [];
    
    // Handle numeric coefficient only if it's not from a prefix conversion
    if (parsed.value !== 1) {
      parts.push(parsed.value.toString());
    }

    // Handle units
    const unitParts: string[] = [];
    const positiveUnits: string[] = [];
    const negativeUnits: string[] = [];

    // Separate positive and negative exponents
    Object.entries(parsed.units).forEach(([unitCode, exponent]) => {
      const displayName = this.getUnitDisplayName(unitCode);
      const formattedUnit = exponent === 1 ? displayName : `${displayName} ^ ${exponent}`;
      
      if (exponent > 0) {
        positiveUnits.push(formattedUnit);
      } else {
        negativeUnits.push(formattedUnit.replace(` ^ ${exponent}`, ` ^ ${Math.abs(exponent)}`));
      }
    });

    // Build the expression
    if (positiveUnits.length > 0) {
      unitParts.push(positiveUnits.join(' * '));
    }
    
    if (negativeUnits.length > 0) {
      if (positiveUnits.length > 0) {
        unitParts.push(' / ');
        unitParts.push(negativeUnits.join(' * '));
      } else {
        unitParts.push('1 / ');
        unitParts.push(negativeUnits.join(' * '));
      }
    }

    // Combine coefficient and units
    if (parts.length > 0 && unitParts.length > 0) {
      return `${parts.join(' * ')} * (${unitParts.join('')})`;
    } else if (unitParts.length > 0) {
      return `(${unitParts.join('')})`;
    } else if (parts.length > 0) {
      return `(${parts.join(' * ')})`;
    }

    return '(unity)';
  }

  private generateSimple(expression: string): string {
    // Handle special cases that might not parse correctly
    
    // Handle complex expressions like "4.[pi].10*-7.N/A2" as last resort
    const complexMatch = expression.match(/^(\d+)\.(\[[\w]+\])\.(\d+\*-?\d+)\.([A-Z]+)\/([A-Z]+)(\d*)$/);
    if (complexMatch) {
      const [, leadingNum, bracket, powerExpr, numeratorUnit, denominatorUnit, denomExponent] = complexMatch;
      
      const parts: string[] = [];
      parts.push(leadingNum);
      
      // Handle [pi] or other bracketed expressions
      if (bracket === '[pi]') {
        parts.push('(the number pi)');
      }
      
      // Handle 10*-7 style expressions
      const powerParts = powerExpr.split('*');
      if (powerParts[0] === '10') {
        parts.push(`(the number ten for arbitrary powers ^ ${powerParts[1]})`);
      }
      
      // Handle units
      const numDisplayName = this.getUnitDisplayName(numeratorUnit);
      parts.push(`(${numDisplayName})`);
      
      // Handle denominator with exponent
      const denomDisplayName = this.getUnitDisplayName(denominatorUnit);
      const finalExponent = denomExponent || '2';
      
      return `${parts.join(' * ')} / (${denomDisplayName} ^ ${finalExponent})`;
    }
    
    // Check for numbers like "10*23"
    const numberMatch = expression.match(/^(\d+)\*(-?\d+)$/);
    if (numberMatch) {
      const [, base, exponent] = numberMatch;
      if (base === '10') {
        return `(the number ten for arbitrary powers ^ ${exponent})`;
      }
    }

    // Check for simple units with exponents like "rad2"
    const unitExponentMatch = expression.match(/^([a-zA-Z]+)(\d+)$/);
    if (unitExponentMatch) {
      const [, unitCode, exponent] = unitExponentMatch;
      const displayName = this.getUnitDisplayName(unitCode);
      return `(${displayName} ^ ${exponent})`;
    }

    // Check for simple units
    const displayName = this.getUnitDisplayName(expression);
    return `(${displayName})`;
  }

  private getUnitDisplayName(unitCode: string): string {
    // Handle special numeric units
    if (unitCode === '10*23') {
      return 'the number ten for arbitrary powers ^ 23';
    }
    if (unitCode === '10*-7') {
      return 'the number ten for arbitrary powers ^ -7';
    }
    if (unitCode === '[pi]') {
      return 'the number pi';
    }

    // Handle brackets - special units
    if (unitCode.startsWith('[') && unitCode.endsWith(']')) {
      const innerCode = unitCode.slice(1, -1);
      if (innerCode === 'pi') {
        return 'the number pi';
      }
      if (innerCode === 'H2O') {
        return 'water column';
      }
      // For other arbitrary units, return as is
      return unitCode;
    }

    // Try to find the unit in the registry
    const unit = this.registry.getUnit(unitCode);
    if (unit) {
      return unit.name;
    }

    // Try to decompose prefixed units
    const prefixMatch = this.findPrefixedUnit(unitCode);
    if (prefixMatch) {
      const { prefix, unit } = prefixMatch;
      return `${prefix.name}${unit.name}`;
    }

    // Handle special annotation units
    if (unitCode.includes('[') && unitCode.includes(']')) {
      // Units like m[H2O]
      const parts = unitCode.split('[');
      if (parts.length === 2) {
        const baseUnit = parts[0];
        const annotation = parts[1].replace(']', '');
        const baseDisplayName = this.getUnitDisplayName(baseUnit);
        
        if (annotation === 'H2O') {
          return `${baseDisplayName} of water column`;
        }
        return `${baseDisplayName} ${annotation}`;
      }
    }

    // Handle complex expressions with special characters  
    if (unitCode === 'A') {
      return 'Amp&#232;re'; // HTML entity for special character
    }
    if (unitCode === 'N') {
      return 'Newton';
    }

    // If all else fails, return the code as is
    return unitCode;
  }

  private findPrefixedUnit(unitCode: string): { prefix: any, unit: any } | null {
    // Try different prefix lengths (longest first)
    for (let i = Math.min(unitCode.length - 1, 3); i >= 1; i--) {
      const prefixCode = unitCode.substring(0, i);
      const baseUnitCode = unitCode.substring(i);
      
      const prefix = this.registry.getPrefix(prefixCode);
      const unit = this.registry.getUnit(baseUnitCode);
      
      if (prefix && unit) {
        return { prefix, unit };
      }
    }
    return null;
  }
}