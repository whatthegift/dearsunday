
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface GiftRecommendationCardProps {
  title: string;
  price: string;
  image?: string;
  reason?: string;
  category?: string;
  className?: string;
}

export function GiftRecommendationCard({ 
  title, 
  price, 
  image = "/placeholder.svg", 
  reason,
  category,
  className 
}: GiftRecommendationCardProps) {
  return (
    <Card className={cn(
      "w-[280px] h-[360px] shrink-0 flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg", 
      className
    )}>
      <div className="h-[160px] bg-muted relative overflow-hidden group">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
        />
        {category && (
          <Badge className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm">
            {category}
          </Badge>
        )}
      </div>
      
      <div className="p-4 flex flex-col flex-1">
        <h4 className="text-lg font-medium line-clamp-2">{title}</h4>
        
        {reason && (
          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
            Why Sunday picked this: {reason}
          </p>
        )}
        
        <div className="mt-auto pt-4 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">{price}</span>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-full hover:bg-gift-blush hover:text-rose-500"
            >
              <Heart className="h-4 w-4" />
              <span className="sr-only">Add to ThoughtBox</span>
            </Button>
          </div>
          
          <Button className="w-full bg-gift-yellow hover:bg-gift-yellow-dark text-foreground">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Buy Now
          </Button>
        </div>
      </div>
    </Card>
  );
}
