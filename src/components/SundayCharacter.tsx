
import { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";

export type SundayMood = 'neutral' | 'thinking' | 'excited' | 'listening' | 'celebrating';
export type SundaySize = 'icon' | 'mini' | 'medium' | 'large';

interface SundayCharacterProps {
  mood?: SundayMood;
  size?: SundaySize;
  animated?: boolean;
  className?: string;
}

const SundayCharacter = ({ 
  mood = 'neutral', 
  size = 'medium', 
  animated = true,
  className
}: SundayCharacterProps) => {
  const [currentMood, setCurrentMood] = useState<SundayMood>(mood);
  
  // Update mood when prop changes
  useEffect(() => {
    setCurrentMood(mood);
  }, [mood]);

  // Size classes
  const sizeClasses = {
    icon: 'w-8 h-8',
    mini: 'w-12 h-12',
    medium: 'w-20 h-20',
    large: 'w-32 h-32'
  };

  // Animation classes
  const animationClass = animated ? {
    neutral: 'animate-float',
    thinking: 'animate-pulse-soft',
    excited: 'animate-bounce-subtle',
    listening: 'animate-pulse-soft',
    celebrating: 'animate-bounce-subtle'
  }[currentMood] : '';

  // Facial expression based on mood
  const renderFace = () => {
    return (
      <div className="sunday-face">
        <div className="eyes flex justify-center space-x-2 mt-3">
          <div className="eye w-1.5 h-1.5 bg-gift-gray-800 rounded-full"></div>
          <div className="eye w-1.5 h-1.5 bg-gift-gray-800 rounded-full"></div>
        </div>
        <div className="mouth w-3 h-1 mt-1.5 mx-auto border-b-2 border-gift-gray-800 rounded"></div>
      </div>
    );
  };

  return (
    <div 
      className={cn(
        "relative flex items-center justify-center", 
        sizeClasses[size], 
        animationClass,
        className
      )}
    >
      {/* Custom Gift Box Base */}
      <div className="gift-box relative w-full h-full bg-gift-yellow rounded-lg shadow-sunday">
        {/* Gift Box Lid */}
        <div className="gift-lid absolute -top-1/4 left-0 w-full h-1/4 bg-gift-yellow-dark rounded-t-lg"></div>
        
        {/* Ribbon */}
        <div className="ribbon absolute top-0 left-1/2 -translate-x-1/2 w-1/5 h-full bg-gift-coral"></div>
        <div className="ribbon-horizontal absolute top-1/2 left-0 -translate-y-1/2 w-full h-1/5 bg-gift-coral"></div>
        
        {/* Bow */}
        <div className="bow absolute -top-2/5 left-1/2 -translate-x-1/2">
          <div className="bow-left absolute -left-3 -top-1 w-3 h-4 bg-gift-coral rounded-full transform -rotate-45"></div>
          <div className="bow-right absolute left-0 -top-1 w-3 h-4 bg-gift-coral rounded-full transform rotate-45"></div>
          <div className="bow-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gift-coral-dark rounded-full"></div>
        </div>
        
        {/* Face */}
        {renderFace()}
      </div>
    </div>
  );
};

export default SundayCharacter;
