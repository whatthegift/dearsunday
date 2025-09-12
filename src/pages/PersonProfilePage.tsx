
import { useParams, useNavigate } from "react-router-dom";
import { useRelationships, Anniversary } from "@/hooks/use-relationships";
import { useGifts } from "@/hooks/gifts"; // Updated import path
import { PersonProfileView } from "@/components/relationships/PersonProfileView";
import { Loader2 } from "lucide-react";
import AddPersonDialog from "@/components/relationships/AddPersonDialog";
import { useState } from "react";

export default function PersonProfilePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  
  const { getRelationship, getRelationshipAnniversaries } = useRelationships();
  const { fetchGiftsByRelationship } = useGifts();
  
  const relationshipQuery = getRelationship(id || "");
  const person = relationshipQuery.data;
  
  const anniversariesQuery = getRelationshipAnniversaries(id || "");
  const anniversaries = anniversariesQuery.data;
  
  const giftsQuery = fetchGiftsByRelationship(id || "");
  const gifts = giftsQuery.data;

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleEditOpen = () => {
    setEditDialogOpen(true);
  };

  if (relationshipQuery.isLoading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!person) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] space-y-4">
        <h2 className="text-xl font-medium">Person not found</h2>
        <button 
          onClick={handleGoBack}
          className="text-primary hover:underline"
        >
          Go back
        </button>
      </div>
    );
  }

  return (
    <div className="container max-w-3xl mx-auto py-8 px-4 animated-entry">
      <PersonProfileView 
        person={person}
        anniversaries={anniversaries || []}
        gifts={gifts || []}
        isLoadingAnniversaries={anniversariesQuery.isLoading}
        isLoadingGifts={giftsQuery.isLoading}
        onGoBack={handleGoBack}
      />
      
      {/* Edit Person Dialog */}
      {person && (
        <AddPersonDialog 
          open={editDialogOpen} 
          onOpenChange={setEditDialogOpen} 
          editMode={true}
          initialData={person}
        />
      )}
    </div>
  );
}
