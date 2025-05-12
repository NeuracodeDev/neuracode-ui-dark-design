
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
  Check,
  CircleUser,
  Cloud,
  Share2,
  Bookmark,
  Book,
  Boxes,
  Flag,
  BarChart4,
  Wallet,
  Users,
  Network,
  Lock,
  Shield,
  Globe,
  FileJson,
  Download
} from 'lucide-react';
import { SidebarProvider, SidebarInset, SidebarRail } from '@/components/ui/sidebar';
import Sidebar from '@/components/dashboard/Sidebar';
import Topbar from '@/components/dashboard/Topbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface TemplateCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
  tag?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}

const TemplateCard = ({ icon, title, description, selected, onClick, tag, difficulty }: TemplateCardProps) => (
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
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-medium">{title}</h3>
            {difficulty && (
              <Badge variant="outline" className="text-xs">
                {difficulty}
              </Badge>
            )}
          </div>
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
    category: 'basic',
    difficulty: 'beginner' as const
  },
  {
    id: 'classifier',
    title: 'Text Classification',
    description: 'Pre-configured text classification model',
    icon: <FileText className="h-5 w-5" />,
    category: 'ml',
    tag: 'Popular',
    difficulty: 'intermediate' as const
  },
  {
    id: 'image',
    title: 'Image Recognition',
    description: 'Computer vision model template',
    icon: <Layers className="h-5 w-5" />,
    category: 'ml',
    difficulty: 'advanced' as const
  },
  {
    id: 'nlp',
    title: 'NLP Pipeline',
    description: 'Natural language processing workflow',
    icon: <Code2 className="h-5 w-5" />,
    category: 'ml',
    difficulty: 'intermediate' as const
  },
  {
    id: 'data',
    title: 'Data Processing',
    description: 'ETL pipeline for data preprocessing',
    icon: <Database className="h-5 w-5" />,
    category: 'data',
    difficulty: 'intermediate' as const
  },
  {
    id: 'package',
    title: 'Model Package',
    description: 'Deploy models as API packages',
    icon: <PackageOpen className="h-5 w-5" />,
    category: 'deploy',
    difficulty: 'advanced' as const
  },
  {
    id: 'server',
    title: 'API Server',
    description: 'FastAPI server for model deployment',
    icon: <Server className="h-5 w-5" />,
    category: 'deploy',
    tag: 'New',
    difficulty: 'intermediate' as const
  },
  {
    id: 'gpu',
    title: 'GPU Computing',
    description: 'CUDA-accelerated computation template',
    icon: <Cpu className="h-5 w-5" />,
    category: 'advanced',
    difficulty: 'advanced' as const
  },
  {
    id: 'cli',
    title: 'CLI Tool',
    description: 'Command-line interface application',
    icon: <Terminal className="h-5 w-5" />,
    category: 'basic',
    difficulty: 'beginner' as const
  },
  {
    id: 'dashboard',
    title: 'Analytics Dashboard',
    description: 'Interactive data visualization dashboard',
    icon: <BarChart4 className="h-5 w-5" />,
    category: 'data',
    tag: 'Popular',
    difficulty: 'intermediate' as const
  },
  {
    id: 'real-time',
    title: 'Real-time Processing',
    description: 'Stream processing for live data analysis',
    icon: <Boxes className="h-5 w-5" />,
    category: 'advanced',
    difficulty: 'advanced' as const
  },
  {
    id: 'chatbot',
    title: 'Conversational AI',
    description: 'Build intelligent chatbots and assistants',
    icon: <CircleUser className="h-5 w-5" />,
    category: 'ml',
    tag: 'Trending',
    difficulty: 'intermediate' as const
  },
  {
    id: 'recommendation',
    title: 'Recommendation Engine',
    description: 'Personalized recommendation systems',
    icon: <Bookmark className="h-5 w-5" />,
    category: 'ml',
    difficulty: 'advanced' as const
  },
  {
    id: 'time-series',
    title: 'Time Series Analysis',
    description: 'Forecasting and anomaly detection',
    icon: <Book className="h-5 w-5" />,
    category: 'data',
    difficulty: 'advanced' as const
  },
  {
    id: 'cloud',
    title: 'Cloud Deployment',
    description: 'Multi-cloud ML model deployment',
    icon: <Cloud className="h-5 w-5" />,
    category: 'deploy',
    tag: 'Enterprise',
    difficulty: 'advanced' as const
  }
];

// Compute environments available for projects
const environments = [
  { value: 'py38', label: 'Python 3.8' },
  { value: 'py39', label: 'Python 3.9' },
  { value: 'py310', label: 'Python 3.10' }, 
  { value: 'py311', label: 'Python 3.11' },
  { value: 'py312', label: 'Python 3.12 (Beta)' }
];

// Common dependencies for ML projects
const commonDependencies = [
  { id: 'tensorflow', name: 'TensorFlow', version: '2.15.0' },
  { id: 'pytorch', name: 'PyTorch', version: '2.0.1' },
  { id: 'scikit', name: 'Scikit-learn', version: '1.3.1' },
  { id: 'pandas', name: 'Pandas', version: '2.1.1' },
  { id: 'numpy', name: 'NumPy', version: '1.26.0' },
  { id: 'matplotlib', name: 'Matplotlib', version: '3.8.0' },
  { id: 'transformers', name: 'Transformers', version: '4.34.0' },
  { id: 'fastapi', name: 'FastAPI', version: '0.103.2' },
  { id: 'opencv', name: 'OpenCV', version: '4.8.0' }
];

// Compute tiers
const computeTiers = [
  { 
    id: 'standard',
    name: 'Standard',
    description: 'Basic compute for development and testing',
    cpu: '2 CPU cores',
    memory: '4GB RAM',
    storage: '20GB storage',
    default: true,
    price: 'Free'
  },
  { 
    id: 'performance',
    name: 'Performance',
    description: 'Enhanced resources for demanding workloads',
    cpu: '4 CPU cores',
    memory: '8GB RAM',
    storage: '40GB storage',
    default: false,
    price: '$10/month'
  },
  { 
    id: 'gpu',
    name: 'GPU',
    description: 'Hardware acceleration for ML training',
    cpu: '4 CPU cores',
    memory: '16GB RAM',
    storage: '100GB storage',
    gpu: '1 GPU (T4)',
    default: false,
    price: '$50/month'
  },
  { 
    id: 'enterprise',
    name: 'Enterprise',
    description: 'High-performance computing for production workloads',
    cpu: '8 CPU cores',
    memory: '32GB RAM',
    storage: '500GB storage',
    gpu: '2 GPU (A100)',
    default: false,
    price: '$200/month',
    tag: 'Enterprise'
  }
];

// Collaboration types
const collaborationTypes = [
  { value: 'private', label: 'Private', description: 'Only you can access the project' },
  { value: 'team', label: 'Team', description: 'Share with specific team members' },
  { value: 'organization', label: 'Organization', description: 'Available to your entire organization' },
  { value: 'public', label: 'Public', description: 'Anyone can view (but not edit)' }
];

// Team members
const teamMembers = [
  { id: 'user1', name: 'Jane Cooper', email: 'jane@example.com', avatar: '/placeholder.svg', role: 'admin' },
  { id: 'user2', name: 'Alex Miller', email: 'alex@example.com', avatar: '/placeholder.svg', role: 'editor' },
  { id: 'user3', name: 'Olivia Wilson', email: 'olivia@example.com', avatar: '/placeholder.svg', role: 'viewer' }
];

// CI/CD integrations
const cicdIntegrations = [
  { id: 'github', name: 'GitHub Actions', icon: 'GitHub' },
  { id: 'gitlab', name: 'GitLab CI', icon: 'GitLab' },
  { id: 'jenkins', name: 'Jenkins', icon: 'Jenkins' },
  { id: 'azure', name: 'Azure DevOps', icon: 'Azure' }
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
  const [selectedComputeTier, setSelectedComputeTier] = useState('standard');
  const [collaborationType, setCollaborationType] = useState('private');
  const [enableVersioning, setEnableVersioning] = useState(true);
  const [enableCICD, setEnableCICD] = useState(false);
  const [selectedCICD, setSelectedCICD] = useState<string[]>([]);
  const [enableAutoScaling, setEnableAutoScaling] = useState(false);
  const [enableScheduling, setEnableScheduling] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState<string>("$0");
  const [enableLogging, setEnableLogging] = useState(true);
  const [enableMonitoring, setEnableMonitoring] = useState(false);
  const [teamAccess, setTeamAccess] = useState<string[]>(['user1']);
  const [autoShutdown, setAutoShutdown] = useState<number[]>([4]);
  const [tags, setTags] = useState<string>('');
  const [difficulty, setDifficulty] = useState<string>('beginner');
  const { toast } = useToast();
  
  // Get the template details for the selected template
  const selectedTemplateDetails = templates.find(t => t.id === selectedTemplate);
  
  // Update estimated price when compute tier or other options change
  React.useEffect(() => {
    const computeTier = computeTiers.find(t => t.id === selectedComputeTier);
    let price = 0;
    
    if (computeTier && computeTier.price !== 'Free') {
      price = parseInt(computeTier.price.replace(/[^0-9]/g, ''));
    }
    
    // Add cost for additional features
    if (enableMonitoring) price += 5;
    if (enableAutoScaling) price += 10;
    if (collaborationType === 'team' || collaborationType === 'organization') price += 15;
    
    setEstimatedPrice(price === 0 ? 'Free' : `$${price}/month`);
  }, [selectedComputeTier, enableMonitoring, enableAutoScaling, collaborationType]);

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
      isPrivate,
      computeTier: selectedComputeTier,
      collaborationType,
      enableVersioning,
      enableCICD,
      selectedCICD,
      enableAutoScaling,
      enableScheduling,
      enableLogging,
      enableMonitoring,
      teamAccess,
      autoShutdown: autoShutdown[0],
      tags: tags.split(',').map(tag => tag.trim()),
      difficulty
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

  const toggleCICD = (id: string) => {
    if (selectedCICD.includes(id)) {
      setSelectedCICD(selectedCICD.filter(ci => ci !== id));
    } else {
      setSelectedCICD([...selectedCICD, id]);
    }
  };

  const toggleTeamMember = (id: string) => {
    if (teamAccess.includes(id)) {
      setTeamAccess(teamAccess.filter(member => member !== id));
    } else {
      setTeamAccess([...teamAccess, id]);
    }
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-background dark">
        <Sidebar />
        <SidebarRail />
        
        <SidebarInset>
          <Topbar projectName="Create Project" />
          
          <div className="p-6 overflow-auto h-[calc(100vh-32px)] scrollbar-thin">
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
                  <TabsTrigger value="collaboration">Collaboration</TabsTrigger>
                  <TabsTrigger value="deployment">Deployment</TabsTrigger>
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
                      <Label htmlFor="project-tags">Tags (comma-separated)</Label>
                      <Input
                        id="project-tags"
                        placeholder="ml, classification, nlp, production"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">Tags help with project discovery and organization</p>
                    </div>

                    <div className="space-y-2">
                      <Label>Difficulty Level</Label>
                      <RadioGroup
                        value={difficulty}
                        onValueChange={setDifficulty}
                        className="flex gap-4 mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="beginner" id="beginner" />
                          <Label htmlFor="beginner">Beginner</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="intermediate" id="intermediate" />
                          <Label htmlFor="intermediate">Intermediate</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="advanced" id="advanced" />
                          <Label htmlFor="advanced">Advanced</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch 
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

                  {selectedTemplateDetails && (
                    <div className="mb-4 p-4 rounded-md bg-secondary/30 border border-border/40">
                      <div className="flex items-start gap-3">
                        <div className="p-3 bg-primary/10 text-primary rounded-md">
                          {selectedTemplateDetails.icon}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-base font-medium">{selectedTemplateDetails.title}</h3>
                            {selectedTemplateDetails.tag && (
                              <Badge variant="secondary" className="text-primary text-xs">
                                {selectedTemplateDetails.tag}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {selectedTemplateDetails.description}
                          </p>
                          <div className="flex items-center gap-2 mt-3">
                            <Badge variant="outline" className="text-xs">
                              {selectedTemplateDetails.difficulty}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {selectedTemplateDetails.category === 'ml' ? 'Machine Learning' : 
                               selectedTemplateDetails.category === 'data' ? 'Data Processing' :
                               selectedTemplateDetails.category === 'deploy' ? 'Deployment' :
                               selectedTemplateDetails.category === 'advanced' ? 'Advanced' : 'Basic'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
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
                        difficulty={template.difficulty}
                      />
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="settings" className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Environment Settings</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="project-environment">Python Environment</Label>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                        {environments.map(env => (
                          <Button
                            key={env.value}
                            variant={selectedEnvironment === env.value ? "default" : "outline"}
                            className="justify-start"
                            onClick={() => setSelectedEnvironment(env.value)}
                            size="sm"
                          >
                            {env.label}
                            {env.label.includes('Beta') && (
                              <Badge variant="secondary" className="ml-1 text-xs">Beta</Badge>
                            )}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-border/50">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-sm font-medium">Dependencies</h3>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-xs h-7"
                          onClick={() => {
                            toast({
                              title: "Requirements imported",
                              description: "Dependencies have been imported from requirements.txt"
                            });
                          }}
                        >
                          <Download className="h-3 w-3 mr-1" />
                          Import from file
                        </Button>
                      </div>
                      
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
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                        {computeTiers.map((tier) => (
                          <Card 
                            key={tier.id}
                            className={`cursor-pointer transition-all duration-200 border ${
                              selectedComputeTier === tier.id 
                                ? 'border-primary/70 shadow-md shadow-primary/10' 
                                : 'border-border/50 hover:border-primary/30'
                            } relative`}
                            onClick={() => setSelectedComputeTier(tier.id)}
                          >
                            {tier.tag && (
                              <Badge className="absolute right-2 top-2 text-xs">
                                {tier.tag}
                              </Badge>
                            )}
                            <CardContent className="p-3">
                              <h4 className="font-medium mb-1 flex items-center">
                                {tier.name}
                                {selectedComputeTier === tier.id && (
                                  <Check className="h-3 w-3 ml-1 text-primary" />
                                )}
                              </h4>
                              <p className="text-xs text-muted-foreground mb-3">{tier.description}</p>
                              <div className="space-y-1 text-xs">
                                <div className="flex items-center gap-1">
                                  <Check className="h-3 w-3 text-primary" /> {tier.cpu}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Check className="h-3 w-3 text-primary" /> {tier.memory}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Check className="h-3 w-3 text-primary" /> {tier.storage}
                                </div>
                                {tier.gpu && (
                                  <div className="flex items-center gap-1">
                                    <Check className="h-3 w-3 text-primary" /> {tier.gpu}
                                  </div>
                                )}
                              </div>
                              <div className="mt-3 text-sm font-medium text-primary">{tier.price}</div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                      
                      <div className="mt-4 space-y-3">
                        <div className="flex items-center space-x-2">
                          <Switch 
                            id="auto-scaling" 
                            checked={enableAutoScaling}
                            onCheckedChange={setEnableAutoScaling}
                          />
                          <Label htmlFor="auto-scaling">Enable auto-scaling</Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch 
                            id="scheduling" 
                            checked={enableScheduling}
                            onCheckedChange={setEnableScheduling}
                          />
                          <Label htmlFor="scheduling">Enable resource scheduling</Label>
                        </div>

                        <div>
                          <div className="flex justify-between mb-2">
                            <Label>Auto-shutdown after inactivity (hours)</Label>
                            <span className="text-sm text-muted-foreground">{autoShutdown}h</span>
                          </div>
                          <Slider 
                            value={autoShutdown} 
                            min={1} 
                            max={24} 
                            step={1} 
                            onValueChange={setAutoShutdown}
                            className="py-4"
                          />
                          <p className="text-xs text-muted-foreground">
                            Resources will automatically shut down after this period of inactivity to save costs
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-border/50">
                      <h3 className="text-sm font-medium mb-3">Monitoring & Logging</h3>
                      
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Switch 
                            id="logging" 
                            checked={enableLogging}
                            onCheckedChange={setEnableLogging}
                          />
                          <Label htmlFor="logging">Enable standard logging</Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch 
                            id="monitoring" 
                            checked={enableMonitoring}
                            onCheckedChange={setEnableMonitoring}
                          />
                          <Label htmlFor="monitoring">Enable advanced performance monitoring</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="collaboration" className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-3">Access Control</h3>
                    <RadioGroup 
                      value={collaborationType} 
                      onValueChange={setCollaborationType}
                      className="grid grid-cols-1 md:grid-cols-2 gap-3"
                    >
                      {collaborationTypes.map(type => (
                        <div 
                          key={type.value}
                          className={`flex items-center space-x-2 border rounded-md p-3 hover:bg-secondary/30 transition-colors ${
                            collaborationType === type.value ? 'border-primary/70 bg-secondary/40' : 'border-border/50'
                          }`}
                          onClick={() => setCollaborationType(type.value)}
                        >
                          <RadioGroupItem value={type.value} id={type.value} />
                          <div className="ml-2">
                            <Label htmlFor={type.value} className="font-medium">{type.label}</Label>
                            <p className="text-xs text-muted-foreground">{type.description}</p>
                          </div>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  {(collaborationType === 'team' || collaborationType === 'organization') && (
                    <div className="pt-4">
                      <h3 className="text-sm font-medium mb-3">Team Members</h3>
                      
                      <div className="space-y-3">
                        {teamMembers.map(member => (
                          <div 
                            key={member.id}
                            className={`flex items-center justify-between border rounded-md p-3 ${
                              teamAccess.includes(member.id) ? 'border-primary/40 bg-secondary/30' : 'border-border/50'
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={member.avatar} alt={member.name} />
                                <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium text-sm">{member.name}</div>
                                <div className="text-xs text-muted-foreground">{member.email}</div>
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <Select defaultValue={member.role}>
                                <SelectTrigger className="h-7 text-xs w-[100px]">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="admin">Admin</SelectItem>
                                  <SelectItem value="editor">Editor</SelectItem>
                                  <SelectItem value="viewer">Viewer</SelectItem>
                                </SelectContent>
                              </Select>

                              <Checkbox 
                                id={`team-${member.id}`} 
                                checked={teamAccess.includes(member.id)}
                                onCheckedChange={() => toggleTeamMember(member.id)}
                              />
                            </div>
                          </div>
                        ))}
                        
                        <Button 
                          variant="outline"
                          size="sm"
                          className="w-full"
                          onClick={() => {
                            toast({
                              title: "Invite sent",
                              description: "Team member invitation has been sent"
                            });
                          }}
                        >
                          <Users className="h-4 w-4 mr-2" />
                          Invite New Team Member
                        </Button>
                      </div>
                    </div>
                  )}

                  <div className="pt-4 border-t border-border/50">
                    <h3 className="text-sm font-medium mb-3">Sharing Settings</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Switch id="sharing-code" defaultChecked />
                        <Label htmlFor="sharing-code">Allow code viewing</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch id="sharing-fork" defaultChecked />
                        <Label htmlFor="sharing-fork">Allow forking</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch id="sharing-download" defaultChecked />
                        <Label htmlFor="sharing-download">Allow downloading</Label>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="deployment" className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Versioning & CI/CD</h3>
                    
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="enable-versioning" 
                        checked={enableVersioning}
                        onCheckedChange={setEnableVersioning}
                      />
                      <Label htmlFor="enable-versioning">Enable versioning</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="enable-cicd" 
                        checked={enableCICD}
                        onCheckedChange={setEnableCICD}
                      />
                      <Label htmlFor="enable-cicd">Enable CI/CD integration</Label>
                    </div>
                    
                    {enableCICD && (
                      <div className="ml-6 space-y-3">
                        <p className="text-sm text-muted-foreground">Select CI/CD providers:</p>
                        
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                          {cicdIntegrations.map(integration => (
                            <div key={integration.id} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`cicd-${integration.id}`} 
                                checked={selectedCICD.includes(integration.id)}
                                onCheckedChange={() => toggleCICD(integration.id)}
                              />
                              <Label htmlFor={`cicd-${integration.id}`}>{integration.name}</Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="pt-4 border-t border-border/50">
                    <h3 className="text-sm font-medium mb-3">Deployment Target</h3>
                    
                    <RadioGroup defaultValue="cloud" className="space-y-3">
                      <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-secondary/30 transition-colors">
                        <RadioGroupItem value="cloud" id="deploy-cloud" />
                        <div className="ml-2 flex-1">
                          <div className="flex items-center gap-2">
                            <Cloud className="h-4 w-4 text-primary" />
                            <Label htmlFor="deploy-cloud" className="font-medium">Cloud Platform</Label>
                          </div>
                          <p className="text-xs text-muted-foreground">Deploy to our managed cloud infrastructure</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-secondary/30 transition-colors">
                        <RadioGroupItem value="container" id="deploy-container" />
                        <div className="ml-2 flex-1">
                          <div className="flex items-center gap-2">
                            <Boxes className="h-4 w-4 text-primary" />
                            <Label htmlFor="deploy-container" className="font-medium">Container Registry</Label>
                          </div>
                          <p className="text-xs text-muted-foreground">Package as container image for deployment</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-secondary/30 transition-colors">
                        <RadioGroupItem value="edge" id="deploy-edge" />
                        <div className="ml-2 flex-1">
                          <div className="flex items-center gap-2">
                            <Cpu className="h-4 w-4 text-primary" />
                            <Label htmlFor="deploy-edge" className="font-medium">Edge Devices</Label>
                          </div>
                          <p className="text-xs text-muted-foreground">Optimize for deployment to edge hardware</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-secondary/30 transition-colors">
                        <RadioGroupItem value="custom" id="deploy-custom" />
                        <div className="ml-2 flex-1">
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4 text-primary" />
                            <Label htmlFor="deploy-custom" className="font-medium">Custom</Label>
                          </div>
                          <p className="text-xs text-muted-foreground">Custom deployment configuration</p>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="pt-4 border-t border-border/50">
                    <h3 className="text-sm font-medium mb-3">Security & Compliance</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Switch id="security-scan" defaultChecked />
                        <div>
                          <Label htmlFor="security-scan" className="flex items-center gap-1">
                            Security Scanning
                            <Shield className="h-3.5 w-3.5 text-primary ml-1" />
                          </Label>
                          <p className="text-xs text-muted-foreground">Scan dependencies for vulnerabilities</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch id="security-encrypt" defaultChecked />
                        <div>
                          <Label htmlFor="security-encrypt" className="flex items-center gap-1">
                            Encrypt Sensitive Data
                            <Lock className="h-3.5 w-3.5 text-primary ml-1" />
                          </Label>
                          <p className="text-xs text-muted-foreground">Automatically encrypt sensitive data files</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch id="security-audit" />
                        <div>
                          <Label htmlFor="security-audit">Compliance Audit Logs</Label>
                          <p className="text-xs text-muted-foreground">Enable detailed audit logs for compliance</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="flex justify-between gap-3 items-center mt-8">
                <div>
                  <p className="text-sm">Estimated cost: <span className="text-primary font-medium">{estimatedPrice}</span></p>
                  {estimatedPrice !== 'Free' && (
                    <p className="text-xs text-muted-foreground">Based on your selected options</p>
                  )}
                </div>
                
                <div className="flex gap-3">
                  <Button variant="outline">
                    Save as Template
                  </Button>
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
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default CreateProject;
