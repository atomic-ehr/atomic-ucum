import { test, expect, describe, beforeEach } from "bun:test";
import { UCUMDisplayNameGenerator } from "../../src/display-name";

describe("UCUM Functional Tests - Display Name Generation", () => {
  let generator: UCUMDisplayNameGenerator;

  beforeEach(() => {
    generator = new UCUMDisplayNameGenerator();
  });

  test("should create display name generator instance", () => {
    expect(generator).toBeDefined();
  });

  describe("display name generation", () => {
    test("2-101: should generate display name for ''", () => {
      const result = generator.generate("");
      expect(result).toBe("(unity)");
    });

    test("2-102: should generate display name for 'm'", () => {
      const result = generator.generate("m");
      expect(result).toBe("(meter)");
    });

    test("2-103: should generate display name for 'mm'", () => {
      const result = generator.generate("mm");
      expect(result).toBe("(millimeter)");
    });

    test("2-104: should generate display name for 'm[H2O]'", () => {
      const result = generator.generate("m[H2O]");
      expect(result).toBe("(meter of water column)");
    });

    test("2-105: should generate display name for '10*23'", () => {
      const result = generator.generate("10*23");
      expect(result).toBe("(the number ten for arbitrary powers ^ 23)");
    });

    test("2-106: should generate display name for 'rad2'", () => {
      const result = generator.generate("rad2");
      expect(result).toBe("(radian ^ 2)");
    });

    test("2-107: should generate display name for 'm3.kg-1.s-2'", () => {
      const result = generator.generate("m3.kg-1.s-2");
      expect(result).toBe("(meter ^ 3) * (kilogram ^ -1) * (second ^ -2)");
    });

    test("2-108: should generate display name for '4.[pi].10*-7.N/A2'", () => {
      const result = generator.generate("4.[pi].10*-7.N/A2");
      expect(result).toBe("4 * (the number pi) * (the number ten for arbitrary powers ^ -7) * (Newton) / (Amp&#232;re ^ 2)");
    });

  });
});
