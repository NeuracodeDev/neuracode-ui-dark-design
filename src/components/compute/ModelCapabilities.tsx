
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GaugeCircle, Info } from 'lucide-react';

interface ModelCapability {
  type: string;
  models: string[];
  complexity: string;
}

interface ModelCapabilitiesProps {
  selectedGpu: string;
  gpuCount: number;
  capabilities: Record<string, ModelCapability[]>;
}

const ModelCapabilities: React.FC<ModelCapabilitiesProps> = ({ selectedGpu, gpuCount, capabilities }) => {
  const selectedCapabilities = capabilities[selectedGpu as keyof typeof capabilities] || [];

  // Get complexity color based on complexity level
  const getComplexityColor = (complexity: string) => {
    switch(complexity) {
      case 'low': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'medium': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'high': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'very-high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
      case 'extreme': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-300';
    }
  };

  return (
    <Card className="border-border/40 bg-card shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <GaugeCircle className="h-5 w-5 text-primary" />
          Estimated Model Capabilities
        </CardTitle>
        <CardDescription>
          What you can train and run with {gpuCount} x {selectedGpu} GPU(s)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {selectedCapabilities.map((capability, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  capability.type === 'Training' ? 'bg-primary' : 'bg-secondary'
                }`} />
                <h3 className="font-medium text-sm">{capability.type}</h3>
                <Badge 
                  variant="secondary"
                  className={`ml-auto text-xs ${getComplexityColor(capability.complexity)}`}
                >
                  {capability.complexity.charAt(0).toUpperCase() + capability.complexity.slice(1)}
                </Badge>
              </div>
              
              <div className="pl-4 border-l-2 border-border/50 space-y-2">
                {capability.models.map((model, modelIdx) => (
                  <div key={modelIdx} className="flex items-center text-sm">
                    <span className="text-muted-foreground">{model}</span>
                    {gpuCount > 1 && <span className="text-xs text-primary ml-2">{capability.type === 'Training' ? `(${gpuCount}x faster)` : ''}</span>}
                  </div>
                ))}
                
                <div className="pt-1 text-xs text-muted-foreground">
                  {capability.type === 'Training' ? (
                    <span>Scales approximately linearly with {gpuCount} GPU{gpuCount > 1 ? 's' : ''}</span>
                  ) : (
                    <span>Multiple GPUs can serve more inference requests in parallel</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-3 bg-secondary/30 rounded-md border border-border/50">
          <div className="flex items-start gap-2">
            <Info className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-xs text-muted-foreground">
                These estimates are based on standard configurations and may vary depending on specific 
                model architectures, batch sizes, precision settings, and optimization techniques.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModelCapabilities;
