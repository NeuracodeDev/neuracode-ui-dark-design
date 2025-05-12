
import React, { useState } from 'react';
import { 
  ArrowRight, 
  Code2, 
  Database, 
  FileText, 
  GitBranch, 
  Layers, 
  PackageOpen, 
  PlusCircle,
  Settings,
  Server,
  Cpu,
  Terminal,
  Layout,
  Check
} from 'lucide-react';
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
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';

interface TemplateCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
  tag?: string;
}

const TemplateCard = ({ icon, title, description, selected, onClick, tag }: TemplateCardProps) => (
  <Card 
    className={`cursor-pointer transition-all duration-300 ${selected ? 'neon-border' : 'hover:border-primary/30'} relative overflow-hidden`}
    onClick={onClick}
  >
    {tag && (
      <div className="absolute top-0 right-0 bg-primary/80 text-xs font-medium py-1 px-2 rounded-bl-md">
        {tag}
      </div>
    )}
    <CardContent className="p-4">
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-md ${selected ? 'bg-primary/15 text-primary' : 'bg-secondary text-muted-foreground'}`}>
          {icon}
        </div>
        <div>
          <h3 className="text-sm font-medium mb-1">{title}</h3>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      {selected && (
        <div className="absolute bottom-2 right-2 text-primary">
          <Check className="h-4 w-4" />
        </div>
      )}
    </CardContent>
  </Card>
);

// Enhanced templates with more options and categories
const templates = [
  {
    id: 'blank',
    title: 'Blank Project',
    description: 'Start from scratch with an empty project',
    icon: <PlusCircle className="h-5 w-5" />,
    category: 'basic'
  },
  {
    id: 'classifier',
    title: 'Text Classification',
    description: 'Pre-configured text classification model',
    icon: <FileText className="h-5 w-5" />,
    category: 'ml',
    tag: 'Popular'
  },
  {
    id: 'image',
    title: 'Image Recognition',
    description: 'Computer vision model template',
    icon: <Layers className="h-5 w-5" />,
    category: 'ml'
  },
  {
    id: 'nlp',
    title: 'NLP Pipeline',
    description: 'Natural language processing workflow',
    icon: <Code2 className="h-5 w-5" />,
    category: 'ml'
  },
  {
    id: 'data',
    title: 'Data Processing',
    description: 'ETL pipeline for data preprocessing',
    icon: <Database className="h-5 w-5" />,
    category: 'data'
  },
  {
    id: 'package',
    title: 'Model Package',
    description: 'Deploy models as API packages',
    icon: <PackageOpen className="h-5 w-5" />,
    category: 'deploy'
  },
  {
    id: 'server',
    title: 'API Server',
    description: 'FastAPI server for model deployment',
    icon: <Server className="h-5 w-5" />,
    category: 'deploy',
    tag: 'New'
  },
  {
    id: 'gpu',
    title: 'GPU Computing',
    description: 'CUDA-accelerated computation template',
    icon: <Cpu className="h-5 w-5" />,
    category: 'advanced'
  },
  {
    id: 'cli',
    title: 'CLI Tool',
    description: 'Command-line interface application',
    icon: <Terminal className="h-5 w-5" />,
    category: 'basic'
  }
];

// Compute environments available for projects
const environments = [
  { value: 'py38', label: 'Python 3.8' },
  { value: 'py39', label: 'Python 3.9' },
  { value: 'py310', label: 'Python 3.10' }, 
  { value: 'py311', label: 'Python 3.11' }
];

// Common dependencies for ML projects
const commonDependencies = [
  { id: 'tensorflow', name: 'TensorFlow', version: '2.12.0' },
  { id: 'pytorch', name: 'PyTorch', version: '2.0.1' },
  { id: 'scikit', name: 'Scikit-learn', version: '1.2.2' },
  { id: 'pandas', name: 'Pandas', version: '2.0.1' },
  { id: 'numpy', name: 'NumPy', version: '1.24.3' },
  { id: 'matplotlib', name: 'Matplotlib', version: '3.7.1' }
];

const CreateProject: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('blank');
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [selectedEnvironment, setSelectedEnvironment] = useState('py39');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDependencies, setSelectedDependencies] = useState<string[]>(['numpy', 'pandas']);
  const [customDependencies, setCustomDependencies] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
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
      template: selectedTemplate,
      environment: selectedEnvironment,
      dependencies: [...selectedDependencies, ...customDependencies.split('\n').filter(d => d.trim())],
      isPrivate
    });
  };

  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(t => t.category === selectedCategory);

  const toggleDependency = (id: string) => {
    if (selectedDependencies.includes(id)) {
      setSelectedDependencies(selectedDependencies.filter(dep => dep !== id));
    } else {
      setSelectedDependencies([...selectedDependencies, id]);
    }
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
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="project-private" 
                        checked={isPrivate}
                        onCheckedChange={() => setIsPrivate(!isPrivate)}
                      />
                      <Label htmlFor="project-private">Make project private</Label>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Repository</Label>
                      <div className="flex items-center gap-2 p-3 bg-secondary/50 rounded-md">
                        <GitBranch className="h-4 w-4 text-primary/70" />
                        <span className="text-sm text-muted-foreground">
                          A Git repository will be created automatically
                        </span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="template" className="space-y-4">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Button 
                      variant={selectedCategory === 'all' ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setSelectedCategory('all')}
                    >
                      All
                    </Button>
                    <Button 
                      variant={selectedCategory === 'basic' ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setSelectedCategory('basic')}
                    >
                      Basic
                    </Button>
                    <Button 
                      variant={selectedCategory === 'ml' ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setSelectedCategory('ml')}
                    >
                      Machine Learning
                    </Button>
                    <Button 
                      variant={selectedCategory === 'data' ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setSelectedCategory('data')}
                    >
                      Data
                    </Button>
                    <Button 
                      variant={selectedCategory === 'deploy' ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setSelectedCategory('deploy')}
                    >
                      Deployment
                    </Button>
                    <Button 
                      variant={selectedCategory === 'advanced' ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setSelectedCategory('advanced')}
                    >
                      Advanced
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredTemplates.map(template => (
                      <TemplateCard 
                        key={template.id}
                        icon={template.icon}
                        title={template.title}
                        description={template.description}
                        selected={selectedTemplate === template.id}
                        onClick={() => setSelectedTemplate(template.id)}
                        tag={template.tag}
                      />
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="settings" className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Environment Settings</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="project-environment">Python Environment</Label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {environments.map(env => (
                          <Button
                            key={env.value}
                            variant={selectedEnvironment === env.value ? "default" : "outline"}
                            className="justify-start"
                            onClick={() => setSelectedEnvironment(env.value)}
                          >
                            {env.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-border/50">
                      <h3 className="text-sm font-medium mb-3">Dependencies</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2 mb-4">
                        {commonDependencies.map(dep => (
                          <div key={dep.id} className="flex items-center space-x-2">
                            <Checkbox 
                              id={dep.id} 
                              checked={selectedDependencies.includes(dep.id)}
                              onCheckedChange={() => toggleDependency(dep.id)}
                            />
                            <Label htmlFor={dep.id} className="flex items-center gap-1">
                              {dep.name}
                              <span className="text-xs text-muted-foreground">v{dep.version}</span>
                            </Label>
                          </div>
                        ))}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="custom-dependencies">Additional Dependencies</Label>
                        <Textarea 
                          id="custom-dependencies" 
                          placeholder="tensorflow==2.8.0&#10;pandas==1.4.2&#10;fastapi==0.95.0"
                          rows={4}
                          value={customDependencies}
                          onChange={(e) => setCustomDependencies(e.target.value)}
                          className="font-mono text-xs"
                        />
                        <p className="text-xs text-muted-foreground">Add one dependency per line in the format: package==version</p>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-border/50">
                      <h3 className="text-sm font-medium mb-3">Compute Resources</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <Card className="bg-secondary/30">
                          <CardContent className="p-3">
                            <div className="flex justify-between items-center mb-2">
                              <h4 className="text-sm">Standard</h4>
                              <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded">Default</span>
                            </div>
                            <ul className="text-xs space-y-1 text-muted-foreground">
                              <li className="flex items-center gap-1">
                                <Check className="h-3 w-3 text-primary" /> 2 CPU cores
                              </li>
                              <li className="flex items-center gap-1">
                                <Check className="h-3 w-3 text-primary" /> 4GB RAM
                              </li>
                              <li className="flex items-center gap-1">
                                <Check className="h-3 w-3 text-primary" /> 20GB storage
                              </li>
                            </ul>
                          </CardContent>
                        </Card>
                        
                        <Card className="bg-secondary/30">
                          <CardContent className="p-3">
                            <div className="flex justify-between items-center mb-2">
                              <h4 className="text-sm">Performance</h4>
                              <span className="text-xs bg-secondary px-2 py-0.5 rounded">Premium</span>
                            </div>
                            <ul className="text-xs space-y-1 text-muted-foreground">
                              <li className="flex items-center gap-1">
                                <Check className="h-3 w-3 text-primary" /> 4 CPU cores
                              </li>
                              <li className="flex items-center gap-1">
                                <Check className="h-3 w-3 text-primary" /> 8GB RAM
                              </li>
                              <li className="flex items-center gap-1">
                                <Check className="h-3 w-3 text-primary" /> 40GB storage
                              </li>
                            </ul>
                          </CardContent>
                        </Card>
                        
                        <Card className="bg-secondary/30">
                          <CardContent className="p-3">
                            <div className="flex justify-between items-center mb-2">
                              <h4 className="text-sm">GPU</h4>
                              <span className="text-xs bg-secondary px-2 py-0.5 rounded">Premium</span>
                            </div>
                            <ul className="text-xs space-y-1 text-muted-foreground">
                              <li className="flex items-center gap-1">
                                <Check className="h-3 w-3 text-primary" /> 4 CPU cores
                              </li>
                              <li className="flex items-center gap-1">
                                <Check className="h-3 w-3 text-primary" /> 16GB RAM
                              </li>
                              <li className="flex items-center gap-1">
                                <Check className="h-3 w-3 text-primary" /> 1 GPU (T4)
                              </li>
                            </ul>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="flex justify-end gap-3">
                <Button variant="outline">Cancel</Button>
                <Button 
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
