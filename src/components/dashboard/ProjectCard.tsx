
import React from 'react';
import { Clock, FileCode2, GitBranch } from 'lucide-react';
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
    <Card className="overflow-hidden hover:border-primary/30 transition-all duration-200 bg-card/80">
      <CardContent className="p-0">
        <div className="h-1 bg-primary w-full opacity-80" />
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium text-sm truncate">{name}</h3>
            <GitBranch className="h-3.5 w-3.5 text-muted-foreground" />
          </div>
          
          <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2 h-10">{description}</p>
          
          <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>Updated {updatedAt}</span>
          </div>
          
          <div className="flex items-center gap-2 mt-1 text-xs">
            <FileCode2 className="h-3 w-3 text-primary/70" />
            <span>{language}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-3 pt-0 flex justify-end border-t border-border/30 mt-2">
        <Button size="sm" variant="secondary" onClick={onClick} className="h-7 text-xs">Open</Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
