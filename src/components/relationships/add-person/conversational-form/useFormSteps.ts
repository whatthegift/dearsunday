
import { useState, useEffect } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PersonForm, personSchema } from "../types";
import { Relationship } from "@/hooks/use-relationships";
import { steps } from "./stepsConfig";

interface UseFormStepsProps {
  initialData?: Relationship;
  editMode: boolean;
}

interface UseFormStepsReturn {
  form: UseFormReturn<PersonForm>;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  showSummary: boolean;
  setShowSummary: (show: boolean) => void;
  handleNext: () => Promise<void>;
  handleBack: () => void;
  totalSteps: number;
  currentStepData: any;
}

export function useFormSteps({ initialData, editMode }: UseFormStepsProps): UseFormStepsReturn {
  const [currentStep, setCurrentStep] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [validationError, setValidationError] = useState(false);
  
  const form = useForm<PersonForm>({
    resolver: zodResolver(personSchema),
    mode: "onChange",
    defaultValues: editMode && initialData ? {
      name: initialData.name,
      relationship_type: initialData.relationship_type as any,
      custom_relationship_type: initialData.custom_relationship_type,
      email: initialData.contact_info?.email || "",
      phone: initialData.contact_info?.phone || "",
      notes: initialData.notes || "",
      profile_image: initialData.profile_image,
      gift_preferences: {
        likes: initialData.gift_preferences?.likes || "",
        dislikes: initialData.gift_preferences?.dislikes || "",
        sizes: initialData.gift_preferences?.sizes || "",
        interests: Array.isArray(initialData.gift_preferences?.interests) 
          ? initialData.gift_preferences?.interests.join(", ")
          : initialData.gift_preferences?.interests || "",
      }
    } : {
      name: "",
      relationship_type: "family" as any,
      custom_relationship_type: "",
      email: "",
      phone: "",
      notes: "",
      profile_image: "",
      gift_preferences: {
        likes: "",
        dislikes: "",
        sizes: "",
        interests: "",
      }
    }
  });

  const totalSteps = steps.length;
  const currentStepData = steps[currentStep];

  // Reset validation error when step changes
  useEffect(() => {
    setValidationError(false);
  }, [currentStep]);
  
  const validateCurrentStep = async (): Promise<boolean> => {
    // In edit mode, we'll make validation less strict to allow flow progression
    if (editMode) {
      return true;
    }
    
    const fieldsToValidate = currentStepData?.fields || [];
    
    // Only validate if we have fields to validate
    if (fieldsToValidate.length > 0) {
      try {
        console.log("Validating fields:", fieldsToValidate);
        // Trigger validation for the specified fields
        const isValid = await form.trigger(fieldsToValidate as any);
        console.log("Validation result:", isValid, "Form errors:", form.formState.errors);
        return isValid;
      } catch (error) {
        console.error("Validation error:", error);
        return false;
      }
    }
    
    // If no fields to validate, consider step valid
    return true;
  };

  const handleNext = async () => {
    const isValid = await validateCurrentStep();
    
    if (!isValid) {
      setValidationError(true);
      return;
    }
    
    // Move to next step
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowSummary(true);
    }
  };

  const handleBack = () => {
    if (showSummary) {
      setShowSummary(false);
    } else if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return {
    form,
    currentStep,
    setCurrentStep,
    showSummary,
    setShowSummary,
    handleNext,
    handleBack,
    totalSteps,
    currentStepData
  };
}
