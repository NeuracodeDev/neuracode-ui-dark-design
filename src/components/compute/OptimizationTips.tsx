
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';

const OptimizationTips: React.FC = () => {
  return (
    <Card className="border-border/40 bg-card shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Info className="h-5 w-5 text-primary" />
          Compute Cost Optimization Tips
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-md bg-secondary/30 border border-border/50">
            <h3 className="font-medium mb-2">Use Spot Instances</h3>
            <p className="text-sm text-muted-foreground">Save up to 70% by using spot instances for interruptible workloads like training.</p>
          </div>
          <div className="p-4 rounded-md bg-secondary/30 border border-border/50">
            <h3 className="font-medium mb-2">Optimize Batch Size</h3>
            <p className="text-sm text-muted-foreground">Tune your batch size to maximize GPU utilization and reduce training time.</p>
          </div>
          <div className="p-4 rounded-md bg-secondary/30 border border-border/50">
            <h3 className="font-medium mb-2">Schedule Resources</h3>
            <p className="text-sm text-muted-foreground">Schedule resources to automatically shut down when not in use to save costs.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OptimizationTips;
