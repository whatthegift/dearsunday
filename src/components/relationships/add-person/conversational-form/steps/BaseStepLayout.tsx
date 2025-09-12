
import React from "react";

interface BaseStepLayoutProps {
  emoji: string;
  title: string;
  description: string;
  children: React.ReactNode;
}

export function BaseStepLayout({ 
  emoji, 
  title, 
  description, 
  children 
}: BaseStepLayoutProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">
          <span className="text-gift-lavender">{emoji}</span> {title}
        </h3>
        <p className="text-muted-foreground">
          {description}
        </p>
      </div>
      {children}
    </div>
  );
}
