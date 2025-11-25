import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import SearchBar from '@/components/SearchBar';
import RouteCard from '@/components/RouteCard';
import MapView from '@/components/MapView';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { fetchRoutes, Route } from '@/lib/api';

const Index = () => {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRoutes() {
      try {
        const data = await fetchRoutes();
        setRoutes(data);
      } catch (error) {
        console.error('Failed to load routes:', error);
      } finally {
        setLoading(false);
      }
    }
    loadRoutes();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <Hero />

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <Tabs defaultValue="routes" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
              <TabsTrigger value="routes" className="gap-2">
                <Icon name="List" size={16} />
                Маршруты
              </TabsTrigger>
              <TabsTrigger value="map" className="gap-2">
                <Icon name="Map" size={16} />
                Карта
              </TabsTrigger>
              <TabsTrigger value="search" className="gap-2">
                <Icon name="Search" size={16} />
                Поиск
              </TabsTrigger>
            </TabsList>

            <TabsContent value="routes" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Все маршруты</h2>
                <p className="text-muted-foreground">Выберите нужный автобус для просмотра деталей</p>
              </div>

              {loading ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Загрузка маршрутов...</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {routes.map(route => (
                    <RouteCard 
                      key={route.number} 
                      number={route.number}
                      name={route.name}
                      stops={route.stops || 0}
                      duration={route.duration || 'N/A'}
                      type={route.type as 'express' | 'regular'}
                    />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="map" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Интерактивная карта</h2>
                <p className="text-muted-foreground">Визуализация всех маршрутов на карте города</p>
              </div>

              <MapView />
            </TabsContent>

            <TabsContent value="search" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Поиск маршрута</h2>
                <p className="text-muted-foreground">Найдите нужный маршрут или остановку</p>
              </div>

              <SearchBar />

              <div className="mt-12">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Icon name="TrendingUp" size={20} />
                  Популярные маршруты
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {routes.slice(0, 4).map(route => (
                    <RouteCard key={route.number} {...route} />
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <footer className="bg-muted py-12 px-4 mt-20">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Bus" size={18} className="text-white" />
                </div>
                <span className="font-bold text-lg">Транспорт ЛНР</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Интерактивная транспортная схема города Луганска
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Разделы</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Главная</li>
                <li>Маршруты</li>
                <li>Карта</li>
                <li>Поиск</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <p className="text-sm text-muted-foreground">
                Информация обновляется регулярно
              </p>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2025 Транспорт ЛНР. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;