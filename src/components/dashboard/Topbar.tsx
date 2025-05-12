
import React, { useState } from 'react';
import { Menu, Search, Bell, User, GitBranch, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

interface TopbarProps {
  projectName?: string;
}

const Topbar: React.FC<TopbarProps> = ({ projectName = "NeuraCode" }) => {
  const navigate = useNavigate();
  const [hasNotifications, setHasNotifications] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      toast({
        title: "Search",
        description: `Searching for "${searchValue}"...`,
      });
      setSearchValue('');
    }
  };

  const handleNotificationsClick = () => {
    toast({
      title: "Notifications",
      description: hasNotifications ? "You have new notifications" : "You have no new notifications",
    });
    if (hasNotifications) {
      setHasNotifications(false);
    }
  };

  const handleSettingsClick = () => {
    navigate('/dashboard/settings');
  };

  return (
    <header className="h-topbar border-b border-border/80 flex items-center justify-between px-4 bg-card/30 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="hover:text-primary transition-colors" />
        
        <div className="hidden md:flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 gap-1 font-normal text-xs hover:bg-secondary">
                {projectName}
                <GitBranch className="h-3.5 w-3.5 ml-1 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56 bg-card/90 backdrop-blur-lg border-border/60">
              <DropdownMenuLabel className="text-xs font-normal">Recent Projects</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="text-xs hover:text-primary cursor-pointer"
                onClick={() => {
                  toast({ 
                    title: "Project Selected", 
                    description: "Opening Text Classifier project" 
                  });
                }}
              >
                Text Classifier
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="text-xs hover:text-primary cursor-pointer"
                onClick={() => {
                  toast({ 
                    title: "Project Selected", 
                    description: "Opening Image Generation project" 
                  });
                }}
              >
                Image Generation
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="text-xs hover:text-primary cursor-pointer"
                onClick={() => {
                  toast({ 
                    title: "Project Selected", 
                    description: "Opening Data Preprocessing project" 
                  });
                }}
              >
                Data Preprocessing
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <form onSubmit={handleSearch} className="hidden md:flex relative w-64">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="pl-8 h-8 bg-secondary/50 py-1 text-xs focus-visible:ring-primary/30 rounded-full"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </form>

        <div className="relative">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 rounded-full hover:bg-secondary/50 hover:text-primary transition-colors"
            onClick={handleNotificationsClick}
          >
            <Bell className="h-4 w-4" />
            {hasNotifications && (
              <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-primary text-white text-xs">
                1
              </Badge>
            )}
          </Button>
        </div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 rounded-full hover:bg-secondary/50 hover:text-primary transition-colors"
          onClick={handleSettingsClick}
        >
          <Settings className="h-4 w-4" />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-secondary/50">
              <User className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-card/90 backdrop-blur-lg border-border/60">
            <DropdownMenuLabel className="text-xs font-normal">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="text-xs cursor-pointer hover:text-primary" 
              onClick={() => toast({ title: "Profile", description: "Profile settings opened" })}
            >
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="text-xs cursor-pointer hover:text-primary" 
              onClick={() => navigate('/dashboard/settings')}
            >
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="text-destructive text-xs cursor-pointer" 
              onClick={() => {
                toast({ 
                  title: "Logging out", 
                  description: "Session ended" 
                });
                navigate('/login');
              }}
            >
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Topbar;
