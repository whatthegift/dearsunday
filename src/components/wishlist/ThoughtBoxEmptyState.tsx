
import { Button } from "@/components/ui/button";
import { LightbulbIcon, Plus } from "lucide-react";

interface ThoughtBoxEmptyStateProps {
  onAddIdea: () => void;
}

export function ThoughtBoxEmptyState({
  onAddIdea
}: ThoughtBoxEmptyStateProps) {
  return <div className="flex flex-col items-center justify-center py-12 px-4 text-center border-2 border-dashed border-muted-foreground/30 rounded-lg">
      <div className="bg-muted rounded-full p-3 mb-4">
        <LightbulbIcon className="h-8 w-8 text-primary" />
      </div>
      <h3 className="mb-2 text-base font-semibold">Your ThoughtBox</h3>
      <p className="text-muted-foreground mt-1 text-sm font-thin">
        You haven't saved any gifts to your ThoughtBox yet. Don't worry - when something feels right, just tap 'Save'.
      </p>
      <Button onClick={onAddIdea} className="flex items-center gap-2 my-[10px]">
        <Plus className="h-4 w-4" />
        <span>Get Ideas from Sunday</span>
      </Button>
    </div>;
}
