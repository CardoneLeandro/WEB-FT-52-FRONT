'use client';

import { useState, useEffect } from 'react';
import AdminListComponent, {
  Item,
} from '@/components/adminPanel/adminListComponent';
import { useAuth } from '@/context/AuthContext';
import { Event as AdminEvent } from '@/context/AuthContext';

interface Event {
  id: string;
  highlight: boolean;
  createDate: Date;
  status: string;
  title: string;
  eventDate: Date;
  eventLocation: string;
  eventAddress: string;
  price: string;
  stock: string;
  images: string[];
  description: string;
  isActive: boolean;
}
export default function EventsPage() {
  const [events, setEvents] = useState<AdminEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {adminEvents, setEvent, setAdminEvent, userSession, token } = useAuth();

  // const getEvents = async () => {
  //   try {
  //     const response = await fetch('http://localhost:3003/events');
  //     if (response.status !== 200) {
  //       throw new Error('Error fetching events');
  //     }
  //     const data = await response.json();
  //     setEvents(data.events);
  //   } catch (err) {
  //     setError('No se pudieron cargar los eventos.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    if (adminEvents){setEvents(adminEvents);}
    
    // getEvents();
  }, [adminEvents]);


  const handleToggleHighlight = async (event: Item) => {
    try {
      const response = await fetch(
        `http://localhost:3003/auth/events/highlight/${event.id}`,
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

  const handleUpdateEvent = async (updatedEvent: Item) => {
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
                  eventAddress: event.eventAddress,
                  price: event.price,
                  stock: event.stock,
                  status: event.status
                }))}
                onToggleAction={handleToggleAction}
                onToggleHighlight={handleToggleHighlight}
                onUpdateEvent={handleUpdateEvent}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}