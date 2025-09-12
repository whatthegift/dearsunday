
import { 
  Card,
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // If user is already logged in, redirect them to the dashboard
  if (user) {
    navigate('/dashboard');
    return null;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gift-lavender to-gift-peach py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2 space-y-4">
              <h1 className="text-4xl font-bold tracking-tight">
                Never Forget a Special Moment
              </h1>
              <p className="text-xl text-muted-foreground">
                Keep track of important dates, manage gift ideas, and always give the perfect gift with GiftYourThought.
              </p>
              <div className="pt-4">
                <Button onClick={() => navigate('/auth')} className="bg-gift-yellow hover:bg-gift-yellow-dark text-black">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img 
                src="/lovable-uploads/eede71e4-fb7b-4e16-92ee-8b4d11758b97.png" 
                alt="GiftYourThought" 
                className="max-w-xs md:max-w-sm"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="container mx-auto py-16 px-4">
        <h2 className="text-center text-[1.1rem] font-semibold mb-12">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-[1.1rem]">Important Dates</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Never miss a birthday, anniversary, or special occasion with our date reminder system.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-[1.1rem]">Gift Ideas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Store and organize gift ideas year-round so you're always prepared for any occasion.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-[1.1rem]">Sunday, Your Gift Assistant</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Get personalized gift suggestions and advice from our intelligent gift assistant.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-gift-cream py-12">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-[1.1rem] font-semibold mb-4">
            Start Your Thoughtful Gift Journey Today
          </h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Join thousands of thoughtful gift-givers who never miss a special moment.
          </p>
          <Button onClick={() => navigate('/auth')} className="bg-gift-yellow hover:bg-gift-yellow-dark text-black">
            Create Your Account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
