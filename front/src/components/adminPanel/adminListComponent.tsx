'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import GoogleMaps from '../GoogleMaps';

export type ItemType = 'event' | 'user' | 'post';

export interface Item {
  id: string;
  title: string;
  description: string;
  isActive?: boolean;
  avatarUrl?: string;
  image?: string;
  eventDate?: string;
  highlight?: boolean;
  stock?: string;
  price?: string;
  eventLocation?: string;
  eventAdress?: string;
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
      default:
        return '';
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

  const handleLocationChange = (newLocation: string) => {
    if (editingEvent) {
      setEditingEvent({ ...editingEvent, eventLocation: newLocation });
    }
  };

  return (
    <div className="flex max-h-[calc(200vh-200px)] overflow-hidden">
      <Card className="w-full max-w-5xl mx-auto flex">
        <div className="w-1/3 border-r">
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
        <div className="w-2/3 p-4">
          {selectedItem && !editingEvent && (
            <div>
              <h2 className="text-xl font-bold">{selectedItem.title}</h2>
              <p>{selectedItem.description}</p>
              <Button onClick={handleToggleAction}>
                {getToggleLabel(selectedItem.isActive || false)}
              </Button>
              {type === 'event' && (
                <div className="mt-4">
                  <h3 className="text-lg">Detalles del Evento</h3>
                  <p>Fecha: {selectedItem.eventDate}</p>
                  <p>Dirección: {selectedItem.eventAdress}</p>
                  <p>Precio: {selectedItem.price}</p>
                  <p>Capacidad: {selectedItem.stock}</p>

                  <Button className="mt-2" onClick={handleEditEvent}>
                    Editar Evento
                  </Button>
                </div>
              )}
            </div>
          )}

          {editingEvent && (
            <div className="space-y-4 p-6">
              <label className="mt-4">Título</label>
              <Input
                value={editingEvent.title}
                onChange={(e) =>
                  setEditingEvent({ ...editingEvent, title: e.target.value })
                }
                placeholder="Título"
              />
              <label>Descripción</label>
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
              <label className="pt-4">Fecha</label>
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
              <label>Capacidad de asistentes</label>
              <Input
                value={editingEvent.stock}
                onChange={(e) =>
                  setEditingEvent({
                    ...editingEvent,
                    stock: e.target.value,
                  })
                }
                placeholder="Capacidad de asistentes"
                type="number"
              />
              <label>Costo del evento</label>
              <Input
                value={editingEvent.price}
                onChange={(e) =>
                  setEditingEvent({
                    ...editingEvent,
                    price: e.target.value,
                  })
                }
                placeholder="Costo del evento"
                type="number"
              />
              <label>Dirección del Evento</label>
              <Input
                value={editingEvent.eventAdress}
                onChange={(e) =>
                  setEditingEvent({
                    ...editingEvent,
                    eventAdress: e.target.value,
                  })
                }
                placeholder="Dirección del evento"
              />

              <label className="m-2">Link de la ubicación en Google</label>
              <Input
                value={editingEvent.eventLocation}
                onChange={(e) =>
                  setEditingEvent({
                    ...editingEvent,
                    eventLocation: e.target.value,
                  })
                }
                placeholder="Link de ubicación en Google"
              />

              <div className="mt-4">
                <GoogleMaps setEventLocation={handleLocationChange} />
              </div>

              <div className="flex space-x-2 mt-4">
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
