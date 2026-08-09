import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { connectedAccounts } from "@/lib/brandos-data";

export const Route = createFileRoute("/connections")({
  head: () => ({
    meta: [
      { title: "Connected Accounts — BRANDOS" },
      {
        name: "description",
        content: "Connect Instagram, Facebook, Google Business, WhatsApp and more through official OAuth with encrypted token storage.",
      },
      { property: "og:title", content: "Connected Accounts — BRANDOS" },
      { property: "og:description", content: "Official API connections with encrypted tokens and scoped permissions." },
    ],
  }),
  component: ConnectionsPage,
});

function ConnectionsPage() {
  return (
    <AppShell
      eyebrow="Connected accounts"
      title="Real channels, official APIs, encrypted tokens."
      description="Each channel connects through its own OAuth flow. Tokens are stored encrypted server-side and are never exposed to the browser."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {connectedAccounts.map((a) => {
          const connected = a.status === "Connected";
          return (
            <div key={a.name} className="panel flex items-center justify-between gap-4 p-5">
              <div>
                <p className="font-semibold">{a.name}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{a.handle}</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge className={connected ? "border-0 bg-success text-success-foreground" : ""} variant={connected ? "default" : "secondary"}>
                  {a.status}
                </Badge>
                <Button
                  size="sm"
                  variant={connected ? "ghost" : "default"}
                  onClick={() =>
                    toast(connected ? `${a.name} settings` : `Connect ${a.name}`, {
                      description: connected
                        ? "Manage scopes and re-authorise this channel."
                        : "Requires official API access and app review for this platform.",
                    })
                  }
                >
                  {connected ? "Manage" : "Connect"}
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="panel mt-8 bg-surface p-6">
        <p className="eyebrow">How publishing works</p>
        <p className="mt-3 font-display text-2xl leading-snug">
          Browser → BRANDOS API → publishing service → queue → platform adapter → platform API → result → notification
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Live publishing requires approved developer access and permissions from each platform. Until a channel is
          connected and approved, BRANDOS will never claim that content was published.
        </p>
      </div>
    </AppShell>
  );
}
