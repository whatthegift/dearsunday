
import React from "react";
import { FormField, FormItem, FormControl, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { BaseStepLayout } from "./BaseStepLayout";
import { UseFormReturn } from "react-hook-form";
import { PersonForm } from "../../types";

interface ContactStepProps {
  form: UseFormReturn<PersonForm>;
}

export function ContactStep({ form }: ContactStepProps) {
  return (
    <BaseStepLayout
      emoji="📱"
      title="Contact details"
      description="Would you like to add any contact details? This is entirely optional."
    >
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="(123) 456-7890" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </BaseStepLayout>
  );
}
