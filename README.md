# CS Pipe Price Predictor

Live tool: https://medinikb.github.io/CS-Pipe-Price-Predictor/

CS Pipe Price Predictor is a free public carbon steel pipe price calculator for
material supply cost estimation. It helps users estimate CS pipe supply price
from pipe size, wall thickness, length, raw steel rate, coating factor, pipe
kg/m weight, normal estimate, and P90 budget estimate.

## What The Tool Does

- Calculates actual pipe outside diameter from nominal pipe size.
- Calculates pipe kg per meter using the pipe mass formula.
- Calculates total pipe weight for the entered length.
- Applies raw steel Rs/kg basis by year or user override.
- Applies coating-based finished-pipe conversion factors.
- Supports coated CS pipe price estimate and non-coated CS pipe estimate.
- Shows normal working estimate and P90 budget estimate.
- Supports multiple pipe sizes in one estimate.
- Prints an auditable report or saves it as PDF.
- Exports an Excel-openable CSV audit report.

## Who Can Use It

This pipe cost estimation tool is useful for:

- Refinery piping cost estimation teams
- Oil and gas project cost engineers
- Piping material engineers
- Procurement and contracts teams
- Estimation, planning, and budgeting teams
- Users doing procurement rate validation for CS pipe supply rates

## Problem It Solves

Pipe price comparison is often difficult because suppliers quote by length,
weight, coating condition, or commercial basis. This tool gives a transparent
calculation trail so users can compare pipe supply estimates using a consistent
kg/m and factor-based method.

## Key Use Cases

- Prepare preliminary carbon steel pipe supply estimates.
- Compare coated and non-coated CS pipe price estimate cases.
- Check whether a vendor rate is reasonable against raw steel basis.
- Build a multi-size pipe estimate for project budgeting.
- Create a P90 budget estimate for approval or contingency discussion.
- Use the audit report for internal review and procurement rate validation.

## Calculation Basis

Pipe mass is calculated using:

```text
W = 0.0246615 x (OD - t) x t
```

Where:

- `W` = pipe mass in kg/m
- `OD` = actual outside diameter in mm from the built-in OD table
- `t` = wall thickness in mm

Pricing method:

- `Total weight = W x length in meter`
- `Finished Rs/kg = raw steel Rs/kg x estimate factor`
- `Rs/m = finished Rs/kg x pipe kg/m`
- `Total Rs = Rs/m x pipe length`

Default factor logic:

| Coating | Normal / Median factor | P90 factor |
|---|---:|---:|
| Yes | 2.30 | 3.80 |
| No | 1.80 | 2.70 |

If Estimate Factor Override is entered, it replaces the median estimate factor.
The P90 factor is recalculated using the default P90-to-median factor ratio.

## Reports And Audit Trail

The tool includes:

- Printable report / Save as PDF
- Excel CSV export
- Raw steel basis
- Factor basis
- Override review
- Calculation methodology
- Coating definition
- Disclaimer notes

## Limitations

- This is an indicative material supply estimate only.
- It is not a vendor quotation or purchase recommendation.
- It does not include installed piping cost.
- It does not include taxes, freight, unloading, wastage, fabrication, erection,
  hydrotest, NDT, painting, contractor margin, or commercial escalation unless
  users separately include those in their own assumptions.
- Final pricing must be validated with supplier quotation and project-specific
  commercial terms.

## Disclaimer

This tool provides indicative material supply cost estimation only. Final pricing
should be validated against supplier quotation, taxes, freight, testing, coating
scope, delivery terms, and commercial conditions.
