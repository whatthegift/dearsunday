
import { Gift, Loader2 } from "lucide-react";

interface GiftsTabProps {
  gifts: any[];
  isLoading: boolean;
}

export function GiftsTab({ gifts, isLoading }: GiftsTabProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-6">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {gifts && gifts.length > 0 ? (
        <div className="space-y-4">
          {gifts.map(gift => (
            <div key={gift.id} className="border rounded-md p-4">
              <h3 className="font-medium">{gift.name}</h3>
              {gift.date_given && <div className="text-sm text-muted-foreground">
                Date: {new Date(gift.date_given).toLocaleDateString()}
              </div>}
              {gift.occasion && <div className="text-sm text-muted-foreground">
                Occasion: {gift.occasion}
              </div>}
              {gift.price && <div className="text-sm text-muted-foreground">
                Price: ${gift.price}
              </div>}
              {gift.description && <div className="mt-2 text-sm">{gift.description}</div>}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center p-6 border border-dashed rounded-lg text-muted-foreground">
          <Gift className="h-12 w-12 mx-auto mb-2 opacity-50" />
          <p>No gifts recorded yet</p>
        </div>
      )}
    </div>
  );
}
