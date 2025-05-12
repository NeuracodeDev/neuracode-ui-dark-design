
import React from 'react';
import { Plus, BarChart3, ChevronRight } from 'lucide-react';
import { SidebarProvider, SidebarInset, SidebarRail } from '@/components/ui/sidebar';
import Sidebar from '@/components/dashboard/Sidebar';
import Topbar from '@/components/dashboard/Topbar';
import QuickTaskCard from '@/components/dashboard/QuickTaskCard';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/components/ui/use-toast";

const quickTasks = [
  {
    id: '1',
    title: 'Create New Project',
    icon: <Plus className="h-5 w-5" />,
    description: 'Start a new AI project with templates or from scratch.'
  },
  {
    id: '3',
    title: 'Run Data Profiler',
    icon: <BarChart3 className="h-5 w-5" />,
    description: 'Analyze your datasets to identify patterns and anomalies.'
  }
];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  
  const handleTaskClick = (taskId: string) => {
    switch(taskId) {
      case '1':
        navigate('/dashboard/create');
        toast({
          title: "Creating new project",
          description: "Navigating to project creation"
        });
        break;
      case '3':
        navigate('/dashboard/datasets');
        toast({
          title: "Data Profiler",
          description: "Opening dataset analysis tools"
        });
        break;
      default:
        break;
    }
  };
  
  const handleReadMoreClick = () => {
    toast({
      title: "Documentation",
      description: "Opening NeuraCode documentation"
    });
  };
  
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-background dark">
        <Sidebar />
        <SidebarRail />
        
        <SidebarInset>
          <Topbar />
          
          <div className="p-8 overflow-y-auto h-[calc(100vh-32px)] scrollbar-thin">
            <div className="mb-8 mt-2">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <h1 className="font-medium text-2xl tracking-tight">Welcome to NeuraCode</h1>
                <div className="flex gap-3 mt-4 md:mt-0">
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="shadow-sm btn-ripple"
                    onClick={() => navigate('/dashboard/create')}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    New Project
                  </Button>
                </div>
              </div>
            </div>

            <section className="mb-8">
              <div className="mb-6">
                <h2 className="text-lg font-medium flex items-center">
                  <span className="w-1 h-5 bg-primary mr-2 rounded-full"></span>
                  Quick Actions
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {quickTasks.map((task) => (
                  <QuickTaskCard
                    key={task.id}
                    title={task.title}
                    icon={task.icon}
                    description={task.description}
                    onClick={() => handleTaskClick(task.id)}
                  />
                ))}
              </div>
            </section>
            
            <section className="mb-8">
              <div className="flex items-center mb-6">
                <h2 className="text-lg font-medium flex items-center">
                  <span className="w-1 h-5 bg-primary mr-2 rounded-full"></span>
                  Get Started
                </h2>
              </div>
              
              <div className="rounded-md border border-border/40 bg-card/80 p-6 hover:border-primary/30 hover:shadow-md transition-all duration-200">
                <div className="flex justify-between items-start">
                  <div className="max-w-2xl">
                    <h3 className="font-medium text-base mb-2">Getting started with NeuraCode</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Learn how to create your first AI project and navigate the NeuraCode IDE features. Our comprehensive guides will help you get up to speed with all the essential tools and workflows.
                    </p>
                  </div>
                  <Button variant="secondary" size="sm" className="gap-1 btn-ripple" onClick={handleReadMoreClick}>
                    Read more
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-center mb-6">
                <h2 className="text-lg font-medium flex items-center">
                  <span className="w-1 h-5 bg-primary mr-2 rounded-full"></span>
                  Recent Activity
                </h2>
              </div>
              
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div 
                    key={i} 
                    className="flex items-center p-4 rounded-md border border-border/40 bg-card/50 hover:border-primary/20 transition-all duration-200 hover:shadow-sm"
                    onClick={() => {
                      toast({
                        title: "Activity",
                        description: `Viewing activity details for item ${i}`
                      });
                    }}
                  >
                    <div className="activity-dot active mr-3"></div>
                    <div>
                      <p className="text-sm font-medium">Project updated</p>
                      <p className="text-xs text-muted-foreground">Text Classification Model - {i} hour{i > 1 ? 's' : ''} ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
