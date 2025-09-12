
import { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { AuthForm } from "./AuthForm";
import { Loader2 } from "lucide-react";

interface ProtectedRoutesProps {
  children?: ReactNode;
  redirectTo?: string;
}

export function ProtectedRoutes({ children, redirectTo = "/dashboard" }: ProtectedRoutesProps) {
  const { user, isLoading } = useAuth();

  // Display a loading indicator while checking authentication status
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading authentication...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, render the auth form
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome to GiftYourThought</h1>
          <p className="text-muted-foreground">
            Sign in to manage your relationships and never forget an important occasion again.
          </p>
        </div>
        <AuthForm />
      </div>
    );
  }

  // If authenticated, render the children or the outlet (for nested routes)
  return children ? <>{children}</> : <Outlet />;
}

export default ProtectedRoutes;
