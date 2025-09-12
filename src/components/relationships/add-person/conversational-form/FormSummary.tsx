
import React from "react";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { ImageUploader } from "../ImageUploader";
import { UseFormReturn } from "react-hook-form";
import { PersonForm } from "../types";

interface FormSummaryProps {
  form: UseFormReturn<PersonForm>;
  initials: string;
  onImageChange: (url: string | null) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  isUploading: boolean;
}

export function FormSummary({
  form,
  initials,
  onImageChange,
  onSubmit,
  isSubmitting,
  isUploading
}: FormSummaryProps) {
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-center mb-6">
        <ImageUploader
          imageUrl={form.getValues().profile_image}
          name={form.getValues().name}
          initials={initials}
          onImageChange={onImageChange}
          className="mx-auto"
        />
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-center">
          <span className="text-gift-lavender">✨</span> All set! You've added {form.getValues().name || "someone"} to your people.
        </h3>
        <p className="text-muted-foreground text-center">
          I'll help you remember them beautifully and suggest meaningful gifts when the time comes.
        </p>
      </div>
      
      <div className="flex flex-col gap-3 pt-4">
        <Button 
          type="submit" 
          onClick={onSubmit}
          disabled={isSubmitting || isUploading}
          className="w-full"
        >
          <Sparkles className="mr-2 h-4 w-4" />
          {isUploading ? "Uploading image..." : "Save This Person"}
        </Button>
      </div>
    </div>
  );
}
