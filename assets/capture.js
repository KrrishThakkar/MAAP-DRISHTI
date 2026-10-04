/* ==========================================================================
   LabelGuard — capture page logic
   File previews are real (FileReader); the scan itself is simulated.
   ========================================================================== */

requireSession();
renderNavbar("capture");

document.getElementById("icon-front").innerHTML = ICONS.camera;
document.getElementById("icon-back").innerHTML = ICONS.camera;

const filled = { front: false, back: false };
let chosenSample = null;

function updateScanBtn() {
  document.getElementById("scanBtn").disabled = !(filled.front && filled.back);
}

function handleFile(side, input) {
  const file = input.files[0];
  if (!file) return;
  chosenSample = null; // a manual upload overrides any sample pick
  const reader = new FileReader();
  reader.onload = (e) => {
    filled[side] = true;
    document.getElementById(`dz-${side}`).classList.add("has-file");
    document.getElementById(`hint-${side}`).textContent = file.name;
    document.getElementById(`preview-${side}`).innerHTML =
      `<div class="dropzone-preview"><img src="${e.target.result}" /></div>`;
    document.getElementById(`icon-${side}`).innerHTML = ICONS.check;
    updateScanBtn();
  };
  reader.readAsDataURL(file);
}

const SAMPLE_LABELS = {
  "SCAN-10233": "Tanishq Basmati Rice, 5 kg",
  "SCAN-10234": "Sunrise Refined Sunflower Oil, 1 L",
  "SCAN-10232": "Shudh Toor Dal, 1 kg",
};

function swatchPreview(label) {
  return `
    <div class="dropzone-preview" style="height:90px; display:flex; align-items:center; justify-content:center;
         background:repeating-linear-gradient(135deg, #eef1f2, #eef1f2 6px, #e4e8ea 6px, #e4e8ea 12px);">
      <span class="mono text-sm" style="background:#fff; padding:3px 8px; border-radius:4px; border:1px solid var(--line);">${label}</span>
    </div>`;
}

function loadSample(scanId) {
  chosenSample = scanId;
  const label = SAMPLE_LABELS[scanId];
  ["front", "back"].forEach((side) => {
    filled[side] = true;
    document.getElementById(`dz-${side}`).classList.add("has-file");
    document.getElementById(`hint-${side}`).textContent = `sample-${side}.jpg`;
    document.getElementById(`preview-${side}`).innerHTML = swatchPreview(label);
    document.getElementById(`icon-${side}`).innerHTML = ICONS.check;
  });
  document.getElementById("barcodeInput").value =
    scanId === "SCAN-10233" ? "8901030875312" : "";
  updateScanBtn();
}

const STAGES = [
  "Sealing evidence — SHA-256 hash + UTC timestamp",
  "Resolving calibration path (barcode / ArUco)",
  "Detecting packaging corners (VLM)",
  "Rectifying image + locking scale",
  "Reading labels — PaddleOCR + VLM, in parallel",
  "Grounding gate — fuzzy-matching extracted values",
  "Applying Rule 7 thresholds",
  "Compiling compliance report",
];

function runScan() {
  // advance stepper
  document.getElementById("step-1").classList.replace("is-active", "is-done");
  document.getElementById("line-1").classList.add("is-done");
  document.getElementById("step-2").classList.add("is-active");

  document.getElementById("capture-panel").style.display = "none";
  const panel = document.getElementById("processing-panel");
  panel.style.display = "block";
  const log = document.getElementById("processingLog");
  log.innerHTML = STAGES.map((s) => `<div class="log-pending" id="stage-${STAGES.indexOf(s)}">${s}</div>`).join("");

  STAGES.forEach((_, i) => {
    setTimeout(() => {
      const el = document.getElementById(`stage-${i}`);
      el.className = "log-active";
      setTimeout(() => { el.className = "log-done"; }, 260);
    }, i * 330);
  });

  const targetId = chosenSample || "SCAN-10234";
  setTimeout(() => {
    window.location.href = `report.html?id=${targetId}`;
  }, STAGES.length * 330 + 500);
}
