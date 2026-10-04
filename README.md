# demo frontend (proof of concept)

A click-through mock of the officer and Ministry-facing screens, built for the
SIH prototype/PPT round. No backend, no build step — plain HTML/CSS/JS.

## Run it

Easiest: double-click `index.html` and open it in a browser.

If your browser blocks local file access for anything, serve the folder instead:

```
cd labelguard-demo
python3 -m http.server 8000
```

then open `http://localhost:8000`.

## Walkthrough

1. **Sign in** (`index.html`) — pick **Field Officer** or **Ministry Official**.
   Any ID/password works; the role you pick decides what you land on.
2. **Scan a product** (`capture.html`) — upload any two images (they're really
   read and previewed in-browser), or click one of the three sample buttons to
   skip straight to a pre-built case. **Run compliance scan** plays a short
   simulated run through the five engine stages, then opens the report.
3. **Compliance report** (`report.html`) — field-by-field pass/fail, the
   capture and report hashes, and a mock annotated-label panel colour-coded
   by status. **Download PDF report** uses the browser's real print-to-PDF —
   it's not a fake button.
4. **Ministry dashboard** (`dashboard.html`) — stat cards, a searchable/
   filterable history of past inspections, and a violation-category
   breakdown. Click any row to open its report.

## What's real vs. hardcoded

| Thing | Status |
|---|---|
| Image upload + preview on `capture.html` | Real (FileReader), nothing is sent anywhere |
| 5-stage "processing" sequence | Simulated with timers — same stage names as the actual engine |
| The 3 sample reports (compliant / violation / readability-flag) | Hardcoded in `assets/data.js` |
| Dashboard search, filter, stats, chart | Real client-side logic, running over the hardcoded scan list |
| Login / role selection | No real auth — `localStorage` only, cleared on sign-out |
| PDF export | Real browser print-to-PDF |
| Sync to a central server | Not implemented — there is no backend here |

## Files

```
index.html         Login / role select
capture.html        Officer capture + scan trigger
report.html          Compliance report (reads ?id=SCAN-XXXXX)
dashboard.html        Ministry dashboard
assets/style.css        Design tokens + all component styles
assets/data.js            Hardcoded officer, stats, scan list, 3 full reports
assets/app.js               Session handling, navbar, inline icon set
assets/capture.js              Capture page logic
assets/report.js                 Report page logic
assets/dashboard.js                Dashboard logic
```

To add a new demo scan: add an entry to `SCANS` and, if you want it openable,
a matching entry in `REPORTS` in `assets/data.js` — nothing else needs to change.
