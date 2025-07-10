// Generated dimension analyzer for UCUM units
// DO NOT EDIT MANUALLY - This file is auto-generated

export type DimensionVector = [number, number, number, number, number, number, number];

/**
 * Dimension indices:
 * 0: Length (L)
 * 1: Mass (M)
 * 2: Time (T)
 * 3: Electric Current (I)
 * 4: Temperature (Θ)
 * 5: Amount of Substance (N)
 * 6: Luminous Intensity (J)
 */

export const BASE_DIMENSIONS: Record<string, DimensionVector> = {
  'm': [1, 0, 0, 0, 0, 0, 0],
  'g': [0, 1, 0, 0, 0, 0, 0],
  's': [0, 0, 1, 0, 0, 0, 0],
  'A': [0, 0, 0, 1, 0, 0, 0],
  'K': [0, 0, 0, 0, 1, 0, 0],
  'mol': [0, 0, 0, 0, 0, 1, 0],
  'cd': [0, 0, 0, 0, 0, 0, 1],
  'rad': [0, 0, 0, 0, 0, 0, 0],
  'sr': [0, 0, 0, 0, 0, 0, 0],
  '10*': [0, 0, 0, 0, 0, 0, 0],
  '10^': [0, 0, 0, 0, 0, 0, 0],
  '[pi]': [0, 0, 0, 0, 0, 0, 0],
  '%': [0, 0, 0, 0, 0, 0, 0],
  '[ppth]': [0, 0, 0, 0, 0, 0, 0],
  '[ppm]': [0, 0, 0, 0, 0, 0, 0],
  '[ppb]': [0, 0, 0, 0, 0, 0, 0],
  '[pptr]': [0, 0, 0, 0, 0, 0, 0],
};

export const DERIVED_DIMENSIONS: Record<string, { expression: string; dimension: DimensionVector }> = {
  'N': {
    expression: 'kg.m/s2',
    dimension: [1, 1, -2, 0, 0, 0, 0]
  },
  'Pa': {
    expression: 'N/m2',
    dimension: [-1, 1, -2, 0, 0, 0, 0]
  },
  'bar': {
    expression: '100000.Pa',
    dimension: [-1, 1, -2, 0, 0, 0, 0]
  },
  'atm': {
    expression: '101325.Pa',
    dimension: [-1, 1, -2, 0, 0, 0, 0]
  },
  'J': {
    expression: 'N.m',
    dimension: [2, 1, -2, 0, 0, 0, 0]
  },
  'cal': {
    expression: '4.184.J',
    dimension: [2, 1, -2, 0, 0, 0, 0]
  },
  'eV': {
    expression: '1.60217733e-19.J',
    dimension: [2, 1, -2, 0, 0, 0, 0]
  },
  'W': {
    expression: 'J/s',
    dimension: [2, 1, -3, 0, 0, 0, 0]
  },
  'C': {
    expression: 'A.s',
    dimension: [0, 0, 1, 1, 0, 0, 0]
  },
  'V': {
    expression: 'J/C',
    dimension: [2, 1, -3, -1, 0, 0, 0]
  },
  'F': {
    expression: 'C/V',
    dimension: [-2, -1, 4, 2, 0, 0, 0]
  },
  'Ohm': {
    expression: 'V/A',
    dimension: [2, 1, -3, -2, 0, 0, 0]
  },
  'S': {
    expression: '1/Ohm',
    dimension: [-2, -1, 3, 2, 0, 0, 0]
  },
  'Wb': {
    expression: 'V.s',
    dimension: [2, 1, -2, -1, 0, 0, 0]
  },
  'T': {
    expression: 'Wb/m2',
    dimension: [0, 1, -2, -1, 0, 0, 0]
  },
  'H': {
    expression: 'Wb/A',
    dimension: [2, 1, -2, -2, 0, 0, 0]
  },
  'Hz': {
    expression: '1/s',
    dimension: [0, 0, -1, 0, 0, 0, 0]
  },
  'Bq': {
    expression: 'Hz',
    dimension: [0, 0, -1, 0, 0, 0, 0]
  },
  'lm': {
    expression: 'cd.sr',
    dimension: [0, 0, 0, 0, 0, 0, 1]
  },
  'lx': {
    expression: 'lm/m2',
    dimension: [-2, 0, 0, 0, 0, 0, 1]
  },
  'Gy': {
    expression: 'J/kg',
    dimension: [2, 0, -2, 0, 0, 0, 0]
  },
  'Sv': {
    expression: 'J/kg',
    dimension: [2, 0, -2, 0, 0, 0, 0]
  },
  'kat': {
    expression: 'mol/s',
    dimension: [0, 0, -1, 0, 0, 1, 0]
  },
  'm2': {
    expression: 'm.m',
    dimension: [2, 0, 0, 0, 0, 0, 0]
  },
  'm3': {
    expression: 'm.m.m',
    dimension: [3, 0, 0, 0, 0, 0, 0]
  },
  'L': {
    expression: 'dm3',
    dimension: [3, 0, 0, 0, 0, 0, 0]
  },
  'm/s': {
    expression: 'm/s',
    dimension: [1, 0, -1, 0, 0, 0, 0]
  },
  'm/s2': {
    expression: 'm/s2',
    dimension: [1, 0, -2, 0, 0, 0, 0]
  },
};


export class DimensionCalculator {
  /**
   * Add two dimension vectors
   */
  static add(a: DimensionVector, b: DimensionVector): DimensionVector {
    return a.map((val, i) => val + b[i]) as DimensionVector;
  }
  
  /**
   * Subtract dimension vector b from a
   */
  static subtract(a: DimensionVector, b: DimensionVector): DimensionVector {
    return a.map((val, i) => val - b[i]) as DimensionVector;
  }
  
  /**
   * Multiply dimension vector by scalar
   */
  static multiply(dim: DimensionVector, scalar: number): DimensionVector {
    return dim.map(val => val * scalar) as DimensionVector;
  }
  
  /**
   * Check if two dimension vectors are equal
   */
  static equal(a: DimensionVector, b: DimensionVector): boolean {
    return a.every((val, i) => val === b[i]);
  }
  
  /**
   * Check if dimension vector is dimensionless
   */
  static isDimensionless(dim: DimensionVector): boolean {
    return dim.every(val => val === 0);
  }
  
  /**
   * Get dimension name from vector
   */
  static getDimensionName(dim: DimensionVector): string {
    const names = ['L', 'M', 'T', 'I', 'Θ', 'N', 'J'];
    const parts: string[] = [];
    
    dim.forEach((exp, i) => {
      if (exp !== 0) {
        if (exp === 1) {
          parts.push(names[i]);
        } else {
          parts.push(`${names[i]}^${exp}`);
        }
      }
    });
    
    return parts.length > 0 ? parts.join('·') : '1';
  }
  
  /**
   * Get SI base unit expression from dimension
   */
  static getSIExpression(dim: DimensionVector): string {
    const units = ['m', 'kg', 's', 'A', 'K', 'mol', 'cd'];
    const parts: string[] = [];
    
    dim.forEach((exp, i) => {
      if (exp !== 0) {
        if (exp === 1) {
          parts.push(units[i]);
        } else if (exp === -1) {
          parts.push(`/${units[i]}`);
        } else if (exp > 0) {
          parts.push(`${units[i]}${exp}`);
        } else {
          parts.push(`/${units[i]}${-exp}`);
        }
      }
    });
    
    if (parts.length === 0) return '1';
    
    // Clean up expression
    let expr = parts.join('.');
    expr = expr.replace(/\.\//, '/');
    expr = expr.replace(/^\//, '1/');
    
    return expr;
  }
}
