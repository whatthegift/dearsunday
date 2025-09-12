
import { useState } from "react";
import { Calendar, DollarSign, ThumbsUp, Edit, Trash, Heart, MessageCircle, Image, ExternalLink, MoreHorizontal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Gift } from "./types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface GiftCardProps {
  gift: Gift;
  variant?: "timeline" | "grid";
  hideRecipient?: boolean;
}

export default function GiftCard({ gift, variant = "timeline", hideRecipient = false }: GiftCardProps) {
  const [expanded, setExpanded] = useState(false);
  
  const formattedDate = new Date(gift.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
  
  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300 hover:shadow-md",
      variant === "grid" ? "h-full flex flex-col" : ""
    )}>
      <div className="relative">
        <div 
          className="w-full aspect-video bg-muted bg-cover bg-center"
          style={{ backgroundImage: `url(${gift.image || '/placeholder.svg'})` }}
        >
          {!gift.image && (
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
              <Image size={24} />
            </div>
          )}
        </div>
        
        <Badge 
          className={cn(
            "absolute top-2 right-2",
            gift.type === "given" ? "bg-gift-yellow text-background" : "bg-gift-lavender"
          )}
        >
          {gift.type === "given" ? "Given" : "Received"}
        </Badge>
        
        {gift.occasion && (
          <Badge className="absolute bottom-2 left-2 bg-background/80 backdrop-blur-sm">
            {gift.occasion}
          </Badge>
        )}
      </div>
      
      <CardContent className={cn(
        "p-4",
        variant === "grid" ? "flex-1 flex flex-col" : ""
      )}>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-lg line-clamp-1">{gift.giftName}</h3>
            {!hideRecipient && gift.recipientName && (
              <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
                For {gift.recipientName}
              </p>
            )}
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Edit className="h-4 w-4 mr-2" />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <Trash className="h-4 w-4 mr-2" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="flex flex-wrap gap-y-2 mt-3 text-sm">
          <div className="flex items-center mr-4">
            <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
            <span>{formattedDate}</span>
          </div>
          
          {gift.price && (
            <div className="flex items-center mr-4">
              <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
              <span>{gift.price}</span>
            </div>
          )}
          
          {gift.sentiment && (
            <div className="flex items-center">
              <ThumbsUp className="h-4 w-4 mr-1 text-muted-foreground" />
              <span>{renderSentiment(gift.sentiment)}</span>
            </div>
          )}
        </div>
        
        {expanded && (
          <div className="mt-4 pt-4 border-t border-border">
            {gift.notes && (
              <div className="mb-3">
                <h4 className="text-sm font-medium mb-1">Notes</h4>
                <p className="text-sm text-muted-foreground">{gift.notes}</p>
              </div>
            )}
            
            {gift.reaction && (
              <div className="mb-3">
                <h4 className="text-sm font-medium mb-1">Reaction</h4>
                <p className="text-sm text-muted-foreground">{gift.reaction}</p>
              </div>
            )}
            
            {gift.source && (
              <div className="flex items-center text-sm mt-2">
                <span className="text-muted-foreground mr-1">Source:</span>
                <a href={gift.sourceUrl || "#"} className="flex items-center" target="_blank" rel="noopener noreferrer">
                  {gift.source}
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
            )}
            
            <div className="flex gap-2 mt-4">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Heart className="h-4 w-4" />
                <span>Save to Ideas</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <MessageCircle className="h-4 w-4" />
                <span>Ask Sunday</span>
              </Button>
            </div>
          </div>
        )}
        
        {!expanded && gift.notes && (
          <Button 
            variant="link" 
            className="px-0 h-8 mt-2" 
            onClick={toggleExpand}
          >
            Show more details
          </Button>
        )}
        
        {expanded && (
          <Button 
            variant="link" 
            className="px-0 h-8 mt-2" 
            onClick={toggleExpand}
          >
            Show less
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

function renderSentiment(sentiment: number) {
  if (sentiment >= 4) return "Loved it";
  if (sentiment >= 3) return "Liked it";
  if (sentiment >= 2) return "It was okay";
  return "Not a hit";
}
