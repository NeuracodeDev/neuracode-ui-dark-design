
import React, { useState } from 'react';
import { SidebarProvider, SidebarInset, SidebarRail } from '@/components/ui/sidebar';
import Sidebar from '@/components/dashboard/Sidebar';
import Topbar from '@/components/dashboard/Topbar';
import { Button } from '@/components/ui/button';
import { Server } from 'lucide-react';
import ResourceList from '@/components/compute/ResourceList';
import RentalOptions from '@/components/compute/RentalOptions';
import OrderSummary from '@/components/compute/OrderSummary';
import SupportCard from '@/components/compute/SupportCard';
import { availableResources } from '@/data/compute';
import { ComputeResource } from '@/types/compute';

const RentCompute: React.FC = () => {
  const [selectedResource, setSelectedResource] = useState<string>("res-1");
  const [rentPeriod, setRentPeriod] = useState<string>("hourly");
  const [startDate, setStartDate] = useState<string>("");
  const [duration, setDuration] = useState<string>("24");
  const [backupEnabled, setBackupEnabled] = useState<boolean>(true);
  const [paymentMethod, setPaymentMethod] = useState<string>("credit-card");
  
  const resource = availableResources.find(r => r.id === selectedResource) || availableResources[0];
  
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
                <ResourceList 
                  resources={availableResources} 
                  selectedResource={selectedResource} 
                  onSelectResource={setSelectedResource} 
                />
                
                <RentalOptions 
                  rentPeriod={rentPeriod}
                  setRentPeriod={setRentPeriod}
                  duration={duration}
                  setDuration={setDuration}
                  startDate={startDate}
                  setStartDate={setStartDate}
                  backupEnabled={backupEnabled}
                  setBackupEnabled={setBackupEnabled}
                />
              </div>
              
              <div className="space-y-6">
                <OrderSummary 
                  resource={resource}
                  rentPeriod={rentPeriod}
                  duration={duration}
                  startDate={startDate}
                  backupEnabled={backupEnabled}
                  paymentMethod={paymentMethod}
                  setPaymentMethod={setPaymentMethod}
                />
                
                <SupportCard />
              </div>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default RentCompute;
