
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Clock, Calendar, Server, ShieldCheck } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { ComputeResource } from '@/types/compute';

interface OrderSummaryProps {
  resource: ComputeResource;
  rentPeriod: string;
  duration: string;
  startDate: string;
  backupEnabled: boolean;
  paymentMethod: string;
  setPaymentMethod: (value: string) => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  resource,
  rentPeriod,
  duration,
  startDate,
  backupEnabled,
  paymentMethod,
  setPaymentMethod
}) => {
  const calculateTotalCost = () => {
    const durationNum = parseInt(duration) || 1;
    
    if (rentPeriod === "hourly") {
      return (resource.hourlyPrice * durationNum).toFixed(2);
    } else {
      return (resource.monthlyPrice * durationNum).toFixed(2);
    }
  };

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

  const handleRentCompute = () => {
    toast({
      title: "Compute Resources Reserved",
      description: `Successfully rented ${resource.name} for ${duration} ${rentPeriod === "hourly" ? "hours" : "months"}.`,
    });
  };

  return (
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
  );
};

export default OrderSummary;
