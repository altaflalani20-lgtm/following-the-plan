import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Sparkles } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  calendarItems,
  campaigns,
  contentPillars,
  contentStatuses,
  type ContentStatus,
} from "@/lib/brandos-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/calendar")({
  head: () => ({
    meta: [
      { title: "Content Calendar — BRANDOS" },
      {
        name: "description",
        content:
          "Plan, filter, approve and schedule every post across channels with month, week, day and list views built for approval workflows.",
      },
      { property: "og:title", content: "Content Calendar — BRANDOS" },
      {
        property: "og:description",
        content: "Month, week, day and list views with draft, review, approved, scheduled and published states.",
      },
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

const views = ["month", "week", "day", "list"] as const;
type View = (typeof views)[number];

const ALL = "all";

function CalendarPage() {
  const [view, setView] = useState<View>("month");
  const [campaign, setCampaign] = useState(ALL);
  const [platform, setPlatform] = useState(ALL);
  const [format, setFormat] = useState(ALL);
  const [status, setStatus] = useState(ALL);
  const [builderOpen, setBuilderOpen] = useState(false);
  const [plan, setPlan] = useState(false);

  const platforms = useMemo(() => [...new Set(calendarItems.map((c) => c.platform))], []);
  const formats = useMemo(() => [...new Set(calendarItems.map((c) => c.format))], []);

  const items = useMemo(
    () =>
      calendarItems.filter(
        (c) =>
          (campaign === ALL || c.campaign === campaign) &&
          (platform === ALL || c.platform === platform) &&
          (format === ALL || c.format === format) &&
          (status === ALL || c.status === status),
      ),
    [campaign, platform, format, status],
  );

  const days = Array.from({ length: 35 }, (_, i) => i - 2);
  const weekDays = [8, 9, 10, 11, 12, 13, 14];
  const dayFocus = 8;

  const openItem = (title: string, meta: string) => toast(title, { description: meta });

  const ItemCard = ({
    item,
  }: {
    item: (typeof calendarItems)[number];
  }) => (
    <button
      onClick={() => openItem(item.title, `${item.platform} · ${item.format} · ${item.status}`)}
      className="w-full rounded-md border border-border bg-card p-1.5 text-left transition-colors hover:border-ring"
    >
      <p className="truncate text-[11px] font-medium leading-tight">{item.title}</p>
      <span className={cn("mt-1 inline-block rounded px-1 py-0.5 text-[9px] font-semibold uppercase tracking-wide", statusTone[item.status])}>
        {item.status}
      </span>
    </button>
  );

  return (
    <AppShell
      eyebrow="Content calendar · August"
      title="Every post, every channel, one approval trail."
      description="Filter by campaign, platform, format or status. Nothing leaves BRANDOS until it is approved."
      actions={
        <>
          <div className="flex rounded-lg border border-border p-0.5">
            {views.map((v) => (
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
          <Button className="gap-1.5" onClick={() => setBuilderOpen(true)}>
            <Sparkles className="size-4" /> Fill my calendar
          </Button>
        </>
      }
    >
      <div className="mb-6 flex flex-wrap gap-2">
        <Filter label="Campaign" value={campaign} onChange={setCampaign} options={campaigns.map((c) => c.name)} />
        <Filter label="Platform" value={platform} onChange={setPlatform} options={platforms} />
        <Filter label="Type" value={format} onChange={setFormat} options={formats} />
        <Filter label="Status" value={status} onChange={setStatus} options={[...contentStatuses]} />
        {[campaign, platform, format, status].some((f) => f !== ALL) ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setCampaign(ALL);
              setPlatform(ALL);
              setFormat(ALL);
              setStatus(ALL);
            }}
          >
            Clear filters
          </Button>
        ) : null}
      </div>

      {items.length === 0 ? (
        <div className="panel grid place-items-center p-16 text-center">
          <div className="max-w-sm">
            <p className="font-display text-2xl">Nothing matches these filters.</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Clear the filters, or let AI build a 30-day plan around your goals.
            </p>
            <Button className="mt-5" onClick={() => setBuilderOpen(true)}>
              Create my calendar
            </Button>
          </div>
        </div>
      ) : view === "month" ? (
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
              const dayItems = items.filter((c) => c.day === day);
              return (
                <div
                  key={i}
                  className={cn("min-h-28 border-b border-r border-border p-2 last:border-r-0", !inMonth && "bg-surface/60")}
                >
                  <span className={cn("text-xs", inMonth ? "text-muted-foreground" : "text-muted-foreground/40")}>
                    {inMonth ? day : ""}
                  </span>
                  <div className="mt-1.5 space-y-1.5">
                    {dayItems.map((item) => (
                      <ItemCard key={item.id} item={item} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : view === "week" ? (
        <div className="panel grid overflow-hidden md:grid-cols-7">
          {weekDays.map((day) => (
            <div key={day} className="min-h-64 border-b border-r border-border p-3 last:border-r-0">
              <p className="text-xs font-semibold text-muted-foreground">Aug {day}</p>
              <div className="mt-2 space-y-1.5">
                {items
                  .filter((c) => c.day === day)
                  .map((item) => (
                    <ItemCard key={item.id} item={item} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      ) : view === "day" ? (
        <div className="panel divide-y divide-border">
          <div className="px-6 py-4">
            <p className="eyebrow">Friday, August {dayFocus}</p>
          </div>
          {Array.from({ length: 12 }, (_, i) => 9 + i).map((hour) => {
            const slot = items.filter((c) => c.day === dayFocus && Number(c.time.split(":")[0]) === hour);
            return (
              <div key={hour} className="flex gap-4 px-6 py-3">
                <span className="w-14 shrink-0 font-mono text-xs text-muted-foreground">{String(hour).padStart(2, "0")}:00</span>
                <div className="flex-1 space-y-1.5">
                  {slot.length ? (
                    slot.map((item) => <ItemCard key={item.id} item={item} />)
                  ) : (
                    <span className="text-xs text-muted-foreground/50">—</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="panel divide-y divide-border">
          {items.map((item) => (
            <div key={item.id} className="flex flex-wrap items-center gap-4 px-6 py-4">
              <span className="w-16 shrink-0 font-mono text-xs text-muted-foreground">
                Aug {item.day}
                <br />
                {item.time}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-medium">{item.title}</p>
                <p className="text-xs text-muted-foreground">
                  {item.platform} · {item.format} · {item.campaign}
                </p>
              </div>
              <Badge variant="secondary">{item.status}</Badge>
              <div className="flex gap-1">
                <Button size="sm" variant="ghost" onClick={() => toast(`Editing ${item.title}`)}>
                  Edit
                </Button>
                <Button size="sm" variant="ghost" onClick={() => toast("Regenerating…")}>
                  Regenerate
                </Button>
                <Button size="sm" variant="outline" onClick={() => toast("Approved", { description: item.title })}>
                  Approve
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={builderOpen} onOpenChange={setBuilderOpen}>
        <DialogContent className="max-h-[88vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-display text-3xl leading-tight">Let AI build your content plan</DialogTitle>
            <DialogDescription>
              Describe the month. BRANDOS balances the pillars and leaves room for reactive content.
            </DialogDescription>
          </DialogHeader>

          <Textarea rows={3} defaultValue="Create my September content plan around weekend orders and the Marina launch." />

          {!plan ? (
            <Button onClick={() => setPlan(true)}>Generate plan</Button>
          ) : (
            <div className="space-y-4">
              <div className="panel p-5">
                <p className="eyebrow">Proposed plan</p>
                <p className="mt-2 font-display text-2xl">30 days · 5 campaigns · 42 pieces of content</p>
                <div className="mt-4 space-y-2">
                  {contentPillars.map((p) => (
                    <div key={p.pillar} className="flex items-center gap-3">
                      <span className="w-40 shrink-0 text-sm text-muted-foreground">{p.pillar}</span>
                      <div className="h-1.5 flex-1 rounded-full bg-surface">
                        <div className="h-1.5 rounded-full bg-accent" style={{ width: `${p.share * 4}%` }} />
                      </div>
                      <span className="w-10 text-right font-mono text-xs text-muted-foreground">{p.share}%</span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs text-muted-foreground">
                  8 slots are intentionally left open for reactive and trending content.
                </p>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2 sm:justify-between">
            <Button
              variant="ghost"
              onClick={() => {
                setBuilderOpen(false);
                setPlan(false);
                toast("Review individually", { description: "42 drafts added to the calendar as Needs Review." });
              }}
            >
              Review individually
            </Button>
            <Button
              disabled={!plan}
              onClick={() => {
                setBuilderOpen(false);
                setPlan(false);
                toast("Calendar filled", { description: "All 42 drafts accepted and awaiting scheduling approval." });
              }}
            >
              Accept entire calendar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}

function Filter({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-auto min-w-40">
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={ALL}>{label}: all</SelectItem>
        {options.map((o) => (
          <SelectItem key={o} value={o}>
            {o}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
