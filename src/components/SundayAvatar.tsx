
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface SundayAvatarProps {
  size?: "sm" | "md" | "lg";
  animated?: boolean;
  className?: string;
  showCharacter?: boolean;
}

export default function SundayAvatar({ 
  size = "md", 
  animated = false, 
  className,
  showCharacter = true
}: SundayAvatarProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16"
  };

  return (
    <Avatar className={cn(sizeClasses[size], "bg-gift-yellow-lighter overflow-hidden", className)}>
      <AvatarImage 
        src="/lovable-uploads/d48276b0-e649-428b-8ecc-1ecf2eefa46f.png" 
        alt="Sunday character"
        className={cn("object-cover scale-[0.8]", animated ? "animate-float" : "")}
      />
      <AvatarFallback className="bg-gift-yellow-lighter text-gift-yellow-dark font-bold">
        Sun
      </AvatarFallback>
    </Avatar>
  );
}
