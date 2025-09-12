
import { useState } from "react";
import { Camera } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface ImageUploaderProps {
  imageUrl: string;
  name: string;
  initials: string;
  onImageChange: (url: string) => void;
  className?: string;
}

// Add the function to upload images to Supabase storage
export const uploadImageToStorage = async (file: File): Promise<string | null> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = `profile-images/${fileName}`;
    
    const { data, error } = await supabase.storage
      .from('profile-images')
      .upload(filePath, file);
      
    if (error) {
      console.error('Error uploading image:', error);
      return null;
    }
    
    const { data: urlData } = supabase.storage
      .from('profile-images')
      .getPublicUrl(filePath);
      
    return urlData.publicUrl;
  } catch (error) {
    console.error('Error in upload process:', error);
    return null;
  }
};

export function ImageUploader({ imageUrl, name, initials, onImageChange, className }: ImageUploaderProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // First set a temporary preview using FileReader
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === 'string') {
        onImageChange(result); // Set temporary preview image
      }
    };
    reader.readAsDataURL(file);
    
    // Then upload to storage
    setIsUploading(true);
    try {
      const imageUrl = await uploadImageToStorage(file);
      if (imageUrl) {
        onImageChange(imageUrl); // Update with permanent URL
        toast({
          title: "Image uploaded",
          description: "Profile picture has been updated successfully."
        });
      } else {
        toast({
          title: "Upload failed",
          description: "There was a problem uploading your image. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Upload error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };
  
  return (
    <div 
      className={cn(
        "relative group cursor-pointer",
        className
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Avatar className="w-24 h-24 border-2 border-muted">
        <AvatarImage src={imageUrl} alt={name} />
        <AvatarFallback className="text-xl font-semibold">
          {initials}
        </AvatarFallback>
      </Avatar>
      
      <div 
        className={cn(
          "absolute inset-0 bg-black/40 rounded-full flex items-center justify-center transition-opacity", 
          isHovering ? "opacity-100" : "opacity-0"
        )}
      >
        <label>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
            disabled={isUploading}
          />
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="h-8 w-8 bg-background/20 hover:bg-background/40 text-white"
            disabled={isUploading}
          >
            {isUploading ? (
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Camera size={16} />
            )}
            <span className="sr-only">Upload image</span>
          </Button>
        </label>
      </div>
    </div>
  );
}
