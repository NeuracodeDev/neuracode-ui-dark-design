
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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
    <Card className="border-border/40 bg-card hover:border-primary/30 transition-all duration-200 overflow-hidden shadow-md hover:shadow-lg h-[160px] flex flex-col">
      <div className="h-1 bg-primary/70 w-full"></div>
      <CardContent className="p-4 flex flex-col flex-grow justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2.5">
            <div className="text-primary">
              {icon}
            </div>
            <h3 className="text-sm font-medium">{title}</h3>
          </div>
          <p className="text-xs text-muted-foreground mb-4 line-clamp-2 leading-relaxed">{description}</p>
        </div>
        
        <div className="flex justify-end">
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs gap-1 h-7 px-2 hover:bg-primary/10 hover:text-primary btn-ripple" 
                  onClick={onClick}
                >
                  Start
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Launch {title}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickTaskCard;
