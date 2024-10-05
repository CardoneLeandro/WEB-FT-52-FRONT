'use client';

import { useState, useEffect } from 'react';
import AdminListComponent, {
  Item,
} from '@/components/adminPanel/adminListComponent';

interface Event {
  id: string;
  highlight: boolean;
  createDate: Date;
  status: string;
  title: string;
  eventDate: Date;
  eventLocation: string;
  price: number;
  stock: number;
  images: string[];
  description: string;
  isActive: boolean;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
    getEvents();
  }, []);

  const handleToggleAction = (event: Item) => {
    setEvents(
      events.map((e) =>
        e.id === event.id ? { ...e, isActive: !e.isActive } : e,
      ),
    );
  };

  const getToggleLabel = (isActive: boolean) =>
    isActive ? 'No destacar' : 'Destacar';

  const handleToggleHighlight = async (event: Item) => {
    try {
      const response = await fetch(
        `http://localhost:3003/auth/events/highlight/${event.id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            highlight: !event.highlight, // Cambia el estado de highlight
          }),
        },
      );

      if (response.status !== 200) {
        throw new Error('Error updating highlight status');
      }

      const updatedEventData = await response.json();

      // Actualiza el estado de eventos
      setEvents((prevEvents) =>
        prevEvents.map((e) =>
          e.id === event.id
            ? { ...e, highlight: updatedEventData.highlight }
            : e,
        ),
      );
    } catch (err) {
      setError('No se pudo actualizar el estado de destacar.');
    }
  };

  const handleUpdateEvent = async (updatedEvent: Item) => {
    try {
      const response = await fetch(
        `http://localhost:3003/auth/events/edit/${updatedEvent.id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: updatedEvent.title,
            description: updatedEvent.description,
            eventDate: updatedEvent.eventDate,
            eventLocation: updatedEvent.eventLocation,
            price: updatedEvent.cost,
            stock: updatedEvent.stock,
          }),
        },
      );

      if (response.status !== 200) {
        throw new Error('Error updating event');
      }

      const updatedEventData = await response.json();

      setEvents(
        events.map((event) =>
          event.id === updatedEvent.id
            ? { ...event, ...updatedEventData }
            : event,
        ),
      );
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
            ) : (
              <AdminListComponent
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
                  eventLocation: event.eventLocation,
                }))}
                onToggleAction={handleToggleAction}
                getToggleLabel={getToggleLabel}
                onUpdateEvent={handleUpdateEvent}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
