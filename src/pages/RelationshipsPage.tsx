
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRelationships } from "@/hooks/use-relationships";
import RelationshipCards from "@/components/relationships/RelationshipCards";
import AddPersonDialog from "@/components/relationships/AddPersonDialog";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface RelationshipsPageProps {
  showEdit?: boolean;
}

export default function RelationshipsPage({
  showEdit = false
}: RelationshipsPageProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editData, setEditData] = useState<any>(null);
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const navigate = useNavigate();
  const {
    relationships
  } = useRelationships();

  // If we're in edit mode (showEdit is true), fetch the relationship data and open the edit dialog
  // Only run this once when the component mounts
  useEffect(() => {
    let isMounted = true;
    
    const fetchRelationship = async () => {
      if (showEdit && id && isMounted) {
        try {
          const {
            data,
            error
          } = await supabase.from('relationships').select('*').eq('id', id).single();
          
          if (error) throw error;
          
          if (isMounted) {
            setEditData(data);
            setIsDialogOpen(true);
          }
        } catch (error) {
          console.error("Error fetching relationship:", error);
          // Navigate back to relationships page if there's an error
          if (isMounted) {
            navigate('/relationships');
          }
        }
      }
    };
    
    fetchRelationship();

    // Cleanup function to prevent state updates after unmount
    return () => {
      isMounted = false;
    };
  }, [id, showEdit, navigate]);

  const handleAddPerson = () => {
    setEditData(null);
    setIsDialogOpen(true);
  };

  // Handle dialog close - redirect if we're on edit route
  const handleDialogOpenChange = (open: boolean) => {
    setIsDialogOpen(open);

    // If dialog is closed and we're on an edit route, navigate back to main relationships page
    if (!open && showEdit && id) {
      // Use a short timeout to ensure the state update happens before navigation
      setTimeout(() => {
        navigate('/relationships');
      }, 100);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl animated-entry">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="mb-2 text-base font-semibold text-left">People You Care About</h1>
          <p className="text-muted-foreground text-sm font-thin">
            Keep track of important dates and gift ideas for the special people in your life.
          </p>
        </div>
        <Button onClick={handleAddPerson} className="whitespace-nowrap">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Person
        </Button>
      </div>

      <RelationshipCards 
        relationships={relationships.data || []} 
        isLoading={relationships.isLoading} 
        onAddPerson={handleAddPerson} 
      />

      {/* Only render the dialog when needed */}
      {isDialogOpen && (
        <AddPersonDialog 
          open={isDialogOpen} 
          onOpenChange={handleDialogOpenChange} 
          editMode={!!editData} 
          initialData={editData} 
        />
      )}
    </div>
  );
}
