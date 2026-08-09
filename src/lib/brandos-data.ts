/**
 * BRANDOS demo business context.
 * All values here are illustrative sample data for the workspace shell.
 * Nothing in this file is published to any external platform.
 */

export const business = {
  name: "Shawarma House",
  industry: "Food & Beverage",
  type: "QSR · 3 locations",
  accent: "Signal Ochre",
  goal: "More customers",
  budget: "$2,400 / month",
};

export type Confidence = "high" | "medium" | "low";

export type Recommendation = {
  id: string;
  title: string;
  why: string;
  evidence: string;
  impact: string;
  confidence: Confidence;
  effort: string;
  action: string;
  agent: string;
};

export const recommendations: Recommendation[] = [
  {
    id: "rec-1",
    title: "Fix delivery timing before raising ad spend",
    why: "Negative sentiment is concentrated on delivery time, so more paid reach would amplify a weak experience.",
    evidence: "38% of 1–2 star reviews in the last 30 days mention waiting or delivery time.",
    impact: "Estimated +0.3 rating in 60 days (assumption-based)",
    confidence: "high",
    effort: "2 weeks · ops + 1 campaign",
    action: "Create feedback campaign",
    agent: "Reputation Manager",
  },
  {
    id: "rec-2",
    title: "Double down on the weekend offer pillar",
    why: "Offer posts published Thursday evening outperform every other pillar on saves and profile visits.",
    evidence: "Top 5 posts by saves are all weekend offers posted 18:00–20:00.",
    impact: "Estimated +18% engagement on the pillar",
    confidence: "medium",
    effort: "1 day · 4 creatives",
    action: "Generate 4 posters",
    agent: "Content Strategist",
  },
  {
    id: "rec-3",
    title: "Launch a win-back flow for lapsed customers",
    why: "412 customers have not ordered in 45+ days and have no active touchpoint.",
    evidence: "CRM segment 'Lapsed 45d' has grown 12% month over month.",
    impact: "Estimated 60–90 recovered orders (modelled)",
    confidence: "medium",
    effort: "3 hours · 1 automation",
    action: "Build automation",
    agent: "CRM & Growth Manager",
  },
];

export const priorities = [
  { id: "p1", label: "Approve 6 pieces of content for this week", meta: "Approval · due today" },
  { id: "p2", label: "Reply to 4 negative Google reviews", meta: "Reputation · SLA 24h" },
  { id: "p3", label: "Reconnect Instagram — token expired", meta: "Integrations · blocking" },
  { id: "p4", label: "Review Ramadan campaign budget split", meta: "Campaign · draft" },
];

export const kpis = [
  { label: "Reach", value: "184.2K", delta: "+12.4%", positive: true, source: "Meta Insights · last 30d" },
  { label: "Engagement rate", value: "4.8%", delta: "-0.6%", positive: false, source: "Meta Insights · last 30d" },
  { label: "Leads", value: "312", delta: "+8.1%", positive: true, source: "BRANDOS CRM · last 30d" },
  { label: "Google rating", value: "4.4", delta: "+0.1", positive: true, source: "Google Business · live" },
];

export const performanceSeries = [
  { month: "Feb", reach: 92, engagement: 3.4, leads: 148 },
  { month: "Mar", reach: 104, engagement: 3.9, leads: 172 },
  { month: "Apr", reach: 121, engagement: 4.4, leads: 196 },
  { month: "May", reach: 139, engagement: 5.1, leads: 241 },
  { month: "Jun", reach: 158, engagement: 5.4, leads: 268 },
  { month: "Jul", reach: 184, engagement: 4.8, leads: 312 },
];

export const channelMix = [
  { channel: "Instagram", posts: 42, reach: 84 },
  { channel: "Facebook", posts: 31, reach: 46 },
  { channel: "Google", posts: 18, reach: 29 },
  { channel: "WhatsApp", posts: 12, reach: 15 },
  { channel: "LinkedIn", posts: 6, reach: 10 },
];

export type CampaignStatus = "Draft" | "Needs review" | "Approved" | "Live" | "Finished";

export const campaigns = [
  {
    id: "cmp-1",
    name: "Weekend Shawarma Ritual",
    objective: "More customers",
    status: "Live" as CampaignStatus,
    channels: ["Instagram", "Facebook", "WhatsApp"],
    budget: "$800",
    window: "Jul 1 – Jul 31",
    progress: 68,
    idea: "Turn Friday night into a neighbourhood ritual with a family bundle.",
  },
  {
    id: "cmp-2",
    name: "New Location — Marina",
    objective: "Brand awareness",
    status: "Needs review" as CampaignStatus,
    channels: ["Instagram", "Google"],
    budget: "$1,100",
    window: "Aug 5 – Sep 5",
    progress: 24,
    idea: "Announce the Marina kitchen with a first-100-orders founding offer.",
  },
  {
    id: "cmp-3",
    name: "Review Recovery Sprint",
    objective: "Increase reviews",
    status: "Draft" as CampaignStatus,
    channels: ["WhatsApp", "Email"],
    budget: "$150",
    window: "Aug 1 – Aug 21",
    progress: 8,
    idea: "Ask happy repeat customers for honest feedback 2 days after ordering.",
  },
  {
    id: "cmp-4",
    name: "Ramadan Family Table",
    objective: "More sales",
    status: "Finished" as CampaignStatus,
    channels: ["Instagram", "Facebook", "Google"],
    budget: "$1,900",
    window: "Mar 1 – Apr 9",
    progress: 100,
    idea: "Iftar bundles positioned around gathering, not discounting.",
  },
];

export const contentStatuses = [
  "Draft",
  "AI Generated",
  "Needs Review",
  "Approved",
  "Scheduled",
  "Published",
  "Failed",
] as const;

export type ContentStatus = (typeof contentStatuses)[number];

export type CalendarItem = {
  id: string;
  day: number;
  time: string;
  platform: string;
  format: string;
  title: string;
  status: ContentStatus;
  campaign: string;
};

export const calendarItems: CalendarItem[] = [
  { id: "c1", day: 2, time: "18:00", platform: "Instagram", format: "Reel", title: "Shawarma carve ASMR hook", status: "Scheduled", campaign: "Weekend Shawarma Ritual" },
  { id: "c2", day: 3, time: "12:30", platform: "Google", format: "Post", title: "Lunch combo update", status: "Published", campaign: "Weekend Shawarma Ritual" },
  { id: "c3", day: 5, time: "19:15", platform: "Instagram", format: "Carousel", title: "Family bundle breakdown", status: "Needs Review", campaign: "Weekend Shawarma Ritual" },
  { id: "c4", day: 8, time: "09:00", platform: "WhatsApp", format: "Broadcast", title: "Weekend offer to VIP list", status: "Approved", campaign: "Weekend Shawarma Ritual" },
  { id: "c5", day: 11, time: "17:45", platform: "Facebook", format: "Poster", title: "Marina opening teaser", status: "AI Generated", campaign: "New Location — Marina" },
  { id: "c6", day: 14, time: "20:00", platform: "Instagram", format: "Story", title: "Behind the grill", status: "Draft", campaign: "New Location — Marina" },
  { id: "c7", day: 17, time: "11:00", platform: "Instagram", format: "Reel", title: "Founder: why we opened Marina", status: "Scheduled", campaign: "New Location — Marina" },
  { id: "c8", day: 19, time: "13:00", platform: "Email", format: "Newsletter", title: "August menu letter", status: "Failed", campaign: "Review Recovery Sprint" },
  { id: "c9", day: 22, time: "18:30", platform: "Instagram", format: "Poster", title: "Weekend offer — wave 3", status: "Approved", campaign: "Weekend Shawarma Ritual" },
  { id: "c10", day: 26, time: "10:00", platform: "Google", format: "Post", title: "Marina now open", status: "Needs Review", campaign: "New Location — Marina" },
];

export const creativeFormats = [
  { name: "Instagram square", ratio: "1:1", px: "1080 × 1080" },
  { name: "Instagram portrait", ratio: "4:5", px: "1080 × 1350" },
  { name: "Story / Reel", ratio: "9:16", px: "1080 × 1920" },
  { name: "WhatsApp", ratio: "1:1", px: "1024 × 1024" },
  { name: "Facebook", ratio: "1.91:1", px: "1200 × 628" },
  { name: "Print A4", ratio: "1:1.41", px: "2480 × 3508" },
];

export const creativeQueue = [
  { id: "cr1", title: "Weekend offer poster — variation A", type: "Poster", status: "Needs approval", version: "v3" },
  { id: "cr2", title: "Family bundle carousel", type: "Carousel", status: "Approved", version: "v2" },
  { id: "cr3", title: "Marina opening reel", type: "Reel", status: "Generating", version: "v1" },
  { id: "cr4", title: "Lunch combo Google post", type: "GBP post", status: "Scheduled", version: "v1" },
];

export const reelSteps = [
  "Idea",
  "Hook",
  "Script",
  "Scenes",
  "Storyboard",
  "Voiceover",
  "Captions",
  "Music",
  "Assembly",
  "Preview",
];

export const reviews = [
  { id: "r1", customer: "Ayesha M.", rating: 2, text: "Food was great but delivery took 55 minutes on a Friday.", category: "Delivery", sentiment: "Negative", status: "Reply drafted" },
  { id: "r2", customer: "Karim T.", rating: 5, text: "Best garlic sauce in the city. Staff remembered my order.", category: "Staff", sentiment: "Positive", status: "Replied" },
  { id: "r3", customer: "Dana R.", rating: 3, text: "Tasty, but the table wasn't cleaned when we sat down.", category: "Cleanliness", sentiment: "Mixed", status: "Needs reply" },
  { id: "r4", customer: "Omar S.", rating: 1, text: "Waited 30 minutes for a pickup order that was already paid.", category: "Waiting time", sentiment: "Negative", status: "Needs reply" },
  { id: "r5", customer: "Lina H.", rating: 5, text: "The new family bundle is excellent value.", category: "Pricing", sentiment: "Positive", status: "Replied" },
];

export const reputationSignals = [
  { label: "Waiting time", count: 23, trend: "+9 vs prev 30d", severity: "High" },
  { label: "Delivery", count: 17, trend: "+4 vs prev 30d", severity: "High" },
  { label: "Portion size", count: 8, trend: "-2 vs prev 30d", severity: "Medium" },
  { label: "Cleanliness", count: 5, trend: "+1 vs prev 30d", severity: "Medium" },
];

export const brandStrategy = {
  purpose: "Make the everyday street-food ritual feel worth showing up for.",
  mission: "Serve honest, fast, generous shawarma with the consistency of a great kitchen.",
  vision: "The most trusted neighbourhood grill in every district we enter.",
  values: ["Generous portions", "Honest sourcing", "Speed with care", "Neighbourhood first"],
  positioning:
    "For city workers and families who want a fast meal without compromise, Shawarma House is the neighbourhood grill that treats street food with kitchen discipline.",
  usp: "Charcoal-grilled daily, never held over 20 minutes.",
  uvp: "A full family meal, hot at your table in under 25 minutes.",
  promise: "Hot, generous, on time — or it's on us.",
  personality: ["Warm", "Confident", "Unfussy", "Neighbourly"],
  archetype: "The Everyman with a Craftsman's standard",
};

export const personas = [
  { name: "The 40-minute lunch", who: "Office workers, 24–38", need: "Fast, filling, predictable", channel: "Instagram, Google" },
  { name: "The Friday family", who: "Parents, 30–48", need: "Value bundles, easy ordering", channel: "WhatsApp, Facebook" },
  { name: "The late shift", who: "Students & night workers, 19–29", need: "Open late, delivery reliability", channel: "Instagram, Delivery apps" },
];

export const brandColors = [
  { name: "Ink", token: "--foreground", hex: "#2B2620" },
  { name: "Paper", token: "--background", hex: "#FAF8F4" },
  { name: "Signal Ochre", token: "--accent", hex: "#D8722C" },
  { name: "Char", token: "--surface", hex: "#F1EDE6" },
  { name: "Leaf", token: "--success", hex: "#4F8A5B" },
];

export const brandVoice = [
  { rule: "Say it plainly", do: "Hot in 25 minutes.", dont: "Experience culinary excellence." },
  { rule: "Never discount the craft", do: "Charcoal-grilled today.", dont: "Cheapest shawarma in town." },
  { rule: "Speak to a neighbour", do: "See you Friday.", dont: "Dear valued customer." },
];

export const connectedAccounts = [
  { name: "Instagram", handle: "@shawarmahouse", status: "Connected" },
  { name: "Facebook Page", handle: "Shawarma House", status: "Connected" },
  { name: "Google Business Profile", handle: "3 locations", status: "Connected" },
  { name: "WhatsApp Business", handle: "+971 •• •• 4412", status: "Connected" },
  { name: "LinkedIn", handle: "—", status: "Not connected" },
  { name: "TikTok", handle: "—", status: "Not connected" },
];

export const publishingQueue = [
  { id: "q1", title: "Weekend offer — wave 3", platform: "Instagram", when: "Today 18:30", state: "Queued" },
  { id: "q2", title: "Marina now open", platform: "Google", when: "Tomorrow 10:00", state: "Queued" },
  { id: "q3", title: "August menu letter", platform: "Email", when: "Yesterday 13:00", state: "Failed", error: "Sender domain not verified" },
];
