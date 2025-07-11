import type { ConversionResult, ConversionOptions, ParsedUnit, DimensionVector } from './types';
import { UCUMParser } from './parser';
import { UnitRegistry } from './unit-registry';
import { DimensionCalculator } from './generated/dimension-analyzer';
import { SpecialConverter } from './special-converter';

export class UCUMConverter {
  private parser: UCUMParser;
  private registry: UnitRegistry;
  private specialConverter: SpecialConverter;
  
  constructor() {
    this.parser = new UCUMParser();
    this.registry = UnitRegistry.getInstance();
    this.specialConverter = new SpecialConverter();
  }
  
  convert(value: number, from: string, to: string, options?: ConversionOptions): ConversionResult {
    // Try special conversion first
    const specialResult = this.specialConverter.convert(value, from, to, options);
    if (specialResult !== null) {
      return {
        value: specialResult,
        fromUnit: from,
        toUnit: to
      };
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
    // Check special conversions first
    if (this.specialConverter.canConvert(from, to)) {
      return true;
    }
    
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
}