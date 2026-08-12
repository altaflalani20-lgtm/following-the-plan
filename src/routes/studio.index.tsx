import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Link } from "@tanstack/react-router";
import { creativeFormats, creativeQueue, reelSteps, creativeTypes } from "@/lib/brandos-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/studio/")({
  head: () => ({
    meta: [
      { title: "Creative Studio — BRANDOS" },
      {
        name: "description",
        content: "Brief, generate, version and approve posters, carousels and reels that follow your brand rules automatically.",
      },
      { property: "og:title", content: "Creative Studio — BRANDOS" },
      { property: "og:description", content: "Poster and reel workflows with variations, versioning and approval." },
    ],
  }),
  component: StudioIndexPage,
});

function StudioIndexPage() {
  const [selected, setSelected] = useState(creativeFormats[0]!.name);

  return (
    <AppShell
      eyebrow="Creative studio"
      title="Brief it once. Get it in every format."
      description="Creatives inherit your colours, type, logo rules and tone of voice. Every generation is versioned with its prompt and model."
    >
      <section className="pb-10">
        <p className="eyebrow">What are you creating?</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {creativeTypes.map((t) => (
            <Link
              key={t.id}
              to="/studio/editor"
              search={{ type: t.id }}
              className="panel group flex flex-col justify-between p-4 transition-colors hover:border-ring"
            >
              <div className="hairline-grid mb-4 grid h-20 place-items-center rounded-lg bg-surface">
                <span className="font-mono text-[11px] text-muted-foreground">{t.ratio}</span>
              </div>
              <div>
                <p className="font-semibold leading-snug">{t.label}</p>
                <p className="mt-1 text-xs text-muted-foreground">{t.blurb}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Tabs defaultValue="poster">
        <TabsList>
          <TabsTrigger value="poster">Poster</TabsTrigger>
          <TabsTrigger value="reel">Reel</TabsTrigger>
          <TabsTrigger value="queue">Queue</TabsTrigger>
        </TabsList>

        <TabsContent value="poster" className="mt-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
            <div className="panel space-y-6 p-6">
              <div>
                <p className="eyebrow">Brief</p>
                <Textarea
                  className="mt-3"
                  rows={5}
                  defaultValue="Create a weekend offer poster for our family shawarma bundle."
                />
              </div>

              <div>
                <p className="eyebrow">Output format</p>
                <div className="mt-3 space-y-1.5">
                  {creativeFormats.map((f) => (
                    <button
                      key={f.name}
                      onClick={() => setSelected(f.name)}
                      className={cn(
                        "flex w-full items-center justify-between rounded-lg border px-3 py-2 text-left text-sm transition-colors",
                        selected === f.name ? "border-ring bg-surface" : "border-border hover:border-ring",
                      )}
                    >
                      <span>{f.name}</span>
                      <span className="font-mono text-[11px] text-muted-foreground">{f.px}</span>
                    </button>
                  ))}
                </div>
              </div>

              <Button
                className="w-full"
                onClick={() => toast("Generating 4 variations…", { description: "Brand colours, logo safe areas and tone applied." })}
              >
                Generate variations
              </Button>
              <p className="text-xs text-muted-foreground">
                Logos are never stretched. Text stays inside the safe area for each placement.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {["A", "B", "C", "D"].map((v) => (
                <div key={v} className="panel overflow-hidden">
                  <div className="hairline-grid grid aspect-square place-items-center bg-surface">
                    <div className="px-6 text-center">
                      <p className="eyebrow">Weekend only</p>
                      <p className="mt-2 font-display text-3xl leading-none">Family Bundle</p>
                      <p className="mt-3 inline-block rounded-md bg-accent px-3 py-1 text-sm font-semibold text-accent-foreground">
                        Save 25%
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-t border-border px-4 py-3">
                    <span className="text-sm font-medium">Variation {v}</span>
                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost" onClick={() => toast(`Editing variation ${v}`)}>
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => toast(`Variation ${v} sent for approval`)}>
                        Approve
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="reel" className="mt-8 space-y-8">
          <div className="panel p-6">
            <p className="eyebrow">Reel pipeline</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {reelSteps.map((s, i) => (
                <div key={s} className="flex items-center gap-2">
                  <span
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-sm",
                      i < 4 ? "border-accent bg-accent/10 text-accent" : "border-border text-muted-foreground",
                    )}
                  >
                    {s}
                  </span>
                  {i < reelSteps.length - 1 ? <span className="text-muted-foreground">→</span> : null}
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <div className="panel p-6">
              <p className="eyebrow">Script · 9:16 · 22s</p>
              <div className="mt-5 space-y-5">
                {[
                  { t: "0:00", label: "Hook", copy: "Nobody wants to wait 40 minutes for dinner." },
                  { t: "0:04", label: "Turn", copy: "So we grill to order and cap the queue at 25 minutes." },
                  { t: "0:12", label: "Proof", copy: "Charcoal shot, carve shot, hand-off at the counter." },
                  { t: "0:18", label: "CTA", copy: "Friday family bundle. Order before 8pm." },
                ].map((s) => (
                  <div key={s.t} className="flex gap-4 border-b border-border pb-5 last:border-0 last:pb-0">
                    <span className="w-12 shrink-0 font-mono text-xs text-muted-foreground">{s.t}</span>
                    <div>
                      <p className="eyebrow">{s.label}</p>
                      <p className="mt-1 text-sm leading-relaxed">{s.copy}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="mt-6" onClick={() => toast("Assembling reel…", { description: "Scenes, captions and voiceover queued." })}>
                Assemble reel
              </Button>
            </div>

            <div className="panel grid place-items-center bg-surface p-6">
              <div className="hairline-grid grid aspect-[9/16] w-full max-w-56 place-items-center rounded-lg border border-border">
                <p className="font-display text-2xl">9:16 preview</p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="queue" className="mt-8">
          <div className="panel divide-y divide-border">
            {creativeQueue.map((c) => (
              <div key={c.id} className="flex flex-wrap items-center gap-4 px-6 py-4">
                <div className="min-w-0 flex-1">
                  <p className="font-medium">{c.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {c.type} · {c.version}
                  </p>
                </div>
                <Badge variant={c.status === "Needs approval" ? "destructive" : "secondary"}>{c.status}</Badge>
                <Button size="sm" variant="ghost" onClick={() => toast("Opening version history")}>
                  Versions
                </Button>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}
