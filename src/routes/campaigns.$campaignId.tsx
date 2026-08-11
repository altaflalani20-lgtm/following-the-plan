import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { campaigns, calendarItems } from "@/lib/brandos-data";
import { campaignRooms, defaultCampaignRoom } from "@/lib/brandos-v2-data";
import { ArrowLeft, Sparkles } from "lucide-react";

export const Route = createFileRoute("/campaigns/$campaignId")({
  head: () => ({
    meta: [
      { title: "Campaign Operating Room — BRANDOS" },
      {
        name: "description",
        content:
          "One workspace per campaign: objective, strategy, creative progress, content, schedule, distribution, performance and AI CMO advice.",
      },
      { property: "og:title", content: "Campaign Operating Room — BRANDOS" },
      {
        property: "og:description",
        content: "Strategy, creative, distribution and measurement for a single campaign.",
      },
    ],
  }),
  component: CampaignRoomPage,
});

function CampaignRoomPage() {
  const { campaignId } = useParams({ from: "/campaigns/$campaignId" });
  const campaign = campaigns.find((c) => c.id === campaignId);
  const room = campaignRooms[campaignId] ?? defaultCampaignRoom;

  if (!campaign) {
    return (
      <AppShell eyebrow="Campaign" title="Campaign not found." description="This campaign no longer exists or was never created.">
        <Button asChild variant="outline">
          <Link to="/campaigns">Back to campaigns</Link>
        </Button>
      </AppShell>
    );
  }

  const content = calendarItems.filter((c) => c.campaign === campaign.name);

  return (
    <AppShell
      eyebrow={`Campaign · ${campaign.status}`}
      title={campaign.name}
      description={campaign.idea}
      actions={
        <>
          <Button asChild variant="ghost" className="gap-1.5">
            <Link to="/campaigns">
              <ArrowLeft className="size-4" /> All campaigns
            </Link>
          </Button>
          <Button className="gap-1.5" onClick={() => toast("Regenerating campaign assets…")}>
            <Sparkles className="size-4" /> Generate missing assets
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

        <TabsContent value="overview" className="mt-8 space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Objective", value: campaign.objective },
              { label: "Budget", value: campaign.budget },
              { label: "Dates", value: campaign.window },
              { label: "Channels", value: campaign.channels.join(", ") },
            ].map((s) => (
              <div key={s.label} className="panel p-5">
                <p className="eyebrow">{s.label}</p>
                <p className="mt-2 text-sm font-semibold leading-snug">{s.value}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="panel p-6">
              <p className="eyebrow">Audience</p>
              <p className="mt-2 text-sm leading-relaxed">{room.audience}</p>
              <p className="eyebrow mt-6">Offer</p>
              <p className="mt-2 text-sm leading-relaxed">{room.offer}</p>
            </div>
            <div className="panel p-6">
              <p className="eyebrow">KPIs</p>
              {room.kpis.length ? (
                <dl className="mt-4 space-y-3">
                  {room.kpis.map((k) => (
                    <div key={k.label} className="flex items-baseline justify-between border-b border-border/60 pb-2 last:border-0">
                      <dt className="text-sm text-muted-foreground">{k.label}</dt>
                      <dd className="font-mono text-sm">
                        {k.actual} <span className="text-muted-foreground">/ {k.target}</span>
                      </dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <p className="mt-3 text-sm text-muted-foreground">No KPI plan yet — generate the strategy first.</p>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="strategy" className="mt-8 grid gap-4 md:grid-cols-2">
          {[
            { label: "Big idea", value: room.bigIdea },
            { label: "Customer insight", value: room.insight },
            { label: "Message", value: room.message },
            { label: "CTA", value: room.cta },
          ].map((s) => (
            <div key={s.label} className="panel p-6">
              <p className="eyebrow">{s.label}</p>
              <p className="mt-3 font-display text-2xl leading-snug">{s.value}</p>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="creative" className="mt-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {room.creative.map((c) => (
              <div key={c.type} className="panel p-5">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">{c.type}</p>
                  <span className="font-mono text-sm text-muted-foreground">
                    {c.done}/{c.total}
                  </span>
                </div>
                <Progress value={(c.done / c.total) * 100} className="mt-3 h-1" />
                <div className="mt-4 flex gap-2">
                  <Button asChild size="sm" variant="outline">
                    <Link to="/editor">Open editor</Link>
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => toast(`Generating remaining ${c.type.toLowerCase()}…`)}>
                    Generate
                  </Button>
                </div>
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
                      {c.platform} · {c.format} · Aug {c.day} {c.time}
                    </p>
                  </div>
                  <Badge variant="secondary">{c.status}</Badge>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No content in this campaign yet."
              body="Generate the content plan and BRANDOS will draft every piece against your brand rules."
              action="Generate content"
            />
          )}
        </TabsContent>

        <TabsContent value="schedule" className="mt-8">
          <div className="panel p-6">
            <p className="eyebrow">Timeline · {campaign.window}</p>
            <div className="mt-6 space-y-4">
              {content.map((c) => (
                <div key={c.id} className="flex items-center gap-4">
                  <span className="w-16 shrink-0 font-mono text-xs text-muted-foreground">Aug {c.day}</span>
                  <div className="h-px flex-1 bg-border" />
                  <span className="rounded-full border border-border bg-card px-3 py-1 text-xs">
                    {c.time} · {c.platform}
                  </span>
                </div>
              ))}
              {!content.length ? <p className="text-sm text-muted-foreground">Nothing scheduled yet.</p> : null}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="distribution" className="mt-8">
          {room.distribution.length ? (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {room.distribution.map((d) => (
                <div key={d.channel} className="panel flex items-center justify-between p-5">
                  <p className="font-medium">{d.channel}</p>
                  <Badge variant={d.state === "Not in plan" ? "outline" : "secondary"}>{d.state}</Badge>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No distribution plan yet."
              body="Choose the channels this campaign should run on and BRANDOS will adapt each asset per platform."
              action="Plan distribution"
            />
          )}
        </TabsContent>

        <TabsContent value="performance" className="mt-8">
          {room.performance.length ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {room.performance.map((p) => (
                <div key={p.label} className="panel p-5">
                  <p className="eyebrow">{p.label}</p>
                  <p className="mt-3 font-display text-4xl">{p.value}</p>
                  <p className="mt-2 text-xs text-muted-foreground">{p.note}</p>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No performance data yet."
              body="Once this campaign is live and accounts are connected, results will be attributed here."
              action="Connect accounts"
            />
          )}
        </TabsContent>

        <TabsContent value="cmo" className="mt-8 space-y-4">
          {room.recommendations.length ? (
            room.recommendations.map((r) => (
              <div key={r.title} className="panel p-6">
                <p className="eyebrow">AI CMO · this campaign</p>
                <h3 className="mt-2 text-2xl leading-snug">{r.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{r.detail}</p>
                <div className="mt-5 flex gap-2">
                  <Button size="sm" onClick={() => toast("Applied to campaign plan")}>
                    Apply
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => toast("Dismissed")}>
                    Dismiss
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <EmptyState
              title="No campaign-specific advice yet."
              body="The AI CMO needs a few days of live results before it can advise on this campaign."
              action="Ask AI CMO"
            />
          )}
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}

function EmptyState({ title, body, action }: { title: string; body: string; action: string }) {
  return (
    <div className="panel flex flex-col items-center gap-3 bg-surface px-6 py-16 text-center">
      <p className="font-display text-2xl">{title}</p>
      <p className="max-w-md text-sm leading-relaxed text-muted-foreground">{body}</p>
      <Button className="mt-2" onClick={() => toast(action)}>
        {action}
      </Button>
    </div>
  );
}
