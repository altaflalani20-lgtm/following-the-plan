import { useNavigate } from "@tanstack/react-router";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { toast } from "sonner";

export function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const navigate = useNavigate();

  const go = (to: string) => {
    onOpenChange(false);
    navigate({ to });
  };

  const stub = (label: string) => {
    onOpenChange(false);
    toast(`${label}`, { description: "Generation runs once AI and channel access are connected." });
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search BRANDOS or type a command…" />
      <CommandList>
        <CommandEmpty>No results.</CommandEmpty>
        <CommandGroup heading="Create">
          <CommandItem onSelect={() => go("/campaigns")}>Create campaign</CommandItem>
          <CommandItem onSelect={() => stub("Poster brief opened")}>Create poster</CommandItem>
          <CommandItem onSelect={() => go("/studio")}>Create Reel</CommandItem>
          <CommandItem onSelect={() => stub("Calendar fill queued")}>Generate content calendar</CommandItem>
        </CommandGroup>
        <CommandGroup heading="Navigate">
          <CommandItem onSelect={() => go("/")}>Open AI CMO</CommandItem>
          <CommandItem onSelect={() => go("/brand")}>Open brand workspace</CommandItem>
          <CommandItem onSelect={() => go("/calendar")}>Open content calendar</CommandItem>
          <CommandItem onSelect={() => go("/publishing")}>Open publishing center</CommandItem>
          <CommandItem onSelect={() => go("/reputation")}>View reviews</CommandItem>
          <CommandItem onSelect={() => go("/analytics")}>Open analytics</CommandItem>
          <CommandItem onSelect={() => go("/connections")}>Connect account</CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
