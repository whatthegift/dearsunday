
import { useState } from "react";
import { uploadImageToStorage } from "../ImageUploader";
import { PersonForm } from "../types";
import { useToast } from "@/hooks/use-toast";

export function useImageUpload() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleImageChange = (url: string, file?: File) => {
    if (file) {
      setImageFile(file);
    }
    return url || "";
  };

  const processImageUpload = async (data: PersonForm): Promise<PersonForm> => {
    // If there's a base64 data URL in profile_image, we need to convert it to a file and upload
    if (data.profile_image && data.profile_image.startsWith('data:image')) {
      setIsUploading(true);
      try {
        // Convert base64 to File
        const response = await fetch(data.profile_image);
        const blob = await response.blob();
        const file = new File([blob], "profile-image.jpg", { type: blob.type });
        
        // Upload to Supabase
        const imageUrl = await uploadImageToStorage(file);
        if (imageUrl) {
          data.profile_image = imageUrl;
          toast({
            title: "Image uploaded",
            description: "Profile picture has been saved successfully."
          });
        } else {
          toast({
            title: "Image upload failed",
            description: "Could not upload profile picture. The profile will be saved without an image.",
            variant: "destructive"
          });
        }
      } catch (error) {
        console.error("Error processing image upload:", error);
        toast({
          title: "Image processing error",
          description: "There was a problem with your image. The profile will be saved without it.",
          variant: "destructive"
        });
        data.profile_image = ""; // Reset if there's an error
      } finally {
        setIsUploading(false);
      }
    }
    
    // Upload image file if a new one is selected through the file input
    if (imageFile && !data.profile_image.startsWith('http')) {
      setIsUploading(true);
      try {
        const imageUrl = await uploadImageToStorage(imageFile);
        if (imageUrl) {
          data.profile_image = imageUrl;
        }
      } catch (error) {
        console.error("Error uploading image file:", error);
      } finally {
        setIsUploading(false);
      }
    }
    
    return data;
  };

  return {
    imageFile,
    setImageFile,
    isUploading,
    handleImageChange,
    processImageUpload
  };
}
