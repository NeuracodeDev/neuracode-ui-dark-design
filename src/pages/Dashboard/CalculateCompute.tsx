
import React, { useState } from 'react';
import { SidebarProvider, SidebarInset, SidebarRail } from '@/components/ui/sidebar';
import Sidebar from '@/components/dashboard/Sidebar';
import Topbar from '@/components/dashboard/Topbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Calculator, Info, PlusCircle, Cpu, Download, Share2, Calendar, Clock, BarChart4, Zap, CreditCard } from 'lucide-react';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';

interface Pricing {
  gpuType: string;
  hourlyRate: number;
  monthlyRate: number;
  dailyRate: number;
  availability: 'high' | 'medium' | 'low';
  specs: {
    memory: string;
    cores: number;
    storage: string;
  }
}

const pricingData: Pricing[] = [
  { 
    gpuType: 'RTX 4090', 
    hourlyRate: 0.95, 
    monthlyRate: 450, 
    dailyRate: 18,
    availability: 'high',
    specs: {
      memory: '24GB GDDR6X',
      cores: 16384,
      storage: '100GB SSD'
    }
  },
  { 
    gpuType: 'A100-40GB', 
    hourlyRate: 1.50, 
    monthlyRate: 700, 
    dailyRate: 28,
    availability: 'medium',
    specs: {
      memory: '40GB HBM2',
      cores: 6912,
      storage: '200GB SSD'
    }
  },
  { 
    gpuType: 'A100-80GB', 
    hourlyRate: 2.10, 
    monthlyRate: 980, 
    dailyRate: 42,
    availability: 'medium',
    specs: {
      memory: '80GB HBM2e',
      cores: 6912,
      storage: '300GB SSD'
    }
  },
  { 
    gpuType: 'H100', 
    hourlyRate: 3.50, 
    monthlyRate: 1600, 
    dailyRate: 70,
    availability: 'low',
    specs: {
      memory: '80GB HBM3',
      cores: 16896,
      storage: '500GB SSD'
    }
  },
];

const regions = [
  { id: 'us-east', name: 'US East (N. Virginia)', latency: 'Low' },
  { id: 'us-west', name: 'US West (Oregon)', latency: 'Medium' },
  { id: 'eu-central', name: 'EU Central (Frankfurt)', latency: 'Medium' },
  { id: 'ap-southeast', name: 'Asia Pacific (Singapore)', latency: 'High' },
];

const discountTiers = [
  { hours: 100, discount: '5%' },
  { hours: 200, discount: '10%' },
  { hours: 500, discount: '15%' },
  { hours: 1000, discount: '20%' },
];

const CalculateCompute: React.FC = () => {
  const [gpuCount, setGpuCount] = useState<number>(1);
  const [selectedGpu, setSelectedGpu] = useState<string>("RTX 4090");
  const [computeTime, setComputeTime] = useState<string>("24");
  const [timeUnit, setTimeUnit] = useState<string>("hours");
  const [includeMaintenance, setIncludeMaintenance] = useState<boolean>(true);
  const [includeSupport, setIncludeSupport] = useState<boolean>(false);
  const [selectedRegion, setSelectedRegion] = useState<string>("us-east");
  const [reservationType, setReservationType] = useState<string>("on-demand");
  const [showComparison, setShowComparison] = useState<boolean>(false);
  
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
    
    // Apply maintenance fee if selected
    if (includeMaintenance) {
      cost *= 1.1; // 10% maintenance fee
    }
    
    // Apply support fee if selected
    if (includeSupport) {
      cost *= 1.15; // 15% support fee
    }
    
    // Apply reservation discount if applicable
    if (reservationType === "reserved-1yr" && timeUnit === "months" && time >= 1) {
      cost *= 0.8; // 20% discount for 1 year reservation
    } else if (reservationType === "reserved-3yr" && timeUnit === "months" && time >= 3) {
      cost *= 0.6; // 40% discount for 3 year reservation
    }
    
    return cost.toFixed(2);
  };
  
  // Calculate savings compared to on-demand
  const calculateSavings = () => {
    if (reservationType === "on-demand") return "0.00";
    
    const time = parseInt(computeTime) || 0;
    let standardCost = 0;
    let discountedCost = 0;
    
    if (timeUnit === "months") {
      standardCost = selectedPricing.monthlyRate * time * gpuCount;
      
      if (reservationType === "reserved-1yr") {
        discountedCost = standardCost * 0.8;
      } else if (reservationType === "reserved-3yr") {
        discountedCost = standardCost * 0.6;
      }
      
      return (standardCost - discountedCost).toFixed(2);
    }
    
    return "0.00";
  };
  
  const handleCalculate = () => {
    toast({
      title: "Compute Cost Calculated",
      description: `Estimated cost: $${calculateTotalCost()} for ${computeTime} ${timeUnit} of ${gpuCount} ${selectedGpu} GPU(s)`,
    });
  };

  const getAvailabilityColor = (availability: 'high' | 'medium' | 'low') => {
    switch (availability) {
      case 'high': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-red-500';
    }
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
                <div className="flex gap-2 mt-4 md:mt-0">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowComparison(!showComparison)}
                  >
                    <BarChart4 className="h-4 w-4 mr-1" />
                    {showComparison ? "Hide Comparison" : "Compare Options"}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      toast({
                        title: "Report Generated",
                        description: "Cost estimate report has been prepared for download."
                      });
                    }}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Export Estimate
                  </Button>
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
                      <TabsList className="grid grid-cols-3 mb-4">
                        <TabsTrigger value="basic">Basic</TabsTrigger>
                        <TabsTrigger value="advanced">Advanced</TabsTrigger>
                        <TabsTrigger value="reservation">Reservation</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="basic" className="space-y-6">
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between mb-1">
                              <Label>GPU Type</Label>
                              <Badge variant="outline" className="text-xs">
                                {selectedPricing?.availability === 'high' ? 'High Availability' : 
                                 selectedPricing?.availability === 'medium' ? 'Medium Availability' : 'Limited Availability'}
                              </Badge>
                            </div>
                            <Select value={selectedGpu} onValueChange={setSelectedGpu}>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select GPU Type" />
                              </SelectTrigger>
                              <SelectContent>
                                {pricingData.map((gpu) => (
                                  <SelectItem key={gpu.gpuType} value={gpu.gpuType}>
                                    <div className="flex items-center">
                                      <span>{gpu.gpuType}</span>
                                      <div className={`ml-2 h-2 w-2 rounded-full ${getAvailabilityColor(gpu.availability)}`}></div>
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <div className="mt-2 text-xs text-muted-foreground">
                              <div className="flex items-center gap-4">
                                <span>Memory: {selectedPricing?.specs.memory}</span> 
                                <span>CUDA Cores: {selectedPricing?.specs.cores.toLocaleString()}</span>
                                <span>Storage: {selectedPricing?.specs.storage}</span>
                              </div>
                            </div>
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
                          
                          <div>
                            <Label>Region</Label>
                            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                              <SelectTrigger className="w-full mt-2">
                                <SelectValue placeholder="Select Region" />
                              </SelectTrigger>
                              <SelectContent>
                                {regions.map((region) => (
                                  <SelectItem key={region.id} value={region.id}>
                                    {region.name} - {region.latency} Latency
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
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
                          
                          <div className="flex items-center space-x-2">
                            <Switch 
                              id="support" 
                              checked={includeSupport} 
                              onCheckedChange={setIncludeSupport}
                            />
                            <Label htmlFor="support">Include premium support (15%)</Label>
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
                          <div>
                            <Label>Framework</Label>
                            <Select defaultValue="pytorch">
                              <SelectTrigger className="w-full mt-2">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pytorch">PyTorch</SelectItem>
                                <SelectItem value="tensorflow">TensorFlow</SelectItem>
                                <SelectItem value="jax">JAX</SelectItem>
                                <SelectItem value="custom">Custom</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label>Instance Type</Label>
                            <Select defaultValue="gpu-optimized">
                              <SelectTrigger className="w-full mt-2">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="gpu-optimized">GPU Optimized</SelectItem>
                                <SelectItem value="memory-optimized">Memory Optimized</SelectItem>
                                <SelectItem value="compute-optimized">Compute Optimized</SelectItem>
                              </SelectContent>
                            </Select>
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
                        
                        <div>
                          <Label>Scheduler</Label>
                          <Select defaultValue="none">
                            <SelectTrigger className="w-full mt-2">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">None</SelectItem>
                              <SelectItem value="slurm">SLURM</SelectItem>
                              <SelectItem value="kubernetes">Kubernetes</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label>Container Support</Label>
                          <RadioGroup defaultValue="docker">
                            <div className="flex gap-4 mt-2">
                              <div className="flex items-center">
                                <RadioGroupItem value="docker" id="docker" />
                                <Label htmlFor="docker" className="ml-2">Docker</Label>
                              </div>
                              <div className="flex items-center">
                                <RadioGroupItem value="singularity" id="singularity" />
                                <Label htmlFor="singularity" className="ml-2">Singularity</Label>
                              </div>
                              <div className="flex items-center">
                                <RadioGroupItem value="none" id="no-container" />
                                <Label htmlFor="no-container" className="ml-2">None</Label>
                              </div>
                            </div>
                          </RadioGroup>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="reservation" className="space-y-4">
                        <div>
                          <Label className="mb-2 block">Reservation Type</Label>
                          <RadioGroup 
                            value={reservationType} 
                            onValueChange={setReservationType}
                            className="grid grid-cols-1 gap-2"
                          >
                            <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-secondary/30 transition-colors">
                              <RadioGroupItem value="on-demand" id="on-demand" />
                              <div className="ml-2">
                                <Label htmlFor="on-demand" className="font-medium">On-Demand</Label>
                                <p className="text-xs text-muted-foreground">Pay only for what you use with no long-term commitment</p>
                              </div>
                              <Badge className="ml-auto">Standard Rate</Badge>
                            </div>
                            
                            <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-secondary/30 transition-colors">
                              <RadioGroupItem value="reserved-1yr" id="reserved-1yr" />
                              <div className="ml-2">
                                <Label htmlFor="reserved-1yr" className="font-medium">1-Year Reserved</Label>
                                <p className="text-xs text-muted-foreground">Lower hourly rate with a 1-year commitment</p>
                              </div>
                              <Badge variant="secondary" className="ml-auto text-primary">Save 20%</Badge>
                            </div>
                            
                            <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-secondary/30 transition-colors">
                              <RadioGroupItem value="reserved-3yr" id="reserved-3yr" />
                              <div className="ml-2">
                                <Label htmlFor="reserved-3yr" className="font-medium">3-Year Reserved</Label>
                                <p className="text-xs text-muted-foreground">Lowest hourly rate with a 3-year commitment</p>
                              </div>
                              <Badge variant="secondary" className="ml-auto text-primary">Save 40%</Badge>
                            </div>
                          </RadioGroup>
                        </div>
                        
                        <div className="mt-4">
                          <h3 className="text-sm font-medium mb-2">Volume Discounts Available</h3>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            {discountTiers.map((tier) => (
                              <div key={tier.hours} className="bg-secondary/30 rounded-md p-3 text-center">
                                <div className="text-primary font-medium">{tier.discount}</div>
                                <div className="text-xs text-muted-foreground">{tier.hours}+ hours</div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <div className="flex items-center mb-2">
                            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                            <Label>Starting Date</Label>
                          </div>
                          <Input type="date" className="mt-1" />
                        </div>
                        
                        <div className="mt-4">
                          <div className="flex items-center mb-2">
                            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                            <Label>Billing Cycle</Label>
                          </div>
                          <Select defaultValue="monthly">
                            <SelectTrigger className="w-full mt-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="monthly">Monthly</SelectItem>
                              <SelectItem value="quarterly">Quarterly</SelectItem>
                              <SelectItem value="annual">Annual</SelectItem>
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
                
                {showComparison && (
                  <Card className="border-border/40 bg-card shadow-sm mt-6">
                    <CardHeader>
                      <CardTitle className="text-lg">Cost Comparison</CardTitle>
                      <CardDescription>
                        Compare different GPU types and reservation options
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-border">
                              <th className="text-left py-2 text-sm font-normal text-muted-foreground">GPU Type</th>
                              <th className="text-right py-2 text-sm font-normal text-muted-foreground">On-Demand</th>
                              <th className="text-right py-2 text-sm font-normal text-muted-foreground">1-Year Reserved</th>
                              <th className="text-right py-2 text-sm font-normal text-muted-foreground">3-Year Reserved</th>
                            </tr>
                          </thead>
                          <tbody>
                            {pricingData.map((gpu) => (
                              <tr key={gpu.gpuType} className="border-b border-border/50">
                                <td className="py-3">
                                  <div className="flex items-center gap-2">
                                    <div className={`h-2 w-2 rounded-full ${getAvailabilityColor(gpu.availability)}`} />
                                    <span>{gpu.gpuType}</span>
                                  </div>
                                </td>
                                <td className="text-right">${gpu.hourlyRate.toFixed(2)}/hr</td>
                                <td className="text-right">${(gpu.hourlyRate * 0.8).toFixed(2)}/hr</td>
                                <td className="text-right">${(gpu.hourlyRate * 0.6).toFixed(2)}/hr</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                )}
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
                        
                        {reservationType !== "on-demand" && parseInt(calculateSavings()) > 0 && (
                          <div className="mt-2 text-xs bg-primary/20 text-primary py-1 px-2 rounded-md inline-block">
                            <Zap className="h-3 w-3 inline mr-1" />
                            You save ${calculateSavings()} with this reservation
                          </div>
                        )}
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
                      
                      {includeSupport && (
                        <div className="flex justify-between text-sm">
                          <span>Premium Support (+15%)</span>
                          <span>Included</span>
                        </div>
                      )}
                      
                      {reservationType !== "on-demand" && (
                        <div className="flex justify-between text-sm">
                          <span>Reservation Discount</span>
                          <span>{reservationType === "reserved-1yr" ? "-20%" : "-40%"}</span>
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
                      <Download className="h-4 w-4 mr-2" />
                      Export Report
                    </Button>
                    <Button className="w-full" onClick={() => {
                      toast({
                        title: "Redirecting to Rent Compute",
                        description: "Taking you to rent compute resources based on your configuration."
                      });
                      window.location.href = '/dashboard/rent-compute';
                    }}>
                      <CreditCard className="h-4 w-4 mr-2" />
                      Rent These Resources
                    </Button>
                    <Button variant="outline" className="w-full" onClick={() => {
                      toast({
                        title: "Estimate Shared",
                        description: "Cost estimate link copied to clipboard."
                      });
                    }}>
                      <Share2 className="h-4 w-4 mr-2" />
                      Share Estimate
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card className="border-border/40 bg-card shadow-sm mt-6">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Info className="h-5 w-5 text-primary" />
                      Compute Cost Optimization Tips
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-4">
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
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default CalculateCompute;
