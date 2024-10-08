import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Input } from '@/components/ui/input';
import GoogleMaps from '../GoogleMaps';

export type ItemType = 'event' | 'user' | 'donation';

export interface Item {
  id: string;
  title: string;
  description: string;
  status: string; // 'active' | 'partialactive' | 'pending' | 'banned' | 'inactive' | 'rejected';
  // user => 'active' | 'partialactive' | 'pending' | 'banned' | 'inactive'
  // donations => 'pending' | 'active' | 'rejected'
  // events =>  'active' | 'inactive' 
  role?: string; // 'user' | 'admin' | 'superadmin'
  highlight: boolean; // true | false
  avatarUrl?: string;
  image?: string;
  eventDate?: string;
  price?: string;
  eventLocation?: string;
  eventAddress?: string;
  stock?: string;
  amount?: number;
  email?: string;
  // ===== BORRAR =====
  isActive: boolean;
  isAdmin: boolean;
  // ===== BORRAR =====
}

interface AdminListComponentProps {
  type: ItemType;
  items: Item[];
  onToggleAction: (item: Item) => void;
  onToggleAdminRole?: (item: Item) => void;
  getToggleLabel: (status: string) => string;
  getAdminToggleLabel?: (isAdmin: boolean) => string;
  onUpdateEvent?: (updatedEvent: Item) => void;
  onConfirmPayment?: (id: string) => void;
  onCancelPayment?: (id: string) => void;
  onToggleHighlight: (item: Item) => void;
}


export default function AdminListComponent({
  type,
  items,
  onToggleAction,
  onToggleAdminRole,
  getToggleLabel,
  getAdminToggleLabel,
  onUpdateEvent,
  onConfirmPayment,
  onCancelPayment,
  onToggleHighlight,
}: AdminListComponentProps) {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [editingEvent, setEditingEvent] = useState<Item | null>(null);

  const getTitle = (): string => {
    switch (type) {
      case 'event':
        return 'Eventos';
      case 'user':
        return 'Usuarios';
      case 'donation':
        return 'Donaciones';
      default:
        return '';
    }
  };

  const handleToggleAction = () => {
    if (selectedItem) {
      onToggleAction(selectedItem);
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

  const handleToggleAdminRole = () => {
    if (selectedItem && onToggleAdminRole) {
      onToggleAdminRole(selectedItem);
    }
  };

  const handleConfirmPayment = async () => {
    if (selectedItem && onConfirmPayment) {
      try {
        await onConfirmPayment(selectedItem.id);
        setSelectedItem({ ...selectedItem, status: 'accepted' });
      } catch (error) {
        console.error('Error confirming payment:', error);
      }
    }
  };

  const handleCancelPayment = async () => {
    if (selectedItem && onCancelPayment) {
      try {
        await onCancelPayment(selectedItem.id);
        setSelectedItem({ ...selectedItem, status: 'pending' });
      } catch (error) {
        console.error('Error canceling payment:', error);
      }
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
          {selectedItem && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage
                    src={selectedItem.avatarUrl}
                    alt={selectedItem.title}
                  />
                  <AvatarFallback>
                    {selectedItem.title.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-bold">{selectedItem.title}</h2>
                  <p className="text-gray-500">{selectedItem.description}</p>
                  {type === 'donation' && (
                    <>
                      <p className="text-sm text-gray-500">
                        Email: {selectedItem.email}
                      </p>
                      <p className="text-sm text-gray-500">
                        Monto: ${selectedItem.amount}
                      </p>
                      <p className="text-sm text-gray-500">
                        Estado:{' '}
                        {selectedItem.status === 'accepted'
                          ? 'Aceptada'
                          : 'Pendiente'}
                      </p>
                    </>
                  )}
                </div>
              </div>
              <div className="flex space-x-2">
                {type === 'donation' && selectedItem.status === 'pending' && (
                  <>
                    <Button onClick={handleConfirmPayment} variant="default">
                      Confirmar Pago
                    </Button>
                    <Button onClick={handleCancelPayment} variant="destructive">
                      Cancelar Pago
                    </Button>
                  </>
                )}
                {type !== 'donation' && (
                  <Button
                    onClick={handleToggleAction}
                    variant={selectedItem.isActive ? 'destructive' : 'default'}
                  >
                    {getToggleLabel(selectedItem.status)}
                  </Button>
                )}
                {type === 'user' &&
                  onToggleAdminRole &&
                  getAdminToggleLabel && (
                    <Button
                      onClick={handleToggleAdminRole}
                      variant={selectedItem.isAdmin ? 'destructive' : 'default'}
                    >
                      {getAdminToggleLabel(selectedItem.isAdmin)}
                    </Button>
                  )}
                <Button onClick={handleToggleAction}>
                  {selectedItem.status === 'banned' ? 'Activar' : 'Desactivar'}
                </Button>
                {type === 'event' && (
                  <>
                    <Button onClick={}>Editar</Button>
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