import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { calendarItems, type ContentStatus } from "@/lib/brandos-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/calendar")({
  head: () => ({
    meta: [
      { title: "Content Calendar — BRANDOS" },
      {
        name: "description",
        content: "Plan, approve and schedule every post across channels with a month view built for approval workflows.",
      },
      { property: "og:title", content: "Content Calendar — BRANDOS" },
      { property: "og:description", content: "Month and list views with draft, review, approved, scheduled and published states." },
    ],
  }),
  component: CalendarPage,
});

const statusTone: Record<ContentStatus, string> = {
  Draft: "bg-muted text-muted-foreground",
  "AI Generated": "bg-accent/15 text-accent",
  "Needs Review": "bg-warning/20 text-warning-foreground",
  Approved: "bg-success/15 text-success",
  Scheduled: "bg-primary/10 text-foreground",
  Published: "bg-success text-success-foreground",
  Failed: "bg-destructive/15 text-destructive",
};

function CalendarPage() {
  const [view, setView] = useState<"month" | "list">("month");
  const days = Array.from({ length: 35 }, (_, i) => i - 2);

  return (
    <AppShell
      eyebrow="Content calendar · August"
      title="Every post, every channel, one approval trail."
      description="Cards carry platform, format, campaign and status. Nothing leaves BRANDOS until it is approved."
      actions={
        <>
          <div className="flex rounded-lg border border-border p-0.5">
            {(["month", "list"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm capitalize transition-colors",
                  view === v ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {v}
              </button>
            ))}
          </div>
          <Button onClick={() => toast("Filling calendar…", { description: "12 drafts generated for review." })}>
            Fill my calendar
          </Button>
        </>
      }
    >
      {view === "month" ? (
        <div className="panel overflow-hidden">
          <div className="grid grid-cols-7 border-b border-border bg-surface">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
              <div key={d} className="px-3 py-2.5 text-center text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                {d}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {days.map((day, i) => {
              const inMonth = day >= 1 && day <= 31;
              const items = calendarItems.filter((c) => c.day === day);
              return (
                <div
                  key={i}
                  className={cn(
                    "min-h-28 border-b border-r border-border p-2 last:border-r-0",
                    !inMonth && "bg-surface/60",
                  )}
                >
                  <span className={cn("text-xs", inMonth ? "text-muted-foreground" : "text-muted-foreground/40")}>
                    {inMonth ? day : ""}
                  </span>
                  <div className="mt-1.5 space-y-1.5">
                    {items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => toast(item.title, { description: `${item.platform} · ${item.format} · ${item.status}` })}
                        className="w-full rounded-md border border-border bg-card p-1.5 text-left transition-colors hover:border-ring"
                      >
                        <span className={cn("inline-block rounded px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide", statusTone[item.status])}>
                          {item.status}
                        </span>
                        <p className="mt-1 line-clamp-2 text-[11px] font-medium leading-tight">{item.title}</p>
                        <p className="mt-0.5 text-[10px] text-muted-foreground">
                          {item.time} · {item.platform}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="panel divide-y divide-border">
          {calendarItems.map((item) => (
            <div key={item.id} className="flex flex-wrap items-center gap-4 px-6 py-4">
              <div className="w-16 shrink-0">
                <p className="font-display text-2xl leading-none">Aug {item.day}</p>
                <p className="text-xs text-muted-foreground">{item.time}</p>
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium">{item.title}</p>
                <p className="text-xs text-muted-foreground">
                  {item.platform} · {item.format} · {item.campaign}
                </p>
              </div>
              <Badge className={cn("border-0", statusTone[item.status])}>{item.status}</Badge>
              <div className="flex gap-1">
                <Button size="sm" variant="ghost" onClick={() => toast("Opening editor…")}>
                  Edit
                </Button>
                <Button size="sm" variant="ghost" onClick={() => toast("Approved for scheduling")}>
                  Approve
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AppShell>
  );
}
