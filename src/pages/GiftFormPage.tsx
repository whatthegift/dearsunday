
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useRelationships } from '@/hooks/use-relationships';
import { useGifts } from '@/hooks/gifts'; // Updated import path
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CalendarIcon, ArrowLeft, Gift } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export default function GiftFormPage() {
  const [searchParams] = useSearchParams();
  const relationshipId = searchParams.get('relationshipId') || searchParams.get('recipient');
  const navigate = useNavigate();
  const { toast } = useToast();
  const { getRelationship } = useRelationships();
  const { createGift } = useGifts();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    occasion: '',
    date_given: new Date(),
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Get relationship data if relationshipId is provided
  const relationshipQuery = relationshipId 
    ? getRelationship(relationshipId) 
    : { data: null, isLoading: false };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setFormData(prev => ({
        ...prev,
        date_given: date
      }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name) {
      toast({
        title: "Error",
        description: "Gift name is required",
        variant: "destructive"
      });
      return;
    }
    
    if (!relationshipId) {
      toast({
        title: "Error",
        description: "Recipient is required",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      await createGift.mutateAsync({
        name: formData.name,
        notes: formData.description,
        price: formData.price ? parseFloat(formData.price) : undefined,
        occasion: formData.occasion,
        date_given: formData.date_given.toISOString(),
        recipient_id: relationshipId
      });
      
      toast({
        title: "Success",
        description: "Gift added successfully"
      });
      
      // Navigate back to the person's profile
      navigate(`/person/${relationshipId}`);
    } catch (error) {
      console.error("Error adding gift:", error);
      toast({
        title: "Error",
        description: "Failed to add gift",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleCancel = () => {
    if (relationshipId) {
      navigate(`/person/${relationshipId}`);
    } else {
      navigate('/relationships');
    }
  };
  
  if (relationshipQuery.isLoading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }
  
  return (
    <div className="container max-w-2xl mx-auto py-8 px-4">
      <Button 
        variant="ghost" 
        className="mb-6 pl-0" 
        onClick={handleCancel}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5" />
            {relationshipQuery.data 
              ? `Add Gift for ${relationshipQuery.data.name}` 
              : 'Add New Gift'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Gift Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="What did you give?"
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Any details about the gift?"
                  className="min-h-[100px]"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="How much did it cost?"
                  />
                </div>
                
                <div>
                  <Label htmlFor="occasion">Occasion</Label>
                  <Input
                    id="occasion"
                    name="occasion"
                    value={formData.occasion}
                    onChange={handleInputChange}
                    placeholder="What was the occasion?"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="date">Date Given</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="date"
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.date_given ? format(formData.date_given, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.date_given}
                      onSelect={handleDateChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </> : 
                  'Save Gift'
                }
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
