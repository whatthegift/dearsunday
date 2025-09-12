
import { useState, useEffect, forwardRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRelationships, Relationship } from "@/hooks/use-relationships";
import { PersonForm as PersonFormType } from "./types";
import { usePersonDialog } from "./usePersonDialog";
import { ConversationalForm } from "./ConversationalForm";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/use-mobile";
import PreSaveDateDialog from "./PreSaveDateDialog";

interface AddPersonDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  editMode?: boolean;
  initialData?: Relationship;
}

const AddPersonDialog = forwardRef<HTMLButtonElement, AddPersonDialogProps>(({ 
  open, 
  onOpenChange, 
  editMode = false, 
  initialData 
}, ref) => {
  const { toast } = useToast();
  const isMobile = useMediaQuery("(max-width: 640px)");
  
  const {
    isOpen,
    setIsOpen,
    importantDates,
    setImportantDates,
    handleOpenChange,
    handleAddDate,
    onSubmit,
    refreshDates,
    isSubmitting,
    tempRelationshipId,
    addDateDialogOpen,
    setAddDateDialogOpen,
  } = usePersonDialog({
    open,
    onOpenChange,
    editMode,
    initialData,
    toast
  });

  const showPreSaveDateDialog = !editMode;

  if (isMobile) {
    return (
      <>
        <Drawer open={isOpen} onOpenChange={handleOpenChange}>
          {!open && !onOpenChange && (
            <Button className="flex items-center gap-2" ref={ref} onClick={() => setIsOpen(true)}>
              <Plus className="h-4 w-4" />
              <span>Add Person</span>
            </Button>
          )}
          <DrawerContent className="px-0 pt-0 pb-6">
            <div className="px-4 pb-0 pt-4">
              <h3 className="font-medium text-lg tracking-tight">
                {editMode ? "Edit Person" : "Remember Someone Special"}
              </h3>
              <p className="text-muted-foreground text-sm">
                {editMode 
                  ? "Update information about this person"
                  : "Let's add someone who matters to you"
                }
              </p>
            </div>
            <div className="px-0 overflow-y-auto max-h-[80vh]">
              <ConversationalForm 
                initialData={initialData}
                onSubmit={onSubmit}
                isSubmitting={isSubmitting}
                editMode={editMode}
                relationshipId={editMode && initialData ? initialData.id : tempRelationshipId}
                importantDates={importantDates}
                refreshDates={refreshDates}
                onAddDate={handleAddDate}
              />
            </div>
          </DrawerContent>
        </Drawer>

        {showPreSaveDateDialog && (
          <PreSaveDateDialog
            open={addDateDialogOpen}
            onOpenChange={setAddDateDialogOpen}
            onSave={(date) => {
              setImportantDates((prev: any) => [...prev, date]);
            }}
          />
        )}
      </>
    );
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        {!open && !onOpenChange && (
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2" ref={ref}>
              <Plus className="h-4 w-4" />
              <span>Add Person</span>
            </Button>
          </DialogTrigger>
        )}
        <DialogContent className="sm:max-w-[600px] p-0 gap-0 overflow-hidden">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-xl font-medium">
              {editMode ? "Edit Person" : "Remember Someone Special"}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              {editMode 
                ? "Update information about this person"
                : "Let's add someone who matters to you"
              }
            </DialogDescription>
          </DialogHeader>
          
          <div className="px-0 pb-6 overflow-y-auto max-h-[80vh]">
            <ConversationalForm 
              initialData={initialData}
              onSubmit={onSubmit}
              isSubmitting={isSubmitting}
              editMode={editMode}
              relationshipId={editMode && initialData ? initialData.id : tempRelationshipId}
              importantDates={importantDates}
              refreshDates={refreshDates}
              onAddDate={handleAddDate}
            />
          </div>
        </DialogContent>
      </Dialog>

      {showPreSaveDateDialog && (
        <PreSaveDateDialog
          open={addDateDialogOpen}
          onOpenChange={setAddDateDialogOpen}
          onSave={(date) => {
            setImportantDates((prev: any) => [...prev, date]);
          }}
        />
      )}
    </>
  );
});

AddPersonDialog.displayName = "AddPersonDialog";

export default AddPersonDialog;
