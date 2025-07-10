import { test, expect, describe, beforeEach } from "bun:test";
import { UCUMParser } from "../../src/parser";

describe("UCUM Functional Tests - Validation", () => {
  let parser: UCUMParser;

  beforeEach(() => {
    parser = new UCUMParser();
  });

  test("should create parser instance", () => {
    expect(parser).toBeDefined();
  });

  describe("valid units", () => {
    test("1-101: should parse 'm'", () => {
      expect(() => parser.parse("m")).not.toThrow();
    });

    test("1-104: should parse '/m'", () => {
      expect(() => parser.parse("/m")).not.toThrow();
    });

    test("1-105: should parse '10*3/ul'", () => {
      expect(() => parser.parse("10*3/ul")).not.toThrow();
    });

    test("1-106: should parse '10*-3/ul'", () => {
      expect(() => parser.parse("10*-3/ul")).not.toThrow();
    });

    test("1-107: should parse '10*+3/ul'", () => {
      expect(() => parser.parse("10*+3/ul")).not.toThrow();
    });

    test("1-109: should parse 'm'", () => {
      expect(() => parser.parse("m")).not.toThrow();
    });

    test("1-110: should parse 'm[H2O]'", () => {
      expect(() => parser.parse("m[H2O]")).not.toThrow();
    });

    test("1-111: should parse '10*23'", () => {
      expect(() => parser.parse("10*23")).not.toThrow();
    });

    test("1-112: should parse 'rad2'", () => {
      expect(() => parser.parse("rad2")).not.toThrow();
    });

    test("1-113: should parse 'm3.kg-1.s-2'", () => {
      expect(() => parser.parse("m3.kg-1.s-2")).not.toThrow();
    });

    test("1-114: should parse '4.[pi].10*-7.N/A2'", () => {
      expect(() => parser.parse("4.[pi].10*-7.N/A2")).not.toThrow();
    });

    test("1-115: should parse 'rad2{a}'", () => {
      expect(() => parser.parse("rad2{a}")).not.toThrow();
    });

    test("1-116: should parse '{a}.rad2{b}'", () => {
      expect(() => parser.parse("{a}.rad2{b}")).not.toThrow();
    });

    test("1-117: should parse '1{c}'", () => {
      expect(() => parser.parse("1{c}")).not.toThrow();
    });

    test("1-119: should parse '{e}'", () => {
      expect(() => parser.parse("{e}")).not.toThrow();
    });

    test("1-120: should parse '%'", () => {
      expect(() => parser.parse("%")).not.toThrow();
    });

    test("1-121: should parse '[cup_us]'", () => {
      expect(() => parser.parse("[cup_us]")).not.toThrow();
    });

    test("1-122: should parse '[foz_br]'", () => {
      expect(() => parser.parse("[foz_br]")).not.toThrow();
    });

    test("1-123: should parse '[ft_i]'", () => {
      expect(() => parser.parse("[ft_i]")).not.toThrow();
    });

    test("1-124: should parse '[in_i]'", () => {
      expect(() => parser.parse("[in_i]")).not.toThrow();
    });

    test("1-125: should parse '[yd_i]'", () => {
      expect(() => parser.parse("[yd_i]")).not.toThrow();
    });

    test("1-126: should parse '[gal_br]'", () => {
      expect(() => parser.parse("[gal_br]")).not.toThrow();
    });

    test("1-127: should parse '[lb_av]'", () => {
      expect(() => parser.parse("[lb_av]")).not.toThrow();
    });

    test("1-128: should parse '[oz_av]'", () => {
      expect(() => parser.parse("[oz_av]")).not.toThrow();
    });

    test("1-129: should parse '[pt_br]'", () => {
      expect(() => parser.parse("[pt_br]")).not.toThrow();
    });

    test("1-130: should parse '[qt_br]'", () => {
      expect(() => parser.parse("[qt_br]")).not.toThrow();
    });

    test("1-131: should parse '[sft_i]'", () => {
      expect(() => parser.parse("[sft_i]")).not.toThrow();
    });

    test("1-132: should parse '[sin_i]'", () => {
      expect(() => parser.parse("[sin_i]")).not.toThrow();
    });

    test("1-133: should parse '[syd_i]'", () => {
      expect(() => parser.parse("[syd_i]")).not.toThrow();
    });

    test("1-134: should parse '[tbs_us]'", () => {
      expect(() => parser.parse("[tbs_us]")).not.toThrow();
    });

    test("1-135: should parse '[tsp_us]'", () => {
      expect(() => parser.parse("[tsp_us]")).not.toThrow();
    });

    test("1-136: should parse '1/d'", () => {
      expect(() => parser.parse("1/d")).not.toThrow();
    });

    test("1-137: should parse '1/min'", () => {
      expect(() => parser.parse("1/min")).not.toThrow();
    });

    test("1-138: should parse 'a'", () => {
      expect(() => parser.parse("a")).not.toThrow();
    });

    test("1-139: should parse 'cm'", () => {
      expect(() => parser.parse("cm")).not.toThrow();
    });

    test("1-140: should parse 'cm2'", () => {
      expect(() => parser.parse("cm2")).not.toThrow();
    });

    test("1-141: should parse 'cm3'", () => {
      expect(() => parser.parse("cm3")).not.toThrow();
    });

    test("1-142: should parse 'd'", () => {
      expect(() => parser.parse("d")).not.toThrow();
    });

    test("1-143: should parse 'dg'", () => {
      expect(() => parser.parse("dg")).not.toThrow();
    });

    test("1-144: should parse 'dl'", () => {
      expect(() => parser.parse("dl")).not.toThrow();
    });

    test("1-145: should parse 'g'", () => {
      expect(() => parser.parse("g")).not.toThrow();
    });

    test("1-146: should parse 'g/d'", () => {
      expect(() => parser.parse("g/d")).not.toThrow();
    });

    test("1-147: should parse 'g/l'", () => {
      expect(() => parser.parse("g/l")).not.toThrow();
    });

    test("1-148: should parse 'h'", () => {
      expect(() => parser.parse("h")).not.toThrow();
    });

    test("1-150: should parse 'kg'", () => {
      expect(() => parser.parse("kg")).not.toThrow();
    });

    test("1-151: should parse 'l'", () => {
      expect(() => parser.parse("l")).not.toThrow();
    });

    test("1-152: should parse 'm'", () => {
      expect(() => parser.parse("m")).not.toThrow();
    });

    test("1-153: should parse 'mm'", () => {
      expect(() => parser.parse("mm")).not.toThrow();
    });

    test("1-154: should parse 'm2'", () => {
      expect(() => parser.parse("m2")).not.toThrow();
    });

    test("1-155: should parse 'meq'", () => {
      expect(() => parser.parse("meq")).not.toThrow();
    });

    test("1-156: should parse 'mg'", () => {
      expect(() => parser.parse("mg")).not.toThrow();
    });

    test("1-157: should parse 'mg'", () => {
      expect(() => parser.parse("mg")).not.toThrow();
    });

    test("1-158: should parse 'mg/d'", () => {
      expect(() => parser.parse("mg/d")).not.toThrow();
    });

    test("1-159: should parse 'min'", () => {
      expect(() => parser.parse("min")).not.toThrow();
    });

    test("1-160: should parse 'ml'", () => {
      expect(() => parser.parse("ml")).not.toThrow();
    });

    test("1-161: should parse 'ml/s'", () => {
      expect(() => parser.parse("ml/s")).not.toThrow();
    });

    test("1-162: should parse 'mm[Hg]'", () => {
      expect(() => parser.parse("mm[Hg]")).not.toThrow();
    });

    test("1-163: should parse 'mm2'", () => {
      expect(() => parser.parse("mm2")).not.toThrow();
    });

    test("1-164: should parse 'mm3'", () => {
      expect(() => parser.parse("mm3")).not.toThrow();
    });

    test("1-165: should parse 'mmol'", () => {
      expect(() => parser.parse("mmol")).not.toThrow();
    });

    test("1-166: should parse 'mmol/l'", () => {
      expect(() => parser.parse("mmol/l")).not.toThrow();
    });

    test("1-167: should parse 'mo'", () => {
      expect(() => parser.parse("mo")).not.toThrow();
    });

    test("1-168: should parse 'mol'", () => {
      expect(() => parser.parse("mol")).not.toThrow();
    });

    test("1-169: should parse 'ms'", () => {
      expect(() => parser.parse("ms")).not.toThrow();
    });

    test("1-170: should parse 'mU'", () => {
      expect(() => parser.parse("mU")).not.toThrow();
    });

    test("1-171: should parse 'ng'", () => {
      expect(() => parser.parse("ng")).not.toThrow();
    });

    test("1-172: should parse 'ng'", () => {
      expect(() => parser.parse("ng")).not.toThrow();
    });

    test("1-173: should parse 'nl'", () => {
      expect(() => parser.parse("nl")).not.toThrow();
    });

    test("1-174: should parse 'nl'", () => {
      expect(() => parser.parse("nl")).not.toThrow();
    });

    test("1-175: should parse 'pg/ml'", () => {
      expect(() => parser.parse("pg/ml")).not.toThrow();
    });

    test("1-176: should parse 's'", () => {
      expect(() => parser.parse("s")).not.toThrow();
    });

    test("1-177: should parse 'U'", () => {
      expect(() => parser.parse("U")).not.toThrow();
    });

    test("1-178: should parse 'U/l'", () => {
      expect(() => parser.parse("U/l")).not.toThrow();
    });

    test("1-179: should parse 'ug'", () => {
      expect(() => parser.parse("ug")).not.toThrow();
    });

    test("1-180: should parse 'ug/min'", () => {
      expect(() => parser.parse("ug/min")).not.toThrow();
    });

    test("1-181: should parse 'ul'", () => {
      expect(() => parser.parse("ul")).not.toThrow();
    });

    test("1-182: should parse 'umol'", () => {
      expect(() => parser.parse("umol")).not.toThrow();
    });

    test("1-183: should parse 'umol/l'", () => {
      expect(() => parser.parse("umol/l")).not.toThrow();
    });

    test("1-184: should parse 'wk'", () => {
      expect(() => parser.parse("wk")).not.toThrow();
    });

    test("1-185: should parse '%'", () => {
      expect(() => parser.parse("%")).not.toThrow();
    });

    test("1-186: should parse '[cup_us]'", () => {
      expect(() => parser.parse("[cup_us]")).not.toThrow();
    });

    test("1-187: should parse '[foz_br]'", () => {
      expect(() => parser.parse("[foz_br]")).not.toThrow();
    });

    test("1-188: should parse '[gal_br]'", () => {
      expect(() => parser.parse("[gal_br]")).not.toThrow();
    });

    test("1-189: should parse '[sft_i]'", () => {
      expect(() => parser.parse("[sft_i]")).not.toThrow();
    });

    test("1-190: should parse '[sin_i]'", () => {
      expect(() => parser.parse("[sin_i]")).not.toThrow();
    });

    test("1-191: should parse '[lb_av]'", () => {
      expect(() => parser.parse("[lb_av]")).not.toThrow();
    });

    test("1-192: should parse '[oz_av]'", () => {
      expect(() => parser.parse("[oz_av]")).not.toThrow();
    });

    test("1-193: should parse '[pt_br]'", () => {
      expect(() => parser.parse("[pt_br]")).not.toThrow();
    });

    test("1-194: should parse '[qt_br]'", () => {
      expect(() => parser.parse("[qt_br]")).not.toThrow();
    });

    test("1-195: should parse '[tbs_us]'", () => {
      expect(() => parser.parse("[tbs_us]")).not.toThrow();
    });

    test("1-196: should parse '[tsp_us]'", () => {
      expect(() => parser.parse("[tsp_us]")).not.toThrow();
    });

    test("1-197: should parse '[syd_i]'", () => {
      expect(() => parser.parse("[syd_i]")).not.toThrow();
    });

    test("1-198: should parse 'cm2'", () => {
      expect(() => parser.parse("cm2")).not.toThrow();
    });

    test("1-199: should parse 'cm3'", () => {
      expect(() => parser.parse("cm3")).not.toThrow();
    });

    test("1-200: should parse 'g'", () => {
      expect(() => parser.parse("g")).not.toThrow();
    });

    test("1-201: should parse 'kg'", () => {
      expect(() => parser.parse("kg")).not.toThrow();
    });

    test("1-202: should parse 'l'", () => {
      expect(() => parser.parse("l")).not.toThrow();
    });

    test("1-203: should parse 'm2'", () => {
      expect(() => parser.parse("m2")).not.toThrow();
    });

    test("1-204: should parse 'meq'", () => {
      expect(() => parser.parse("meq")).not.toThrow();
    });

    test("1-205: should parse 'mg'", () => {
      expect(() => parser.parse("mg")).not.toThrow();
    });

    test("1-206: should parse 'ml'", () => {
      expect(() => parser.parse("ml")).not.toThrow();
    });

    test("1-207: should parse 'mm2'", () => {
      expect(() => parser.parse("mm2")).not.toThrow();
    });

    test("1-208: should parse 'mm3'", () => {
      expect(() => parser.parse("mm3")).not.toThrow();
    });

    test("1-209: should parse 'mmol'", () => {
      expect(() => parser.parse("mmol")).not.toThrow();
    });

    test("1-211: should parse 'mU'", () => {
      expect(() => parser.parse("mU")).not.toThrow();
    });

    test("1-212: should parse 'ng'", () => {
      expect(() => parser.parse("ng")).not.toThrow();
    });

    test("1-213: should parse 'nl'", () => {
      expect(() => parser.parse("nl")).not.toThrow();
    });

    test("1-214: should parse 'U'", () => {
      expect(() => parser.parse("U")).not.toThrow();
    });

    test("1-215: should parse 'ug'", () => {
      expect(() => parser.parse("ug")).not.toThrow();
    });

    test("1-216: should parse 'ul'", () => {
      expect(() => parser.parse("ul")).not.toThrow();
    });

    test("1-217: should parse 'umol'", () => {
      expect(() => parser.parse("umol")).not.toThrow();
    });

    test("1-218: should parse 'a'", () => {
      expect(() => parser.parse("a")).not.toThrow();
    });

    test("1-219: should parse 'd'", () => {
      expect(() => parser.parse("d")).not.toThrow();
    });

    test("1-220: should parse 'h'", () => {
      expect(() => parser.parse("h")).not.toThrow();
    });

    test("1-221: should parse 'min'", () => {
      expect(() => parser.parse("min")).not.toThrow();
    });

    test("1-222: should parse 'mo'", () => {
      expect(() => parser.parse("mo")).not.toThrow();
    });

    test("1-223: should parse 's'", () => {
      expect(() => parser.parse("s")).not.toThrow();
    });

    test("1-224: should parse 'wk'", () => {
      expect(() => parser.parse("wk")).not.toThrow();
    });

    test("1-225: should parse '[ft_i]'", () => {
      expect(() => parser.parse("[ft_i]")).not.toThrow();
    });

    test("1-226: should parse '[in_i]'", () => {
      expect(() => parser.parse("[in_i]")).not.toThrow();
    });

    test("1-227: should parse '[lb_av]'", () => {
      expect(() => parser.parse("[lb_av]")).not.toThrow();
    });

    test("1-228: should parse '[oz_av]'", () => {
      expect(() => parser.parse("[oz_av]")).not.toThrow();
    });

    test("1-229: should parse '[yd_i]'", () => {
      expect(() => parser.parse("[yd_i]")).not.toThrow();
    });

    test("1-230: should parse 'cm'", () => {
      expect(() => parser.parse("cm")).not.toThrow();
    });

    test("1-231: should parse 'g'", () => {
      expect(() => parser.parse("g")).not.toThrow();
    });

    test("1-232: should parse 'kg'", () => {
      expect(() => parser.parse("kg")).not.toThrow();
    });

    test("1-233: should parse 'm'", () => {
      expect(() => parser.parse("m")).not.toThrow();
    });

    test("1-234: should parse 'mm'", () => {
      expect(() => parser.parse("mm")).not.toThrow();
    });

    test("1-235: should parse '[mi_us]'", () => {
      expect(() => parser.parse("[mi_us]")).not.toThrow();
    });

    test("1-236: should parse '[yd_i]'", () => {
      expect(() => parser.parse("[yd_i]")).not.toThrow();
    });

    test("1-237: should parse 'deg'", () => {
      expect(() => parser.parse("deg")).not.toThrow();
    });

    test("1-238: should parse 'km'", () => {
      expect(() => parser.parse("km")).not.toThrow();
    });

    test("1-239: should parse 'm'", () => {
      expect(() => parser.parse("m")).not.toThrow();
    });

    test("1-240: should parse '%'", () => {
      expect(() => parser.parse("%")).not.toThrow();
    });

    test("1-241: should parse '/[HPF]'", () => {
      expect(() => parser.parse("/[HPF]")).not.toThrow();
    });

    test("1-242: should parse '/[LPF]'", () => {
      expect(() => parser.parse("/[LPF]")).not.toThrow();
    });

    test("1-243: should parse '/L'", () => {
      expect(() => parser.parse("/L")).not.toThrow();
    });

    test("1-244: should parse '/mL'", () => {
      expect(() => parser.parse("/mL")).not.toThrow();
    });

    test("1-245: should parse '/mmol'", () => {
      expect(() => parser.parse("/mmol")).not.toThrow();
    });

    test("1-246: should parse '[APL'U]'", () => {
      expect(() => parser.parse("[APL'U]")).not.toThrow();
    });

    test("1-248: should parse '[GPL'U]'", () => {
      expect(() => parser.parse("[GPL'U]")).not.toThrow();
    });

    test("1-249: should parse '[IU]'", () => {
      expect(() => parser.parse("[IU]")).not.toThrow();
    });

    test("1-250: should parse '[IU]/d'", () => {
      expect(() => parser.parse("[IU]/d")).not.toThrow();
    });

    test("1-251: should parse '[IU]/L'", () => {
      expect(() => parser.parse("[IU]/L")).not.toThrow();
    });

    test("1-252: should parse '[IU]/mL'", () => {
      expect(() => parser.parse("[IU]/mL")).not.toThrow();
    });

    test("1-253: should parse '[MPL'U]'", () => {
      expect(() => parser.parse("[MPL'U]")).not.toThrow();
    });

    test("1-254: should parse '10*12/L'", () => {
      expect(() => parser.parse("10*12/L")).not.toThrow();
    });

    test("1-255: should parse '10*6/L'", () => {
      expect(() => parser.parse("10*6/L")).not.toThrow();
    });

    test("1-256: should parse '10*9/L'", () => {
      expect(() => parser.parse("10*9/L")).not.toThrow();
    });

    test("1-257: should parse 'Cel'", () => {
      expect(() => parser.parse("Cel")).not.toThrow();
    });

    test("1-258: should parse 'cm'", () => {
      expect(() => parser.parse("cm")).not.toThrow();
    });

    test("1-259: should parse 'cm/s'", () => {
      expect(() => parser.parse("cm/s")).not.toThrow();
    });

    test("1-260: should parse 'fL'", () => {
      expect(() => parser.parse("fL")).not.toThrow();
    });

    test("1-261: should parse 'fmol/L'", () => {
      expect(() => parser.parse("fmol/L")).not.toThrow();
    });

    test("1-262: should parse 'g'", () => {
      expect(() => parser.parse("g")).not.toThrow();
    });

    test("1-268: should parse 'g/d'", () => {
      expect(() => parser.parse("g/d")).not.toThrow();
    });

    test("1-269: should parse 'g/g'", () => {
      expect(() => parser.parse("g/g")).not.toThrow();
    });

    test("1-270: should parse 'g/L'", () => {
      expect(() => parser.parse("g/L")).not.toThrow();
    });

    test("1-271: should parse 'h'", () => {
      expect(() => parser.parse("h")).not.toThrow();
    });

    test("1-272: should parse 'km'", () => {
      expect(() => parser.parse("km")).not.toThrow();
    });

    test("1-273: should parse 'kU/L'", () => {
      expect(() => parser.parse("kU/L")).not.toThrow();
    });

    test("1-274: should parse 'L/L'", () => {
      expect(() => parser.parse("L/L")).not.toThrow();
    });

    test("1-275: should parse 'm[IU]/L'", () => {
      expect(() => parser.parse("m[IU]/L")).not.toThrow();
    });

    test("1-276: should parse 'mg'", () => {
      expect(() => parser.parse("mg")).not.toThrow();
    });

    test("1-278: should parse 'mg/d'", () => {
      expect(() => parser.parse("mg/d")).not.toThrow();
    });

    test("1-279: should parse 'mg/g'", () => {
      expect(() => parser.parse("mg/g")).not.toThrow();
    });

    test("1-280: should parse 'mg/L'", () => {
      expect(() => parser.parse("mg/L")).not.toThrow();
    });

    test("1-281: should parse 'mg/mg'", () => {
      expect(() => parser.parse("mg/mg")).not.toThrow();
    });

    test("1-282: should parse 'mg/mL'", () => {
      expect(() => parser.parse("mg/mL")).not.toThrow();
    });

    test("1-283: should parse 'min'", () => {
      expect(() => parser.parse("min")).not.toThrow();
    });

    test("1-284: should parse 'mL'", () => {
      expect(() => parser.parse("mL")).not.toThrow();
    });

    test("1-293: should parse 'mL/d'", () => {
      expect(() => parser.parse("mL/d")).not.toThrow();
    });

    test("1-294: should parse 'mL/min'", () => {
      expect(() => parser.parse("mL/min")).not.toThrow();
    });

    test("1-295: should parse 'mm'", () => {
      expect(() => parser.parse("mm")).not.toThrow();
    });

    test("1-296: should parse 'mm/h'", () => {
      expect(() => parser.parse("mm/h")).not.toThrow();
    });

    test("1-297: should parse 'mm[Hg]'", () => {
      expect(() => parser.parse("mm[Hg]")).not.toThrow();
    });

    test("1-298: should parse 'mmol'", () => {
      expect(() => parser.parse("mmol")).not.toThrow();
    });

    test("1-302: should parse 'mmol/d'", () => {
      expect(() => parser.parse("mmol/d")).not.toThrow();
    });

    test("1-303: should parse 'mmol/g'", () => {
      expect(() => parser.parse("mmol/g")).not.toThrow();
    });

    test("1-304: should parse 'mmol/kg'", () => {
      expect(() => parser.parse("mmol/kg")).not.toThrow();
    });

    test("1-306: should parse 'mmol/L'", () => {
      expect(() => parser.parse("mmol/L")).not.toThrow();
    });

    test("1-307: should parse 'mmol/mmol'", () => {
      expect(() => parser.parse("mmol/mmol")).not.toThrow();
    });

    test("1-308: should parse 'mU/L'", () => {
      expect(() => parser.parse("mU/L")).not.toThrow();
    });

    test("1-309: should parse 'ng/d'", () => {
      expect(() => parser.parse("ng/d")).not.toThrow();
    });

    test("1-310: should parse 'ng/g'", () => {
      expect(() => parser.parse("ng/g")).not.toThrow();
    });

    test("1-311: should parse 'ng/L'", () => {
      expect(() => parser.parse("ng/L")).not.toThrow();
    });

    test("1-312: should parse 'ng/mL'", () => {
      expect(() => parser.parse("ng/mL")).not.toThrow();
    });

    test("1-313: should parse 'nmol/d'", () => {
      expect(() => parser.parse("nmol/d")).not.toThrow();
    });

    test("1-314: should parse 'nmol/g'", () => {
      expect(() => parser.parse("nmol/g")).not.toThrow();
    });

    test("1-315: should parse 'nmol/h/mL'", () => {
      expect(() => parser.parse("nmol/h/mL")).not.toThrow();
    });

    test("1-316: should parse 'nmol/L'", () => {
      expect(() => parser.parse("nmol/L")).not.toThrow();
    });

    test("1-317: should parse 'nmol/mmol'", () => {
      expect(() => parser.parse("nmol/mmol")).not.toThrow();
    });

    test("1-318: should parse 'nmol/nmol'", () => {
      expect(() => parser.parse("nmol/nmol")).not.toThrow();
    });

    test("1-319: should parse 'pg'", () => {
      expect(() => parser.parse("pg")).not.toThrow();
    });

    test("1-320: should parse 'pg/mL'", () => {
      expect(() => parser.parse("pg/mL")).not.toThrow();
    });

    test("1-321: should parse 'pmol/d'", () => {
      expect(() => parser.parse("pmol/d")).not.toThrow();
    });

    test("1-322: should parse 'pmol/g'", () => {
      expect(() => parser.parse("pmol/g")).not.toThrow();
    });

    test("1-323: should parse 'pmol/h/mg'", () => {
      expect(() => parser.parse("pmol/h/mg")).not.toThrow();
    });

    test("1-324: should parse 'pmol/h/mL'", () => {
      expect(() => parser.parse("pmol/h/mL")).not.toThrow();
    });

    test("1-325: should parse 'pmol/L'", () => {
      expect(() => parser.parse("pmol/L")).not.toThrow();
    });

    test("1-326: should parse 'pmol/mmol'", () => {
      expect(() => parser.parse("pmol/mmol")).not.toThrow();
    });

    test("1-327: should parse 's'", () => {
      expect(() => parser.parse("s")).not.toThrow();
    });

    test("1-328: should parse 'U'", () => {
      expect(() => parser.parse("U")).not.toThrow();
    });

    test("1-332: should parse 'U/d'", () => {
      expect(() => parser.parse("U/d")).not.toThrow();
    });

    test("1-333: should parse 'U/g'", () => {
      expect(() => parser.parse("U/g")).not.toThrow();
    });

    test("1-334: should parse 'U/kg'", () => {
      expect(() => parser.parse("U/kg")).not.toThrow();
    });

    test("1-335: should parse 'U/L'", () => {
      expect(() => parser.parse("U/L")).not.toThrow();
    });

    test("1-336: should parse 'U/mL'", () => {
      expect(() => parser.parse("U/mL")).not.toThrow();
    });

    test("1-337: should parse 'u[IU]/mL'", () => {
      expect(() => parser.parse("u[IU]/mL")).not.toThrow();
    });

    test("1-338: should parse 'ug'", () => {
      expect(() => parser.parse("ug")).not.toThrow();
    });

    test("1-339: should parse 'ug/d'", () => {
      expect(() => parser.parse("ug/d")).not.toThrow();
    });

    test("1-340: should parse 'ug/g'", () => {
      expect(() => parser.parse("ug/g")).not.toThrow();
    });

    test("1-341: should parse 'ug/L'", () => {
      expect(() => parser.parse("ug/L")).not.toThrow();
    });

    test("1-342: should parse 'ug/mL'", () => {
      expect(() => parser.parse("ug/mL")).not.toThrow();
    });

    test("1-343: should parse 'um/s'", () => {
      expect(() => parser.parse("um/s")).not.toThrow();
    });

    test("1-344: should parse 'umol'", () => {
      expect(() => parser.parse("umol")).not.toThrow();
    });

    test("1-345: should parse 'umol/2.h'", () => {
      expect(() => parser.parse("umol/2.h")).not.toThrow();
    });

    test("1-346: should parse 'umol/d'", () => {
      expect(() => parser.parse("umol/d")).not.toThrow();
    });

    test("1-347: should parse 'umol/g'", () => {
      expect(() => parser.parse("umol/g")).not.toThrow();
    });

    test("1-348: should parse 'umol/L'", () => {
      expect(() => parser.parse("umol/L")).not.toThrow();
    });

    test("1-349: should parse 'umol/mmol'", () => {
      expect(() => parser.parse("umol/mmol")).not.toThrow();
    });

    test("1-350: should parse 'umol/umol'", () => {
      expect(() => parser.parse("umol/umol")).not.toThrow();
    });

    test("1-351: should parse 'wk'", () => {
      expect(() => parser.parse("wk")).not.toThrow();
    });

    test("k=1=001: should parse '[arb'U]'", () => {
      expect(() => parser.parse("[arb'U]")).not.toThrow();
    });

    test("k=1=002: should parse 'dyn.s/(cm5.m2)'", () => {
      expect(() => parser.parse("dyn.s/(cm5.m2)")).not.toThrow();
    });

    test("k=1=003: should parse '[iU]/mL'", () => {
      expect(() => parser.parse("[iU]/mL")).not.toThrow();
    });

    test("k=1=004: should parse 'mL/h'", () => {
      expect(() => parser.parse("mL/h")).not.toThrow();
    });

    test("k=1=005: should parse '[bdsk'U]'", () => {
      expect(() => parser.parse("[bdsk'U]")).not.toThrow();
    });

    test("k=1=006: should parse 'dyn.s/cm5'", () => {
      expect(() => parser.parse("dyn.s/cm5")).not.toThrow();
    });

    test("k=1=007: should parse 'K/W'", () => {
      expect(() => parser.parse("K/W")).not.toThrow();
    });

    test("k=1=008: should parse 'mm[Hg]'", () => {
      expect(() => parser.parse("mm[Hg]")).not.toThrow();
    });

    test("k=1=009: should parse '{bsa}'", () => {
      expect(() => parser.parse("{bsa}")).not.toThrow();
    });

    test("k=1=010: should parse 'cm[H2O]'", () => {
      expect(() => parser.parse("cm[H2O]")).not.toThrow();
    });

    test("k=1=011: should parse 'kg{body_wt}'", () => {
      expect(() => parser.parse("kg{body_wt}")).not.toThrow();
    });

    test("k=1=012: should parse 'mm/h'", () => {
      expect(() => parser.parse("mm/h")).not.toThrow();
    });

    test("k=1=013: should parse 'cal'", () => {
      expect(() => parser.parse("cal")).not.toThrow();
    });

    test("k=1=014: should parse 'cm[H2O].s/L'", () => {
      expect(() => parser.parse("cm[H2O].s/L")).not.toThrow();
    });

    test("k=1=015: should parse 'kg/m2'", () => {
      expect(() => parser.parse("kg/m2")).not.toThrow();
    });

    test("k=1=016: should parse 'mmol/(8.h.kg)'", () => {
      expect(() => parser.parse("mmol/(8.h.kg)")).not.toThrow();
    });

    test("k=1=017: should parse '{cfu}'", () => {
      expect(() => parser.parse("{cfu}")).not.toThrow();
    });

    test("k=1=018: should parse 'cm[H2O]/(s.m)'", () => {
      expect(() => parser.parse("cm[H2O]/(s.m)")).not.toThrow();
    });

    test("k=1=019: should parse 'kg/h'", () => {
      expect(() => parser.parse("kg/h")).not.toThrow();
    });

    test("k=1=010: should parse 'mmol/(8.h)'", () => {
      expect(() => parser.parse("mmol/(8.h)")).not.toThrow();
    });

    test("k=1=021: should parse '[drp]'", () => {
      expect(() => parser.parse("[drp]")).not.toThrow();
    });

    test("k=1=022: should parse 'dB[SPL]'", () => {
      expect(() => parser.parse("dB[SPL]")).not.toThrow();
    });

    test("k=1=023: should parse 'L/(8.h)'", () => {
      expect(() => parser.parse("L/(8.h)")).not.toThrow();
    });

    test("k=1=024: should parse 'mmol/(kg.h)'", () => {
      expect(() => parser.parse("mmol/(kg.h)")).not.toThrow();
    });

    test("k=1=025: should parse '[ka'U]'", () => {
      expect(() => parser.parse("[ka'U]")).not.toThrow();
    });

    test("k=1=026: should parse 'REM'", () => {
      expect(() => parser.parse("REM")).not.toThrow();
    });

    test("k=1=027: should parse 'L/h'", () => {
      expect(() => parser.parse("L/h")).not.toThrow();
    });

    test("k=1=028: should parse 'mmol/h'", () => {
      expect(() => parser.parse("mmol/h")).not.toThrow();
    });

    test("k=1=029: should parse 'kcal'", () => {
      expect(() => parser.parse("kcal")).not.toThrow();
    });

    test("k=1=030: should parse 'g{creat}'", () => {
      expect(() => parser.parse("g{creat}")).not.toThrow();
    });

    test("k=1=031: should parse '[lb_av]'", () => {
      expect(() => parser.parse("[lb_av]")).not.toThrow();
    });

    test("k=1=032: should parse 'ng/(8.h)'", () => {
      expect(() => parser.parse("ng/(8.h)")).not.toThrow();
    });

    test("k=1=033: should parse 'kcal/(8.h)'", () => {
      expect(() => parser.parse("kcal/(8.h)")).not.toThrow();
    });

    test("k=1=034: should parse 'g{hgb}'", () => {
      expect(() => parser.parse("g{hgb}")).not.toThrow();
    });

    test("k=1=035: should parse 'ng/(8.h.kg)'", () => {
      expect(() => parser.parse("ng/(8.h.kg)")).not.toThrow();
    });

    test("k=1=036: should parse 'kcal/d'", () => {
      expect(() => parser.parse("kcal/d")).not.toThrow();
    });

    test("k=1=037: should parse 'g{tit_nit}'", () => {
      expect(() => parser.parse("g{tit_nit}")).not.toThrow();
    });

    test("k=1=038: should parse 'ms/s'", () => {
      expect(() => parser.parse("ms/s")).not.toThrow();
    });

    test("k=1=039: should parse 'ng/(kg.h)'", () => {
      expect(() => parser.parse("ng/(kg.h)")).not.toThrow();
    });

    test("k=1=040: should parse 'kcal/h'", () => {
      expect(() => parser.parse("kcal/h")).not.toThrow();
    });

    test("k=1=041: should parse 'g{tot_prot}'", () => {
      expect(() => parser.parse("g{tot_prot}")).not.toThrow();
    });

    test("k=1=042: should parse 'Ms'", () => {
      expect(() => parser.parse("Ms")).not.toThrow();
    });

    test("k=1=043: should parse 'ng/h'", () => {
      expect(() => parser.parse("ng/h")).not.toThrow();
    });

    test("k=1=044: should parse '[knk'U]'", () => {
      expect(() => parser.parse("[knk'U]")).not.toThrow();
    });

    test("k=1=045: should parse 'g{wet_tis}'", () => {
      expect(() => parser.parse("g{wet_tis}")).not.toThrow();
    });

    test("k=1=046: should parse 'meq/(8.h)'", () => {
      expect(() => parser.parse("meq/(8.h)")).not.toThrow();
    });

    test("k=1=047: should parse 'osm'", () => {
      expect(() => parser.parse("osm")).not.toThrow();
    });

    test("k=1=048: should parse '[mclg'U]'", () => {
      expect(() => parser.parse("[mclg'U]")).not.toThrow();
    });

    test("k=1=049: should parse 'g.m/m2{hb}'", () => {
      expect(() => parser.parse("g.m/m2{hb}")).not.toThrow();
    });

    test("k=1=050: should parse 'meq/(8.h.kg)'", () => {
      expect(() => parser.parse("meq/(8.h.kg)")).not.toThrow();
    });

    test("k=1=051: should parse 'osm/kg'", () => {
      expect(() => parser.parse("osm/kg")).not.toThrow();
    });

    test("k=1=052: should parse '{od}'", () => {
      expect(() => parser.parse("{od}")).not.toThrow();
    });

    test("k=1=053: should parse 'g.m/{hb}'", () => {
      expect(() => parser.parse("g.m/{hb}")).not.toThrow();
    });

    test("k=1=054: should parse 'meq/(kg.h)'", () => {
      expect(() => parser.parse("meq/(kg.h)")).not.toThrow();
    });

    test("k=1=055: should parse 'osm/L'", () => {
      expect(() => parser.parse("osm/L")).not.toThrow();
    });

    test("k=1=056: should parse 'pH'", () => {
      expect(() => parser.parse("pH")).not.toThrow();
    });

    test("k=1=057: should parse 'g/(8.h)'", () => {
      expect(() => parser.parse("g/(8.h)")).not.toThrow();
    });

    test("k=1=058: should parse 'meq/h'", () => {
      expect(() => parser.parse("meq/h")).not.toThrow();
    });

    test("k=1=059: should parse 'pA'", () => {
      expect(() => parser.parse("pA")).not.toThrow();
    });

    test("k=1=060: should parse '[ppb]'", () => {
      expect(() => parser.parse("[ppb]")).not.toThrow();
    });

    test("k=1=061: should parse 'g/(8.kg.h)'", () => {
      expect(() => parser.parse("g/(8.kg.h)")).not.toThrow();
    });

    test("k=1=062: should parse 'mg/(8.h)'", () => {
      expect(() => parser.parse("mg/(8.h)")).not.toThrow();
    });

    test("k=1=063: should parse 'Pa'", () => {
      expect(() => parser.parse("Pa")).not.toThrow();
    });

    test("k=1=064: should parse '[ppm]'", () => {
      expect(() => parser.parse("[ppm]")).not.toThrow();
    });

    test("k=1=065: should parse 'g/(kg.h)'", () => {
      expect(() => parser.parse("g/(kg.h)")).not.toThrow();
    });

    test("k=1=066: should parse 'mg/(8.h.kg)'", () => {
      expect(() => parser.parse("mg/(8.h.kg)")).not.toThrow();
    });

    test("k=1=067: should parse '[pptr]'", () => {
      expect(() => parser.parse("[pptr]")).not.toThrow();
    });

    test("k=1=068: should parse 'g/h'", () => {
      expect(() => parser.parse("g/h")).not.toThrow();
    });

    test("k=1=069: should parse 'mg/(kg.h)'", () => {
      expect(() => parser.parse("mg/(kg.h)")).not.toThrow();
    });

    test("k=1=070: should parse 'S'", () => {
      expect(() => parser.parse("S")).not.toThrow();
    });

    test("k=1=071: should parse '[ppth]'", () => {
      expect(() => parser.parse("[ppth]")).not.toThrow();
    });

    test("k=1=072: should parse '[in_us]'", () => {
      expect(() => parser.parse("[in_us]")).not.toThrow();
    });

    test("k=1=073: should parse 'mg/h'", () => {
      expect(() => parser.parse("mg/h")).not.toThrow();
    });

    test("k=1=075: should parse '[todd'U]'", () => {
      expect(() => parser.parse("[todd'U]")).not.toThrow();
    });

    test("k=1=076: should parse '[in_i'Hg]'", () => {
      expect(() => parser.parse("[in_i'Hg]")).not.toThrow();
    });

    test("k=1=077: should parse 'm[iU]/mL'", () => {
      expect(() => parser.parse("m[iU]/mL")).not.toThrow();
    });

    test("k=1=078: should parse 'ug/(8.h.kg)'", () => {
      expect(() => parser.parse("ug/(8.h.kg)")).not.toThrow();
    });

    test("k=1=079: should parse '/[arb'U]'", () => {
      expect(() => parser.parse("/[arb'U]")).not.toThrow();
    });

    test("k=1=080: should parse '[iU]'", () => {
      expect(() => parser.parse("[iU]")).not.toThrow();
    });

    test("k=1=081: should parse 'mL/{hb}.m2'", () => {
      expect(() => parser.parse("mL/{hb}.m2")).not.toThrow();
    });

    test("k=1=082: should parse 'ug/(kg.h)'", () => {
      expect(() => parser.parse("ug/(kg.h)")).not.toThrow();
    });

    test("k=1=083: should parse '[HPF]'", () => {
      expect(() => parser.parse("[HPF]")).not.toThrow();
    });

    test("k=1=084: should parse '[iU]/d'", () => {
      expect(() => parser.parse("[iU]/d")).not.toThrow();
    });

    test("k=1=085: should parse 'mL/(8.h)'", () => {
      expect(() => parser.parse("mL/(8.h)")).not.toThrow();
    });

    test("k=1=086: should parse 'ug/h'", () => {
      expect(() => parser.parse("ug/h")).not.toThrow();
    });

    test("k=1=087: should parse '/{tot}'", () => {
      expect(() => parser.parse("/{tot}")).not.toThrow();
    });

    test("k=1=088: should parse '[iU]/h'", () => {
      expect(() => parser.parse("[iU]/h")).not.toThrow();
    });

    test("k=1=089: should parse 'mL/(8.h.kg)'", () => {
      expect(() => parser.parse("mL/(8.h.kg)")).not.toThrow();
    });

    test("k=1=090: should parse 'u[iU]'", () => {
      expect(() => parser.parse("u[iU]")).not.toThrow();
    });

    test("k=1=091: should parse '/[iU]'", () => {
      expect(() => parser.parse("/[iU]")).not.toThrow();
    });

    test("k=1=092: should parse '[iU]/kg'", () => {
      expect(() => parser.parse("[iU]/kg")).not.toThrow();
    });

    test("k=1=093: should parse 'mL/{hb}'", () => {
      expect(() => parser.parse("mL/{hb}")).not.toThrow();
    });

    test("k=1=094: should parse '10*3{rbc}'", () => {
      expect(() => parser.parse("10*3{rbc}")).not.toThrow();
    });

    test("k=1=095: should parse '[iU]/L'", () => {
      expect(() => parser.parse("[iU]/L")).not.toThrow();
    });

    test("k=1=096: should parse 'mL/(kg.h)'", () => {
      expect(() => parser.parse("mL/(kg.h)")).not.toThrow();
    });

    test("k=1=097: should parse '10.L/(min.m2)'", () => {
      expect(() => parser.parse("10.L/(min.m2)")).not.toThrow();
    });

    test("k=1=098: should parse '[iU]/min'", () => {
      expect(() => parser.parse("[iU]/min")).not.toThrow();
    });

    test("k=1=099: should parse 'mL/cm[H2O]'", () => {
      expect(() => parser.parse("mL/cm[H2O]")).not.toThrow();
    });

    test("k=1=100: should parse '%'", () => {
      expect(() => parser.parse("%")).not.toThrow();
    });

    test("k=1=101: should parse 'bar'", () => {
      expect(() => parser.parse("bar")).not.toThrow();
    });

    test("k=1=102: should parse 'g/L'", () => {
      expect(() => parser.parse("g/L")).not.toThrow();
    });

    test("k=1=103: should parse 'L.s'", () => {
      expect(() => parser.parse("L.s")).not.toThrow();
    });

    test("k=1=104: should parse 'mg'", () => {
      expect(() => parser.parse("mg")).not.toThrow();
    });

    test("k=1=105: should parse 'mmol/(kg.d)'", () => {
      expect(() => parser.parse("mmol/(kg.d)")).not.toThrow();
    });

    test("k=1=106: should parse 'ng/L'", () => {
      expect(() => parser.parse("ng/L")).not.toThrow();
    });

    test("k=1=107: should parse 'ueq'", () => {
      expect(() => parser.parse("ueq")).not.toThrow();
    });

    test("k=1=108: should parse '/kg'", () => {
      expect(() => parser.parse("/kg")).not.toThrow();
    });

    test("k=1=109: should parse 'Bq'", () => {
      expect(() => parser.parse("Bq")).not.toThrow();
    });

    test("k=1=110: should parse 'g/m2'", () => {
      expect(() => parser.parse("g/m2")).not.toThrow();
    });

    test("k=1=111: should parse 'L/(min.m2)'", () => {
      expect(() => parser.parse("L/(min.m2)")).not.toThrow();
    });

    test("k=1=112: should parse 'mg/(kg.d)'", () => {
      expect(() => parser.parse("mg/(kg.d)")).not.toThrow();
    });

    test("k=1=113: should parse 'mmol/(kg.min)'", () => {
      expect(() => parser.parse("mmol/(kg.min)")).not.toThrow();
    });

    test("k=1=114: should parse 'ng/m2'", () => {
      expect(() => parser.parse("ng/m2")).not.toThrow();
    });

    test("k=1=115: should parse 'ug'", () => {
      expect(() => parser.parse("ug")).not.toThrow();
    });

    test("k=1=116: should parse '/L'", () => {
      expect(() => parser.parse("/L")).not.toThrow();
    });

    test("k=1=117: should parse 'Cel'", () => {
      expect(() => parser.parse("Cel")).not.toThrow();
    });

    test("k=1=118: should parse 'g/min'", () => {
      expect(() => parser.parse("g/min")).not.toThrow();
    });

    test("k=1=119: should parse 'L/d'", () => {
      expect(() => parser.parse("L/d")).not.toThrow();
    });

    test("k=1=120: should parse 'mg/(kg.min)'", () => {
      expect(() => parser.parse("mg/(kg.min)")).not.toThrow();
    });

    test("k=1=121: should parse 'mmol/kg'", () => {
      expect(() => parser.parse("mmol/kg")).not.toThrow();
    });

    test("k=1=122: should parse 'ng/min'", () => {
      expect(() => parser.parse("ng/min")).not.toThrow();
    });

    test("k=1=123: should parse 'ug/(kg.d)'", () => {
      expect(() => parser.parse("ug/(kg.d)")).not.toThrow();
    });

    test("k=1=124: should parse '/m3'", () => {
      expect(() => parser.parse("/m3")).not.toThrow();
    });

    test("k=1=125: should parse 'cm'", () => {
      expect(() => parser.parse("cm")).not.toThrow();
    });

    test("k=1=126: should parse 'Gy'", () => {
      expect(() => parser.parse("Gy")).not.toThrow();
    });

    test("k=1=127: should parse 'L/kg'", () => {
      expect(() => parser.parse("L/kg")).not.toThrow();
    });

    test("k=1=128: should parse 'mg/d'", () => {
      expect(() => parser.parse("mg/d")).not.toThrow();
    });

    test("k=1=129: should parse 'mmol/L'", () => {
      expect(() => parser.parse("mmol/L")).not.toThrow();
    });

    test("k=1=130: should parse 'ng/mL'", () => {
      expect(() => parser.parse("ng/mL")).not.toThrow();
    });

    test("k=1=131: should parse 'ug/(kg.min)'", () => {
      expect(() => parser.parse("ug/(kg.min)")).not.toThrow();
    });

    test("k=1=132: should parse '/min'", () => {
      expect(() => parser.parse("/min")).not.toThrow();
    });

    test("k=1=133: should parse 'cm2/s'", () => {
      expect(() => parser.parse("cm2/s")).not.toThrow();
    });

    test("k=1=134: should parse 'h'", () => {
      expect(() => parser.parse("h")).not.toThrow();
    });

    test("k=1=135: should parse 'L/min'", () => {
      expect(() => parser.parse("L/min")).not.toThrow();
    });

    test("k=1=136: should parse 'mg/dL'", () => {
      expect(() => parser.parse("mg/dL")).not.toThrow();
    });

    test("k=1=137: should parse 'mmol/m2'", () => {
      expect(() => parser.parse("mmol/m2")).not.toThrow();
    });

    test("k=1=138: should parse 'ng/s'", () => {
      expect(() => parser.parse("ng/s")).not.toThrow();
    });

    test("k=1=139: should parse 'ug/d'", () => {
      expect(() => parser.parse("ug/d")).not.toThrow();
    });

    test("k=1=140: should parse '/m3'", () => {
      expect(() => parser.parse("/m3")).not.toThrow();
    });

    test("k=1=141: should parse 'd'", () => {
      expect(() => parser.parse("d")).not.toThrow();
    });

    test("k=1=142: should parse 'hL'", () => {
      expect(() => parser.parse("hL")).not.toThrow();
    });

    test("k=1=143: should parse 'L/s'", () => {
      expect(() => parser.parse("L/s")).not.toThrow();
    });

    test("k=1=144: should parse 'mg/kg'", () => {
      expect(() => parser.parse("mg/kg")).not.toThrow();
    });

    test("k=1=145: should parse 'mmol/min'", () => {
      expect(() => parser.parse("mmol/min")).not.toThrow();
    });

    test("k=1=146: should parse 'nkat'", () => {
      expect(() => parser.parse("nkat")).not.toThrow();
    });

    test("k=1=147: should parse 'ug/dL'", () => {
      expect(() => parser.parse("ug/dL")).not.toThrow();
    });

    test("k=1=148: should parse '/min'", () => {
      expect(() => parser.parse("/min")).not.toThrow();
    });

    test("k=1=149: should parse 'dB'", () => {
      expect(() => parser.parse("dB")).not.toThrow();
    });

    test("k=1=150: should parse 'J/L'", () => {
      expect(() => parser.parse("J/L")).not.toThrow();
    });

    test("k=1=151: should parse 'lm'", () => {
      expect(() => parser.parse("lm")).not.toThrow();
    });

    test("k=1=152: should parse 'mg/L'", () => {
      expect(() => parser.parse("mg/L")).not.toThrow();
    });

    test("k=1=153: should parse 'mol/(kg.s)'", () => {
      expect(() => parser.parse("mol/(kg.s)")).not.toThrow();
    });

    test("k=1=154: should parse 'nm'", () => {
      expect(() => parser.parse("nm")).not.toThrow();
    });

    test("k=1=155: should parse 'ug/g'", () => {
      expect(() => parser.parse("ug/g")).not.toThrow();
    });

    test("k=1=156: should parse '/mL'", () => {
      expect(() => parser.parse("/mL")).not.toThrow();
    });

    test("k=1=157: should parse 'deg'", () => {
      expect(() => parser.parse("deg")).not.toThrow();
    });

    test("k=1=158: should parse 'kat'", () => {
      expect(() => parser.parse("kat")).not.toThrow();
    });

    test("k=1=159: should parse 'm'", () => {
      expect(() => parser.parse("m")).not.toThrow();
    });

    test("k=1=160: should parse 'mg/m2'", () => {
      expect(() => parser.parse("mg/m2")).not.toThrow();
    });

    test("k=1=161: should parse 'mol/kg'", () => {
      expect(() => parser.parse("mol/kg")).not.toThrow();
    });

    test("k=1=162: should parse 'nmol/s'", () => {
      expect(() => parser.parse("nmol/s")).not.toThrow();
    });

    test("k=1=163: should parse 'ug/kg'", () => {
      expect(() => parser.parse("ug/kg")).not.toThrow();
    });

    test("k=1=164: should parse '1/mL'", () => {
      expect(() => parser.parse("1/mL")).not.toThrow();
    });

    test("k=1=165: should parse 'eq'", () => {
      expect(() => parser.parse("eq")).not.toThrow();
    });

    test("k=1=166: should parse 'kat/kg'", () => {
      expect(() => parser.parse("kat/kg")).not.toThrow();
    });

    test("k=1=167: should parse 'm/s2'", () => {
      expect(() => parser.parse("m/s2")).not.toThrow();
    });

    test("k=1=168: should parse 'mg/m3'", () => {
      expect(() => parser.parse("mg/m3")).not.toThrow();
    });

    test("k=1=169: should parse 'mol/L'", () => {
      expect(() => parser.parse("mol/L")).not.toThrow();
    });

    test("k=1=170: should parse 'ns'", () => {
      expect(() => parser.parse("ns")).not.toThrow();
    });

    test("k=1=171: should parse 'ug/L'", () => {
      expect(() => parser.parse("ug/L")).not.toThrow();
    });

    test("k=1=172: should parse '10*12/L'", () => {
      expect(() => parser.parse("10*12/L")).not.toThrow();
    });

    test("k=1=173: should parse 'eV'", () => {
      expect(() => parser.parse("eV")).not.toThrow();
    });

    test("k=1=174: should parse 'kat/L'", () => {
      expect(() => parser.parse("kat/L")).not.toThrow();
    });

    test("k=1=175: should parse 'm2'", () => {
      expect(() => parser.parse("m2")).not.toThrow();
    });

    test("k=1=176: should parse 'mg/min'", () => {
      expect(() => parser.parse("mg/min")).not.toThrow();
    });

    test("k=1=177: should parse 'mol/m3'", () => {
      expect(() => parser.parse("mol/m3")).not.toThrow();
    });

    test("k=1=178: should parse 'Ohm'", () => {
      expect(() => parser.parse("Ohm")).not.toThrow();
    });

    test("k=1=179: should parse 'ug/m2'", () => {
      expect(() => parser.parse("ug/m2")).not.toThrow();
    });

    test("k=1=180: should parse '10*3/L'", () => {
      expect(() => parser.parse("10*3/L")).not.toThrow();
    });

    test("k=1=182: should parse 'kg'", () => {
      expect(() => parser.parse("kg")).not.toThrow();
    });

    test("k=1=183: should parse 'm2/s'", () => {
      expect(() => parser.parse("m2/s")).not.toThrow();
    });

    test("k=1=184: should parse 'mL'", () => {
      expect(() => parser.parse("mL")).not.toThrow();
    });

    test("k=1=185: should parse 'mol/s'", () => {
      expect(() => parser.parse("mol/s")).not.toThrow();
    });

    test("k=1=186: should parse 'Ohm.m'", () => {
      expect(() => parser.parse("Ohm.m")).not.toThrow();
    });

    test("k=1=187: should parse 'ug/min'", () => {
      expect(() => parser.parse("ug/min")).not.toThrow();
    });

    test("k=1=188: should parse '10*3/mL'", () => {
      expect(() => parser.parse("10*3/mL")).not.toThrow();
    });

    test("k=1=189: should parse 'fg'", () => {
      expect(() => parser.parse("fg")).not.toThrow();
    });

    test("k=1=190: should parse 'kg.m/s'", () => {
      expect(() => parser.parse("kg.m/s")).not.toThrow();
    });

    test("k=1=191: should parse 'm3/s'", () => {
      expect(() => parser.parse("m3/s")).not.toThrow();
    });

    test("k=1=192: should parse 'mL/(kg.d)'", () => {
      expect(() => parser.parse("mL/(kg.d)")).not.toThrow();
    });

    test("k=1=193: should parse 'mosm/L'", () => {
      expect(() => parser.parse("mosm/L")).not.toThrow();
    });

    test("k=1=194: should parse 'pg'", () => {
      expect(() => parser.parse("pg")).not.toThrow();
    });

    test("k=1=195: should parse 'ukat'", () => {
      expect(() => parser.parse("ukat")).not.toThrow();
    });

    test("k=1=196: should parse '10*3/mm3'", () => {
      expect(() => parser.parse("10*3/mm3")).not.toThrow();
    });

    test("k=1=197: should parse 'fL'", () => {
      expect(() => parser.parse("fL")).not.toThrow();
    });

    test("k=1=198: should parse 'kg/(s.m2)'", () => {
      expect(() => parser.parse("kg/(s.m2)")).not.toThrow();
    });

    test("k=1=199: should parse 'mbar'", () => {
      expect(() => parser.parse("mbar")).not.toThrow();
    });

    test("k=1=200: should parse 'mL/(kg.min)'", () => {
      expect(() => parser.parse("mL/(kg.min)")).not.toThrow();
    });

    test("k=1=201: should parse 'ms'", () => {
      expect(() => parser.parse("ms")).not.toThrow();
    });

    test("k=1=202: should parse 'pg/L'", () => {
      expect(() => parser.parse("pg/L")).not.toThrow();
    });

    test("k=1=203: should parse 'um'", () => {
      expect(() => parser.parse("um")).not.toThrow();
    });

    test("k=1=204: should parse '10*6/L'", () => {
      expect(() => parser.parse("10*6/L")).not.toThrow();
    });

    test("k=1=205: should parse 'fmol'", () => {
      expect(() => parser.parse("fmol")).not.toThrow();
    });

    test("k=1=206: should parse 'kg/L'", () => {
      expect(() => parser.parse("kg/L")).not.toThrow();
    });

    test("k=1=207: should parse 'mbar.s/L'", () => {
      expect(() => parser.parse("mbar.s/L")).not.toThrow();
    });

    test("k=1=208: should parse 'mL/(min.m2)'", () => {
      expect(() => parser.parse("mL/(min.m2)")).not.toThrow();
    });

    test("k=1=209: should parse 'mV'", () => {
      expect(() => parser.parse("mV")).not.toThrow();
    });

    test("k=1=210: should parse 'pg/mL'", () => {
      expect(() => parser.parse("pg/mL")).not.toThrow();
    });

    test("k=1=211: should parse 'umol'", () => {
      expect(() => parser.parse("umol")).not.toThrow();
    });

    test("k=1=212: should parse '10*6/mL'", () => {
      expect(() => parser.parse("10*6/mL")).not.toThrow();
    });

    test("k=1=213: should parse 'g'", () => {
      expect(() => parser.parse("g")).not.toThrow();
    });

    test("k=1=214: should parse 'kg/m3'", () => {
      expect(() => parser.parse("kg/m3")).not.toThrow();
    });

    test("k=1=215: should parse 'meq'", () => {
      expect(() => parser.parse("meq")).not.toThrow();
    });

    test("k=1=216: should parse 'mL/d'", () => {
      expect(() => parser.parse("mL/d")).not.toThrow();
    });

    test("k=1=218: should parse 'pkat'", () => {
      expect(() => parser.parse("pkat")).not.toThrow();
    });

    test("k=1=219: should parse 'umol/d'", () => {
      expect(() => parser.parse("umol/d")).not.toThrow();
    });

    test("k=1=220: should parse '10*6/mm3'", () => {
      expect(() => parser.parse("10*6/mm3")).not.toThrow();
    });

    test("k=1=221: should parse 'g.m'", () => {
      expect(() => parser.parse("g.m")).not.toThrow();
    });

    test("k=1=222: should parse 'kg/min'", () => {
      expect(() => parser.parse("kg/min")).not.toThrow();
    });

    test("k=1=223: should parse 'meq/(kg.d)'", () => {
      expect(() => parser.parse("meq/(kg.d)")).not.toThrow();
    });

    test("k=1=224: should parse 'mL/kg'", () => {
      expect(() => parser.parse("mL/kg")).not.toThrow();
    });

    test("k=1=226: should parse 'pm'", () => {
      expect(() => parser.parse("pm")).not.toThrow();
    });

    test("k=1=227: should parse 'umol/L'", () => {
      expect(() => parser.parse("umol/L")).not.toThrow();
    });

    test("k=1=228: should parse '10*9/L'", () => {
      expect(() => parser.parse("10*9/L")).not.toThrow();
    });

    test("k=1=229: should parse 'g/(kg.d)'", () => {
      expect(() => parser.parse("g/(kg.d)")).not.toThrow();
    });

    test("k=1=230: should parse 'kg/mol'", () => {
      expect(() => parser.parse("kg/mol")).not.toThrow();
    });

    test("k=1=231: should parse 'meq/(kg.min)'", () => {
      expect(() => parser.parse("meq/(kg.min)")).not.toThrow();
    });

    test("k=1=232: should parse 'mL/m2'", () => {
      expect(() => parser.parse("mL/m2")).not.toThrow();
    });

    test("k=1=233: should parse 'ng'", () => {
      expect(() => parser.parse("ng")).not.toThrow();
    });

    test("k=1=234: should parse 'pmol'", () => {
      expect(() => parser.parse("pmol")).not.toThrow();
    });

    test("k=1=235: should parse 'umol/min'", () => {
      expect(() => parser.parse("umol/min")).not.toThrow();
    });

    test("k=1=236: should parse '10*9/mL'", () => {
      expect(() => parser.parse("10*9/mL")).not.toThrow();
    });

    test("k=1=237: should parse 'g/(kg.min)'", () => {
      expect(() => parser.parse("g/(kg.min)")).not.toThrow();
    });

    test("k=1=238: should parse 'kg/s'", () => {
      expect(() => parser.parse("kg/s")).not.toThrow();
    });

    test("k=1=239: should parse 'meq/d'", () => {
      expect(() => parser.parse("meq/d")).not.toThrow();
    });

    test("k=1=240: should parse 'mL/mbar'", () => {
      expect(() => parser.parse("mL/mbar")).not.toThrow();
    });

    test("k=1=241: should parse 'ng/(kg.d)'", () => {
      expect(() => parser.parse("ng/(kg.d)")).not.toThrow();
    });

    test("k=1=242: should parse 'ps'", () => {
      expect(() => parser.parse("ps")).not.toThrow();
    });

    test("k=1=243: should parse 'us'", () => {
      expect(() => parser.parse("us")).not.toThrow();
    });

    test("k=1=244: should parse '10*9/mm3'", () => {
      expect(() => parser.parse("10*9/mm3")).not.toThrow();
    });

    test("k=1=245: should parse 'g/d'", () => {
      expect(() => parser.parse("g/d")).not.toThrow();
    });

    test("k=1=246: should parse 'kPa'", () => {
      expect(() => parser.parse("kPa")).not.toThrow();
    });

    test("k=1=247: should parse 'meq/kg'", () => {
      expect(() => parser.parse("meq/kg")).not.toThrow();
    });

    test("k=1=248: should parse 'mL/min'", () => {
      expect(() => parser.parse("mL/min")).not.toThrow();
    });

    test("k=1=249: should parse 'ng/(kg.min)'", () => {
      expect(() => parser.parse("ng/(kg.min)")).not.toThrow();
    });

    test("k=1=250: should parse 'pt'", () => {
      expect(() => parser.parse("pt")).not.toThrow();
    });

    test("k=1=251: should parse 'uV'", () => {
      expect(() => parser.parse("uV")).not.toThrow();
    });

    test("k=1=252: should parse '10.L/min'", () => {
      expect(() => parser.parse("10.L/min")).not.toThrow();
    });

    test("k=1=253: should parse 'g/dL'", () => {
      expect(() => parser.parse("g/dL")).not.toThrow();
    });

    test("k=1=254: should parse 'ks'", () => {
      expect(() => parser.parse("ks")).not.toThrow();
    });

    test("k=1=255: should parse 'meq/L'", () => {
      expect(() => parser.parse("meq/L")).not.toThrow();
    });

    test("k=1=256: should parse 'mL/s'", () => {
      expect(() => parser.parse("mL/s")).not.toThrow();
    });

    test("k=1=257: should parse 'ng/d'", () => {
      expect(() => parser.parse("ng/d")).not.toThrow();
    });

    test("k=1=258: should parse 'Sv'", () => {
      expect(() => parser.parse("Sv")).not.toThrow();
    });

    test("k=1=259: should parse 'V'", () => {
      expect(() => parser.parse("V")).not.toThrow();
    });

    test("k=1=260: should parse 'a/m'", () => {
      expect(() => parser.parse("a/m")).not.toThrow();
    });

    test("k=1=261: should parse 'g/kg'", () => {
      expect(() => parser.parse("g/kg")).not.toThrow();
    });

    test("k=1=262: should parse 'L'", () => {
      expect(() => parser.parse("L")).not.toThrow();
    });

    test("k=1=263: should parse 'meq/min'", () => {
      expect(() => parser.parse("meq/min")).not.toThrow();
    });

    test("k=1=264: should parse 'mm'", () => {
      expect(() => parser.parse("mm")).not.toThrow();
    });

    test("k=1=265: should parse 'ng/kg'", () => {
      expect(() => parser.parse("ng/kg")).not.toThrow();
    });

    test("k=1=266: should parse 't'", () => {
      expect(() => parser.parse("t")).not.toThrow();
    });

    test("k=1=267: should parse 'Wb'", () => {
      expect(() => parser.parse("Wb")).not.toThrow();
    });

  });

  describe("invalid units", () => {
    test("1-102: should reject 'm/' - / is not followed by a term", () => {
      expect(() => parser.parse("m/")).toThrow();
    });

    test("1-108: should reject '10+3/ul' - 10 is not a valid unit", () => {
      expect(() => parser.parse("10+3/ul")).toThrow();
    });

    test("1-115a: should reject 'rad2{錠}'", () => {
      expect(() => parser.parse("rad2{錠}")).toThrow();
    });

    test("1-116a: should reject '{a}rad2{b}'", () => {
      expect(() => parser.parse("{a}rad2{b}")).toThrow();
    });

    test("1-118: should reject '{|}1'", () => {
      expect(() => parser.parse("{|}1")).toThrow();
    });

    test("1-149: should reject 'iU' - iU needs [] around it", () => {
      expect(() => parser.parse("iU")).toThrow();
    });

    test("1-210: should reject 'molv' - molv is not a valid unit", () => {
      expect(() => parser.parse("molv")).toThrow();
    });

    test("1-247: should reject '[BETH'U]' - not a valid unit", () => {
      expect(() => parser.parse("[BETH'U]")).toThrow();
    });

    test("1-249-a: should reject '[iIU]' - not a valid unit (iIU)", () => {
      expect(() => parser.parse("[iIU]")).toThrow();
    });

    test("1-250-a: should reject '[iIU]/d' - not a valid unit (iIU)", () => {
      expect(() => parser.parse("[iIU]/d")).toThrow();
    });

    test("1-251-a: should reject '[iIU]/L' - not a valid unit (iIU)", () => {
      expect(() => parser.parse("[iIU]/L")).toThrow();
    });

    test("1-252-a: should reject '[iIU]/mL' - not a valid unit (iIU)", () => {
      expect(() => parser.parse("[iIU]/mL")).toThrow();
    });

    test("1-263: should reject 'g/12h' - not a valid unit (12h - should be 12.h)", () => {
      expect(() => parser.parse("g/12h")).toThrow();
    });

    test("1-264: should reject 'g/48h' - not a valid unit (48h)", () => {
      expect(() => parser.parse("g/48h")).toThrow();
    });

    test("1-265: should reject 'g/4h' - not a valid unit (4h)", () => {
      expect(() => parser.parse("g/4h")).toThrow();
    });

    test("1-266: should reject 'g/6h' - not a valid unit (6h)", () => {
      expect(() => parser.parse("g/6h")).toThrow();
    });

    test("1-267: should reject 'g/72h' - not a valid unit (72h)", () => {
      expect(() => parser.parse("g/72h")).toThrow();
    });

    test("1-275-a: should reject 'm[iIU]/L' - not a valid unit (iIU)", () => {
      expect(() => parser.parse("m[iIU]/L")).toThrow();
    });

    test("1-277: should reject 'mg/12h' - not a valid unit (12h)", () => {
      expect(() => parser.parse("mg/12h")).toThrow();
    });

    test("1-285: should reject 'mL/10h' - not a valid unit (10h)", () => {
      expect(() => parser.parse("mL/10h")).toThrow();
    });

    test("1-286: should reject 'mL/12h' - not a valid unit (12h)", () => {
      expect(() => parser.parse("mL/12h")).toThrow();
    });

    test("1-287: should reject 'mL/2h' - not a valid unit (2h)", () => {
      expect(() => parser.parse("mL/2h")).toThrow();
    });

    test("1-288: should reject 'mL/4h' - not a valid unit (4h)", () => {
      expect(() => parser.parse("mL/4h")).toThrow();
    });

    test("1-289: should reject 'mL/5h' - not a valid unit (5h)", () => {
      expect(() => parser.parse("mL/5h")).toThrow();
    });

    test("1-290: should reject 'mL/6h' - not a valid unit (6h)", () => {
      expect(() => parser.parse("mL/6h")).toThrow();
    });

    test("1-291: should reject 'mL/72h' - not a valid unit (72h)", () => {
      expect(() => parser.parse("mL/72h")).toThrow();
    });

    test("1-292: should reject 'mL/8h' - not a valid unit (8h)", () => {
      expect(() => parser.parse("mL/8h")).toThrow();
    });

    test("1-299: should reject 'mmol/12h' - not a valid unit (12h)", () => {
      expect(() => parser.parse("mmol/12h")).toThrow();
    });

    test("1-300: should reject 'mmol/5h' - not a valid unit (5h)", () => {
      expect(() => parser.parse("mmol/5h")).toThrow();
    });

    test("1-301: should reject 'mmol/6h' - not a valid unit (6h)", () => {
      expect(() => parser.parse("mmol/6h")).toThrow();
    });

    test("1-305: should reject 'mmol/kg[H20]' - not a valid unit (kg[H20])", () => {
      expect(() => parser.parse("mmol/kg[H20]")).toThrow();
    });

    test("1-329: should reject 'U/12h' - not a valid unit (12h)", () => {
      expect(() => parser.parse("U/12h")).toThrow();
    });

    test("1-330: should reject 'U/1h' - not a valid unit (1h)", () => {
      expect(() => parser.parse("U/1h")).toThrow();
    });

    test("1-331: should reject 'U/2h' - not a valid unit (2h)", () => {
      expect(() => parser.parse("U/2h")).toThrow();
    });

    test("1-337a: should reject 'u[iIU]/mL' - not a valid unit (iIU)", () => {
      expect(() => parser.parse("u[iIU]/mL")).toThrow();
    });

    test("k=1=010: should reject 'cm[H20]'", () => {
      expect(() => parser.parse("cm[H20]")).toThrow();
    });

    test("k=1=074: should reject 'ug(8.h)'", () => {
      expect(() => parser.parse("ug(8.h)")).toThrow();
    });

    test("k=1=074: should reject 'ug(8hr)'", () => {
      expect(() => parser.parse("ug(8hr)")).toThrow();
    });

  });
});
