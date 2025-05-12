
import React from 'react';
import { SidebarProvider, SidebarInset, SidebarRail } from '@/components/ui/sidebar';
import Sidebar from '@/components/dashboard/Sidebar';
import Topbar from '@/components/dashboard/Topbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const Settings: React.FC = () => {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-background dark">
        <Sidebar />
        <SidebarRail />
        
        <SidebarInset>
          <Topbar projectName="Settings" />
          
          <div className="p-6 overflow-auto h-[calc(100vh-32px)]">
            <div className="mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold">Settings</h1>
                  <p className="text-muted-foreground">Manage application preferences</p>
                </div>
              </div>
            </div>

            <Tabs defaultValue="general">
              <TabsList className="mb-4">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="appearance">Appearance</TabsTrigger>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="api">API Keys</TabsTrigger>
              </TabsList>
              
              <TabsContent value="general">
                <Card>
                  <CardHeader>
                    <CardTitle>General Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="auto-save">Auto-save projects</Label>
                        <p className="text-sm text-muted-foreground">Automatically save changes every 5 minutes</p>
                      </div>
                      <Switch id="auto-save" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="notifications">Enable notifications</Label>
                        <p className="text-sm text-muted-foreground">Get notified when jobs are complete</p>
                      </div>
                      <Switch id="notifications" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="telemetry">Share usage data</Label>
                        <p className="text-sm text-muted-foreground">Help us improve the platform with anonymous usage data</p>
                      </div>
                      <Switch id="telemetry" />
                    </div>
                    
                    <div className="pt-4">
                      <Button>Save Changes</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="appearance">
                <Card>
                  <CardHeader>
                    <CardTitle>Appearance Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="dark-mode">Dark Mode</Label>
                        <p className="text-sm text-muted-foreground">Enable dark mode for UI</p>
                      </div>
                      <Switch id="dark-mode" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="compact-view">Compact View</Label>
                        <p className="text-sm text-muted-foreground">Use more compact UI elements</p>
                      </div>
                      <Switch id="compact-view" />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="account">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Account settings coming soon...</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="api">
                <Card>
                  <CardHeader>
                    <CardTitle>API Keys</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>API key management coming soon...</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Settings;
