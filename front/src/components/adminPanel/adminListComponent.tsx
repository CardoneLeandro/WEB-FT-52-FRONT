'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';

export type ItemType = 'event' | 'user' | 'post';

export interface Item {
  id: string;
  title: string;
  description: string;
  isActive?: boolean;
  avatarUrl?: string;
  image?: string;
  eventDate?: string;
  eventLocation?: string;
  stock?: number;
  cost?: number;
  highlight: boolean;
}

interface AdminListComponentProps {
  type: ItemType;
  items: Item[];
  onToggleAction: (item: Item) => void;
  getToggleLabel: (isActive: boolean) => string;
  onUpdateEvent?: (updatedEvent: Item) => void;
}

export default function AdminListComponent({
  type,
  items,
  onToggleAction,
  getToggleLabel,
  onUpdateEvent,
}: AdminListComponentProps) {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [editingEvent, setEditingEvent] = useState<Item | null>(null);

  const getTitle = (): string => {
    switch (type) {
      case 'event':
        return 'Eventos';
      case 'user':
        return 'Usuarios';
      case 'post':
        return 'Donaciones';
    }
  };

  const handleToggleAction = () => {
    if (selectedItem) {
      onToggleAction(selectedItem);
      setSelectedItem({
        ...selectedItem,
        isActive: !selectedItem.isActive,
      });
    }
  };

  const handleEditEvent = () => {
    if (selectedItem && type === 'event') {
      setEditingEvent({ ...selectedItem });
    }
  };

  const handleUpdateEvent = () => {
    if (editingEvent && onUpdateEvent) {
      onUpdateEvent(editingEvent);
      setSelectedItem(editingEvent);
      setEditingEvent(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingEvent(null);
  };

  return (
    <div className="flex max-h-[calc(100vh-100px)] overflow-hidden">
      <Card className="w-full max-w-4xl mx-auto flex">
        <div className="w-1/2 border-r">
          <CardHeader>
            <CardTitle>{getTitle()}</CardTitle>
          </CardHeader>
          <CardContent className="overflow-y-auto max-h-[calc(90vh-200px)]">
            <div className="space-y-2">
              {items.length === 0 ? (
                <p className="text-center text-gray-500">
                  No hay {getTitle()} disponibles.
                </p>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className={`p-4 cursor-pointer hover:bg-gray-100 rounded-lg ${
                      selectedItem?.id === item.id ? 'bg-gray-200' : ''
                    }`}
                    onClick={() => setSelectedItem(item)}
                  >
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </div>
        <div className="w-1/2 p-4">
          {selectedItem && !editingEvent && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                {type === 'event' ? (
                  <img
                    className="w-16 h-16 object-cover rounded-full"
                    src={selectedItem.image || '/default-event-image.jpg'}
                    alt={selectedItem.title}
                  />
                ) : (
                  <Avatar className="w-16 h-16">
                    <AvatarImage
                      src={selectedItem.avatarUrl}
                      alt={selectedItem.title}
                    />
                    <AvatarFallback>
                      {selectedItem.title.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                )}
                <div>
                  <h2 className="text-xl font-bold">{selectedItem.title}</h2>
                  <p className="text-gray-500">{selectedItem.description}</p>
                  {type === 'event' && (
                    <>
                      <p className="text-sm text-gray-500">
                        Fecha: {selectedItem.eventDate}
                      </p>
                      <p className="text-sm text-gray-500">
                        Ubicación: {selectedItem.eventLocation}
                      </p>
                    </>
                  )}
                </div>
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleToggleAction}>
                  {getToggleLabel(selectedItem.isActive || false)}
                </Button>
                {type === 'event' && (
                  <Button onClick={handleEditEvent}>Editar</Button>
                )}
              </div>
            </div>
          )}
          {editingEvent && (
            <div className="space-y-4">
              <Input
                value={editingEvent.title}
                onChange={(e) =>
                  setEditingEvent({ ...editingEvent, title: e.target.value })
                }
                placeholder="Título"
              />
              <Input
                value={editingEvent.description}
                onChange={(e) =>
                  setEditingEvent({
                    ...editingEvent,
                    description: e.target.value,
                  })
                }
                placeholder="Descripción"
              />
              <Input
                value={editingEvent.eventDate}
                onChange={(e) =>
                  setEditingEvent({
                    ...editingEvent,
                    eventDate: e.target.value,
                  })
                }
                placeholder="Fecha del evento"
                type="date"
              />
              <Input
                value={editingEvent.eventLocation}
                onChange={(e) =>
                  setEditingEvent({
                    ...editingEvent,
                    eventLocation: e.target.value,
                  })
                }
                placeholder="Ubicación del evento"
              />
              <Input
                value={editingEvent.stock || ''}
                onChange={(e) =>
                  setEditingEvent({
                    ...editingEvent,
                    stock: parseInt(e.target.value, 10),
                  })
                }
                placeholder="Stock disponible"
                type="number"
              />
              <Input
                value={editingEvent.cost || ''}
                onChange={(e) =>
                  setEditingEvent({
                    ...editingEvent,
                    cost: parseFloat(e.target.value),
                  })
                }
                placeholder="Costo del evento"
                type="number"
              />
              <div className="flex space-x-2">
                <Button onClick={handleUpdateEvent}>Guardar cambios</Button>
                <Button variant="outline" onClick={handleCancelEdit}>
                  Cancelar edición
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
