
import React from 'react';
import { Plus, Database, FileText, ArrowUpDown } from 'lucide-react';
import { SidebarProvider, SidebarInset, SidebarRail } from '@/components/ui/sidebar';
import Sidebar from '@/components/dashboard/Sidebar';
import Topbar from '@/components/dashboard/Topbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

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
  const navigate = useNavigate();

  const handleNewDataset = () => {
    toast({
      title: "New Dataset",
      description: "Creating a new dataset",
    });
    // Here you would navigate to create dataset page or open a modal
  };

  const handleImportData = () => {
    toast({
      title: "Import Data",
      description: "Opening data import wizard",
    });
    // Here you would navigate to import page or open a modal
  };

  const handleViewDataset = (id: string, name: string) => {
    toast({
      title: "Dataset Selected",
      description: `Opening ${name} dataset for viewing`,
    });
    // Here you would navigate to dataset details page
  };

  const handleEditDataset = (id: string, name: string) => {
    toast({
      title: "Edit Dataset",
      description: `Preparing to edit ${name} dataset`,
    });
    // Here you would navigate to dataset edit page
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-background dark">
        <Sidebar />
        <SidebarRail />
        
        <SidebarInset>
          <Topbar projectName="Datasets" />
          
          <div className="p-8 overflow-auto h-[calc(100vh-32px)] scrollbar-thin">
            <div className="mb-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-semibold tracking-tight mb-2">Datasets</h1>
                  <p className="text-muted-foreground">Manage your training and test datasets</p>
                </div>
                <div className="flex gap-3 mt-4 md:mt-0">
                  <Button 
                    className="shadow-sm hover:shadow-md transition-shadow btn-ripple"
                    onClick={handleNewDataset}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    New Dataset
                  </Button>
                  <Button 
                    variant="outline" 
                    className="hover:border-primary/30 hover:text-primary transition-colors"
                    onClick={handleImportData}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Import Data
                  </Button>
                </div>
              </div>
            </div>

            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-secondary/20">
                      <TableHead className="font-medium">Name</TableHead>
                      <TableHead className="font-medium">Type</TableHead>
                      <TableHead className="font-medium">Size</TableHead>
                      <TableHead className="font-medium">Records</TableHead>
                      <TableHead className="font-medium">Last Modified</TableHead>
                      <TableHead className="text-right font-medium">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {datasets.map((dataset) => (
                      <TableRow 
                        key={dataset.id} 
                        className="hover:bg-secondary/20 cursor-pointer transition-colors"
                        onClick={() => handleViewDataset(dataset.id, dataset.name)}
                      >
                        <TableCell className="font-medium flex items-center gap-2">
                          <Database className="h-4 w-4 text-primary" />
                          {dataset.name}
                        </TableCell>
                        <TableCell>{dataset.type}</TableCell>
                        <TableCell>{dataset.size}</TableCell>
                        <TableCell>{dataset.records}</TableCell>
                        <TableCell>{dataset.lastModified}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost" 
                            size="sm"
                            className="hover:bg-primary/10 hover:text-primary"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewDataset(dataset.id, dataset.name);
                            }}
                          >
                            View
                          </Button>
                          <Button
                            variant="ghost" 
                            size="sm"
                            className="hover:bg-primary/10 hover:text-primary"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditDataset(dataset.id, dataset.name);
                            }}
                          >
                            Edit
                          </Button>
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
