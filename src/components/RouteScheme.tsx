import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Stop {
  id: number;
  name: string;
  time?: string;
}

interface RouteSchemeProps {
  stops: Stop[];
  routeNumber: string;
  routeColor?: string;
}

export default function RouteScheme({ stops, routeNumber, routeColor = '#0EA5E9' }: RouteSchemeProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-lg font-bold"
          style={{ backgroundColor: routeColor }}
        >
          {routeNumber}
        </div>
        <div>
          <h3 className="text-xl font-semibold">Схема маршрута</h3>
          <p className="text-sm text-muted-foreground">Остановок: {stops.length}</p>
        </div>
      </div>

      <div className="relative">
        <div 
          className="absolute left-6 top-0 bottom-0 w-1 rounded-full"
          style={{ backgroundColor: routeColor, opacity: 0.3 }}
        />

        <div className="space-y-4">
          {stops.map((stop, index) => (
            <div key={stop.id} className="relative flex items-start gap-4 group">
              <div 
                className="relative z-10 w-12 h-12 rounded-full border-4 border-background flex items-center justify-center transition-all group-hover:scale-110"
                style={{ backgroundColor: routeColor }}
              >
                {index === 0 ? (
                  <Icon name="CircleDot" size={20} className="text-white" />
                ) : index === stops.length - 1 ? (
                  <Icon name="MapPin" size={20} className="text-white" />
                ) : (
                  <div className="w-3 h-3 bg-white rounded-full" />
                )}
              </div>

              <div className="flex-1 pt-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-base group-hover:text-primary transition-colors">
                      {stop.name}
                    </h4>
                    {stop.time && (
                      <p className="text-sm text-muted-foreground mt-1">
                        <Icon name="Clock" size={14} className="inline mr-1" />
                        {stop.time}
                      </p>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                    #{index + 1}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
