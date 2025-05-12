
import React, { useState } from 'react';
import { SidebarProvider, SidebarInset, SidebarRail } from '@/components/ui/sidebar';
import Sidebar from '@/components/dashboard/Sidebar';
import Topbar from '@/components/dashboard/Topbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Server, Info, Clock, Calendar, ArrowRight, Check, ShieldCheck, PlusCircle } from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from '@/components/ui/use-toast';
import { Separator } from '@/components/ui/separator';

interface ComputeResource {
  id: string;
  name: string;
  description: string;
  gpuType: string;
  gpuCount: number;
  cpuCores: number;
  memory: string;
  storage: string;
  hourlyPrice: number;
  monthlyPrice: number;
  availability: "high" | "medium" | "low";
  location: string;
}

const availableResources: ComputeResource[] = [
  {
    id: "res-1",
    name: "Training Basic",
    description: "Good for small to medium model training and fine-tuning",
    gpuType: "RTX 4090",
    gpuCount: 1,
    cpuCores: 8,
    memory: "64GB",
    storage: "500GB SSD",
    hourlyPrice: 0.95,
    monthlyPrice: 450,
    availability: "high",
    location: "US-East"
  },
  {
    id: "res-2",
    name: "Training Pro",
    description: "Ideal for medium to large model training and fine-tuning",
    gpuType: "A100-40GB",
    gpuCount: 2,
    cpuCores: 16,
    memory: "128GB",
    storage: "1TB SSD",
    hourlyPrice: 3.0,
    monthlyPrice: 1400,
    availability: "medium",
    location: "US-West"
  },
  {
    id: "res-3",
    name: "Inference Cluster",
    description: "Optimized for high-throughput inference workloads",
    gpuType: "A100-80GB",
    gpuCount: 4,
    cpuCores: 32,
    memory: "256GB",
    storage: "2TB SSD",
    hourlyPrice: 8.4,
    monthlyPrice: 3920,
    availability: "low",
    location: "EU-Central"
  },
  {
    id: "res-4",
    name: "Research Powerhouse",
    description: "For large-scale research and enterprise workloads",
    gpuType: "H100",
    gpuCount: 2,
    cpuCores: 24,
    memory: "320GB",
    storage: "4TB SSD",
    hourlyPrice: 7.0,
    monthlyPrice: 3200,
    availability: "medium",
    location: "Asia-Pacific"
  }
];

const RentCompute: React.FC = () => {
  const [selectedResource, setSelectedResource] = useState<string>("res-1");
  const [rentPeriod, setRentPeriod] = useState<string>("hourly");
  const [startDate, setStartDate] = useState<string>("");
  const [duration, setDuration] = useState<string>("24");
  const [backupEnabled, setBackupEnabled] = useState<boolean>(true);
  const [paymentMethod, setPaymentMethod] = useState<string>("credit-card");
  
  const resource = availableResources.find(r => r.id === selectedResource) || availableResources[0];
  
  const calculateTotalCost = () => {
    const durationNum = parseInt(duration) || 1;
    
    if (rentPeriod === "hourly") {
      return (resource.hourlyPrice * durationNum).toFixed(2);
    } else {
      return (resource.monthlyPrice * durationNum).toFixed(2);
    }
  };
  
  const handleRentCompute = () => {
    toast({
      title: "Compute Resources Reserved",
      description: `Successfully rented ${resource.name} for ${duration} ${rentPeriod === "hourly" ? "hours" : "months"}.`,
    });
  };
  
  const getAvailabilityColor = (availability: "high" | "medium" | "low") => {
    switch (availability) {
      case "high": return "bg-green-500";
      case "medium": return "bg-yellow-500";
      case "low": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };
  
  // Format date to display in yyyy-MM-dd format if there is a date
  const formatDate = (dateString: string) => {
    if (!dateString) return "As soon as possible";
    
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}`;
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
                    <Server className="h-6 w-6 text-primary" />
                    Rent Compute Resources
                  </h1>
                  <p className="text-muted-foreground text-sm">
                    Secure high-performance GPU resources for your AI workloads
                  </p>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-4 md:mt-0"
                  onClick={() => window.location.href = '/dashboard/calculate-compute'}
                >
                  Calculate Costs First
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card className="border-border/40 bg-card shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Available Resources</CardTitle>
                    <CardDescription>
                      Select from our high-performance compute instances
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-4">
                      {availableResources.map((res) => (
                        <div 
                          key={res.id}
                          className={`rounded-lg border p-4 cursor-pointer transition-all duration-200 ${selectedResource === res.id ? 'border-primary bg-secondary/30 shadow-md' : 'border-border hover:border-primary/30 hover:bg-secondary/10'}`}
                          onClick={() => setSelectedResource(res.id)}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex gap-3 items-center">
                              <div className={`h-3 w-3 rounded-full ${getAvailabilityColor(res.availability)}`} />
                              <h3 className="font-medium">{res.name}</h3>
                            </div>
                            <Badge variant={selectedResource === res.id ? "default" : "outline"}>
                              {selectedResource === res.id ? "Selected" : "Select"}
                            </Badge>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-3">{res.description}</p>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                            <div>
                              <p className="text-muted-foreground">GPU</p>
                              <p className="font-medium">{res.gpuCount}x {res.gpuType}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">CPU</p>
                              <p className="font-medium">{res.cpuCores} Cores</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Memory</p>
                              <p className="font-medium">{res.memory}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Storage</p>
                              <p className="font-medium">{res.storage}</p>
                            </div>
                          </div>
                          
                          <div className="mt-3 flex justify-between items-center">
                            <div className="text-primary font-medium">
                              ${res.hourlyPrice}/hr | ${res.monthlyPrice}/mo
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Location: {res.location}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-border/40 bg-card shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Rental Options</CardTitle>
                    <CardDescription>
                      Configure your rental period and additional settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="standard" className="w-full">
                      <TabsList className="grid grid-cols-2 mb-6">
                        <TabsTrigger value="standard">Standard</TabsTrigger>
                        <TabsTrigger value="advanced">Advanced</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="standard" className="space-y-6">
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label>Rental Type</Label>
                              <Select 
                                value={rentPeriod} 
                                onValueChange={setRentPeriod}
                              >
                                <SelectTrigger className="w-full mt-2">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="hourly">Hourly (On-demand)</SelectItem>
                                  <SelectItem value="monthly">Monthly (Reserved)</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div>
                              <Label>Duration ({rentPeriod === "hourly" ? "hours" : "months"})</Label>
                              <Input
                                type="number"
                                min="1"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                className="mt-2"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <Label>Start Date</Label>
                            <Input 
                              type="datetime-local" 
                              value={startDate} 
                              onChange={(e) => setStartDate(e.target.value)}
                              className="mt-2"
                            />
                          </div>
                          
                          <div className="flex items-center space-x-2 pt-2">
                            <Switch 
                              id="backup" 
                              checked={backupEnabled} 
                              onCheckedChange={setBackupEnabled}
                            />
                            <Label htmlFor="backup">Enable daily backups (+10%)</Label>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="advanced" className="space-y-6">
                        <div className="space-y-4">
                          <div>
                            <Label>Network Configuration</Label>
                            <Select defaultValue="public">
                              <SelectTrigger className="w-full mt-2">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="public">Public IP</SelectItem>
                                <SelectItem value="vpc">Private VPC</SelectItem>
                                <SelectItem value="vpn">VPN Connection</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div>
                            <Label>Software Stack</Label>
                            <Select defaultValue="pytorch">
                              <SelectTrigger className="w-full mt-2">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pytorch">PyTorch</SelectItem>
                                <SelectItem value="tensorflow">TensorFlow</SelectItem>
                                <SelectItem value="jax">JAX</SelectItem>
                                <SelectItem value="custom">Custom Image</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div>
                            <Label>Auto-scaling</Label>
                            <Select defaultValue="none">
                              <SelectTrigger className="w-full mt-2">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="none">None</SelectItem>
                                <SelectItem value="basic">Basic (CPU/Memory)</SelectItem>
                                <SelectItem value="advanced">Advanced (Custom Metrics)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-6">
                <Card className="border-border/40 bg-card shadow-sm sticky top-8">
                  <CardHeader>
                    <CardTitle className="text-lg">Order Summary</CardTitle>
                    <CardDescription>
                      Review your compute rental details
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="rounded-md bg-secondary/50 p-4">
                      <div>
                        <div className="font-medium">{resource.name}</div>
                        <div className="text-xs text-muted-foreground mb-3">{resource.gpuCount}x {resource.gpuType}</div>
                        
                        <div className="text-sm text-muted-foreground flex items-center gap-1.5 mb-1.5">
                          <Clock className="h-3.5 w-3.5" />
                          {duration} {rentPeriod === "hourly" ? "hours" : "months"}
                        </div>
                        
                        <div className="text-sm text-muted-foreground flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          {formatDate(startDate)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Base Price</span>
                        <span>${resource.hourlyPrice}/hr or ${resource.monthlyPrice}/mo</span>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span>Duration</span>
                        <span>{duration} {rentPeriod === "hourly" ? "hours" : "months"}</span>
                      </div>
                      
                      {backupEnabled && (
                        <div className="flex justify-between text-sm">
                          <span>Daily Backups (+10%)</span>
                          <span>Enabled</span>
                        </div>
                      )}
                      
                      <Separator className="my-2" />
                      
                      <div className="flex justify-between text-sm font-medium">
                        <span>Total Estimated Cost</span>
                        <span className="text-primary">${calculateTotalCost()}</span>
                      </div>
                    </div>
                    
                    <div>
                      <Label className="mb-2 block">Payment Method</Label>
                      <RadioGroup 
                        value={paymentMethod} 
                        onValueChange={setPaymentMethod}
                        className="space-y-3"
                      >
                        <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-secondary/30 transition-colors">
                          <RadioGroupItem value="credit-card" id="credit-card" />
                          <Label htmlFor="credit-card" className="flex-1 cursor-pointer">Credit Card</Label>
                        </div>
                        <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-secondary/30 transition-colors">
                          <RadioGroupItem value="compute-credit" id="compute-credit" />
                          <Label htmlFor="compute-credit" className="flex-1 cursor-pointer">Compute Credits</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-3">
                    <Button 
                      className="w-full flex items-center gap-2" 
                      size="lg"
                      onClick={handleRentCompute}
                    >
                      <Server className="h-4 w-4" />
                      Rent Now
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      size="sm"
                      onClick={() => {
                        toast({
                          title: "Quote Saved",
                          description: "This configuration has been saved to your account."
                        });
                      }}
                    >
                      Save Quote
                    </Button>
                    
                    <div className="text-xs text-muted-foreground text-center flex items-center justify-center mt-1">
                      <ShieldCheck className="h-3 w-3 mr-1" />
                      Secure payment & instant provisioning
                    </div>
                  </CardFooter>
                </Card>
                
                <Card className="border-border/40 bg-card shadow-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center">
                      <Info className="h-4 w-4 mr-2 text-primary" />
                      Need Help?
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-xs text-muted-foreground mb-4">
                      Our team can help you configure the optimal compute resources for your specific workload.
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full text-xs"
                      onClick={() => {
                        toast({
                          title: "Support Request Sent",
                          description: "Our team will contact you shortly."
                        });
                      }}
                    >
                      Contact Support
                    </Button>
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

export default RentCompute;
