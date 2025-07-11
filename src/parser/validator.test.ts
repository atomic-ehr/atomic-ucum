import { describe, test, expect, beforeEach } from 'bun:test';
import { UCUMValidator } from './validator';

describe('UCUMValidator', () => {
  let validator: UCUMValidator;

  beforeEach(() => {
    validator = new UCUMValidator();
  });

  describe('validateUnitCode', () => {
    test('should accept valid units', () => {
      const validUnits = ['m', 'g', 's', 'kg', 'L', 'mol', '[H2O]', '[pH]'];
      validUnits.forEach(unit => {
        expect(() => validator.validateUnitCode(unit)).not.toThrow();
      });
    });

    test('should reject H20 instead of H2O', () => {
      expect(() => validator.validateUnitCode('[H20]')).toThrow('Invalid unit: [H20]');
      expect(() => validator.validateUnitCode('kg[H20]')).toThrow('Invalid unit: kg[H20]');
      expect(() => validator.validateUnitCode('cm[H20]')).toThrow('Invalid unit: cm[H20]');
    });

    test('should reject iIU units', () => {
      expect(() => validator.validateUnitCode('[iIU]')).toThrow('Invalid unit: [iIU]');
      expect(() => validator.validateUnitCode('m[iIU]/L')).toThrow('Invalid unit: m[iIU]/L');
      expect(() => validator.validateUnitCode('u[iIU]/mL')).toThrow('Invalid unit: u[iIU]/mL');
    });
  });

  describe('validateAnnotation', () => {
    test('should accept ASCII annotations', () => {
      const validAnnotations = ['note', 'dose', 'time', '123', 'a-b_c'];
      validAnnotations.forEach(annotation => {
        expect(() => validator.validateAnnotation(annotation)).not.toThrow();
      });
    });

    test('should reject non-ASCII characters', () => {
      expect(() => validator.validateAnnotation('錠')).toThrow('Annotation contains non-ASCII characters: {錠}');
      expect(() => validator.validateAnnotation('µ')).toThrow('Annotation contains non-ASCII characters: {µ}');
      expect(() => validator.validateAnnotation('°')).toThrow('Annotation contains non-ASCII characters: {°}');
    });

    test('should reject invalid annotation content', () => {
      expect(() => validator.validateAnnotation('|')).toThrow('Invalid annotation content: {|}');
    });
  });

  describe('validateNumberUnitPattern', () => {
    test('should accept valid patterns', () => {
      expect(validator.validateNumberUnitPattern('5m')).toBe(true);
      expect(validator.validateNumberUnitPattern('10kg')).toBe(true);
      expect(validator.validateNumberUnitPattern('3.14rad')).toBe(true);
    });

    test('should reject time units without operators', () => {
      expect(validator.validateNumberUnitPattern('12h')).toBe(false);
      expect(validator.validateNumberUnitPattern('48h')).toBe(false);
      expect(validator.validateNumberUnitPattern('2d')).toBe(false);
      expect(validator.validateNumberUnitPattern('5wk')).toBe(false);
      expect(validator.validateNumberUnitPattern('3mo')).toBe(false);
      expect(validator.validateNumberUnitPattern('1a')).toBe(false);
    });
  });

  describe('hasInvalidOperators', () => {
    test('should accept valid operators', () => {
      expect(validator.hasInvalidOperators('kg.m/s2')).toBe(false);
      expect(validator.hasInvalidOperators('10*3.m')).toBe(false);
      expect(validator.hasInvalidOperators('(m/s)2')).toBe(false);
    });

    test('should reject plus operator', () => {
      expect(validator.hasInvalidOperators('10+3/ul')).toBe(true);
      expect(validator.hasInvalidOperators('m+s')).toBe(true);
    });

    test('should reject parentheses as annotation delimiters', () => {
      expect(validator.hasInvalidOperators('ug(8.h)')).toBe(true);
      expect(validator.hasInvalidOperators('mg(24.hr)')).toBe(true);
      // But accept valid grouping
      expect(validator.hasInvalidOperators('(m/s)')).toBe(false);
      expect(validator.hasInvalidOperators('kg.(m/s2)')).toBe(false);
    });
  });
});