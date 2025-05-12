
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Plus, FolderOpen, BarChart3, Cpu, Settings, HelpCircle, User, ChevronLeft } from 'lucide-react';
import { 
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar
} from '@/components/ui/sidebar';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const sidebarItems = [
  {
    icon: Plus,
    label: 'Create Project',
    path: '/dashboard/create',
  },
  {
    icon: FolderOpen,
    label: 'Projects',
    path: '/dashboard/projects',
  },
  {
    icon: BarChart3,
    label: 'Datasets',
    path: '/dashboard/datasets',
  },
  {
    icon: Cpu,
    label: 'Models',
    path: '/dashboard/models',
  },
  {
    icon: Settings,
    label: 'Settings',
    path: '/dashboard/settings',
  }
];

const Sidebar = () => {
  const location = useLocation();
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === 'collapsed';
  
  return (
    <TooltipProvider delayDuration={300}>
      <ShadcnSidebar variant="sidebar">
        <SidebarHeader className="py-3 px-3 flex items-center justify-between">
          <div className={`transition-opacity duration-200 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
            <Logo />
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-7 w-7 text-muted-foreground hover:text-primary"
            onClick={toggleSidebar}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </SidebarHeader>
        
        <SidebarContent className="px-2">
          <SidebarMenu>
            {sidebarItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <SidebarMenuItem key={item.path}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SidebarMenuButton 
                        asChild
                        isActive={isActive}
                        className={`
                          ${isActive ? "border-l-2 border-primary bg-secondary/60" : ""}
                          transition-colors duration-200 hover:bg-secondary/40
                        `}
                      >
                        <Link to={item.path}>
                          <item.icon className={`h-[18px] w-[18px] ${isActive ? 'text-primary' : ''}`} />
                          <span className={`text-sm ${isActive ? 'text-primary' : ''}`}>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </TooltipTrigger>
                    <TooltipContent side="right" className={isCollapsed ? '' : 'hidden'}>
                      {item.label}
                    </TooltipContent>
                  </Tooltip>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarContent>
        
        <SidebarFooter className="pb-3 px-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <Tooltip>
                <TooltipTrigger asChild>
                  <SidebarMenuButton asChild>
                    <Link to="/help">
                      <HelpCircle className="h-[18px] w-[18px]" />
                      <span className="text-sm">Help</span>
                    </Link>
                  </SidebarMenuButton>
                </TooltipTrigger>
                <TooltipContent side="right" className={isCollapsed ? '' : 'hidden'}>
                  Help
                </TooltipContent>
              </Tooltip>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <Tooltip>
                <TooltipTrigger asChild>
                  <SidebarMenuButton asChild>
                    <Link to="/profile">
                      <User className="h-[18px] w-[18px]" />
                      <span className="text-sm">Profile</span>
                    </Link>
                  </SidebarMenuButton>
                </TooltipTrigger>
                <TooltipContent side="right" className={isCollapsed ? '' : 'hidden'}>
                  Profile
                </TooltipContent>
              </Tooltip>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </ShadcnSidebar>
    </TooltipProvider>
  );
};

export default Sidebar;
