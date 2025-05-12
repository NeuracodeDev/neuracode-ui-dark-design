
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Calculator } from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';

interface ComputeFormProps {
  gpuCount: number;
  setGpuCount: (value: number) => void;
  selectedGpu: string;
  setSelectedGpu: (value: string) => void;
  computeTime: string;
  setComputeTime: (value: string) => void;
  timeUnit: string;
  setTimeUnit: (value: string) => void;
  includeMaintenance: boolean;
  setIncludeMaintenance: (value: boolean) => void;
  gpuOptions: Array<{ gpuType: string; hourlyRate: number; monthlyRate: number; dailyRate: number; }>;
  calculateTotalCost: () => string;
}

const ComputeForm: React.FC<ComputeFormProps> = ({
  gpuCount,
  setGpuCount,
  selectedGpu,
  setSelectedGpu,
  computeTime,
  setComputeTime,
  timeUnit,
  setTimeUnit,
  includeMaintenance,
  setIncludeMaintenance,
  gpuOptions,
  calculateTotalCost,
}) => {
  
  const handleCalculate = () => {
    toast({
      title: "Compute Cost Calculated",
      description: `Estimated cost: $${calculateTotalCost()} for ${computeTime} ${timeUnit} of ${gpuCount} ${selectedGpu} GPU(s)`,
    });
  };
  
  return (
    <Card className="border-border/40 bg-card shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Compute Requirements</CardTitle>
        <CardDescription>
          Configure your compute needs to get an accurate cost estimate
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="basic">Basic</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label>GPU Type</Label>
                <Select value={selectedGpu} onValueChange={setSelectedGpu}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select GPU Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {gpuOptions.map((gpu) => (
                      <SelectItem key={gpu.gpuType} value={gpu.gpuType}>
                        {gpu.gpuType}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <Label>Number of GPUs</Label>
                  <span className="text-sm text-muted-foreground">{gpuCount}</span>
                </div>
                <Slider 
                  value={[gpuCount]} 
                  min={1} 
                  max={8} 
                  step={1} 
                  onValueChange={(value) => setGpuCount(value[0])}
                  className="py-4"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Compute Duration</Label>
                  <Input 
                    type="number" 
                    value={computeTime} 
                    onChange={(e) => setComputeTime(e.target.value)}
                    className="mt-2"
                    min="1"
                  />
                </div>
                <div>
                  <Label>Time Unit</Label>
                  <Select value={timeUnit} onValueChange={setTimeUnit}>
                    <SelectTrigger className="w-full mt-2">
                      <SelectValue placeholder="Select Time Unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hours">Hours</SelectItem>
                      <SelectItem value="days">Days</SelectItem>
                      <SelectItem value="months">Months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 pt-2">
                <Switch 
                  id="maintenance" 
                  checked={includeMaintenance} 
                  onCheckedChange={setIncludeMaintenance}
                />
                <Label htmlFor="maintenance">Include maintenance costs (10%)</Label>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="advanced" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Storage (GB)</Label>
                <Input type="number" defaultValue="100" className="mt-2" />
              </div>
              <div>
                <Label>Network Bandwidth (GB)</Label>
                <Input type="number" defaultValue="500" className="mt-2" />
              </div>
              <div>
                <Label>Memory Requirements (GB)</Label>
                <Input type="number" defaultValue="32" className="mt-2" />
              </div>
              <div>
                <Label>CPU Cores</Label>
                <Input type="number" defaultValue="8" className="mt-2" />
              </div>
            </div>
            
            <div>
              <Label>Usage Pattern</Label>
              <Select defaultValue="continuous">
                <SelectTrigger className="w-full mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="continuous">Continuous (24/7)</SelectItem>
                  <SelectItem value="intermittent">Intermittent</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleCalculate}
          className="w-full flex gap-2"
          size="lg"
        >
          <Calculator className="h-4 w-4" />
          Calculate Cost
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ComputeForm;
