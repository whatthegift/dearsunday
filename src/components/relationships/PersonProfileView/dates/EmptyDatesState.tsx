
import { CalendarPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyDatesStateProps {
  onAddDate: () => void;
}

export function EmptyDatesState({ onAddDate }: EmptyDatesStateProps) {
  return (
    <div className="bg-muted p-6 rounded-lg text-center">
      <CalendarPlus className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
      <p className="text-muted-foreground">No important dates added yet</p>
      <p className="text-sm text-muted-foreground mt-1">
        Remember birthdays, anniversaries, and special moments
      </p>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={onAddDate}
        className="mt-4 flex items-center gap-1 hover:bg-background/80 transition-colors"
      >
        <CalendarPlus className="h-4 w-4" />
        Add First Date
      </Button>
    </div>
  );
}
