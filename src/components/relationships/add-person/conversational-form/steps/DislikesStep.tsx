
import React from "react";
import { FormField, FormItem, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { BaseStepLayout } from "./BaseStepLayout";
import { UseFormReturn } from "react-hook-form";
import { PersonForm } from "../../types";

interface DislikesStepProps {
  form: UseFormReturn<PersonForm>;
}

export function DislikesStep({ form }: DislikesStepProps) {
  return (
    <BaseStepLayout
      emoji="🚫"
      title="Anything they don't like?"
      description="Any no-gift zones? Things they wouldn't enjoy?"
    >
      <FormField
        control={form.control}
        name="gift_preferences.dislikes"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Textarea
                placeholder="Things they'd rather not receive..."
                className="min-h-[100px]"
                {...field}
              />
            </FormControl>
            <FormDescription>
              This is optional, but helps avoid gift mistakes.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </BaseStepLayout>
  );
}
