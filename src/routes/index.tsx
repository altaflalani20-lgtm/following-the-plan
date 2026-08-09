import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, ArrowDownRight, Sparkles, Check, X } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { kpis, priorities, recommendations, business } from "@/lib/brandos-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI CMO — BRANDOS Brand & Marketing OS" },
      {
        name: "description",
        content:
          "BRANDOS plans, creates, approves, publishes and measures marketing for your business with an AI CMO and specialist agents.",
      },
      { property: "og:title", content: "AI CMO — BRANDOS Brand & Marketing OS" },
      {
        property: "og:description",
        content: "Daily priorities, recommendations with evidence, and a publishing-ready marketing plan.",
      },
    ],
  }),
  component: CmoPage,
});

function CmoPage() {
  return (
    <AppShell
      eyebrow="AI CMO · Week 31"
      title="Your rating is climbing, but delivery is capping it."
      description={`A plan for ${business.name}, built from brand rules, campaign history, reviews and channel performance. Every recommendation shows its evidence and confidence.`}
      actions={
        <>
          <Button variant="outline" onClick={() => toast("Re-analysing business context…")}>
            Re-analyse
          </Button>
          <Button className="gap-1.5" onClick={() => toast("Weekly plan drafted", { description: "Review it in Campaigns." })}>
            <Sparkles className="size-4" /> Generate weekly plan
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="panel p-5">
            <p className="eyebrow">{kpi.label}</p>
            <p className="mt-3 font-display text-4xl">{kpi.value}</p>
            <p
              className={`mt-2 flex items-center gap-1 text-xs font-semibold ${
                kpi.positive ? "text-success" : "text-destructive"
              }`}
            >
              {kpi.positive ? <ArrowUpRight className="size-3.5" /> : <ArrowDownRight className="size-3.5" />}
              {kpi.delta}
            </p>
            <p className="mt-3 border-t border-border pt-3 text-[11px] text-muted-foreground">{kpi.source}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
        <section>
          <h2 className="text-2xl">Next best actions</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Produced by specialist agents. Impact figures are modelled estimates, not measured results.
          </p>

          <div className="mt-6 space-y-4">
            {recommendations.map((rec) => (
              <article key={rec.id} className="panel overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-surface px-5 py-3">
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {rec.agent}
                  </span>
                  <Badge variant={rec.confidence === "high" ? "default" : "secondary"}>
                    {rec.confidence} confidence
                  </Badge>
                </div>
                <div className="p-5">
                  <h3 className="text-xl leading-snug">{rec.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{rec.why}</p>

                  <dl className="mt-5 grid gap-4 border-t border-border pt-5 text-sm sm:grid-cols-3">
                    <div>
                      <dt className="eyebrow">Evidence</dt>
                      <dd className="mt-1 text-muted-foreground">{rec.evidence}</dd>
                    </div>
                    <div>
                      <dt className="eyebrow">Expected impact</dt>
                      <dd className="mt-1 text-muted-foreground">{rec.impact}</dd>
                    </div>
                    <div>
                      <dt className="eyebrow">Effort</dt>
                      <dd className="mt-1 text-muted-foreground">{rec.effort}</dd>
                    </div>
                  </dl>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      className="gap-1.5"
                      onClick={() => toast(`${rec.action} — draft created`, { description: "Nothing is published until you approve it." })}
                    >
                      <Check className="size-3.5" /> {rec.action}
                    </Button>
                    <Button size="sm" variant="ghost" className="gap-1.5" onClick={() => toast("Recommendation dismissed")}>
                      <X className="size-3.5" /> Dismiss
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="space-y-8">
          <div className="panel p-5">
            <h2 className="text-xl">Today</h2>
            <ul className="mt-4 space-y-4">
              {priorities.map((p) => (
                <li key={p.id} className="border-b border-border pb-4 last:border-0 last:pb-0">
                  <p className="text-sm font-medium leading-snug">{p.label}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{p.meta}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="panel bg-surface p-5">
            <p className="eyebrow">Operating loop</p>
            <p className="mt-3 font-display text-lg leading-relaxed">
              Plan → Create → Approve → Publish → Measure → Learn → Optimize
            </p>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              Nothing externally visible is published without explicit approval under your workspace policy.
            </p>
          </div>

          <div className="panel p-5">
            <p className="eyebrow">Context in use</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>Brand guidelines · v4</li>
              <li>3 locations · {business.industry}</li>
              <li>Goal: {business.goal}</li>
              <li>Budget: {business.budget}</li>
            </ul>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}
