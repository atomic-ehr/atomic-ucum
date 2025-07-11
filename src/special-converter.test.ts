import { describe, it, expect, beforeEach } from 'bun:test';
import { SpecialConverter } from './special-converter';

describe('SpecialConverter', () => {
  let converter: SpecialConverter;
  
  beforeEach(() => {
    converter = new SpecialConverter();
  });
  
  describe('Temperature Conversions', () => {
    describe('Celsius to Fahrenheit', () => {
      it('should convert 0°C to 32°F', () => {
        const result = converter.convert(0, 'Cel', '[degF]');
        expect(result).toBe(32);
      });
      
      it('should convert 100°C to 212°F', () => {
        const result = converter.convert(100, 'Cel', '[degF]');
        expect(result).toBe(212);
      });
      
      it('should convert 37°C to 98.6°F', () => {
        const result = converter.convert(37, 'Cel', '[degF]');
        expect(result).toBeCloseTo(98.6, 1);
      });
      
      it('should convert negative temperatures', () => {
        const result = converter.convert(-40, 'Cel', '[degF]');
        expect(result).toBe(-40); // -40°C = -40°F
      });
    });
    
    describe('Fahrenheit to Celsius', () => {
      it('should convert 32°F to 0°C', () => {
        const result = converter.convert(32, '[degF]', 'Cel');
        expect(result).toBe(0);
      });
      
      it('should convert 212°F to 100°C', () => {
        const result = converter.convert(212, '[degF]', 'Cel');
        expect(result).toBe(100);
      });
      
      it('should convert 98.6°F to 37°C', () => {
        const result = converter.convert(98.6, '[degF]', 'Cel');
        expect(result).toBeCloseTo(37, 1);
      });
    });
    
    describe('Celsius to Kelvin', () => {
      it('should convert 0°C to 273.15K', () => {
        const result = converter.convert(0, 'Cel', 'K');
        expect(result).toBe(273.15);
      });
      
      it('should convert 100°C to 373.15K', () => {
        const result = converter.convert(100, 'Cel', 'K');
        expect(result).toBe(373.15);
      });
      
      it('should convert -273.15°C to 0K', () => {
        const result = converter.convert(-273.15, 'Cel', 'K');
        expect(result).toBe(0);
      });
    });
    
    describe('Kelvin to Celsius', () => {
      it('should convert 273.15K to 0°C', () => {
        const result = converter.convert(273.15, 'K', 'Cel');
        expect(result).toBe(0);
      });
      
      it('should convert 373.15K to 100°C', () => {
        const result = converter.convert(373.15, 'K', 'Cel');
        expect(result).toBe(100);
      });
      
      it('should convert 0K to -273.15°C', () => {
        const result = converter.convert(0, 'K', 'Cel');
        expect(result).toBe(-273.15);
      });
    });
    
    describe('Fahrenheit to Kelvin', () => {
      it('should convert 32°F to 273.15K', () => {
        const result = converter.convert(32, '[degF]', 'K');
        expect(result).toBe(273.15);
      });
      
      it('should convert 212°F to 373.15K', () => {
        const result = converter.convert(212, '[degF]', 'K');
        expect(result).toBe(373.15);
      });
    });
    
    describe('Kelvin to Fahrenheit', () => {
      it('should convert 273.15K to 32°F', () => {
        const result = converter.convert(273.15, 'K', '[degF]');
        expect(result).toBe(32);
      });
      
      it('should convert 373.15K to 212°F', () => {
        const result = converter.convert(373.15, 'K', '[degF]');
        expect(result).toBe(212);
      });
    });
  });
  
  describe('canConvert', () => {
    it('should return true for registered conversions', () => {
      expect(converter.canConvert('Cel', 'K')).toBe(true);
      expect(converter.canConvert('K', 'Cel')).toBe(true);
      expect(converter.canConvert('Cel', '[degF]')).toBe(true);
      expect(converter.canConvert('[degF]', 'Cel')).toBe(true);
      expect(converter.canConvert('K', '[degF]')).toBe(true);
      expect(converter.canConvert('[degF]', 'K')).toBe(true);
    });
    
    it('should return false for unregistered conversions', () => {
      expect(converter.canConvert('m', 'kg')).toBe(false);
      expect(converter.canConvert('s', 'Hz')).toBe(false);
    });
  });
  
  describe('isSpecialUnit', () => {
    it('should identify special units', () => {
      expect(converter.isSpecialUnit('Cel')).toBe(true);
      expect(converter.isSpecialUnit('K')).toBe(true);
      expect(converter.isSpecialUnit('[degF]')).toBe(true);
      expect(converter.isSpecialUnit('pH')).toBe(true);
      expect(converter.isSpecialUnit('B')).toBe(true);
      expect(converter.isSpecialUnit('Np')).toBe(true);
    });
    
    it('should return false for regular units', () => {
      expect(converter.isSpecialUnit('m')).toBe(false);
      expect(converter.isSpecialUnit('kg')).toBe(false);
      expect(converter.isSpecialUnit('s')).toBe(false);
    });
  });
  
  describe('Logarithmic Conversions', () => {
    describe('pH conversions', () => {
      it('should convert pH to mol/L', () => {
        // pH 7 = 10^-7 mol/L
        const result = converter.convert(7, 'pH', 'mol/L');
        expect(result).toBeCloseTo(1e-7, 10);
        
        // pH 0 = 1 mol/L
        const result2 = converter.convert(0, 'pH', 'mol/L');
        expect(result2).toBe(1);
        
        // pH 14 = 10^-14 mol/L
        const result3 = converter.convert(14, 'pH', 'mol/L');
        expect(result3).toBeCloseTo(1e-14, 20);
      });
      
      it('should convert mol/L to pH', () => {
        // 10^-7 mol/L = pH 7
        const result = converter.convert(1e-7, 'mol/L', 'pH');
        expect(result).toBeCloseTo(7, 5);
        
        // 1 mol/L = pH 0
        const result2 = converter.convert(1, 'mol/L', 'pH');
        expect(result2).toBe(0);
        
        // 10^-14 mol/L = pH 14
        const result3 = converter.convert(1e-14, 'mol/L', 'pH');
        expect(result3).toBeCloseTo(14, 5);
      });
    });
    
    describe('Bel and Neper conversions', () => {
      it('should convert Bel to Neper', () => {
        const result = converter.convert(1, 'B', 'Np');
        expect(result).toBeCloseTo(1.151, 3);
        
        const result2 = converter.convert(2, 'B', 'Np');
        expect(result2).toBeCloseTo(2.303, 3);
      });
      
      it('should convert Neper to Bel', () => {
        const result = converter.convert(1.151, 'Np', 'B');
        expect(result).toBeCloseTo(1, 3);
        
        const result2 = converter.convert(2.303, 'Np', 'B');
        expect(result2).toBeCloseTo(2, 3);
      });
    });
    
    describe('Decibel conversions', () => {
      it('should convert dB to B', () => {
        const result = converter.convert(10, 'dB', 'B');
        expect(result).toBe(1);
        
        const result2 = converter.convert(20, 'dB', 'B');
        expect(result2).toBe(2);
      });
      
      it('should convert B to dB', () => {
        const result = converter.convert(1, 'B', 'dB');
        expect(result).toBe(10);
        
        const result2 = converter.convert(2, 'B', 'dB');
        expect(result2).toBe(20);
      });
      
      it('should convert dB to Np', () => {
        const result = converter.convert(10, 'dB', 'Np');
        expect(result).toBeCloseTo(1.151, 3);
      });
      
      it('should convert Np to dB', () => {
        const result = converter.convert(1.151, 'Np', 'dB');
        expect(result).toBeCloseTo(10, 1);
      });
    });
  });
  
  describe('Molecular Conversions', () => {
    describe('mol to g conversions', () => {
      it('should convert mol to g with molecular weight', () => {
        // Water: H2O = 18 g/mol
        const result = converter.convert(1, 'mol', 'g', { molecularWeight: 18 });
        expect(result).toBe(18);
        
        const result2 = converter.convert(2.5, 'mol', 'g', { molecularWeight: 18 });
        expect(result2).toBe(45);
      });
      
      it('should convert g to mol with molecular weight', () => {
        const result = converter.convert(18, 'g', 'mol', { molecularWeight: 18 });
        expect(result).toBe(1);
        
        const result2 = converter.convert(45, 'g', 'mol', { molecularWeight: 18 });
        expect(result2).toBe(2.5);
      });
      
      it('should throw error without molecular weight', () => {
        expect(() => converter.convert(1, 'mol', 'g')).toThrow('Molecular weight is required');
        expect(() => converter.convert(1, 'g', 'mol')).toThrow('Molecular weight is required');
      });
    });
    
    describe('equivalent conversions', () => {
      it('should convert mol to eq with charge', () => {
        // Ca2+ has charge 2
        const result = converter.convert(1, 'mol', 'eq', { charge: 2 });
        expect(result).toBe(2);
        
        // Al3+ has charge 3
        const result2 = converter.convert(1, 'mol', 'eq', { charge: 3 });
        expect(result2).toBe(3);
      });
      
      it('should convert eq to mol with charge', () => {
        const result = converter.convert(2, 'eq', 'mol', { charge: 2 });
        expect(result).toBe(1);
        
        const result2 = converter.convert(3, 'eq', 'mol', { charge: 3 });
        expect(result2).toBe(1);
      });
      
      it('should throw error without charge', () => {
        expect(() => converter.convert(1, 'mol', 'eq')).toThrow('Charge is required');
        expect(() => converter.convert(1, 'eq', 'mol')).toThrow('Charge is required');
      });
    });
  });
});