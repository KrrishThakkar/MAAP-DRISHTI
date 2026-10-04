/* ==========================================================================
   LabelGuard — shared app shell (session, navbar, small icon set)
   No backend: "session" is just localStorage, reset any time via Logout.
   ========================================================================== */

const ICONS = {
  officer: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8.5" r="3.2"/><path d="M5 20c0-3.6 3.1-6.2 7-6.2s7 2.6 7 6.2"/><path d="M15.5 9.2l1.6-1 1.6 1v2.1c0 1.6-1 2.8-1.6 3.1-.6-.3-1.6-1.5-1.6-3.1V9.2z"/></svg>',
  landmark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 10h16"/><path d="M4 20h16"/><path d="M6 10v8"/><path d="M10 10v8"/><path d="M14 10v8"/><path d="M18 10v8"/><path d="M3 10l9-5 9 5"/></svg>',
  camera: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8.5A1.5 1.5 0 0 1 5.5 7h2l1-1.6h7l1 1.6h2A1.5 1.5 0 0 1 20 8.5v9A1.5 1.5 0 0 1 18.5 19h-13A1.5 1.5 0 0 1 4 17.5z"/><circle cx="12" cy="12.5" r="3.4"/></svg>',
  upload: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15V4"/><path d="M8 8l4-4 4 4"/><path d="M4 16v2.5A1.5 1.5 0 0 0 5.5 20h13a1.5 1.5 0 0 0 1.5-1.5V16"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12.5l5 5L20 7"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.3-4.3"/></svg>',
  grid: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="7" height="7" rx="1"/><rect x="13" y="4" width="7" height="7" rx="1"/><rect x="4" y="13" width="7" height="7" rx="1"/><rect x="13" y="13" width="7" height="7" rx="1"/></svg>',
};

function initials(name) {
  return name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();
}

function getRole() {
  return localStorage.getItem("lg_role");
}

function setRole(role) {
  localStorage.setItem("lg_role", role);
}

function currentUser() {
  return getRole() === "ministry" ? MINISTRY_USER : OFFICER;
}

function requireSession() {
  if (!getRole()) window.location.href = "index.html";
}

function logout() {
  localStorage.removeItem("lg_role");
  window.location.href = "index.html";
}

function renderNavbar(activeKey) {
  const mount = document.getElementById("navbar");
  if (!mount) return;
  const user = currentUser();

  mount.innerHTML = `
    <div class="container">
      <a href="dashboard.html" class="brand">
        <span class="brand-mark"></span>
        <span class="brand-name">LabelGuard</span>
      </a>
      <div class="nav-links">
        <a href="capture.html" class="nav-link ${activeKey === "capture" ? "active" : ""}">Scan product</a>
        <a href="dashboard.html" class="nav-link ${activeKey === "dashboard" ? "active" : ""}">Ministry dashboard</a>
      </div>
      <div class="nav-right">
        <span class="demo-pill">DEMO · hardcoded data</span>
        <div class="user-chip">
          <span class="user-avatar">${initials(user.name)}</span>
          <span>${user.name}</span>
        </div>
        <a href="#" class="logout-link" onclick="logout(); return false;">Sign out</a>
      </div>
    </div>
  `;
}
