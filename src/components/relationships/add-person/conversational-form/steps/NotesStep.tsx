
import React from "react";
import { FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { BaseStepLayout } from "./BaseStepLayout";
import { UseFormReturn } from "react-hook-form";
import { PersonForm } from "../../types";

interface NotesStepProps {
  form: UseFormReturn<PersonForm>;
}

export function NotesStep({ form }: NotesStepProps) {
  return (
    <BaseStepLayout
      emoji="📝"
      title="A little note for your future self"
      description="Why do you want to remember this person? A memory, a feeling, anything."
    >
      <FormField
        control={form.control}
        name="notes"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Textarea
                placeholder="Something to remind you why this person matters..."
                className="min-h-[150px]"
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
