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

const dnToNps = {
  15: 0.5,
  20: 0.75,
  25: 1,
  40: 1.5,
  50: 2,
  80: 3,
  100: 4,
  150: 6,
  200: 8,
  250: 10,
  300: 12,
  350: 14,
  400: 16,
  450: 18,
  500: 20,
  550: 22,
  600: 24,
  650: 26,
  700: 28,
  750: 30,
  800: 32,
  850: 34,
  900: 36,
  950: 38,
  1000: 40,
  1050: 42,
  1100: 44,
  1150: 46,
  1200: 48,
};

const scheduleThicknessTable = {
  0.5: { "5S": 1.65, "5": 1.65, "10S": 2.11, "10": 2.11, "40S": 2.77, STD: 2.77, "40": 2.77, "80S": 3.73, XS: 3.73, "80": 3.73, "160": 4.75, XXS: 7.47 },
  0.75: { "5S": 1.65, "5": 1.65, "10S": 2.11, "10": 2.11, "40S": 2.87, STD: 2.87, "40": 2.87, "80S": 3.91, XS: 3.91, "80": 3.91, "160": 5.54, XXS: 7.82 },
  1: { "5S": 1.65, "5": 1.65, "10S": 2.77, "10": 2.77, "40S": 3.38, STD: 3.38, "40": 3.38, "80S": 4.55, XS: 4.55, "80": 4.55, "160": 6.35, XXS: 9.09 },
  1.5: { "5S": 1.65, "5": 1.65, "10S": 2.77, "10": 2.77, "40S": 3.68, STD: 3.68, "40": 3.68, "80S": 5.08, XS: 5.08, "80": 5.08, "160": 7.14, XXS: 10.16 },
  2: { "5S": 1.65, "5": 1.65, "10S": 2.77, "10": 2.77, "40S": 3.91, STD: 3.91, "40": 3.91, "80S": 5.54, XS: 5.54, "80": 5.54, "160": 8.71, XXS: 11.07 },
  3: { "5S": 2.11, "5": 2.11, "10S": 3.05, "10": 3.05, "40S": 5.49, STD: 5.49, "40": 5.49, "80S": 7.62, XS: 7.62, "80": 7.62, "160": 11.13, XXS: 15.24 },
  4: { "5S": 2.11, "5": 2.11, "10S": 3.05, "10": 3.05, "40S": 6.02, STD: 6.02, "40": 6.02, "80S": 8.56, XS: 8.56, "80": 8.56, "120": 11.13, "160": 13.49, XXS: 17.12 },
  6: { "5S": 2.77, "5": 2.77, "10S": 3.4, "10": 3.4, "40S": 7.11, STD: 7.11, "40": 7.11, "80S": 10.97, XS: 10.97, "80": 10.97, "120": 14.27, "160": 18.24, XXS: 21.95 },
  8: { "5S": 2.77, "5": 2.77, "10S": 3.76, "10": 3.76, "20": 6.35, "30": 7.04, "40S": 8.18, STD: 8.18, "40": 8.18, "60": 10.31, "80S": 12.7, XS: 12.7, "80": 12.7, "100": 15.06, "120": 18.24, "140": 20.62, "160": 23.01, XXS: 22.23 },
  10: { "5S": 3.4, "5": 3.4, "10S": 4.19, "10": 4.19, "20": 6.35, "30": 7.8, "40S": 9.27, STD: 9.27, "40": 9.27, "60": 12.7, "80S": 12.7, XS: 12.7, "80": 15.06, "100": 18.24, "120": 21.41, "140": 25.4, "160": 28.58, XXS: 25.4 },
  12: { "5S": 3.96, "5": 4.19, "10S": 4.57, "10": 4.57, "20": 6.35, "30": 8.38, "40S": 9.53, STD: 9.53, "40": 10.31, "60": 14.27, "80S": 12.7, XS: 12.7, "80": 17.45, "100": 21.41, "120": 25.4, "140": 28.58, "160": 33.32, XXS: 25.4 },
  14: { "5S": 3.96, "10S": 4.78, "10": 6.35, "20": 7.92, "30": 9.53, STD: 9.53, "40": 11.13, XS: 12.7, "60": 15.06, "80": 19.05, "100": 23.8, "120": 27.76, "140": 31.75, "160": 35.71 },
  16: { "5S": 4.19, "10S": 4.78, "10": 6.35, "20": 7.92, "30": 9.53, STD: 9.53, "40": 12.7, XS: 12.7, "60": 16.66, "80": 21.41, "100": 26.19, "120": 30.94, "140": 36.53, "160": 40.46 },
  18: { "5S": 4.19, "10S": 4.78, "10": 6.35, "20": 7.92, STD: 9.53, "30": 11.13, XS: 12.7, "40": 14.27, "60": 19.05, "80": 23.8, "100": 29.36, "120": 34.93, "140": 39.67, "160": 45.24 },
  20: { "5S": 4.78, "10S": 5.54, "10": 6.35, STD: 9.53, "20": 9.35, "30": 12.7, XS: 12.7, "40": 15.06, "60": 20.62, "80": 26.19, "100": 32.54, "120": 38.1, "140": 44.45, "160": 49.99 },
  22: { "5S": 4.78, "10S": 5.54, "10": 6.35, STD: 9.53, "20": 9.35, "30": 12.7, XS: 12.7, "40": 15.88, "60": 22.23, "80": 28.57, "100": 34.92, "120": 41.27, "140": 47.62, "160": 53.97 },
  24: { "5S": 5.54, "10S": 6.35, "10": 6.35, STD: 9.53, "20": 9.35, XS: 12.7, "30": 14.27, "40": 17.45, "60": 24.59, "80": 30.94, "100": 38.89, "120": 46.02, "140": 52.37, "160": 59.51 },
  26: { "10": 7.92, STD: 9.53, "20": 12.7, XS: 12.7 },
  28: { "10": 7.92, STD: 9.53, "20": 12.7, XS: 12.7, "30": 15.87 },
  30: { "10": 7.92, STD: 9.53, "20": 12.7, XS: 12.7, "30": 15.87 },
  32: { "10": 7.92, STD: 9.53, "20": 12.7, XS: 12.7, "30": 15.87, "40": 17.45 },
  34: { "10": 7.92, STD: 9.53, "20": 12.7, XS: 12.7, "30": 15.87, "40": 17.45 },
  36: { "10": 7.92, STD: 9.53, "20": 12.7, XS: 12.7, "30": 15.87, "40": 19.05 },
  38: { STD: 9.53, XS: 12.7 },
  40: { STD: 9.53, XS: 12.7 },
  42: { STD: 9.53, XS: 12.7 },
  44: { STD: 9.53, XS: 12.7 },
  46: { STD: 9.53, XS: 12.7 },
  48: { STD: 9.53, XS: 12.7 },
};

const bomColumnAliases = {
  size: ["size", "nps", "pipesize", "nominalsize", "diameter", "dia"],
  thickness: [
    "thickness",
    "thk",
    "thck",
    "schthckrating",
    "schedulethicknessrating",
    "wallthickness",
    "wallthk",
    "thkmm",
    "thicknessmm",
  ],
  length: ["length", "lengthm", "qty", "quantity", "totalm", "meter", "metre", "m"],
  uom: ["uom", "unit", "unitofmeasure", "uommnos"],
  item: ["items", "item", "itemdescription", "description", "shorttext"],
  coating: ["coating", "coated", "coatingscope", "lining", "pe"],
  spec: ["materialspec", "spec", "materials", "materialdescription", "material", "description", "items"],
  rawOverride: ["rawsteelrskg", "rawsteel", "rawsteelrate", "rawsteelprice"],
  factorOverride: ["estimatefactoroverride", "factoroverride", "factor", "estimatefactor"],
};

const elements = {
  year: document.querySelector("#year"),
  size: document.querySelector("#size"),
  thicknessMode: document.querySelector("#thickness-mode"),
  thicknessLabel: document.querySelector("#thickness-label"),
  thickness: document.querySelector("#thickness"),
  scheduleField: document.querySelector("#schedule-field"),
  schedule: document.querySelector("#schedule"),
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
  bomFile: document.querySelector("#bom-file"),
  bomDropZone: document.querySelector("#bom-drop-zone"),
  bomStatus: document.querySelector("#bom-status"),
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
  sortButtons: document.querySelectorAll(".sort-button"),
  summaryWeight: document.querySelector("#summary-weight"),
  summaryMedian: document.querySelector("#summary-median"),
  summaryP90: document.querySelector("#summary-p90"),
};

const lineItems = [];
let successTimer;
let inputError = "";
let sortState = { key: "", direction: "asc" };

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

function normalizeSchedule(value) {
  const raw = String(value || "").trim().toUpperCase();
  if (!raw) return "";

  const normalized = raw
    .replace(/SCHEDULE|SCH\.?|SCHED\.?/g, "")
    .replace(/#/g, "")
    .replace(/STANDARD/g, "STD")
    .replace(/EXTRA\s*STRONG/g, "XS")
    .replace(/DOUBLE\s*EXTRA\s*STRONG/g, "XXS")
    .replace(/[^A-Z0-9]+/g, "");

  if (normalized === "SSTD" || normalized === "STD" || normalized === "ST") return "STD";
  if (normalized === "SXS" || normalized === "XS") return "XS";
  if (normalized === "SXXS" || normalized === "XXS") return "XXS";

  const sizeSchedule = normalized.match(/^S?(\d+S?)$/);
  return sizeSchedule ? sizeSchedule[1] : normalized;
}

function getScheduleThickness(size, schedule) {
  const scheduleKey = normalizeSchedule(schedule);
  return scheduleThicknessTable[Number(size)]?.[scheduleKey] ?? NaN;
}

function parseThicknessInput(value, size) {
  const numericValue = parseBomNumber(value);
  const text = String(value || "");
  const hasScheduleSignal = /[A-Za-z#-]/.test(text);

  if (Number.isFinite(numericValue) && !hasScheduleSignal) {
    return numericValue;
  }

  const scheduleThickness = getScheduleThickness(size, value);
  return Number.isFinite(scheduleThickness) ? scheduleThickness : numericValue;
}

function updateThicknessMode() {
  inputError = "";
  const isScheduleMode = elements.thicknessMode.value === "schedule";
  elements.scheduleField.classList.toggle("hidden", !isScheduleMode);
  elements.scheduleField.classList.toggle("schedule-active", isScheduleMode);
  elements.thicknessLabel.textContent = isScheduleMode
    ? "Calculated Thickness MM"
    : "Thickness MM";
  elements.thickness.readOnly = isScheduleMode;

  if (!isScheduleMode) return;

  const size = Number(elements.size.value);
  const thickness = getScheduleThickness(size, elements.schedule.value);
  if (Number.isFinite(thickness)) {
    elements.thickness.value = thickness.toFixed(2);
    elements.warning.textContent = "";
  } else {
    elements.thickness.value = "";
    inputError = "Select valid schedule from B36.10 or B36.19";
    elements.warning.textContent = inputError;
  }
}

function createId() {
  return globalThis.crypto?.randomUUID
    ? globalThis.crypto.randomUUID()
    : String(Date.now() + Math.random());
}

function buildEstimate(input) {
  const year = Number(input.year) || 2026;
  const size = Number(input.size);
  const thickness = Number(input.thickness);
  const length = Number(input.length);
  const coating = input.coating === "Yes" ? "Yes" : "No";
  const spec = String(input.spec || "Other spec").trim() || "Other spec";
  const od = odTable[size];
  const group = sizeGroup(size);
  const rawOverride = Number(input.rawOverride);
  const factorOverride = Number(input.factorOverride);
  const rawOverrideApplied = rawOverride > 0;
  const factorOverrideApplied = factorOverride > 0;
  const rawSteel = rawOverrideApplied ? rawOverride : rawSteelByYear[year] || rawSteelByYear[2026];
  const baseFactors = getFactor(coating);
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
    return { error: `Pipe size ${input.size || ""} is not available in the OD table.` };
  }

  if (!Number.isFinite(thickness) || !Number.isFinite(length) || thickness <= 0 || length < 0) {
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
    id: createId(),
    year,
    size,
    thickness,
    length,
    spec,
    coating,
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
      : `Default ${coating === "Yes" ? "coated" : "non-coated"} pipe factor`,
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

function getCurrentEstimate() {
  return buildEstimate({
    year: elements.year.value,
    size: elements.size.value,
    thickness: elements.thickness.value,
    length: elements.length.value,
    spec: elements.spec.value,
    coating: elements.coating.value,
    rawOverride: elements.rawOverride.value,
    factorOverride: elements.factorOverride.value,
  });
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
  elements.warning.textContent = "";
  updateOverrideReview();

  if (inputError) {
    elements.warning.textContent = inputError;
    return null;
  }

  const estimate = getCurrentEstimate();

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
  updateSortButtons();

  if (lineItems.length === 0) {
    elements.lineItemsBody.innerHTML = `
      <tr class="empty-row">
        <td colspan="12">No pipe lines added yet.</td>
      </tr>
    `;
    elements.summaryWeight.textContent = "-";
    elements.summaryMedian.textContent = "-";
    elements.summaryP90.textContent = "-";
    return;
  }

  applySort();
  updateSortButtons();

  elements.lineItemsBody.innerHTML = lineItems
    .map(
      (item) => `
        <tr>
          <td>${item.size} IN</td>
          <td>${formatNumber(item.thickness, 2)}</td>
          <td class="text-column">${item.spec}</td>
          <td>${formatNumber(item.length, 2)}</td>
          <td>${item.coating}</td>
          <td>${formatNumber(item.factors.median, 2)} / ${formatNumber(item.factors.p90, 2)}</td>
          <td>${formatNumber(item.weightKgm, 2)}</td>
          <td>${formatNumber(item.totalWeight, 2)}</td>
          <td>${formatCurrency(item.medianRsM, 2)}</td>
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

function getSortValue(item, key) {
  if (key === "medianFactor") return item.factors.median;
  if (key === "spec" || key === "coating") return String(item[key] || "").toLowerCase();
  return Number(item[key]);
}

function applySort() {
  if (!sortState.key) return;

  const direction = sortState.direction === "asc" ? 1 : -1;
  lineItems.sort((a, b) => {
    const valueA = getSortValue(a, sortState.key);
    const valueB = getSortValue(b, sortState.key);

    if (typeof valueA === "string" || typeof valueB === "string") {
      return String(valueA).localeCompare(String(valueB)) * direction;
    }

    return ((Number(valueA) || 0) - (Number(valueB) || 0)) * direction;
  });
}

function updateSortButtons() {
  elements.sortButtons.forEach((button) => {
    const isActive = button.dataset.sort === sortState.key;
    const icon = button.querySelector("span");
    button.setAttribute("aria-sort", isActive ? sortState.direction : "none");
    if (icon) icon.textContent = isActive ? (sortState.direction === "asc" ? "↑" : "↓") : "↕";
  });
}

function handleSort(event) {
  const button = event.target.closest(".sort-button");
  if (!button) return;

  const key = button.dataset.sort;
  if (sortState.key === key) {
    sortState.direction = sortState.direction === "asc" ? "desc" : "asc";
  } else {
    sortState = { key, direction: "asc" };
  }

  applySort();
  renderLineItems();
}

function addCurrentLine() {
  const estimate = calculate();
  if (!estimate) return;

  estimate.source = "manual";
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

function normalizeHeader(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");
}

function findBomColumn(headers, aliases) {
  const normalizedHeaders = headers.map((header) => ({
    original: header,
    normalized: normalizeHeader(header),
  }));

  for (const alias of aliases) {
    const match = normalizedHeaders.find(
      (header) => header.normalized === normalizeHeader(alias)
    );
    if (match) return match.original;
  }

  return undefined;
}

function parseBomNumber(value) {
  if (typeof value === "number") return value;
  const text = String(value || "").replace(/,/g, "");
  const match = text.match(/-?\d+(\.\d+)?/);
  return match ? Number(match[0]) : NaN;
}

function parseBomSize(value) {
  if (typeof value === "number" && odTable[value]) return value;

  const text = String(value || "").toUpperCase();
  const fractionMatch = text.match(/\b(\d+)\s*\/\s*(\d+)\b/);
  if (fractionMatch) {
    const fractionSize = Number(fractionMatch[1]) / Number(fractionMatch[2]);
    return odTable[fractionSize] ? fractionSize : NaN;
  }

  const dnMatch = text.match(/\bDN\s*(\d+(\.\d+)?)/);
  if (dnMatch) {
    const dnValue = Number(dnMatch[1]);
    return dnToNps[dnValue] || Math.round((dnValue / 25) * 2) / 2;
  }

  const npsMatch = text.match(/\b(NPS|NB|IN|INCH|INCHES)?\s*(\d+(\.\d+)?)/);
  const size = npsMatch ? Number(npsMatch[2]) : parseBomNumber(value);
  return odTable[size] ? size : NaN;
}

function parseBomCoating(value, fallback = "No") {
  const text = String(value || "").toLowerCase();
  if (!text.trim()) return fallback === "Yes" ? "Yes" : "No";
  if (/\b(no|bare|uncoated|none|na|n\/a)\b/.test(text)) return "No";
  if (/\b(yes|coated|coat|pe|polyethylene|epoxy|lined|lining|fbe)\b/.test(text)) return "Yes";
  return fallback === "Yes" ? "Yes" : "No";
}

function isMeterUom(value) {
  const text = normalizeHeader(value);
  if (!text) return true;
  return ["m", "meter", "metre", "meters", "metres"].includes(text);
}

function isPipeItem(value) {
  const text = String(value || "").toLowerCase();
  if (!text.trim()) return true;
  const looksLikePipe = /\bpipe\b|pipes|piping/.test(text);
  const looksLikeFitting =
    /\belbow\b|\btee\b|\bflange\b|\bvalve\b|\bgasket\b|\breducer\b|\bcap\b|\bbend\b/.test(text);
  return looksLikePipe && !looksLikeFitting;
}

function worksheetToBomRows(sheet) {
  const matrix = globalThis.XLSX.utils.sheet_to_json(sheet, {
    header: 1,
    defval: "",
    blankrows: false,
  });

  let bestHeaderIndex = -1;
  let bestScore = 0;

  matrix.forEach((row, rowIndex) => {
    const headers = row.map((cell) => String(cell || ""));
    const score = [
      findBomColumn(headers, bomColumnAliases.size),
      findBomColumn(headers, bomColumnAliases.thickness),
      findBomColumn(headers, bomColumnAliases.length),
    ].filter(Boolean).length;

    if (score > bestScore) {
      bestScore = score;
      bestHeaderIndex = rowIndex;
    }
  });

  if (bestHeaderIndex < 0 || bestScore < 3) {
    return [];
  }

  const rawHeaders = matrix[bestHeaderIndex].map((header, index) => {
    const cleanHeader = String(header || "").trim();
    return cleanHeader || `Column ${index + 1}`;
  });

  return matrix
    .slice(bestHeaderIndex + 1)
    .map((row) =>
      rawHeaders.reduce((record, header, index) => {
        record[header] = row[index] ?? "";
        return record;
      }, {})
    )
    .filter((row) =>
      Object.values(row).some((value) => String(value || "").trim() !== "")
    );
}

function setBomStatus(message, type = "") {
  elements.bomStatus.textContent = message;
  elements.bomStatus.className = `bom-status${type ? ` ${type}` : ""}`;
}

function importBomRows(rows, sourceName = "BOM", options = {}) {
  if (!rows.length) {
    setBomStatus("The uploaded BOM does not contain any readable rows.", "error");
    return { imported: 0, skipped: 0 };
  }

  const headers = Object.keys(rows[0]);
  const sizeColumn = findBomColumn(headers, bomColumnAliases.size);
  const thicknessColumn = findBomColumn(headers, bomColumnAliases.thickness);
  const lengthColumn = findBomColumn(headers, bomColumnAliases.length);
  const coatingColumn = findBomColumn(headers, bomColumnAliases.coating);
  const specColumn = findBomColumn(headers, bomColumnAliases.spec);
  const itemColumn = findBomColumn(headers, bomColumnAliases.item);
  const uomColumn = findBomColumn(headers, bomColumnAliases.uom);
  const rawColumn = findBomColumn(headers, bomColumnAliases.rawOverride);
  const factorColumn = findBomColumn(headers, bomColumnAliases.factorOverride);

  const missing = [];
  if (!sizeColumn) missing.push("Size / NPS / DN");
  if (!thicknessColumn) missing.push("Thickness / THK");
  if (!lengthColumn) missing.push("Length / Qty");

  if (missing.length) {
    setBomStatus(`Missing required BOM column(s): ${missing.join(", ")}.`, "error");
    return { imported: 0, skipped: rows.length };
  }

  let imported = 0;
  let skipped = 0;

  if (options.replaceBatchKey) {
    for (let index = lineItems.length - 1; index >= 0; index -= 1) {
      if (
        lineItems[index].source === "bom" &&
        lineItems[index].sourceKey === options.replaceBatchKey
      ) {
        lineItems.splice(index, 1);
      }
    }
  }

  rows.forEach((row) => {
    if (itemColumn && !isPipeItem(row[itemColumn])) {
      skipped += 1;
      return;
    }

    if (uomColumn && !isMeterUom(row[uomColumn])) {
      skipped += 1;
      return;
    }

    const rowSize = parseBomSize(row[sizeColumn]);
    const rowThickness = parseThicknessInput(row[thicknessColumn], rowSize);
    const estimate = buildEstimate({
      year: elements.year.value,
      size: rowSize,
      thickness: rowThickness,
      length: parseBomNumber(row[lengthColumn]),
      spec: specColumn ? row[specColumn] : elements.spec.value,
      coating: coatingColumn
        ? parseBomCoating(row[coatingColumn], elements.coating.value)
        : elements.coating.value,
      rawOverride: rawColumn ? parseBomNumber(row[rawColumn]) : elements.rawOverride.value,
      factorOverride: factorColumn ? parseBomNumber(row[factorColumn]) : "",
    });

    if (estimate.error) {
      skipped += 1;
      return;
    }

    estimate.source = "bom";
    estimate.sourceName = sourceName;
    estimate.sourceKey = options.replaceBatchKey || sourceName;
    lineItems.push(estimate);
    imported += 1;
  });

  renderLineItems();
  if (imported > 0) {
    updateReportGenerated();
    showSuccessMessage(`${imported} BOM pipe ${imported === 1 ? "line" : "lines"} imported.`);
  }

  const mappedColumns = [
    `size: ${sizeColumn}`,
    `thickness: ${thicknessColumn}`,
    `length: ${lengthColumn}`,
    coatingColumn ? `coating: ${coatingColumn}` : "",
  ]
    .filter(Boolean)
    .join("; ");
  const statusType = imported > 0 ? "success" : "error";
  const skippedNote =
    skipped > 0 ? " Non-pipe rows, non-meter UoM rows, or invalid pipe data were skipped." : "";
  setBomStatus(
    `${sourceName}: imported ${imported} pipe line(s), skipped ${skipped}. Mapped columns: ${mappedColumns}.${skippedNote}`,
    statusType
  );

  return { imported, skipped };
}

window.importBomRows = importBomRows;

async function processBomFiles(files) {
  if (!files.length) return;

  if (!globalThis.XLSX) {
    setBomStatus(
      "Excel parser did not load. Check internet connection and reload the page.",
      "error"
    );
    return;
  }

  const results = [];

  for (const file of files) {
    try {
      const data = await file.arrayBuffer();
      const workbook = globalThis.XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = worksheetToBomRows(sheet);
      const sourceKey = `${file.name}:${file.size}:${file.lastModified}`;
      const result = importBomRows(rows, file.name, { replaceBatchKey: sourceKey });
      results.push({ file: file.name, ...result });
    } catch (error) {
      results.push({ file: file.name, imported: 0, skipped: 0, error: error.message });
    }
  }

  const imported = results.reduce((total, result) => total + result.imported, 0);
  const skipped = results.reduce((total, result) => total + result.skipped, 0);
  const failed = results.filter((result) => result.error);
  const fileSummary = results
    .map((result) =>
      result.error
        ? `${result.file}: failed`
        : `${result.file}: ${result.imported} imported, ${result.skipped} skipped`
    )
    .join(" | ");

  if (failed.length) {
    setBomStatus(
      `${files.length} file(s) processed with ${failed.length} error(s). ${fileSummary}`,
      imported > 0 ? "success" : "error"
    );
  } else {
    setBomStatus(
      `${files.length} file(s) processed. Total imported ${imported} pipe line(s), skipped ${skipped}. ${fileSummary}`,
      imported > 0 ? "success" : "error"
    );
  }

  elements.bomFile.value = "";
}

async function handleBomUpload(event) {
  await processBomFiles(Array.from(event.target.files || []));
}

function handleBomDrag(event) {
  event.preventDefault();
  elements.bomDropZone.classList.add("drag-over");
}

function handleBomDragLeave(event) {
  event.preventDefault();
  elements.bomDropZone.classList.remove("drag-over");
}

async function handleBomDrop(event) {
  event.preventDefault();
  elements.bomDropZone.classList.remove("drag-over");
  await processBomFiles(Array.from(event.dataTransfer?.files || []));
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
  elements.thicknessMode.value = "schedule";
  elements.schedule.value = "STD";
  elements.thickness.value = "";
  elements.length.value = "100";
  elements.spec.value = "ASTM A106";
  elements.coating.value = "No";
  elements.rawOverride.value = "";
  elements.factorOverride.value = "";
  elements.bomFile.value = "";
  setBomStatus("No BOM uploaded yet.");
  clearSuccessMessage();
  clearReportGenerated();
  lineItems.splice(0, lineItems.length);
  updateThicknessMode();
  renderLineItems();
  calculate();
}

populateSizeOptions();
document.querySelectorAll("input, select").forEach((control) => {
  control.addEventListener("input", () => {
    clearSuccessMessage();
    updateThicknessMode();
    calculate();
  });
  control.addEventListener("change", () => {
    clearSuccessMessage();
    updateThicknessMode();
    calculate();
  });
});
elements.addLine.addEventListener("click", addCurrentLine);
elements.sortButtons.forEach((button) => button.addEventListener("click", handleSort));
elements.bomFile.addEventListener("change", handleBomUpload);
elements.bomDropZone.addEventListener("dragover", handleBomDrag);
elements.bomDropZone.addEventListener("dragleave", handleBomDragLeave);
elements.bomDropZone.addEventListener("drop", handleBomDrop);
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
