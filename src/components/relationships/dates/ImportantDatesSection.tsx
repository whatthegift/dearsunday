
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Anniversary } from "@/hooks/relationships/types";
import DatesList from "./DatesList";
import { DeleteDateDialog } from "./DeleteDateDialog";
import AddDateDialog from "@/components/AddDateDialog";

interface ImportantDatesSectionProps {
  dates: Anniversary[];
  relationshipId: string;
  onDatesChange: (dates: Anniversary[]) => void;
}

export function ImportantDatesSection({ 
  dates, 
  relationshipId, 
  onDatesChange 
}: ImportantDatesSectionProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Anniversary | null>(null);

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

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Important Dates</h3>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleAddDate}
          className="flex items-center gap-1"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Add Date</span>
        </Button>
      </div>

      <DatesList 
        dates={dates} 
        onEdit={handleEditDate} 
        onDelete={handleDeleteDate} 
      />

      <AddDateDialog
        relationshipId={relationshipId}
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSuccess={(newDate) => {
          if (newDate) {
            onDatesChange([...dates, newDate]);
          }
          setIsAddDialogOpen(false);
        }}
      />

      {selectedDate && (
        <>
          <AddDateDialog
            relationshipId={relationshipId}
            open={isEditDialogOpen}
            onOpenChange={setIsEditDialogOpen}
            editMode={true}
            initialData={selectedDate}
            onSuccess={(updatedDate) => {
              if (updatedDate) {
                onDatesChange(
                  dates.map(date => 
                    date.id === updatedDate.id ? updatedDate : date
                  )
                );
              }
              setIsEditDialogOpen(false);
              setSelectedDate(null);
            }}
          />

          <DeleteDateDialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
            selectedDate={selectedDate}
            relationshipId={relationshipId}
            onSuccess={async () => {
              onDatesChange(dates.filter(date => date.id !== selectedDate.id));
              setSelectedDate(null);
            }}
          />
        </>
      )}
    </div>
  );
}
