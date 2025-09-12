
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CalendarDays, Gift, Info, Settings, User, Mail, Phone } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const profileSchema = z.object({
  display_name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  phone: z.string().optional(),
  gift_preferences: z.object({
    likes: z.string().optional(),
    dislikes: z.string().optional(),
    sizes: z.string().optional(),
    interests: z.string().optional(),
  }).optional(),
  notes: z.string().optional(),
  timezone: z.string(),
  date_format: z.string(),
  currency_preference: z.string()
});

type ProfileForm = z.infer<typeof profileSchema>;

export default function SettingsPage() {
  const { profile, updateProfile } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      display_name: profile?.display_name || "",
      email: profile?.email || "",
      phone: "", // No phone field in profile by default
      gift_preferences: {
        likes: profile?.preferences?.gift_preferences?.likes || "",
        dislikes: profile?.preferences?.gift_preferences?.dislikes || "",
        sizes: profile?.preferences?.gift_preferences?.sizes || "",
        interests: profile?.preferences?.gift_preferences?.interests || "",
      },
      notes: profile?.preferences?.notes || "",
      timezone: profile?.timezone || "UTC",
      date_format: profile?.date_format || "MM/DD/YYYY",
      currency_preference: profile?.currency_preference || "USD",
    }
  });

  const onSubmit = async (data: ProfileForm) => {
    setIsLoading(true);
    try {
      // Prepare the update data structure to match what the backend expects
      const updateData = {
        display_name: data.display_name,
        timezone: data.timezone,
        date_format: data.date_format,
        currency_preference: data.currency_preference,
        preferences: {
          ...profile?.preferences,
          gift_preferences: data.gift_preferences,
          notes: data.notes
        }
      };
      
      await updateProfile(updateData);
      
      toast({
        title: "Settings updated",
        description: "Your profile settings have been saved successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 animated-entry">
      <div>
        <h1 className="tracking-tight text-base font-semibold">⚙️ Tweak the Magic</h1>
        <p className="text-muted-foreground mt-1">
          Manage your account settings and preferences
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="personal" className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>Personal Info</span>
              </TabsTrigger>
              <TabsTrigger value="preferences" className="flex items-center gap-1">
                <Settings className="h-4 w-4" />
                <span>Preferences</span>
              </TabsTrigger>
              <TabsTrigger value="gift" className="flex items-center gap-1">
                <Gift className="h-4 w-4" />
                <span>Gift Preferences</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Update your basic profile information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="display_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Display Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="(123) 456-7890" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Notes</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Any additional notes about yourself"
                            rows={3}
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="preferences">
              <Card>
                <CardHeader>
                  <CardTitle>App Preferences</CardTitle>
                  <CardDescription>
                    Customize how the app works for you
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="timezone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Timezone</FormLabel>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select timezone" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="UTC">UTC</SelectItem>
                            <SelectItem value="America/New_York">Eastern Time</SelectItem>
                            <SelectItem value="America/Chicago">Central Time</SelectItem>
                            <SelectItem value="America/Denver">Mountain Time</SelectItem>
                            <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="date_format"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date Format</FormLabel>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select date format" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                            <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                            <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="currency_preference"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Currency</FormLabel>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select currency" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="USD">USD ($)</SelectItem>
                            <SelectItem value="EUR">EUR (€)</SelectItem>
                            <SelectItem value="GBP">GBP (£)</SelectItem>
                            <SelectItem value="CAD">CAD ($)</SelectItem>
                            <SelectItem value="AUD">AUD ($)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="gift">
              <Card>
                <CardHeader>
                  <CardTitle>Gift Preferences</CardTitle>
                  <CardDescription>
                    Let others know what you like and dislike
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="gift_preferences.likes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Likes</FormLabel>
                        <FormControl>
                          <Input placeholder="What you like" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="gift_preferences.dislikes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dislikes</FormLabel>
                        <FormControl>
                          <Input placeholder="What you dislike" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="gift_preferences.sizes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sizes</FormLabel>
                        <FormControl>
                          <Input placeholder="Clothing sizes, etc." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="gift_preferences.interests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Interests</FormLabel>
                        <FormControl>
                          <Input placeholder="Hobbies, interests" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="mt-6">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
