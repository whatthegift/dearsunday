
import { Card, CardContent } from "@/components/ui/card";
import { GiftingHistory } from "./GiftingHistory";
import { PersonDetails } from "./PersonDetails";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AnniversariesSection } from "../dates/AnniversariesSection";
import { Suggestions } from "./Suggestions";

interface PersonProfileViewProps {
  person: any;
  anniversaries: any[];
  gifts: any[];
  isLoadingAnniversaries: boolean;
  isLoadingGifts: boolean;
  onGoBack: () => void;
}

export function PersonProfileView({ 
  person,
  anniversaries,
  gifts,
  isLoadingAnniversaries,
  isLoadingGifts,
  onGoBack
}: PersonProfileViewProps) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/relationships/edit/${person.id}`);
  };

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={onGoBack} className="w-fit justify-start">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      
      {/* Person Details - includes profile header, personality snapshot and special notes */}
      <PersonDetails person={person} onEdit={handleEdit} />

      {/* Important Dates and Gifting History side by side on larger screens */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Important Dates Section */}
        <AnniversariesSection 
          relationshipId={person.id}
          dates={anniversaries}
          isLoading={isLoadingAnniversaries}
        />
        
        {/* Gifting History Section */}
        <GiftingHistory relationshipId={person.id} />
      </div>
      
      {/* Suggestions Section - takes full width */}
      <Suggestions person={person} />
    </div>
  );
}
