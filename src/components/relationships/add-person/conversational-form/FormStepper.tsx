
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { steps } from "./stepsConfig";

interface FormStepperProps {
  currentStep: number;
  onNext: () => void;
  onBack: () => void;
  isLastStep: boolean;
}

export function FormStepper({ 
  currentStep, 
  onNext, 
  onBack, 
  isLastStep 
}: FormStepperProps) {
  return (
    <div className="flex justify-between pt-8">
      <Button 
        type="button" 
        variant="outline"
        onClick={onBack}
        disabled={currentStep === 0}
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        Back
      </Button>
      
      <div className="flex-1 flex justify-center">
        <div className="flex gap-1">
          {steps.map((_, index) => (
            <div 
              key={index}
              className={`h-1 rounded-full ${
                index === currentStep 
                  ? "bg-gift-lavender w-6" 
                  : index < currentStep 
                  ? "bg-gift-lavender/60 w-3" 
                  : "bg-muted w-3"
              } transition-all`}
            />
          ))}
        </div>
      </div>
      
      <Button 
        type="button"
        onClick={onNext}
      >
        {isLastStep ? "Review" : "Next"}
        <ChevronRight className="ml-1 h-4 w-4" />
      </Button>
    </div>
  );
}
