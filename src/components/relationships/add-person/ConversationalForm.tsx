
import React, { useMemo } from "react";
import { Form } from "@/components/ui/form";
import { Relationship, Anniversary } from "@/hooks/use-relationships";
import { PersonForm } from "./types";
import { steps, StepContentProps } from "./conversational-form/stepsConfig";
import { useFormSteps } from "./conversational-form/useFormSteps";
import { useImageUpload } from "./conversational-form/useImageUpload";
import { getInitials } from "./conversational-form/utils";
import { FormStepper } from "./conversational-form/FormStepper";
import { FormSummary } from "./conversational-form/FormSummary";

interface ConversationalFormProps {
  initialData?: Relationship;
  onSubmit: (data: PersonForm) => Promise<void>;
  isSubmitting: boolean;
  editMode: boolean;
  relationshipId?: string | null;
  importantDates: Anniversary[];
  refreshDates: () => Promise<void>;
  onAddDate: () => void;
}

export function ConversationalForm({
  initialData,
  onSubmit,
  isSubmitting,
  editMode,
  relationshipId,
  importantDates,
  refreshDates,
  onAddDate
}: ConversationalFormProps) {
  const {
    form,
    currentStep,
    showSummary,
    handleNext,
    handleBack,
    totalSteps,
    currentStepData
  } = useFormSteps({ initialData, editMode });

  const { isUploading, handleImageChange, processImageUpload } = useImageUpload();

  const name = form.watch("name");
  const initials = name ? getInitials(name) : "?";

  const handleFormSubmit = async (data: PersonForm) => {
    const processedData = await processImageUpload(data);
    await onSubmit(processedData);
  };

  // Memoize this function to prevent it from changing between renders
  const renderStepContent = useMemo(() => {
    if (showSummary) {
      return (
        <FormSummary
          form={form}
          initials={initials}
          onImageChange={handleImageChange}
          onSubmit={form.handleSubmit(handleFormSubmit)}
          isSubmitting={isSubmitting}
          isUploading={isUploading}
        />
      );
    }

    // Ensure currentStepData exists before trying to call its renderContent
    if (!currentStepData) {
      return null;
    }

    // Render the current step content
    return currentStepData.renderContent({ 
      form, 
      onAddDate, 
      importantDates, 
      refreshDates, 
      relationshipId 
    });
  }, [
    currentStepData, 
    showSummary, 
    form, 
    onAddDate,
    importantDates,
    refreshDates,
    relationshipId,
    initials,
    isSubmitting,
    isUploading,
    handleFormSubmit
  ]);

  return (
    <Form {...form}>
      <form className="space-y-4">
        <div className="p-6 animate-fade-in">
          <div className="space-y-6">
            {renderStepContent}
          </div>
          
          {!showSummary && (
            <FormStepper
              currentStep={currentStep}
              onNext={handleNext}
              onBack={handleBack}
              isLastStep={currentStep === totalSteps - 1}
            />
          )}
        </div>
      </form>
    </Form>
  );
}
