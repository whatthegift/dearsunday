
import React, { useState } from "react";
import { FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Plus } from "lucide-react";
import { BaseStepLayout } from "./BaseStepLayout";
import { UseFormReturn } from "react-hook-form";
import { PersonForm } from "../../types";

interface VibeStepProps {
  form: UseFormReturn<PersonForm>;
}

export function VibeStep({ form }: VibeStepProps) {
  // Create state for the interest input
  const [interestInput, setInterestInput] = useState("");
  
  // Get interests and convert to an array
  const interestsString = form.watch("gift_preferences.interests") || "";
  const interests = interestsString ? interestsString.split(",").map(i => i.trim()).filter(Boolean) : [];
  
  const addInterest = () => {
    if (!interestInput.trim()) return;
    
    const newInterests = [...interests, interestInput.trim()];
    form.setValue("gift_preferences.interests", newInterests.join(", "));
    setInterestInput("");
  };
  
  const removeInterest = (interest: string) => {
    const newInterests = interests.filter(i => i !== interest);
    form.setValue("gift_preferences.interests", newInterests.join(", "));
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addInterest();
    }
  };

  return (
    <BaseStepLayout
      emoji="✨"
      title="What makes them them?"
      description="Tell me a little about their vibe. Are they creative? Practical? Funny? Quietly kind?"
    >
      <div>
        <div className="flex gap-2 mb-3">
          <Input
            value={interestInput}
            onChange={(e) => setInterestInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="E.g., Creative, Sentimental, Outdoor enthusiast"
            className="flex-1"
          />
          <Button type="button" size="sm" onClick={addInterest}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-2">
          {interests.map((interest, i) => (
            <Badge key={i} variant="secondary" className="flex gap-1 items-center px-2 py-1 bg-gift-cream">
              {interest}
              <X
                className="h-3 w-3 cursor-pointer opacity-70 hover:opacity-100"
                onClick={() => removeInterest(interest)}
              />
            </Badge>
          ))}
          {interests.length === 0 && (
            <div className="text-sm text-muted-foreground italic">
              Add tags that describe them
            </div>
          )}
        </div>
        <FormField
          control={form.control}
          name="gift_preferences.interests"
          render={({ field }) => (
            <FormItem className="hidden">
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </BaseStepLayout>
  );
}
