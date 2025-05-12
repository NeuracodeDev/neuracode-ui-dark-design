
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

interface CostEstimateProps {
  calculateTotalCost: () => string;
  gpuCount: number;
  selectedGpu: string;
  computeTime: string;
  timeUnit: string;
  includeMaintenance: boolean;
  selectedPricing: {
    hourlyRate: number;
    dailyRate: number;
    monthlyRate: number;
  };
}

const CostEstimate: React.FC<CostEstimateProps> = ({
  calculateTotalCost,
  gpuCount,
  selectedGpu,
  computeTime,
  timeUnit,
  includeMaintenance,
  selectedPricing,
}) => {
  return (
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
  );
};

export default CostEstimate;
