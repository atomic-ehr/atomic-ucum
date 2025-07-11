import { test, expect, describe, beforeEach } from "bun:test";
import { UCUMConverter } from "../../src/converter";

describe("UCUM Functional Tests - Multiplication", () => {
  let converter: UCUMConverter;

  beforeEach(() => {
    converter = new UCUMConverter();
  });

  test("should create converter instance", () => {
    expect(converter).toBeDefined();
  });

  // TODO: Implement multiplication tests when calculator functionality is added
  test.skip("multiplication tests pending", () => {
    // These tests require multiply, parse, and areEquivalent methods
    // which are not yet implemented in UCUMConverter
  });
});