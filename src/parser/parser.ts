import type { ParsedUnit } from '../types';
import { UnitRegistry } from '../unit-registry';
import { Tokenizer, TokenType } from './tokenizer';
import type { Token } from './tokenizer';

// Cache for parsed expressions
const PARSE_CACHE = new Map<string, ParsedUnit>();
const MAX_CACHE_SIZE = 1000;

export class UCUMParser {
  private tokenizer: Tokenizer;
  private registry: UnitRegistry;
  private tokens: Token[] = [];
  private current: number = 0;
  private depth: number = 0;
  
  constructor() {
    this.tokenizer = new Tokenizer();
    this.registry = UnitRegistry.getInstance();
  }
  
  parse(expression: string): ParsedUnit {
    // Check cache first
    const cached = PARSE_CACHE.get(expression);
    if (cached) {
      return this.cloneResult(cached);
    }
    
    // Tokenize
    this.tokens = this.tokenizer.tokenize(expression);
    this.current = 0;
    this.depth = 0;
    
    // Parse
    const result = this.parseExpression();
    
    // Cache result
    if (PARSE_CACHE.size >= MAX_CACHE_SIZE) {
      // Simple LRU: clear half the cache
      const keys = Array.from(PARSE_CACHE.keys());
      for (let i = 0; i < MAX_CACHE_SIZE / 2; i++) {
        PARSE_CACHE.delete(keys[i] || '');
      }
    }
    PARSE_CACHE.set(expression, this.cloneResult(result));
    
    return result;
  }
  
  private cloneResult(result: ParsedUnit): ParsedUnit {
    return {
      value: result.value,
      units: { ...result.units },
      annotations: result.annotations ? [...result.annotations] : undefined
    };
  }
  
  private parseExpression(): ParsedUnit {
    const result: ParsedUnit = {
      value: 1,
      units: {},
      annotations: []
    };
    
    // Check for leading annotation
    let hasLeadingAnnotation = false;
    if (this.peek().type === TokenType.ANNOTATION) {
      const annotation = this.advance().value;
      result.annotations!.push(annotation);
      hasLeadingAnnotation = true;
      
      // After annotation, we must have an operator (. or /) or end of expression
      if (!this.isAtEnd() && this.peek().type !== TokenType.OPERATOR) {
        throw new Error(`Expected operator after annotation at position ${this.peek().position}`);
      }
    }
    
    // Check for leading number
    let hasLeadingNumber = false;
    if (!hasLeadingAnnotation && this.peek().type === TokenType.NUMBER) {
      result.value = parseFloat(this.advance().value);
      hasLeadingNumber = true;
    }
    
    // Check for leading division operator (e.g., /m means 1/m)
    if (this.peek().type === TokenType.OPERATOR && this.peek().value === '/') {
      // This is a reciprocal unit like /m
      this.advance(); // consume the /
      const term = this.parseTerm();
      result.value /= term.value;
      this.mergeUnits(result.units, term.units, -1);
      if (term.annotations) {
        result.annotations!.push(...term.annotations);
      }
    } else if (hasLeadingAnnotation || !hasLeadingNumber || (hasLeadingNumber && this.peek().type === TokenType.OPERATOR && this.peek().value === '.')) {
      // If we have a leading annotation, number followed by '.', or no leading number at all, parse term
      if ((hasLeadingAnnotation || hasLeadingNumber) && this.peek().type === TokenType.OPERATOR && this.peek().value === '.') {
        this.advance(); // consume the '.'
      }
      
      // Only parse term if we're not at the end
      if (!this.isAtEnd()) {
        const term = this.parseTerm();
        result.value *= term.value;
        this.mergeUnits(result.units, term.units, 1);
        if (term.annotations) {
          result.annotations!.push(...term.annotations);
        }
      }
    }
    
    // Parse additional terms with operators
    while (this.peek().type === TokenType.OPERATOR) {
      const op = this.advance().value;
      
      // Check for double operators
      if (this.peek().type === TokenType.OPERATOR) {
        throw new Error(`Invalid syntax: double operator ${op}${this.peek().value}`);
      }
      
      // Check for missing operand
      if (this.isAtEnd()) {
        throw new Error(`Invalid syntax: missing operand after ${op}`);
      }
      
      const nextTerm = this.parseTerm();
      
      if (op === '.') {
        result.value *= nextTerm.value;
        this.mergeUnits(result.units, nextTerm.units, 1);
      } else if (op === '/') {
        result.value /= nextTerm.value;
        this.mergeUnits(result.units, nextTerm.units, -1);
      }
      
      if (nextTerm.annotations) {
        result.annotations!.push(...nextTerm.annotations);
      }
    }
    
    // Check for unmatched parentheses only at top level
    if (this.depth === 0 && this.peek().type === TokenType.RPAREN) {
      throw new Error('Invalid syntax: unmatched closing parenthesis');
    }
    
    // Clean up result
    if (result.annotations!.length === 0) {
      delete result.annotations;
    }
    
    return result;
  }
  
  private parseTerm(): ParsedUnit {
    const token = this.peek();
    
    if (token.type === TokenType.LPAREN) {
      return this.parseParentheses();
    }
    
    if (token.type === TokenType.ANNOTATION) {
      const annotation = this.advance().value;
      const result: ParsedUnit = { value: 1, units: {}, annotations: [annotation] };
      
      // After annotation in a term, we can have:
      // 1. End of expression
      // 2. An operator (which will be handled by parseExpression)
      // 3. Another term (if operator is '.')
      
      if (this.isAtEnd() || this.peek().type === TokenType.OPERATOR) {
        // Let parseExpression handle any operators
        return result;
      }
      
      // Otherwise, parse the next term and merge
      const nextTerm = this.parseTerm();
      result.value *= nextTerm.value;
      this.mergeUnits(result.units, nextTerm.units, 1);
      if (nextTerm.annotations) {
        result.annotations!.push(...nextTerm.annotations);
      }
      return result;
    }
    
    if (token.type === TokenType.UNIT) {
      return this.parseUnit();
    }
    
    if (token.type === TokenType.SCIENTIFIC_NOTATION) {
      const sciToken = this.advance();
      // Parse the scientific notation value (e.g., "10*3" => 1000, "10*-7" => 0.0000001)
      const match = sciToken.value.match(/^10\*([-+]?\d+)$/);
      if (match) {
        const exponent = parseInt(match[1] ?? '0');
        const value = Math.pow(10, exponent);
        return { value, units: {} };
      }
      throw new Error(`Invalid scientific notation: ${sciToken.value}`);
    }
    
    if (token.type === TokenType.NUMBER) {
      // Handle standalone number
      const value = parseFloat(this.advance().value);
      return { value, units: {} };
    }
    
    throw new Error(`Unexpected token: ${token.type} at position ${token.position}`);
  }
  
  private parseParentheses(): ParsedUnit {
    this.advance(); // consume (
    this.depth++;
    const result = this.parseExpression();
    this.depth--;
    
    if (this.peek().type !== TokenType.RPAREN) {
      throw new Error('Expected closing parenthesis');
    }
    this.advance(); // consume )
    
    // Check for exponent after parentheses
    if (this.peek().type === TokenType.NUMBER || this.peek().type === TokenType.EXPONENT) {
      const exp = this.parseExponent();
      result.value = Math.pow(result.value, exp);
      for (const unit in result.units) {
        result.units[unit] = (result.units[unit] ?? 0) * exp;
      }
    }
    
    return result;
  }
  
  private parseUnit(): ParsedUnit {
    const unitToken = this.advance();
    if (unitToken.type !== TokenType.UNIT) {
      throw new Error(`Expected unit, got ${unitToken.type}`);
    }
    
    let unitCode = unitToken.value;
    let exponent = 1;
    
    // Check for exponent
    const nextToken = this.peek();
    if (nextToken.type === TokenType.NUMBER || nextToken.type === TokenType.EXPONENT) {
      exponent = this.parseExponent();
    }
    
    // Handle annotations that come after units
    const annotations: string[] = [];
    while (this.peek().type === TokenType.ANNOTATION) {
      annotations.push(this.advance().value);
    }
    
    // Resolve the unit
    const unitData = this.resolveUnit(unitCode);
    
    // Apply exponent
    if (exponent !== 1) {
      unitData.value = Math.pow(unitData.value, exponent);
      for (const unit in unitData.units) {
        unitData.units[unit] = (unitData.units[unit] ?? 0) * exponent;
      }
    }
    
    if (annotations.length > 0) {
      unitData.annotations = annotations;
    }
    
    return unitData;
  }
  
  private parseExponent(): number {
    const token = this.peek();
    
    if (token.type === TokenType.EXPONENT) {
      this.advance();
      return parseInt(token.value);
    }
    
    if (token.type === TokenType.NUMBER) {
      // Check if this is directly after a unit (no operator)
      const prevToken = this.tokens[this.current - 1];
      if (prevToken && prevToken.type === TokenType.UNIT) {
        this.advance();
        return parseInt(token.value);
      }
    }
    
    return 1;
  }
  
  private resolveUnit(unitCode: string): ParsedUnit {
    // Handle special cases
    if (unitCode === '%') {
      return { value: 0.01, units: {} };
    }
    
    // Check if this is a unit with inline exponent (e.g., m2, s-1)
    const exponentMatch = unitCode.match(/^([a-zA-Z]+)(-?\d+)$/);
    if (exponentMatch) {
      const baseUnit = exponentMatch[1] || '';
      const exponent = parseInt(exponentMatch[2] || '0');
      const baseResult = this.resolveUnit(baseUnit);
      
      // Apply exponent
      baseResult.value = Math.pow(baseResult.value, exponent);
      for (const unit in baseResult.units) {
        baseResult.units[unit] = (baseResult.units[unit] ?? 0) * exponent;
      }
      return baseResult;
    }
    
    // Try direct unit lookup
    const unit = this.registry.getUnit(unitCode);
    if (unit) {
      return this.expandUnit(unit);
    }
    
    // Try prefixed unit
    const prefixedUnit = this.registry.tryPrefixedUnit(unitCode);
    if (prefixedUnit) {
      // Validate that the unit can have this prefix
      if (!prefixedUnit.unit.isMetric) {
        throw new Error(`Unit ${prefixedUnit.unit.code} cannot have prefix ${prefixedUnit.prefix.code}`);
      }
      const expanded = this.expandUnit(prefixedUnit.unit);
      expanded.value *= prefixedUnit.prefix.value;
      return expanded;
    }
    
    throw new Error(`Unknown unit: ${unitCode}`);
  }
  
  private expandUnit(unit: any): ParsedUnit {
    // For base units and special units, just return as-is
    if (unit.isBase || unit.isSpecial || !unit.value?.unit) {
      return { value: 1, units: { [unit.code]: 1 } };
    }
    
    // Handle dimensionless units like [pi] that have a numeric value
    if (unit.value?.unit === '1' && unit.value?.value) {
      return { value: unit.value.value, units: {} };
    }
    
    // For derived units, expand to base units
    // This is a simplified version - full implementation would parse unit.value.unit
    const result: ParsedUnit = { value: unit.value.value || 1, units: {} };
    
    // Hard-coded expansions for common units
    switch (unit.code) {
      case 'N':
        result.value = 1000; // kg -> g
        result.units = { g: 1, m: 1, s: -2 };
        break;
      case 'Pa':
        result.value = 1000; // kg -> g  
        result.units = { g: 1, m: -1, s: -2 };
        break;
      case 'J':
        result.value = 1000; // kg -> g
        result.units = { g: 1, m: 2, s: -2 };
        break;
      case 'W':
        result.value = 1000; // kg -> g
        result.units = { g: 1, m: 2, s: -3 };
        break;
      case 'C':
        result.units = { A: 1, s: 1 };
        break;
      case 'V':
        result.value = 1000; // kg -> g
        result.units = { g: 1, m: 2, s: -3, A: -1 };
        break;
      case 'F':
        result.value = 0.001; // kg -> g
        result.units = { g: -1, m: -2, s: 4, A: 2 };
        break;
      case 'Ohm':
        result.value = 1000; // kg -> g
        result.units = { g: 1, m: 2, s: -3, A: -2 };
        break;
      case 'Hz':
        result.units = { s: -1 };
        break;
      case 'L':
        result.value = 0.001;
        result.units = { m: 3 };
        break;
      case 'dL':
        result.value = 0.0001; // 0.1 L = 0.1 * 0.001 m³
        result.units = { m: 3 };
        break;
      case 'cL':
        result.value = 0.00001; // 0.01 L
        result.units = { m: 3 };
        break;
      case 'mL':
        result.value = 0.000001; // 0.001 L
        result.units = { m: 3 };
        break;
      case 'min':
        result.value = 60;
        result.units = { s: 1 };
        break;
      case 'h':
        result.value = 3600;
        result.units = { s: 1 };
        break;
      case 'd':
        result.value = 86400;
        result.units = { s: 1 };
        break;
      case 'wk':
        result.value = 604800;
        result.units = { s: 1 };
        break;
      case 'mo':
        result.value = 2629800; // Average month
        result.units = { s: 1 };
        break;
      case 'a':
        result.value = 31557600; // Average year
        result.units = { s: 1 };
        break;
      case '[in_i]':
        result.value = 0.0254;
        result.units = { m: 1 };
        break;
      case '[ft_i]':
        result.value = 0.3048;
        result.units = { m: 1 };
        break;
      case '[yd_i]':
        result.value = 0.9144;
        result.units = { m: 1 };
        break;
      case '[mi_i]':
        result.value = 1609.344;
        result.units = { m: 1 };
        break;
      case '[lb_av]':
        result.value = 453.59237;
        result.units = { g: 1 };
        break;
      case '[oz_av]':
        result.value = 28.349523125;
        result.units = { g: 1 };
        break;
      case '[gal_us]':
        result.value = 0.003785411784;
        result.units = { m: 3 };
        break;
      case '[qt_us]':
        result.value = 0.000946352946;
        result.units = { m: 3 };
        break;
      case '[pt_us]':
        result.value = 0.000473176473;
        result.units = { m: 3 };
        break;
      case '[cup_us]':
        result.value = 0.0002365882365;
        result.units = { m: 3 };
        break;
      case '[foz_us]':
        result.value = 0.00002957352956;
        result.units = { m: 3 };
        break;
      case 'cal':
        result.value = 4184; // kg -> g
        result.units = { g: 1, m: 2, s: -2 };
        break;
      case 'kcal':
        result.value = 4184000; // kg -> g
        result.units = { g: 1, m: 2, s: -2 };
        break;
      case 'bar':
        result.value = 100000000; // 100000 Pa, kg -> g
        result.units = { g: 1, m: -1, s: -2 };
        break;
      case 'atm':
        result.value = 101325000; // kg -> g
        result.units = { g: 1, m: -1, s: -2 };
        break;
      case 'eq':
        // Equivalent - used for chemical equivalents
        result.units = { eq: 1 };
        break;
      case 'Cel':
      case '[degF]':
        // Temperature units need special handling
        result.units = { [unit.code]: 1 };
        break;
      default:
        // For unknown derived units, just use the unit as-is
        result.value = unit.value?.value || 1;
        result.units = { [unit.code]: 1 };
    }
    
    return result;
  }
  
  private mergeUnits(target: Record<string, number>, source: Record<string, number>, multiplier: number): void {
    for (const unit in source) {
      const exponent = (source[unit] ?? 0) * multiplier;
      if (target[unit]) {
        target[unit] += exponent;
        if (target[unit] === 0) {
          delete target[unit];
        }
      } else {
        target[unit] = exponent;
      }
    }
  }
  
  private peek(): Token {
    return this.tokens[this.current] || { type: TokenType.EOF, value: '', position: this.current };
  }
  
  private advance(): Token {
    if (!this.isAtEnd()) {
      this.current++;
    }
    return this.tokens[this.current - 1] || { type: TokenType.EOF, value: '', position: this.current - 1 };
  }
  
  private isAtEnd(): boolean {
    return this.peek().type === TokenType.EOF;
  }
  
  normalize(expression: string): string {
    const parsed = this.parse(expression);
    
    const parts: string[] = [];
    
    // Add numeric coefficient if not 1
    if (parsed.value !== 1) {
      parts.push(parsed.value.toString());
    }
    
    // Collect positive and negative exponent units
    const positive: string[] = [];
    const negative: string[] = [];
    
    Object.entries(parsed.units).forEach(([unit, exp]) => {
      if (exp > 0) {
        if (exp === 1) {
          positive.push(unit);
        } else {
          positive.push(`${unit}${exp}`);
        }
      } else if (exp < 0) {
        if (exp === -1) {
          negative.push(unit);
        } else {
          negative.push(`${unit}${-exp}`);
        }
      }
    });
    
    // Build the normalized expression
    if (positive.length > 0) {
      parts.push(positive.join('.'));
    }
    
    if (negative.length > 0) {
      if (negative.length === 1) {
        parts.push('/' + negative[0]);
      } else {
        parts.push('/(' + negative.join('.') + ')');
      }
    }
    
    return parts.join('') || '1';
  }
}