
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ProfileHeader } from "../PersonProfileView/ProfileHeader";
import { PersonalitySnapshot } from "../PersonProfileView/PersonalitySnapshot";
import { SpecialNotes } from "../PersonProfileView/SpecialNotes";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DeleteProfileDialog } from "../view-profile/DeleteProfileDialog";

interface PersonDetailsProps {
  person: any;
  onEdit: () => void;
}

export function PersonDetails({ person, onEdit }: PersonDetailsProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  const handleDelete = () => {
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Profile Header with Avatar and Basic Info */}
      <Card className="overflow-hidden border-none shadow-sm">
        <CardContent className="p-0">
          <ProfileHeader person={person} />
          
          <div className="px-6 py-4 flex justify-between">
            <Button 
              onClick={onEdit}
              variant="outline"
              className="flex items-center gap-1"
            >
              <Edit className="h-4 w-4" />
              <span>Edit Profile</span>
            </Button>
            
            <Button 
              onClick={handleDelete}
              variant="outline"
              className="flex items-center gap-1 text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4" />
              <span>Delete Profile</span>
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Personality Snapshot and Special Notes sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PersonalitySnapshot person={person} />
        <SpecialNotes person={person} />
      </div>
      
      {/* Delete Profile Dialog */}
      <DeleteProfileDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        personId={person.id}
        personName={person.name}
      />
    </div>
  );
}
