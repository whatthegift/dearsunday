
import AddDateDialog from "@/components/AddDateDialog";
import { Anniversary } from "@/hooks/relationships/types";

interface DateDialogsProps {
  relationshipId: string;
  isAddDialogOpen: boolean;
  isEditDialogOpen: boolean;
  selectedDate: Anniversary | null;
  onCloseAdd: () => void;
  onCloseEdit: () => void;
  onSuccess: () => Promise<void>;
}

export function DateDialogs({
  relationshipId,
  isAddDialogOpen,
  isEditDialogOpen,
  selectedDate,
  onCloseAdd,
  onCloseEdit,
  onSuccess
}: DateDialogsProps) {
  return (
    <>
      <AddDateDialog
        relationshipId={relationshipId}
        open={isAddDialogOpen}
        onOpenChange={onCloseAdd}
        onSuccess={onSuccess}
      />
      
      {selectedDate && (
        <AddDateDialog
          relationshipId={relationshipId}
          open={isEditDialogOpen}
          onOpenChange={onCloseEdit}
          editMode={true}
          initialData={selectedDate}
          onSuccess={onSuccess}
        />
      )}
    </>
  );
}
