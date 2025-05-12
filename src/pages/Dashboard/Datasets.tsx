
import React from 'react';
import { Plus, Database, FileText } from 'lucide-react';
import { SidebarProvider, SidebarInset, SidebarRail } from '@/components/ui/sidebar';
import Sidebar from '@/components/dashboard/Sidebar';
import Topbar from '@/components/dashboard/Topbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const datasets = [
  {
    id: '1',
    name: 'MNIST Handwritten Digits',
    type: 'Image',
    size: '11.5 MB',
    records: '70,000',
    lastModified: '2 days ago'
  },
  {
    id: '2',
    name: 'Customer Reviews',
    type: 'Text',
    size: '54.2 MB',
    records: '125,430',
    lastModified: '1 week ago'
  },
  {
    id: '3',
    name: 'Stock Market Data',
    type: 'Tabular',
    size: '87.1 MB',
    records: '1,250,000',
    lastModified: '2 weeks ago'
  },
  {
    id: '4',
    name: 'Medical Imaging',
    type: 'Image',
    size: '1.2 GB',
    records: '15,000',
    lastModified: '3 weeks ago'
  }
];

const Datasets: React.FC = () => {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-background dark">
        <Sidebar />
        <SidebarRail />
        
        <SidebarInset>
          <Topbar projectName="Datasets" />
          
          <div className="p-6 overflow-auto h-[calc(100vh-32px)]">
            <div className="mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold">Datasets</h1>
                  <p className="text-muted-foreground">Manage your training and test datasets</p>
                </div>
                <div className="flex gap-3 mt-4 md:mt-0">
                  <Button className="animate-pulse-blue">
                    <Plus className="mr-2 h-4 w-4" />
                    New Dataset
                  </Button>
                  <Button variant="outline">
                    <FileText className="mr-2 h-4 w-4" />
                    Import Data
                  </Button>
                </div>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Records</TableHead>
                      <TableHead>Last Modified</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {datasets.map((dataset) => (
                      <TableRow key={dataset.id}>
                        <TableCell className="font-medium flex items-center gap-2">
                          <Database className="h-4 w-4 text-primary" />
                          {dataset.name}
                        </TableCell>
                        <TableCell>{dataset.type}</TableCell>
                        <TableCell>{dataset.size}</TableCell>
                        <TableCell>{dataset.records}</TableCell>
                        <TableCell>{dataset.lastModified}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">View</Button>
                          <Button variant="ghost" size="sm">Edit</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Datasets;
