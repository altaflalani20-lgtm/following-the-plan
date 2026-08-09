import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { reviews, reputationSignals } from "@/lib/brandos-data";
import { Star } from "lucide-react";

export const Route = createFileRoute("/reputation")({
  head: () => ({
    meta: [
      { title: "Reputation & Reviews — BRANDOS" },
      {
        name: "description",
        content: "Classify reviews, spot recurring complaints and draft on-brand replies that a human approves before publishing.",
      },
      { property: "og:title", content: "Reputation & Reviews — BRANDOS" },
      { property: "og:description", content: "Review intelligence with sentiment, categories and approval-gated replies." },
    ],
  }),
  component: ReputationPage,
});

function ReputationPage() {
  return (
    <AppShell
      eyebrow="Reputation"
      title="4.4 stars, and the reason it isn't 4.7."
      description="Reviews are classified, clustered and answered in your brand voice. Replies publish only after a human approves them."
      actions={<Button onClick={() => toast("Drafting replies for 4 pending reviews…")}>Draft pending replies</Button>}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Rating", value: "4.4" },
          { label: "Total reviews", value: "1,284" },
          { label: "Response rate", value: "86%" },
          { label: "Avg response time", value: "9h" },
        ].map((s) => (
          <div key={s.label} className="panel p-5">
            <p className="eyebrow">{s.label}</p>
            <p className="mt-3 font-display text-4xl">{s.value}</p>
          </div>
        ))}
      </div>

      <section className="mt-12">
        <h2 className="text-2xl">Recurring problems</h2>
        <p className="mt-1 text-sm text-muted-foreground">Clustered from the last 30 days of review text.</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {reputationSignals.map((s) => (
            <div key={s.label} className="panel p-5">
              <div className="flex items-center justify-between">
                <p className="eyebrow">{s.label}</p>
                <Badge variant={s.severity === "High" ? "destructive" : "secondary"}>{s.severity}</Badge>
              </div>
              <p className="mt-3 font-display text-4xl">{s.count}</p>
              <p className="mt-2 text-xs text-muted-foreground">{s.trend}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl">Reviews</h2>
        <div className="panel mt-5 divide-y divide-border">
          {reviews.map((r) => (
            <div key={r.id} className="p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <p className="font-semibold">{r.customer}</p>
                  <span className="flex gap-0.5">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        className={i < r.rating ? "size-3.5 fill-accent text-accent" : "size-3.5 text-border"}
                      />
                    ))}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{r.category}</Badge>
                  <Badge variant={r.sentiment === "Negative" ? "destructive" : "secondary"}>{r.sentiment}</Badge>
                </div>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{r.text}</p>

              {r.status !== "Replied" ? (
                <div className="mt-4 rounded-lg border border-border bg-surface p-4">
                  <p className="eyebrow">Suggested reply · brand voice</p>
                  <p className="mt-2 text-sm leading-relaxed">
                    Thanks for telling us, {r.customer.split(" ")[0]}. That wait isn't the standard we hold ourselves to —
                    we're changing how the {r.category.toLowerCase()} queue is handled this week. Next order is on us.
                  </p>
                  <div className="mt-4 flex gap-2">
                    <Button size="sm" onClick={() => toast("Reply approved and published")}>
                      Approve & publish
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => toast("Reply regenerated")}>
                      Regenerate
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="mt-4 text-xs font-semibold text-success">Replied</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
