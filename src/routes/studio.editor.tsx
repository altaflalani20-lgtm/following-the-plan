import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  Check,
  Download,
  Eye,
  Layers,
  Image as ImageIcon,
  Redo2,
  Save,
  Shapes,
  Sparkles,
  Type as TypeIcon,
  Undo2,
  Upload,
  Palette,
  LayoutTemplate,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { creativeTypes, creativeFormats, sampleBrandScore } from "@/lib/brandos-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/studio/editor")({
  validateSearch: (search: Record<string, unknown>) => ({
    type: typeof search["type"] === "string" ? (search["type"] as string) : "poster",
  }),
  head: () => ({
    meta: [
      { title: "Creative Editor — BRANDOS" },
      {
        name: "description",
        content:
          "Edit AI-generated creatives on a brand-aware canvas with layers, templates, resizing and a live brand compliance score.",
      },
      { property: "og:title", content: "Creative Editor — BRANDOS" },
      { property: "og:description", content: "Brand-aware canvas with AI actions, layers and compliance scoring." },
    ],
  }),
  component: EditorPage,
});

const leftPanels = [
  { id: "templates", label: "Templates", icon: LayoutTemplate },
  { id: "brand", label: "Brand", icon: Palette },
  { id: "elements", label: "Elements", icon: Shapes },
  { id: "images", label: "Images", icon: ImageIcon },
  { id: "text", label: "Text", icon: TypeIcon },
  { id: "uploads", label: "Uploads", icon: Upload },
  { id: "layers", label: "Layers", icon: Layers },
] as const;

const aiActions = [
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
  "Create carousel",
  "Create Reel",
];

const panelContent: Record<string, string[]> = {
  templates: ["Offer — bold type", "Offer — photo led", "Announcement", "Menu drop", "Testimonial"],
  brand: ["Ink", "Paper", "Signal Ochre", "Char", "Leaf", "Instrument Serif", "Manrope"],
  elements: ["Divider rule", "Price tag", "Badge", "Arrow", "Grain overlay"],
  images: ["Charcoal grill", "Carve shot", "Family table", "Counter hand-off"],
  text: ["Display headline", "Subhead", "Body", "Legal / disclaimer"],
  uploads: ["No uploads yet — drop a file to add it to this workspace"],
  layers: ["Headline", "Offer badge", "Logo", "Photo", "Background"],
};

function EditorPage() {
  const { type } = Route.useSearch();
  const creative = creativeTypes.find((t) => t.id === type) ?? creativeTypes[0]!;
  const [panel, setPanel] = useState<string>("templates");
  const [format, setFormat] = useState(creativeFormats[1]!.name);
  const [checked, setChecked] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 flex h-16 flex-wrap items-center justify-between gap-3 border-b border-border bg-background/90 px-4 backdrop-blur-md sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <Link
            to="/studio"
            className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" /> Studio
          </Link>
          <span className="hidden text-border sm:inline">/</span>
          <p className="truncate text-sm font-semibold">{creative.label} · untitled</p>
          <Badge variant="secondary" className="hidden sm:inline-flex">
            Demo data
          </Badge>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" aria-label="Undo" onClick={() => toast("Undo")}>
            <Undo2 className="size-4" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Redo" onClick={() => toast("Redo")}>
            <Redo2 className="size-4" />
          </Button>
          <Button variant="ghost" size="sm" className="gap-1.5" onClick={() => toast("Draft saved")}>
            <Save className="size-4" /> Save
          </Button>
          <Button variant="ghost" size="sm" className="gap-1.5" onClick={() => toast("Preview")}>
            <Eye className="size-4" /> Preview
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={() => toast("Sent for approval", { description: "Owner approval required before publishing." })}
          >
            <Check className="size-4" /> Approve
          </Button>
          <Button size="sm" className="gap-1.5" onClick={() => toast("Export queued", { description: `${format}` })}>
            <Download className="size-4" /> Export
          </Button>
        </div>
      </header>

      <div className="grid lg:grid-cols-[15rem_1fr_20rem]">
        {/* LEFT */}
        <aside className="border-b border-border lg:border-b-0 lg:border-r">
          <div className="flex gap-1 overflow-x-auto p-3 lg:flex-col lg:gap-0.5">
            {leftPanels.map((p) => (
              <button
                key={p.id}
                onClick={() => setPanel(p.id)}
                className={cn(
                  "flex shrink-0 items-center gap-2 rounded-lg px-2.5 py-2 text-sm transition-colors",
                  panel === p.id
                    ? "bg-surface font-semibold text-foreground"
                    : "text-muted-foreground hover:bg-surface/60 hover:text-foreground",
                )}
              >
                <p.icon className={cn("size-4", panel === p.id && "text-accent")} />
                {p.label}
              </button>
            ))}
          </div>
          <div className="space-y-1.5 border-t border-border p-3">
            {(panelContent[panel] ?? []).map((item) => (
              <button
                key={item}
                onClick={() => toast(`${item} added`, { description: "Brand rules applied automatically." })}
                className="w-full rounded-lg border border-border bg-card px-3 py-2 text-left text-sm transition-colors hover:border-ring"
              >
                {item}
              </button>
            ))}
          </div>
        </aside>

        {/* CANVAS */}
        <main className="bg-surface/50 p-5 sm:p-10">
          <div className="mx-auto max-w-xl">
            <div className="mb-4 flex flex-wrap gap-1.5">
              {creativeFormats.map((f) => (
                <button
                  key={f.name}
                  onClick={() => setFormat(f.name)}
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs transition-colors",
                    format === f.name ? "border-ring bg-card font-semibold" : "border-border text-muted-foreground hover:border-ring",
                  )}
                >
                  {f.name}
                </button>
              ))}
            </div>

            <div className="panel hairline-grid grid aspect-[4/5] place-items-center bg-card">
              <div className="px-8 text-center">
                <p className="eyebrow">Weekend only</p>
                <p className="mt-3 font-display text-5xl leading-none">Family Bundle</p>
                <p className="mt-4 text-sm text-muted-foreground">Grilled to order. On the table in 25 minutes.</p>
                <p className="mt-5 inline-block rounded-md bg-accent px-4 py-1.5 text-sm font-semibold text-accent-foreground">
                  Order before 8pm
                </p>
              </div>
            </div>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Logo safe areas and aspect ratios are enforced — logos are never stretched.
            </p>
          </div>
        </main>

        {/* RIGHT */}
        <aside className="border-t border-border p-4 lg:border-l lg:border-t-0">
          <p className="eyebrow flex items-center gap-1.5">
            <Sparkles className="size-3.5 text-accent" /> AI assistant
          </p>
          <Textarea
            rows={3}
            className="mt-3"
            placeholder="Tell the assistant what to change…"
          />
          <Button
            className="mt-2 w-full"
            onClick={() => toast("Applying changes…", { description: "Generating a new version of this creative." })}
          >
            Apply
          </Button>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {aiActions.map((a) => (
              <button
                key={a}
                onClick={() => toast(a, { description: "Queued — the new version will appear as v-next." })}
                className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-ring hover:text-foreground"
              >
                {a}
              </button>
            ))}
          </div>

          <div className="panel mt-6 p-4">
            <div className="flex items-center justify-between">
              <p className="eyebrow flex items-center gap-1.5">
                <ShieldCheck className="size-3.5 text-accent" /> Brand compliance
              </p>
              {checked ? <span className="font-display text-2xl">{sampleBrandScore.total}</span> : null}
            </div>

            {!checked ? (
              <>
                <p className="mt-2 text-sm text-muted-foreground">
                  Score this creative against your brand strategy, visual identity and verbal rules.
                </p>
                <Button variant="outline" size="sm" className="mt-3 w-full" onClick={() => setChecked(true)}>
                  Check brand compliance
                </Button>
              </>
            ) : (
              <div className="mt-3 space-y-3">
                {sampleBrandScore.breakdown.map((b) => (
                  <div key={b.label}>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">{b.label}</span>
                      <span className="font-mono">{b.score}</span>
                    </div>
                    <Progress value={b.score} className="mt-1 h-1" />
                  </div>
                ))}
                {sampleBrandScore.issues.map((i) => (
                  <div key={i.message} className="rounded-lg border border-border bg-surface p-3">
                    <p className="text-xs leading-relaxed">
                      {i.severity === "warning" ? "⚠️ " : "ℹ️ "}
                      {i.message}
                    </p>
                    <div className="mt-2 flex gap-1.5">
                      <Button size="sm" onClick={() => toast("Fixed automatically", { description: "Version updated." })}>
                        Fix automatically
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => toast("Issue ignored for this creative")}>
                        Ignore
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
