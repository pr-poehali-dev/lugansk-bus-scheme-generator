import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

interface Stop {
  id: number;
  name: string;
  time?: string;
}

interface RouteEditorProps {
  routeNumber: string;
  routeName: string;
  stops: Stop[];
  onSave: (data: { routeName: string; stops: Stop[] }) => void;
}

export default function RouteEditor({ routeNumber, routeName, stops, onSave }: RouteEditorProps) {
  const [editedName, setEditedName] = useState(routeName);
  const [editedStops, setEditedStops] = useState<Stop[]>(stops);
  const [isEditing, setIsEditing] = useState(false);

  const handleAddStop = () => {
    const newStop: Stop = {
      id: Date.now(),
      name: 'Новая остановка',
      time: ''
    };
    setEditedStops([...editedStops, newStop]);
  };

  const handleUpdateStop = (id: number, field: 'name' | 'time', value: string) => {
    setEditedStops(editedStops.map(stop => 
      stop.id === id ? { ...stop, [field]: value } : stop
    ));
  };

  const handleDeleteStop = (id: number) => {
    setEditedStops(editedStops.filter(stop => stop.id !== id));
  };

  const handleSave = () => {
    onSave({ routeName: editedName, stops: editedStops });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedName(routeName);
    setEditedStops(stops);
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white text-lg font-bold">
              {routeNumber}
            </div>
            <div>
              <CardTitle>Редактор маршрута</CardTitle>
              <Badge variant="outline" className="mt-1">
                {isEditing ? 'Режим редактирования' : 'Просмотр'}
              </Badge>
            </div>
          </div>
          {!isEditing && (
            <Button onClick={() => setIsEditing(true)} className="gap-2">
              <Icon name="Edit" size={18} />
              Редактировать
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="route-name">Название маршрута</Label>
          <Input
            id="route-name"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            disabled={!isEditing}
            className="text-lg font-medium"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Остановки ({editedStops.length})</Label>
            {isEditing && (
              <Button onClick={handleAddStop} size="sm" variant="outline" className="gap-2">
                <Icon name="Plus" size={16} />
                Добавить остановку
              </Button>
            )}
          </div>

          <div className="space-y-3 max-h-[500px] overflow-y-auto">
            {editedStops.map((stop, index) => (
              <div key={stop.id} className="flex items-start gap-3 p-3 border rounded-lg bg-card hover:bg-muted/50 transition-colors">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-semibold text-primary">
                  {index + 1}
                </div>
                
                <div className="flex-1 space-y-2">
                  <Input
                    value={stop.name}
                    onChange={(e) => handleUpdateStop(stop.id, 'name', e.target.value)}
                    disabled={!isEditing}
                    placeholder="Название остановки"
                    className="font-medium"
                  />
                  <Input
                    value={stop.time || ''}
                    onChange={(e) => handleUpdateStop(stop.id, 'time', e.target.value)}
                    disabled={!isEditing}
                    placeholder="Время (например: 5 мин)"
                    className="text-sm"
                  />
                </div>

                {isEditing && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteStop(stop.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Icon name="Trash2" size={18} />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        {isEditing && (
          <div className="flex items-center gap-3 pt-4 border-t">
            <Button onClick={handleSave} className="flex-1 gap-2">
              <Icon name="Save" size={18} />
              Сохранить изменения
            </Button>
            <Button onClick={handleCancel} variant="outline" className="flex-1 gap-2">
              <Icon name="X" size={18} />
              Отменить
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
