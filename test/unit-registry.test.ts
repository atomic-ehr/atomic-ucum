import { test, expect, describe } from "bun:test";
import { UnitRegistry } from "../src/unit-registry";

describe("UnitRegistry", () => {
  let registry: UnitRegistry;

  test("should be a singleton", () => {
    const registry1 = UnitRegistry.getInstance();
    const registry2 = UnitRegistry.getInstance();
    expect(registry1).toBe(registry2);
  });

  describe("getUnit", () => {
    test("should find base units", () => {
      registry = UnitRegistry.getInstance();
      
      const meter = registry.getUnit("m");
      expect(meter).toBeDefined();
      expect(meter?.code).toBe("m");
      expect(meter?.name).toBe("meter");
      expect(meter?.property).toBe("length");
      expect(meter?.isBase).toBe(true);
      
      const gram = registry.getUnit("g");
      expect(gram).toBeDefined();
      expect(gram?.code).toBe("g");
      expect(gram?.name).toBe("gram");
      expect(gram?.property).toBe("mass");
    });

    test("should find derived units", () => {
      const newton = registry.getUnit("N");
      expect(newton).toBeDefined();
      expect(newton?.code).toBe("N");
      expect(newton?.name).toBe("newton");
      expect(newton?.property).toBe("force");
      expect(newton?.isBase).toBe(false);
    });

    test("should find special units", () => {
      const celsius = registry.getUnit("Cel");
      expect(celsius).toBeDefined();
      expect(celsius?.code).toBe("Cel");
      expect(celsius?.name).toBe("degree Celsius");
      expect(celsius?.isSpecial).toBe(true);
    });

    test("should handle case-insensitive lookups", () => {
      const meterUpper = registry.getUnit("M", false);
      expect(meterUpper).toBeDefined();
      expect(meterUpper?.code).toBe("m");
      
      const newtonLower = registry.getUnit("n", false);
      expect(newtonLower).toBeDefined();
      expect(newtonLower?.code).toBe("N");
    });

    test("should return null for unknown units", () => {
      const unknown = registry.getUnit("xyz");
      expect(unknown).toBeNull();
    });
  });

  describe("getPrefix", () => {
    test("should find metric prefixes", () => {
      const kilo = registry.getPrefix("k");
      expect(kilo).toBeDefined();
      expect(kilo?.code).toBe("k");
      expect(kilo?.name).toBe("kilo");
      expect(kilo?.value).toBe(1e3);
      
      const milli = registry.getPrefix("m");
      expect(milli).toBeDefined();
      expect(milli?.code).toBe("m");
      expect(milli?.name).toBe("milli");
      expect(milli?.value).toBe(1e-3);
    });

    test("should handle case-insensitive prefix lookups", () => {
      const kiloUpper = registry.getPrefix("K", false);
      expect(kiloUpper).toBeDefined();
      expect(kiloUpper?.code).toBe("k");
    });
  });

  describe("isValidUnit", () => {
    test("should validate known units", () => {
      expect(registry.isValidUnit("m")).toBe(true);
      expect(registry.isValidUnit("g")).toBe(true);  // kg is k+g, not a unit
      expect(registry.isValidUnit("N")).toBe(true);
      expect(registry.isValidUnit("Cel")).toBe(true);
    });

    test("should reject unknown units", () => {
      expect(registry.isValidUnit("xyz")).toBe(false);
      expect(registry.isValidUnit("")).toBe(false);
    });
  });

  describe("canHavePrefix", () => {
    test("should check if unit accepts prefixes", () => {
      expect(registry.canHavePrefix("m")).toBe(true);
      expect(registry.canHavePrefix("g")).toBe(true);
      expect(registry.canHavePrefix("L")).toBe(true);
      
      // Special units typically don't accept prefixes
      expect(registry.canHavePrefix("[in_i]")).toBe(false);
    });
  });

  describe("getDimension", () => {
    test("should return dimension vectors for base units", () => {
      const meterDim = registry.getDimension("m");
      expect(meterDim).toEqual([1, 0, 0, 0, 0, 0, 0]); // Length
      
      const gramDim = registry.getDimension("g");
      expect(gramDim).toEqual([0, 1, 0, 0, 0, 0, 0]); // Mass
      
      const secondDim = registry.getDimension("s");
      expect(secondDim).toEqual([0, 0, 1, 0, 0, 0, 0]); // Time
    });

    test("should return dimension vectors for derived units", () => {
      const newtonDim = registry.getDimension("N");
      expect(newtonDim).toEqual([1, 1, -2, 0, 0, 0, 0]); // L·M·T⁻²
      
      const pascalDim = registry.getDimension("Pa");
      expect(pascalDim).toEqual([-1, 1, -2, 0, 0, 0, 0]); // L⁻¹·M·T⁻²
    });

    test("should return null for unknown units", () => {
      const unknownDim = registry.getDimension("xyz");
      expect(unknownDim).toBeNull();
    });
  });

  describe("getUnitsByDimension", () => {
    test("should find all units with same dimension", () => {
      const lengthUnits = registry.getUnitsByDimension([1, 0, 0, 0, 0, 0, 0]);
      expect(lengthUnits.length).toBeGreaterThan(0);
      expect(lengthUnits.some(u => u.code === "m")).toBe(true);
      // TODO: implement dimension computation for derived units like [ft_i]
      // expect(lengthUnits.some(u => u.code === "[ft_i]")).toBe(true);
      
      const forceUnits = registry.getUnitsByDimension([1, 1, -2, 0, 0, 0, 0]);
      expect(forceUnits.some(u => u.code === "N")).toBe(true);
    });
  });

  describe("getUnitByProperty", () => {
    test("should find units by property", () => {
      const lengthUnits = registry.getUnitsByProperty("length");
      expect(lengthUnits.length).toBeGreaterThan(0);
      expect(lengthUnits.some(u => u.code === "m")).toBe(true);
      
      const forceUnits = registry.getUnitsByProperty("force");
      expect(forceUnits.some(u => u.code === "N")).toBe(true);
    });
  });
});