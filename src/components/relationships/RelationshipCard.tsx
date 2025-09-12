import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Lightbulb, User } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Relationship } from "@/hooks/use-relationships";
import { Link } from "react-router-dom";
interface RelationshipCardProps {
  person: Relationship;
  onGiftIdeasClick: (personId: string) => void;
}
export function RelationshipCard({
  person,
  onGiftIdeasClick
}: RelationshipCardProps) {
  // Helper functions
  const getAvatarColor = (id: string) => {
    const colors = ["bg-gift-peach", "bg-gift-lavender", "bg-gift-sage", "bg-gift-blush", "bg-gift-cream"];
    return colors[parseInt(id.slice(-1), 16) % colors.length];
  };
  const getInitials = (name: string) => {
    return name.split(' ').map(part => part[0]).join('').toUpperCase().substring(0, 2);
  };
  const getRelationshipEmoji = (type: string) => {
    const emojis: Record<string, string> = {
      'family': '👨‍👩‍👧‍👦',
      'friend': '🧑‍🤝‍🧑',
      'colleague': '💼',
      'acquaintance': '👋',
      'partner': '💕',
      'other': '✨'
    };
    return emojis[type.toLowerCase()] || '✨';
  };

  // Convert interests string to array if needed
  const getInterests = () => {
    if (!person.gift_preferences?.interests) return [];
    return Array.isArray(person.gift_preferences.interests) ? person.gift_preferences.interests : person.gift_preferences.interests.split(',').map((i: string) => i.trim());
  };

  // Format birthday from ISO date string (YYYY-MM-DD) to M/D(/YYYY)
  const formatBirthday = (birthday?: string | null) => {
    if (!birthday) return null;
    const [year, month, day] = birthday.split("-");
    if (!month || !day) return null;
    return `${Number(month)}/${Number(day)}${year ? `/${year}` : ''}`;
  };
  return <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-md">
      <CardContent className="p-0">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className={`${person.profile_image ? '' : getAvatarColor(person.id)} h-14 w-14`}>
              {person.profile_image ? <AvatarImage src={person.profile_image} alt={person.name} /> : null}
              <AvatarFallback className="text-lg">
                {person.initials || getInitials(person.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium text-sm">{person.name}</h3>
              <div className="flex items-center mt-1">
                <span className="mr-1">
                  {getRelationshipEmoji(person.relationship_type)}
                </span>
                <span className="text-xs text-muted-foreground">
                  {person.custom_relationship_type || person.relationship_type}
                </span>
              </div>
            </div>
          </div>
          
          <div className="space-y-2 mb-4">
            {formatBirthday(person.birthday) && (
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Birthday: {formatBirthday(person.birthday)}</span>
              </div>
            )}
            
            {person.gift_preferences?.interests && <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <div className="flex flex-wrap gap-1">
                  {getInterests().map((interest: string, index: number) => <Badge key={index} variant="outline" className="px-2 py-0 text-xs bg-gift-cream hover:bg-gift-cream">
                      {interest}
                    </Badge>)}
                </div>
              </div>}
          </div>
          
          {person.notes && <div className="bg-muted p-3 rounded-md text-sm">
              <p className="text-muted-foreground">{person.notes}</p>
            </div>}
        </div>
        
        <div className="bg-card border-t border-border p-4 flex justify-center gap-2 px-0 py-[16px]">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" className="h-9" asChild>
                  <Link to={`/person/${person.id}`} className="px-auto">View Profile</Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View profile</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="sm" onClick={() => onGiftIdeasClick(person.id)} className="shadow-sm hover:shadow-md transition-shadow duration-200 h-9">
                  <Lightbulb className="h-4 w-4 mr-1" />
                  Gift Ideas
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Generate gift ideas</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>;
}