
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const SupportCard: React.FC = () => {
  return (
    <Card className="border-border/40 bg-card shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center">
          <Info className="h-4 w-4 mr-2 text-primary" />
          Need Help?
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-xs text-muted-foreground mb-4">
          Our team can help you configure the optimal compute resources for your specific workload.
        </p>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full text-xs"
          onClick={() => {
            toast({
              title: "Support Request Sent",
              description: "Our team will contact you shortly."
            });
          }}
        >
          Contact Support
        </Button>
      </CardContent>
    </Card>
  );
};

export default SupportCard;
