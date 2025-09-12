import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Relationship } from "@/hooks/use-relationships";
interface ProfileHeaderProps {
  person: Relationship;
}
export function ProfileHeader({
  person
}: ProfileHeaderProps) {
  const getInitials = (name: string) => {
    return name.split(' ').map(part => part[0]).join('').toUpperCase().substring(0, 2);
  };

  // Get avatar color based on ID
  const getAvatarColor = (id: string) => {
    const colors = ["bg-gift-peach", "bg-gift-lavender", "bg-gift-sage", "bg-gift-blush", "bg-gift-cream"];
    return colors[parseInt(id.slice(-1), 16) % colors.length];
  };

  // Get relationship emoji
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
  return <div className="relative">
      {/* Soft background banner */}
      <div className="absolute inset-0 h-32 rounded-xl bg-gradient-to-r from-gift-cream to-gift-blush opacity-60 -z-10"></div>
      
      <div className="pt-8 pb-4 px-4 flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* Avatar */}
        <Avatar className={`h-24 w-24 md:h-32 md:w-32 border-4 border-background ${!person.profile_image ? getAvatarColor(person.id) : ""}`}>
          {person.profile_image ? <AvatarImage src={person.profile_image} alt={person.name} /> : null}
          <AvatarFallback className="text-2xl">{getInitials(person.name)}</AvatarFallback>
        </Avatar>
        
        {/* Name and relationship */}
        <div className="text-center md:text-left">
          <h1 className="text-2xl font-semibold md:text-base">{person.name}</h1>
          <div className="flex justify-center md:justify-start items-center mt-2">
            <span className="text-xl mr-2">{getRelationshipEmoji(person.relationship_type)}</span>
            <Badge variant="outline" className="px-3 py-1 text-sm bg-background/80">
              {person.custom_relationship_type || person.relationship_type}
            </Badge>
          </div>
          {person.birthday && <p className="mt-2 text-muted-foreground">
              Birthday: {person.birthday.month}/{person.birthday.day}
              {person.birthday.year ? `/${person.birthday.year}` : ''}
            </p>}
        </div>
      </div>
    </div>;
}