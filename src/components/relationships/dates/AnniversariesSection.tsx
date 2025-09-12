
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, Loader2, PlusCircle } from "lucide-react";
import { Anniversary } from "@/hooks/relationships/types";
import DatesList from "./DatesList";
import AddDateDialog from "@/components/AddDateDialog";
import { DeleteDateDialog } from "./DeleteDateDialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRelationships } from "@/hooks/use-relationships";

interface AnniversariesSectionProps {
  relationshipId: string;
  dates?: Anniversary[];
  isLoading: boolean;
}

export function AnniversariesSection({ 
  relationshipId, 
  dates = [], 
  isLoading 
}: AnniversariesSectionProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Anniversary | null>(null);
  const { getRelationshipAnniversaries } = useRelationships();

  const handleAddDate = () => {
    setIsAddDialogOpen(true);
  };

  const handleEditDate = (date: Anniversary) => {
    setSelectedDate(date);
    setIsEditDialogOpen(true);
  };

  const handleDeleteDate = (dateId: string) => {
    const dateToDelete = dates.find(date => date.id === dateId);
    if (dateToDelete) {
      setSelectedDate(dateToDelete);
      setIsDeleteDialogOpen(true);
    }
  };

  const refreshDates = async () => {
    if (relationshipId) {
      await getRelationshipAnniversaries(relationshipId).refetch();
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-blue-500" />
            <span>Important Dates</span>
          </CardTitle>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleAddDate}
            className="flex items-center gap-1"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Add</span>
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-hidden pb-2">
        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <DatesList 
            dates={dates} 
            onEdit={handleEditDate} 
            onDelete={handleDeleteDate} 
          />
        )}
      </CardContent>
      
      <CardFooter className="pt-2">
        <div className="text-xs text-muted-foreground w-full text-center">
          {dates.length > 0 
            ? `${dates.length} important ${dates.length === 1 ? 'date' : 'dates'} saved`
            : 'Add special dates to remember'}
        </div>
      </CardFooter>
      
      {/* Add Date Dialog */}
      <AddDateDialog
        relationshipId={relationshipId}
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSuccess={refreshDates}
      />
      
      {/* Edit and Delete Dialogs - Only render if a date is selected */}
      {selectedDate && (
        <>
          <AddDateDialog
            relationshipId={relationshipId}
            open={isEditDialogOpen}
            onOpenChange={setIsEditDialogOpen}
            editMode={true}
            initialData={selectedDate}
            onSuccess={refreshDates}
          />
          
          <DeleteDateDialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
            selectedDate={selectedDate}
            relationshipId={relationshipId}
            onSuccess={refreshDates}
          />
        </>
      )}
    </Card>
  );
}
