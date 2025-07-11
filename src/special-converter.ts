import type { SpecialConversionFunction, ConversionOptions } from './types';

export class SpecialConverter {
  private converters: Map<string, SpecialConversionFunction>;
  
  constructor() {
    this.converters = new Map();
    this.registerBuiltInConverters();
  }
  
  register(fromUnit: string, toUnit: string, converter: SpecialConversionFunction): void {
    const key = this.makeKey(fromUnit, toUnit);
    this.converters.set(key, converter);
  }
  
  canConvert(fromUnit: string, toUnit: string): boolean {
    const key = this.makeKey(fromUnit, toUnit);
    return this.converters.has(key);
  }
  
  convert(value: number, fromUnit: string, toUnit: string, options?: ConversionOptions): number | null {
    const key = this.makeKey(fromUnit, toUnit);
    const converter = this.converters.get(key);
    
    if (!converter) {
      return null;
    }
    
    return converter(value, fromUnit, toUnit, options);
  }
  
  private makeKey(fromUnit: string, toUnit: string): string {
    return `${fromUnit}→${toUnit}`;
  }
  
  private registerBuiltInConverters(): void {
    // Temperature conversions
    this.registerTemperatureConverters();
    
    // Logarithmic conversions
    this.registerLogarithmicConverters();
    
    // Molecular conversions
    this.registerMolecularConverters();
  }
  
  private registerTemperatureConverters(): void {
    // Celsius to Kelvin
    this.register('Cel', 'K', (value) => value + 273.15);
    this.register('K', 'Cel', (value) => value - 273.15);
    
    // Celsius to Fahrenheit
    this.register('Cel', '[degF]', (value) => value * 9/5 + 32);
    this.register('[degF]', 'Cel', (value) => (value - 32) * 5/9);
    
    // Fahrenheit to Kelvin
    this.register('[degF]', 'K', (value) => (value - 32) * 5/9 + 273.15);
    this.register('K', '[degF]', (value) => (value - 273.15) * 9/5 + 32);
    
    // Réaumur conversions
    // Réaumur to Celsius: °C = °Ré × 5/4
    this.register('[degRe]', 'Cel', (value) => value * 5/4);
    this.register('Cel', '[degRe]', (value) => value * 4/5);
    
    // Réaumur to Kelvin: K = °Ré × 5/4 + 273.15
    this.register('[degRe]', 'K', (value) => value * 5/4 + 273.15);
    this.register('K', '[degRe]', (value) => (value - 273.15) * 4/5);
    
    // Réaumur to Fahrenheit: °F = °Ré × 9/4 + 32
    this.register('[degRe]', '[degF]', (value) => value * 9/4 + 32);
    this.register('[degF]', '[degRe]', (value) => (value - 32) * 4/9);
  }
  
  private registerLogarithmicConverters(): void {
    // pH conversions (pH is -log10[H+] where [H+] is in mol/L)
    // pH to mol/L
    this.register('pH', 'mol/L', (value) => Math.pow(10, -value));
    this.register('mol/L', 'pH', (value) => {
      const result = -Math.log10(value);
      // Handle -0 case
      return result === 0 ? 0 : result;
    });
    
    // Bel and Neper conversions
    // 1 B = ln(10)/2 ≈ 1.151 Np
    this.register('B', 'Np', (value) => value * Math.log(10) / 2);
    this.register('Np', 'B', (value) => value * 2 / Math.log(10));
    
    // Decibel conversions (1 dB = 0.1 B)
    this.register('dB', 'B', (value) => value / 10);
    this.register('B', 'dB', (value) => value * 10);
    
    this.register('dB', 'Np', (value) => value * Math.log(10) / 20);
    this.register('Np', 'dB', (value) => value * 20 / Math.log(10));
  }
  
  private registerMolecularConverters(): void {
    // Mol to gram conversions (requires molecular weight)
    this.register('mol', 'g', (value, _, __, options) => {
      if (!options?.molecularWeight) {
        throw new Error('Molecular weight is required for mol to g conversion');
      }
      return value * options.molecularWeight;
    });
    
    this.register('g', 'mol', (value, _, __, options) => {
      if (!options?.molecularWeight) {
        throw new Error('Molecular weight is required for g to mol conversion');
      }
      return value / options.molecularWeight;
    });
    
    // Equivalent conversions (requires charge)
    this.register('mol', 'eq', (value, _, __, options) => {
      if (!options?.charge) {
        throw new Error('Charge is required for mol to eq conversion');
      }
      return value * options.charge;
    });
    
    this.register('eq', 'mol', (value, _, __, options) => {
      if (!options?.charge) {
        throw new Error('Charge is required for eq to mol conversion');
      }
      return value / options.charge;
    });
  }
  
  // Helper method to check if any unit needs special conversion
  isSpecialUnit(unit: string): boolean {
    // Check if unit appears as a complete unit in any converter key
    for (const key of this.converters.keys()) {
      const [from, to] = key.split('→');
      if (from === unit || to === unit) {
        return true;
      }
    }
    return false;
  }
  
  // Get all registered special conversion pairs
  getRegisteredPairs(): Array<[string, string]> {
    return Array.from(this.converters.keys()).map(key => {
      const parts = key.split('→');
      return [parts[0]!, parts[1]!];
    });
  }
}