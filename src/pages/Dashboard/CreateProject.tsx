
import React, { useState } from 'react';
import { Code2, Database, FileText, GitBranch, Layers, PackageOpen, PlusCircle } from 'lucide-react';
import { SidebarProvider, SidebarInset, SidebarRail } from '@/components/ui/sidebar';
import Sidebar from '@/components/dashboard/Sidebar';
import Topbar from '@/components/dashboard/Topbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

interface TemplateCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}

const TemplateCard = ({ icon, title, description, selected, onClick }: TemplateCardProps) => (
  <Card 
    className={`cursor-pointer transition-all ${selected ? 'neon-border' : 'hover:border-primary/30'}`}
    onClick={onClick}
  >
    <CardContent className="p-4">
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-md ${selected ? 'bg-primary/10 text-primary' : 'bg-secondary text-muted-foreground'}`}>
          {icon}
        </div>
        <div>
          <h3 className="text-sm font-medium mb-1">{title}</h3>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

const templates = [
  {
    id: 'blank',
    title: 'Blank Project',
    description: 'Start from scratch with an empty project',
    icon: <PlusCircle className="h-5 w-5" />
  },
  {
    id: 'classifier',
    title: 'Text Classification',
    description: 'Pre-configured text classification model',
    icon: <FileText className="h-5 w-5" />
  },
  {
    id: 'image',
    title: 'Image Recognition',
    description: 'Computer vision model template',
    icon: <Layers className="h-5 w-5" />
  },
  {
    id: 'nlp',
    title: 'NLP Pipeline',
    description: 'Natural language processing workflow',
    icon: <Code2 className="h-5 w-5" />
  },
  {
    id: 'data',
    title: 'Data Processing',
    description: 'ETL pipeline for data preprocessing',
    icon: <Database className="h-5 w-5" />
  },
  {
    id: 'package',
    title: 'Model Package',
    description: 'Deploy models as API packages',
    icon: <PackageOpen className="h-5 w-5" />
  }
];

const CreateProject: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('blank');
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const { toast } = useToast();
  
  const handleCreateProject = () => {
    if (!projectName) {
      toast({
        title: "Project name required",
        description: "Please enter a name for your project.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Project created",
      description: `${projectName} has been created successfully.`
    });
    
    console.log('Creating project:', {
      name: projectName,
      description: projectDescription,
      template: selectedTemplate
    });
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-background dark">
        <Sidebar />
        <SidebarRail />
        
        <SidebarInset>
          <Topbar projectName="Create Project" />
          
          <div className="p-6 overflow-auto h-[calc(100vh-32px)]">
            <div className="mb-6">
              <div className="flex flex-col md:items-start">
                <h1 className="font-medium">Create New Project</h1>
                <p className="text-sm text-muted-foreground mt-1">Configure your new AI project</p>
              </div>
            </div>

            <div className="max-w-3xl">
              <Tabs defaultValue="details" className="mb-8">
                <TabsList className="mb-4">
                  <TabsTrigger value="details">Project Details</TabsTrigger>
                  <TabsTrigger value="template">Select Template</TabsTrigger>
                  <TabsTrigger value="settings">Advanced Settings</TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="project-name">Project Name</Label>
                      <Input 
                        id="project-name" 
                        placeholder="My AI Project" 
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="project-description">Description</Label>
                      <Textarea 
                        id="project-description" 
                        placeholder="Describe your project..."
                        rows={4}
                        value={projectDescription}
                        onChange={(e) => setProjectDescription(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Repository</Label>
                      <div className="flex items-center gap-2">
                        <GitBranch className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          A Git repository will be created automatically
                        </span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="template" className="space-y-4">
                  <p className="text-sm text-muted-foreground mb-4">
                    Choose a template to get started quickly with pre-configured components and structure.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {templates.map(template => (
                      <TemplateCard 
                        key={template.id}
                        icon={template.icon}
                        title={template.title}
                        description={template.description}
                        selected={selectedTemplate === template.id}
                        onClick={() => setSelectedTemplate(template.id)}
                      />
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="settings" className="space-y-4">
                  <p className="text-sm text-muted-foreground mb-4">
                    Configure advanced settings for your project.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="project-environment">Python Environment</Label>
                      <Input id="project-environment" defaultValue="python 3.8" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="project-dependencies">Dependencies</Label>
                      <Textarea 
                        id="project-dependencies" 
                        placeholder="tensorflow==2.8.0\npandas==1.4.2"
                        rows={4}
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="flex justify-end gap-3">
                <Button variant="outline">Cancel</Button>
                <Button 
                  className="animate-pulse-blue"
                  onClick={handleCreateProject}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create Project
                </Button>
              </div>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default CreateProject;
