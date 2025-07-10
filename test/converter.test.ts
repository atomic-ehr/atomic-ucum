import { test, expect, describe } from "bun:test";
import { UCUMConverter } from "../src/converter";

describe("UCUMConverter", () => {
  let converter: UCUMConverter;

  test("should create converter instance", () => {
    converter = new UCUMConverter();
    expect(converter).toBeDefined();
  });

  describe("simple conversions", () => {
    test("should convert between metric prefixes", () => {
      converter = new UCUMConverter();
      
      const result = converter.convert(1, "km", "m");
      expect(result.value).toBe(1000);
      expect(result.fromUnit).toBe("km");
      expect(result.toUnit).toBe("m");
      
      const reverse = converter.convert(1000, "m", "km");
      expect(reverse.value).toBe(1);
      
      const mgToG = converter.convert(1000, "mg", "g");
      expect(mgToG.value).toBe(1);
    });

    test("should convert between different units of same dimension", () => {
      // Length
      const mToFt = converter.convert(1, "m", "[ft_i]");
      expect(mToFt.value).toBeCloseTo(3.28084, 5);
      
      // Mass
      const kgToLb = converter.convert(1, "kg", "[lb_av]");
      expect(kgToLb.value).toBeCloseTo(2.20462, 5);
      
      // Time
      const minToS = converter.convert(1, "min", "s");
      expect(minToS.value).toBe(60);
    });

    test("should handle conversion to same unit", () => {
      const same = converter.convert(5, "m", "m");
      expect(same.value).toBe(5);
    });
  });

  describe("complex conversions", () => {
    test("should convert compound units", () => {
      // Velocity
      const kmhToMs = converter.convert(36, "km/h", "m/s");
      expect(kmhToMs.value).toBeCloseTo(10, 5);
      
      // Density
      const gPerCm3ToKgPerM3 = converter.convert(1, "g/cm3", "kg/m3");
      expect(gPerCm3ToKgPerM3.value).toBeCloseTo(1000, 10);
      
      // Pressure
      const paToBar = converter.convert(100000, "Pa", "bar");
      expect(paToBar.value).toBe(1);
    });

    test("should convert derived units", () => {
      // Force
      const nToKgMPerS2 = converter.convert(1, "N", "kg.m/s2");
      expect(nToKgMPerS2.value).toBe(1);
      
      // Energy
      const jToNM = converter.convert(1, "J", "N.m");
      expect(jToNM.value).toBe(1);
      
      // Power
      const wToJs = converter.convert(1, "W", "J/s");
      expect(wToJs.value).toBe(1);
    });
  });

  describe("dimension checking", () => {
    test("should check if units are compatible", () => {
      expect(converter.canConvert("m", "km")).toBe(true);
      expect(converter.canConvert("m", "[ft_i]")).toBe(true);
      expect(converter.canConvert("kg", "g")).toBe(true);
      expect(converter.canConvert("N", "kg.m/s2")).toBe(true);
      
      expect(converter.canConvert("m", "s")).toBe(false);
      expect(converter.canConvert("kg", "m")).toBe(false);
      expect(converter.canConvert("N", "J")).toBe(false);
    });

    test("should throw on incompatible conversions", () => {
      expect(() => converter.convert(1, "m", "s")).toThrow(/incompatible/i);
      expect(() => converter.convert(1, "kg", "m")).toThrow(/incompatible/i);
    });
  });

  describe("special conversions", () => {
    test("should convert temperature units", () => {
      // Celsius to Kelvin
      const celToK = converter.convert(0, "Cel", "K");
      expect(celToK.value).toBeCloseTo(273.15, 2);
      
      const cel100ToK = converter.convert(100, "Cel", "K");
      expect(cel100ToK.value).toBeCloseTo(373.15, 2);
      
      // Kelvin to Celsius
      const kToCel = converter.convert(273.15, "K", "Cel");
      expect(kToCel.value).toBeCloseTo(0, 2);
      
      // Fahrenheit to Celsius
      const fToCel = converter.convert(32, "[degF]", "Cel");
      expect(fToCel.value).toBeCloseTo(0, 2);
      
      const f212ToCel = converter.convert(212, "[degF]", "Cel");
      expect(f212ToCel.value).toBeCloseTo(100, 2);
    });

    test("should handle special unit conversions with options", () => {
      // mol to mass conversion requires molecular weight
      const molToG = converter.convert(1, "mol", "g", { molecularWeight: 18.015 });
      expect(molToG.value).toBeCloseTo(18.015, 3);
      
      // mass to mol conversion
      const gToMol = converter.convert(36.03, "g", "mol", { molecularWeight: 18.015 });
      expect(gToMol.value).toBeCloseTo(2, 3);
      
      // equivalent conversions require charge
      const molToEq = converter.convert(1, "mol", "eq", { charge: 2 });
      expect(molToEq.value).toBe(2);
    });

    test("should throw when missing required options", () => {
      expect(() => converter.convert(1, "mol", "g")).toThrow(/molecular weight/i);
      expect(() => converter.convert(1, "mol", "eq")).toThrow(/charge/i);
    });
  });

  describe("conversion with annotations", () => {
    test("should preserve annotations during conversion", () => {
      const result = converter.convert(5, "mg{hemoglobin}/dL", "g{hemoglobin}/L");
      expect(result.value).toBeCloseTo(0.05, 5);
      expect(result.annotations).toContain("hemoglobin");
    });
  });

  describe("toBaseUnits", () => {
    test("should convert to base units", () => {
      const newton = converter.toBaseUnits("N");
      expect(newton.value).toBe(1000); // kg -> g
      expect(newton.units).toEqual({ g: 1, m: 1, s: -2 });
      
      const joule = converter.toBaseUnits("J");
      expect(joule.value).toBe(1000); // kg -> g
      expect(joule.units).toEqual({ g: 1, m: 2, s: -2 });
      
      const inch = converter.toBaseUnits("[in_i]");
      expect(inch.value).toBe(0.0254);
      expect(inch.units).toEqual({ m: 1 });
    });
  });

  describe("error handling", () => {
    test("should provide helpful error messages", () => {
      try {
        converter.convert(1, "xyz", "m");
      } catch (e: any) {
        expect(e.message).toMatch(/Unknown unit.*xyz/);
      }
      
      try {
        converter.convert(1, "m", "kg");
      } catch (e: any) {
        expect(e.message).toMatch(/incompatible.*L.*M/); // L for length, M for mass dimensions
      }
    });
  });
});