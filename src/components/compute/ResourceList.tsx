
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ResourceCard from './ResourceCard';
import { ComputeResource } from '@/types/compute';

interface ResourceListProps {
  resources: ComputeResource[];
  selectedResource: string;
  onSelectResource: (id: string) => void;
}

const ResourceList: React.FC<ResourceListProps> = ({ resources, selectedResource, onSelectResource }) => {
  return (
    <Card className="border-border/40 bg-card shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Available Resources</CardTitle>
        <CardDescription>
          Select from our high-performance compute instances
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4">
          {resources.map((res) => (
            <ResourceCard 
              key={res.id}
              resource={res}
              isSelected={selectedResource === res.id}
              onSelect={onSelectResource}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ResourceList;
