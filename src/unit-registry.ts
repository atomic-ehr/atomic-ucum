import { Unit, Prefix, DimensionVector } from './types';
import { UCUM_PREFIXES, UCUM_BASE_UNITS, UCUM_DERIVED_UNITS, UCUM_SPECIAL_UNITS } from './generated/ucum-definitions';
import { BASE_DIMENSIONS, DERIVED_DIMENSIONS } from './generated/dimension-analyzer';

export class UnitRegistry {
  private static instance: UnitRegistry;
  private units: Map<string, Unit> = new Map();
  private unitsCI: Map<string, Unit> = new Map(); // Case-insensitive lookup
  private prefixes: Map<string, Prefix> = new Map();
  private prefixesCI: Map<string, Prefix> = new Map();
  private dimensionIndex: Map<string, Unit[]> = new Map();
  private propertyIndex: Map<string, Unit[]> = new Map();

  private constructor() {
    this.loadPrefixes();
    this.loadUnits();
    this.buildIndices();
  }

  static getInstance(): UnitRegistry {
    if (!UnitRegistry.instance) {
      UnitRegistry.instance = new UnitRegistry();
    }
    return UnitRegistry.instance;
  }

  private loadPrefixes(): void {
    Object.entries(UCUM_PREFIXES).forEach(([code, prefix]) => {
      const prefixObj: Prefix = {
        code: prefix.code,
        codeUC: prefix.codeUC,
        name: prefix.name,
        printSymbol: prefix.printSymbol,
        value: prefix.value
      };
      this.prefixes.set(code, prefixObj);
      this.prefixesCI.set(prefix.codeUC.toLowerCase(), prefixObj);
    });
  }

  private loadUnits(): void {
    // Load base units
    Object.entries(UCUM_BASE_UNITS).forEach(([code, unit]) => {
      const unitObj: Unit = {
        code: unit.code,
        codeUC: unit.codeUC,
        name: unit.name,
        printSymbol: unit.printSymbol,
        property: unit.property,
        isBase: true,
        isMetric: unit.isMetric,
        isSpecial: false,
        dimension: this.getDimensionForUnit(code),
        magnitude: 1
      };
      this.units.set(code, unitObj);
      this.unitsCI.set(unit.codeUC.toLowerCase(), unitObj);
    });

    // Load derived units
    Object.entries(UCUM_DERIVED_UNITS).forEach(([code, unit]) => {
      if (!this.units.has(code)) {
        const unitObj: Unit = {
          code: unit.code,
          codeUC: unit.codeUC,
          name: unit.name,
          printSymbol: unit.printSymbol,
          property: unit.property,
          isBase: false,
          isMetric: unit.isMetric,
          isSpecial: false,
          dimension: this.getDimensionForUnit(code),
          magnitude: unit.value.value,
          value: unit.value
        };
        this.units.set(code, unitObj);
        this.unitsCI.set(unit.codeUC.toLowerCase(), unitObj);
      }
    });

    // Load special units
    Object.entries(UCUM_SPECIAL_UNITS).forEach(([code, unit]) => {
      const unitObj: Unit = {
        code: unit.code,
        codeUC: unit.codeUC,
        name: unit.name,
        printSymbol: unit.printSymbol,
        property: unit.property,
        isBase: false,
        isMetric: unit.isMetric,
        isSpecial: true,
        dimension: this.getDimensionForUnit(code),
        magnitude: unit.value.value,
        value: unit.value
      };
      this.units.set(code, unitObj);
      this.unitsCI.set(unit.codeUC.toLowerCase(), unitObj);
    });
  }

  private getDimensionForUnit(code: string): DimensionVector | undefined {
    if (BASE_DIMENSIONS[code]) {
      return BASE_DIMENSIONS[code];
    }
    if (DERIVED_DIMENSIONS[code]) {
      return DERIVED_DIMENSIONS[code].dimension;
    }
    // For units not in our dimension tables, we'll need to compute later
    return undefined;
  }

  private buildIndices(): void {
    // Build dimension index
    this.units.forEach(unit => {
      if (unit.dimension) {
        const key = unit.dimension.join(',');
        if (!this.dimensionIndex.has(key)) {
          this.dimensionIndex.set(key, []);
        }
        this.dimensionIndex.get(key)!.push(unit);
      }
    });

    // Build property index
    this.units.forEach(unit => {
      if (!this.propertyIndex.has(unit.property)) {
        this.propertyIndex.set(unit.property, []);
      }
      this.propertyIndex.get(unit.property)!.push(unit);
    });
  }

  getUnit(code: string, caseSensitive: boolean = true): Unit | null {
    if (caseSensitive) {
      return this.units.get(code) || null;
    } else {
      return this.unitsCI.get(code.toLowerCase()) || null;
    }
  }

  getPrefix(code: string, caseSensitive: boolean = true): Prefix | null {
    if (caseSensitive) {
      return this.prefixes.get(code) || null;
    } else {
      return this.prefixesCI.get(code.toLowerCase()) || null;
    }
  }

  isValidUnit(code: string): boolean {
    return this.units.has(code);
  }

  canHavePrefix(code: string): boolean {
    const unit = this.units.get(code);
    return unit ? unit.isMetric : false;
  }

  getDimension(code: string): DimensionVector | null {
    const unit = this.units.get(code);
    return unit?.dimension || null;
  }

  getUnitsByDimension(dimension: DimensionVector): Unit[] {
    const key = dimension.join(',');
    return this.dimensionIndex.get(key) || [];
  }

  getUnitsByProperty(property: string): Unit[] {
    return this.propertyIndex.get(property) || [];
  }

  // Try to find a unit by checking prefix + base unit
  tryPrefixedUnit(code: string): { prefix: Prefix; unit: Unit } | null {
    // Try each prefix length
    for (let i = 1; i <= 2 && i < code.length; i++) {
      const prefixCode = code.substring(0, i);
      const unitCode = code.substring(i);
      
      const prefix = this.getPrefix(prefixCode);
      const unit = this.getUnit(unitCode);
      
      if (prefix && unit && unit.isMetric) {
        return { prefix, unit };
      }
    }
    return null;
  }
}