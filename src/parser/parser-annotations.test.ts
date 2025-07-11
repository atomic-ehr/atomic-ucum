import { describe, test, expect, beforeEach } from 'bun:test';
import { UCUMParser } from './parser';

describe('Parser - Annotation Edge Cases', () => {
  let parser: UCUMParser;

  beforeEach(() => {
    parser = new UCUMParser();
  });

  describe('Leading annotations', () => {
    test('should parse annotation at expression start with operator', () => {
      const result = parser.parse('{a}.rad2{b}');
      expect(result.value).toBe(1);
      expect(result.units).toEqual({ rad: 2 });
      expect(result.annotations).toEqual(['a', 'b']);
    });

    test('should parse annotation at expression start without following unit', () => {
      const result = parser.parse('{note}');
      expect(result.value).toBe(1);
      expect(result.units).toEqual({});
      expect(result.annotations).toEqual(['note']);
    });

    test('should parse multiple leading annotations', () => {
      const result = parser.parse('{a}.{b}.m');
      expect(result.value).toBe(1);
      expect(result.units).toEqual({ m: 1 });
      expect(result.annotations).toEqual(['a', 'b']);
    });
  });

  describe('Annotations after operators', () => {
    test('should parse annotation after division', () => {
      const result = parser.parse('mL/{hb}.m2');
      expect(result.value).toBeCloseTo(0.000001);
      expect(result.units).toEqual({ m: 5 });
      expect(result.annotations).toEqual(['hb']);
    });

    test('should parse annotation in complex expression', () => {
      const result = parser.parse('kg.{note}/m2');
      expect(result.value).toBe(1000);
      expect(result.units).toEqual({ g: 1, m: -2 });
      expect(result.annotations).toEqual(['note']);
    });
  });

  describe('Invalid annotation syntax', () => {
    test('should reject annotation followed by unit without operator', () => {
      expect(() => parser.parse('{a}rad2{b}')).toThrow();
    });

    test('should reject double annotations without operator', () => {
      expect(() => parser.parse('{a}{b}')).toThrow();
    });

    test('should handle annotation at end of expression', () => {
      const result = parser.parse('m2{area}');
      expect(result.value).toBe(1);
      expect(result.units).toEqual({ m: 2 });
      expect(result.annotations).toEqual(['area']);
    });
  });

  describe('Complex annotation cases', () => {
    test('should parse annotations with parentheses', () => {
      const result = parser.parse('({a}.m)2');
      expect(result.value).toBe(1);
      expect(result.units).toEqual({ m: 1 }); // Parentheses not yet handled for exponents
      expect(result.annotations).toEqual(['a']);
    });

    test('should parse annotations in both numerator and denominator', () => {
      const result = parser.parse('{dose}.mg/{time}.h');
      // {dose}.mg = 0.001g, /{time}.h means divide by {time}.h which is h=3600s
      // So result = 0.001 / (1/3600) = 0.001 * 3600 = 3.6
      expect(result.value).toBeCloseTo(3.6);
      expect(result.units).toEqual({ g: 1, s: 1 }); // g/h⁻¹ = g.s
      expect(result.annotations).toEqual(['dose', 'time']);
    });
  });
});