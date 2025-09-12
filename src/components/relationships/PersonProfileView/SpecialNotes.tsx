
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StickyNote, Edit, Check, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useRelationships } from "@/hooks/use-relationships";
import { Relationship } from "@/hooks/use-relationships";
import { Textarea } from "@/components/ui/textarea";

interface SpecialNotesProps {
  person: Relationship;
}

export function SpecialNotes({ person }: SpecialNotesProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [notes, setNotes] = useState(person.notes || "");
  const { toast } = useToast();
  const { updateRelationship } = useRelationships();

  const handleSaveNotes = async () => {
    try {
      await updateRelationship.mutateAsync({
        id: person.id,
        notes: notes
      });
      toast({
        title: "Notes saved",
        description: "Your special notes have been saved successfully."
      });
      setIsEditing(false);
    } catch (error) {
      toast({
        title: "Error saving notes",
        description: "There was a problem saving your notes. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleCancel = () => {
    setNotes(person.notes || "");
    setIsEditing(false);
  };

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="flex items-center font-normal text-base">
          <StickyNote className="h-5 w-5 mr-2 text-gift-peach" />
          Why this person is special
        </CardTitle>
        {!isEditing ? (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => setIsEditing(true)}
          >
            <Edit className="h-4 w-4" />
            <span className="sr-only">Edit notes</span>
          </Button>
        ) : (
          <div className="flex space-x-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-green-600"
              onClick={handleSaveNotes}
            >
              <Check className="h-4 w-4" />
              <span className="sr-only">Save notes</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-red-600"
              onClick={handleCancel}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Cancel editing</span>
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Share why this person is special to you..."
            className="font-poppins text-sm resize-none min-h-[120px] bg-gift-cream/30 border-gift-cream"
          />
        ) : (
          <div className="bg-gift-cream/30 p-4 rounded-lg border border-gift-cream">
            {person.notes ? (
              <p className="text-sm whitespace-pre-line font-poppins">{person.notes}</p>
            ) : (
              <p className="text-sm text-muted-foreground italic font-poppins">
                Capture why this person is special to you. Click the edit button to add your thoughts.
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
