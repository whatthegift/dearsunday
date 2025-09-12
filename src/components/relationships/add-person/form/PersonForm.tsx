
import { Form } from "@/components/ui/form";
import { Relationship, Anniversary } from "@/hooks/use-relationships";
import { PersonForm as PersonFormType } from "../types";
import { usePersonForm } from "./usePersonForm";
import { 
  ProfileImageSection, 
  PersonalInfoSection, 
  ContactSection, 
  GiftPreferencesSection, 
  DatesAndSubmitSection 
} from "./PersonFormSections";

interface PersonFormProps {
  initialData?: Relationship;
  onSubmit: (data: PersonFormType) => Promise<void>;
  isSubmitting: boolean;
  editMode: boolean;
  relationshipId?: string | null;
  importantDates: Anniversary[];
  refreshDates: () => Promise<void>;
  onAddDate: () => void;
}

export function PersonForm({
  initialData,
  onSubmit,
  isSubmitting,
  editMode,
  relationshipId,
  importantDates,
  refreshDates,
  onAddDate
}: PersonFormProps) {
  const {
    form,
    isUploading,
    handleImageChange,
    handleFormSubmit,
    initials
  } = usePersonForm({
    initialData,
    onSubmit,
    editMode
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
        {/* Profile Image Upload */}
        <ProfileImageSection
          imageUrl={form.getValues().profile_image}
          name={form.getValues().name}
          initials={initials}
          onImageChange={handleImageChange}
        />
        
        {/* Basic Information */}
        <PersonalInfoSection control={form.control} watch={form.watch} />
        
        {/* Contact Information */}
        <ContactSection control={form.control} />
        
        {/* Gift Preferences */}
        <GiftPreferencesSection control={form.control} />

        {/* Important Dates Section and Submit Button */}
        <DatesAndSubmitSection
          relationshipId={relationshipId}
          importantDates={importantDates}
          refreshDates={refreshDates}
          isSubmitting={isSubmitting}
          isUploading={isUploading}
          editMode={editMode}
        />
      </form>
    </Form>
  );
}
