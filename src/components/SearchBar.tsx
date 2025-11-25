import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useState } from 'react';

export default function SearchBar() {
  const [search, setSearch] = useState('');

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <Icon 
          name="Search" 
          size={20} 
          className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          type="text"
          placeholder="Найти маршрут или остановку..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-12 pr-24 h-14 text-lg rounded-xl border-2 focus:border-primary"
        />
        <Button 
          size="lg" 
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg"
        >
          Поиск
        </Button>
      </div>
      
      <div className="flex flex-wrap gap-2 mt-4">
        <Button variant="outline" size="sm" className="rounded-full">
          <Icon name="TrendingUp" size={14} className="mr-1" />
          Популярные
        </Button>
        <Button variant="outline" size="sm" className="rounded-full">
          <Icon name="Zap" size={14} className="mr-1" />
          Экспресс
        </Button>
        <Button variant="outline" size="sm" className="rounded-full">
          <Icon name="MapPin" size={14} className="mr-1" />
          Рядом со мной
        </Button>
      </div>
    </div>
  );
}
