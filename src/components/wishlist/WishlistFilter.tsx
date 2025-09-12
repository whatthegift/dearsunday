
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";

// Sample filter options
const categories = ["Electronics", "Home", "Experience", "Fashion", "Food & Drink", "Books", "Sports", "Beauty"];
const occasions = ["Birthday", "Anniversary", "Christmas", "Graduation", "Wedding", "Appreciation", "Other"];
const priorities = ["High", "Medium", "Low"];

export function WishlistFilter() {
  const [priceRange, setPriceRange] = useState<number[]>([0, 300]);
  
  return (
    <div className="p-4 max-h-[70vh] overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">Filters</h3>
        <Button variant="ghost" size="sm" className="h-8 text-xs">Reset All</Button>
      </div>
      
      <Accordion type="multiple" defaultValue={["price", "category", "priority"]} className="w-full">
        <AccordionItem value="price">
          <AccordionTrigger className="text-sm py-2">Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 py-2">
              <Slider
                defaultValue={[0, 300]}
                max={500}
                step={10}
                value={priceRange}
                onValueChange={(value) => setPriceRange(value)}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}+</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="category">
          <AccordionTrigger className="text-sm py-2">Categories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 py-1">
              {categories.map(category => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox id={`category-${category}`} />
                  <Label htmlFor={`category-${category}`} className="text-sm font-normal">
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="occasion">
          <AccordionTrigger className="text-sm py-2">Occasions</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 py-1">
              {occasions.map(occasion => (
                <div key={occasion} className="flex items-center space-x-2">
                  <Checkbox id={`occasion-${occasion}`} />
                  <Label htmlFor={`occasion-${occasion}`} className="text-sm font-normal">
                    {occasion}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="priority">
          <AccordionTrigger className="text-sm py-2">Priority</AccordionTrigger>
          <AccordionContent>
            <RadioGroup defaultValue="all" className="py-1">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="priority-all" />
                <Label htmlFor="priority-all" className="text-sm font-normal">All</Label>
              </div>
              {priorities.map(priority => (
                <div key={priority} className="flex items-center space-x-2">
                  <RadioGroupItem value={priority} id={`priority-${priority}`} />
                  <Label htmlFor={`priority-${priority}`} className="text-sm font-normal">
                    {priority}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="dateAdded">
          <AccordionTrigger className="text-sm py-2">Date Added</AccordionTrigger>
          <AccordionContent>
            <div className="py-2">
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select time period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="anytime">Anytime</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="thisWeek">This Week</SelectItem>
                  <SelectItem value="thisMonth">This Month</SelectItem>
                  <SelectItem value="last3Months">Last 3 Months</SelectItem>
                  <SelectItem value="custom">Custom...</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <div className="pt-4 mt-2">
        <Button className="w-full" size="sm">
          Apply Filters
        </Button>
      </div>
    </div>
  );
}
