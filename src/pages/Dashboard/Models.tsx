
import React from 'react';
import { Plus, Cpu, Download } from 'lucide-react';
import { SidebarProvider, SidebarInset, SidebarRail } from '@/components/ui/sidebar';
import Sidebar from '@/components/dashboard/Sidebar';
import Topbar from '@/components/dashboard/Topbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ModelCardProps {
  name: string;
  type: string;
  accuracy: string;
  lastTrained: string;
  status: 'deployed' | 'training' | 'ready';
}

const ModelCard: React.FC<ModelCardProps> = ({ name, type, accuracy, lastTrained, status }) => {
  return (
    <Card className="overflow-hidden hover:neon-border transition-all">
      <div className="h-1 bg-primary w-full opacity-80"></div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{name}</h3>
            <p className="text-muted-foreground text-sm">{type}</p>
          </div>
          <div className={`px-2 py-1 text-xs rounded-full ${
            status === 'deployed' ? 'bg-green-500/20 text-green-500' : 
            status === 'training' ? 'bg-amber-500/20 text-amber-500' : 
            'bg-blue-500/20 text-blue-500'
          }`}>
            {status === 'deployed' ? 'Deployed' : status === 'training' ? 'Training' : 'Ready'}
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-muted-foreground">Accuracy</p>
            <p className="font-medium">{accuracy}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Last Trained</p>
            <p className="font-medium">{lastTrained}</p>
          </div>
        </div>
        
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline" size="sm">Details</Button>
          <Button size="sm">
            {status === 'deployed' ? 'Update' : status === 'training' ? 'View Logs' : 'Deploy'}
          </Button>
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
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-background dark">
        <Sidebar />
        <SidebarRail />
        
        <SidebarInset>
          <Topbar projectName="Models" />
          
          <div className="p-6 overflow-auto h-[calc(100vh-32px)]">
            <div className="mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold">AI Models</h1>
                  <p className="text-muted-foreground">Manage your trained models</p>
                </div>
                <div className="flex gap-3 mt-4 md:mt-0">
                  <Button className="animate-pulse-blue">
                    <Plus className="mr-2 h-4 w-4" />
                    New Model
                  </Button>
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Import Model
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {models.map((model) => (
                <ModelCard
                  key={model.id}
                  name={model.name}
                  type={model.type}
                  accuracy={model.accuracy}
                  lastTrained={model.lastTrained}
                  status={model.status}
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
