# UCUM: Unified Code for Units of Measure

## What is UCUM?

The Unified Code for Units of Measure (UCUM) is a comprehensive, formal system for representing units of measurement in electronic formats. Created by the Regenstrief Institute, UCUM provides:

1. **Unambiguous Communication**: A standardized way to express any unit of measure used in science, engineering, medicine, and business
2. **Machine-Readable Format**: Units can be parsed, validated, and converted by software
3. **Human-Readable Syntax**: While formal, the notation remains understandable to humans
4. **International Coverage**: Includes both metric (SI) and traditional units from various countries

## Why UCUM Matters

### The Problem It Solves
- **Ambiguity**: "mg" could mean milligram or megagram without context
- **Inconsistency**: Different systems use different abbreviations (mcg vs μg)
- **Interoperability**: Healthcare and scientific systems need to exchange measurements reliably
- **Calculations**: Software needs to validate unit compatibility and perform conversions

### Key Use Cases
- **Healthcare**: Electronic Health Records (EHRs) use UCUM for lab results, medication dosing
- **Scientific Data**: Research data exchange with precise unit specifications
- **Engineering**: CAD/CAM systems, IoT sensors, industrial automation
- **Commerce**: International trade requiring unit conversions

## UCUM Syntax Basics

### Unit Expressions
```
# Simple units
m        # meter
kg       # kilogram
s        # second

# Prefixed units
km       # kilometer (k = kilo = 10³)
mg       # milligram (m = milli = 10⁻³)
us       # microsecond (u = micro = 10⁻⁶)

# Complex expressions
m/s      # meters per second
kg.m/s2  # kilogram meter per second squared (Newton)
mol/L    # moles per liter (concentration)

# Exponents
m2       # square meter
m3       # cubic meter
s-1      # per second (frequency)
m.s-2    # meter per second squared

# Annotations (descriptive text that doesn't affect meaning)
{tablets}        # count of tablets
mg{hemoglobin}   # milligrams of hemoglobin
```

### Special Features
- **Case Sensitive**: "M" (mega) ≠ "m" (milli or meter)
- **Operators**: "." (multiply), "/" (divide)
- **Brackets**: Square brackets for arbitrary units: [in_i] (international inch)
- **Curly Braces**: Annotations that don't affect calculations

## The UCUM XML Files

### ucum-essence.xml Structure

The ucum-essence.xml file is the authoritative source of UCUM unit definitions. It contains:

#### 1. **Prefixes** (Metric multipliers)
```xml
<prefix Code="k" CODE="K">
    <name>kilo</name>
    <printSymbol>k</printSymbol>
    <value value="1e3">1 × 10³</value>
</prefix>
```
- **Code**: Case-sensitive UCUM code
- **CODE**: Case-insensitive version
- **value**: Numerical multiplication factor

#### 2. **Base Units** (Fundamental units)
```xml
<unit Code="m" CODE="M" isMetric="yes" class="si">
    <name>meter</name>
    <printSymbol>m</printSymbol>
    <property>length</property>
    <value value="1">1</value>
</unit>
```
The 7 SI base units:
- meter (m) - length
- gram (g) - mass
- second (s) - time
- ampere (A) - electric current
- kelvin (K) - temperature
- mole (mol) - amount of substance
- candela (cd) - luminous intensity

#### 3. **Derived Units** (Defined from base units)
```xml
<unit Code="N" CODE="N" isMetric="yes" class="si">
    <name>newton</name>
    <printSymbol>N</printSymbol>
    <property>force</property>
    <value Unit="kg.m/s2" UNIT="KG.M/S2" value="1">1</value>
</unit>
```
- **value Unit**: Expression in terms of other units
- Shows how to decompose into base units

#### 4. **Special Units** (Non-linear conversions)
```xml
<unit Code="Cel" CODE="CEL" isMetric="yes" isSpecial="yes" class="si">
    <name>degree Celsius</name>
    <printSymbol>°C</printSymbol>
    <property>temperature</property>
    <value Unit="cel(1 K)" UNIT="CEL(1 K)">
        <function name="Cel" value="1" Unit="K"/>
    </value>
</unit>
```
- **isSpecial="yes"**: Requires special conversion function
- **function**: Named conversion (not just multiplication)
- Examples: Celsius, Fahrenheit, pH, decibel

#### 5. **Non-Metric Units**
```xml
<unit Code="[in_i]" CODE="[IN_I]" isMetric="no" class="intcust">
    <name>inch - international</name>
    <printSymbol>in</printSymbol>
    <property>length</property>
    <value Unit="cm" UNIT="CM" value="2.54">2.54</value>
</unit>
```
- Traditional units (inch, pound, gallon)
- Always defined in terms of metric units
- Square brackets indicate "arbitrary" units

## How the XML Data is Used

### 1. **Unit Validation**
```typescript
// Check if "mg/dL" is valid
- Parse expression into components
- Lookup "mg" → found (milligram)
- Lookup "dL" → found (deciliter)
- Validate syntax → valid division operation
```

### 2. **Unit Conversion**
```typescript
// Convert 100 mg/dL to g/L
- Decompose mg/dL → (10⁻³ g)/(10⁻¹ L)
- Simplify → 10⁻² g/L
- Calculate → 100 × 10⁻² = 1 g/L
```

### 3. **Dimension Analysis**
```typescript
// Check if m/s² and ft/min² are compatible
- m/s² → [length]/[time]²
- ft/min² → [length]/[time]²
- Same dimensions → compatible for conversion
```

### 4. **Display Formatting**
```typescript
// Format for display
- "kg.m/s2" → "kg·m/s²" (with proper symbols)
- "ug" → "μg" (with Greek letters)
- Add tooltips with full names
```

## Implementation Benefits

### From XML Generation
1. **Authoritative Source**: Always up-to-date with UCUM standard
2. **Type Safety**: Generate TypeScript interfaces
3. **Performance**: Pre-compute conversion factors
4. **Validation**: Build-time checking of unit definitions
5. **Documentation**: Auto-generate unit documentation

### Data Structures Created
- **Lookup Tables**: Fast unit code resolution
- **Dimension Vectors**: For compatibility checking
- **Conversion Graphs**: Optimal conversion paths
- **Prefix Maps**: Valid prefix-unit combinations

## Practical Examples

### Healthcare
```
# Lab Results
135 mg/dL        # Blood glucose
4.5 10*9/L       # White blood cell count
98.6 [degF]      # Body temperature

# Medications
500 mg{tab}      # 500mg tablets
2 mL/h           # IV infusion rate
50 ug/kg/d       # Dosage per body weight per day
```

### Engineering
```
# Mechanical
750 kW           # Power output
3600 rpm         # Rotational speed
25 N.m           # Torque

# Electrical
230 V            # Voltage
50 Hz            # Frequency
10 kOhm          # Resistance
```

### Scientific
```
# Chemistry
0.1 mol/L        # Molar concentration
6.022e23 /mol    # Avogadro's number
98 g/mol         # Molecular weight

# Physics
299792458 m/s    # Speed of light
9.81 m/s2        # Gravitational acceleration
1.602e-19 C      # Elementary charge
```

## UCUM vs Other Standards

| Feature | UCUM | SI | Imperial | Custom Systems |
|---------|------|----|---------:|----------------|
| Completeness | ✓ All units | Metric only | Traditional only | Limited |
| Syntax | Formal | Informal | Informal | Varies |
| Machine-readable | ✓ Yes | No | No | Sometimes |
| Extensible | ✓ Yes | No | No | Yes |
| Standardized | ✓ ISO/HL7 | ✓ ISO | No | No |

## Conclusion

UCUM provides a comprehensive, unambiguous system for representing units of measure in electronic systems. The XML files serve as the authoritative source for:
- All valid unit codes and their relationships
- Conversion factors between units
- Special conversion functions
- Metadata for display and validation

This enables reliable unit handling across different systems, industries, and countries, making it essential for healthcare informatics, scientific computing, and industrial applications.