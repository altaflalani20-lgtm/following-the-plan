import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { kpis, performanceSeries, channelMix } from "@/lib/brandos-data";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const Route = createFileRoute("/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics — BRANDOS" },
      {
        name: "description",
        content: "Reach, engagement, leads and channel mix with the source and date range shown on every metric.",
      },
      { property: "og:title", content: "Analytics — BRANDOS" },
      { property: "og:description", content: "Marketing, social, campaign and reputation KPIs in one editorial dashboard." },
    ],
  }),
  component: AnalyticsPage,
});

function AnalyticsPage() {
  return (
    <AppShell
      eyebrow="Analytics · last 6 months"
      title="Numbers with their sources attached."
      description="Every metric shows where it came from and over what window. Modelled figures are labelled as estimates."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.label} className="panel p-5">
            <p className="eyebrow">{k.label}</p>
            <p className="mt-3 font-display text-4xl">{k.value}</p>
            <p className="mt-3 border-t border-border pt-3 text-[11px] text-muted-foreground">{k.source}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="panel p-6">
          <p className="eyebrow">Reach (thousands) · Meta + Google</p>
          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceSeries}>
                <defs>
                  <linearGradient id="reachFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-popover)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 8,
                    color: "var(--color-popover-foreground)",
                    fontSize: 12,
                  }}
                />
                <Area type="monotone" dataKey="reach" stroke="var(--color-chart-1)" strokeWidth={2} fill="url(#reachFill)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="panel p-6">
          <p className="eyebrow">Leads per month · BRANDOS CRM</p>
          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceSeries}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  cursor={{ fill: "var(--color-muted)" }}
                  contentStyle={{
                    background: "var(--color-popover)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 8,
                    color: "var(--color-popover-foreground)",
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="leads" fill="var(--color-chart-2)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="panel mt-6 overflow-hidden">
        <div className="grid grid-cols-3 border-b border-border bg-surface px-6 py-3">
          <p className="eyebrow">Channel</p>
          <p className="eyebrow">Posts (30d)</p>
          <p className="eyebrow">Reach (thousands)</p>
        </div>
        {channelMix.map((c) => (
          <div key={c.channel} className="grid grid-cols-3 items-center border-b border-border px-6 py-4 text-sm last:border-0">
            <p className="font-medium">{c.channel}</p>
            <p className="text-muted-foreground">{c.posts}</p>
            <div className="flex items-center gap-3">
              <div className="h-1.5 w-32 overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-accent" style={{ width: `${c.reach}%` }} />
              </div>
              <span className="text-muted-foreground">{c.reach}K</span>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
