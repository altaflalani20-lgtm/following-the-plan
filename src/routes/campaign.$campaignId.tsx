import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { campaigns, campaignDetail, calendarItems } from "@/lib/brandos-data";

export const Route = createFileRoute("/campaign/$campaignId")({
  head: () => ({
    meta: [
      { title: "Campaign Operating Room — BRANDOS" },
      {
        name: "description",
        content:
          "One workspace per campaign: objective, strategy, creative production, content, schedule, distribution and performance.",
      },
      { property: "og:title", content: "Campaign Operating Room — BRANDOS" },
      { property: "og:description", content: "Strategy, creative, schedule, distribution and results for a single campaign." },
    ],
  }),
  notFoundComponent: CampaignMissing,
  component: CampaignRoom,
});

function CampaignMissing() {
  return (
    <AppShell eyebrow="Campaign" title="That campaign no longer exists." description="It may have been deleted or renamed.">
      <Link to="/campaigns" className="text-sm underline">
        Back to campaigns
      </Link>
    </AppShell>
  );
}

function CampaignRoom() {
  const { campaignId } = Route.useParams();
  const campaign = campaigns.find((c) => c.id === campaignId);
  if (!campaign) throw notFound();

  const content = calendarItems.filter((c) => c.campaign === campaign.name);

  return (
    <AppShell
      eyebrow={`Campaign · ${campaign.status}`}
      title={campaign.name}
      description={campaign.idea}
      actions={
        <>
          <Button variant="outline" onClick={() => toast("Regenerating campaign assets…")}>
            Regenerate assets
          </Button>
          <Button onClick={() => toast("Sent for approval", { description: "Nothing publishes until approved." })}>
            Approve campaign
          </Button>
        </>
      }
    >
      <Tabs defaultValue="overview">
        <TabsList className="flex-wrap">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="strategy">Strategy</TabsTrigger>
          <TabsTrigger value="creative">Creative</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="distribution">Distribution</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="cmo">AI CMO</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-8">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { label: "Objective", value: campaign.objective },
              { label: "Audience", value: campaignDetail.overview.audience },
              { label: "Offer", value: campaignDetail.overview.offer },
              { label: "Budget", value: campaign.budget },
              { label: "Dates", value: campaign.window },
              { label: "Channels", value: campaign.channels.join(", ") },
            ].map((f) => (
              <div key={f.label} className="panel p-5">
                <p className="eyebrow">{f.label}</p>
                <p className="mt-2 text-sm leading-relaxed">{f.value}</p>
              </div>
            ))}
          </div>
          <div className="panel mt-4 p-5">
            <p className="eyebrow">KPIs</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {campaignDetail.overview.kpis.map((k) => (
                <Badge key={k} variant="outline">
                  {k}
                </Badge>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="strategy" className="mt-8 space-y-4">
          {[
            { label: "Big idea", value: campaignDetail.strategy.bigIdea },
            { label: "Positioning", value: campaignDetail.strategy.positioning },
            { label: "Message", value: campaignDetail.strategy.message },
            { label: "Call to action", value: campaignDetail.strategy.cta },
            { label: "Customer insight", value: campaignDetail.strategy.insight },
          ].map((s) => (
            <div key={s.label} className="panel p-6">
              <p className="eyebrow">{s.label}</p>
              <p className="mt-2 text-lg leading-relaxed">{s.value}</p>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="creative" className="mt-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {campaignDetail.creative.map((c) => (
              <div key={c.type} className="panel p-5">
                <div className="flex items-baseline justify-between">
                  <p className="font-semibold">{c.type}</p>
                  <span className="font-mono text-sm text-muted-foreground">
                    {c.done}/{c.total}
                  </span>
                </div>
                <Progress value={(c.done / c.total) * 100} className="mt-3 h-1" />
                <Link
                  to="/studio/editor"
                  search={{ type: "poster" }}
                  className="mt-4 inline-block text-sm underline underline-offset-4"
                >
                  Open in editor
                </Link>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="content" className="mt-8">
          {content.length ? (
            <div className="panel divide-y divide-border">
              {content.map((c) => (
                <div key={c.id} className="flex flex-wrap items-center gap-4 px-6 py-4">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">{c.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {c.platform} · {c.format} · Aug {c.day} at {c.time}
                    </p>
                  </div>
                  <Badge variant="secondary">{c.status}</Badge>
                  <Button size="sm" variant="ghost" onClick={() => toast(`Opening ${c.title}`)}>
                    Open
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </TabsContent>

        <TabsContent value="schedule" className="mt-8">
          <div className="panel p-6">
            <p className="eyebrow">Timeline · {campaign.window}</p>
            <div className="mt-6 space-y-4">
              {content.map((c) => (
                <div key={c.id} className="flex items-center gap-4">
                  <span className="w-16 shrink-0 font-mono text-xs text-muted-foreground">Aug {c.day}</span>
                  <div className="h-1 flex-1 rounded-full bg-surface">
                    <div className="h-1 rounded-full bg-accent" style={{ width: `${Math.min(100, c.day * 3)}%` }} />
                  </div>
                  <span className="w-40 shrink-0 truncate text-sm">{c.title}</span>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="distribution" className="mt-8">
          <div className="panel divide-y divide-border">
            {campaignDetail.distribution.map((d) => (
              <div key={d.channel} className="flex items-center gap-4 px-6 py-4">
                <p className="flex-1 font-medium">{d.channel}</p>
                <span className="text-sm text-muted-foreground">{d.posts} scheduled</span>
                {d.state === "Connected" ? (
                  <Badge variant="secondary">Connected · demo</Badge>
                ) : (
                  <Link to="/connections">
                    <Button size="sm" variant="outline">
                      Connect account
                    </Button>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="mt-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {campaignDetail.performance.map((p) => (
              <div key={p.label} className="panel p-5">
                <p className="eyebrow">{p.label}</p>
                <p className="mt-2 font-display text-3xl">{p.value}</p>
                <p className="mt-2 text-xs text-muted-foreground">{p.source}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Attribution is partial — connect Google Analytics and your ad accounts for full revenue attribution.
          </p>
        </TabsContent>

        <TabsContent value="cmo" className="mt-8 space-y-4">
          {[
            {
              title: "Shift 20% of budget to Friday evening",
              why: "Orders concentrate between 18:00 and 20:00 on Fridays.",
              evidence: "Top 5 posts by saves in this campaign were published Thu–Fri evening.",
              impact: "Estimated +9% orders in the same budget (modelled)",
            },
            {
              title: "Add a wait-time proof asset",
              why: "Wait time is the top objection in reviews for this audience.",
              evidence: "17 reviews mentioned delivery time in the last 30 days.",
              impact: "Estimated +0.4pt conversion on the offer (modelled)",
            },
          ].map((r) => (
            <div key={r.title} className="panel p-6">
              <h3 className="text-xl leading-tight">{r.title}</h3>
              <dl className="mt-4 grid gap-3 sm:grid-cols-3">
                <div>
                  <dt className="eyebrow">Why</dt>
                  <dd className="mt-1 text-sm text-muted-foreground">{r.why}</dd>
                </div>
                <div>
                  <dt className="eyebrow">Evidence</dt>
                  <dd className="mt-1 text-sm text-muted-foreground">{r.evidence}</dd>
                </div>
                <div>
                  <dt className="eyebrow">Expected impact</dt>
                  <dd className="mt-1 text-sm text-muted-foreground">{r.impact}</dd>
                </div>
              </dl>
              <div className="mt-5 flex gap-2">
                <Button size="sm" onClick={() => toast("Applied to campaign draft")}>
                  Apply
                </Button>
                <Button size="sm" variant="ghost" onClick={() => toast("Dismissed")}>
                  Dismiss
                </Button>
              </div>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}

function EmptyState() {
  return (
    <div className="panel grid place-items-center p-14 text-center">
      <div className="max-w-sm">
        <p className="font-display text-2xl">No content in this campaign yet.</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Let the AI CMO draft the full content plan — reels, posters, stories and local posts.
        </p>
        <Button className="mt-5" onClick={() => toast("Generating campaign content…")}>
          Generate content
        </Button>
      </div>
    </div>
  );
}
