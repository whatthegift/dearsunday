
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem,
  useSidebar 
} from "@/components/ui/sidebar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function AppSidebar() {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === "collapsed";
  
  const navItems = [
    {
      title: "💛 Home of Thoughts",
      path: "/dashboard",
      iconText: "💛"
    },
    {
      title: "🤝 Your People",
      path: "/relationships",
      iconText: "🤝"
    },
    {
      title: "📅 Moments That Matter",
      path: "/dates",
      iconText: "📅"
    },
    {
      title: "🎁 Gift Sparks",
      path: "/gifts",
      iconText: "🎁"
    },
    {
      title: "🗨️ Dear Sunday",
      path: "/chat",
      iconText: "🗨️"
    },
    {
      title: "✨ Saved Sparks",
      path: "/wishlists",
      iconText: "✨"
    },
    {
      title: "📜 Gifts You've Shared",
      path: "/gift-history",
      iconText: "📜"
    },
    {
      title: "🎭 Sunday & Friday Studio",
      path: "/studio",
      iconText: "🎭"
    }
  ];
  
  const settingsItems = [
    {
      title: "⚙️ Tweak the Magic",
      path: "/settings",
      iconText: "⚙️"
    },
    {
      title: "🚪 Step Away Gently",
      path: "/logout",
      iconText: "🚪",
      onClick: () => {
        signOut();
      }
    }
  ];
  
  return (
    <Sidebar collapsible="icon" className="transition-all duration-300">
      <SidebarHeader className="p-1 pt-0 pb-0 font-poppins">
        <div 
          className="flex items-center justify-center cursor-pointer" 
          onClick={() => navigate("/dashboard")} 
          aria-label="Go to home"
        >
          {!isCollapsed ? (
            <img 
              src="/lovable-uploads/262ac2ba-ad0d-4e34-b7b1-c0bccc012ab7.png" 
              alt="GiftYourThought Logo" 
              className="h-[150px] w-auto object-contain" 
            />
          ) : (
            <div className="py-4 text-2xl">💝</div>
          )}
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {navItems.map(item => (
                <SidebarMenuItem key={item.title} className="p-0">
                  {isCollapsed ? (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <SidebarMenuButton 
                            onClick={() => navigate(item.path)} 
                            className="flex items-center justify-center font-poppins w-full h-10"
                          >
                            <span className="text-xl">{item.iconText}</span>
                          </SidebarMenuButton>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          <p>{item.title}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : (
                    <SidebarMenuButton 
                      onClick={() => navigate(item.path)} 
                      className="flex items-center font-poppins w-full"
                    >
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {settingsItems.map(item => (
                <SidebarMenuItem key={item.title} className="p-0">
                  {isCollapsed ? (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <SidebarMenuButton 
                            onClick={item.onClick || (() => navigate(item.path))} 
                            className="flex items-center justify-center font-poppins w-full h-10"
                          >
                            <span className="text-xl">{item.iconText}</span>
                          </SidebarMenuButton>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          <p>{item.title}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : (
                    <SidebarMenuButton 
                      onClick={item.onClick || (() => navigate(item.path))} 
                      className="flex items-center font-poppins w-full"
                    >
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={toggleSidebar} 
          className="w-full mt-4 flex justify-center items-center"
        >
          {isCollapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
          {!isCollapsed && <span className="ml-2">Collapse</span>}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
