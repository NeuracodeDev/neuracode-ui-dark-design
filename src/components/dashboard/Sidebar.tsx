
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Plus, FolderOpen, BarChart3, Cpu, Settings, HelpCircle, User } from 'lucide-react';
import { 
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from '@/components/ui/sidebar';
import Logo from '@/components/Logo';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const sidebarItems = [
  {
    icon: Plus,
    label: 'Create Project',
    path: '/dashboard/create',
  },
  {
    icon: FolderOpen,
    label: 'Load Project',
    path: '/dashboard/projects',
  },
  {
    icon: BarChart3,
    label: 'Manage Datasets',
    path: '/dashboard/datasets',
  },
  {
    icon: Cpu,
    label: 'Manage Models',
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
  
  return (
    <ShadcnSidebar variant="sidebar">
      <SidebarHeader className="py-4">
        <div className="px-4">
          <Logo />
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarMenu>
          {sidebarItems.map((item) => (
            <SidebarMenuItem key={item.path}>
              <SidebarMenuButton 
                asChild
                isActive={location.pathname === item.path}
                tooltip={item.label}
              >
                <Link to={item.path}>
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      
      <SidebarFooter className="pb-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Help">
              <Link to="/help">
                <HelpCircle className="h-5 w-5" />
                <span>Help</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Profile">
              <Link to="/profile">
                <User className="h-5 w-5" />
                <span>Profile</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </ShadcnSidebar>
  );
};

export default Sidebar;
