import { test, expect, describe, beforeEach } from "bun:test";
import { UCUMConverter } from "../../src/converter";

describe("UCUM Functional Tests - Conversion", () => {
  let converter: UCUMConverter;

  beforeEach(() => {
    converter = new UCUMConverter();
  });

  test("should create converter instance", () => {
    expect(converter).toBeDefined();
  });

  describe("unit conversions", () => {
    test("3-101: 6.3 m -> m", () => {
      const result = converter.convert(6.3, "m", "m");
      expect(result.value).toBeCloseTo(6.3, 1);
    });

    test("3-102: 6.3 mm -> m", () => {
      const result = converter.convert(6.3, "mm", "m");
      expect(result.value).toBeCloseTo(0.0063, 4);
    });

    test("3-103: 6.3 mm -> cm", () => {
      const result = converter.convert(6.3, "mm", "cm");
      expect(result.value).toBeCloseTo(0.63, 2);
    });

    test("3-104: 6.3 s.m-1 -> s/m", () => {
      const result = converter.convert(6.3, "s.m-1", "s/m");
      expect(result.value).toBeCloseTo(6.3, 1);
    });

    test("3-105: 6.3 s.mm-1 -> s.m-1", () => {
      const result = converter.convert(6.3, "s.mm-1", "s.m-1");
      expect(result.value).toBeCloseTo(6300, 0);
    });

    test("3-106: 6.3 s.mm-2 -> s.m-2", () => {
      const result = converter.convert(6.3, "s.mm-2", "s.m-2");
      expect(result.value).toBeCloseTo(6300000, 0);
    });

    test("3-107: 6.3 s.mm-2 -> s.m-2", () => {
      const result = converter.convert(6.3, "s.mm-2", "s.m-2");
      expect(result.value).toBeCloseTo(6300000, 0);
    });

    test("3-108: 6.3 s/m/g -> s.m-1.g-1", () => {
      const result = converter.convert(6.3, "s/m/g", "s.m-1.g-1");
      expect(result.value).toBeCloseTo(6.3, 1);
    });

    test("3-109: 6.3 ms/m/g -> s.m-1.g-1", () => {
      const result = converter.convert(6.3, "ms/m/g", "s.m-1.g-1");
      expect(result.value).toBeCloseTo(0.0063, 4);
    });

    test("3-110: 6.3 s/mm/g -> s.m-1.g-1", () => {
      const result = converter.convert(6.3, "s/mm/g", "s.m-1.g-1");
      expect(result.value).toBeCloseTo(6300, 0);
    });

    test("3-111: 6.3 s/m/mg -> s.m-1.g-1", () => {
      const result = converter.convert(6.3, "s/m/mg", "s.m-1.g-1");
      expect(result.value).toBeCloseTo(6300, 0);
    });

    test("3-111a: 6.3 s/m.mg -> s.m-1.g", () => {
      const result = converter.convert(6.3, "s/m.mg", "s.m-1.g");
      expect(result.value).toBeCloseTo(0.0063, 4);
    });

    test("3-112: 6.3 ms/m -> s/m", () => {
      const result = converter.convert(6.3, "ms/m", "s/m");
      expect(result.value).toBeCloseTo(0.0063, 4);
    });

    test("3-113: 6.3 4.s/m -> s/m", () => {
      const result = converter.convert(6.3, "4.s/m", "s/m");
      expect(result.value).toBeCloseTo(25, 0);
    });

    test("3-114: 6.3 4.s/m -> s/m", () => {
      const result = converter.convert(6.3, "4.s/m", "s/m");
      expect(result.value).toBeCloseTo(25.2, 1);
    });

    test("3-115: 6.3 s/4/m -> s/m", () => {
      const result = converter.convert(6.3, "s/4/m", "s/m");
      expect(result.value).toBeCloseTo(1.6, 1);
    });

    test("3-116: 6.3 s/mm -> s/m", () => {
      const result = converter.convert(6.3, "s/mm", "s/m");
      expect(result.value).toBeCloseTo(6300, 0);
    });

    test("3-117: 6.3 ms/mm -> s/m", () => {
      const result = converter.convert(6.3, "ms/mm", "s/m");
      expect(result.value).toBeCloseTo(6.3, 1);
    });

    test("3-118: 6.3 [in_i] -> m", () => {
      const result = converter.convert(6.3, "[in_i]", "m");
      expect(result.value).toBeCloseTo(0.16, 2);
    });

    test("3-119: 6.3 [in_i] -> cm", () => {
      const result = converter.convert(6.3, "[in_i]", "cm");
      expect(result.value).toBeCloseTo(16, 0);
    });

    test("3-120: 6.3 g.m.s-2.A-2 -> g.m.C-2", () => {
      const result = converter.convert(6.3, "g.m.s-2.A-2", "g.m.C-2");
      expect(result.value).toBeCloseTo(6.3, 1);
    });

    test("3-121: 1 10*-7.s -> s", () => {
      const result = converter.convert(1, "10*-7.s", "s");
      expect(result.value).toBeCloseTo(1e-7, 15);
    });

    test("3-122: 1 4.[pi].10*-7.s -> s", () => {
      const result = converter.convert(1, "4.[pi].10*-7.s", "s");
      expect(result.value).toBeCloseTo(0.0000012566370614359173, 71);
    });

    test("3-123: 1 4.[pi].10*-7.N -> N", () => {
      const result = converter.convert(1, "4.[pi].10*-7.N", "N");
      expect(result.value).toBeCloseTo(0.0000012566370614359173, 22);
    });

    test("3-124: 1 [mu_0] -> g.m.C-2", () => {
      const result = converter.convert(1, "[mu_0]", "g.m.C-2");
      expect(result.value).toBeCloseTo(0.0012566370614359172, 19);
    });

    test("3-125: 1 m[Hg] -> g.s-2.m-1", () => {
      const result = converter.convert(1, "m[Hg]", "g.s-2.m-1");
      expect(result.value).toBeCloseTo(133322000, 0);
    });

    test("3-126: 1 S -> g-1.m-2.C2.s", () => {
      const result = converter.convert(1, "S", "g-1.m-2.C2.s");
      expect(result.value).toBeCloseTo(0.001, 3);
    });

    test("3-127: 1 [ly] -> cm", () => {
      const result = converter.convert(1, "[ly]", "cm");
      expect(result.value).toBeCloseTo(946073047258080000, 0);
    });

    test("3-128: 1 1/[ly] -> cm-1", () => {
      const result = converter.convert(1, "1/[ly]", "cm-1");
      expect(result.value).toBeCloseTo(1.0570008340246e-18, 15);
    });

    test("3-129: 1.2 g.m -> m.g", () => {
      const result = converter.convert(1.2, "g.m", "m.g");
      expect(result.value).toBeCloseTo(1.2, 1);
    });

  });
});
