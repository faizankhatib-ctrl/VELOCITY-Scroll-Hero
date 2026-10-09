/**
 * Metric & KPI dataset for VELOCITY — Beyond the Ordinary
 * Matches reference data specifications with enhanced telemetry metadata.
 */

export const HEADLINE_TEXT = "WELCOME ITZFIZZ";

export const STATS_DATA = [
  {
    id: "box1",
    metric: "58%",
    label: "Increase in pick up point use",
    detail: "Accelerated hub network utilization across metropolitan corridors.",
    bgClass: "bg-[#def54f] text-neutral-950",
    style: {
      backgroundColor: "#def54f",
      color: "#111111",
    },
    // Floating coordinates on desktop
    desktopPos: { top: "6%", right: "30%" },
    timelineTrigger: 0.22, // Fraction along timeline when this card reveals
  },
  {
    id: "box2",
    metric: "23%",
    label: "Decreased in customer phone calls",
    detail: "Autonomous tracking precision resolving inquiries proactively.",
    bgClass: "bg-[#6ac9ff] text-neutral-950",
    style: {
      backgroundColor: "#6ac9ff",
      color: "#111111",
    },
    desktopPos: { bottom: "6%", right: "36%" },
    timelineTrigger: 0.45,
  },
  {
    id: "box3",
    metric: "27%",
    label: "Increase in pick up point use",
    detail: "Secondary fulfillment channels capturing overflow during peak windows.",
    bgClass: "bg-[#27272a] text-white border border-zinc-700",
    style: {
      backgroundColor: "#27272a",
      color: "#ffffff",
    },
    desktopPos: { top: "6%", right: "10%" },
    timelineTrigger: 0.68,
  },
  {
    id: "box4",
    metric: "40%",
    label: "Decreased in customer phone calls",
    detail: "Automated route dispatch minimizing delivery turnaround delays.",
    bgClass: "bg-[#fa7328] text-neutral-950",
    style: {
      backgroundColor: "#fa7328",
      color: "#111111",
    },
    desktopPos: { bottom: "6%", right: "12%" },
    timelineTrigger: 0.88,
  },
];

export const TELEMETRY_SPECS = [
  { label: "Top Speed", value: "341 km/h" },
  { label: "Acceleration", value: "0-100 in 2.8s" },
  { label: "Aero Downforce", value: "820 kg" },
  { label: "Lateral Grip", value: "1.45 G" },
];
