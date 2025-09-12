
import React from "react";
import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react";
import { BaseStepLayout } from "./BaseStepLayout";
import { ImportantDatesSection } from "../../../dates/ImportantDatesSection";
import DatesList from "../../../dates/DatesList";
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
        {relationshipId ? (
          <ImportantDatesSection 
            relationshipId={relationshipId}
            dates={importantDates}
            onDatesChange={() => {}}
          />
        ) : (
          <>
            {importantDates.length > 0 && (
              <div className="mt-2">
                <DatesList dates={importantDates} />
              </div>
            )}
            <p className="text-sm text-muted-foreground text-center">
              You can add dates now — they’ll be saved when you save the person
            </p>
          </>
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
      </div>
    </BaseStepLayout>
  );
}
