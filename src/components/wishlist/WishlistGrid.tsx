
import { WishlistCard } from "./WishlistCard";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

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

interface WishlistGridProps {
  items: WishlistItem[];
  viewMode: 'grid' | 'list';
}

export function WishlistGrid({ items, viewMode }: WishlistGridProps) {
  // Group items by recipient
  const itemsByRecipient: Record<string, WishlistItem[]> = {};
  
  items.forEach(item => {
    if (!itemsByRecipient[item.recipient]) {
      itemsByRecipient[item.recipient] = [];
    }
    itemsByRecipient[item.recipient].push(item);
  });
  
  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center h-40 w-full bg-muted rounded-md">
        <p className="text-muted-foreground">No items match your criteria</p>
      </div>
    );
  }
  
  return (
    <ScrollArea className="h-[70vh]">
      <div className="space-y-8 pr-4">
        {Object.entries(itemsByRecipient).map(([recipient, recipientItems]) => (
          <div key={recipient} className="space-y-3">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-medium">{recipient}</h3>
              <Badge variant="outline">{recipientItems.length}</Badge>
            </div>
            
            <div className={viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              : "space-y-3"
            }>
              {recipientItems.map(item => (
                <WishlistCard 
                  key={item.id} 
                  item={item} 
                  viewMode={viewMode}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
