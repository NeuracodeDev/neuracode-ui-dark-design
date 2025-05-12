
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
    <Card className="border-border/40 bg-card hover:border-primary/30 transition-all duration-300 overflow-hidden shadow-md hover:shadow-lg h-[160px] flex flex-col hover:translate-y-[-2px]">
      <div className="h-1 bg-primary/80 w-full"></div>
      <CardContent className="p-4 flex flex-col flex-grow justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2.5">
            <div className="text-primary p-1.5 rounded-md bg-primary/10">
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
                  className="text-xs gap-1 h-7 px-2 hover:bg-primary/15 hover:text-primary btn-ripple group" 
                  onClick={onClick}
                >
                  Start
                  <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
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
