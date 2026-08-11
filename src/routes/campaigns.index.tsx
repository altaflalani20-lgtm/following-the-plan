import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { campaigns } from "@/lib/brandos-data";

export const Route = createFileRoute("/campaigns/")({
  head: () => ({
    meta: [
      { title: "Campaigns — BRANDOS" },
      {
        name: "description",
        content: "Brief an objective and BRANDOS drafts the big idea, channel plan, creative concepts and measurement plan.",
      },
      { property: "og:title", content: "Campaigns — BRANDOS" },
      { property: "og:description", content: "Campaign builder with strategy, assets, schedule and performance in one place." },
    ],
  }),
  component: CampaignsPage,
});

const steps = [
  "Objective",
  "Product",
  "Audience",
  "Offer",
  "Location",
  "Budget",
  "Dates",
  "Channels",
];

function CampaignsPage() {
  const [step, setStep] = useState(0);
  const [open, setOpen] = useState(false);

  return (
    <AppShell
      eyebrow="Campaigns"
      title="From one objective to a complete campaign."
      description="Every campaign carries its strategy, creative, schedule and measurement plan. Launches always require approval."
      actions={
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Create campaign</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-display text-2xl">New campaign</DialogTitle>
              <DialogDescription>
                Step {step + 1} of {steps.length} · {steps[step]}
              </DialogDescription>
            </DialogHeader>

            <Progress value={((step + 1) / steps.length) * 100} className="h-1" />

            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="field">{steps[step]}</Label>
                {step === 3 || step === 2 ? (
                  <Textarea id="field" placeholder={`Describe the ${steps[step]!.toLowerCase()}…`} rows={4} />
                ) : (
                  <Input id="field" placeholder={`Enter ${steps[step]!.toLowerCase()}…`} />
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                BRANDOS will draft the name, big idea, messaging, content plan and measurement plan from these answers.
              </p>
            </div>

            <DialogFooter className="gap-2 sm:justify-between">
              <Button variant="ghost" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>
                Back
              </Button>
              {step < steps.length - 1 ? (
                <Button onClick={() => setStep((s) => s + 1)}>Continue</Button>
              ) : (
                <Button
                  onClick={() => {
                    setOpen(false);
                    setStep(0);
                    toast("Campaign draft generated", {
                      description: "Strategy, creative concepts and schedule are ready for review.",
                    });
                  }}
                >
                  Generate entire campaign
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      }
    >
      <div className="grid gap-4 md:grid-cols-2">
        {campaigns.map((c) => (
          <article key={c.id} className="panel flex flex-col p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow">{c.objective}</p>
                <h2 className="mt-2 text-2xl leading-tight">{c.name}</h2>
              </div>
              <Badge
                variant={c.status === "Live" ? "default" : c.status === "Needs review" ? "destructive" : "secondary"}
              >
                {c.status}
              </Badge>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{c.idea}</p>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {c.channels.map((ch) => (
                <Badge key={ch} variant="outline">
                  {ch}
                </Badge>
              ))}
            </div>

            <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-5 text-sm">
              <div>
                <dt className="eyebrow">Budget</dt>
                <dd className="mt-1 font-semibold">{c.budget}</dd>
              </div>
              <div>
                <dt className="eyebrow">Window</dt>
                <dd className="mt-1 font-semibold">{c.window}</dd>
              </div>
            </dl>

            <div className="mt-5">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Content produced</span>
                <span>{c.progress}%</span>
              </div>
              <Progress value={c.progress} className="mt-2 h-1" />
            </div>

            <div className="mt-6 flex gap-2">
              <Button size="sm" variant="outline" onClick={() => toast(`Opening ${c.name}`)}>
                Open
              </Button>
              <Button size="sm" variant="ghost" onClick={() => toast("Regenerating campaign assets…")}>
                Regenerate assets
              </Button>
            </div>
          </article>
        ))}
      </div>
    </AppShell>
  );
}
