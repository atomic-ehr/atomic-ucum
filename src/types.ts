export type DimensionVector = [number, number, number, number, number, number, number];

export interface Unit {
  code: string;              // Case-sensitive UCUM code
  codeUC: string;            // Case-insensitive code
  name: string;              // Display name
  printSymbol?: string;      // Print symbol
  property: string;          // What the unit measures
  dimension?: DimensionVector; // 7-element array
  magnitude?: number;        // Conversion factor to base unit
  isBase: boolean;           // Is this a base unit?
  isMetric: boolean;         // Can accept prefixes?
  isSpecial: boolean;        // Needs special conversion?
  isArbitrary?: boolean;     // Arbitrary unit (e.g., [pH])
  value?: {                  // Value definition from XML
    unit: string;
    unitUC: string;
    value: number;
  };
}

export interface Prefix {
  code: string;
  codeUC: string;
  name: string;
  printSymbol: string;
  value: number;
}

export interface ParsedUnit {
  value: number;               // Numeric coefficient
  units: Record<string, number>; // Map of unit codes to exponents
  annotations?: string[];      // Preserved annotation text
}

export interface ConversionResult {
  value: number;
  fromUnit: string;
  toUnit: string;
  annotations?: string[];
}

export interface ConversionOptions {
  molecularWeight?: number;    // For mol-mass conversions
  charge?: number;             // For equivalent conversions
}

export type SpecialConversionFunction = (
  value: number,
  fromUnit: string,
  toUnit: string,
  options?: ConversionOptions
) => number | null;