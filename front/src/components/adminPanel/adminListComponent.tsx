import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import GoogleMaps from '../GoogleMaps';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

export type ItemType = 'event' | 'user' | 'post';

export interface Item {
  id: string;
  title: string;
  description: string;
  status: string;
  avatarUrl?: string;
  image?: string;
  eventDate?: string;
  price?: string;
  eventLocation?: string;
  eventAddress?: string;
  stock?: string;
  highlight: boolean;
}

interface AdminListComponentProps {
  type: ItemType;
  items: Item[];
  onToggleAction: (item: Item) => void;
  onToggleHighlight: (item: Item) => void;
  onUpdateEvent?: (updatedEvent: Item) => void;
}

export default function AdminListComponent({
  type,
  items,
  onToggleAction,
  onToggleHighlight,
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
        status: selectedItem.status === 'banned' ? 'active' : 'banned',
      });
    }
  };

  const handleToggleHighlight = () => {
    if (selectedItem) {
      onToggleHighlight(selectedItem);
      setSelectedItem({
        ...selectedItem,
        highlight: !selectedItem.highlight,
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
                      <p className="text-sm text-gray-500">
                        Dirección: {selectedItem.eventAddress}
                      </p>
                      <p className="text-sm text-gray-500">
                        Precio: {selectedItem.price}
                      </p>
                      <p className="text-sm text-gray-500">
                        Capacidad: {selectedItem.stock}
                      </p>
                    </>
                  )}
                </div>
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleToggleAction}>
                  {selectedItem.status === 'banned' ? 'Activar' : 'Desactivar'}
                </Button>
                {type === 'event' && (
                  <>
                    <Button onClick={handleEditEvent}>Editar</Button>
                    <Button onClick={handleToggleHighlight}>
                      {selectedItem.highlight ? 'No destacar' : 'Destacar'}
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}

          {editingEvent && (
            <div className="space-y-4 p-6">
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
                value={editingEvent.eventDate || ''}
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
              <Input
                value={editingEvent.eventAddress}
                onChange={(e) =>
                  setEditingEvent({
                    ...editingEvent,
                    eventAddress: e.target.value,
                  })
                }
                placeholder="Dirección del evento"
              />
              <Input
                value={editingEvent.eventLocation || ''}
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