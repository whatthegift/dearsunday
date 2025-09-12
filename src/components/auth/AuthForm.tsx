
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
type AuthMode = "signin" | "signup";
interface AuthFormProps {
  onSuccess?: () => void;
}
export function AuthForm({
  onSuccess
}: AuthFormProps) {
  const [mode, setMode] = useState<AuthMode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {
    signIn,
    signUp
  } = useAuth();
  const {
    toast
  } = useToast();
  const toggleMode = () => {
    setMode(mode === "signin" ? "signup" : "signin");
    // Reset fields when toggling
    setEmail("");
    setPassword("");
    setDisplayName("");
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (mode === "signin") {
        const {
          error
        } = await signIn(email, password);
        if (error) throw error;
        if (onSuccess) onSuccess();
      } else {
        if (!displayName.trim()) {
          toast({
            title: "Missing Information",
            description: "Please provide a display name",
            variant: "destructive"
          });
          setIsLoading(false);
          return;
        }
        const {
          error
        } = await signUp(email, password, {
          display_name: displayName
        });
        if (error) throw error;
        if (onSuccess) onSuccess();
      }
    } catch (error: any) {
      console.error("Authentication error:", error);
      toast({
        title: "Authentication Error",
        description: error.message || "An error occurred during authentication",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  return <Card className="w-full border-0 shadow-none">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-sm">
          {mode === "signin" ? "Sign In" : "Create Account"}
        </CardTitle>
        <CardDescription className="text-xs">
          {mode === "signin" ? "Enter your credentials to access your account" : "Fill in the information to create your account"}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && <div className="space-y-2">
              <label htmlFor="displayName" className="text-sm font-medium">
                Display Name
              </label>
              <Input id="displayName" value={displayName} onChange={e => setDisplayName(e.target.value)} disabled={isLoading} required />
            </div>}
          
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} disabled={isLoading} required />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} disabled={isLoading} required />
          </div>
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {mode === "signin" ? "Signing In..." : "Creating Account..."}
              </> : mode === "signin" ? "Sign In" : "Create Account"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="px-0 pt-4 flex justify-center">
        <Button variant="link" onClick={toggleMode}>
          {mode === "signin" ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
        </Button>
      </CardFooter>
    </Card>;
}
