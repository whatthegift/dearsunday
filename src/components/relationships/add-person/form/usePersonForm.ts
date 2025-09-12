
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Relationship } from "@/hooks/use-relationships";
import { PersonForm as PersonFormType, personSchema } from "../types";
import { uploadImageToStorage } from "../ImageUploader";

interface UsePersonFormProps {
  initialData?: Relationship;
  onSubmit: (data: PersonFormType) => Promise<void>;
  editMode: boolean;
}

export function usePersonForm({ initialData, onSubmit, editMode }: UsePersonFormProps) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<PersonFormType>({
    resolver: zodResolver(personSchema),
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

  // Function to get initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const handleImageChange = (url: string | null) => {
    form.setValue("profile_image", url || "");
  };

  const handleFormSubmit = async (data: PersonFormType) => {
    // Upload image if a new one is selected
    if (imageFile) {
      setIsUploading(true);
      try {
        const imageUrl = await uploadImageToStorage(imageFile);
        if (imageUrl) {
          data.profile_image = imageUrl;
        }
      } finally {
        setIsUploading(false);
      }
    }
    
    await onSubmit(data);
  };

  const name = form.watch("name");
  const initials = name ? getInitials(name) : "?";

  return {
    form,
    imageFile,
    setImageFile,
    isUploading,
    handleImageChange,
    handleFormSubmit,
    initials
  };
}
