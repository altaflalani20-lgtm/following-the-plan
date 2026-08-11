import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { businessGoals, type BusinessGoal } from "@/lib/brandos-v2-data";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function GoalCreateDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [goal, setGoal] = useState<BusinessGoal | null>(null);
  const navigate = useNavigate();

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
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-3xl">
        {!goal ? (
          <>
            <DialogHeader>
              <DialogDescription className="eyebrow">Create</DialogDescription>
              <DialogTitle className="font-display text-3xl leading-tight">
                What do you want your business to achieve?
              </DialogTitle>
              <DialogDescription>
                Pick an outcome. BRANDOS decides what needs to be created to get there.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {businessGoals.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setGoal(g)}
                  className={cn(
                    "rounded-xl border border-border bg-card p-4 text-left transition-all",
                    "hover:-translate-y-0.5 hover:border-ring hover:shadow-sm",
                  )}
                >
                  <p className="font-display text-xl leading-snug">{g.label}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{g.hint}</p>
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <button
                onClick={() => setGoal(null)}
                className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="size-3.5" /> All goals
              </button>
              <DialogDescription className="eyebrow pt-2">Your goal · {goal.label}</DialogDescription>
              <DialogTitle className="font-display text-3xl leading-tight">{goal.plan.headline}</DialogTitle>
            </DialogHeader>

            <p className="text-sm leading-relaxed text-muted-foreground">{goal.plan.rationale}</p>

            <div className="mt-2 rounded-xl border border-border bg-surface p-5">
              <div className="flex items-center justify-between">
                <p className="eyebrow">Recommended output</p>
                <Badge variant="outline">{goal.plan.duration}</Badge>
              </div>
              <ul className="mt-4 space-y-2">
                {goal.plan.deliverables.map((d) => (
                  <li key={d.label} className="flex items-center justify-between border-b border-border/60 pb-2 text-sm last:border-0 last:pb-0">
                    <span>{d.label}</span>
                    <span className="font-mono text-xs text-muted-foreground">× {d.count}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-muted-foreground">
                Volumes are AI estimates from your history — adjust them before generating.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                className="gap-1.5"
                onClick={() => {
                  close();
                  toast("Generating campaign…", {
                    description: `${goal.plan.headline} — strategy first, then creative. Nothing publishes without approval.`,
                  });
                  navigate({ to: "/campaigns" });
                }}
              >
                <Sparkles className="size-4" /> Generate campaign
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  close();
                  navigate({ to: "/campaigns" });
                }}
              >
                Customise
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
