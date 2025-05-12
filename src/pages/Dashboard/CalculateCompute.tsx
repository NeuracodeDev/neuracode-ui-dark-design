
import React, { useState } from 'react';
import { SidebarProvider, SidebarInset, SidebarRail } from '@/components/ui/sidebar';
import Sidebar from '@/components/dashboard/Sidebar';
import Topbar from '@/components/dashboard/Topbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Calculator, Info, PlusCircle, Cpu } from 'lucide-react';
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

interface Pricing {
  gpuType: string;
  hourlyRate: number;
  monthlyRate: number;
  dailyRate: number;
}

const pricingData: Pricing[] = [
  { gpuType: 'RTX 4090', hourlyRate: 0.95, monthlyRate: 450, dailyRate: 18 },
  { gpuType: 'A100-40GB', hourlyRate: 1.50, monthlyRate: 700, dailyRate: 28 },
  { gpuType: 'A100-80GB', hourlyRate: 2.10, monthlyRate: 980, dailyRate: 42 },
  { gpuType: 'H100', hourlyRate: 3.50, monthlyRate: 1600, dailyRate: 70 },
];

const CalculateCompute: React.FC = () => {
  const [gpuCount, setGpuCount] = useState<number>(1);
  const [selectedGpu, setSelectedGpu] = useState<string>("RTX 4090");
  const [computeTime, setComputeTime] = useState<string>("24");
  const [timeUnit, setTimeUnit] = useState<string>("hours");
  const [includeMaintenance, setIncludeMaintenance] = useState<boolean>(true);
  
  const selectedPricing = pricingData.find(p => p.gpuType === selectedGpu) || pricingData[0];
  
  const calculateTotalCost = () => {
    const time = parseInt(computeTime) || 0;
    let cost = 0;
    
    if (timeUnit === "hours") {
      cost = selectedPricing.hourlyRate * time * gpuCount;
    } else if (timeUnit === "days") {
      cost = selectedPricing.dailyRate * time * gpuCount;
    } else if (timeUnit === "months") {
      cost = selectedPricing.monthlyRate * time * gpuCount;
    }
    
    if (includeMaintenance) {
      // Add 10% for maintenance costs
      cost *= 1.1;
    }
    
    return cost.toFixed(2);
  };
  
  const handleCalculate = () => {
    toast({
      title: "Compute Cost Calculated",
      description: `Estimated cost: $${calculateTotalCost()} for ${computeTime} ${timeUnit} of ${gpuCount} ${selectedGpu} GPU(s)`,
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
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                  <h1 className="font-medium text-2xl tracking-tight mb-2 flex items-center gap-2">
                    <Calculator className="h-6 w-6 text-primary" />
                    Calculate Compute Resources
                  </h1>
                  <p className="text-muted-foreground text-sm">
                    Estimate the cost of GPU compute resources for your ML projects
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
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
                                {pricingData.map((gpu) => (
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
              </div>
              
              <div>
                <Card className="border-border/40 bg-card shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Cost Estimate</CardTitle>
                    <CardDescription>
                      Based on your selected configuration
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="rounded-md bg-secondary/50 p-4">
                      <div className="text-center">
                        <div className="text-muted-foreground text-sm">Estimated Cost</div>
                        <div className="text-3xl font-semibold text-primary mt-1">${calculateTotalCost()}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          For {gpuCount} x {selectedGpu} for {computeTime} {timeUnit}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Base Rate</span>
                        <span>${selectedPricing.hourlyRate}/hour per GPU</span>
                      </div>
                      
                      {includeMaintenance && (
                        <div className="flex justify-between text-sm">
                          <span>Maintenance Cost (+10%)</span>
                          <span>Included</span>
                        </div>
                      )}
                      
                      <div className="flex justify-between text-sm pt-2 border-t border-border">
                        <span className="font-medium">Total</span>
                        <span className="font-medium">${calculateTotalCost()}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col items-stretch gap-2">
                    <Button variant="outline" className="w-full" onClick={() => {
                      toast({
                        title: "Report Generated",
                        description: "Cost breakdown report has been generated and can be downloaded."
                      });
                    }}>
                      Export Report
                    </Button>
                    <Button className="w-full" onClick={() => {
                      toast({
                        title: "Redirecting to Rent Compute",
                        description: "Taking you to rent compute resources based on your configuration."
                      });
                      window.location.href = '/dashboard/rent-compute';
                    }}>
                      Rent These Resources
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
            
            <div className="mt-8">
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
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default CalculateCompute;
