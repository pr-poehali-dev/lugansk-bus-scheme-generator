import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function MapView() {
  const routes = [
    { id: 1, number: '1', color: '#0EA5E9', stops: 25 },
    { id: 2, number: '5', color: '#10B981', stops: 18 },
    { id: 3, number: '12', color: '#F59E0B', stops: 22 },
    { id: 4, number: '23', color: '#EF4444', stops: 16 },
  ];

  return (
    <div className="relative w-full h-[600px] bg-muted rounded-2xl overflow-hidden border">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-muted flex items-center justify-center">
        <div className="relative w-full h-full max-w-5xl mx-auto p-8">
          <svg className="w-full h-full" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            <path d="M 100 300 Q 200 200 400 250 T 700 300" 
                  stroke="#0EA5E9" 
                  strokeWidth="4" 
                  fill="none" 
                  strokeLinecap="round"
                  opacity="0.8"
                  filter="url(#glow)">
              <animate attributeName="stroke-dasharray" from="0,1000" to="1000,0" dur="3s" repeatCount="indefinite"/>
            </path>
            
            <path d="M 150 450 Q 300 400 500 420 T 750 450" 
                  stroke="#10B981" 
                  strokeWidth="4" 
                  fill="none" 
                  strokeLinecap="round"
                  opacity="0.8"
                  filter="url(#glow)">
              <animate attributeName="stroke-dasharray" from="0,1000" to="1000,0" dur="3.5s" repeatCount="indefinite"/>
            </path>
            
            <path d="M 100 150 Q 250 100 450 150 T 700 200" 
                  stroke="#F59E0B" 
                  strokeWidth="4" 
                  fill="none" 
                  strokeLinecap="round"
                  opacity="0.8"
                  filter="url(#glow)">
              <animate attributeName="stroke-dasharray" from="0,1000" to="1000,0" dur="4s" repeatCount="indefinite"/>
            </path>
            
            <circle cx="200" cy="250" r="8" fill="#0EA5E9" opacity="0.9"/>
            <circle cx="400" cy="250" r="8" fill="#0EA5E9" opacity="0.9"/>
            <circle cx="600" cy="280" r="8" fill="#0EA5E9" opacity="0.9"/>
            
            <circle cx="300" cy="420" r="8" fill="#10B981" opacity="0.9"/>
            <circle cx="500" cy="420" r="8" fill="#10B981" opacity="0.9"/>
            
            <circle cx="250" cy="130" r="8" fill="#F59E0B" opacity="0.9"/>
            <circle cx="450" cy="150" r="8" fill="#F59E0B" opacity="0.9"/>
          </svg>
        </div>
      </div>

      <div className="absolute top-4 left-4 right-4 flex gap-4">
        <Card className="p-4 bg-card/95 backdrop-blur-sm">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <Icon name="Layers" size={18} />
            Активные маршруты
          </h3>
          <div className="space-y-2">
            {routes.map(route => (
              <div key={route.id} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: route.color }}
                />
                <Badge variant="outline" className="text-xs">№ {route.number}</Badge>
                <span className="text-xs text-muted-foreground">{route.stops} ост.</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <Button size="icon" className="bg-card hover:bg-card/90 text-foreground shadow-lg">
          <Icon name="Plus" size={20} />
        </Button>
        <Button size="icon" className="bg-card hover:bg-card/90 text-foreground shadow-lg">
          <Icon name="Minus" size={20} />
        </Button>
        <Button size="icon" className="bg-card hover:bg-card/90 text-foreground shadow-lg">
          <Icon name="Locate" size={20} />
        </Button>
      </div>
    </div>
  );
}
