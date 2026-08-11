/**
 * BRANDOS V2 demo layer — goals, campaign rooms, creative types, compliance and
 * calendar planning. All values are illustrative sample data (demo mode).
 * Nothing here is connected to a live platform.
 */

import type { ContentStatus } from "@/lib/brandos-data";

/* ------------------------------------------------------------------ */
/* Global create — business goals                                      */
/* ------------------------------------------------------------------ */

export type BusinessGoal = {
  id: string;
  label: string;
  hint: string;
  plan: {
    headline: string;
    rationale: string;
    duration: string;
    deliverables: { label: string; count: number }[];
  };
};

export const businessGoals: BusinessGoal[] = [
  {
    id: "sales",
    label: "Increase sales",
    hint: "Move more volume in a defined window",
    plan: {
      headline: "A 14-day weekend growth campaign",
      rationale:
        "Weekend evenings already carry your highest save rate, so concentrated pressure there is cheaper than broad reach.",
      duration: "14 days · 2 weekends",
      deliverables: [
        { label: "Campaign strategy", count: 1 },
        { label: "Reels", count: 4 },
        { label: "Posters", count: 6 },
        { label: "Stories", count: 8 },
        { label: "Google Business posts", count: 3 },
        { label: "WhatsApp campaigns", count: 2 },
        { label: "Ad creatives", count: 2 },
      ],
    },
  },
  {
    id: "leads",
    label: "Generate leads",
    hint: "Capture intent you can follow up on",
    plan: {
      headline: "A lead-capture offer sprint",
      rationale: "You have reach but no capture layer — an incentive plus a form turns existing attention into contacts.",
      duration: "21 days",
      deliverables: [
        { label: "Campaign strategy", count: 1 },
        { label: "Lead magnet creative", count: 3 },
        { label: "Reels", count: 2 },
        { label: "Landing copy", count: 1 },
        { label: "WhatsApp follow-up flow", count: 1 },
      ],
    },
  },
  {
    id: "customers",
    label: "Get more customers",
    hint: "First-time trial in your catchment",
    plan: {
      headline: "A first-visit trial campaign",
      rationale: "Trial friction is the gap — a low-risk first order beats a discount on the whole menu.",
      duration: "30 days",
      deliverables: [
        { label: "Campaign strategy", count: 1 },
        { label: "Posters", count: 5 },
        { label: "Reels", count: 3 },
        { label: "Google Business posts", count: 4 },
      ],
    },
  },
  {
    id: "reviews",
    label: "Get more reviews",
    hint: "Lift rating and response rate",
    plan: {
      headline: "A review recovery sprint",
      rationale: "Happy repeat customers are never asked. A timed, polite ask after a good order moves the rating fastest.",
      duration: "21 days",
      deliverables: [
        { label: "Review request automation", count: 1 },
        { label: "WhatsApp messages", count: 2 },
        { label: "Stories", count: 4 },
        { label: "Reply policy", count: 1 },
      ],
    },
  },
  {
    id: "launch",
    label: "Launch a product",
    hint: "Introduce something new properly",
    plan: {
      headline: "A three-act launch campaign",
      rationale: "Tease, reveal, prove. Launches fail when everything lands on day one with nothing after it.",
      duration: "28 days",
      deliverables: [
        { label: "Campaign strategy", count: 1 },
        { label: "Reels", count: 5 },
        { label: "Carousels", count: 3 },
        { label: "Posters", count: 4 },
        { label: "Email", count: 2 },
      ],
    },
  },
  {
    id: "offer",
    label: "Promote an offer",
    hint: "Short, sharp, time-boxed",
    plan: {
      headline: "A 10-day offer push",
      rationale: "Offers decay fast. Concentrate spend and creative in the first 72 hours, then sustain with proof.",
      duration: "10 days",
      deliverables: [
        { label: "Posters", count: 4 },
        { label: "Stories", count: 6 },
        { label: "Ad creatives", count: 2 },
        { label: "WhatsApp broadcast", count: 1 },
      ],
    },
  },
  {
    id: "location",
    label: "Grow a location",
    hint: "Focus on one underperforming site",
    plan: {
      headline: "A local catchment campaign",
      rationale: "A single-location problem needs local creative and local proof, not a brand-wide push.",
      duration: "30 days",
      deliverables: [
        { label: "Campaign strategy", count: 1 },
        { label: "Localised posters", count: 4 },
        { label: "Google Business posts", count: 6 },
        { label: "Reels", count: 2 },
      ],
    },
  },
  {
    id: "winback",
    label: "Win back customers",
    hint: "Re-engage lapsed buyers",
    plan: {
      headline: "A lapsed-customer win-back flow",
      rationale: "412 customers have not ordered in 45+ days and currently receive nothing at all.",
      duration: "Always on",
      deliverables: [
        { label: "Automation", count: 1 },
        { label: "WhatsApp messages", count: 3 },
        { label: "Email", count: 2 },
        { label: "Offer creative", count: 2 },
      ],
    },
  },
  {
    id: "awareness",
    label: "Build brand awareness",
    hint: "Be known before you're needed",
    plan: {
      headline: "A always-on brand pillar plan",
      rationale: "Awareness compounds through consistency, not bursts — the plan protects a weekly cadence.",
      duration: "90 days",
      deliverables: [
        { label: "Content pillars", count: 5 },
        { label: "Reels", count: 12 },
        { label: "Carousels", count: 6 },
        { label: "Founder content", count: 4 },
      ],
    },
  },
  {
    id: "retention",
    label: "Improve retention",
    hint: "Make the second order automatic",
    plan: {
      headline: "A second-order nudge programme",
      rationale: "The largest single drop-off is between order one and order two — that gap is worth more than new reach.",
      duration: "Always on",
      deliverables: [
        { label: "Automation", count: 2 },
        { label: "WhatsApp messages", count: 3 },
        { label: "Loyalty creative", count: 2 },
      ],
    },
  },
];

/* ------------------------------------------------------------------ */
/* Revenue goal engine                                                 */
/* ------------------------------------------------------------------ */

export const revenueGoal = {
  target: 1_200_000,
  current: 870_000,
  forecast: 1_140_000,
  currency: "₹",
  targetDate: "31 Oct",
  avgOrderValue: 640,
  leadToCustomer: 0.28,
};

export function formatMoney(v: number) {
  if (v >= 100000) return `₹${(v / 100000).toFixed(1)}L`;
  if (v >= 1000) return `₹${(v / 1000).toFixed(1)}K`;
  return `₹${v}`;
}

/* ------------------------------------------------------------------ */
/* Creative studio                                                     */
/* ------------------------------------------------------------------ */

export type CreativeType = {
  id: string;
  label: string;
  ratio: string;
  px: string;
  blurb: string;
};

export const creativeTypes: CreativeType[] = [
  { id: "poster", label: "Poster", ratio: "4:5", px: "1080 × 1350", blurb: "Offer, menu or announcement" },
  { id: "social", label: "Social post", ratio: "1:1", px: "1080 × 1080", blurb: "Single-frame feed post" },
  { id: "carousel", label: "Carousel", ratio: "4:5", px: "1080 × 1350", blurb: "Multi-slide explainer" },
  { id: "story", label: "Story", ratio: "9:16", px: "1080 × 1920", blurb: "Full-bleed vertical" },
  { id: "reel", label: "Reel", ratio: "9:16", px: "1080 × 1920", blurb: "Scripted short video" },
  { id: "video", label: "Video", ratio: "16:9", px: "1920 × 1080", blurb: "Longer form cut" },
  { id: "ad", label: "Ad creative", ratio: "1:1", px: "1080 × 1080", blurb: "Paid placement variant" },
  { id: "banner", label: "Banner", ratio: "1.91:1", px: "1200 × 628", blurb: "Web or ad banner" },
  { id: "flyer", label: "Flyer", ratio: "1:1.41", px: "2480 × 3508", blurb: "Print A4 / A5" },
  { id: "email", label: "Email", ratio: "—", px: "600 wide", blurb: "Newsletter or campaign mail" },
  { id: "whatsapp", label: "WhatsApp creative", ratio: "1:1", px: "1024 × 1024", blurb: "Broadcast image" },
  { id: "gbp", label: "Google Business post", ratio: "4:3", px: "1200 × 900", blurb: "Local profile update" },
];

export const editorSurfaces = [
  { id: "ig-square", label: "Instagram square", w: 1080, h: 1080 },
  { id: "ig-portrait", label: "Instagram portrait", w: 1080, h: 1350 },
  { id: "story", label: "Story", w: 1080, h: 1920 },
  { id: "facebook", label: "Facebook", w: 1200, h: 628 },
  { id: "linkedin", label: "LinkedIn", w: 1200, h: 627 },
  { id: "whatsapp", label: "WhatsApp", w: 1024, h: 1024 },
  { id: "a4", label: "Print A4", w: 2480, h: 3508 },
  { id: "a5", label: "Print A5", w: 1748, h: 2480 },
];

export const aiEditorActions = [
  "Improve design",
  "Make more premium",
  "Make more minimal",
  "Make more energetic",
  "Rewrite headline",
  "Rewrite CTA",
  "Change colours",
  "Apply brand",
  "Generate variation",
  "Remove background",
  "Resize",
  "Create carousel",
  "Create Reel",
];

/* ------------------------------------------------------------------ */
/* Brand compliance engine                                             */
/* ------------------------------------------------------------------ */

export type ComplianceReport = {
  score: number;
  breakdown: { label: string; score: number }[];
  issues: { severity: "warning" | "error"; message: string; fix: string }[];
};

export const defaultCompliance: ComplianceReport = {
  score: 92,
  breakdown: [
    { label: "Visual identity", score: 94 },
    { label: "Brand voice", score: 96 },
    { label: "Messaging", score: 89 },
    { label: "CTA", score: 91 },
    { label: "Typography", score: 95 },
  ],
  issues: [
    {
      severity: "warning",
      message: "This headline uses language outside your approved brand vocabulary (\"cheapest\").",
      fix: "Replace with \"honest value\" — matches your never-discount-the-craft rule.",
    },
    {
      severity: "warning",
      message: "CTA is passive and does not match your approved CTA style.",
      fix: "Use \"Order for Friday\" instead of \"Learn more\".",
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Campaign operating room                                             */
/* ------------------------------------------------------------------ */

export type CampaignRoom = {
  audience: string;
  offer: string;
  insight: string;
  bigIdea: string;
  message: string;
  cta: string;
  kpis: { label: string; target: string; actual: string }[];
  creative: { type: string; done: number; total: number }[];
  distribution: { channel: string; state: string }[];
  performance: { label: string; value: string; note: string }[];
  recommendations: { title: string; detail: string }[];
};

export const campaignRooms: Record<string, CampaignRoom> = {
  "cmp-1": {
    audience: "Families within 4km, ordered at least once in 90 days",
    offer: "Family bundle — four wraps, two sides, one sauce flight",
    insight: "Friday night decisions are made at 17:40, not at dinner time.",
    bigIdea: "Turn Friday night into a neighbourhood ritual.",
    message: "The table's already set. Bring the shawarma.",
    cta: "Order for Friday",
    kpis: [
      { label: "Orders", target: "1,200", actual: "812" },
      { label: "Reach", target: "150K", actual: "118K" },
      { label: "ROAS", target: "4.0x", actual: "3.4x" },
    ],
    creative: [
      { type: "Reels", done: 4, total: 6 },
      { type: "Posters", done: 8, total: 10 },
      { type: "Stories", done: 5, total: 5 },
      { type: "Carousels", done: 1, total: 3 },
      { type: "Ads", done: 2, total: 2 },
    ],
    distribution: [
      { channel: "Instagram", state: "Scheduled" },
      { channel: "Facebook", state: "Scheduled" },
      { channel: "Google", state: "Demo data" },
      { channel: "WhatsApp", state: "Awaiting approval" },
      { channel: "Email", state: "Not in plan" },
      { channel: "Ads", state: "Demo data" },
    ],
    performance: [
      { label: "Reach", value: "118K", note: "Meta Insights · demo data" },
      { label: "Leads", value: "204", note: "BRANDOS CRM · demo data" },
      { label: "Customers", value: "138", note: "Attributed · partial" },
      { label: "Revenue", value: "₹4.2L", note: "Attributed · partial" },
      { label: "CAC", value: "₹96", note: "Estimate" },
      { label: "ROAS", value: "3.4x", note: "Estimate" },
    ],
    recommendations: [
      {
        title: "Shift 30% of budget to Thursday 18:00–20:00",
        detail: "Saves and profile visits concentrate in that window; Sunday spend is underperforming by 41%.",
      },
      {
        title: "Cut carousel production from 3 to 1",
        detail: "Carousels in this campaign are the weakest format on saves and cost the most creative time.",
      },
    ],
  },
};

export const defaultCampaignRoom: CampaignRoom = {
  audience: "Defined during campaign generation",
  offer: "Not set",
  insight: "Awaiting strategy generation",
  bigIdea: "Awaiting strategy generation",
  message: "—",
  cta: "—",
  kpis: [],
  creative: [
    { type: "Reels", done: 0, total: 4 },
    { type: "Posters", done: 0, total: 6 },
    { type: "Stories", done: 0, total: 6 },
  ],
  distribution: [],
  performance: [],
  recommendations: [],
};

/* ------------------------------------------------------------------ */
/* Calendar builder                                                    */
/* ------------------------------------------------------------------ */

export const contentPillars = [
  "Educational",
  "Promotional",
  "Engagement",
  "Social proof",
  "Behind the scenes",
  "Founder",
  "Product",
  "Community",
  "Seasonal",
  "UGC",
] as const;

export type PlannedItem = {
  id: string;
  day: number;
  time: string;
  platform: string;
  format: string;
  title: string;
  status: ContentStatus;
  campaign: string;
  pillar: string;
};

const platforms = ["Instagram", "Facebook", "Google", "WhatsApp", "Email"];
const formats = ["Reel", "Poster", "Carousel", "Story", "Post"];
const times = ["09:00", "12:30", "17:45", "18:30", "20:00"];

export function buildCalendarPlan(month: string): PlannedItem[] {
  const items: PlannedItem[] = [];
  let n = 0;
  for (let day = 1; day <= 30; day++) {
    const perDay = day % 5 === 0 ? 2 : day % 3 === 0 ? 0 : 1;
    for (let k = 0; k < perDay; k++) {
      const pillar = contentPillars[n % contentPillars.length]!;
      items.push({
        id: `plan-${day}-${k}`,
        day,
        time: times[n % times.length]!,
        platform: platforms[n % platforms.length]!,
        format: formats[n % formats.length]!,
        title: `${pillar} · ${month} plan piece ${n + 1}`,
        status: "AI Generated",
        campaign: n % 4 === 0 ? "Weekend Shawarma Ritual" : n % 4 === 1 ? "New Location — Marina" : "Always-on brand",
        pillar,
      });
      n++;
    }
  }
  return items;
}
