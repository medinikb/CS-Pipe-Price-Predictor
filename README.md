# CS Pipe Price Predictor

This is the first public review MVP for a carbon steel pipe material price calculator.

## What It Does

- Calculates actual pipe OD from nominal pipe size.
- Calculates pipe weight in kg/m.
- Calculates total weight for entered length.
- Uses raw steel price basis by year.
- Applies coating-based finished-pipe conversion factors.
- Supports multiple pipe sizes in one estimate.
- Prints an auditable report or saves it as PDF using the browser print dialog.
- Exports an Excel-openable CSV audit report.
- Shows two outputs:
  - Median estimate for normal pricing.
  - P90 estimate for conservative budgeting.

## How To Use

Open `index.html` in a browser.

Enter:

- Year
- Size in inch
- Thickness in mm
- Length in meter
- Material spec
- Coating
- Optional raw steel Rs/kg override
- Optional estimate factor override

Click `Add Pipe Line` after entering one pipe size. Repeat this for each pipe
size required in the estimate. The table shows each line separately and also
shows combined total weight, normal estimate, and P90 estimate.

Use `Print / Save PDF` to create a report. In the browser print window, choose
`Save as PDF` if a PDF file is required.

Use `Export Excel CSV` to download a CSV file that opens in Excel. The CSV includes
line items, raw steel Rs/kg basis, summary totals, calculation methodology,
factor logic, coating definitions, and disclaimer notes for audit review.

## Factor Logic

| Coating | Median factor | P90 factor |
|---|---:|---:|
| Yes | 2.3 | 3.8 |
| No | 1.8 | 2.7 |

If Estimate Factor Override is entered, it replaces the median estimate factor.
The P90 factor is recalculated using the default P90-to-median factor ratio.

## Current MVP Limitation

This review version uses public-safe coating-based conversion-factor logic.

## Disclaimer

This tool provides indicative material supply cost estimation only. It is not a vendor quotation,
purchase recommendation, or installed piping cost. Final pricing must be validated with supplier
quotation, taxes, freight, coating, testing, and commercial terms.
