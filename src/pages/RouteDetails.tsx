import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import RouteScheme from '@/components/RouteScheme';
import RouteEditor from '@/components/RouteEditor';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Card, CardContent } from '@/components/ui/card';
import { fetchRouteByNumber, updateRoute, RouteDetails as RouteDetailsType, Stop } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

const routesDataFallback: Record<string, { name: string; stops: Stop[]; color: string; type: string }> = {
  '1': {
    name: 'Центр — Жовтневый',
    color: '#0EA5E9',
    type: 'regular',
    stops: [
      { id: 1, name: 'Площадь Героев', time: 'Начало' },
      { id: 2, name: 'Улица Оборонная', time: '3 мин' },
      { id: 3, name: 'Проспект Ленина', time: '7 мин' },
      { id: 4, name: 'ЦУМ', time: '12 мин' },
      { id: 5, name: 'Театр', time: '15 мин' },
      { id: 6, name: 'Парк Горького', time: '20 мин' },
      { id: 7, name: 'Улица Советская', time: '25 мин' },
      { id: 8, name: 'Жовтневый район', time: '45 мин' }
    ]
  },
  '5': {
    name: 'Вокзал — Острая Могила',
    color: '#10B981',
    type: 'express',
    stops: [
      { id: 1, name: 'Автовокзал', time: 'Начало' },
      { id: 2, name: 'Улица Титова', time: '4 мин' },
      { id: 3, name: 'Центральный рынок', time: '10 мин' },
      { id: 4, name: 'Проспект Победы', time: '18 мин' },
      { id: 5, name: 'Острая Могила', time: '35 мин' }
    ]
  },
  '12': {
    name: 'ЦУМ — Артёмовский',
    color: '#F59E0B',
    type: 'regular',
    stops: [
      { id: 1, name: 'ЦУМ', time: 'Начало' },
      { id: 2, name: 'Улица Коцюбинского', time: '5 мин' },
      { id: 3, name: 'Парк Дружбы', time: '12 мин' },
      { id: 4, name: 'Университет', time: '18 мин' },
      { id: 5, name: 'Артёмовский район', time: '40 мин' }
    ]
  }
};

export default function RouteDetails() {
  const { routeNumber } = useParams<{ routeNumber: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [routeData, setRouteData] = useState<RouteDetailsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [routeName, setRouteName] = useState('');
  const [stops, setStops] = useState<Stop[]>([]);

  useEffect(() => {
    async function loadRoute() {
      if (!routeNumber) return;
      
      try {
        const data = await fetchRouteByNumber(routeNumber);
        setRouteData(data);
        setRouteName(data.name);
        setStops(data.stops);
      } catch (error) {
        console.error('Failed to load route:', error);
        const fallback = routesDataFallback[routeNumber];
        if (fallback) {
          setRouteData({
            id: parseInt(routeNumber),
            number: routeNumber,
            ...fallback,
            stops: fallback.stops
          });
          setRouteName(fallback.name);
          setStops(fallback.stops);
        }
      } finally {
        setLoading(false);
      }
    }
    loadRoute();
  }, [routeNumber]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-muted-foreground">Загрузка маршрута...</p>
        </div>
      </div>
    );
  }

  if (!routeData) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Маршрут не найден</h1>
          <Button onClick={() => navigate('/')}>
            <Icon name="ArrowLeft" size={18} className="mr-2" />
            Вернуться на главную
          </Button>
        </div>
      </div>
    );
  }

  const handleSave = async (data: { routeName: string; stops: Stop[] }) => {
    try {
      if (routeNumber && data.routeName !== routeName) {
        await updateRoute(routeNumber, { name: data.routeName });
      }
      setRouteName(data.routeName);
      setStops(data.stops);
      toast({
        title: 'Успешно сохранено',
        description: 'Изменения маршрута сохранены',
      });
    } catch (error) {
      console.error('Failed to save:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось сохранить изменения',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-6 gap-2"
        >
          <Icon name="ArrowLeft" size={18} />
          Назад к маршрутам
        </Button>

        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg"
              style={{ backgroundColor: routeData.color }}
            >
              {routeNumber}
            </div>
            <div>
              <h1 className="text-4xl font-bold">{routeName}</h1>
              <p className="text-muted-foreground mt-1">
                {stops.length} остановок • {routeData.type === 'express' ? 'Экспресс' : 'Обычный маршрут'}
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="MapPin" size={24} className="text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stops.length}</p>
                  <p className="text-sm text-muted-foreground">Остановок</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Clock" size={24} className="text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stops[stops.length - 1]?.time}</p>
                  <p className="text-sm text-muted-foreground">Время в пути</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Route" size={24} className="text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">№{routeNumber}</p>
                  <p className="text-sm text-muted-foreground">Номер маршрута</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="scheme" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="scheme" className="gap-2">
              <Icon name="GitBranch" size={16} />
              Схема маршрута
            </TabsTrigger>
            <TabsTrigger value="editor" className="gap-2">
              <Icon name="Edit" size={16} />
              Редактор
            </TabsTrigger>
          </TabsList>

          <TabsContent value="scheme">
            <RouteScheme 
              stops={stops}
              routeNumber={routeNumber!}
              routeColor={routeData.color}
            />
          </TabsContent>

          <TabsContent value="editor">
            <RouteEditor
              routeNumber={routeNumber!}
              routeName={routeName}
              stops={stops}
              onSave={handleSave}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}