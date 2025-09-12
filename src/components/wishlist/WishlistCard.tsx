
import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BookmarkCheck, 
  Calendar, 
  ExternalLink, 
  Gift, 
  Heart, 
  Package, 
  Trash2
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";

interface WishlistItem {
  id: string;
  title: string;
  price: string;
  image: string;
  reason: string;
  recipient: string;
  occasion: string;
  status: 'idea' | 'purchased' | 'given';
  dateAdded: string;
  category: string;
  priority: 'Low' | 'Medium' | 'High';
  notes: string;
}

interface WishlistCardProps {
  item: WishlistItem;
  viewMode: 'grid' | 'list';
}

export function WishlistCard({ item, viewMode }: WishlistCardProps) {
  const [favorite, setFavorite] = useState(item.priority === 'High');
  const navigate = useNavigate();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'purchased':
        return <Package className="h-4 w-4 text-green-500" />;
      case 'given':
        return <Gift className="h-4 w-4 text-violet-500" />;
      default:
        return <BookmarkCheck className="h-4 w-4 text-gift-yellow" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'purchased':
        return <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">Purchased</Badge>;
      case 'given':
        return <Badge variant="outline" className="bg-violet-50 text-violet-600 border-violet-200">Given</Badge>;
      default:
        return <Badge variant="outline" className="bg-gift-yellow-lighter text-gift-yellow-dark border-gift-yellow-light">Idea</Badge>;
    }
  };

  const handleChatClick = () => {
    navigate("/chat");
  };

  if (viewMode === 'list') {
    return (
      <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
        <div className="flex items-start p-4">
          <div className="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden bg-muted mr-4">
            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
          </div>
          <div className="flex-grow">
            <div className="flex justify-between">
              <div>
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.price}</p>
              </div>
              <div className="flex gap-1">
                {getStatusBadge(item.status)}
              </div>
            </div>
            <div className="mt-2 flex items-center text-xs text-muted-foreground">
              <Calendar className="h-3 w-3 mr-1" />
              <span>{item.occasion}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 ml-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className={favorite ? "text-gift-yellow" : ""}
                    onClick={() => setFavorite(!favorite)}
                  >
                    <Heart className="h-4 w-4" fill={favorite ? "currentColor" : "none"} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{favorite ? "Remove from favorites" : "Add to favorites"}</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View details</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Remove</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden hover-scale">
      <div className="relative aspect-square bg-muted">
        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="secondary" 
                  size="icon" 
                  className="h-8 w-8 bg-white/80 backdrop-blur-sm shadow-sm"
                  onClick={() => setFavorite(!favorite)}
                >
                  <Heart className="h-4 w-4" fill={favorite ? "#FFC72C" : "none"} stroke={favorite ? "#FFC72C" : "currentColor"} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{favorite ? "Remove from favorites" : "Add to favorites"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="absolute bottom-2 left-2">
          {getStatusBadge(item.status)}
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-medium">{item.title}</h3>
          <span className="text-sm font-medium">{item.price}</span>
        </div>
        <div className="flex items-center text-xs text-muted-foreground mb-2">
          <Calendar className="h-3 w-3 mr-1" />
          <span>{item.occasion}</span>
        </div>
        {item.reason && (
          <p className="text-sm text-muted-foreground bg-muted p-2 rounded-md">
            {item.reason}
          </p>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-1"
          onClick={handleChatClick}
        >
          <Gift className="h-3 w-3" />
          <span>Ask Sunday</span>
        </Button>
        <Button 
          variant="secondary" 
          size="sm"
        >
          <ExternalLink className="h-3 w-3 mr-1" />
          <span>Shop</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
