import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

interface RouteCardProps {
  number: string;
  name: string;
  stops: number;
  duration: string;
  type: 'express' | 'regular';
}

export default function RouteCard({ number, name, stops, duration, type }: RouteCardProps) {
  const navigate = useNavigate();

  return (
    <Card 
      className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer"
      onClick={() => navigate(`/route/${number}`)}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center text-white text-xl font-bold">
              {number}
            </div>
            <div>
              <CardTitle className="text-lg mb-1">{name}</CardTitle>
              <Badge variant={type === 'express' ? 'default' : 'secondary'} className="text-xs">
                {type === 'express' ? 'Экспресс' : 'Обычный'}
              </Badge>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="hover:bg-primary/10">
            <Icon name="ChevronRight" size={20} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Icon name="MapPin" size={16} />
            <span>{stops} остановок</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="Clock" size={16} />
            <span>{duration}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}