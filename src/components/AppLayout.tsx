
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "./AppSidebar";
import { ReactNode } from "react";
import { ChevronRight } from "lucide-react";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 overflow-auto">
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex items-center gap-4 mb-6">
              <SidebarTrigger className="lg:hidden">
                <span className="sr-only">Toggle menu</span>
                <ChevronRight className="h-6 w-6" />
              </SidebarTrigger>
            </div>
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
