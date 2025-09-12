
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { PersonForm } from "./types";

interface GiftPreferencesFormProps {
  control: Control<PersonForm>;
}

export function GiftPreferencesForm({ control }: GiftPreferencesFormProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Gift Preferences</h3>
      
      <FormField
        control={control}
        name="gift_preferences.likes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Likes</FormLabel>
            <FormControl>
              <Input placeholder="What they like" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="gift_preferences.dislikes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Dislikes</FormLabel>
            <FormControl>
              <Input placeholder="What they dislike" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="gift_preferences.sizes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Sizes</FormLabel>
            <FormControl>
              <Input placeholder="Clothing sizes, etc." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="gift_preferences.interests"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Interests</FormLabel>
            <FormControl>
              <Input placeholder="Hobbies, interests" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
