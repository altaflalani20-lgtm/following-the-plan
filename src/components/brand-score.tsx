import { AlertTriangle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { defaultCompliance, type ComplianceReport } from "@/lib/brandos-v2-data";
import { cn } from "@/lib/utils";

export function BrandScore({
  report = defaultCompliance,
  compact = false,
}: {
  report?: ComplianceReport;
  compact?: boolean;
}) {
  return (
    <div className={cn("panel p-5", compact && "p-4")}>
      <div className="flex items-center justify-between">
        <p className="eyebrow flex items-center gap-1.5">
          <ShieldCheck className="size-3.5 text-success" /> Brand score
        </p>
        <p className="font-display text-3xl leading-none">
          {report.score}
          <span className="text-base text-muted-foreground"> / 100</span>
        </p>
      </div>

      <div className="mt-4 space-y-2.5">
        {report.breakdown.map((b) => (
          <div key={b.label}>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{b.label}</span>
              <span className="font-mono">{b.score}</span>
            </div>
            <Progress value={b.score} className="mt-1 h-1" />
          </div>
        ))}
      </div>

      {report.issues.length ? (
        <div className="mt-5 space-y-3">
          {report.issues.map((issue) => (
            <div key={issue.message} className="rounded-lg border border-warning/40 bg-warning/10 p-3">
              <p className="flex gap-2 text-sm leading-relaxed">
                <AlertTriangle className="mt-0.5 size-4 shrink-0 text-warning-foreground" />
                {issue.message}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <Button size="sm" onClick={() => toast("Fixed automatically", { description: issue.fix })}>
                  Fix automatically
                </Button>
                <Button size="sm" variant="ghost" onClick={() => toast("Issue detail", { description: issue.fix })}>
                  View issue
                </Button>
                <Button size="sm" variant="ghost" onClick={() => toast("Issue ignored for this asset")}>
                  Ignore
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-4 text-xs text-success">No brand rule violations detected.</p>
      )}
    </div>
  );
}
