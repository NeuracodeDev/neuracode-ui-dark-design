
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface RentalOptionsProps {
  rentPeriod: string;
  setRentPeriod: (value: string) => void;
  duration: string;
  setDuration: (value: string) => void;
  startDate: string;
  setStartDate: (value: string) => void;
  backupEnabled: boolean;
  setBackupEnabled: (value: boolean) => void;
}

const RentalOptions: React.FC<RentalOptionsProps> = ({
  rentPeriod,
  setRentPeriod,
  duration,
  setDuration,
  startDate,
  setStartDate,
  backupEnabled,
  setBackupEnabled
}) => {
  return (
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
  );
};

export default RentalOptions;
