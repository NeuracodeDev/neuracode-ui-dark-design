
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { ComputeResource } from '@/types/compute';

interface ResourceCardProps {
  resource: ComputeResource;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export const getAvailabilityColor = (availability: "high" | "medium" | "low") => {
  switch (availability) {
    case "high": return "bg-green-500";
    case "medium": return "bg-yellow-500";
    case "low": return "bg-red-500";
    default: return "bg-gray-500";
  }
};

const ResourceCard: React.FC<ResourceCardProps> = ({ resource, isSelected, onSelect }) => {
  return (
    <div 
      className={`rounded-lg border p-4 cursor-pointer transition-all duration-200 ${isSelected ? 'border-primary bg-secondary/30 shadow-md' : 'border-border hover:border-primary/30 hover:bg-secondary/10'}`}
      onClick={() => onSelect(resource.id)}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex gap-3 items-center">
          <div className={`h-3 w-3 rounded-full ${getAvailabilityColor(resource.availability)}`} />
          <h3 className="font-medium">{resource.name}</h3>
        </div>
        <Badge variant={isSelected ? "default" : "outline"}>
          {isSelected ? "Selected" : "Select"}
        </Badge>
      </div>
      
      <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
        <div>
          <p className="text-muted-foreground">GPU</p>
          <p className="font-medium">{resource.gpuCount}x {resource.gpuType}</p>
        </div>
        <div>
          <p className="text-muted-foreground">CPU</p>
          <p className="font-medium">{resource.cpuCores} Cores</p>
        </div>
        <div>
          <p className="text-muted-foreground">Memory</p>
          <p className="font-medium">{resource.memory}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Storage</p>
          <p className="font-medium">{resource.storage}</p>
        </div>
      </div>
      
      <div className="mt-3 flex justify-between items-center">
        <div className="text-primary font-medium">
          ${resource.hourlyPrice}/hr | ${resource.monthlyPrice}/mo
        </div>
        <div className="text-xs text-muted-foreground">
          Location: {resource.location}
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;
