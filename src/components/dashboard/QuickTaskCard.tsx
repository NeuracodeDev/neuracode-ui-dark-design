
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface QuickTaskCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  onClick?: () => void;
}

const QuickTaskCard: React.FC<QuickTaskCardProps> = ({
  title,
  icon,
  description,
  onClick
}) => {
  return (
    <Card className="card-hover border border-border/50 overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="text-primary/80">
            {icon}
          </div>
          <h3 className="text-sm font-medium tracking-tight">{title}</h3>
        </div>
        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{description}</p>
        
        <div className="flex justify-end">
          <Button variant="ghost" size="sm" className="text-xs gap-1 h-7 px-2" onClick={onClick}>
            Start
            <ArrowRight className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickTaskCard;
