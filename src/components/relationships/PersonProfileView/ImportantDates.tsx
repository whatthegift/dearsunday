import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Anniversary } from "@/hooks/relationships/types";
import { Loader2 } from "lucide-react";
import { useDateOperations } from "./dates/hooks/useDateOperations";
import { DatesHeader } from "./dates/DatesHeader";
import { EmptyDatesState } from "./dates/EmptyDatesState";
import { DateDialogs } from "./dates/DateDialogs";
import DatesList from "@/components/relationships/dates/DatesList";

interface ImportantDatesProps {
  anniversaries: Anniversary[];
  isLoading: boolean;
  relationshipId: string;
}

export function ImportantDates({ 
  anniversaries, 
  isLoading,
  relationshipId
}: ImportantDatesProps) {
  const {
    isAddDialogOpen,
    isEditDialogOpen,
    selectedDate,
    handleAddDate,
    handleEditDate,
    refreshDates,
    closeAddDialog,
    closeEditDialog
  } = useDateOperations(relationshipId);

  return (
    <Card className="overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader className="pb-2">
        <DatesHeader onAddDate={handleAddDate} />
      </CardHeader>
      
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : anniversaries.length === 0 ? (
          <EmptyDatesState onAddDate={handleAddDate} />
        ) : (
          <DatesList 
            dates={anniversaries}
            onEdit={handleEditDate}
          />
        )}
        
        <DateDialogs
          relationshipId={relationshipId}
          isAddDialogOpen={isAddDialogOpen}
          isEditDialogOpen={isEditDialogOpen}
          selectedDate={selectedDate}
          onCloseAdd={closeAddDialog}
          onCloseEdit={closeEditDialog}
          onSuccess={refreshDates}
        />
      </CardContent>
    </Card>
  );
}
