
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

export default function GiftHistoryFilters() {
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);
  const [selectedSentiments, setSelectedSentiments] = useState<string[]>([]);
  const [giftType, setGiftType] = useState<string[]>(["given", "received"]);
  
  const occasions = [
    "Birthday", "Anniversary", "Christmas", "Hanukkah", 
    "Valentine's Day", "Wedding", "Baby Shower", "Graduation"
  ];
  
  const sentiments = [
    { label: "Loved it", value: "loved" },
    { label: "Liked it", value: "liked" },
    { label: "It was okay", value: "okay" },
    { label: "Not a hit", value: "miss" }
  ];

  const toggleOccasion = (occasion: string) => {
    setSelectedOccasions(prev => 
      prev.includes(occasion)
        ? prev.filter(o => o !== occasion)
        : [...prev, occasion]
    );
  };

  const toggleSentiment = (sentiment: string) => {
    setSelectedSentiments(prev => 
      prev.includes(sentiment)
        ? prev.filter(s => s !== sentiment)
        : [...prev, sentiment]
    );
  };

  const toggleGiftType = (type: string) => {
    setGiftType(prev => 
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
  };

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div className="space-y-3">
            <h3 className="font-medium">Gift Type</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="type-given" 
                  checked={giftType.includes("given")}
                  onCheckedChange={() => toggleGiftType("given")}
                />
                <label htmlFor="type-given" className="cursor-pointer text-sm">
                  Gifts Given
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="type-received" 
                  checked={giftType.includes("received")}
                  onCheckedChange={() => toggleGiftType("received")}
                />
                <label htmlFor="type-received" className="cursor-pointer text-sm">
                  Gifts Received
                </label>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-medium">Price Range</h3>
            <div className="px-2">
              <Slider 
                value={priceRange} 
                min={0} 
                max={500} 
                step={10}
                onValueChange={handlePriceChange}
              />
              <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}+</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-medium">Occasions</h3>
            <div className="grid grid-cols-2 gap-2">
              {occasions.slice(0, 6).map(occasion => (
                <div key={occasion} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`occasion-${occasion}`} 
                    checked={selectedOccasions.includes(occasion)}
                    onCheckedChange={() => toggleOccasion(occasion)}
                  />
                  <label 
                    htmlFor={`occasion-${occasion}`} 
                    className="cursor-pointer text-sm"
                  >
                    {occasion}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-medium">Sentiment</h3>
            <div className="space-y-2">
              {sentiments.map(sentiment => (
                <div key={sentiment.value} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`sentiment-${sentiment.value}`} 
                    checked={selectedSentiments.includes(sentiment.value)}
                    onCheckedChange={() => toggleSentiment(sentiment.value)}
                  />
                  <label 
                    htmlFor={`sentiment-${sentiment.value}`} 
                    className="cursor-pointer text-sm"
                  >
                    {sentiment.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex justify-end mt-4">
          <Button variant="outline" size="sm" className="mr-2">
            Reset Filters
          </Button>
          <Button size="sm">
            Apply Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
