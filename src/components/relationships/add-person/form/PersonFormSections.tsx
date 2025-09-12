
import React from "react";
import { ImageUploader } from "../ImageUploader";
import { BasicInfoForm } from "../BasicInfoForm";
import { ContactInfoForm } from "../ContactInfoForm";
import { GiftPreferencesForm } from "../GiftPreferencesForm";
import { ImportantDatesSection } from "../../dates/ImportantDatesSection";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import { PersonForm } from "../types";
import { Anniversary } from "@/hooks/use-relationships";

interface ProfileImageSectionProps {
  imageUrl: string;
  name: string;
  initials: string;
  onImageChange: (url: string | null) => void;
}

export function ProfileImageSection({ imageUrl, name, initials, onImageChange }: ProfileImageSectionProps) {
  return (
    <ImageUploader
      imageUrl={imageUrl}
      name={name}
      initials={initials}
      onImageChange={onImageChange}
    />
  );
}

interface PersonalInfoSectionProps {
  control: UseFormReturn<PersonForm>["control"];
  watch: UseFormReturn<PersonForm>["watch"]; 
}

export function PersonalInfoSection({ control, watch }: PersonalInfoSectionProps) {
  return <BasicInfoForm control={control} watch={watch} />;
}

interface ContactSectionProps {
  control: UseFormReturn<PersonForm>["control"];
}

export function ContactSection({ control }: ContactSectionProps) {
  return <ContactInfoForm control={control} />;
}

interface GiftPreferencesSectionProps {
  control: UseFormReturn<PersonForm>["control"];
}

export function GiftPreferencesSection({ control }: GiftPreferencesSectionProps) {
  return <GiftPreferencesForm control={control} />;
}

interface DatesAndSubmitSectionProps {
  relationshipId?: string | null;
  importantDates: Anniversary[];
  refreshDates: () => Promise<void>;
  isSubmitting: boolean;
  isUploading: boolean;
  editMode: boolean;
}

export function DatesAndSubmitSection({ 
  relationshipId, 
  importantDates, 
  refreshDates,
  isSubmitting, 
  isUploading, 
  editMode 
}: DatesAndSubmitSectionProps) {
  return (
    <>
      <ImportantDatesSection 
        relationshipId={relationshipId || ""}
        dates={importantDates}
        onDatesChange={() => {}}
      />
      
      <Button 
        type="submit" 
        disabled={isSubmitting || isUploading}
      >
        {isUploading ? "Uploading image..." : (editMode ? "Save" : "Add Person")}
      </Button>
    </>
  );
}
