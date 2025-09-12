
import React from "react";
import { FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { BaseStepLayout } from "./BaseStepLayout";
import { UseFormReturn } from "react-hook-form";
import { PersonForm } from "../../types";

interface LikesStepProps {
  form: UseFormReturn<PersonForm>;
}

export function LikesStep({ form }: LikesStepProps) {
  return (
    <BaseStepLayout
      emoji="📚"
      title="What do they love?"
      description="Jot down their favorite things—books, chai, gardening, anything you remember."
    >
      <FormField
        control={form.control}
        name="gift_preferences.likes"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Textarea
                placeholder="Their favorite things..."
                className="min-h-[120px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </BaseStepLayout>
  );
}
