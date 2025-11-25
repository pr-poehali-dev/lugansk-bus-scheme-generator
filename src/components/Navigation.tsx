import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function Navigation() {
  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Bus" size={24} className="text-white" />
            </div>
            <span className="text-xl font-bold">Транспорт ЛНР</span>
          </div>

          <div className="hidden md:flex items-center gap-1">
            <Button variant="ghost" className="gap-2">
              <Icon name="Home" size={18} />
              Главная
            </Button>
            <Button variant="ghost" className="gap-2">
              <Icon name="Route" size={18} />
              Маршруты
            </Button>
            <Button variant="ghost" className="gap-2">
              <Icon name="Map" size={18} />
              Карта
            </Button>
            <Button variant="ghost" className="gap-2">
              <Icon name="Search" size={18} />
              Поиск
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="md:hidden">
              <Icon name="Menu" size={20} />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
