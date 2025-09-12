
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Control, UseFormWatch, useFormContext } from "react-hook-form";
import { PersonForm, RelationshipType } from "./types";

interface BasicInfoFormProps {
  control: Control<PersonForm>;
  watch: UseFormWatch<PersonForm>;
}

export function BasicInfoForm({ control, watch }: BasicInfoFormProps) {
  return (
    <>
      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="John Doe" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="relationship_type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Relationship Type</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {watch("relationship_type") === "other" && (
        <FormField
          control={control}
          name="custom_relationship_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Custom Relationship Type</FormLabel>
              <FormControl>
                <Input placeholder="E.g., Mentor, Neighbor" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      
      <FormField
        control={control}
        name="notes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Notes</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Any additional notes about this person"
                rows={3}
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
