import { ConversionResult, ConversionOptions, ParsedUnit, DimensionVector } from './types';
import { UCUMParser } from './parser';
import { UnitRegistry } from './unit-registry';
import { DimensionCalculator } from './generated/dimension-analyzer';

export class UCUMConverter {
  private parser: UCUMParser;
  private registry: UnitRegistry;
  
  constructor() {
    this.parser = new UCUMParser();
    this.registry = UnitRegistry.getInstance();
  }
  
  convert(value: number, from: string, to: string, options?: ConversionOptions): ConversionResult {
    // Handle special conversions first (before parsing)
    if (this.isSpecialConversion(from, to, options)) {
      return this.handleSpecialConversion(value, from, to, options);
    }
    
    // Parse the units
    const fromParsed = this.parser.parse(from);
    const toParsed = this.parser.parse(to);
    
    // Extract annotations
    const annotations = [...(fromParsed.annotations || []), ...(toParsed.annotations || [])];
    
    // Check if conversion is possible
    if (!this.canConvert(from, to)) {
      const fromDim = this.getDimensionForParsedUnit(fromParsed);
      const toDim = this.getDimensionForParsedUnit(toParsed);
      const fromName = this.getDimensionName(fromDim);
      const toName = this.getDimensionName(toDim);
      throw new Error(`Units are incompatible: ${from} (${fromName}) and ${to} (${toName})`);
    }
    
    // Regular conversion: value * fromValue / toValue
    const result = value * fromParsed.value / toParsed.value;
    
    return {
      value: result,
      fromUnit: from,
      toUnit: to,
      annotations: annotations.length > 0 ? annotations : undefined
    };
  }
  
  canConvert(from: string, to: string): boolean {
    try {
      const fromParsed = this.parser.parse(from);
      const toParsed = this.parser.parse(to);
      
      const fromDim = this.getDimensionForParsedUnit(fromParsed);
      const toDim = this.getDimensionForParsedUnit(toParsed);
      
      return DimensionCalculator.equal(fromDim, toDim);
    } catch {
      return false;
    }
  }
  
  toBaseUnits(expression: string): ParsedUnit {
    return this.parser.parse(expression);
  }
  
  private getDimensionForParsedUnit(parsed: ParsedUnit): DimensionVector {
    let result: DimensionVector = [0, 0, 0, 0, 0, 0, 0];
    
    Object.entries(parsed.units).forEach(([unit, exponent]) => {
      const unitDim = this.registry.getDimension(unit);
      if (unitDim) {
        result = DimensionCalculator.add(result, DimensionCalculator.multiply(unitDim, exponent));
      }
    });
    
    return result;
  }
  
  private getDimensionName(dim: DimensionVector): string {
    return DimensionCalculator.getDimensionName(dim);
  }
  
  private isSpecialConversion(from: string, to: string, options?: ConversionOptions): boolean {
    // Temperature conversions
    if ((from === 'Cel' || from === 'K' || from === '[degF]') &&
        (to === 'Cel' || to === 'K' || to === '[degF]')) {
      return true;
    }
    
    // Mol-mass conversions (check even without options to throw proper error)
    if ((from === 'mol' && to === 'g') || (from === 'g' && to === 'mol')) {
      return true;
    }
    
    // Equivalent conversions (check even without options to throw proper error)
    if ((from === 'mol' && to === 'eq') || (from === 'eq' && to === 'mol')) {
      return true;
    }
    
    return false;
  }
  
  private handleSpecialConversion(value: number, from: string, to: string, options?: ConversionOptions): ConversionResult {
    let result = value;
    
    // Temperature conversions
    if (from === 'Cel' && to === 'K') {
      result = value + 273.15;
    } else if (from === 'K' && to === 'Cel') {
      result = value - 273.15;
    } else if (from === '[degF]' && to === 'Cel') {
      result = (value - 32) * 5/9;
    } else if (from === 'Cel' && to === '[degF]') {
      result = value * 9/5 + 32;
    } else if (from === '[degF]' && to === 'K') {
      result = (value - 32) * 5/9 + 273.15;
    } else if (from === 'K' && to === '[degF]') {
      result = (value - 273.15) * 9/5 + 32;
    }
    
    // Mol-mass conversions
    else if (from === 'mol' && to === 'g' && options?.molecularWeight) {
      result = value * options.molecularWeight;
    } else if (from === 'g' && to === 'mol' && options?.molecularWeight) {
      result = value / options.molecularWeight;
    }
    
    // Equivalent conversions
    else if (from === 'mol' && to === 'eq' && options?.charge) {
      result = value * options.charge;
    } else if (from === 'eq' && to === 'mol' && options?.charge) {
      result = value / options.charge;
    }
    
    // Check for missing required options
    else if ((from === 'mol' && to === 'g') || (from === 'g' && to === 'mol')) {
      throw new Error('Molecular weight is required for mol-mass conversion');
    } else if ((from === 'mol' && to === 'eq') || (from === 'eq' && to === 'mol')) {
      throw new Error('Charge is required for equivalent conversion');
    }
    
    return {
      value: result,
      fromUnit: from,
      toUnit: to
    };
  }
}