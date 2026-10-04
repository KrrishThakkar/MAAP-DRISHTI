/* ==========================================================================
   LabelGuard — dashboard page logic
   Search/filter runs client-side over the hardcoded SCANS array.
   ========================================================================== */

requireSession();
renderNavbar("dashboard");

document.getElementById("stat-total").textContent = STATS.totalInspections.toLocaleString();
document.getElementById("stat-violations").textContent = STATS.violationsFlagged;
document.getElementById("stat-rate").textContent = STATS.complianceRate;
document.getElementById("stat-officers").textContent = STATS.activeOfficers;

const STATUS_META = {
  verify: { label: "Compliant", pillClass: "pill-verify" },
  flag: { label: "Violations found", pillClass: "pill-flag" },
  brass: { label: "Readability flag", pillClass: "pill-brass" },
};

function pillHtml(status) {
  const m = STATUS_META[status];
  return `<span class="pill ${m.pillClass}"><span class="pill-dot"></span>${m.label}</span>`;
}

function renderTable() {
  const q = document.getElementById("searchInput").value.trim().toLowerCase();
  const statusFilter = document.getElementById("statusFilter").value;

  const rows = SCANS.filter((s) => {
    const matchesText =
      !q ||
      s.product.toLowerCase().includes(q) ||
      s.manufacturer.toLowerCase().includes(q) ||
      s.officer.toLowerCase().includes(q);
    const matchesStatus = statusFilter === "all" || s.status === statusFilter;
    return matchesText && matchesStatus;
  });

  document.getElementById("resultCount").textContent = `${rows.length} of ${SCANS.length}`;

  const body = document.getElementById("scanTableBody");
  if (rows.length === 0) {
    body.innerHTML = `<div class="empty-state">No inspections match that search.</div>`;
    return;
  }

  body.innerHTML = rows.map((s) => `
    <a class="scan-row" href="report.html?id=${s.id}">
      <div>
        <div style="font-weight:600;">${s.product}</div>
        <div class="text-sm text-faint">${s.manufacturer}</div>
      </div>
      <div class="text-sm">${s.officer}</div>
      <div class="text-sm mono">${s.date}</div>
      <div>${pillHtml(s.status)}</div>
      <div class="text-sm" style="color:var(--steel); font-weight:600;">View →</div>
    </a>
  `).join("");
}

function renderBarChart() {
  const max = Math.max(...VIOLATION_CATEGORIES.map((c) => c.pct));
  document.getElementById("barChart").innerHTML = VIOLATION_CATEGORIES.map((c) => `
    <div class="bar-item">
      <div class="bar-label-row"><span>${c.label}</span><span class="bar-value">${c.pct}%</span></div>
      <div class="bar-track"><div class="bar-fill" style="width:${(c.pct / max) * 100}%;"></div></div>
    </div>
  `).join("");
}

renderTable();
renderBarChart();
