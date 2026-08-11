import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Undo2,
  Redo2,
  Eye,
  Save,
  Check,
  Download,
  ArrowLeft,
  Sparkles,
  Layers,
  Type,
  Image as ImageIcon,
  Shapes,
  Upload,
  Palette,
  LayoutTemplate,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { BrandScore } from "@/components/brand-score";
import { toast } from "sonner";
import { aiEditorActions, editorSurfaces } from "@/lib/brandos-v2-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/editor")({
  head: () => ({
    meta: [
      { title: "Creative Editor — BRANDOS" },
      {
        name: "description",
        content:
          "Edit AI-generated creatives on a brand-safe canvas with layers, templates, resizing and live brand compliance checks.",
      },
      { property: "og:title", content: "Creative Editor — BRANDOS" },
      {
        property: "og:description",
        content: "A canvas workspace with an AI assistant, brand safe areas and export presets.",
      },
    ],
  }),
  component: EditorPage,
});

const leftPanels = [
  { id: "templates", label: "Templates", icon: LayoutTemplate },
  { id: "brand", label: "Brand", icon: Palette },
  { id: "elements", label: "Elements", icon: Shapes },
  { id: "images", label: "Images", icon: ImageIcon },
  { id: "text", label: "Text", icon: Type },
  { id: "uploads", label: "Uploads", icon: Upload },
  { id: "layers", label: "Layers", icon: Layers },
] as const;

function EditorPage() {
  const [panel, setPanel] = useState<string>("templates");
  const [surface, setSurface] = useState(editorSurfaces[1]!);
  const [headline, setHeadline] = useState("Family Bundle");
  const [cta, setCta] = useState("Order for Friday");

  const portrait = surface.h >= surface.w;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-30 flex h-16 flex-wrap items-center justify-between gap-3 border-b border-border bg-background/90 px-4 backdrop-blur-md sm:px-6">
        <div className="flex items-center gap-3">
          <Link
            to="/studio"
            className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" /> Studio
          </Link>
          <span className="hidden text-sm font-semibold sm:inline">Weekend offer poster</span>
          <Badge variant="secondary" className="hidden sm:inline-flex">
            Demo data
          </Badge>
        </div>
        <div className="flex flex-wrap items-center gap-1">
          <Button variant="ghost" size="icon" aria-label="Undo" onClick={() => toast("Undo")}>
            <Undo2 className="size-4" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Redo" onClick={() => toast("Redo")}>
            <Redo2 className="size-4" />
          </Button>
          <Button variant="ghost" size="sm" className="gap-1.5" onClick={() => toast("Preview")}>
            <Eye className="size-4" /> Preview
          </Button>
          <Button variant="ghost" size="sm" className="gap-1.5" onClick={() => toast("Draft saved")}>
            <Save className="size-4" /> Save
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={() => toast("Sent for approval", { description: "Nothing publishes until an approver signs off." })}
          >
            <Check className="size-4" /> Approve
          </Button>
          <Button size="sm" className="gap-1.5" onClick={() => toast("Export queued", { description: `${surface.w} × ${surface.h}px` })}>
            <Download className="size-4" /> Export
          </Button>
        </div>
      </header>

      <div className="grid flex-1 grid-cols-1 lg:grid-cols-[15rem_1fr_20rem]">
        {/* LEFT */}
        <aside className="border-b border-border bg-sidebar lg:border-b-0 lg:border-r">
          <div className="flex gap-1 overflow-x-auto p-3 lg:flex-col lg:gap-0.5">
            {leftPanels.map((p) => (
              <button
                key={p.id}
                onClick={() => setPanel(p.id)}
                className={cn(
                  "flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                  panel === p.id
                    ? "bg-sidebar-accent font-semibold text-sidebar-accent-foreground"
                    : "text-muted-foreground hover:bg-sidebar-accent/60",
                )}
              >
                <p.icon className="size-4" />
                {p.label}
              </button>
            ))}
          </div>

          <div className="border-t border-sidebar-border p-4">
            {panel === "text" ? (
              <div className="space-y-3">
                <div>
                  <p className="eyebrow">Headline</p>
                  <Textarea rows={2} className="mt-2" value={headline} onChange={(e) => setHeadline(e.target.value)} />
                </div>
                <div>
                  <p className="eyebrow">CTA</p>
                  <Textarea rows={2} className="mt-2" value={cta} onChange={(e) => setCta(e.target.value)} />
                </div>
              </div>
            ) : panel === "brand" ? (
              <div className="space-y-3">
                <p className="eyebrow">Brand kit</p>
                <div className="flex gap-1.5">
                  {["bg-foreground", "bg-background", "bg-accent", "bg-surface", "bg-success"].map((c) => (
                    <span key={c} className={cn("size-7 rounded-md border border-border", c)} />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  Logo lock-ups, safe areas and typography are enforced automatically. Logos are never stretched.
                </p>
              </div>
            ) : panel === "layers" ? (
              <div className="space-y-1.5">
                {["CTA badge", "Headline", "Eyebrow", "Product image", "Background"].map((l) => (
                  <div key={l} className="rounded-md border border-border px-3 py-2 text-sm">
                    {l}
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {Array.from({ length: 6 }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => toast(`${leftPanels.find((p) => p.id === panel)?.label} item ${i + 1} added`)}
                    className="hairline-grid aspect-square rounded-md border border-border bg-surface transition-colors hover:border-ring"
                  />
                ))}
              </div>
            )}
          </div>
        </aside>

        {/* CANVAS */}
        <main className="flex flex-col items-center gap-6 bg-surface/50 p-6">
          <div className="flex flex-wrap justify-center gap-1.5">
            {editorSurfaces.map((s) => (
              <button
                key={s.id}
                onClick={() => setSurface(s)}
                className={cn(
                  "rounded-full border px-3 py-1 text-xs transition-colors",
                  surface.id === s.id ? "border-accent bg-accent/10 text-accent" : "border-border text-muted-foreground hover:border-ring",
                )}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div
            className="panel hairline-grid relative w-full max-w-md overflow-hidden bg-card"
            style={{ aspectRatio: `${surface.w} / ${surface.h}`, maxHeight: portrait ? "60vh" : undefined }}
          >
            <div className="absolute inset-[6%] rounded-lg border border-dashed border-border/70" />
            <div className="grid h-full place-items-center px-8 text-center">
              <div>
                <p className="eyebrow">Weekend only</p>
                <p className="mt-3 font-display text-4xl leading-none">{headline}</p>
                <p className="mt-4 inline-block rounded-md bg-accent px-3 py-1 text-sm font-semibold text-accent-foreground">
                  {cta}
                </p>
              </div>
            </div>
          </div>

          <p className="font-mono text-xs text-muted-foreground">
            {surface.w} × {surface.h}px · safe area shown
          </p>
        </main>

        {/* RIGHT */}
        <aside className="space-y-5 border-t border-border p-5 lg:border-l lg:border-t-0">
          <div>
            <p className="eyebrow flex items-center gap-1.5">
              <Sparkles className="size-3.5 text-accent" /> AI assistant
            </p>
            <div className="mt-3 grid gap-1.5">
              {aiEditorActions.map((a) => (
                <button
                  key={a}
                  onClick={() => toast(a, { description: "Generation runs once AI access is connected." })}
                  className="rounded-lg border border-border px-3 py-2 text-left text-sm transition-colors hover:border-ring hover:bg-surface"
                >
                  {a}
                </button>
              ))}
            </div>
          </div>

          <BrandScore compact />
        </aside>
      </div>
    </div>
  );
}
