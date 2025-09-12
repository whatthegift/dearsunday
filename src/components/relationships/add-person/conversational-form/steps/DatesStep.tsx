
import React from "react";
import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react";
import { BaseStepLayout } from "./BaseStepLayout";
import { ImportantDatesSection } from "../../../dates/ImportantDatesSection";
import { Anniversary } from "@/hooks/use-relationships";

interface DatesStepProps {
  onAddDate: () => void;
  importantDates: Anniversary[];
  refreshDates: () => Promise<void>;
  relationshipId?: string | null;
}

export function DatesStep({ 
  onAddDate, 
  importantDates, 
  refreshDates, 
  relationshipId 
}: DatesStepProps) {
  return (
    <BaseStepLayout
      emoji="🎂"
      title="Important dates to remember"
      description="Their birthday? Anniversary? The day you met? Let's save those moments too."
    >
      <div className="space-y-4">
        {relationshipId && (
          <ImportantDatesSection 
            relationshipId={relationshipId}
            dates={importantDates}
            onDatesChange={() => {}}
          />
        )}
        
        <Button 
          type="button" 
          onClick={onAddDate} 
          variant="outline" 
          className="w-full flex items-center gap-2"
        >
          <CalendarDays className="h-4 w-4" />
          Add a date to remember
        </Button>
        
        {!relationshipId && (
          <p className="text-sm text-muted-foreground text-center">
            You'll be able to add dates after saving the person
          </p>
        )}
      </div>
    </BaseStepLayout>
  );
}
