// Generated from UCUM essence XML
// DO NOT EDIT MANUALLY - This file is auto-generated

export const UCUM_PREFIXES = {
  'Y': {
    code: 'Y',
    codeUC: 'YA',
    name: 'yotta',
    printSymbol: 'Y',
    value: 1e+24
  },
  'Z': {
    code: 'Z',
    codeUC: 'ZA',
    name: 'zetta',
    printSymbol: 'Z',
    value: 1e+21
  },
  'E': {
    code: 'E',
    codeUC: 'EX',
    name: 'exa',
    printSymbol: 'E',
    value: 1000000000000000000
  },
  'P': {
    code: 'P',
    codeUC: 'PT',
    name: 'peta',
    printSymbol: 'P',
    value: 1000000000000000
  },
  'T': {
    code: 'T',
    codeUC: 'TR',
    name: 'tera',
    printSymbol: 'T',
    value: 1000000000000
  },
  'G': {
    code: 'G',
    codeUC: 'GA',
    name: 'giga',
    printSymbol: 'G',
    value: 1000000000
  },
  'M': {
    code: 'M',
    codeUC: 'MA',
    name: 'mega',
    printSymbol: 'M',
    value: 1000000
  },
  'k': {
    code: 'k',
    codeUC: 'K',
    name: 'kilo',
    printSymbol: 'k',
    value: 1000
  },
  'h': {
    code: 'h',
    codeUC: 'H',
    name: 'hecto',
    printSymbol: 'h',
    value: 100
  },
  'da': {
    code: 'da',
    codeUC: 'DA',
    name: 'deka',
    printSymbol: 'da',
    value: 10
  },
  'd': {
    code: 'd',
    codeUC: 'D',
    name: 'deci',
    printSymbol: 'd',
    value: 0.1
  },
  'c': {
    code: 'c',
    codeUC: 'C',
    name: 'centi',
    printSymbol: 'c',
    value: 0.01
  },
  'm': {
    code: 'm',
    codeUC: 'M',
    name: 'milli',
    printSymbol: 'm',
    value: 0.001
  },
  'u': {
    code: 'u',
    codeUC: 'U',
    name: 'micro',
    printSymbol: '&#956;',
    value: 0.000001
  },
  'n': {
    code: 'n',
    codeUC: 'N',
    name: 'nano',
    printSymbol: 'n',
    value: 1e-9
  },
  'p': {
    code: 'p',
    codeUC: 'P',
    name: 'pico',
    printSymbol: 'p',
    value: 1e-12
  },
  'f': {
    code: 'f',
    codeUC: 'F',
    name: 'femto',
    printSymbol: 'f',
    value: 1e-15
  },
  'a': {
    code: 'a',
    codeUC: 'A',
    name: 'atto',
    printSymbol: 'a',
    value: 1e-18
  },
  'z': {
    code: 'z',
    codeUC: 'ZO',
    name: 'zepto',
    printSymbol: 'z',
    value: 1e-21
  },
  'y': {
    code: 'y',
    codeUC: 'YO',
    name: 'yocto',
    printSymbol: 'y',
    value: 1e-24
  },
  'Ki': {
    code: 'Ki',
    codeUC: 'KIB',
    name: 'kibi',
    printSymbol: 'Ki',
    value: 1024
  },
  'Mi': {
    code: 'Mi',
    codeUC: 'MIB',
    name: 'mebi',
    printSymbol: 'Mi',
    value: 1048576
  },
  'Gi': {
    code: 'Gi',
    codeUC: 'GIB',
    name: 'gibi',
    printSymbol: 'Gi',
    value: 1073741824
  },
  'Ti': {
    code: 'Ti',
    codeUC: 'TIB',
    name: 'tebi',
    printSymbol: 'Ti',
    value: 1099511627776
  },
} as const;

export const UCUM_BASE_UNITS = {
  'm': {
    code: 'm',
    codeUC: 'M',
    name: 'meter',
    printSymbol: 'm',
    property: 'length',
    isMetric: true,
    class: 'si'
  },
  's': {
    code: 's',
    codeUC: 'S',
    name: 'second',
    printSymbol: 's',
    property: 'time',
    isMetric: true,
    class: 'si'
  },
  'g': {
    code: 'g',
    codeUC: 'G',
    name: 'gram',
    printSymbol: 'g',
    property: 'mass',
    isMetric: true,
    class: 'si'
  },
  'rad': {
    code: 'rad',
    codeUC: 'RAD',
    name: 'radian',
    printSymbol: 'rad',
    property: 'plane angle',
    isMetric: true,
    class: 'si'
  },
  'K': {
    code: 'K',
    codeUC: 'K',
    name: 'kelvin',
    printSymbol: 'K',
    property: 'temperature',
    isMetric: true,
    class: 'si'
  },
  'C': {
    code: 'C',
    codeUC: 'C',
    name: 'coulomb',
    printSymbol: 'C',
    property: 'electric charge',
    isMetric: true,
    class: 'si'
  },
  'cd': {
    code: 'cd',
    codeUC: 'CD',
    name: 'candela',
    printSymbol: 'cd',
    property: 'luminous intensity',
    isMetric: true,
    class: 'si'
  },
} as const;

export const UCUM_DERIVED_UNITS = {
  '10*': {
    code: '10*',
    codeUC: '10*',
    name: 'the number ten for arbitrary powers',
    printSymbol: '10',
    property: 'number',
    isMetric: false,
    class: 'dimless',
    value: {
      unit: '1',
      unitUC: '1',
      value: 10
    }
  },
  '10^': {
    code: '10^',
    codeUC: '10^',
    name: 'the number ten for arbitrary powers',
    printSymbol: '10',
    property: 'number',
    isMetric: false,
    class: 'dimless',
    value: {
      unit: '1',
      unitUC: '1',
      value: 10
    }
  },
  '[pi]': {
    code: '[pi]',
    codeUC: '[PI]',
    name: 'the number pi',
    printSymbol: '&#960;',
    property: 'number',
    isMetric: false,
    class: 'dimless',
    value: {
      unit: '1',
      unitUC: '1',
      value: 3.141592653589793
    }
  },
  '%': {
    code: '%',
    codeUC: '%',
    name: 'percent',
    printSymbol: '%',
    property: 'fraction',
    isMetric: false,
    class: 'dimless',
    value: {
      unit: '10*-2',
      unitUC: '10*-2',
      value: 1
    }
  },
  '[ppth]': {
    code: '[ppth]',
    codeUC: '[PPTH]',
    name: 'parts per thousand',
    printSymbol: 'ppth',
    property: 'fraction',
    isMetric: false,
    class: 'dimless',
    value: {
      unit: '10*-3',
      unitUC: '10*-3',
      value: 1
    }
  },
  '[ppm]': {
    code: '[ppm]',
    codeUC: '[PPM]',
    name: 'parts per million',
    printSymbol: 'ppm',
    property: 'fraction',
    isMetric: false,
    class: 'dimless',
    value: {
      unit: '10*-6',
      unitUC: '10*-6',
      value: 1
    }
  },
  '[ppb]': {
    code: '[ppb]',
    codeUC: '[PPB]',
    name: 'parts per billion',
    printSymbol: 'ppb',
    property: 'fraction',
    isMetric: false,
    class: 'dimless',
    value: {
      unit: '10*-9',
      unitUC: '10*-9',
      value: 1
    }
  },
  '[pptr]': {
    code: '[pptr]',
    codeUC: '[PPTR]',
    name: 'parts per trillion',
    printSymbol: 'pptr',
    property: 'fraction',
    isMetric: false,
    class: 'dimless',
    value: {
      unit: '10*-12',
      unitUC: '10*-12',
      value: 1
    }
  },
  'mol': {
    code: 'mol',
    codeUC: 'MOL',
    name: 'mole',
    printSymbol: 'mol',
    property: 'amount of substance',
    isMetric: true,
    class: 'si',
    value: {
      unit: '10*23',
      unitUC: '10*23',
      value: 6.0221367
    }
  },
  'sr': {
    code: 'sr',
    codeUC: 'SR',
    name: 'steradian',
    printSymbol: 'sr',
    property: 'solid angle',
    isMetric: true,
    class: 'si',
    value: {
      unit: 'rad2',
      unitUC: 'RAD2',
      value: 1
    }
  },
  'Hz': {
    code: 'Hz',
    codeUC: 'HZ',
    name: 'hertz',
    printSymbol: 'Hz',
    property: 'frequency',
    isMetric: true,
    class: 'si',
    value: {
      unit: 's-1',
      unitUC: 'S-1',
      value: 1
    }
  },
  'N': {
    code: 'N',
    codeUC: 'N',
    name: 'newton',
    printSymbol: 'N',
    property: 'force',
    isMetric: true,
    class: 'si',
    value: {
      unit: 'kg.m/s2',
      unitUC: 'KG.M/S2',
      value: 1
    }
  },
  'Pa': {
    code: 'Pa',
    codeUC: 'PAL',
    name: 'pascal',
    printSymbol: 'Pa',
    property: 'pressure',
    isMetric: true,
    class: 'si',
    value: {
      unit: 'N/m2',
      unitUC: 'N/M2',
      value: 1
    }
  },
  'J': {
    code: 'J',
    codeUC: 'J',
    name: 'joule',
    printSymbol: 'J',
    property: 'energy',
    isMetric: true,
    class: 'si',
    value: {
      unit: 'N.m',
      unitUC: 'N.M',
      value: 1
    }
  },
  'W': {
    code: 'W',
    codeUC: 'W',
    name: 'watt',
    printSymbol: 'W',
    property: 'power',
    isMetric: true,
    class: 'si',
    value: {
      unit: 'J/s',
      unitUC: 'J/S',
      value: 1
    }
  },
  'A': {
    code: 'A',
    codeUC: 'A',
    name: 'amp&#232;re',
    printSymbol: 'A',
    property: 'electric current',
    isMetric: true,
    class: 'si',
    value: {
      unit: 'C/s',
      unitUC: 'C/S',
      value: 1
    }
  },
  'V': {
    code: 'V',
    codeUC: 'V',
    name: 'volt',
    printSymbol: 'V',
    property: 'electric potential',
    isMetric: true,
    class: 'si',
    value: {
      unit: 'J/C',
      unitUC: 'J/C',
      value: 1
    }
  },
  'F': {
    code: 'F',
    codeUC: 'F',
    name: 'farad',
    printSymbol: 'F',
    property: 'electric capacitance',
    isMetric: true,
    class: 'si',
    value: {
      unit: 'C/V',
      unitUC: 'C/V',
      value: 1
    }
  },
  'Ohm': {
    code: 'Ohm',
    codeUC: 'OHM',
    name: 'ohm',
    printSymbol: '&#937;',
    property: 'electric resistance',
    isMetric: true,
    class: 'si',
    value: {
      unit: 'V/A',
      unitUC: 'V/A',
      value: 1
    }
  },
  'S': {
    code: 'S',
    codeUC: 'SIE',
    name: 'siemens',
    printSymbol: 'S',
    property: 'electric conductance',
    isMetric: true,
    class: 'si',
    value: {
      unit: 'Ohm-1',
      unitUC: 'OHM-1',
      value: 1
    }
  },
  'Wb': {
    code: 'Wb',
    codeUC: 'WB',
    name: 'weber',
    printSymbol: 'Wb',
    property: 'magnetic flux',
    isMetric: true,
    class: 'si',
    value: {
      unit: 'V.s',
      unitUC: 'V.S',
      value: 1
    }
  },
  'T': {
    code: 'T',
    codeUC: 'T',
    name: 'tesla',
    printSymbol: 'T',
    property: 'magnetic flux density',
    isMetric: true,
    class: 'si',
    value: {
      unit: 'Wb/m2',
      unitUC: 'WB/M2',
      value: 1
    }
  },
  'H': {
    code: 'H',
    codeUC: 'H',
    name: 'henry',
    printSymbol: 'H',
    property: 'inductance',
    isMetric: true,
    class: 'si',
    value: {
      unit: 'Wb/A',
      unitUC: 'WB/A',
      value: 1
    }
  },
  'lm': {
    code: 'lm',
    codeUC: 'LM',
    name: 'lumen',
    printSymbol: 'lm',
    property: 'luminous flux',
    isMetric: true,
    class: 'si',
    value: {
      unit: 'cd.sr',
      unitUC: 'CD.SR',
      value: 1
    }
  },
  'lx': {
    code: 'lx',
    codeUC: 'LX',
    name: 'lux',
    printSymbol: 'lx',
    property: 'illuminance',
    isMetric: true,
    class: 'si',
    value: {
      unit: 'lm/m2',
      unitUC: 'LM/M2',
      value: 1
    }
  },
  'Bq': {
    code: 'Bq',
    codeUC: 'BQ',
    name: 'becquerel',
    printSymbol: 'Bq',
    property: 'radioactivity',
    isMetric: true,
    class: 'si',
    value: {
      unit: 's-1',
      unitUC: 'S-1',
      value: 1
    }
  },
  'Gy': {
    code: 'Gy',
    codeUC: 'GY',
    name: 'gray',
    printSymbol: 'Gy',
    property: 'energy dose',
    isMetric: true,
    class: 'si',
    value: {
      unit: 'J/kg',
      unitUC: 'J/KG',
      value: 1
    }
  },
  'Sv': {
    code: 'Sv',
    codeUC: 'SV',
    name: 'sievert',
    printSymbol: 'Sv',
    property: 'dose equivalent',
    isMetric: true,
    class: 'si',
    value: {
      unit: 'J/kg',
      unitUC: 'J/KG',
      value: 1
    }
  },
  'deg': {
    code: 'deg',
    codeUC: 'DEG',
    name: 'degree',
    printSymbol: '&#176;',
    property: 'plane angle',
    isMetric: false,
    class: 'iso1000',
    value: {
      unit: '[pi].rad/360',
      unitUC: '[PI].RAD/360',
      value: 2
    }
  },
  'gon': {
    code: 'gon',
    codeUC: 'GON',
    name: 'gon,grade',
    printSymbol: '[object Object]',
    property: 'plane angle',
    isMetric: false,
    class: 'iso1000',
    value: {
      unit: 'deg',
      unitUC: 'DEG',
      value: 0.9
    }
  },
  '\'': {
    code: '\'',
    codeUC: '\'',
    name: 'minute',
    printSymbol: '\'',
    property: 'plane angle',
    isMetric: false,
    class: 'iso1000',
    value: {
      unit: 'deg/60',
      unitUC: 'DEG/60',
      value: 1
    }
  },
  '\'\'': {
    code: '\'\'',
    codeUC: '\'\'',
    name: 'second',
    printSymbol: '\'\'',
    property: 'plane angle',
    isMetric: false,
    class: 'iso1000',
    value: {
      unit: '\'/60',
      unitUC: '\'/60',
      value: 1
    }
  },
  'l': {
    code: 'l',
    codeUC: 'L',
    name: 'liter',
    printSymbol: 'l',
    property: 'volume',
    isMetric: true,
    class: 'iso1000',
    value: {
      unit: 'dm3',
      unitUC: 'DM3',
      value: 1
    }
  },
  'L': {
    code: 'L',
    codeUC: '',
    name: 'liter',
    printSymbol: 'L',
    property: 'volume',
    isMetric: true,
    class: 'iso1000',
    value: {
      unit: 'l',
      unitUC: '',
      value: 1
    }
  },
  'ar': {
    code: 'ar',
    codeUC: 'AR',
    name: 'are',
    printSymbol: 'a',
    property: 'area',
    isMetric: true,
    class: 'iso1000',
    value: {
      unit: 'm2',
      unitUC: 'M2',
      value: 100
    }
  },
  'min': {
    code: 'min',
    codeUC: 'MIN',
    name: 'minute',
    printSymbol: 'min',
    property: 'time',
    isMetric: false,
    class: 'iso1000',
    value: {
      unit: 's',
      unitUC: 'S',
      value: 60
    }
  },
  'h': {
    code: 'h',
    codeUC: 'HR',
    name: 'hour',
    printSymbol: 'h',
    property: 'time',
    isMetric: false,
    class: 'iso1000',
    value: {
      unit: 'min',
      unitUC: 'MIN',
      value: 60
    }
  },
  'd': {
    code: 'd',
    codeUC: 'D',
    name: 'day',
    printSymbol: 'd',
    property: 'time',
    isMetric: false,
    class: 'iso1000',
    value: {
      unit: 'h',
      unitUC: 'HR',
      value: 24
    }
  },
  'a_t': {
    code: 'a_t',
    codeUC: 'ANN_T',
    name: 'tropical year',
    printSymbol: '[object Object]',
    property: 'time',
    isMetric: false,
    class: 'iso1000',
    value: {
      unit: 'd',
      unitUC: 'D',
      value: 365.24219
    }
  },
  'a_j': {
    code: 'a_j',
    codeUC: 'ANN_J',
    name: 'mean Julian year',
    printSymbol: '[object Object]',
    property: 'time',
    isMetric: false,
    class: 'iso1000',
    value: {
      unit: 'd',
      unitUC: 'D',
      value: 365.25
    }
  },
  'a_g': {
    code: 'a_g',
    codeUC: 'ANN_G',
    name: 'mean Gregorian year',
    printSymbol: '[object Object]',
    property: 'time',
    isMetric: false,
    class: 'iso1000',
    value: {
      unit: 'd',
      unitUC: 'D',
      value: 365.2425
    }
  },
  'a': {
    code: 'a',
    codeUC: 'ANN',
    name: 'year',
    printSymbol: 'a',
    property: 'time',
    isMetric: false,
    class: 'iso1000',
    value: {
      unit: 'a_j',
      unitUC: 'ANN_J',
      value: 1
    }
  },
  'wk': {
    code: 'wk',
    codeUC: 'WK',
    name: 'week',
    printSymbol: 'wk',
    property: 'time',
    isMetric: false,
    class: 'iso1000',
    value: {
      unit: 'd',
      unitUC: 'D',
      value: 7
    }
  },
  'mo_s': {
    code: 'mo_s',
    codeUC: 'MO_S',
    name: 'synodal month',
    printSymbol: '[object Object]',
    property: 'time',
    isMetric: false,
    class: 'iso1000',
    value: {
      unit: 'd',
      unitUC: 'D',
      value: 29.53059
    }
  },
  'mo_j': {
    code: 'mo_j',
    codeUC: 'MO_J',
    name: 'mean Julian month',
    printSymbol: '[object Object]',
    property: 'time',
    isMetric: false,
    class: 'iso1000',
    value: {
      unit: 'a_j/12',
      unitUC: 'ANN_J/12',
      value: 1
    }
  },
  'mo_g': {
    code: 'mo_g',
    codeUC: 'MO_G',
    name: 'mean Gregorian month',
    printSymbol: '[object Object]',
    property: 'time',
    isMetric: false,
    class: 'iso1000',
    value: {
      unit: 'a_g/12',
      unitUC: 'ANN_G/12',
      value: 1
    }
  },
  'mo': {
    code: 'mo',
    codeUC: 'MO',
    name: 'month',
    printSymbol: 'mo',
    property: 'time',
    isMetric: false,
    class: 'iso1000',
    value: {
      unit: 'mo_j',
      unitUC: 'MO_J',
      value: 1
    }
  },
  't': {
    code: 't',
    codeUC: 'TNE',
    name: 'tonne',
    printSymbol: 't',
    property: 'mass',
    isMetric: true,
    class: 'iso1000',
    value: {
      unit: 'kg',
      unitUC: 'KG',
      value: 1000
    }
  },
  'bar': {
    code: 'bar',
    codeUC: 'BAR',
    name: 'bar',
    printSymbol: 'bar',
    property: 'pressure',
    isMetric: true,
    class: 'iso1000',
    value: {
      unit: 'Pa',
      unitUC: 'PAL',
      value: 100000
    }
  },
  'u': {
    code: 'u',
    codeUC: 'AMU',
    name: 'unified atomic mass unit',
    printSymbol: 'u',
    property: 'mass',
    isMetric: true,
    class: 'iso1000',
    value: {
      unit: 'g',
      unitUC: 'G',
      value: 1.6605402e-24
    }
  },
  'AU': {
    code: 'AU',
    codeUC: 'ASU',
    name: 'astronomic unit',
    printSymbol: 'AU',
    property: 'length',
    isMetric: false,
    class: 'iso1000',
    value: {
      unit: 'Mm',
      unitUC: 'MAM',
      value: 149597.870691
    }
  },
  'pc': {
    code: 'pc',
    codeUC: 'PRS',
    name: 'parsec',
    printSymbol: 'pc',
    property: 'length',
    isMetric: true,
    class: 'iso1000',
    value: {
      unit: 'm',
      unitUC: 'M',
      value: 30856780000000000
    }
  },
  '[c]': {
    code: '[c]',
    codeUC: '[C]',
    name: 'velocity of light',
    printSymbol: '[object Object]',
    property: 'velocity',
    isMetric: true,
    class: 'const',
    value: {
      unit: 'm/s',
      unitUC: 'M/S',
      value: 299792458
    }
  },
  '[h]': {
    code: '[h]',
    codeUC: '[H]',
    name: 'Planck constant',
    printSymbol: '[object Object]',
    property: 'action',
    isMetric: true,
    class: 'const',
    value: {
      unit: 'J.s',
      unitUC: 'J.S',
      value: 6.6260755e-34
    }
  },
  '[k]': {
    code: '[k]',
    codeUC: '[K]',
    name: 'Boltzmann constant',
    printSymbol: '[object Object]',
    property: '(unclassified)',
    isMetric: true,
    class: 'const',
    value: {
      unit: 'J/K',
      unitUC: 'J/K',
      value: 1.380658e-23
    }
  },
  '[eps_0]': {
    code: '[eps_0]',
    codeUC: '[EPS_0]',
    name: 'permittivity of vacuum',
    printSymbol: '[object Object]',
    property: 'electric permittivity',
    isMetric: true,
    class: 'const',
    value: {
      unit: 'F/m',
      unitUC: 'F/M',
      value: 8.854187817e-12
    }
  },
  '[mu_0]': {
    code: '[mu_0]',
    codeUC: '[MU_0]',
    name: 'permeability of vacuum',
    printSymbol: '[object Object]',
    property: 'magnetic permeability',
    isMetric: true,
    class: 'const',
    value: {
      unit: '4.[pi].10*-7.N/A2',
      unitUC: '4.[PI].10*-7.N/A2',
      value: 1
    }
  },
  '[e]': {
    code: '[e]',
    codeUC: '[E]',
    name: 'elementary charge',
    printSymbol: '[object Object]',
    property: 'electric charge',
    isMetric: true,
    class: 'const',
    value: {
      unit: 'C',
      unitUC: 'C',
      value: 1.60217733e-19
    }
  },
  'eV': {
    code: 'eV',
    codeUC: 'EV',
    name: 'electronvolt',
    printSymbol: 'eV',
    property: 'energy',
    isMetric: true,
    class: 'iso1000',
    value: {
      unit: '[e].V',
      unitUC: '[E].V',
      value: 1
    }
  },
  '[m_e]': {
    code: '[m_e]',
    codeUC: '[M_E]',
    name: 'electron mass',
    printSymbol: '[object Object]',
    property: 'mass',
    isMetric: true,
    class: 'const',
    value: {
      unit: 'g',
      unitUC: 'g',
      value: 9.1093897e-28
    }
  },
  '[m_p]': {
    code: '[m_p]',
    codeUC: '[M_P]',
    name: 'proton mass',
    printSymbol: '[object Object]',
    property: 'mass',
    isMetric: true,
    class: 'const',
    value: {
      unit: 'g',
      unitUC: 'g',
      value: 1.6726231e-24
    }
  },
  '[G]': {
    code: '[G]',
    codeUC: '[GC]',
    name: 'Newtonian constant of gravitation',
    printSymbol: '[object Object]',
    property: '(unclassified)',
    isMetric: true,
    class: 'const',
    value: {
      unit: 'm3.kg-1.s-2',
      unitUC: 'M3.KG-1.S-2',
      value: 6.67259e-11
    }
  },
  '[g]': {
    code: '[g]',
    codeUC: '[G]',
    name: 'standard acceleration of free fall',
    printSymbol: '[object Object]',
    property: 'acceleration',
    isMetric: true,
    class: 'const',
    value: {
      unit: 'm/s2',
      unitUC: 'M/S2',
      value: 9.80665
    }
  },
  'Torr': {
    code: 'Torr',
    codeUC: 'Torr',
    name: 'Torr',
    printSymbol: 'Torr',
    property: 'pressure',
    isMetric: false,
    class: 'const',
    value: {
      unit: 'Pa',
      unitUC: 'PAL',
      value: 133.322
    }
  },
  'atm': {
    code: 'atm',
    codeUC: 'ATM',
    name: 'standard atmosphere',
    printSymbol: 'atm',
    property: 'pressure',
    isMetric: false,
    class: 'const',
    value: {
      unit: 'Pa',
      unitUC: 'PAL',
      value: 101325
    }
  },
  '[ly]': {
    code: '[ly]',
    codeUC: '[LY]',
    name: 'light-year',
    printSymbol: 'l.y.',
    property: 'length',
    isMetric: true,
    class: 'const',
    value: {
      unit: '[c].a_j',
      unitUC: '[C].ANN_J',
      value: 1
    }
  },
  'gf': {
    code: 'gf',
    codeUC: 'GF',
    name: 'gram-force',
    printSymbol: 'gf',
    property: 'force',
    isMetric: true,
    class: 'const',
    value: {
      unit: 'g.[g]',
      unitUC: 'G.[G]',
      value: 1
    }
  },
  'Ky': {
    code: 'Ky',
    codeUC: 'KY',
    name: 'Kayser',
    printSymbol: 'K',
    property: 'lineic number',
    isMetric: true,
    class: 'cgs',
    value: {
      unit: 'cm-1',
      unitUC: 'CM-1',
      value: 1
    }
  },
  'Gal': {
    code: 'Gal',
    codeUC: 'GL',
    name: 'Gal',
    printSymbol: 'Gal',
    property: 'acceleration',
    isMetric: true,
    class: 'cgs',
    value: {
      unit: 'cm/s2',
      unitUC: 'CM/S2',
      value: 1
    }
  },
  'dyn': {
    code: 'dyn',
    codeUC: 'DYN',
    name: 'dyne',
    printSymbol: 'dyn',
    property: 'force',
    isMetric: true,
    class: 'cgs',
    value: {
      unit: 'g.cm/s2',
      unitUC: 'G.CM/S2',
      value: 1
    }
  },
  'erg': {
    code: 'erg',
    codeUC: 'ERG',
    name: 'erg',
    printSymbol: 'erg',
    property: 'energy',
    isMetric: true,
    class: 'cgs',
    value: {
      unit: 'dyn.cm',
      unitUC: 'DYN.CM',
      value: 1
    }
  },
  'P': {
    code: 'P',
    codeUC: 'P',
    name: 'Poise',
    printSymbol: 'P',
    property: 'dynamic viscosity',
    isMetric: true,
    class: 'cgs',
    value: {
      unit: 'dyn.s/cm2',
      unitUC: 'DYN.S/CM2',
      value: 1
    }
  },
  'Bi': {
    code: 'Bi',
    codeUC: 'BI',
    name: 'Biot',
    printSymbol: 'Bi',
    property: 'electric current',
    isMetric: true,
    class: 'cgs',
    value: {
      unit: 'A',
      unitUC: 'A',
      value: 10
    }
  },
  'St': {
    code: 'St',
    codeUC: 'ST',
    name: 'Stokes',
    printSymbol: 'St',
    property: 'kinematic viscosity',
    isMetric: true,
    class: 'cgs',
    value: {
      unit: 'cm2/s',
      unitUC: 'CM2/S',
      value: 1
    }
  },
  'Mx': {
    code: 'Mx',
    codeUC: 'MX',
    name: 'Maxwell',
    printSymbol: 'Mx',
    property: 'flux of magnetic induction',
    isMetric: true,
    class: 'cgs',
    value: {
      unit: 'Wb',
      unitUC: 'WB',
      value: 1e-8
    }
  },
  'G': {
    code: 'G',
    codeUC: 'GS',
    name: 'Gauss',
    printSymbol: 'Gs',
    property: 'magnetic flux density',
    isMetric: true,
    class: 'cgs',
    value: {
      unit: 'T',
      unitUC: 'T',
      value: 0.0001
    }
  },
  'Oe': {
    code: 'Oe',
    codeUC: 'OE',
    name: 'Oersted',
    printSymbol: 'Oe',
    property: 'magnetic field intensity',
    isMetric: true,
    class: 'cgs',
    value: {
      unit: '/[pi].A/m',
      unitUC: '/[PI].A/M',
      value: 250
    }
  },
  'Gb': {
    code: 'Gb',
    codeUC: 'GB',
    name: 'Gilbert',
    printSymbol: 'Gb',
    property: 'magnetic tension',
    isMetric: true,
    class: 'cgs',
    value: {
      unit: 'Oe.cm',
      unitUC: 'OE.CM',
      value: 1
    }
  },
  'sb': {
    code: 'sb',
    codeUC: 'SB',
    name: 'stilb',
    printSymbol: 'sb',
    property: 'lum. intensity density',
    isMetric: true,
    class: 'cgs',
    value: {
      unit: 'cd/cm2',
      unitUC: 'CD/CM2',
      value: 1
    }
  },
  'Lmb': {
    code: 'Lmb',
    codeUC: 'LMB',
    name: 'Lambert',
    printSymbol: 'L',
    property: 'brightness',
    isMetric: true,
    class: 'cgs',
    value: {
      unit: 'cd/cm2/[pi]',
      unitUC: 'CD/CM2/[PI]',
      value: 1
    }
  },
  'ph': {
    code: 'ph',
    codeUC: 'PHT',
    name: 'phot',
    printSymbol: 'ph',
    property: 'illuminance',
    isMetric: true,
    class: 'cgs',
    value: {
      unit: 'lx',
      unitUC: 'LX',
      value: 0.0001
    }
  },
  'Ci': {
    code: 'Ci',
    codeUC: 'CI',
    name: 'Curie',
    printSymbol: 'Ci',
    property: 'radioactivity',
    isMetric: true,
    class: 'cgs',
    value: {
      unit: 'Bq',
      unitUC: 'BQ',
      value: 37000000000
    }
  },
  'R': {
    code: 'R',
    codeUC: 'ROE',
    name: 'Roentgen',
    printSymbol: 'R',
    property: 'ion dose',
    isMetric: true,
    class: 'cgs',
    value: {
      unit: 'C/kg',
      unitUC: 'C/KG',
      value: 0.000258
    }
  },
  'RAD': {
    code: 'RAD',
    codeUC: '[RAD]',
    name: 'radiation absorbed dose',
    printSymbol: 'RAD',
    property: 'energy dose',
    isMetric: true,
    class: 'cgs',
    value: {
      unit: 'erg/g',
      unitUC: 'ERG/G',
      value: 100
    }
  },
  'REM': {
    code: 'REM',
    codeUC: '[REM]',
    name: 'radiation equivalent man',
    printSymbol: 'REM',
    property: 'dose equivalent',
    isMetric: true,
    class: 'cgs',
    value: {
      unit: 'RAD',
      unitUC: '[RAD]',
      value: 1
    }
  },
  '[in_i]': {
    code: '[in_i]',
    codeUC: '[IN_I]',
    name: 'inch',
    printSymbol: 'in',
    property: 'length',
    isMetric: false,
    class: 'intcust',
    value: {
      unit: 'cm',
      unitUC: 'CM',
      value: 2.54
    }
  },
  '[ft_i]': {
    code: '[ft_i]',
    codeUC: '[FT_I]',
    name: 'foot',
    printSymbol: 'ft',
    property: 'length',
    isMetric: false,
    class: 'intcust',
    value: {
      unit: '[in_i]',
      unitUC: '[IN_I]',
      value: 12
    }
  },
  '[yd_i]': {
    code: '[yd_i]',
    codeUC: '[YD_I]',
    name: 'yard',
    printSymbol: 'yd',
    property: 'length',
    isMetric: false,
    class: 'intcust',
    value: {
      unit: '[ft_i]',
      unitUC: '[FT_I]',
      value: 3
    }
  },
  '[mi_i]': {
    code: '[mi_i]',
    codeUC: '[MI_I]',
    name: 'mile',
    printSymbol: 'mi',
    property: 'length',
    isMetric: false,
    class: 'intcust',
    value: {
      unit: '[ft_i]',
      unitUC: '[FT_I]',
      value: 5280
    }
  },
  '[fth_i]': {
    code: '[fth_i]',
    codeUC: '[FTH_I]',
    name: 'fathom',
    printSymbol: 'fth',
    property: 'depth of water',
    isMetric: false,
    class: 'intcust',
    value: {
      unit: '[ft_i]',
      unitUC: '[FT_I]',
      value: 6
    }
  },
  '[nmi_i]': {
    code: '[nmi_i]',
    codeUC: '[NMI_I]',
    name: 'nautical mile',
    printSymbol: 'n.mi',
    property: 'length',
    isMetric: false,
    class: 'intcust',
    value: {
      unit: 'm',
      unitUC: 'M',
      value: 1852
    }
  },
  '[kn_i]': {
    code: '[kn_i]',
    codeUC: '[KN_I]',
    name: 'knot',
    printSymbol: 'knot',
    property: 'velocity',
    isMetric: false,
    class: 'intcust',
    value: {
      unit: '[nmi_i]/h',
      unitUC: '[NMI_I]/H',
      value: 1
    }
  },
  '[sin_i]': {
    code: '[sin_i]',
    codeUC: '[SIN_I]',
    name: 'square inch',
    property: 'area',
    isMetric: false,
    class: 'intcust',
    value: {
      unit: '[in_i]2',
      unitUC: '[IN_I]2',
      value: 1
    }
  },
  '[sft_i]': {
    code: '[sft_i]',
    codeUC: '[SFT_I]',
    name: 'square foot',
    property: 'area',
    isMetric: false,
    class: 'intcust',
    value: {
      unit: '[ft_i]2',
      unitUC: '[FT_I]2',
      value: 1
    }
  },
  '[syd_i]': {
    code: '[syd_i]',
    codeUC: '[SYD_I]',
    name: 'square yard',
    property: 'area',
    isMetric: false,
    class: 'intcust',
    value: {
      unit: '[yd_i]2',
      unitUC: '[YD_I]2',
      value: 1
    }
  },
  '[cin_i]': {
    code: '[cin_i]',
    codeUC: '[CIN_I]',
    name: 'cubic inch',
    property: 'volume',
    isMetric: false,
    class: 'intcust',
    value: {
      unit: '[in_i]3',
      unitUC: '[IN_I]3',
      value: 1
    }
  },
  '[cft_i]': {
    code: '[cft_i]',
    codeUC: '[CFT_I]',
    name: 'cubic foot',
    property: 'volume',
    isMetric: false,
    class: 'intcust',
    value: {
      unit: '[ft_i]3',
      unitUC: '[FT_I]3',
      value: 1
    }
  },
  '[cyd_i]': {
    code: '[cyd_i]',
    codeUC: '[CYD_I]',
    name: 'cubic yard',
    printSymbol: 'cu.yd',
    property: 'volume',
    isMetric: false,
    class: 'intcust',
    value: {
      unit: '[yd_i]3',
      unitUC: '[YD_I]3',
      value: 1
    }
  },
  '[bf_i]': {
    code: '[bf_i]',
    codeUC: '[BF_I]',
    name: 'board foot',
    property: 'volume',
    isMetric: false,
    class: 'intcust',
    value: {
      unit: '[in_i]3',
      unitUC: '[IN_I]3',
      value: 144
    }
  },
  '[cr_i]': {
    code: '[cr_i]',
    codeUC: '[CR_I]',
    name: 'cord',
    property: 'volume',
    isMetric: false,
    class: 'intcust',
    value: {
      unit: '[ft_i]3',
      unitUC: '[FT_I]3',
      value: 128
    }
  },
  '[mil_i]': {
    code: '[mil_i]',
    codeUC: '[MIL_I]',
    name: 'mil',
    printSymbol: 'mil',
    property: 'length',
    isMetric: false,
    class: 'intcust',
    value: {
      unit: '[in_i]',
      unitUC: '[IN_I]',
      value: 0.001
    }
  },
  '[cml_i]': {
    code: '[cml_i]',
    codeUC: '[CML_I]',
    name: 'circular mil',
    printSymbol: 'circ.mil',
    property: 'area',
    isMetric: false,
    class: 'intcust',
    value: {
      unit: '[pi]/4.[mil_i]2',
      unitUC: '[PI]/4.[MIL_I]2',
      value: 1
    }
  },
  '[hd_i]': {
    code: '[hd_i]',
    codeUC: '[HD_I]',
    name: 'hand',
    printSymbol: 'hd',
    property: 'height of horses',
    isMetric: false,
    class: 'intcust',
    value: {
      unit: '[in_i]',
      unitUC: '[IN_I]',
      value: 4
    }
  },
  '[ft_us]': {
    code: '[ft_us]',
    codeUC: '[FT_US]',
    name: 'foot',
    printSymbol: '[object Object]',
    property: 'length',
    isMetric: false,
    class: 'us-lengths',
    value: {
      unit: 'm/3937',
      unitUC: 'M/3937',
      value: 1200
    }
  },
  '[yd_us]': {
    code: '[yd_us]',
    codeUC: '[YD_US]',
    name: 'yard',
    property: 'length',
    isMetric: false,
    class: 'us-lengths',
    value: {
      unit: '[ft_us]',
      unitUC: '[FT_US]',
      value: 3
    }
  },
  '[in_us]': {
    code: '[in_us]',
    codeUC: '[IN_US]',
    name: 'inch',
    property: 'length',
    isMetric: false,
    class: 'us-lengths',
    value: {
      unit: '[ft_us]/12',
      unitUC: '[FT_US]/12',
      value: 1
    }
  },
  '[rd_us]': {
    code: '[rd_us]',
    codeUC: '[RD_US]',
    name: 'rod',
    property: 'length',
    isMetric: false,
    class: 'us-lengths',
    value: {
      unit: '[ft_us]',
      unitUC: '[FT_US]',
      value: 16.5
    }
  },
  '[ch_us]': {
    code: '[ch_us]',
    codeUC: '[CH_US]',
    name: 'Gunter\'s chain,Surveyor\'s chain',
    property: 'length',
    isMetric: false,
    class: 'us-lengths',
    value: {
      unit: '[rd_us]',
      unitUC: '[RD_US]',
      value: 4
    }
  },
  '[lk_us]': {
    code: '[lk_us]',
    codeUC: '[LK_US]',
    name: 'link for Gunter\'s chain',
    property: 'length',
    isMetric: false,
    class: 'us-lengths',
    value: {
      unit: '[ch_us]/100',
      unitUC: '[CH_US]/100',
      value: 1
    }
  },
  '[rch_us]': {
    code: '[rch_us]',
    codeUC: '[RCH_US]',
    name: 'Ramden\'s chain,Engineer\'s chain',
    property: 'length',
    isMetric: false,
    class: 'us-lengths',
    value: {
      unit: '[ft_us]',
      unitUC: '[FT_US]',
      value: 100
    }
  },
  '[rlk_us]': {
    code: '[rlk_us]',
    codeUC: '[RLK_US]',
    name: 'link for Ramden\'s chain',
    property: 'length',
    isMetric: false,
    class: 'us-lengths',
    value: {
      unit: '[rch_us]/100',
      unitUC: '[RCH_US]/100',
      value: 1
    }
  },
  '[fth_us]': {
    code: '[fth_us]',
    codeUC: '[FTH_US]',
    name: 'fathom',
    property: 'length',
    isMetric: false,
    class: 'us-lengths',
    value: {
      unit: '[ft_us]',
      unitUC: '[FT_US]',
      value: 6
    }
  },
  '[fur_us]': {
    code: '[fur_us]',
    codeUC: '[FUR_US]',
    name: 'furlong',
    property: 'length',
    isMetric: false,
    class: 'us-lengths',
    value: {
      unit: '[rd_us]',
      unitUC: '[RD_US]',
      value: 40
    }
  },
  '[mi_us]': {
    code: '[mi_us]',
    codeUC: '[MI_US]',
    name: 'mile',
    property: 'length',
    isMetric: false,
    class: 'us-lengths',
    value: {
      unit: '[fur_us]',
      unitUC: '[FUR_US]',
      value: 8
    }
  },
  '[acr_us]': {
    code: '[acr_us]',
    codeUC: '[ACR_US]',
    name: 'acre',
    property: 'area',
    isMetric: false,
    class: 'us-lengths',
    value: {
      unit: '[rd_us]2',
      unitUC: '[RD_US]2',
      value: 160
    }
  },
  '[srd_us]': {
    code: '[srd_us]',
    codeUC: '[SRD_US]',
    name: 'square rod',
    property: 'area',
    isMetric: false,
    class: 'us-lengths',
    value: {
      unit: '[rd_us]2',
      unitUC: '[RD_US]2',
      value: 1
    }
  },
  '[smi_us]': {
    code: '[smi_us]',
    codeUC: '[SMI_US]',
    name: 'square mile',
    property: 'area',
    isMetric: false,
    class: 'us-lengths',
    value: {
      unit: '[mi_us]2',
      unitUC: '[MI_US]2',
      value: 1
    }
  },
  '[sct]': {
    code: '[sct]',
    codeUC: '[SCT]',
    name: 'section',
    property: 'area',
    isMetric: false,
    class: 'us-lengths',
    value: {
      unit: '[mi_us]2',
      unitUC: '[MI_US]2',
      value: 1
    }
  },
  '[twp]': {
    code: '[twp]',
    codeUC: '[TWP]',
    name: 'township',
    property: 'area',
    isMetric: false,
    class: 'us-lengths',
    value: {
      unit: '[sct]',
      unitUC: '[SCT]',
      value: 36
    }
  },
  '[mil_us]': {
    code: '[mil_us]',
    codeUC: '[MIL_US]',
    name: 'mil',
    property: 'length',
    isMetric: false,
    class: 'us-lengths',
    value: {
      unit: '[in_us]',
      unitUC: '[IN_US]',
      value: 0.001
    }
  },
  '[in_br]': {
    code: '[in_br]',
    codeUC: '[IN_BR]',
    name: 'inch',
    property: 'length',
    isMetric: false,
    class: 'brit-length',
    value: {
      unit: 'cm',
      unitUC: 'CM',
      value: 2.539998
    }
  },
  '[ft_br]': {
    code: '[ft_br]',
    codeUC: '[FT_BR]',
    name: 'foot',
    property: 'length',
    isMetric: false,
    class: 'brit-length',
    value: {
      unit: '[in_br]',
      unitUC: '[IN_BR]',
      value: 12
    }
  },
  '[rd_br]': {
    code: '[rd_br]',
    codeUC: '[RD_BR]',
    name: 'rod',
    property: 'length',
    isMetric: false,
    class: 'brit-length',
    value: {
      unit: '[ft_br]',
      unitUC: '[FT_BR]',
      value: 16.5
    }
  },
  '[ch_br]': {
    code: '[ch_br]',
    codeUC: '[CH_BR]',
    name: 'Gunter\'s chain',
    property: 'length',
    isMetric: false,
    class: 'brit-length',
    value: {
      unit: '[rd_br]',
      unitUC: '[RD_BR]',
      value: 4
    }
  },
  '[lk_br]': {
    code: '[lk_br]',
    codeUC: '[LK_BR]',
    name: 'link for Gunter\'s chain',
    property: 'length',
    isMetric: false,
    class: 'brit-length',
    value: {
      unit: '[ch_br]/100',
      unitUC: '[CH_BR]/100',
      value: 1
    }
  },
  '[fth_br]': {
    code: '[fth_br]',
    codeUC: '[FTH_BR]',
    name: 'fathom',
    property: 'length',
    isMetric: false,
    class: 'brit-length',
    value: {
      unit: '[ft_br]',
      unitUC: '[FT_BR]',
      value: 6
    }
  },
  '[pc_br]': {
    code: '[pc_br]',
    codeUC: '[PC_BR]',
    name: 'pace',
    property: 'length',
    isMetric: false,
    class: 'brit-length',
    value: {
      unit: '[ft_br]',
      unitUC: '[FT_BR]',
      value: 2.5
    }
  },
  '[yd_br]': {
    code: '[yd_br]',
    codeUC: '[YD_BR]',
    name: 'yard',
    property: 'length',
    isMetric: false,
    class: 'brit-length',
    value: {
      unit: '[ft_br]',
      unitUC: '[FT_BR]',
      value: 3
    }
  },
  '[mi_br]': {
    code: '[mi_br]',
    codeUC: '[MI_BR]',
    name: 'mile',
    property: 'length',
    isMetric: false,
    class: 'brit-length',
    value: {
      unit: '[ft_br]',
      unitUC: '[FT_BR]',
      value: 5280
    }
  },
  '[nmi_br]': {
    code: '[nmi_br]',
    codeUC: '[NMI_BR]',
    name: 'nautical mile',
    property: 'length',
    isMetric: false,
    class: 'brit-length',
    value: {
      unit: '[ft_br]',
      unitUC: '[FT_BR]',
      value: 6080
    }
  },
  '[kn_br]': {
    code: '[kn_br]',
    codeUC: '[KN_BR]',
    name: 'knot',
    property: 'velocity',
    isMetric: false,
    class: 'brit-length',
    value: {
      unit: '[nmi_br]/h',
      unitUC: '[NMI_BR]/H',
      value: 1
    }
  },
  '[acr_br]': {
    code: '[acr_br]',
    codeUC: '[ACR_BR]',
    name: 'acre',
    property: 'area',
    isMetric: false,
    class: 'brit-length',
    value: {
      unit: '[yd_br]2',
      unitUC: '[YD_BR]2',
      value: 4840
    }
  },
  '[gal_us]': {
    code: '[gal_us]',
    codeUC: '[GAL_US]',
    name: 'Queen&#160;Anne\'s wine gallon',
    property: 'fluid volume',
    isMetric: false,
    class: 'us-volumes',
    value: {
      unit: '[in_i]3',
      unitUC: '[IN_I]3',
      value: 231
    }
  },
  '[bbl_us]': {
    code: '[bbl_us]',
    codeUC: '[BBL_US]',
    name: 'barrel',
    property: 'fluid volume',
    isMetric: false,
    class: 'us-volumes',
    value: {
      unit: '[gal_us]',
      unitUC: '[GAL_US]',
      value: 42
    }
  },
  '[qt_us]': {
    code: '[qt_us]',
    codeUC: '[QT_US]',
    name: 'quart',
    property: 'fluid volume',
    isMetric: false,
    class: 'us-volumes',
    value: {
      unit: '[gal_us]/4',
      unitUC: '[GAL_US]/4',
      value: 1
    }
  },
  '[pt_us]': {
    code: '[pt_us]',
    codeUC: '[PT_US]',
    name: 'pint',
    property: 'fluid volume',
    isMetric: false,
    class: 'us-volumes',
    value: {
      unit: '[qt_us]/2',
      unitUC: '[QT_US]/2',
      value: 1
    }
  },
  '[gil_us]': {
    code: '[gil_us]',
    codeUC: '[GIL_US]',
    name: 'gill',
    property: 'fluid volume',
    isMetric: false,
    class: 'us-volumes',
    value: {
      unit: '[pt_us]/4',
      unitUC: '[PT_US]/4',
      value: 1
    }
  },
  '[foz_us]': {
    code: '[foz_us]',
    codeUC: '[FOZ_US]',
    name: 'fluid ounce',
    printSymbol: 'oz fl',
    property: 'fluid volume',
    isMetric: false,
    class: 'us-volumes',
    value: {
      unit: '[gil_us]/4',
      unitUC: '[GIL_US]/4',
      value: 1
    }
  },
  '[fdr_us]': {
    code: '[fdr_us]',
    codeUC: '[FDR_US]',
    name: 'fluid dram',
    property: 'fluid volume',
    isMetric: false,
    class: 'us-volumes',
    value: {
      unit: '[foz_us]/8',
      unitUC: '[FOZ_US]/8',
      value: 1
    }
  },
  '[min_us]': {
    code: '[min_us]',
    codeUC: '[MIN_US]',
    name: 'minim',
    property: 'fluid volume',
    isMetric: false,
    class: 'us-volumes',
    value: {
      unit: '[fdr_us]/60',
      unitUC: '[FDR_US]/60',
      value: 1
    }
  },
  '[crd_us]': {
    code: '[crd_us]',
    codeUC: '[CRD_US]',
    name: 'cord',
    property: 'fluid volume',
    isMetric: false,
    class: 'us-volumes',
    value: {
      unit: '[ft_i]3',
      unitUC: '[FT_I]3',
      value: 128
    }
  },
  '[bu_us]': {
    code: '[bu_us]',
    codeUC: '[BU_US]',
    name: 'bushel',
    property: 'dry volume',
    isMetric: false,
    class: 'us-volumes',
    value: {
      unit: '[in_i]3',
      unitUC: '[IN_I]3',
      value: 2150.42
    }
  },
  '[gal_wi]': {
    code: '[gal_wi]',
    codeUC: '[GAL_WI]',
    name: 'historical winchester gallon',
    property: 'dry volume',
    isMetric: false,
    class: 'us-volumes',
    value: {
      unit: '[bu_us]/8',
      unitUC: '[BU_US]/8',
      value: 1
    }
  },
  '[pk_us]': {
    code: '[pk_us]',
    codeUC: '[PK_US]',
    name: 'peck',
    property: 'dry volume',
    isMetric: false,
    class: 'us-volumes',
    value: {
      unit: '[bu_us]/4',
      unitUC: '[BU_US]/4',
      value: 1
    }
  },
  '[dqt_us]': {
    code: '[dqt_us]',
    codeUC: '[DQT_US]',
    name: 'dry quart',
    property: 'dry volume',
    isMetric: false,
    class: 'us-volumes',
    value: {
      unit: '[pk_us]/8',
      unitUC: '[PK_US]/8',
      value: 1
    }
  },
  '[dpt_us]': {
    code: '[dpt_us]',
    codeUC: '[DPT_US]',
    name: 'dry pint',
    property: 'dry volume',
    isMetric: false,
    class: 'us-volumes',
    value: {
      unit: '[dqt_us]/2',
      unitUC: '[DQT_US]/2',
      value: 1
    }
  },
  '[tbs_us]': {
    code: '[tbs_us]',
    codeUC: '[TBS_US]',
    name: 'tablespoon',
    property: 'volume',
    isMetric: false,
    class: 'us-volumes',
    value: {
      unit: '[foz_us]/2',
      unitUC: '[FOZ_US]/2',
      value: 1
    }
  },
  '[tsp_us]': {
    code: '[tsp_us]',
    codeUC: '[TSP_US]',
    name: 'teaspoon',
    property: 'volume',
    isMetric: false,
    class: 'us-volumes',
    value: {
      unit: '[tbs_us]/3',
      unitUC: '[TBS_US]/3',
      value: 1
    }
  },
  '[cup_us]': {
    code: '[cup_us]',
    codeUC: '[CUP_US]',
    name: 'cup',
    property: 'volume',
    isMetric: false,
    class: 'us-volumes',
    value: {
      unit: '[tbs_us]',
      unitUC: '[TBS_US]',
      value: 16
    }
  },
  '[foz_m]': {
    code: '[foz_m]',
    codeUC: '[FOZ_M]',
    name: 'metric fluid ounce',
    printSymbol: 'oz fl',
    property: 'fluid volume',
    isMetric: false,
    class: 'us-volumes',
    value: {
      unit: 'mL',
      unitUC: 'ML',
      value: 30
    }
  },
  '[cup_m]': {
    code: '[cup_m]',
    codeUC: '[CUP_M]',
    name: 'metric cup',
    property: 'volume',
    isMetric: false,
    class: 'us-volumes',
    value: {
      unit: 'mL',
      unitUC: 'ML',
      value: 240
    }
  },
  '[tsp_m]': {
    code: '[tsp_m]',
    codeUC: '[TSP_M]',
    name: 'metric teaspoon',
    property: 'volume',
    isMetric: false,
    class: 'us-volumes',
    value: {
      unit: 'mL',
      unitUC: 'mL',
      value: 5
    }
  },
  '[tbs_m]': {
    code: '[tbs_m]',
    codeUC: '[TBS_M]',
    name: 'metric tablespoon',
    property: 'volume',
    isMetric: false,
    class: 'us-volumes',
    value: {
      unit: 'mL',
      unitUC: 'mL',
      value: 15
    }
  },
  '[gal_br]': {
    code: '[gal_br]',
    codeUC: '[GAL_BR]',
    name: 'gallon',
    property: 'volume',
    isMetric: false,
    class: 'brit-volumes',
    value: {
      unit: 'l',
      unitUC: 'L',
      value: 4.54609
    }
  },
  '[pk_br]': {
    code: '[pk_br]',
    codeUC: '[PK_BR]',
    name: 'peck',
    property: 'volume',
    isMetric: false,
    class: 'brit-volumes',
    value: {
      unit: '[gal_br]',
      unitUC: '[GAL_BR]',
      value: 2
    }
  },
  '[bu_br]': {
    code: '[bu_br]',
    codeUC: '[BU_BR]',
    name: 'bushel',
    property: 'volume',
    isMetric: false,
    class: 'brit-volumes',
    value: {
      unit: '[pk_br]',
      unitUC: '[PK_BR]',
      value: 4
    }
  },
  '[qt_br]': {
    code: '[qt_br]',
    codeUC: '[QT_BR]',
    name: 'quart',
    property: 'volume',
    isMetric: false,
    class: 'brit-volumes',
    value: {
      unit: '[gal_br]/4',
      unitUC: '[GAL_BR]/4',
      value: 1
    }
  },
  '[pt_br]': {
    code: '[pt_br]',
    codeUC: '[PT_BR]',
    name: 'pint',
    property: 'volume',
    isMetric: false,
    class: 'brit-volumes',
    value: {
      unit: '[qt_br]/2',
      unitUC: '[QT_BR]/2',
      value: 1
    }
  },
  '[gil_br]': {
    code: '[gil_br]',
    codeUC: '[GIL_BR]',
    name: 'gill',
    property: 'volume',
    isMetric: false,
    class: 'brit-volumes',
    value: {
      unit: '[pt_br]/4',
      unitUC: '[PT_BR]/4',
      value: 1
    }
  },
  '[foz_br]': {
    code: '[foz_br]',
    codeUC: '[FOZ_BR]',
    name: 'fluid ounce',
    property: 'volume',
    isMetric: false,
    class: 'brit-volumes',
    value: {
      unit: '[gil_br]/5',
      unitUC: '[GIL_BR]/5',
      value: 1
    }
  },
  '[fdr_br]': {
    code: '[fdr_br]',
    codeUC: '[FDR_BR]',
    name: 'fluid dram',
    property: 'volume',
    isMetric: false,
    class: 'brit-volumes',
    value: {
      unit: '[foz_br]/8',
      unitUC: '[FOZ_BR]/8',
      value: 1
    }
  },
  '[min_br]': {
    code: '[min_br]',
    codeUC: '[MIN_BR]',
    name: 'minim',
    property: 'volume',
    isMetric: false,
    class: 'brit-volumes',
    value: {
      unit: '[fdr_br]/60',
      unitUC: '[FDR_BR]/60',
      value: 1
    }
  },
  '[gr]': {
    code: '[gr]',
    codeUC: '[GR]',
    name: 'grain',
    property: 'mass',
    isMetric: false,
    class: 'avoirdupois',
    value: {
      unit: 'mg',
      unitUC: 'MG',
      value: 64.79891
    }
  },
  '[lb_av]': {
    code: '[lb_av]',
    codeUC: '[LB_AV]',
    name: 'pound',
    printSymbol: 'lb',
    property: 'mass',
    isMetric: false,
    class: 'avoirdupois',
    value: {
      unit: '[gr]',
      unitUC: '[GR]',
      value: 7000
    }
  },
  '[lbf_av]': {
    code: '[lbf_av]',
    codeUC: '[LBF_AV]',
    name: 'pound force',
    printSymbol: 'lbf',
    property: 'force',
    isMetric: false,
    class: 'const',
    value: {
      unit: '[lb_av].[g]',
      unitUC: '[LB_AV].[G]',
      value: 1
    }
  },
  '[oz_av]': {
    code: '[oz_av]',
    codeUC: '[OZ_AV]',
    name: 'ounce',
    printSymbol: 'oz',
    property: 'mass',
    isMetric: false,
    class: 'avoirdupois',
    value: {
      unit: '[lb_av]/16',
      unitUC: '[LB_AV]/16',
      value: 1
    }
  },
  '[dr_av]': {
    code: '[dr_av]',
    codeUC: '[DR_AV]',
    name: 'dram',
    property: 'mass',
    isMetric: false,
    class: 'avoirdupois',
    value: {
      unit: '[oz_av]/16',
      unitUC: '[OZ_AV]/16',
      value: 1
    }
  },
  '[scwt_av]': {
    code: '[scwt_av]',
    codeUC: '[SCWT_AV]',
    name: 'short hundredweight,U.S. hundredweight',
    property: 'mass',
    isMetric: false,
    class: 'avoirdupois',
    value: {
      unit: '[lb_av]',
      unitUC: '[LB_AV]',
      value: 100
    }
  },
  '[lcwt_av]': {
    code: '[lcwt_av]',
    codeUC: '[LCWT_AV]',
    name: 'long hunderdweight,British hundredweight',
    property: 'mass',
    isMetric: false,
    class: 'avoirdupois',
    value: {
      unit: '[lb_av]',
      unitUC: '[LB_AV]',
      value: 112
    }
  },
  '[ston_av]': {
    code: '[ston_av]',
    codeUC: '[STON_AV]',
    name: 'short ton,U.S. ton',
    property: 'mass',
    isMetric: false,
    class: 'avoirdupois',
    value: {
      unit: '[scwt_av]',
      unitUC: '[SCWT_AV]',
      value: 20
    }
  },
  '[lton_av]': {
    code: '[lton_av]',
    codeUC: '[LTON_AV]',
    name: 'long ton,British ton',
    property: 'mass',
    isMetric: false,
    class: 'avoirdupois',
    value: {
      unit: '[lcwt_av]',
      unitUC: '[LCWT_AV]',
      value: 20
    }
  },
  '[stone_av]': {
    code: '[stone_av]',
    codeUC: '[STONE_AV]',
    name: 'stone,British stone',
    property: 'mass',
    isMetric: false,
    class: 'avoirdupois',
    value: {
      unit: '[lb_av]',
      unitUC: '[LB_AV]',
      value: 14
    }
  },
  '[pwt_tr]': {
    code: '[pwt_tr]',
    codeUC: '[PWT_TR]',
    name: 'pennyweight',
    property: 'mass',
    isMetric: false,
    class: 'troy',
    value: {
      unit: '[gr]',
      unitUC: '[GR]',
      value: 24
    }
  },
  '[oz_tr]': {
    code: '[oz_tr]',
    codeUC: '[OZ_TR]',
    name: 'ounce',
    property: 'mass',
    isMetric: false,
    class: 'troy',
    value: {
      unit: '[pwt_tr]',
      unitUC: '[PWT_TR]',
      value: 20
    }
  },
  '[lb_tr]': {
    code: '[lb_tr]',
    codeUC: '[LB_TR]',
    name: 'pound',
    property: 'mass',
    isMetric: false,
    class: 'troy',
    value: {
      unit: '[oz_tr]',
      unitUC: '[OZ_TR]',
      value: 12
    }
  },
  '[sc_ap]': {
    code: '[sc_ap]',
    codeUC: '[SC_AP]',
    name: 'scruple',
    property: 'mass',
    isMetric: false,
    class: 'apoth',
    value: {
      unit: '[gr]',
      unitUC: '[GR]',
      value: 20
    }
  },
  '[dr_ap]': {
    code: '[dr_ap]',
    codeUC: '[DR_AP]',
    name: 'dram,drachm',
    property: 'mass',
    isMetric: false,
    class: 'apoth',
    value: {
      unit: '[sc_ap]',
      unitUC: '[SC_AP]',
      value: 3
    }
  },
  '[oz_ap]': {
    code: '[oz_ap]',
    codeUC: '[OZ_AP]',
    name: 'ounce',
    property: 'mass',
    isMetric: false,
    class: 'apoth',
    value: {
      unit: '[dr_ap]',
      unitUC: '[DR_AP]',
      value: 8
    }
  },
  '[lb_ap]': {
    code: '[lb_ap]',
    codeUC: '[LB_AP]',
    name: 'pound',
    property: 'mass',
    isMetric: false,
    class: 'apoth',
    value: {
      unit: '[oz_ap]',
      unitUC: '[OZ_AP]',
      value: 12
    }
  },
  '[oz_m]': {
    code: '[oz_m]',
    codeUC: '[OZ_M]',
    name: 'metric ounce',
    property: 'mass',
    isMetric: false,
    class: 'apoth',
    value: {
      unit: 'g',
      unitUC: 'g',
      value: 28
    }
  },
  '[lne]': {
    code: '[lne]',
    codeUC: '[LNE]',
    name: 'line',
    property: 'length',
    isMetric: false,
    class: 'typeset',
    value: {
      unit: '[in_i]/12',
      unitUC: '[IN_I]/12',
      value: 1
    }
  },
  '[pnt]': {
    code: '[pnt]',
    codeUC: '[PNT]',
    name: 'point',
    property: 'length',
    isMetric: false,
    class: 'typeset',
    value: {
      unit: '[lne]/6',
      unitUC: '[LNE]/6',
      value: 1
    }
  },
  '[pca]': {
    code: '[pca]',
    codeUC: '[PCA]',
    name: 'pica',
    property: 'length',
    isMetric: false,
    class: 'typeset',
    value: {
      unit: '[pnt]',
      unitUC: '[PNT]',
      value: 12
    }
  },
  '[pnt_pr]': {
    code: '[pnt_pr]',
    codeUC: '[PNT_PR]',
    name: 'Printer\'s point',
    property: 'length',
    isMetric: false,
    class: 'typeset',
    value: {
      unit: '[in_i]',
      unitUC: '[IN_I]',
      value: 0.013837
    }
  },
  '[pca_pr]': {
    code: '[pca_pr]',
    codeUC: '[PCA_PR]',
    name: 'Printer\'s pica',
    property: 'length',
    isMetric: false,
    class: 'typeset',
    value: {
      unit: '[pnt_pr]',
      unitUC: '[PNT_PR]',
      value: 12
    }
  },
  '[pied]': {
    code: '[pied]',
    codeUC: '[PIED]',
    name: 'pied,French foot',
    property: 'length',
    isMetric: false,
    class: 'typeset',
    value: {
      unit: 'cm',
      unitUC: 'CM',
      value: 32.48
    }
  },
  '[pouce]': {
    code: '[pouce]',
    codeUC: '[POUCE]',
    name: 'pouce,French inch',
    property: 'length',
    isMetric: false,
    class: 'typeset',
    value: {
      unit: '[pied]/12',
      unitUC: '[PIED]/12',
      value: 1
    }
  },
  '[ligne]': {
    code: '[ligne]',
    codeUC: '[LIGNE]',
    name: 'ligne,French line',
    property: 'length',
    isMetric: false,
    class: 'typeset',
    value: {
      unit: '[pouce]/12',
      unitUC: '[POUCE]/12',
      value: 1
    }
  },
  '[didot]': {
    code: '[didot]',
    codeUC: '[DIDOT]',
    name: 'didot,Didot\'s point',
    property: 'length',
    isMetric: false,
    class: 'typeset',
    value: {
      unit: '[ligne]/6',
      unitUC: '[LIGNE]/6',
      value: 1
    }
  },
  '[cicero]': {
    code: '[cicero]',
    codeUC: '[CICERO]',
    name: 'cicero,Didot\'s pica',
    property: 'length',
    isMetric: false,
    class: 'typeset',
    value: {
      unit: '[didot]',
      unitUC: '[DIDOT]',
      value: 12
    }
  },
  '[degR]': {
    code: '[degR]',
    codeUC: '[degR]',
    name: 'degree Rankine',
    printSymbol: '&#176;R',
    property: 'temperature',
    isMetric: false,
    class: 'heat',
    value: {
      unit: 'K/9',
      unitUC: 'K/9',
      value: 5
    }
  },
  'cal_[15]': {
    code: 'cal_[15]',
    codeUC: 'CAL_[15]',
    name: 'calorie at 15&#160;&#176;C',
    printSymbol: '[object Object]',
    property: 'energy',
    isMetric: true,
    class: 'heat',
    value: {
      unit: 'J',
      unitUC: 'J',
      value: 4.1858
    }
  },
  'cal_[20]': {
    code: 'cal_[20]',
    codeUC: 'CAL_[20]',
    name: 'calorie at 20&#160;&#176;C',
    printSymbol: '[object Object]',
    property: 'energy',
    isMetric: true,
    class: 'heat',
    value: {
      unit: 'J',
      unitUC: 'J',
      value: 4.1819
    }
  },
  'cal_m': {
    code: 'cal_m',
    codeUC: 'CAL_M',
    name: 'mean calorie',
    printSymbol: '[object Object]',
    property: 'energy',
    isMetric: true,
    class: 'heat',
    value: {
      unit: 'J',
      unitUC: 'J',
      value: 4.19002
    }
  },
  'cal_IT': {
    code: 'cal_IT',
    codeUC: 'CAL_IT',
    name: 'international table calorie',
    printSymbol: '[object Object]',
    property: 'energy',
    isMetric: true,
    class: 'heat',
    value: {
      unit: 'J',
      unitUC: 'J',
      value: 4.1868
    }
  },
  'cal_th': {
    code: 'cal_th',
    codeUC: 'CAL_TH',
    name: 'thermochemical calorie',
    printSymbol: '[object Object]',
    property: 'energy',
    isMetric: true,
    class: 'heat',
    value: {
      unit: 'J',
      unitUC: 'J',
      value: 4.184
    }
  },
  'cal': {
    code: 'cal',
    codeUC: 'CAL',
    name: 'calorie',
    printSymbol: 'cal',
    property: 'energy',
    isMetric: true,
    class: 'heat',
    value: {
      unit: 'cal_th',
      unitUC: 'CAL_TH',
      value: 1
    }
  },
  '[Cal]': {
    code: '[Cal]',
    codeUC: '[CAL]',
    name: 'nutrition label Calories',
    printSymbol: 'Cal',
    property: 'energy',
    isMetric: false,
    class: 'heat',
    value: {
      unit: 'kcal_th',
      unitUC: 'KCAL_TH',
      value: 1
    }
  },
  '[Btu_39]': {
    code: '[Btu_39]',
    codeUC: '[BTU_39]',
    name: 'British thermal unit at 39&#160;&#176;F',
    printSymbol: '[object Object]',
    property: 'energy',
    isMetric: false,
    class: 'heat',
    value: {
      unit: 'kJ',
      unitUC: 'kJ',
      value: 1.05967
    }
  },
  '[Btu_59]': {
    code: '[Btu_59]',
    codeUC: '[BTU_59]',
    name: 'British thermal unit at 59&#160;&#176;F',
    printSymbol: '[object Object]',
    property: 'energy',
    isMetric: false,
    class: 'heat',
    value: {
      unit: 'kJ',
      unitUC: 'kJ',
      value: 1.0548
    }
  },
  '[Btu_60]': {
    code: '[Btu_60]',
    codeUC: '[BTU_60]',
    name: 'British thermal unit at 60&#160;&#176;F',
    printSymbol: '[object Object]',
    property: 'energy',
    isMetric: false,
    class: 'heat',
    value: {
      unit: 'kJ',
      unitUC: 'kJ',
      value: 1.05468
    }
  },
  '[Btu_m]': {
    code: '[Btu_m]',
    codeUC: '[BTU_M]',
    name: 'mean British thermal unit',
    printSymbol: '[object Object]',
    property: 'energy',
    isMetric: false,
    class: 'heat',
    value: {
      unit: 'kJ',
      unitUC: 'kJ',
      value: 1.05587
    }
  },
  '[Btu_IT]': {
    code: '[Btu_IT]',
    codeUC: '[BTU_IT]',
    name: 'international table British thermal unit',
    printSymbol: '[object Object]',
    property: 'energy',
    isMetric: false,
    class: 'heat',
    value: {
      unit: 'kJ',
      unitUC: 'kJ',
      value: 1.05505585262
    }
  },
  '[Btu_th]': {
    code: '[Btu_th]',
    codeUC: '[BTU_TH]',
    name: 'thermochemical British thermal unit',
    printSymbol: '[object Object]',
    property: 'energy',
    isMetric: false,
    class: 'heat',
    value: {
      unit: 'kJ',
      unitUC: 'kJ',
      value: 1.05435
    }
  },
  '[Btu]': {
    code: '[Btu]',
    codeUC: '[BTU]',
    name: 'British thermal unit',
    printSymbol: 'btu',
    property: 'energy',
    isMetric: false,
    class: 'heat',
    value: {
      unit: '[Btu_th]',
      unitUC: '[BTU_TH]',
      value: 1
    }
  },
  '[HP]': {
    code: '[HP]',
    codeUC: '[HP]',
    name: 'horsepower',
    property: 'power',
    isMetric: false,
    class: 'heat',
    value: {
      unit: '[ft_i].[lbf_av]/s',
      unitUC: '[FT_I].[LBF_AV]/S',
      value: 550
    }
  },
  'tex': {
    code: 'tex',
    codeUC: 'TEX',
    name: 'tex',
    printSymbol: 'tex',
    property: 'linear mass density (of textile thread)',
    isMetric: true,
    class: 'heat',
    value: {
      unit: 'g/km',
      unitUC: 'G/KM',
      value: 1
    }
  },
  '[den]': {
    code: '[den]',
    codeUC: '[DEN]',
    name: 'Denier',
    printSymbol: 'den',
    property: 'linear mass density (of textile thread)',
    isMetric: false,
    class: 'heat',
    value: {
      unit: 'g/9/km',
      unitUC: 'G/9/KM',
      value: 1
    }
  },
  'm[H2O]': {
    code: 'm[H2O]',
    codeUC: 'M[H2O]',
    name: 'meter of water column',
    printSymbol: '[object Object]',
    property: 'pressure',
    isMetric: true,
    class: 'clinical',
    value: {
      unit: 'kPa',
      unitUC: 'KPAL',
      value: 9.80665
    }
  },
  'm[Hg]': {
    code: 'm[Hg]',
    codeUC: 'M[HG]',
    name: 'meter of mercury column',
    printSymbol: 'm&#160;Hg',
    property: 'pressure',
    isMetric: true,
    class: 'clinical',
    value: {
      unit: 'kPa',
      unitUC: 'KPAL',
      value: 133.322
    }
  },
  '[in_i\'H2O]': {
    code: '[in_i\'H2O]',
    codeUC: '[IN_I\'H2O]',
    name: 'inch of water column',
    printSymbol: '[object Object]',
    property: 'pressure',
    isMetric: false,
    class: 'clinical',
    value: {
      unit: 'm[H2O].[in_i]/m',
      unitUC: 'M[H2O].[IN_I]/M',
      value: 1
    }
  },
  '[in_i\'Hg]': {
    code: '[in_i\'Hg]',
    codeUC: '[IN_I\'HG]',
    name: 'inch of mercury column',
    printSymbol: 'in&#160;Hg',
    property: 'pressure',
    isMetric: false,
    class: 'clinical',
    value: {
      unit: 'm[Hg].[in_i]/m',
      unitUC: 'M[HG].[IN_I]/M',
      value: 1
    }
  },
  '[PRU]': {
    code: '[PRU]',
    codeUC: '[PRU]',
    name: 'peripheral vascular resistance unit',
    printSymbol: 'P.R.U.',
    property: 'fluid resistance',
    isMetric: false,
    class: 'clinical',
    value: {
      unit: 'mm[Hg].s/ml',
      unitUC: 'MM[HG].S/ML',
      value: 1
    }
  },
  '[wood\'U]': {
    code: '[wood\'U]',
    codeUC: '[WOOD\'U]',
    name: 'Wood unit',
    printSymbol: 'Wood U.',
    property: 'fluid resistance',
    isMetric: false,
    class: 'clinical',
    value: {
      unit: 'mm[Hg].min/L',
      unitUC: 'MM[HG].MIN/L',
      value: 1
    }
  },
  '[diop]': {
    code: '[diop]',
    codeUC: '[DIOP]',
    name: 'diopter',
    printSymbol: 'dpt',
    property: 'refraction of a lens',
    isMetric: false,
    class: 'clinical',
    value: {
      unit: '/m',
      unitUC: '/M',
      value: 1
    }
  },
  '[mesh_i]': {
    code: '[mesh_i]',
    codeUC: '[MESH_I]',
    name: 'mesh',
    property: 'lineic number',
    isMetric: false,
    class: 'clinical',
    value: {
      unit: '/[in_i]',
      unitUC: '/[IN_I]',
      value: 1
    }
  },
  '[Ch]': {
    code: '[Ch]',
    codeUC: '[CH]',
    name: 'Charri&#232;re,french',
    printSymbol: 'Ch',
    property: 'gauge of catheters',
    isMetric: false,
    class: 'clinical',
    value: {
      unit: 'mm/3',
      unitUC: 'MM/3',
      value: 1
    }
  },
  '[drp]': {
    code: '[drp]',
    codeUC: '[DRP]',
    name: 'drop',
    printSymbol: 'drp',
    property: 'volume',
    isMetric: false,
    class: 'clinical',
    value: {
      unit: 'ml/20',
      unitUC: 'ML/20',
      value: 1
    }
  },
  '[hnsf\'U]': {
    code: '[hnsf\'U]',
    codeUC: '[HNSF\'U]',
    name: 'Hounsfield unit',
    printSymbol: 'HF',
    property: 'x-ray attenuation',
    isMetric: false,
    class: 'clinical',
    value: {
      unit: '1',
      unitUC: '1',
      value: 1
    }
  },
  '[MET]': {
    code: '[MET]',
    codeUC: '[MET]',
    name: 'metabolic equivalent',
    printSymbol: 'MET',
    property: 'metabolic cost of physical activity',
    isMetric: false,
    class: 'clinical',
    value: {
      unit: 'mL/min/kg',
      unitUC: 'ML/MIN/KG',
      value: 3.5
    }
  },
  '[hp_X]': {
    code: '[hp_X]',
    codeUC: '[HP_X]',
    name: 'homeopathic potency of decimal hahnemannian series',
    printSymbol: 'X',
    property: 'homeopathic potency (Hahnemann)',
    isMetric: false,
    class: 'clinical',
    value: {
      unit: '1',
      unitUC: '1',
      value: 1
    }
  },
  '[hp_C]': {
    code: '[hp_C]',
    codeUC: '[HP_C]',
    name: 'homeopathic potency of centesimal hahnemannian series',
    printSymbol: 'C',
    property: 'homeopathic potency (Hahnemann)',
    isMetric: false,
    class: 'clinical',
    value: {
      unit: '1',
      unitUC: '1',
      value: 1
    }
  },
  '[hp_M]': {
    code: '[hp_M]',
    codeUC: '[HP_M]',
    name: 'homeopathic potency of millesimal hahnemannian series',
    printSymbol: 'M',
    property: 'homeopathic potency (Hahnemann)',
    isMetric: false,
    class: 'clinical',
    value: {
      unit: '1',
      unitUC: '1',
      value: 1
    }
  },
  '[hp_Q]': {
    code: '[hp_Q]',
    codeUC: '[HP_Q]',
    name: 'homeopathic potency of quintamillesimal hahnemannian series',
    printSymbol: 'Q',
    property: 'homeopathic potency (Hahnemann)',
    isMetric: false,
    class: 'clinical',
    value: {
      unit: '1',
      unitUC: '1',
      value: 1
    }
  },
  '[kp_X]': {
    code: '[kp_X]',
    codeUC: '[KP_X]',
    name: 'homeopathic potency of decimal korsakovian series',
    printSymbol: 'X',
    property: 'homeopathic potency (Korsakov)',
    isMetric: false,
    class: 'clinical',
    value: {
      unit: '1',
      unitUC: '1',
      value: 1
    }
  },
  '[kp_C]': {
    code: '[kp_C]',
    codeUC: '[KP_C]',
    name: 'homeopathic potency of centesimal korsakovian series',
    printSymbol: 'C',
    property: 'homeopathic potency (Korsakov)',
    isMetric: false,
    class: 'clinical',
    value: {
      unit: '1',
      unitUC: '1',
      value: 1
    }
  },
  '[kp_M]': {
    code: '[kp_M]',
    codeUC: '[KP_M]',
    name: 'homeopathic potency of millesimal korsakovian series',
    printSymbol: 'M',
    property: 'homeopathic potency (Korsakov)',
    isMetric: false,
    class: 'clinical',
    value: {
      unit: '1',
      unitUC: '1',
      value: 1
    }
  },
  '[kp_Q]': {
    code: '[kp_Q]',
    codeUC: '[KP_Q]',
    name: 'homeopathic potency of quintamillesimal korsakovian series',
    printSymbol: 'Q',
    property: 'homeopathic potency (Korsakov)',
    isMetric: false,
    class: 'clinical',
    value: {
      unit: '1',
      unitUC: '1',
      value: 1
    }
  },
  'eq': {
    code: 'eq',
    codeUC: 'EQ',
    name: 'equivalents',
    printSymbol: 'eq',
    property: 'amount of substance',
    isMetric: true,
    class: 'chemical',
    value: {
      unit: 'mol',
      unitUC: 'MOL',
      value: 1
    }
  },
  'osm': {
    code: 'osm',
    codeUC: 'OSM',
    name: 'osmole',
    printSymbol: 'osm',
    property: 'amount of substance (dissolved particles)',
    isMetric: true,
    class: 'chemical',
    value: {
      unit: 'mol',
      unitUC: 'MOL',
      value: 1
    }
  },
  'g%': {
    code: 'g%',
    codeUC: 'G%',
    name: 'gram percent',
    printSymbol: 'g%',
    property: 'mass concentration',
    isMetric: true,
    class: 'chemical',
    value: {
      unit: 'g/dl',
      unitUC: 'G/DL',
      value: 1
    }
  },
  '[S]': {
    code: '[S]',
    codeUC: '[S]',
    name: 'Svedberg unit',
    printSymbol: 'S',
    property: 'sedimentation coefficient',
    isMetric: false,
    class: 'chemical',
    value: {
      unit: '10*-13.s',
      unitUC: '10*-13.S',
      value: 1
    }
  },
  '[HPF]': {
    code: '[HPF]',
    codeUC: '[HPF]',
    name: 'high power field',
    printSymbol: 'HPF',
    property: 'view area in microscope',
    isMetric: false,
    class: 'chemical',
    value: {
      unit: '1',
      unitUC: '1',
      value: 1
    }
  },
  '[LPF]': {
    code: '[LPF]',
    codeUC: '[LPF]',
    name: 'low power field',
    printSymbol: 'LPF',
    property: 'view area in microscope',
    isMetric: false,
    class: 'chemical',
    value: {
      unit: '1',
      unitUC: '1',
      value: 100
    }
  },
  'kat': {
    code: 'kat',
    codeUC: 'KAT',
    name: 'katal',
    printSymbol: 'kat',
    property: 'catalytic activity',
    isMetric: true,
    class: 'chemical',
    value: {
      unit: 'mol/s',
      unitUC: 'MOL/S',
      value: 1
    }
  },
  'U': {
    code: 'U',
    codeUC: 'U',
    name: 'Unit',
    printSymbol: 'U',
    property: 'catalytic activity',
    isMetric: true,
    class: 'chemical',
    value: {
      unit: 'umol/min',
      unitUC: 'UMOL/MIN',
      value: 1
    }
  },
  '[iU]': {
    code: '[iU]',
    codeUC: '[IU]',
    name: 'international unit',
    printSymbol: 'IU',
    property: 'arbitrary',
    isMetric: true,
    class: 'chemical',
    value: {
      unit: '1',
      unitUC: '1',
      value: 1
    }
  },
  '[IU]': {
    code: '[IU]',
    codeUC: '[IU]',
    name: 'international unit',
    printSymbol: 'i.U.',
    property: 'arbitrary',
    isMetric: true,
    class: 'chemical',
    value: {
      unit: '[iU]',
      unitUC: '[IU]',
      value: 1
    }
  },
  '[arb\'U]': {
    code: '[arb\'U]',
    codeUC: '[ARB\'U]',
    name: 'arbitary unit',
    printSymbol: 'arb. U',
    property: 'arbitrary',
    isMetric: false,
    class: 'chemical',
    value: {
      unit: '1',
      unitUC: '1',
      value: 1
    }
  },
  '[USP\'U]': {
    code: '[USP\'U]',
    codeUC: '[USP\'U]',
    name: 'United States Pharmacopeia unit',
    printSymbol: 'U.S.P.',
    property: 'arbitrary',
    isMetric: false,
    class: 'chemical',
    value: {
      unit: '1',
      unitUC: '1',
      value: 1
    }
  },
  '[GPL\'U]': {
    code: '[GPL\'U]',
    codeUC: '[GPL\'U]',
    name: 'GPL unit',
    property: 'biologic activity of anticardiolipin IgG',
    isMetric: false,
    class: 'chemical',
    value: {
      unit: '1',
      unitUC: '1',
      value: 1
    }
  },
  '[MPL\'U]': {
    code: '[MPL\'U]',
    codeUC: '[MPL\'U]',
    name: 'MPL unit',
    property: 'biologic activity of anticardiolipin IgM',
    isMetric: false,
    class: 'chemical',
    value: {
      unit: '1',
      unitUC: '1',
      value: 1
    }
  },
  '[APL\'U]': {
    code: '[APL\'U]',
    codeUC: '[APL\'U]',
    name: 'APL unit',
    property: 'biologic activity of anticardiolipin IgA',
    isMetric: false,
    class: 'chemical',
    value: {
      unit: '1',
      unitUC: '1',
      value: 1
    }
  },
  '[beth\'U]': {
    code: '[beth\'U]',
    codeUC: '[BETH\'U]',
    name: 'Bethesda unit',
    property: 'biologic activity of factor VIII inhibitor',
    isMetric: false,
    class: 'chemical',
    value: {
      unit: '1',
      unitUC: '1',
      value: 1
    }
  },
  '[anti\'Xa\'U]': {
    code: '[anti\'Xa\'U]',
    codeUC: '[ANTI\'XA\'U]',
    name: 'anti factor Xa unit',
    property: 'biologic activity of factor Xa inhibitor (heparin)',
    isMetric: false,
    class: 'chemical',
    value: {
      unit: '1',
      unitUC: '1',
      value: 1
    }
  },
  '[todd\'U]': {
    code: '[todd\'U]',
    codeUC: '[TODD\'U]',
    name: 'Todd unit',
    property: 'biologic activity antistreptolysin O',
    isMetric: false,
    class: 'chemical',
    value: {
      unit: '1',
      unitUC: '1',
      value: 1
    }
  },
  '[dye\'U]': {
    code: '[dye\'U]',
    codeUC: '[DYE\'U]',
    name: 'Dye unit',
    property: 'biologic activity of amylase',
    isMetric: false,
    class: 'chemical',
    value: {
      unit: '1',
      unitUC: '1',
      value: 1
    }
  },
  '[smgy\'U]': {
    code: '[smgy\'U]',
    codeUC: '[SMGY\'U]',
    name: 'Somogyi unit',
    property: 'biologic activity of amylase',
    isMetric: false,
    class: 'chemical',
    value: {
      unit: '1',
      unitUC: '1',
      value: 1
    }
  },
  '[bdsk\'U]': {
    code: '[bdsk\'U]',
    codeUC: '[BDSK\'U]',
    name: 'Bodansky unit',
    property: 'biologic activity of phosphatase',
    isMetric: false,
    class: 'chemical',
    value: {
      unit: '1',
      unitUC: '1',
      value: 1
    }
  },
  '[ka\'U]': {
    code: '[ka\'U]',
    codeUC: '[KA\'U]',
    name: 'King-Armstrong unit',
    property: 'biologic activity of phosphatase',
    isMetric: false,
    class: 'chemical',
    value: {
      unit: '1',
      unitUC: '1',
      value: 1
    }
  },
  '[knk\'U]': {
    code: '[knk\'U]',
    codeUC: '[KNK\'U]',
    name: 'Kunkel unit',
    property: 'arbitrary biologic activity',
    isMetric: false,
    class: 'chemical',
    value: {
      unit: '1',
      unitUC: '1',
      value: 1
    }
  },
  '[mclg\'U]': {
    code: '[mclg\'U]',
    codeUC: '[MCLG\'U]',
    name: 'Mac Lagan unit',
    property: 'arbitrary biologic activity',
    isMetric: false,
    class: 'chemical',
    value: {
      unit: '1',
      unitUC: '1',
      value: 1
    }
  },
  '[tb\'U]': {
    code: '[tb\'U]',
    codeUC: '[TB\'U]',
    name: 'tuberculin unit',
    property: 'biologic activity of tuberculin',
    isMetric: false,
    class: 'chemical',
    value: {
      unit: '1',
      unitUC: '1',
      value: 1
    }
  },
  '[CCID_50]': {
    code: '[CCID_50]',
    codeUC: '[CCID_50]',
    name: '50% cell culture infectious dose',
    printSymbol: '[object Object]',
    property: 'biologic activity (infectivity) of an infectious agent preparation',
    isMetric: false,
    class: 'chemical',
    value: {
      unit: '1',
      unitUC: '1',
      value: 1
    }
  },
  '[TCID_50]': {
    code: '[TCID_50]',
    codeUC: '[TCID_50]',
    name: '50% tissue culture infectious dose',
    printSymbol: '[object Object]',
    property: 'biologic activity (infectivity) of an infectious agent preparation',
    isMetric: false,
    class: 'chemical',
    value: {
      unit: '1',
      unitUC: '1',
      value: 1
    }
  },
  '[EID_50]': {
    code: '[EID_50]',
    codeUC: '[EID_50]',
    name: '50% embryo infectious dose',
    printSymbol: '[object Object]',
    property: 'biologic activity (infectivity) of an infectious agent preparation',
    isMetric: false,
    class: 'chemical',
    value: {
      unit: '1',
      unitUC: '1',
      value: 1
    }
  },
  '[PFU]': {
    code: '[PFU]',
    codeUC: '[PFU]',
    name: 'plaque forming units',
    printSymbol: 'PFU',
    property: 'amount of an infectious agent',
    isMetric: false,
    class: 'chemical',
    value: {
      unit: '1',
      unitUC: '1',
      value: 1
    }
  },
  '[FFU]': {
    code: '[FFU]',
    codeUC: '[FFU]',
    name: 'focus forming units',
    printSymbol: 'FFU',
    property: 'amount of an infectious agent',
    isMetric: false,
    class: 'chemical',
    value: {
      unit: '1',
      unitUC: '1',
      value: 1
    }
  },
  '[CFU]': {
    code: '[CFU]',
    codeUC: '[CFU]',
    name: 'colony forming units',
    printSymbol: 'CFU',
    property: 'amount of a proliferating organism',
    isMetric: false,
    class: 'chemical',
    value: {
      unit: '1',
      unitUC: '1',
      value: 1
    }
  },
  '[IR]': {
    code: '[IR]',
    codeUC: '[IR]',
    name: 'index of reactivity',
    printSymbol: 'IR',
    property: 'amount of an allergen callibrated through in-vivo testing using the Stallergenes&#174; method.',
    isMetric: false,
    class: 'chemical',
    value: {
      unit: '1',
      unitUC: '1',
      value: 1
    }
  },
  '[BAU]': {
    code: '[BAU]',
    codeUC: '[BAU]',
    name: 'bioequivalent allergen unit',
    printSymbol: 'BAU',
    property: 'amount of an allergen callibrated through in-vivo testing based on the ID50EAL method of (intradermal dilution for 50mm sum of erythema diameters',
    isMetric: false,
    class: 'chemical',
    value: {
      unit: '1',
      unitUC: '1',
      value: 1
    }
  },
  '[AU]': {
    code: '[AU]',
    codeUC: '[AU]',
    name: 'allergen unit',
    printSymbol: 'AU',
    property: 'procedure defined amount of an allergen using some reference standard',
    isMetric: false,
    class: 'chemical',
    value: {
      unit: '1',
      unitUC: '1',
      value: 1
    }
  },
  '[Amb\'a\'1\'U]': {
    code: '[Amb\'a\'1\'U]',
    codeUC: '[AMB\'A\'1\'U]',
    name: 'allergen unit for Ambrosia artemisiifolia',
    printSymbol: 'Amb a 1 U',
    property: 'procedure defined amount of the major allergen of ragweed.',
    isMetric: false,
    class: 'chemical',
    value: {
      unit: '1',
      unitUC: '1',
      value: 1
    }
  },
  '[PNU]': {
    code: '[PNU]',
    codeUC: '[PNU]',
    name: 'protein nitrogen unit',
    printSymbol: 'PNU',
    property: 'procedure defined amount of a protein substance',
    isMetric: false,
    class: 'chemical',
    value: {
      unit: '1',
      unitUC: '1',
      value: 1
    }
  },
  '[Lf]': {
    code: '[Lf]',
    codeUC: '[LF]',
    name: 'Limit of flocculation',
    printSymbol: 'Lf',
    property: 'procedure defined amount of an antigen substance',
    isMetric: false,
    class: 'chemical',
    value: {
      unit: '1',
      unitUC: '1',
      value: 1
    }
  },
  '[D\'ag\'U]': {
    code: '[D\'ag\'U]',
    codeUC: '[D\'AG\'U]',
    name: 'D-antigen unit',
    property: 'procedure defined amount of a poliomyelitis d-antigen substance',
    isMetric: false,
    class: 'chemical',
    value: {
      unit: '1',
      unitUC: '1',
      value: 1
    }
  },
  '[FEU]': {
    code: '[FEU]',
    codeUC: '[FEU]',
    name: 'fibrinogen equivalent unit',
    property: 'amount of fibrinogen broken down into the measured d-dimers',
    isMetric: false,
    class: 'chemical',
    value: {
      unit: '1',
      unitUC: '1',
      value: 1
    }
  },
  '[ELU]': {
    code: '[ELU]',
    codeUC: '[ELU]',
    name: 'ELISA unit',
    property: 'arbitrary ELISA unit',
    isMetric: false,
    class: 'chemical',
    value: {
      unit: '1',
      unitUC: '1',
      value: 1
    }
  },
  '[EU]': {
    code: '[EU]',
    codeUC: '[EU]',
    name: 'Ehrlich unit',
    property: 'Ehrlich unit',
    isMetric: false,
    class: 'chemical',
    value: {
      unit: '1',
      unitUC: '1',
      value: 1
    }
  },
  'st': {
    code: 'st',
    codeUC: 'STR',
    name: 'stere',
    printSymbol: 'st',
    property: 'volume',
    isMetric: true,
    class: 'misc',
    value: {
      unit: 'm3',
      unitUC: 'M3',
      value: 1
    }
  },
  'Ao': {
    code: 'Ao',
    codeUC: 'AO',
    name: '&#197;ngstr&#246;m',
    printSymbol: '&#197;',
    property: 'length',
    isMetric: false,
    class: 'misc',
    value: {
      unit: 'nm',
      unitUC: 'NM',
      value: 0.1
    }
  },
  'b': {
    code: 'b',
    codeUC: 'BRN',
    name: 'barn',
    printSymbol: 'b',
    property: 'action area',
    isMetric: false,
    class: 'misc',
    value: {
      unit: 'fm2',
      unitUC: 'FM2',
      value: 100
    }
  },
  'att': {
    code: 'att',
    codeUC: 'ATT',
    name: 'technical atmosphere',
    printSymbol: 'at',
    property: 'pressure',
    isMetric: false,
    class: 'misc',
    value: {
      unit: 'kgf/cm2',
      unitUC: 'KGF/CM2',
      value: 1
    }
  },
  'mho': {
    code: 'mho',
    codeUC: 'MHO',
    name: 'mho',
    printSymbol: 'mho',
    property: 'electric conductance',
    isMetric: true,
    class: 'misc',
    value: {
      unit: 'S',
      unitUC: 'S',
      value: 1
    }
  },
  '[psi]': {
    code: '[psi]',
    codeUC: '[PSI]',
    name: 'pound per sqare inch',
    printSymbol: 'psi',
    property: 'pressure',
    isMetric: false,
    class: 'misc',
    value: {
      unit: '[lbf_av]/[in_i]2',
      unitUC: '[LBF_AV]/[IN_I]2',
      value: 1
    }
  },
  'circ': {
    code: 'circ',
    codeUC: 'CIRC',
    name: 'circle',
    printSymbol: 'circ',
    property: 'plane angle',
    isMetric: false,
    class: 'misc',
    value: {
      unit: '[pi].rad',
      unitUC: '[PI].RAD',
      value: 2
    }
  },
  'sph': {
    code: 'sph',
    codeUC: 'SPH',
    name: 'spere',
    printSymbol: 'sph',
    property: 'solid angle',
    isMetric: false,
    class: 'misc',
    value: {
      unit: '[pi].sr',
      unitUC: '[PI].SR',
      value: 4
    }
  },
  '[car_m]': {
    code: '[car_m]',
    codeUC: '[CAR_M]',
    name: 'metric carat',
    printSymbol: '[object Object]',
    property: 'mass',
    isMetric: false,
    class: 'misc',
    value: {
      unit: 'g',
      unitUC: 'G',
      value: 0.2
    }
  },
  '[car_Au]': {
    code: '[car_Au]',
    codeUC: '[CAR_AU]',
    name: 'carat of gold alloys',
    printSymbol: '[object Object]',
    property: 'mass fraction',
    isMetric: false,
    class: 'misc',
    value: {
      unit: '/24',
      unitUC: '/24',
      value: 1
    }
  },
  '[smoot]': {
    code: '[smoot]',
    codeUC: '[SMOOT]',
    name: 'Smoot',
    property: 'length',
    isMetric: false,
    class: 'misc',
    value: {
      unit: '[in_i]',
      unitUC: '[IN_I]',
      value: 67
    }
  },
  'bit': {
    code: 'bit',
    codeUC: 'BIT',
    name: 'bit',
    printSymbol: 'bit',
    property: 'amount of information',
    isMetric: true,
    class: 'infotech',
    value: {
      unit: '1',
      unitUC: '1',
      value: 1
    }
  },
  'By': {
    code: 'By',
    codeUC: 'BY',
    name: 'byte',
    printSymbol: 'B',
    property: 'amount of information',
    isMetric: true,
    class: 'infotech',
    value: {
      unit: 'bit',
      unitUC: 'bit',
      value: 8
    }
  },
  'Bd': {
    code: 'Bd',
    codeUC: 'BD',
    name: 'baud',
    printSymbol: 'Bd',
    property: 'signal transmission rate',
    isMetric: true,
    class: 'infotech',
    value: {
      unit: '/s',
      unitUC: '/s',
      value: 1
    }
  },
} as const;

export const UCUM_SPECIAL_UNITS = {
  'Cel': {
    code: 'Cel',
    codeUC: 'CEL',
    name: 'degree Celsius',
    printSymbol: '&#176;C',
    property: 'temperature',
    isMetric: true,
    isSpecial: true,
    class: 'si',
    value: {
      unit: 'cel(1 K)',
      unitUC: 'CEL(1 K)',
      value: 1
    }
  },
  '[degF]': {
    code: '[degF]',
    codeUC: '[DEGF]',
    name: 'degree Fahrenheit',
    printSymbol: '&#176;F',
    property: 'temperature',
    isMetric: false,
    isSpecial: true,
    class: 'heat',
    value: {
      unit: 'degf(5 K/9)',
      unitUC: 'DEGF(5 K/9)',
      value: 1
    }
  },
  '[degRe]': {
    code: '[degRe]',
    codeUC: '[degRe]',
    name: 'degree R&#233;aumur',
    printSymbol: '&#176;R&#233;',
    property: 'temperature',
    isMetric: false,
    isSpecial: true,
    class: 'heat',
    value: {
      unit: 'degre(5 K/4)',
      unitUC: 'DEGRE(5 K/4)',
      value: 1
    }
  },
  '[p\'diop]': {
    code: '[p\'diop]',
    codeUC: '[P\'DIOP]',
    name: 'prism diopter',
    printSymbol: 'PD',
    property: 'refraction of a prism',
    isMetric: false,
    isSpecial: true,
    class: 'clinical',
    value: {
      unit: '100tan(1 rad)',
      unitUC: '100TAN(1 RAD)',
      value: 1
    }
  },
  '%[slope]': {
    code: '%[slope]',
    codeUC: '%[SLOPE]',
    name: 'percent of slope',
    printSymbol: '%',
    property: 'slope',
    isMetric: false,
    isSpecial: true,
    class: 'clinical',
    value: {
      unit: '100tan(1 rad)',
      unitUC: '100TAN(1 RAD)',
      value: 1
    }
  },
  '[hp\'_X]': {
    code: '[hp\'_X]',
    codeUC: '[HP\'_X]',
    name: 'homeopathic potency of decimal series (retired)',
    printSymbol: 'X',
    property: 'homeopathic potency (retired)',
    isMetric: false,
    isSpecial: true,
    class: 'clinical',
    value: {
      unit: 'hpX(1 1)',
      unitUC: 'HPX(1 1)',
      value: 1
    }
  },
  '[hp\'_C]': {
    code: '[hp\'_C]',
    codeUC: '[HP\'_C]',
    name: 'homeopathic potency of centesimal series (retired)',
    printSymbol: 'C',
    property: 'homeopathic potency (retired)',
    isMetric: false,
    isSpecial: true,
    class: 'clinical',
    value: {
      unit: 'hpC(1 1)',
      unitUC: 'HPC(1 1)',
      value: 1
    }
  },
  '[hp\'_M]': {
    code: '[hp\'_M]',
    codeUC: '[HP\'_M]',
    name: 'homeopathic potency of millesimal series (retired)',
    printSymbol: 'M',
    property: 'homeopathic potency (retired)',
    isMetric: false,
    isSpecial: true,
    class: 'clinical',
    value: {
      unit: 'hpM(1 1)',
      unitUC: 'HPM(1 1)',
      value: 1
    }
  },
  '[hp\'_Q]': {
    code: '[hp\'_Q]',
    codeUC: '[HP\'_Q]',
    name: 'homeopathic potency of quintamillesimal series (retired)',
    printSymbol: 'Q',
    property: 'homeopathic potency (retired)',
    isMetric: false,
    isSpecial: true,
    class: 'clinical',
    value: {
      unit: 'hpQ(1 1)',
      unitUC: 'HPQ(1 1)',
      value: 1
    }
  },
  '[pH]': {
    code: '[pH]',
    codeUC: '[PH]',
    name: 'pH',
    printSymbol: 'pH',
    property: 'acidity',
    isMetric: false,
    isSpecial: true,
    class: 'chemical',
    value: {
      unit: 'pH(1 mol/l)',
      unitUC: 'PH(1 MOL/L)',
      value: 1
    }
  },
  'Np': {
    code: 'Np',
    codeUC: 'NEP',
    name: 'neper',
    printSymbol: 'Np',
    property: 'level',
    isMetric: true,
    isSpecial: true,
    class: 'levels',
    value: {
      unit: 'ln(1 1)',
      unitUC: 'LN(1 1)',
      value: 1
    }
  },
  'B': {
    code: 'B',
    codeUC: 'B',
    name: 'bel',
    printSymbol: 'B',
    property: 'level',
    isMetric: true,
    isSpecial: true,
    class: 'levels',
    value: {
      unit: 'lg(1 1)',
      unitUC: 'LG(1 1)',
      value: 1
    }
  },
  'B[SPL]': {
    code: 'B[SPL]',
    codeUC: 'B[SPL]',
    name: 'bel sound pressure',
    printSymbol: 'B(SPL)',
    property: 'pressure level',
    isMetric: true,
    isSpecial: true,
    class: 'levels',
    value: {
      unit: '2lg(2 10*-5.Pa)',
      unitUC: '2LG(2 10*-5.PAL)',
      value: 1
    }
  },
  'B[V]': {
    code: 'B[V]',
    codeUC: 'B[V]',
    name: 'bel volt',
    printSymbol: 'B(V)',
    property: 'electric potential level',
    isMetric: true,
    isSpecial: true,
    class: 'levels',
    value: {
      unit: '2lg(1 V)',
      unitUC: '2LG(1 V)',
      value: 1
    }
  },
  'B[mV]': {
    code: 'B[mV]',
    codeUC: 'B[MV]',
    name: 'bel millivolt',
    printSymbol: 'B(mV)',
    property: 'electric potential level',
    isMetric: true,
    isSpecial: true,
    class: 'levels',
    value: {
      unit: '2lg(1 mV)',
      unitUC: '2LG(1 MV)',
      value: 1
    }
  },
  'B[uV]': {
    code: 'B[uV]',
    codeUC: 'B[UV]',
    name: 'bel microvolt',
    printSymbol: 'B(&#956;V)',
    property: 'electric potential level',
    isMetric: true,
    isSpecial: true,
    class: 'levels',
    value: {
      unit: '2lg(1 uV)',
      unitUC: '2LG(1 UV)',
      value: 1
    }
  },
  'B[10.nV]': {
    code: 'B[10.nV]',
    codeUC: 'B[10.NV]',
    name: 'bel 10 nanovolt',
    printSymbol: 'B(10 nV)',
    property: 'electric potential level',
    isMetric: true,
    isSpecial: true,
    class: 'levels',
    value: {
      unit: '2lg(10 nV)',
      unitUC: '2LG(10 NV)',
      value: 1
    }
  },
  'B[W]': {
    code: 'B[W]',
    codeUC: 'B[W]',
    name: 'bel watt',
    printSymbol: 'B(W)',
    property: 'power level',
    isMetric: true,
    isSpecial: true,
    class: 'levels',
    value: {
      unit: 'lg(1 W)',
      unitUC: 'LG(1 W)',
      value: 1
    }
  },
  'B[kW]': {
    code: 'B[kW]',
    codeUC: 'B[KW]',
    name: 'bel kilowatt',
    printSymbol: 'B(kW)',
    property: 'power level',
    isMetric: true,
    isSpecial: true,
    class: 'levels',
    value: {
      unit: 'lg(1 kW)',
      unitUC: 'LG(1 KW)',
      value: 1
    }
  },
  '[m/s2/Hz^(1/2)]': {
    code: '[m/s2/Hz^(1/2)]',
    codeUC: '[M/S2/HZ^(1/2)]',
    name: 'meter per square seconds per square root of hertz',
    property: 'amplitude spectral density',
    isMetric: false,
    isSpecial: true,
    class: 'misc',
    value: {
      unit: 'sqrt(1 m2/s4/Hz)',
      unitUC: 'SQRT(1 M2/S4/HZ)',
      value: 1
    }
  },
  'bit_s': {
    code: 'bit_s',
    codeUC: 'BIT_S',
    name: 'bit',
    printSymbol: '[object Object]',
    property: 'amount of information',
    isMetric: false,
    isSpecial: true,
    class: 'infotech',
    value: {
      unit: 'ld(1 1)',
      unitUC: 'ld(1 1)',
      value: 1
    }
  },
} as const;

// Dimension vectors: [length, mass, time, current, temperature, substance, luminosity]
export const DIMENSION_MAP: Record<string, number[]> = {
  // Base units
  'm': [1, 0, 0, 0, 0, 0, 0],  // meter
  'g': [0, 1, 0, 0, 0, 0, 0],  // gram
  's': [0, 0, 1, 0, 0, 0, 0],  // second
  'A': [0, 0, 0, 1, 0, 0, 0],  // ampere
  'K': [0, 0, 0, 0, 1, 0, 0],  // kelvin
  'mol': [0, 0, 0, 0, 0, 1, 0],  // mole
  'cd': [0, 0, 0, 0, 0, 0, 1],  // candela
};