
import React from 'react';
import { Menu, Search, Bell, User, GitBranch, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';

interface TopbarProps {
  projectName?: string;
}

const Topbar: React.FC<TopbarProps> = ({ projectName = "NeuraCode" }) => {
  return (
    <header className="h-topbar border-b border-border flex items-center justify-between px-3 bg-card/30 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        
        <div className="hidden md:flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-6 gap-1 font-normal text-xs">
                {projectName}
                <GitBranch className="h-3.5 w-3.5 ml-1 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel className="text-xs font-normal">Recent Projects</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-xs">Text Classifier</DropdownMenuItem>
              <DropdownMenuItem className="text-xs">Image Generation</DropdownMenuItem>
              <DropdownMenuItem className="text-xs">Data Preprocessing</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden md:flex relative w-64">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="pl-8 h-7 bg-secondary py-1 text-xs focus-visible:ring-primary/30"
          />
        </div>

        <Button variant="ghost" size="icon" className="h-7 w-7">
          <Bell className="h-3.5 w-3.5" />
        </Button>
        
        <Button variant="ghost" size="icon" className="h-7 w-7">
          <Settings className="h-3.5 w-3.5" />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <User className="h-3.5 w-3.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel className="text-xs font-normal">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-xs">Profile</DropdownMenuItem>
            <DropdownMenuItem className="text-xs">Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive text-xs">Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Topbar;
