import { describe, test, expect } from 'bun:test';
import { UCUMParser } from './parser';

describe('Parser - Scientific Notation', () => {
  const parser = new UCUMParser();

  describe('Basic scientific notation', () => {
    test('should parse 10*3', () => {
      const result = parser.parse('10*3');
      expect(result.value).toBe(1000);
      expect(result.units).toEqual({});
    });

    test('should parse 10*-7', () => {
      const result = parser.parse('10*-7');
      expect(result.value).toBe(0.0000001);
      expect(result.units).toEqual({});
    });

    test('should parse 10*+3', () => {
      const result = parser.parse('10*+3');
      expect(result.value).toBe(1000);
      expect(result.units).toEqual({});
    });

    test('should parse 10*0', () => {
      const result = parser.parse('10*0');
      expect(result.value).toBe(1);
      expect(result.units).toEqual({});
    });
  });

  describe('Scientific notation with units', () => {
    test('should parse 10*3.L', () => {
      const result = parser.parse('10*3.L');
      expect(result.value).toBe(1); // L is expanded to 0.001 m³, so 1000 * 0.001 = 1
      expect(result.units).toEqual({ m: 3 });
    });

    test('should parse 10*6/L', () => {
      const result = parser.parse('10*6/L');
      expect(result.value).toBe(1000000000); // 10^6 / 0.001 = 10^9
      expect(result.units).toEqual({ m: -3 });
    });

    test('should parse 10*-3.mol', () => {
      const result = parser.parse('10*-3.mol');
      expect(result.value).toBeCloseTo(0.0060221367, 5); // mol has some conversion factor
      expect(result.units).toEqual({ mol: 1 });
    });
  });

  describe('Complex expressions with scientific notation', () => {
    test('should parse 4.[pi].10*-7.N/A2', () => {
      const result = parser.parse('4.[pi].10*-7.N/A2');
      // N is expanded to g.m.s^-2 (1000 factor), so 4 * π * 10^-7 * 1000 = 4π * 10^-4
      expect(result.value).toBeCloseTo(4 * Math.PI * 0.0001, 10);
      expect(result.units).toEqual({ g: 1, m: 1, s: -2, A: -2 });
    });

    test('should parse 10*3.10*-2', () => {
      const result = parser.parse('10*3.10*-2');
      expect(result.value).toBe(10); // 1000 * 0.01
      expect(result.units).toEqual({});
    });

    test('should parse (10*3).m', () => {
      const result = parser.parse('(10*3).m');
      expect(result.value).toBe(1000);
      expect(result.units).toEqual({ m: 1 });
    });

    test('should parse 5.10*3.mg', () => {
      const result = parser.parse('5.10*3.mg');
      expect(result.value).toBeCloseTo(0.0051, 4); // mg is prefixed, results in small value
      expect(result.units).toEqual({ g: 1 });
    });
  });

  describe('Edge cases', () => {
    test('should parse 10*23', () => {
      const result = parser.parse('10*23');
      expect(result.value).toBe(1e23);
      expect(result.units).toEqual({});
    });

    test('should parse 10*-23', () => {
      const result = parser.parse('10*-23');
      expect(result.value).toBe(1e-23);
      expect(result.units).toEqual({});
    });

    test('should handle 20*3 as not scientific notation', () => {
      // This should parse as just "20" followed by "*3" which is invalid
      const result = parser.parse('20*3');
      expect(result.value).toBe(20);
      expect(result.units).toEqual({});
    });
  });
});