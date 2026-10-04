/* ==========================================================================
   LabelGuard — report page logic
   Reads ?id=SCAN-XXXXX, renders the matching hardcoded report from data.js.
   ========================================================================== */

requireSession();
renderNavbar("");

const STATUS_META = {
  verify: { label: "Compliant", pillClass: "pill-verify" },
  flag: { label: "Violations found", pillClass: "pill-flag" },
  brass: { label: "Readability flag", pillClass: "pill-brass" },
};

const FIELD_STATUS_META = {
  verify: { label: "Pass", pillClass: "pill-verify" },
  flag: { label: "Fail", pillClass: "pill-flag" },
  brass: { label: "Flagged", pillClass: "pill-brass" },
};

function pillHtml(meta) {
  return `<span class="pill ${meta.pillClass}"><span class="pill-dot"></span>${meta.label}</span>`;
}

function params() {
  return new URLSearchParams(window.location.search);
}

function renderEmpty(root) {
  root.innerHTML = `
    <div class="empty-state panel" style="margin-top:40px;">
      <h2>No report selected</h2>
      <p>Open a scan from the dashboard, or run a new scan to generate a report.</p>
      <a href="dashboard.html" class="btn btn-primary" style="margin-top:10px;">Go to dashboard</a>
    </div>`;
}

function renderReport(id, data) {
  const root = document.getElementById("reportRoot");
  const meta = STATUS_META[data.status];

  const labelBoxes = data.fields.map((f) => `
    <div class="label-field-box ${f.status}">
      <span class="lf-name">${f.name}</span>
      <span>${f.value}</span>
    </div>`).join("");

  const fieldRows = data.fields.map((f) => {
    const fm = FIELD_STATUS_META[f.status];
    return `
      <div class="field-row">
        <div>
          <div class="field-name">${f.name}</div>
          ${f.note ? `<div class="field-note">${f.note}</div>` : ""}
        </div>
        <div class="mono text-sm">${f.value}</div>
        <div class="text-sm text-faint">${f.required}</div>
        <div class="mono text-sm">${f.measured}</div>
        <div>${pillHtml(fm)}</div>
      </div>`;
  }).join("");

  const summaryHtml = data.summary.length
    ? `<div class="panel panel-pad" style="margin-top:18px; border-left:3px solid ${data.status === "verify" ? "var(--verify)" : data.status === "flag" ? "var(--flag)" : "var(--brass)"};">
         <h2>${data.status === "verify" ? "Summary" : "Flagged for enforcement review"}</h2>
         <ul style="margin:8px 0 0 18px; padding:0; color:var(--ink-soft); font-size:14px; line-height:1.7;">
           ${data.summary.map((s) => `<li>${s}</li>`).join("")}
         </ul>
       </div>`
    : "";

  root.innerHTML = `
    <div class="stepper no-print">
      <div class="step is-done"><span class="step-num">✓</span><span class="step-label">Capture</span></div>
      <div class="step-line is-done"></div>
      <div class="step is-done"><span class="step-num">✓</span><span class="step-label">Processing</span></div>
      <div class="step-line is-done"></div>
      <div class="step is-active"><span class="step-num">3</span><span class="step-label">Report</span></div>
    </div>

    <div class="flex-between" style="align-items:flex-start;">
      <div>
        <div class="eyebrow mono">${id}</div>
        <h1>${data.product}</h1>
        <p style="margin-bottom:0;">${data.manufacturer}</p>
      </div>
      ${pillHtml(meta)}
    </div>

    <div class="panel panel-pad" style="margin-top:18px;">
      <div style="display:grid; grid-template-columns:repeat(4,1fr); gap:16px;">
        <div><div class="eyebrow">Officer</div><div class="text-sm">${data.officer.name} · ${data.officer.id}</div></div>
        <div><div class="eyebrow">Location</div><div class="text-sm">${data.location}</div></div>
        <div><div class="eyebrow">Scanned</div><div class="text-sm">${data.scannedAt}</div></div>
        <div><div class="eyebrow">Calibration</div><div class="text-sm">${data.calibration}</div></div>
      </div>
      <hr class="hr" />
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
        <div><div class="eyebrow">Capture hash (raw images)</div><div class="mono text-sm">${data.captureHash}</div></div>
        <div><div class="eyebrow">Report hash (this PDF)</div><div class="mono text-sm">${data.reportHash}</div></div>
      </div>
    </div>

    <div style="display:grid; grid-template-columns:320px 1fr; gap:20px; margin-top:20px; align-items:start;">
      <div class="panel panel-pad">
        <div class="viewfinder viewfinder--${data.status === "verify" ? "verify" : "flag"}" style="padding:20px;">
          <span class="vf-corner vf-tl"></span>
          <span class="vf-corner vf-tr"></span>
          <span class="vf-corner vf-bl"></span>
          <span class="vf-corner vf-br"></span>
          <div class="label-mock">
            <div class="label-mock-title">${data.product.split(",")[0]}</div>
            ${labelBoxes}
          </div>
        </div>
        <div class="label-caption">Annotated evidence (mock) — boxes colored by compliance status</div>
      </div>

      <div class="panel">
        <div class="field-row is-header">
          <div>Declaration</div><div>Extracted</div><div>Required</div><div>Measured</div><div>Status</div>
        </div>
        ${fieldRows}
      </div>
    </div>

    ${summaryHtml}

    <div class="flex no-print" style="margin-top:22px;">
      <button class="btn btn-primary" onclick="window.print()">Download PDF report</button>
      <a href="dashboard.html" class="btn btn-ghost">Back to dashboard</a>
    </div>
  `;
}

(function init() {
  const id = params().get("id");
  const root = document.getElementById("reportRoot");
  if (!id || !REPORTS[id]) {
    renderEmpty(root);
    return;
  }
  renderReport(id, REPORTS[id]);
})();
