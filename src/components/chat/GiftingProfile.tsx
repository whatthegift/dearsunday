
import { PersonalitySnapshot } from "@/components/relationships/PersonProfileView/PersonalitySnapshot";
import { SpecialNotes } from "@/components/relationships/PersonProfileView/SpecialNotes";
import { ImportantDates } from "@/components/relationships/PersonProfileView/ImportantDates";
import { GiftingHistory } from "@/components/relationships/PersonProfileView/GiftingHistory";
import { Suggestions } from "@/components/relationships/PersonProfileView/Suggestions";
import { Relationship } from "@/hooks/use-relationships";
import { useRelationships } from "@/hooks/use-relationships";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GiftingProfileProps {
  person: Relationship;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export function GiftingProfile({ person, isCollapsed, onToggleCollapse }: GiftingProfileProps) {
  const anniversariesQuery = useRelationships().getRelationshipAnniversaries(person.id);
  
  // Fetch gifts separately using React Query
  const giftsQuery = useQuery({
    queryKey: ['gifts', person.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('gifts')
        .select('*')
        .eq('recipient_id', person.id)
        .order('date_given', { ascending: false });

      if (error) {
        throw new Error(error.message);
      }

      return data || [];
    }
  });
  
  if (isCollapsed) {
    return (
      <div className="flex items-center justify-center w-10 h-full">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onToggleCollapse}
          className="rounded-full hover:bg-gift-yellow-lighter"
          aria-label="Expand profile panel"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    );
  }
  
  return (
    <div className="relative flex flex-col gap-4 w-full md:w-80 animate-slide-in-right">
      <div className="absolute right-2 top-2 z-10">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onToggleCollapse}
          className="rounded-full hover:bg-gift-yellow-lighter"
          aria-label="Collapse profile panel"
        >
          <ChevronRight className="h-5 w-5 rotate-180" />
        </Button>
      </div>
      <PersonalitySnapshot person={person} />
      <SpecialNotes person={person} />
      <ImportantDates 
        anniversaries={anniversariesQuery.data || []} 
        isLoading={anniversariesQuery.isLoading}
        relationshipId={person.id} 
      />
      <GiftingHistory 
        relationshipId={person.id}
        gifts={giftsQuery.data || []}
        isLoading={giftsQuery.isLoading}
      />
      <Suggestions person={person} />
    </div>
  );
}
