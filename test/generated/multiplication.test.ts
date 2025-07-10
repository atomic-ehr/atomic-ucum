import { test, expect, describe, beforeEach } from "bun:test";
import { UCUMCalculator } from "../../src/calculator";

describe("UCUM Functional Tests - Multiplication", () => {
  let calculator: UCUMCalculator;

  beforeEach(() => {
    calculator = new UCUMCalculator();
  });

  test("should create calculator instance", () => {
    expect(calculator).toBeDefined();
  });

  describe("unit multiplication", () => {
    test("4-101: 1.5 g * 2 m", () => {
      const result = calculator.multiply(
        { value: 1.5, unit: "g" },
        { value: 2, unit: "m" }
      );
      // Result should be canonically equal to 3 g.m
      const expected = calculator.parse("g.m");
      expect(result.value).toBeCloseTo(3, 10);
      expect(calculator.areEquivalent(result.unit, "g.m")).toBe(true);
    });

    test("4-102: 2 m * 1.5 g", () => {
      const result = calculator.multiply(
        { value: 2, unit: "m" },
        { value: 1.5, unit: "g" }
      );
      // Result should be canonically equal to 3 g.m
      const expected = calculator.parse("g.m");
      expect(result.value).toBeCloseTo(3, 10);
      expect(calculator.areEquivalent(result.unit, "g.m")).toBe(true);
    });

  });
});
