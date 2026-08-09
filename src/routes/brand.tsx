import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { brandStrategy, brandColors, brandVoice, personas } from "@/lib/brandos-data";

export const Route = createFileRoute("/brand")({
  head: () => ({
    meta: [
      { title: "Brand Workspace — BRANDOS" },
      {
        name: "description",
        content: "Strategy, visual identity, verbal identity and guidelines that every BRANDOS AI agent must follow.",
      },
      { property: "og:title", content: "Brand Workspace — BRANDOS" },
      {
        property: "og:description",
        content: "One source of truth for positioning, personas, colour, type and tone of voice.",
      },
    ],
  }),
  component: BrandPage,
});

function BrandPage() {
  return (
    <AppShell
      eyebrow="Brand workspace"
      title="The rules every agent writes and designs against."
      description="Strategy, identity and voice live here. Any creative generated in BRANDOS inherits these rules automatically."
      actions={
        <Button onClick={() => toast("Brand guideline document exported")}>Export guidelines</Button>
      }
    >
      <Tabs defaultValue="strategy">
        <TabsList>
          <TabsTrigger value="strategy">Strategy</TabsTrigger>
          <TabsTrigger value="visual">Visual identity</TabsTrigger>
          <TabsTrigger value="verbal">Verbal identity</TabsTrigger>
        </TabsList>

        <TabsContent value="strategy" className="mt-8 space-y-8">
          <div className="panel p-8">
            <p className="eyebrow">Positioning</p>
            <p className="mt-4 font-display text-3xl leading-tight">{brandStrategy.positioning}</p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              { label: "Purpose", value: brandStrategy.purpose },
              { label: "Mission", value: brandStrategy.mission },
              { label: "Vision", value: brandStrategy.vision },
              { label: "USP", value: brandStrategy.usp },
              { label: "UVP", value: brandStrategy.uvp },
              { label: "Brand promise", value: brandStrategy.promise },
            ].map((item) => (
              <div key={item.label} className="panel p-5">
                <p className="eyebrow">{item.label}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="panel p-5">
              <p className="eyebrow">Values</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {brandStrategy.values.map((v) => (
                  <Badge key={v} variant="secondary">
                    {v}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="panel p-5">
              <p className="eyebrow">Personality · {brandStrategy.archetype}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {brandStrategy.personality.map((v) => (
                  <Badge key={v} variant="secondary">
                    {v}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl">Customer personas</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {personas.map((p) => (
                <div key={p.name} className="panel p-5">
                  <h3 className="text-lg">{p.name}</h3>
                  <dl className="mt-4 space-y-3 text-sm">
                    <div>
                      <dt className="eyebrow">Who</dt>
                      <dd className="text-muted-foreground">{p.who}</dd>
                    </div>
                    <div>
                      <dt className="eyebrow">Core need</dt>
                      <dd className="text-muted-foreground">{p.need}</dd>
                    </div>
                    <div>
                      <dt className="eyebrow">Reach them on</dt>
                      <dd className="text-muted-foreground">{p.channel}</dd>
                    </div>
                  </dl>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="visual" className="mt-8 space-y-8">
          <div className="panel p-8">
            <p className="eyebrow">Colour</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {brandColors.map((c) => (
                <div key={c.name}>
                  <div
                    className="h-24 rounded-lg border border-border"
                    style={{ backgroundColor: `var(${c.token})` }}
                  />
                  <p className="mt-3 text-sm font-semibold">{c.name}</p>
                  <p className="font-mono text-xs text-muted-foreground">{c.hex}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="panel p-8">
              <p className="eyebrow">Display type</p>
              <p className="mt-4 font-display text-5xl leading-none">Instrument Serif</p>
              <p className="mt-4 text-sm text-muted-foreground">Headlines, campaign ideas, big numbers.</p>
            </div>
            <div className="panel p-8">
              <p className="eyebrow">Text type</p>
              <p className="mt-4 text-4xl font-semibold tracking-tight">Manrope</p>
              <p className="mt-4 text-sm text-muted-foreground">Body copy, UI, captions and long-form.</p>
            </div>
          </div>

          <div className="panel p-8">
            <p className="eyebrow">Logo usage</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {["Primary lockup", "Secondary lockup", "Mark"].map((l) => (
                <div key={l} className="hairline-grid grid h-40 place-items-center rounded-lg border border-border">
                  <div className="rounded-md bg-primary px-4 py-2 font-display text-lg text-primary-foreground">
                    Shawarma House
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Never stretch the mark. Keep clear space equal to the cap height on every side.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="verbal" className="mt-8 space-y-8">
          <div className="panel overflow-hidden">
            <div className="grid grid-cols-3 border-b border-border bg-surface px-6 py-3">
              <p className="eyebrow">Rule</p>
              <p className="eyebrow">Do</p>
              <p className="eyebrow">Don't</p>
            </div>
            {brandVoice.map((v) => (
              <div key={v.rule} className="grid grid-cols-3 gap-4 border-b border-border px-6 py-5 text-sm last:border-0">
                <p className="font-semibold">{v.rule}</p>
                <p className="text-success">{v.do}</p>
                <p className="text-muted-foreground line-through">{v.dont}</p>
              </div>
            ))}
          </div>

          <div className="panel bg-surface p-8">
            <p className="eyebrow">Tagline</p>
            <p className="mt-4 font-display text-4xl">Hot, generous, on time.</p>
          </div>
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}
