
import React from "react";
import { FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BaseStepLayout } from "./BaseStepLayout";
import { UseFormReturn } from "react-hook-form";
import { PersonForm } from "../../types";

interface RelationshipStepProps {
  form: UseFormReturn<PersonForm>;
}

export function RelationshipStep({ form }: RelationshipStepProps) {
  return (
    <BaseStepLayout
      emoji="🧡"
      title="What's your relationship with them?"
      description="How would you describe your connection?"
    >
      <FormField
        control={form.control}
        name="relationship_type"
        render={({ field }) => (
          <FormItem>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select relationship type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="family">Family</SelectItem>
                <SelectItem value="friend">Friend</SelectItem>
                <SelectItem value="colleague">Colleague</SelectItem>
                <SelectItem value="partner">Partner</SelectItem>
                <SelectItem value="acquaintance">Acquaintance</SelectItem>
                <SelectItem value="other">Something else...</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {form.watch("relationship_type") === "other" && (
        <FormField
          control={form.control}
          name="custom_relationship_type"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="E.g., Mentor, Neighbor" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </BaseStepLayout>
  );
}
