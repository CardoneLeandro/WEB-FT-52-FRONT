'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import GoogleMaps from '@/components/GoogleMaps';

interface Event {
  id: string;
  title: string;
  description: string;
  eventDate: string;
  eventAddress: string;
  eventLocation: string;
  price: number;
  stock: number;
  highlight: boolean;
  images: string[];
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { adminEvents, setEvent, setAdminEvent, userSession, token } =
    useAuth();
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  const getEvents = async () => {
    try {
      const response = await fetch('http://localhost:3003/events');
      if (!response.ok) {
        throw new Error('Error fetching events');
      }
      const data = await response.json();
      setEvents(data.events);
    } catch (err) {
      setError('No se pudieron cargar los eventos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  const handleToggleHighlight = async (id: string) => {
    try {
      const response = await fetch(
        `http://localhost:3003/auth/events/highlight/${id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error('Error updating highlight status');
      }

      const updatedEvent = await response.json();

      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === updatedEvent.id
            ? { ...event, highlight: updatedEvent.highlight }
            : event,
        ),
      );

      setEvent(updatedEvent);
      setAdminEvent(updatedEvent);
    } catch (err) {
      setError('No se pudo actualizar el estado de destacar.');
    }
  };

  const handleUpdateEvent = async (updatedEvent: Event) => {
    try {
      const response = await fetch(
        `http://localhost:3003/auth/events/edit/${updatedEvent.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedEvent),
        },
      );
      if (!response.ok) {
        throw new Error('Error updating event');
      }
      const updatedEventData = await response.json();
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === updatedEventData.id ? updatedEventData : event,
        ),
      );
      setEvent(updatedEventData);
      setAdminEvent(updatedEventData);
      setEditingEvent(null);
    } catch (err) {
      setError('No se pudo actualizar el evento.');
    }
  };

  const handleLocationChange = (location: string) => {
    if (editingEvent) {
      setEditingEvent({ ...editingEvent, eventLocation: location });
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        Panel de Administración de Eventos
      </h1>
      {loading ? (
        <p>Cargando eventos...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="border rounded-lg shadow">
          <ScrollArea className="h-[70vh]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Precio</TableHead>
                  <TableHead>Capacidad</TableHead>
                  <TableHead>Destacado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell>{event.title}</TableCell>
                    <TableCell>
                      {new Date(event.eventDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>${event.price}</TableCell>
                    <TableCell>{event.stock}</TableCell>
                    <TableCell>{event.highlight ? 'Sí' : 'No'}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              className="w-full"
                              onClick={() => setEditingEvent(event)}
                            >
                              Editar
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Editar Evento</DialogTitle>
                            </DialogHeader>
                            {editingEvent && (
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <Label htmlFor="title">Título</Label>
                                  <Input
                                    id="title"
                                    value={editingEvent.title}
                                    onChange={(e) =>
                                      setEditingEvent({
                                        ...editingEvent,
                                        title: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="description">
                                    Descripción
                                  </Label>
                                  <Textarea
                                    id="description"
                                    value={editingEvent.description}
                                    onChange={(e) =>
                                      setEditingEvent({
                                        ...editingEvent,
                                        description: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="eventDate">
                                    Fecha del evento
                                  </Label>
                                  <Input
                                    id="eventDate"
                                    type="date"
                                    value={editingEvent.eventDate.split('T')[0]}
                                    onChange={(e) =>
                                      setEditingEvent({
                                        ...editingEvent,
                                        eventDate: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="stock">Capacidad</Label>
                                  <Input
                                    id="stock"
                                    type="number"
                                    value={editingEvent.stock}
                                    onChange={(e) =>
                                      setEditingEvent({
                                        ...editingEvent,
                                        stock: Number(e.target.value),
                                      })
                                    }
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="price">Precio</Label>
                                  <Input
                                    id="price"
                                    type="number"
                                    value={editingEvent.price}
                                    onChange={(e) =>
                                      setEditingEvent({
                                        ...editingEvent,
                                        price: Number(e.target.value),
                                      })
                                    }
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="eventAddress">
                                    Dirección
                                  </Label>
                                  <Input
                                    id="eventAddress"
                                    value={editingEvent.eventAddress}
                                    onChange={(e) =>
                                      setEditingEvent({
                                        ...editingEvent,
                                        eventAddress: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="eventLocation">
                                    Ubicación
                                  </Label>
                                  <GoogleMaps
                                    eventLocation={editingEvent.eventLocation}
                                    eventAddress={editingEvent.eventAddress}
                                    setEventAddress={(address: string) =>
                                      setEditingEvent({
                                        ...editingEvent,
                                        eventAddress: address,
                                      })
                                    }
                                    setEventLocation={handleLocationChange}
                                  />
                                </div>
                                <div className="flex justify-end space-x-2">
                                  <Button
                                    onClick={() =>
                                      handleUpdateEvent(editingEvent)
                                    }
                                  >
                                    Guardar
                                  </Button>
                                  <Button
                                    variant="outline"
                                    onClick={() => setEditingEvent(null)}
                                  >
                                    Cancelar
                                  </Button>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        <Button
                          className="w-full"
                          variant={event.highlight ? 'default' : 'outline'}
                          onClick={() => handleToggleHighlight(event.id)}
                        >
                          {event.highlight ? 'Quitar Destacado' : 'Destacar'}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
      )}
    </div>
  );
}
