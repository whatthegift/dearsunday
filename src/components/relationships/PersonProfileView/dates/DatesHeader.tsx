
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { CalendarDays, PlusCircle } from "lucide-react";

interface DatesHeaderProps {
  onAddDate: () => void;
}

export function DatesHeader({ onAddDate }: DatesHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <CardTitle className="text-lg font-medium flex items-center gap-2">
        <CalendarDays className="h-5 w-5 text-gift-lavender" />
        <span>Important Dates</span>
      </CardTitle>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={onAddDate}
        className="flex items-center gap-1"
      >
        <PlusCircle className="h-4 w-4" />
        <span>Add</span>
      </Button>
    </div>
  );
}
