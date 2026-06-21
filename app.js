const odTable = {
  0.5: 21.3,
  0.75: 26.7,
  1: 33.4,
  1.5: 48.3,
  2: 60.3,
  3: 88.9,
  4: 114.3,
  6: 168.3,
  8: 219.1,
  10: 273.1,
  12: 323.9,
  14: 355.6,
  16: 406.4,
  18: 457.0,
  20: 508.0,
  22: 559.0,
  24: 610.0,
  26: 660.4,
  28: 711.2,
  30: 762.0,
  32: 812.8,
  34: 863.6,
  36: 914.4,
  38: 965.2,
  40: 1016.0,
  42: 1066.8,
  44: 1117.6,
  46: 1168.4,
  48: 1219.2,
};

const rawSteelByYear = {
  2021: 64.75,
  2022: 70.9,
  2023: 57.4,
  2024: 52.2,
  2025: 55.05,
  2026: 56.5,
};

const coatingFactors = {
  Yes: { median: 2.3, p90: 3.8, source: "Coated pipe factor" },
  No: { median: 1.8, p90: 2.7, source: "Non-coated pipe factor" },
};

const elements = {
  year: document.querySelector("#year"),
  size: document.querySelector("#size"),
  thickness: document.querySelector("#thickness"),
  length: document.querySelector("#length"),
  spec: document.querySelector("#spec"),
  coating: document.querySelector("#coating"),
  rawOverride: document.querySelector("#raw-override"),
  factorOverride: document.querySelector("#factor-override"),
  addLine: document.querySelector("#add-line-button"),
  themeToggle: document.querySelector("#theme-toggle"),
  print: document.querySelector("#print-button"),
  exportCsv: document.querySelector("#export-csv-button"),
  reset: document.querySelector("#reset-button"),
  successMessage: document.querySelector("#success-message"),
  reportGenerated: document.querySelector("#report-generated"),
  overrideReviewCard: document.querySelector("#override-review-card"),
  overrideReviewList: document.querySelector("#override-review-list"),
  factorSource: document.querySelector("#factor-source"),
  warning: document.querySelector("#warning"),
  odMm: document.querySelector("#od-mm"),
  weightKgm: document.querySelector("#weight-kgm"),
  totalWeight: document.querySelector("#total-weight"),
  rawSteel: document.querySelector("#raw-steel"),
  medianFactor: document.querySelector("#median-factor"),
  medianRsKg: document.querySelector("#median-rs-kg"),
  medianRsM: document.querySelector("#median-rs-m"),
  medianTotal: document.querySelector("#median-total"),
  p90Factor: document.querySelector("#p90-factor"),
  p90RsKg: document.querySelector("#p90-rs-kg"),
  p90RsM: document.querySelector("#p90-rs-m"),
  p90Total: document.querySelector("#p90-total"),
  lineItemsBody: document.querySelector("#line-items-body"),
  lineCount: document.querySelector("#line-count"),
  summaryWeight: document.querySelector("#summary-weight"),
  summaryMedian: document.querySelector("#summary-median"),
  summaryP90: document.querySelector("#summary-p90"),
};

const lineItems = [];
let successTimer;

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  elements.themeToggle.setAttribute(
    "aria-label",
    theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
  );
  document.querySelector("#theme-toggle-label").textContent =
    theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
}

function toggleTheme() {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  localStorage.setItem("csPipeTheme", nextTheme);
  applyTheme(nextTheme);
}

function sizeGroup(size) {
  if (size <= 6) return "0.5-6 IN";
  if (size >= 8 && size <= 24) return "8-24 IN";
  if (size >= 26 && size <= 48) return "26-48 IN";
  return "Other";
}

function formatNumber(value, decimals = 2) {
  if (!Number.isFinite(value)) return "-";
  return value.toLocaleString("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function formatCurrency(value, decimals = 0) {
  if (!Number.isFinite(value)) return "-";
  return `Rs ${value.toLocaleString("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}`;
}

function formatPlainCurrency(value, decimals = 2) {
  if (!Number.isFinite(value)) return "";
  return value.toFixed(decimals);
}

function getFactor(coating) {
  return coatingFactors[coating] || coatingFactors.No;
}

function getCurrentEstimate() {
  const year = Number(elements.year.value);
  const size = Number(elements.size.value);
  const thickness = Number(elements.thickness.value);
  const length = Number(elements.length.value);
  const od = odTable[size];
  const group = sizeGroup(size);
  const rawOverride = Number(elements.rawOverride.value);
  const factorOverride = Number(elements.factorOverride.value);
  const rawOverrideApplied = rawOverride > 0;
  const factorOverrideApplied = factorOverride > 0;
  const rawSteel = rawOverride > 0 ? rawOverride : rawSteelByYear[year];
  const baseFactors = getFactor(elements.coating.value);
  const p90Multiplier = baseFactors.p90 / baseFactors.median;
  const factors =
    factorOverrideApplied
      ? {
          ...baseFactors,
          median: factorOverride,
          p90: factorOverride * p90Multiplier,
          source: "Custom estimate factor",
        }
      : baseFactors;

  if (!od) {
    return { error: "Selected size is not available in the OD table." };
  }

  if (thickness <= 0 || length < 0) {
    return { error: "Thickness must be positive and length cannot be negative." };
  }

  if (thickness >= od / 2) {
    return {
      error:
        "Wall thickness is physically impossible because it is greater than or equal to pipe radius.",
    };
  }

  const weightKgm = 0.0246615 * (od - thickness) * thickness;
  const totalWeight = weightKgm * length;
  const medianRsKg = rawSteel * factors.median;
  const p90RsKg = rawSteel * factors.p90;
  const medianRsM = medianRsKg * weightKgm;
  const p90RsM = p90RsKg * weightKgm;
  const medianTotal = medianRsM * length;
  const p90Total = p90RsM * length;

  return {
    id: globalThis.crypto?.randomUUID
      ? globalThis.crypto.randomUUID()
      : String(Date.now() + Math.random()),
    year,
    size,
    thickness,
    length,
    spec: elements.spec.value,
    coating: elements.coating.value,
    od,
    group,
    rawSteel,
    factors,
    rawSteelBasis: rawOverrideApplied
      ? "User-entered Raw Steel Rs/kg Override"
      : `Default raw steel basis for ${year}`,
    factorBasis: factorOverrideApplied
      ? `User-entered Estimate Factor Override; P90 recalculated using default multiplier ${formatNumber(
          p90Multiplier,
          3
        )}`
      : `Default ${elements.coating.value === "Yes" ? "coated" : "non-coated"} pipe factor`,
    weightKgm,
    totalWeight,
    medianRsKg,
    p90RsKg,
    medianRsM,
    p90RsM,
    medianTotal,
    p90Total,
  };
}

function renderCurrentEstimate(estimate) {
  elements.factorSource.textContent = `${estimate.factors.source} / ${estimate.group}`;
  elements.odMm.textContent = `${formatNumber(estimate.od, 1)} mm`;
  elements.weightKgm.textContent = formatNumber(estimate.weightKgm, 2);
  elements.totalWeight.textContent = formatNumber(estimate.totalWeight, 2);
  elements.rawSteel.textContent = formatCurrency(estimate.rawSteel, 2);
  elements.medianFactor.textContent = formatNumber(estimate.factors.median, 2);
  elements.medianRsKg.textContent = formatCurrency(estimate.medianRsKg, 2);
  elements.medianRsM.textContent = formatCurrency(estimate.medianRsM, 2);
  elements.medianTotal.textContent = formatCurrency(estimate.medianTotal, 0);
  elements.p90Factor.textContent = formatNumber(estimate.factors.p90, 2);
  elements.p90RsKg.textContent = formatCurrency(estimate.p90RsKg, 2);
  elements.p90RsM.textContent = formatCurrency(estimate.p90RsM, 2);
  elements.p90Total.textContent = formatCurrency(estimate.p90Total, 0);
}

function calculate() {
  const estimate = getCurrentEstimate();
  elements.warning.textContent = "";
  updateOverrideReview();

  if (estimate.error) {
    elements.warning.textContent = estimate.error;
    return null;
  }

  renderCurrentEstimate(estimate);
  return estimate;
}

function renderLineItems() {
  elements.lineCount.textContent = `${lineItems.length} ${lineItems.length === 1 ? "line" : "lines"}`;
  updateOverrideReview();

  if (lineItems.length === 0) {
    elements.lineItemsBody.innerHTML = `
      <tr class="empty-row">
        <td colspan="10">No pipe lines added yet.</td>
      </tr>
    `;
    elements.summaryWeight.textContent = "-";
    elements.summaryMedian.textContent = "-";
    elements.summaryP90.textContent = "-";
    return;
  }

  elements.lineItemsBody.innerHTML = lineItems
    .map(
      (item) => `
        <tr>
          <td>${item.size} IN</td>
          <td>${formatNumber(item.thickness, 2)}</td>
          <td>${formatNumber(item.length, 2)}</td>
          <td>${item.coating}</td>
          <td>${formatNumber(item.factors.median, 2)} / ${formatNumber(item.factors.p90, 2)}</td>
          <td>${formatNumber(item.weightKgm, 2)}</td>
          <td>${formatNumber(item.totalWeight, 2)}</td>
          <td>${formatCurrency(item.medianTotal, 0)}</td>
          <td>${formatCurrency(item.p90Total, 0)}</td>
          <td>
            <button class="remove-line" type="button" data-id="${item.id}">Remove</button>
          </td>
        </tr>
      `
    )
    .join("");

  const summary = getSummary(lineItems);

  elements.summaryWeight.textContent = `${formatNumber(summary.weight, 2)} kg`;
  elements.summaryMedian.textContent = formatCurrency(summary.median, 0);
  elements.summaryP90.textContent = formatCurrency(summary.p90, 0);
}

function getSummary(items) {
  return items.reduce(
    (total, item) => ({
      weight: total.weight + item.totalWeight,
      median: total.median + item.medianTotal,
      p90: total.p90 + item.p90Total,
    }),
    { weight: 0, median: 0, p90: 0 }
  );
}

function getReportItems() {
  const currentEstimate = getCurrentEstimate();
  return lineItems.length > 0 ? lineItems : currentEstimate.error ? [] : [currentEstimate];
}

function addCurrentLine() {
  const estimate = calculate();
  if (!estimate) return;

  lineItems.push(estimate);
  renderLineItems();
  updateReportGenerated();
  showSuccessMessage(`${estimate.size} IN pipe line added to multi size estimate.`);
}

function removeLine(id) {
  const index = lineItems.findIndex((item) => item.id === id);
  if (index >= 0) lineItems.splice(index, 1);
  renderLineItems();
  if (lineItems.length === 0) {
    clearReportGenerated();
  } else {
    updateReportGenerated();
  }
}

function showSuccessMessage(message) {
  window.clearTimeout(successTimer);
  elements.successMessage.textContent = message;
  successTimer = window.setTimeout(() => {
    elements.successMessage.textContent = "";
  }, 3000);
}

function clearSuccessMessage() {
  window.clearTimeout(successTimer);
  elements.successMessage.textContent = "";
}

function updateReportGenerated() {
  const generatedAt = new Date().toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
  elements.reportGenerated.textContent = `Report generated: ${generatedAt}`;
}

function clearReportGenerated() {
  elements.reportGenerated.textContent = "";
}

function highlightOverride(value) {
  return `<span class="override-value">${value}</span>`;
}

function getOverrideNotes(items = getReportItems(), useHtml = false) {
  const notes = [];

  items.forEach((item, index) => {
    const defaultFactors = getFactor(item.coating);
    const hasRawOverride = item.rawSteelBasis.includes("Override");
    const hasFactorOverride = item.factorBasis.includes("Override");
    const rawSteelValue = formatNumber(item.rawSteel, 2);
    const normalFactorValue = formatNumber(item.factors.median, 2);
    const p90Multiplier = defaultFactors.p90 / defaultFactors.median;

    if (!hasRawOverride && !hasFactorOverride) return;

    notes.push(
      `Line ${index + 1}: ${item.size} IN; ${
        hasRawOverride
          ? `raw steel override Rs ${useHtml ? highlightOverride(rawSteelValue) : rawSteelValue} per kg; `
          : ""
      }${
        hasFactorOverride
          ? `normal factor override ${useHtml ? highlightOverride(normalFactorValue) : normalFactorValue}; P90 recalculated to ${
              useHtml ? highlightOverride(formatNumber(item.factors.p90, 2)) : formatNumber(item.factors.p90, 2)
            } using default multiplier ${formatNumber(p90Multiplier, 3)}; `
          : ""
      }default factor set ${formatNumber(defaultFactors.median, 2)} / ${formatNumber(defaultFactors.p90, 2)}.`
    );
  });

  return notes;
}

function updateOverrideReview() {
  const notes = getOverrideNotes(getReportItems(), true);
  elements.overrideReviewCard.hidden = notes.length === 0;
  elements.overrideReviewList.innerHTML = notes
    .map((note) => `<li>${note}</li>`)
    .join("");
}

function csvCell(value) {
  const text = String(value ?? "");
  return `"${text.replace(/"/g, '""')}"`;
}

function buildCsvRows() {
  const currentEstimate = calculate();
  const items = lineItems.length > 0 ? lineItems : currentEstimate && !currentEstimate.error ? [currentEstimate] : [];
  const summary = getSummary(items);
  const overrideNotes = getOverrideNotes(items);
  const rows = [];

  rows.push(["CS Pipe Price Predictor - Audit Report"]);
  rows.push([elements.reportGenerated.textContent]);
  rows.push([]);
  rows.push(["Line Item Calculation"]);
  rows.push([
    "Year",
    "Size IN",
    "OD mm",
    "Thickness mm",
    "Length m",
    "Material Spec",
    "Coating",
    "Raw Steel Rs/kg",
    "Normal Factor",
    "P90 Factor",
    "Kg/m",
    "Total kg",
    "Normal Rs/kg",
    "P90 Rs/kg",
    "Normal Total Rs",
    "P90 Total Rs",
  ]);

  items.forEach((item) => {
    rows.push([
      item.year,
      item.size,
      formatNumber(item.od, 1),
      formatNumber(item.thickness, 2),
      formatNumber(item.length, 2),
      item.spec,
      item.coating,
      formatPlainCurrency(item.rawSteel, 2),
      formatPlainCurrency(item.factors.median, 2),
      formatPlainCurrency(item.factors.p90, 2),
      formatPlainCurrency(item.weightKgm, 2),
      formatPlainCurrency(item.totalWeight, 2),
      formatPlainCurrency(item.medianRsKg, 2),
      formatPlainCurrency(item.p90RsKg, 2),
      formatPlainCurrency(item.medianTotal, 0),
      formatPlainCurrency(item.p90Total, 0),
    ]);
  });

  rows.push([]);
  rows.push(["Summary"]);
  rows.push(["Total Weight kg", formatPlainCurrency(summary.weight, 2)]);
  rows.push(["Normal Estimate Rs", formatPlainCurrency(summary.median, 0)]);
  rows.push(["P90 Estimate Rs", formatPlainCurrency(summary.p90, 0)]);
  rows.push([]);
  rows.push(["Raw Steel Basis"]);
  rows.push(["Line", "Year", "Raw Steel Rs/kg", "Basis"]);
  items.forEach((item, index) => {
    rows.push([
      index + 1,
      item.year,
      formatPlainCurrency(item.rawSteel, 2),
      item.rawSteelBasis,
    ]);
  });
  if (overrideNotes.length > 0) {
    rows.push([]);
    rows.push(["Reviewer Override Check"]);
    overrideNotes.forEach((note) => rows.push([note]));
  }
  rows.push([]);
  rows.push(["Calculation Methodology"]);
  rows.push(["Pipe mass formula", "W = 0.0246615 x (OD - t) x t"]);
  rows.push(["W", "Pipe mass in kg/m"]);
  rows.push(["OD", "Actual outside diameter in mm from the built-in OD table"]);
  rows.push(["t", "Wall thickness in mm entered by the user"]);
  rows.push(["Total weight", "W x length in meter"]);
  rows.push(["Finished Rs/kg", "Raw steel Rs/kg x estimate factor"]);
  rows.push(["Rs/m", "Finished Rs/kg x pipe kg/m"]);
  rows.push(["Total Rs", "Rs/m x pipe length"]);
  rows.push([]);
  rows.push(["Factor Method"]);
  rows.push(["Coating Yes", "Normal factor 2.30, P90 factor 3.80"]);
  rows.push(["Coating No", "Normal factor 1.80, P90 factor 2.70"]);
  rows.push([
    "Estimate Factor Override",
    "Replaces normal factor; P90 is recalculated using the default P90-to-normal factor ratio",
  ]);
  rows.push([]);
  rows.push(["Coating Definition"]);
  rows.push(["Internal coating", "Epoxy lined"]);
  rows.push(["External coating", "PE coated, meaning polyethylene coated"]);
  rows.push(["Coating Yes", "Use for internal coating, external coating, or both"]);
  rows.push([]);
  rows.push(["Disclaimer"]);
  rows.push([
    "This is an indicative material supply estimate only. Validate final pricing with supplier quotation, taxes, freight, testing, coating scope, delivery terms, and commercial conditions.",
  ]);

  return rows;
}

function exportCsvReport() {
  updateReportGenerated();
  const csv = buildCsvRows().map((row) => row.map(csvCell).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const dateStamp = new Date().toISOString().slice(0, 10);
  link.href = url;
  link.download = `cs-pipe-price-audit-report-${dateStamp}.csv`;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function printReport() {
  updateReportGenerated();
  window.print();
}

function populateSizeOptions() {
  Object.keys(odTable)
    .map(Number)
    .sort((a, b) => a - b)
    .forEach((size) => {
      const option = document.createElement("option");
      option.value = size;
      option.textContent = `${size} IN`;
      if (size === 6) option.selected = true;
      elements.size.append(option);
    });
}

function resetForm() {
  elements.year.value = "2026";
  elements.size.value = "6";
  elements.thickness.value = "5.4";
  elements.length.value = "100";
  elements.spec.value = "ASTM A106";
  elements.coating.value = "No";
  elements.rawOverride.value = "";
  elements.factorOverride.value = "";
  clearSuccessMessage();
  clearReportGenerated();
  lineItems.splice(0, lineItems.length);
  renderLineItems();
  calculate();
}

populateSizeOptions();
document.querySelectorAll("input, select").forEach((control) => {
  control.addEventListener("input", () => {
    clearSuccessMessage();
    calculate();
  });
  control.addEventListener("change", () => {
    clearSuccessMessage();
    calculate();
  });
});
elements.addLine.addEventListener("click", addCurrentLine);
elements.themeToggle.addEventListener("click", toggleTheme);
elements.print.addEventListener("click", printReport);
elements.exportCsv.addEventListener("click", exportCsvReport);
elements.lineItemsBody.addEventListener("click", (event) => {
  if (event.target.matches(".remove-line")) {
    removeLine(event.target.dataset.id);
  }
});
elements.reset.addEventListener("click", resetForm);
applyTheme(localStorage.getItem("csPipeTheme") || "light");
resetForm();
