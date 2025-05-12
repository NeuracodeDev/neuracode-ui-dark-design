
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
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
    <Card className="overflow-hidden hover:neon-border transition-all">
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="text-primary">
            {icon}
          </div>
          <h3 className="font-medium">{title}</h3>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-end">
        <Button variant="ghost" size="sm" className="gap-1" onClick={onClick}>
          Start
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuickTaskCard;
