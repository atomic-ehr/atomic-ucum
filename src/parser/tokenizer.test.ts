import { describe, test, expect } from 'bun:test';
import { Tokenizer, TokenType } from './tokenizer';

describe('Tokenizer - Scientific Notation', () => {
  const tokenizer = new Tokenizer();

  describe('Basic scientific notation', () => {
    test('should tokenize 10*3', () => {
      const tokens = tokenizer.tokenize('10*3');
      expect(tokens).toHaveLength(2); // SCIENTIFIC_NOTATION + EOF
      expect(tokens[0]).toEqual({
        type: TokenType.SCIENTIFIC_NOTATION,
        value: '10*3',
        position: 0
      });
    });

    test('should tokenize 10*-7', () => {
      const tokens = tokenizer.tokenize('10*-7');
      expect(tokens).toHaveLength(2);
      expect(tokens[0]).toEqual({
        type: TokenType.SCIENTIFIC_NOTATION,
        value: '10*-7',
        position: 0
      });
    });

    test('should tokenize 10*+3', () => {
      const tokens = tokenizer.tokenize('10*+3');
      expect(tokens).toHaveLength(2);
      expect(tokens[0]).toEqual({
        type: TokenType.SCIENTIFIC_NOTATION,
        value: '10*+3',
        position: 0
      });
    });

    test('should tokenize 10*23', () => {
      const tokens = tokenizer.tokenize('10*23');
      expect(tokens).toHaveLength(2);
      expect(tokens[0]).toEqual({
        type: TokenType.SCIENTIFIC_NOTATION,
        value: '10*23',
        position: 0
      });
    });
  });

  describe('Scientific notation in expressions', () => {
    test('should tokenize 10*3/ul', () => {
      const tokens = tokenizer.tokenize('10*3/ul');
      expect(tokens[0]).toEqual({
        type: TokenType.SCIENTIFIC_NOTATION,
        value: '10*3',
        position: 0
      });
      expect(tokens[1]).toEqual({
        type: TokenType.OPERATOR,
        value: '/',
        position: 4
      });
      expect(tokens[2]).toEqual({
        type: TokenType.UNIT,
        value: 'ul',
        position: 5
      });
    });

    test('should tokenize 4.[pi].10*-7.N', () => {
      const tokens = tokenizer.tokenize('4.[pi].10*-7.N');
      expect(tokens[0]).toEqual({
        type: TokenType.NUMBER,
        value: '4',
        position: 0
      });
      expect(tokens[1]).toEqual({
        type: TokenType.OPERATOR,
        value: '.',
        position: 1
      });
      expect(tokens[2]).toEqual({
        type: TokenType.UNIT,
        value: '[pi]',
        position: 2
      });
      expect(tokens[3]).toEqual({
        type: TokenType.OPERATOR,
        value: '.',
        position: 6
      });
      expect(tokens[4]).toEqual({
        type: TokenType.SCIENTIFIC_NOTATION,
        value: '10*-7',
        position: 7
      });
      expect(tokens[5]).toEqual({
        type: TokenType.OPERATOR,
        value: '.',
        position: 12
      });
      expect(tokens[6]).toEqual({
        type: TokenType.UNIT,
        value: 'N',
        position: 13
      });
    });
  });

  describe('Not scientific notation', () => {
    test('should not tokenize 20*3 as scientific notation', () => {
      const tokens = tokenizer.tokenize('20*3');
      expect(tokens[0]).toEqual({
        type: TokenType.NUMBER,
        value: '20',
        position: 0
      });
      expect(tokens[1]).toEqual({
        type: TokenType.OPERATOR,
        value: '*',
        position: 2
      });
      expect(tokens[2]).toEqual({
        type: TokenType.NUMBER,
        value: '3',
        position: 3
      });
    });

    test('should handle 10* without exponent', () => {
      const tokens = tokenizer.tokenize('10*m');
      expect(tokens[0]).toEqual({
        type: TokenType.NUMBER,
        value: '10',
        position: 0
      });
      expect(tokens[1]).toEqual({
        type: TokenType.OPERATOR,
        value: '*',
        position: 2
      });
      expect(tokens[2]).toEqual({
        type: TokenType.UNIT,
        value: 'm',
        position: 3
      });
    });
  });
});