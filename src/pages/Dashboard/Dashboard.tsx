
import React from 'react';
import { Plus, FileCode2, BarChart3, Cpu } from 'lucide-react';
import { SidebarProvider, SidebarInset, SidebarRail } from '@/components/ui/sidebar';
import Sidebar from '@/components/dashboard/Sidebar';
import Topbar from '@/components/dashboard/Topbar';
import QuickTaskCard from '@/components/dashboard/QuickTaskCard';
import { Button } from '@/components/ui/button';

const quickTasks = [
  {
    id: '1',
    title: 'Create New Project',
    icon: <Plus className="h-5 w-5" />,
    description: 'Start a new AI project with templates or from scratch.'
  },
  {
    id: '2',
    title: 'Fine-tune a Model',
    icon: <FileCode2 className="h-5 w-5" />,
    description: 'Fine-tune pretrained models on your custom datasets.'
  },
  {
    id: '3',
    title: 'Run Data Profiler',
    icon: <BarChart3 className="h-5 w-5" />,
    description: 'Analyze your datasets to identify patterns and anomalies.'
  },
  {
    id: '4',
    title: 'Deploy a Model',
    icon: <Cpu className="h-5 w-5" />,
    description: 'Deploy your trained models to production environments.'
  }
];

const Dashboard: React.FC = () => {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-background dark">
        <Sidebar />
        <SidebarRail />
        
        <SidebarInset>
          <Topbar />
          
          <div className="p-6 overflow-auto h-[calc(100vh-32px)]">
            <div className="mb-10 mt-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <h1 className="font-medium tracking-tight">Welcome back</h1>
                <div className="flex gap-3 mt-4 md:mt-0">
                  <Button variant="default" size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    New Project
                  </Button>
                </div>
              </div>
            </div>

            <section className="mb-10">
              <div className="mb-4">
                <h2 className="text-lg font-medium tracking-tight">Quick Actions</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickTasks.map((task) => (
                  <QuickTaskCard
                    key={task.id}
                    title={task.title}
                    icon={task.icon}
                    description={task.description}
                    onClick={() => console.log(`Start task ${task.id}`)}
                  />
                ))}
              </div>
            </section>
            
            <section className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium tracking-tight">Get Started</h2>
              </div>
              
              <div className="rounded-lg border border-border/50 bg-card/50 p-4 hover:neon-border transition-all duration-300">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-sm mb-1.5 tracking-tight">Getting started with NeuraCode</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Learn how to create your first AI project and navigate the NeuraCode IDE features.
                    </p>
                  </div>
                  <Button variant="outline" size="sm">Read more</Button>
                </div>
              </div>
            </section>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
