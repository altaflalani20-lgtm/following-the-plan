import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Sparkles, Target } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { businessGoals, type BusinessGoal } from "@/lib/brandos-data";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function CreateFlow({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const navigate = useNavigate();
  const [goal, setGoal] = useState<BusinessGoal | null>(null);

  const close = () => {
    onOpenChange(false);
    setTimeout(() => setGoal(null), 200);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        onOpenChange(o);
        if (!o) setTimeout(() => setGoal(null), 200);
      }}
    >
      <DialogContent className="max-h-[88vh] overflow-y-auto sm:max-w-3xl">
        {!goal ? (
          <>
            <DialogHeader>
              <DialogTitle className="font-display text-3xl leading-tight">
                What do you want your business to achieve?
              </DialogTitle>
              <DialogDescription>
                Pick an outcome. BRANDOS decides what needs to be created to get you there.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-2.5 py-2 sm:grid-cols-2">
              {businessGoals.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setGoal(g)}
                  className={cn(
                    "group rounded-xl border border-border bg-card p-4 text-left transition-colors",
                    "hover:border-ring hover:bg-surface",
                  )}
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-surface text-accent transition-colors group-hover:bg-accent/10">
                      <Target className="size-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-semibold leading-snug">{g.label}</span>
                      <span className="mt-0.5 block text-sm text-muted-foreground">{g.blurb}</span>
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <button
                onClick={() => setGoal(null)}
                className="mb-1 flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="size-3.5" /> All goals
              </button>
              <p className="eyebrow">You said · {goal.label}</p>
              <DialogTitle className="font-display text-3xl leading-tight">{goal.aiPlan}</DialogTitle>
              <DialogDescription>
                Here is what the AI CMO recommends producing. Everything lands as a draft for your approval.
              </DialogDescription>
            </DialogHeader>

            <div className="rounded-xl border border-border bg-surface p-5">
              <p className="eyebrow">Proposed deliverables</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {goal.deliverables.map((d) => (
                  <Badge key={d.label} variant="outline" className="bg-card">
                    {d.count} × {d.label}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <p className="eyebrow">Anything specific? (optional)</p>
              <Textarea
                rows={3}
                className="mt-2"
                placeholder="e.g. focus on the Marina location and keep the tone family-first"
              />
            </div>

            <p className="text-xs text-muted-foreground">
              Estimates are modelled from your demo workspace data. Nothing publishes until you approve it.
            </p>

            <DialogFooter className="gap-2 sm:justify-between">
              <Button
                variant="ghost"
                onClick={() => {
                  close();
                  navigate({ to: "/campaigns" });
                  toast("Customize campaign", { description: "Opened the campaign builder with your goal pre-filled." });
                }}
              >
                Customize
              </Button>
              <Button
                className="gap-1.5"
                onClick={() => {
                  close();
                  navigate({ to: "/campaign/$campaignId", params: { campaignId: "cmp-1" } });
                  toast("Campaign generated as draft", {
                    description: "Strategy, creative brief and schedule are ready for review.",
                  });
                }}
              >
                <Sparkles className="size-4" /> Generate campaign
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
