import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

interface DimensionAnalysis {
  baseUnits: Record<string, number[]>;
  derivedUnits: Record<string, { expression: string; dimension: number[] }>;
}

// Parse UCUM units and generate dimension calculations
function analyzeDimensions(): DimensionAnalysis {
  // Base SI units with their dimension vectors
  // [length, mass, time, current, temperature, substance, luminosity]
  const baseUnits: Record<string, number[]> = {
    'm': [1, 0, 0, 0, 0, 0, 0],      // meter
    'g': [0, 1, 0, 0, 0, 0, 0],      // gram  
    's': [0, 0, 1, 0, 0, 0, 0],      // second
    'A': [0, 0, 0, 1, 0, 0, 0],      // ampere
    'K': [0, 0, 0, 0, 1, 0, 0],      // kelvin
    'mol': [0, 0, 0, 0, 0, 1, 0],    // mole
    'cd': [0, 0, 0, 0, 0, 0, 1],     // candela
    'rad': [0, 0, 0, 0, 0, 0, 0],    // radian (dimensionless)
    'sr': [0, 0, 0, 0, 0, 0, 0],     // steradian (dimensionless)
    '10*': [0, 0, 0, 0, 0, 0, 0],    // powers of 10 (dimensionless)
    '10^': [0, 0, 0, 0, 0, 0, 0],    // powers of 10 (dimensionless)
    '[pi]': [0, 0, 0, 0, 0, 0, 0],   // pi (dimensionless)
    '%': [0, 0, 0, 0, 0, 0, 0],      // percent (dimensionless)
    '[ppth]': [0, 0, 0, 0, 0, 0, 0], // parts per thousand (dimensionless)
    '[ppm]': [0, 0, 0, 0, 0, 0, 0],  // parts per million (dimensionless)
    '[ppb]': [0, 0, 0, 0, 0, 0, 0],  // parts per billion (dimensionless)
    '[pptr]': [0, 0, 0, 0, 0, 0, 0], // parts per trillion (dimensionless)
  };

  // Common derived units with their expressions and calculated dimensions
  const derivedUnits: Record<string, { expression: string; dimension: number[] }> = {
    // Force
    'N': { expression: 'kg.m/s2', dimension: [1, 1, -2, 0, 0, 0, 0] },
    
    // Pressure
    'Pa': { expression: 'N/m2', dimension: [-1, 1, -2, 0, 0, 0, 0] },
    'bar': { expression: '100000.Pa', dimension: [-1, 1, -2, 0, 0, 0, 0] },
    'atm': { expression: '101325.Pa', dimension: [-1, 1, -2, 0, 0, 0, 0] },
    
    // Energy
    'J': { expression: 'N.m', dimension: [2, 1, -2, 0, 0, 0, 0] },
    'cal': { expression: '4.184.J', dimension: [2, 1, -2, 0, 0, 0, 0] },
    'eV': { expression: '1.60217733e-19.J', dimension: [2, 1, -2, 0, 0, 0, 0] },
    
    // Power
    'W': { expression: 'J/s', dimension: [2, 1, -3, 0, 0, 0, 0] },
    
    // Electric
    'C': { expression: 'A.s', dimension: [0, 0, 1, 1, 0, 0, 0] },
    'V': { expression: 'J/C', dimension: [2, 1, -3, -1, 0, 0, 0] },
    'F': { expression: 'C/V', dimension: [-2, -1, 4, 2, 0, 0, 0] },
    'Ohm': { expression: 'V/A', dimension: [2, 1, -3, -2, 0, 0, 0] },
    'S': { expression: '1/Ohm', dimension: [-2, -1, 3, 2, 0, 0, 0] },
    'Wb': { expression: 'V.s', dimension: [2, 1, -2, -1, 0, 0, 0] },
    'T': { expression: 'Wb/m2', dimension: [0, 1, -2, -1, 0, 0, 0] },
    'H': { expression: 'Wb/A', dimension: [2, 1, -2, -2, 0, 0, 0] },
    
    // Frequency
    'Hz': { expression: '1/s', dimension: [0, 0, -1, 0, 0, 0, 0] },
    'Bq': { expression: 'Hz', dimension: [0, 0, -1, 0, 0, 0, 0] },
    
    // Luminous
    'lm': { expression: 'cd.sr', dimension: [0, 0, 0, 0, 0, 0, 1] },
    'lx': { expression: 'lm/m2', dimension: [-2, 0, 0, 0, 0, 0, 1] },
    
    // Dose
    'Gy': { expression: 'J/kg', dimension: [2, 0, -2, 0, 0, 0, 0] },
    'Sv': { expression: 'J/kg', dimension: [2, 0, -2, 0, 0, 0, 0] },
    
    // Catalytic activity
    'kat': { expression: 'mol/s', dimension: [0, 0, -1, 0, 0, 1, 0] },
    
    // Area & Volume
    'm2': { expression: 'm.m', dimension: [2, 0, 0, 0, 0, 0, 0] },
    'm3': { expression: 'm.m.m', dimension: [3, 0, 0, 0, 0, 0, 0] },
    'L': { expression: 'dm3', dimension: [3, 0, 0, 0, 0, 0, 0] },
    
    // Velocity & Acceleration
    'm/s': { expression: 'm/s', dimension: [1, 0, -1, 0, 0, 0, 0] },
    'm/s2': { expression: 'm/s2', dimension: [1, 0, -2, 0, 0, 0, 0] },
  };

  return { baseUnits, derivedUnits };
}

function generateDimensionAnalyzer(analysis: DimensionAnalysis): string {
  const lines: string[] = [];
  
  lines.push('// Generated dimension analyzer for UCUM units');
  lines.push('// DO NOT EDIT MANUALLY - This file is auto-generated');
  lines.push('');
  lines.push('export type DimensionVector = [number, number, number, number, number, number, number];');
  lines.push('');
  lines.push('/**');
  lines.push(' * Dimension indices:');
  lines.push(' * 0: Length (L)');
  lines.push(' * 1: Mass (M)');
  lines.push(' * 2: Time (T)');
  lines.push(' * 3: Electric Current (I)');
  lines.push(' * 4: Temperature (Θ)');
  lines.push(' * 5: Amount of Substance (N)');
  lines.push(' * 6: Luminous Intensity (J)');
  lines.push(' */');
  lines.push('');
  
  // Generate base dimensions map
  lines.push('export const BASE_DIMENSIONS: Record<string, DimensionVector> = {');
  Object.entries(analysis.baseUnits).forEach(([unit, dim]) => {
    lines.push(`  '${unit}': [${dim.join(', ')}],`);
  });
  lines.push('};');
  lines.push('');
  
  // Generate derived dimensions map
  lines.push('export const DERIVED_DIMENSIONS: Record<string, { expression: string; dimension: DimensionVector }> = {');
  Object.entries(analysis.derivedUnits).forEach(([unit, data]) => {
    lines.push(`  '${unit}': {`);
    lines.push(`    expression: '${data.expression}',`);
    lines.push(`    dimension: [${data.dimension.join(', ')}]`);
    lines.push('  },');
  });
  lines.push('};');
  lines.push('');
  
  // Generate dimension utilities
  lines.push(`
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
          parts.push(\`\${names[i]}^\${exp}\`);
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
          parts.push(\`/\${units[i]}\`);
        } else if (exp > 0) {
          parts.push(\`\${units[i]}\${exp}\`);
        } else {
          parts.push(\`/\${units[i]}\${-exp}\`);
        }
      }
    });
    
    if (parts.length === 0) return '1';
    
    // Clean up expression
    let expr = parts.join('.');
    expr = expr.replace(/\\.\\//, '/');
    expr = expr.replace(/^\\//, '1/');
    
    return expr;
  }
}
`);
  
  return lines.join('\n');
}

// Main execution
const outputPath = join(__dirname, '..', 'src', 'generated', 'dimension-analyzer.ts');

console.log('Analyzing dimensions...');
const analysis = analyzeDimensions();

const tsContent = generateDimensionAnalyzer(analysis);

writeFileSync(outputPath, tsContent);
console.log(`Generated dimension analyzer at ${outputPath}`);