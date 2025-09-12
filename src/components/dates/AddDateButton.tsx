
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AddDateDialog from "@/components/AddDateDialog";
import { ViewCalendarDialog } from "@/components/ViewCalendarDialog";

export function AddDateButton() {
  const [open, setOpen] = useState(false);
  const [selectedRelationshipId, setSelectedRelationshipId] = useState<string | null>(null);

  return (
    <div className="flex items-center gap-2">
      <ViewCalendarDialog />
      
      <Button onClick={() => setOpen(true)}>
        <Plus className="h-4 w-4 mr-2" />
        Add Date
      </Button>
      
      {open && selectedRelationshipId && (
        <AddDateDialog 
          relationshipId={selectedRelationshipId}
          open={open}
          onOpenChange={setOpen}
          onSuccess={() => {
            setSelectedRelationshipId(null);
          }}
        />
      )}
      
      {/* When no relationship is selected yet, show relationship selection dialog first */}
      {open && !selectedRelationshipId && (
        <SelectRelationshipDialog 
          open={open}
          onOpenChange={(isOpen) => {
            if (!isOpen) setOpen(false);
          }}
          onSelect={(relationshipId) => {
            setSelectedRelationshipId(relationshipId);
          }}
        />
      )}
    </div>
  );
}

// Implementation of relationship selection dialog
import { useRelationships } from "@/hooks/use-relationships";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface SelectRelationshipDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (relationshipId: string) => void;
}

function SelectRelationshipDialog({
  open,
  onOpenChange,
  onSelect,
}: SelectRelationshipDialogProps) {
  const { relationships: { data: relationships = [], isLoading } } = useRelationships();

  const getAvatarColor = (id: string) => {
    const colors = [
      "bg-gift-peach", 
      "bg-gift-lavender", 
      "bg-gift-sage", 
      "bg-gift-blush", 
      "bg-gift-cream"
    ];
    return colors[parseInt(id.slice(-1), 16) % colors.length];
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Select a Person</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="py-6">Loading relationships...</div>
        ) : relationships.length === 0 ? (
          <div className="py-6 text-center">
            <p className="text-muted-foreground">No relationships found.</p>
            <Button 
              className="mt-4" 
              onClick={() => {
                onOpenChange(false);
                // Navigate to relationships page
                window.location.href = "/relationships";
              }}
            >
              Add Relationship
            </Button>
          </div>
        ) : (
          <div className="grid gap-4 py-4 max-h-[400px] overflow-y-auto">
            {relationships.map(person => (
              <Button
                key={person.id}
                variant="outline"
                className="flex items-center justify-start gap-3 h-auto p-3 w-full"
                onClick={() => onSelect(person.id)}
              >
                <Avatar className={`${getAvatarColor(person.id)} h-8 w-8`}>
                  <AvatarFallback>
                    {person.initials || person.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span>{person.name}</span>
              </Button>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
