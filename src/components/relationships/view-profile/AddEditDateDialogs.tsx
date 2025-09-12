
import { useState } from "react";
import { Anniversary } from "@/hooks/relationships/types";
import AddDateDialog from "@/components/AddDateDialog";
import { DeleteDateDialog } from "../dates/DeleteDateDialog";

interface AddEditDateDialogsProps {
  relationshipId: string;
  addDateDialogOpen: boolean;
  setAddDateDialogOpen: (open: boolean) => void;
  editDateDialogOpen: boolean;
  setEditDateDialogOpen: (open: boolean) => void;
  selectedDate: Anniversary | null;
  setSelectedDate: (date: Anniversary | null) => void;
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: (open: boolean) => void;
  refreshDates: () => Promise<void>;
}

export function AddEditDateDialogs({
  relationshipId,
  addDateDialogOpen,
  setAddDateDialogOpen,
  editDateDialogOpen,
  setEditDateDialogOpen,
  selectedDate,
  setSelectedDate,
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  refreshDates
}: AddEditDateDialogsProps) {
  // Handle closing dialogs properly to avoid hook errors
  const handleAddDialogChange = (open: boolean) => {
    setAddDateDialogOpen(open);
  };

  const handleEditDialogChange = (open: boolean) => {
    setEditDateDialogOpen(open);
    if (!open) {
      // Only clear selectedDate when closing the dialog
      setSelectedDate(null);
    }
  };

  const handleDeleteDialogChange = (open: boolean) => {
    setIsDeleteDialogOpen(open);
    if (!open && !editDateDialogOpen) {
      // Only clear selectedDate when closing the dialog and edit dialog is not open
      setSelectedDate(null);
    }
  };

  return (
    <>
      {/* Add Date Dialog */}
      <AddDateDialog
        relationshipId={relationshipId}
        open={addDateDialogOpen}
        onOpenChange={handleAddDialogChange}
        onSuccess={refreshDates}
      />

      {/* Only render if we have a selected date */}
      {selectedDate && (
        <>
          {/* Edit Date Dialog */}
          <AddDateDialog
            relationshipId={relationshipId}
            open={editDateDialogOpen}
            onOpenChange={handleEditDialogChange}
            editMode={true}
            initialData={selectedDate}
            onSuccess={refreshDates}
          />

          {/* Delete Date Dialog */}
          <DeleteDateDialog
            open={isDeleteDialogOpen}
            onOpenChange={handleDeleteDialogChange}
            selectedDate={selectedDate}
            relationshipId={relationshipId}
            onSuccess={refreshDates}
          />
        </>
      )}
    </>
  );
}
