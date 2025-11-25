import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-primary/10 via-background to-background py-20 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Icon name="Bus" size={16} />
            <span>Транспортная схема Луганска</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            Найди свой маршрут<br />
            <span className="text-primary">за секунды</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Интерактивная карта автобусных маршрутов города Луганска. Быстрый поиск, актуальная информация, удобная навигация.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="text-lg px-8 gap-2 hover:scale-105 transition-transform">
              <Icon name="Search" size={20} />
              Найти маршрут
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 gap-2 hover:scale-105 transition-transform">
              <Icon name="Map" size={20} />
              Открыть карту
            </Button>
          </div>
        </div>
        
        <div className="mt-16 grid md:grid-cols-3 gap-6 animate-slide-up">
          <div className="bg-card p-6 rounded-xl border shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Icon name="Route" size={24} className="text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">50+ маршрутов</h3>
            <p className="text-muted-foreground">Полная база автобусных маршрутов города</p>
          </div>
          
          <div className="bg-card p-6 rounded-xl border shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Icon name="MapPin" size={24} className="text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">300+ остановок</h3>
            <p className="text-muted-foreground">Все остановки с точными координатами</p>
          </div>
          
          <div className="bg-card p-6 rounded-xl border shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Icon name="Clock" size={24} className="text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">24/7 доступ</h3>
            <p className="text-muted-foreground">Информация доступна в любое время</p>
          </div>
        </div>
      </div>
    </section>
  );
}
