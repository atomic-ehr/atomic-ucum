// High-performance tokenizer for UCUM expressions

export enum TokenType {
  NUMBER = 'NUMBER',
  UNIT = 'UNIT',
  OPERATOR = 'OPERATOR',
  EXPONENT = 'EXPONENT',
  LPAREN = 'LPAREN',
  RPAREN = 'RPAREN',
  ANNOTATION = 'ANNOTATION',
  SCIENTIFIC_NOTATION = 'SCIENTIFIC_NOTATION',
  EOF = 'EOF'
}

export interface Token {
  type: TokenType;
  value: string;
  position: number;
}

// Character types for fast classification
enum CharType {
  DIGIT = 1,
  LETTER = 2,
  DOT = 3,
  SLASH = 4,
  PLUS = 5,
  MINUS = 6,
  LPAREN = 7,
  RPAREN = 8,
  LBRACKET = 9,
  RBRACKET = 10,
  LBRACE = 11,
  RBRACE = 12,
  UNDERSCORE = 13,
  ASTERISK = 14,
  WHITESPACE = 15,
  OTHER = 16
}

// Pre-computed lookup table for character classification
const CHAR_TYPES = new Uint8Array(128);

// Initialize character type lookup table
function initCharTypes() {
  // Digits
  for (let i = 48; i <= 57; i++) CHAR_TYPES[i] = CharType.DIGIT; // 0-9
  
  // Letters
  for (let i = 65; i <= 90; i++) CHAR_TYPES[i] = CharType.LETTER; // A-Z
  for (let i = 97; i <= 122; i++) CHAR_TYPES[i] = CharType.LETTER; // a-z
  
  // Special characters
  CHAR_TYPES[46] = CharType.DOT; // .
  CHAR_TYPES[47] = CharType.SLASH; // /
  CHAR_TYPES[43] = CharType.PLUS; // +
  CHAR_TYPES[45] = CharType.MINUS; // -
  CHAR_TYPES[40] = CharType.LPAREN; // (
  CHAR_TYPES[41] = CharType.RPAREN; // )
  CHAR_TYPES[91] = CharType.LBRACKET; // [
  CHAR_TYPES[93] = CharType.RBRACKET; // ]
  CHAR_TYPES[123] = CharType.LBRACE; // {
  CHAR_TYPES[125] = CharType.RBRACE; // }
  CHAR_TYPES[95] = CharType.UNDERSCORE; // _
  CHAR_TYPES[42] = CharType.ASTERISK; // *
  
  // Whitespace
  CHAR_TYPES[32] = CharType.WHITESPACE; // space
  CHAR_TYPES[9] = CharType.WHITESPACE; // tab
  CHAR_TYPES[10] = CharType.WHITESPACE; // newline
  CHAR_TYPES[13] = CharType.WHITESPACE; // carriage return
}

initCharTypes();

export class Tokenizer {
  private input: string = '';
  private position: number = 0;
  private length: number = 0;
  
  // Pre-allocated token buffer to avoid allocations
  private tokenBuffer: Token[] = new Array(100);
  private tokenCount: number = 0;
  
  tokenize(input: string): Token[] {
    this.input = input;
    this.position = 0;
    this.length = input.length;
    this.tokenCount = 0;
    
    while (this.position < this.length) {
      this.skipWhitespace();
      if (this.position >= this.length) break;
      
      const token = this.nextToken();
      if (token) {
        if (this.tokenCount >= this.tokenBuffer.length) {
          this.tokenBuffer.push(token);
        } else {
          this.tokenBuffer[this.tokenCount] = token;
        }
        this.tokenCount++;
      }
    }
    
    // Add EOF token
    const eofToken: Token = { type: TokenType.EOF, value: '', position: this.position };
    if (this.tokenCount >= this.tokenBuffer.length) {
      this.tokenBuffer.push(eofToken);
    } else {
      this.tokenBuffer[this.tokenCount] = eofToken;
    }
    this.tokenCount++;
    
    // Return only the used portion of the buffer
    return this.tokenBuffer.slice(0, this.tokenCount);
  }
  
  private skipWhitespace(): void {
    while (this.position < this.length && 
           this.getCharType(this.input.charCodeAt(this.position)) === CharType.WHITESPACE) {
      this.position++;
    }
  }
  
  private getCharType(charCode: number): CharType {
    return charCode < 128 ? (CHAR_TYPES[charCode] ?? CharType.OTHER) : CharType.OTHER;
  }
  
  private nextToken(): Token | null {
    const startPos = this.position;
    const charCode = this.input.charCodeAt(this.position);
    const charType = this.getCharType(charCode);
    
    switch (charType) {
      case CharType.DIGIT:
        return this.readNumber();
        
      case CharType.LETTER:
        return this.readUnit();
        
      case CharType.DOT:
        this.position++;
        // Check if it's a decimal number (.123) but not if it's .10* (scientific notation)
        if (this.position < this.length && 
            this.getCharType(this.input.charCodeAt(this.position)) === CharType.DIGIT) {
          // Look ahead to see if this could be .10*
          const lookaheadPos = this.position;
          let isScientific = false;
          if (this.position + 2 < this.length &&
              this.input[this.position] === '1' && 
              this.input[this.position + 1] === '0' &&
              this.input[this.position + 2] === '*') {
            // Check if there's an exponent after *
            let expPos = this.position + 3;
            if (expPos < this.length) {
              if (this.input[expPos] === '+' || this.input[expPos] === '-') {
                expPos++;
              }
              if (expPos < this.length && 
                  this.getCharType(this.input.charCodeAt(expPos)) === CharType.DIGIT) {
                isScientific = true;
              }
            }
          }
          
          if (!isScientific) {
            this.position = startPos; // Reset
            return this.readNumber();
          }
        }
        return { type: TokenType.OPERATOR, value: '.', position: startPos };
        
      case CharType.SLASH:
        this.position++;
        return { type: TokenType.OPERATOR, value: '/', position: startPos };
        
      case CharType.LPAREN:
        this.position++;
        return { type: TokenType.LPAREN, value: '(', position: startPos };
        
      case CharType.RPAREN:
        this.position++;
        return { type: TokenType.RPAREN, value: ')', position: startPos };
        
      case CharType.LBRACKET:
        return this.readArbitraryUnit();
        
      case CharType.LBRACE:
        return this.readAnnotation();
        
      case CharType.ASTERISK:
        this.position++;
        return { type: TokenType.OPERATOR, value: '*', position: startPos };
        
      case CharType.PLUS:
      case CharType.MINUS:
        // Could be part of exponent or standalone
        if (this.position + 1 < this.length &&
            this.getCharType(this.input.charCodeAt(this.position + 1)) === CharType.DIGIT) {
          return this.readExponent();
        }
        this.position++;
        return { type: TokenType.OPERATOR, value: this.input[startPos] || '', position: startPos };
        
      default:
        // Handle other characters
        if (charCode === 37) { // %
          this.position++;
          return { type: TokenType.UNIT, value: '%', position: startPos };
        }
        // Skip unknown characters
        this.position++;
        return null;
    }
  }
  
  private readNumber(): Token {
    const startPos = this.position;
    
    // Read integer part
    while (this.position < this.length && 
           this.getCharType(this.input.charCodeAt(this.position)) === CharType.DIGIT) {
      this.position++;
    }
    
    // Check for UCUM scientific notation (10*n pattern)
    if (this.position - startPos === 2 && 
        this.input.substring(startPos, this.position) === '10' &&
        this.position < this.length && 
        this.input[this.position] === '*') {
      
      const asteriskPos = this.position;
      this.position++; // consume *
      
      // Check for optional sign and digits
      let hasExponent = false;
      if (this.position < this.length) {
        let expPos = this.position;
        if (this.input[expPos] === '+' || this.input[expPos] === '-') {
          expPos++;
        }
        if (expPos < this.length && 
            this.getCharType(this.input.charCodeAt(expPos)) === CharType.DIGIT) {
          this.position = expPos;
          while (this.position < this.length && 
                 this.getCharType(this.input.charCodeAt(this.position)) === CharType.DIGIT) {
            this.position++;
          }
          hasExponent = true;
        }
      }
      
      if (hasExponent) {
        return {
          type: TokenType.SCIENTIFIC_NOTATION,
          value: this.input.substring(startPos, this.position),
          position: startPos
        };
      } else {
        // Not scientific notation, reset to after "10"
        this.position = asteriskPos;
      }
    }
    
    // Read decimal part if present
    if (this.position < this.length && this.input[this.position] === '.') {
      const nextPos = this.position + 1;
      if (nextPos < this.length && 
          this.getCharType(this.input.charCodeAt(nextPos)) === CharType.DIGIT) {
        this.position = nextPos;
        while (this.position < this.length && 
               this.getCharType(this.input.charCodeAt(this.position)) === CharType.DIGIT) {
          this.position++;
        }
      }
    }
    
    // Read scientific notation if present (e.g., 1e6, 1E-3)
    if (this.position < this.length && 
        (this.input[this.position] === 'e' || this.input[this.position] === 'E')) {
      const nextPos = this.position + 1;
      if (nextPos < this.length) {
        let expPos = nextPos;
        if (this.input[expPos] === '+' || this.input[expPos] === '-') {
          expPos++;
        }
        if (expPos < this.length && 
            this.getCharType(this.input.charCodeAt(expPos)) === CharType.DIGIT) {
          this.position = expPos;
          while (this.position < this.length && 
                 this.getCharType(this.input.charCodeAt(this.position)) === CharType.DIGIT) {
            this.position++;
          }
        }
      }
    }
    
    return {
      type: TokenType.NUMBER,
      value: this.input.substring(startPos, this.position),
      position: startPos
    };
  }
  
  private readUnit(): Token {
    const startPos = this.position;
    
    // Read unit characters (letters, digits after first letter, underscore)
    while (this.position < this.length) {
      const charType = this.getCharType(this.input.charCodeAt(this.position));
      if (charType === CharType.LETTER || 
          charType === CharType.DIGIT ||
          charType === CharType.UNDERSCORE ||
          (charType === CharType.ASTERISK && this.position > startPos)) {
        this.position++;
      } else {
        break;
      }
    }
    
    // Check if this is followed by an exponent
    const value = this.input.substring(startPos, this.position);
    
    // Check for immediate exponent (no space)
    if (this.position < this.length) {
      const nextChar = this.input[this.position];
      const nextCharType = this.getCharType(this.input.charCodeAt(this.position));
      
      if (nextCharType === CharType.DIGIT || 
          (nextChar === '-' && this.position + 1 < this.length && 
           this.getCharType(this.input.charCodeAt(this.position + 1)) === CharType.DIGIT)) {
        // This is a unit with exponent, return just the unit part
        return { type: TokenType.UNIT, value, position: startPos };
      }
    }
    
    return { type: TokenType.UNIT, value, position: startPos };
  }
  
  private readExponent(): Token {
    const startPos = this.position;
    
    // Read optional sign
    if (this.input[this.position] === '+' || this.input[this.position] === '-') {
      this.position++;
    }
    
    // Read digits
    while (this.position < this.length && 
           this.getCharType(this.input.charCodeAt(this.position)) === CharType.DIGIT) {
      this.position++;
    }
    
    return {
      type: TokenType.EXPONENT,
      value: this.input.substring(startPos, this.position),
      position: startPos
    };
  }
  
  private readArbitraryUnit(): Token {
    const startPos = this.position;
    this.position++; // Skip [
    
    while (this.position < this.length && this.input[this.position] !== ']') {
      this.position++;
    }
    
    if (this.position < this.length) {
      this.position++; // Skip ]
    }
    
    return {
      type: TokenType.UNIT,
      value: this.input.substring(startPos, this.position),
      position: startPos
    };
  }
  
  private readAnnotation(): Token {
    const startPos = this.position;
    this.position++; // Skip {
    
    while (this.position < this.length && this.input[this.position] !== '}') {
      this.position++;
    }
    
    if (this.position < this.length) {
      this.position++; // Skip }
    }
    
    return {
      type: TokenType.ANNOTATION,
      value: this.input.substring(startPos + 1, this.position - 1), // Exclude braces
      position: startPos
    };
  }
}