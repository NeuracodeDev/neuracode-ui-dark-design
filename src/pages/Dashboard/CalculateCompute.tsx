
import React, { useState } from 'react';
import { SidebarProvider, SidebarInset, SidebarRail } from '@/components/ui/sidebar';
import Sidebar from '@/components/dashboard/Sidebar';
import Topbar from '@/components/dashboard/Topbar';
import { Calculator } from 'lucide-react';
import ComputeForm from '@/components/compute/ComputeForm';
import CostEstimate from '@/components/compute/CostEstimate';
import ModelCapabilities from '@/components/compute/ModelCapabilities';
import OptimizationTips from '@/components/compute/OptimizationTips';

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

// Model capability estimates for different GPU types
const modelCapabilities = {
  'RTX 4090': [
    { type: 'Training', models: ['3B parameters', '7B fine-tuning'], complexity: 'medium' },
    { type: 'Inference', models: ['7B models', '13B with quantization'], complexity: 'high' },
  ],
  'A100-40GB': [
    { type: 'Training', models: ['7B parameters', '13B fine-tuning'], complexity: 'high' },
    { type: 'Inference', models: ['13B models', '70B with quantization'], complexity: 'high' },
  ],
  'A100-80GB': [
    { type: 'Training', models: ['13B parameters', '70B fine-tuning'], complexity: 'very-high' },
    { type: 'Inference', models: ['70B models', '175B with quantization'], complexity: 'very-high' },
  ],
  'H100': [
    { type: 'Training', models: ['70B parameters', '175B fine-tuning'], complexity: 'extreme' },
    { type: 'Inference', models: ['175B models', '540B with quantization'], complexity: 'extreme' },
  ],
};

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
                <ComputeForm 
                  gpuCount={gpuCount}
                  setGpuCount={setGpuCount}
                  selectedGpu={selectedGpu}
                  setSelectedGpu={setSelectedGpu}
                  computeTime={computeTime}
                  setComputeTime={setComputeTime}
                  timeUnit={timeUnit}
                  setTimeUnit={setTimeUnit}
                  includeMaintenance={includeMaintenance}
                  setIncludeMaintenance={setIncludeMaintenance}
                  gpuOptions={pricingData}
                  calculateTotalCost={calculateTotalCost}
                />
              </div>
              
              <div>
                <CostEstimate 
                  calculateTotalCost={calculateTotalCost}
                  gpuCount={gpuCount}
                  selectedGpu={selectedGpu}
                  computeTime={computeTime}
                  timeUnit={timeUnit}
                  includeMaintenance={includeMaintenance}
                  selectedPricing={selectedPricing}
                />
              </div>
            </div>
            
            {/* Model Capability Estimate Section */}
            <div className="mt-8">
              <ModelCapabilities 
                selectedGpu={selectedGpu} 
                gpuCount={gpuCount} 
                capabilities={modelCapabilities} 
              />
            </div>
            
            <div className="mt-8">
              <OptimizationTips />
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default CalculateCompute;
