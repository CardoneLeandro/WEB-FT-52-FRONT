'use client';
import { useState, useEffect } from 'react';
import { Event } from '@/context/AuthContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import GoogleMaps from '@/components/GoogleMaps';
import EventComponent from './eventComponent';


export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {adminEvents, setEvent, setAdminEvent, userSession, token } = useAuth();
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  const getEvents = async () => {
    try {
      const response = await fetch('http://localhost:3003/events');
      if (response.status !== 200) {
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
    if (adminEvents){setEvents(adminEvents);}
    getEvents();
  }, [adminEvents]);


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
      setEvent(updatedEvent)
      setAdminEvent(updatedEvent)
    } catch (err) {
      setError('No se pudo actualizar el estado de destacar.');
    }
  };

  const handleUpdateEvent = async (updatedEvent: Event) => {
    console.log('Esto es lo que envio', {
      title: updatedEvent.title,
      description: updatedEvent.description,
      eventDate: updatedEvent.eventDate,
      eventLocation: updatedEvent.eventLocation,
      price: updatedEvent.price,
      stock: updatedEvent.stock,
    });
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
      setEvent(updatedEventData)
      setAdminEvent(updatedEventData)
    } catch (err) {
      setError('No se pudo actualizar el evento.');
    }
  };

  return (
    <div>
      <div className="bg-gradient-to-r from-blue-500 to-green-500 flex justify-between items-center py-10">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold text-white">
            Panel de Administración de Eventos
          </h1>
        </div>
      </div>

      <div className="flex-grow bg-gray-100 py-6">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            {loading ? (
              <p>Cargando eventos...</p>
            ) : error ? (
              <p>{error}</p>
            ) :
            <div>
              {events.map((event) => (
                <EventComponent
                  key={event.id}
                  props={event}
                  onToggleHighlight={handleToggleHighlight}
                  onUpdateEvent={handleUpdateEvent}
                />
              ))}
              </div>
            }
          </div>

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
                value={new Date(editingEvent.eventDate).toISOString().split('T')[0]}
                onChange={(e) =>
                  setEditingEvent({
                    ...editingEvent,
                    eventDate: new Date(e.target.value),
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
                    stock: Number(e.target.value),
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
                    price: Number(e.target.value),
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
      </div>
    </div>
  );
}



{/* <AdminListComponent
type="event"
items={events.map((event) => ({
  id: event.id.toString(),
  title: event.title,
  description: event.description,
  isActive: event.isActive,
  highlight: event.highlight,
  image: event.images[0] || '/default-event-image.jpg',
  eventDate: new Date(event.eventDate)
    .toISOString()
    .split('T')[0],
  eventAddress: event.eventAddress,
  price: event.price,
  stock: event.stock,
  status: event.status
}))}
onToggleAction={handleToggleAction}
onToggleHighlight={handleToggleHighlight}
onUpdateEvent={handleUpdateEvent}
/> */}
