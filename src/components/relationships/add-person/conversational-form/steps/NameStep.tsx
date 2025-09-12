
import React from "react";
import { FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { BaseStepLayout } from "./BaseStepLayout";
import { UseFormReturn } from "react-hook-form";
import { PersonForm } from "../../types";

interface NameStepProps {
  form: UseFormReturn<PersonForm>;
}

export function NameStep({ form }: NameStepProps) {
  return (
    <BaseStepLayout
      emoji="🪄"
      title="Who is this for?"
      description="Let's add someone special. What's their name?"
    >
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input 
                placeholder="Their name" 
                {...field} 
                className="text-lg" 
                autoFocus
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </BaseStepLayout>
  );
}
