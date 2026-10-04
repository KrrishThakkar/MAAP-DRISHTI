/* ==========================================================================
   LabelGuard — hardcoded demo data
   Everything here stands in for the real edge engine + central repository.
   ========================================================================== */

const OFFICER = {
  name: "R. Mehta",
  id: "LM-OFF-2291",
  station: "Pune Circle Office",
};

const MINISTRY_USER = {
  name: "S. Deshpande",
  id: "DoCA-MIN-014",
  station: "Dept. of Consumer Affairs, Pune Division",
};

const STATS = {
  totalInspections: 1248,
  violationsFlagged: 187,
  complianceRate: "85.0%",
  activeOfficers: 42,
  avgScanTime: "48s",
};

const VIOLATION_CATEGORIES = [
  { label: "MRP font too small", pct: 38 },
  { label: "Net quantity — unit missing", pct: 22 },
  { label: "Mfg/packing date unreadable", pct: 18 },
  { label: "Manufacturer address missing", pct: 14 },
  { label: "Other declarations", pct: 8 },
];

/* status: "verify" | "flag" | "brass"  (compliant / violation / readability) */
const SCANS = [
  { id: "SCAN-10234", product: "Sunrise Refined Sunflower Oil, 1 L", manufacturer: "Sunrise Agro Pvt Ltd", officer: "R. Mehta", date: "28 Sep 2026, 11:42", status: "flag", issues: 2 },
  { id: "SCAN-10233", product: "Tanishq Basmati Rice, 5 kg", manufacturer: "Tanishq Foods Pvt Ltd", officer: "R. Mehta", date: "28 Sep 2026, 10:15", status: "verify", issues: 0 },
  { id: "SCAN-10232", product: "Shudh Toor Dal, 1 kg", manufacturer: "Shudh Grains Co.", officer: "A. Khan", date: "27 Sep 2026, 16:30", status: "brass", issues: 1 },
  { id: "SCAN-10231", product: "FreshGlow Herbal Shampoo, 340 ml", manufacturer: "FreshGlow Cosmetics", officer: "A. Khan", date: "27 Sep 2026, 14:05", status: "verify", issues: 0 },
  { id: "SCAN-10230", product: "Royal Chakki Atta, 10 kg", manufacturer: "Royal Mills Ltd", officer: "R. Mehta", date: "27 Sep 2026, 11:20", status: "flag", issues: 3 },
  { id: "SCAN-10229", product: "Meadow Fresh Toned Milk, 500 ml", manufacturer: "Meadow Dairy Coop", officer: "P. Iyer", date: "26 Sep 2026, 18:47", status: "verify", issues: 0 },
  { id: "SCAN-10228", product: "Sparkle Dish Wash Bar, 700 g", manufacturer: "Sparkle Home Care", officer: "P. Iyer", date: "26 Sep 2026, 15:12", status: "flag", issues: 1 },
  { id: "SCAN-10227", product: "Village Jaggery Powder, 900 g", manufacturer: "Village Agro Foods", officer: "A. Khan", date: "26 Sep 2026, 09:58", status: "verify", issues: 0 },
];

/* Full field-level reports for the three scans the demo lets you open
   end-to-end (compliant / violation / readability-flag cases). */
const REPORTS = {
  "SCAN-10234": {
    product: "Sunrise Refined Sunflower Oil, 1 L",
    manufacturer: "Sunrise Agro Pvt Ltd, MIDC, Nashik - 422010",
    officer: OFFICER,
    location: "Kirana Bazaar, FC Road, Pune",
    scannedAt: "28 Sep 2026, 11:42 IST",
    calibration: "ArUco fallback — no barcode match",
    captureHash: "a43f9c21e7b6d84a1f02…c9d02f",
    reportHash: "7b1e4a8d9c3f55e2a0b1…1055a1",
    status: "flag",
    fields: [
      { name: "MRP", value: "₹189.00", required: "4.0 mm min", measured: "2.6 mm", status: "flag", note: "Numeral height below the Rule 7 minimum for this panel area." },
      { name: "Net Quantity", value: "1 Litre", required: "4.0 mm min", measured: "4.2 mm", status: "verify", note: "" },
      { name: "Mfg / Packing Date", value: "07/2026", required: "Legible", measured: "OCR conf. 0.91", status: "verify", note: "" },
      { name: "Manufacturer Address", value: "Sunrise Agro Pvt Ltd, MIDC, Nashik", required: "Present", measured: "Found — back panel", status: "verify", note: "" },
      { name: "Consumer Care", value: "—", required: "Present", measured: "Not detected", status: "flag", note: "No match on front or back panel." },
      { name: "Country of Origin", value: "India", required: "Present", measured: "Found — front panel", status: "verify", note: "" },
    ],
    summary: [
      "MRP numeral height measures 2.6 mm against a 4 mm minimum required for this package's display-panel area under Rule 7.",
      "Consumer care details could not be located on either the front or back panel.",
    ],
  },

  "SCAN-10233": {
    product: "Tanishq Basmati Rice, 5 kg",
    manufacturer: "Tanishq Foods Pvt Ltd, Karnal, Haryana - 132001",
    officer: OFFICER,
    location: "Kirana Bazaar, FC Road, Pune",
    scannedAt: "28 Sep 2026, 10:15 IST",
    calibration: "DataKart — barcode matched",
    captureHash: "e91ac04fd2b7813c56a0…77f4b2",
    reportHash: "2c5d8e1f9a4b60d37e12…0a93cc",
    status: "verify",
    fields: [
      { name: "MRP", value: "₹540.00", required: "4.0 mm min", measured: "4.8 mm", status: "verify", note: "" },
      { name: "Net Quantity", value: "5 kg", required: "4.0 mm min", measured: "5.1 mm", status: "verify", note: "" },
      { name: "Mfg / Packing Date", value: "06/2026", required: "Legible", measured: "OCR conf. 0.97", status: "verify", note: "" },
      { name: "Manufacturer Address", value: "Tanishq Foods Pvt Ltd, Karnal", required: "Present", measured: "Found — back panel", status: "verify", note: "" },
      { name: "Consumer Care", value: "care@tanishqfoods.in", required: "Present", measured: "Found — back panel", status: "verify", note: "" },
      { name: "Country of Origin", value: "India", required: "Present", measured: "Found — front panel", status: "verify", note: "" },
    ],
    summary: ["All mandatory declarations detected, anchored, and within required font-height thresholds."],
  },

  "SCAN-10232": {
    product: "Shudh Toor Dal, 1 kg",
    manufacturer: "Shudh Grains Co., Latur, Maharashtra",
    officer: { name: "A. Khan", id: "LM-OFF-1187", station: "Pune Circle Office" },
    location: "Annapurna Kirana Stores, Kothrud, Pune",
    scannedAt: "27 Sep 2026, 16:30 IST",
    calibration: "ArUco fallback — no barcode match",
    captureHash: "5f3b7d19ac2e048f91d6…e8c741",
    reportHash: "991c2a7e04bd5f83a2c0…b64d19",
    status: "brass",
    fields: [
      { name: "MRP", value: "₹118.00", required: "4.0 mm min", measured: "4.3 mm", status: "verify", note: "" },
      { name: "Net Quantity", value: "1 kg (unclear)", required: "4.0 mm min", measured: "OCR conf. 0.52", status: "brass", note: "Print smudged near the net-quantity declaration — re-inspection recommended." },
      { name: "Mfg / Packing Date", value: "08/2026", required: "Legible", measured: "OCR conf. 0.88", status: "verify", note: "" },
      { name: "Manufacturer Address", value: "Shudh Grains Co., Latur", required: "Present", measured: "Found — back panel", status: "verify", note: "" },
      { name: "Consumer Care", value: "1800-212-4040", required: "Present", measured: "Found — back panel", status: "verify", note: "" },
      { name: "Country of Origin", value: "India", required: "Present", measured: "Found — front panel", status: "verify", note: "" },
    ],
    summary: ["Net-quantity text falls below the OCR confidence threshold — flagged for manual re-inspection rather than an automatic pass or fail."],
  },
};
