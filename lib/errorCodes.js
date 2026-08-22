// Mirrors sigma-tutorials-admin/lib/errorCodes.js — keep both copies in sync.
// Single source of truth for the 7 diagnostic error codes, their labels/colors,
// and the checklist's other fixed constants.

export const QUESTIONS_PER_MOCK = 120;

export const ERROR_CODES = [
  { code: "V", label: "Vision Error", color: "#7c5cbf" },
  { code: "B", label: "Bait Error", color: "#e67e22" },
  { code: "K", label: "Knowledge Void", color: "#616e7c" },
  { code: "E", label: "Ego Sink", color: "#922b21" },
  { code: "F", label: "Fatigue Drop", color: "#c0392b" },
  { code: "S", label: "Strategic Skip", color: "#27ae60" },
  { code: "T", label: "Time-Crunch", color: "#e6a817" },
];

export const RIGHT_COLOR = "#2e7dd1";
export const BLANK_COLOR = "#c8d2e0";

// No exact number was specified anywhere the codes were sourced from —
// tunable starting points, not derived from real usage data yet.
export const MENTOR_ALERT_SINGLE_THRESHOLD = 12; // ~10% of 120
export const MENTOR_ALERT_COMBINED_THRESHOLD = 18; // ~15% of 120 (E+F together)
