
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md px-4">
        <div className="mb-4">
          <span className="inline-block p-4 bg-gift-lavender rounded-full animate-pulse-soft">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary"
            >
              <path d="M10.308 5c1.324 0 3.698.267 5.125 1.908 1.174 1.35 1.064 3.039.885 4.75-.072.582-.216 1.145-.373 1.684a9.015 9.015 0 0 1-.468 1.312" />
              <path d="M17 15.778a2.05 2.05 0 0 0 2-2.15V8.046a2 2 0 1 0-4 0v5.582a2.05 2.05 0 0 0 2 2.15zM12 15.778a2 2 0 0 0 2-2V5a2 2 0 1 0-4 0v8.778a2 2 0 0 0 2 2zM7 15.778a2 2 0 0 0 2-2V8.046a2 2 0 1 0-4 0v5.732a2 2 0 0 0 2 2z" />
              <path d="M17 15.778V20a2 2 0 0 1-2 2h-4a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H8a1 1 0 0 1-1-1v-1" />
            </svg>
          </span>
        </div>
        <h1 className="text-base font-semibold text-primary mb-2">❓ Oops!</h1>
        <h2 className="text-2xl font-medium mb-4">Page Not Found</h2>
        <p className="mb-6 text-muted-foreground">
          The page you're looking for doesn't seem to exist. Let's help you find your way back.
        </p>
        <Button
          onClick={() => navigate("/")}
          className="px-4 py-2 inline-flex items-center gap-2"
        >
          <Home className="h-4 w-4" />
          <span>Return to Dashboard</span>
        </Button>
      </div>
    </div>
  );
}
