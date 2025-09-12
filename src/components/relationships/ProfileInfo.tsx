
import { Mail, Phone } from "lucide-react";
import { Relationship } from "@/hooks/use-relationships";

interface ProfileInfoProps {
  person: Relationship;
}

export function ProfileInfo({ person }: ProfileInfoProps) {
  return (
    <div className="space-y-4">
      {person.contact_info && (
        <>
          {person.contact_info.email && (
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{person.contact_info.email}</span>
            </div>
          )}
          
          {person.contact_info.phone && (
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{person.contact_info.phone}</span>
            </div>
          )}
        </>
      )}
      
      {person.notes && (
        <div className="mt-4">
          <h3 className="font-medium mb-2">Notes</h3>
          <p className="text-muted-foreground whitespace-pre-line">{person.notes}</p>
        </div>
      )}
      
      {person.gift_preferences && (
        <div className="mt-4">
          <h3 className="font-medium mb-2">Gift Preferences</h3>
          <div className="space-y-2">
            {person.gift_preferences.likes && (
              <div>
                <span className="font-medium">Likes:</span> {person.gift_preferences.likes}
              </div>
            )}
            
            {person.gift_preferences.dislikes && (
              <div>
                <span className="font-medium">Dislikes:</span> {person.gift_preferences.dislikes}
              </div>
            )}
            
            {person.gift_preferences.sizes && (
              <div>
                <span className="font-medium">Sizes:</span> {person.gift_preferences.sizes}
              </div>
            )}

            {person.gift_preferences.interests && (
              <div>
                <span className="font-medium">Interests:</span>{' '}
                {Array.isArray(person.gift_preferences.interests) 
                  ? person.gift_preferences.interests.join(", ")
                  : person.gift_preferences.interests}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
