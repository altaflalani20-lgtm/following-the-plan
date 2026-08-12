import { Link, useRouterState } from "@tanstack/react-router";
import {
  Sparkles,
  LayoutDashboard,
  Compass,
  Palette,
  Megaphone,
  Wand2,
  CalendarDays,
  Star,
  BarChart3,
  Plug,
  Search,
  Bell,
  Plus,
  ChevronDown,
} from "lucide-react";
import { type ReactNode, useEffect, useState } from "react";
import { business } from "@/lib/brandos-data";
import { Button } from "@/components/ui/button";
import { CommandPalette } from "@/components/command-palette";
import { CreateFlow } from "@/components/create-flow";
import { cn } from "@/lib/utils";

const nav = [
  {
    group: "Intelligence",
    items: [
      { to: "/", label: "AI CMO", icon: Sparkles },
      { to: "/analytics", label: "Analytics", icon: BarChart3 },
    ],
  },
  {
    group: "Brand",
    items: [
      { to: "/brand", label: "Brand Workspace", icon: Compass },
      { to: "/studio", label: "Creative Studio", icon: Palette },
    ],
  },
  {
    group: "Marketing",
    items: [
      { to: "/campaigns", label: "Campaigns", icon: Megaphone },
      { to: "/calendar", label: "Content Calendar", icon: CalendarDays },
      { to: "/publishing", label: "Publishing Center", icon: Wand2 },
    ],
  },
  {
    group: "Growth",
    items: [
      { to: "/reputation", label: "Reputation", icon: Star },
      { to: "/connections", label: "Connected Accounts", icon: Plug },
    ],
  },
] as const;

export function AppShell({
  eyebrow,
  title,
  description,
  actions,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
      <CreateFlow open={createOpen} onOpenChange={setCreateOpen} />

      <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col border-r border-sidebar-border bg-sidebar lg:flex">
        <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-6">
          <span className="size-2 rounded-full bg-accent" />
          <span className="font-display text-xl tracking-tight text-sidebar-foreground">BRANDOS</span>
        </div>

        <button
          onClick={() => setPaletteOpen(true)}
          className="mx-4 mt-4 flex items-center justify-between rounded-lg border border-sidebar-border bg-background px-3 py-2 text-left text-sm text-muted-foreground transition-colors hover:border-ring"
        >
          <span className="flex items-center gap-2">
            <Search className="size-3.5" /> Search
          </span>
          <kbd className="font-mono text-[10px] text-muted-foreground">⌘K</kbd>
        </button>

        <nav className="flex-1 space-y-6 overflow-y-auto px-4 py-6">
          {nav.map((section) => (
            <div key={section.group}>
              <p className="eyebrow px-2 pb-2">{section.group}</p>
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const active = pathname === item.to;
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      className={cn(
                        "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors",
                        active
                          ? "bg-sidebar-accent font-semibold text-sidebar-accent-foreground"
                          : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
                      )}
                    >
                      <item.icon className={cn("size-4", active && "text-accent")} />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="border-t border-sidebar-border p-4">
          <div className="flex items-center gap-3">
            <div className="grid size-9 place-items-center rounded-lg bg-primary font-display text-base text-primary-foreground">
              SH
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{business.name}</p>
              <p className="truncate text-xs text-muted-foreground">{business.type}</p>
            </div>
          </div>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-border bg-background/85 px-5 backdrop-blur-md sm:px-8">
          <button className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium transition-colors hover:bg-muted">
            <LayoutDashboard className="size-4 text-muted-foreground" />
            {business.name}
            <ChevronDown className="size-3.5 text-muted-foreground" />
          </button>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setPaletteOpen(true)}>
              <Search className="size-4" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Notifications">
              <Bell className="size-4" />
            </Button>
            <Button onClick={() => setCreateOpen(true)} className="gap-1.5">
              <Plus className="size-4" /> Create
            </Button>
          </div>
        </header>

        <main className="px-5 pb-24 pt-10 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-wrap items-end justify-between gap-6 pb-10">
              <div className="max-w-2xl">
                <p className="eyebrow">{eyebrow}</p>
                <h1 className="display-xl mt-3">{title}</h1>
                {description ? (
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">{description}</p>
                ) : null}
              </div>
              {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
            </div>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
