import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { publishingQueue, calendarItems } from "@/lib/brandos-data";

export const Route = createFileRoute("/publishing")({
  head: () => ({
    meta: [
      { title: "Publishing Center — BRANDOS" },
      {
        name: "description",
        content: "Queue, approvals, published history and failed jobs with retry, reconnect and reschedule actions.",
      },
      { property: "og:title", content: "Publishing Center — BRANDOS" },
      { property: "og:description", content: "Server-side publishing jobs with a clear approval gate and failure recovery." },
    ],
  }),
  component: PublishingPage,
});

function PublishingPage() {
  const approvals = calendarItems.filter((c) => c.status === "Needs Review");
  const published = calendarItems.filter((c) => c.status === "Published");

  return (
    <AppShell
      eyebrow="Publishing center"
      title="Jobs, not guesses."
      description="Publishing runs server-side through official platform APIs. Credentials never touch the browser, and nothing goes out unapproved."
    >
      <Tabs defaultValue="queue">
        <TabsList>
          <TabsTrigger value="queue">Queue</TabsTrigger>
          <TabsTrigger value="approval">Approval</TabsTrigger>
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="failed">Failed</TabsTrigger>
        </TabsList>

        <TabsContent value="queue" className="mt-8">
          <div className="panel divide-y divide-border">
            {publishingQueue
              .filter((q) => q.state === "Queued")
              .map((q) => (
                <div key={q.id} className="flex flex-wrap items-center gap-4 px-6 py-4">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">{q.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {q.platform} · {q.when}
                    </p>
                  </div>
                  <Badge variant="secondary">{q.state}</Badge>
                  <Button size="sm" variant="ghost" onClick={() => toast("Rescheduled")}>
                    Reschedule
                  </Button>
                </div>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="approval" className="mt-8">
          <div className="panel divide-y divide-border">
            {approvals.map((a) => (
              <div key={a.id} className="flex flex-wrap items-center gap-4 px-6 py-4">
                <div className="min-w-0 flex-1">
                  <p className="font-medium">{a.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {a.platform} · Aug {a.day} {a.time} · {a.campaign}
                  </p>
                </div>
                <Button size="sm" onClick={() => toast("Approved — moved to queue")}>
                  Approve
                </Button>
                <Button size="sm" variant="ghost" onClick={() => toast("Sent back to the creator")}>
                  Request changes
                </Button>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="published" className="mt-8">
          <div className="panel divide-y divide-border">
            {published.map((p) => (
              <div key={p.id} className="flex flex-wrap items-center gap-4 px-6 py-4">
                <div className="min-w-0 flex-1">
                  <p className="font-medium">{p.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {p.platform} · Aug {p.day} {p.time}
                  </p>
                </div>
                <Badge className="border-0 bg-success text-success-foreground">Published</Badge>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="failed" className="mt-8">
          <div className="panel divide-y divide-border">
            {publishingQueue
              .filter((q) => q.state === "Failed")
              .map((q) => (
                <div key={q.id} className="px-6 py-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="font-medium">{q.title}</p>
                    <Badge variant="destructive">Failed</Badge>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {q.platform} · {q.when}
                  </p>
                  <p className="mt-3 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                    {q.error}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button size="sm" onClick={() => toast("Retrying job…")}>
                      Retry
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => toast("Opening connection settings")}>
                      Reconnect account
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => toast("Rescheduled")}>
                      Reschedule
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}
