
import React from 'react';
import { Clock, FileCode2 } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ProjectCardProps {
  name: string;
  description: string;
  updatedAt: string;
  language: string;
  onClick?: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  name,
  description,
  updatedAt,
  language,
  onClick
}) => {
  return (
    <Card className="overflow-hidden hover:neon-border transition-all">
      <CardContent className="p-0">
        <div className="h-1 bg-primary w-full opacity-80" />
        <div className="p-4">
          <h3 className="font-semibold text-lg truncate">{name}</h3>
          <p className="text-muted-foreground text-sm line-clamp-2 h-10">{description}</p>
          
          <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>Updated {updatedAt}</span>
          </div>
          
          <div className="flex items-center gap-2 mt-1 text-xs">
            <FileCode2 className="h-3 w-3" />
            <span>{language}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-end">
        <Button size="sm" onClick={onClick}>Open</Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
