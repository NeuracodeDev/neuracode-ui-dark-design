
import React from 'react';
import { Plus, Cpu, Download, Loader } from 'lucide-react';
import { SidebarProvider, SidebarInset, SidebarRail } from '@/components/ui/sidebar';
import Sidebar from '@/components/dashboard/Sidebar';
import Topbar from '@/components/dashboard/Topbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ModelCardProps {
  name: string;
  type: string;
  accuracy: string;
  lastTrained: string;
  status: 'deployed' | 'training' | 'ready';
  onDetails: () => void;
  onAction: () => void;
}

const ModelCard: React.FC<ModelCardProps> = ({ name, type, accuracy, lastTrained, status, onDetails, onAction }) => {
  return (
    <Card className="overflow-hidden hover:neon-border hover:shadow-md transition-all duration-200">
      <div className="h-1 bg-primary w-full opacity-80"></div>
      <CardContent className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{name}</h3>
            <p className="text-muted-foreground text-sm">{type}</p>
          </div>
          <div className={`px-2.5 py-1 text-xs rounded-full ${
            status === 'deployed' ? 'bg-green-500/20 text-green-400' : 
            status === 'training' ? 'bg-amber-500/20 text-amber-400' : 
            'bg-primary/20 text-primary'
          }`}>
            {status === 'training' && <Loader className="h-3 w-3 mr-1 inline animate-spin" />}
            {status === 'deployed' ? 'Deployed' : status === 'training' ? 'Training...' : 'Ready'}
          </div>
        </div>
        
        <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-muted-foreground text-xs">Accuracy</p>
            <p className="font-medium">{accuracy}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs">Last Trained</p>
            <p className="font-medium">{lastTrained}</p>
          </div>
        </div>
        
        <div className="mt-5 flex justify-end gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="hover:border-primary/30 hover:text-primary transition-colors"
            onClick={onDetails}
          >
            Details
          </Button>
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  size="sm" 
                  className="btn-ripple"
                  onClick={onAction}
                >
                  {status === 'deployed' ? 'Update' : status === 'training' ? 'View Logs' : 'Deploy'}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                {status === 'deployed' ? 'Update existing deployment' : 
                 status === 'training' ? 'View training progress' : 'Deploy this model'}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  );
};

const models = [
  {
    id: '1',
    name: 'Sentiment Classifier',
    type: 'BERT Fine-tuned',
    accuracy: '94.2%',
    lastTrained: '2 days ago',
    status: 'deployed' as const
  },
  {
    id: '2',
    name: 'Image Recognition v2',
    type: 'CNN Architecture',
    accuracy: '89.5%',
    lastTrained: '1 week ago',
    status: 'ready' as const
  },
  {
    id: '3',
    name: 'Recommendation Engine',
    type: 'Collaborative Filtering',
    accuracy: '78.3%',
    lastTrained: 'Just now',
    status: 'training' as const
  },
  {
    id: '4',
    name: 'Text Generator',
    type: 'GPT Fine-tuned',
    accuracy: '92.7%',
    lastTrained: '3 days ago',
    status: 'deployed' as const
  },
  {
    id: '5',
    name: 'Fraud Detection',
    type: 'XGBoost',
    accuracy: '97.1%',
    lastTrained: '5 days ago',
    status: 'ready' as const
  },
  {
    id: '6',
    name: 'Translation Model',
    type: 'Transformer',
    accuracy: '88.4%',
    lastTrained: '1 week ago',
    status: 'deployed' as const
  }
];

const Models: React.FC = () => {
  const navigate = useNavigate();

  const handleNewModel = () => {
    toast({
      title: "New Model",
      description: "Creating a new model",
    });
    // Here you would navigate to create model page
  };

  const handleImportModel = () => {
    toast({
      title: "Import Model",
      description: "Opening model import wizard",
    });
    // Here you would navigate to import page or open a modal
  };

  const handleModelDetails = (id: string, name: string) => {
    toast({
      title: "Model Details",
      description: `Opening details for ${name}`,
    });
    // Here you would navigate to model details page
  };

  const handleModelAction = (id: string, name: string, status: string) => {
    switch(status) {
      case 'deployed':
        toast({
          title: "Update Model",
          description: `Preparing to update ${name}`,
        });
        break;
      case 'training':
        toast({
          title: "Training Logs",
          description: `Viewing logs for ${name}`,
        });
        break;
      default:
        toast({
          title: "Deploy Model",
          description: `Deploying ${name} to production`,
        });
    }
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-background dark">
        <Sidebar />
        <SidebarRail />
        
        <SidebarInset>
          <Topbar projectName="Models" />
          
          <div className="p-8 overflow-auto h-[calc(100vh-32px)] scrollbar-thin">
            <div className="mb-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-semibold tracking-tight mb-2">AI Models</h1>
                  <p className="text-muted-foreground">Manage your trained models</p>
                </div>
                <div className="flex gap-3 mt-4 md:mt-0">
                  <Button 
                    className="shadow-sm hover:shadow-md transition-shadow btn-ripple"
                    onClick={handleNewModel}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    New Model
                  </Button>
                  <Button 
                    variant="outline" 
                    className="hover:border-primary/30 hover:text-primary transition-colors"
                    onClick={handleImportModel}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Import Model
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {models.map((model) => (
                <ModelCard
                  key={model.id}
                  name={model.name}
                  type={model.type}
                  accuracy={model.accuracy}
                  lastTrained={model.lastTrained}
                  status={model.status}
                  onDetails={() => handleModelDetails(model.id, model.name)}
                  onAction={() => handleModelAction(model.id, model.name, model.status)}
                />
              ))}
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Models;
