
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
  
  return (
    <ShadcnSidebar variant="sidebar">
      <SidebarHeader className="py-2">
        <div className="px-3">
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
                className={location.pathname === item.path ? "border-l-2 border-primary bg-secondary/60" : ""}
              >
                <Link to={item.path}>
                  <item.icon className="h-[18px] w-[18px]" />
                  <span className="text-sm">{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      
      <SidebarFooter className="pb-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Help">
              <Link to="/help">
                <HelpCircle className="h-[18px] w-[18px]" />
                <span className="text-sm">Help</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Profile">
              <Link to="/profile">
                <User className="h-[18px] w-[18px]" />
                <span className="text-sm">Profile</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </ShadcnSidebar>
  );
};

export default Sidebar;
