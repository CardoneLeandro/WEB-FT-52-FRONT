import { useEffect, useState } from 'react';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  images: string[];
}

export function useFetchEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch('http://localhost:3005/events');
        if (!response.ok) {
          throw new Error('Error fetching events');
        }
        const data = await response.json();

        if (Array.isArray(data.events)) {
          setEvents(data.events);
        } else {
          setError('La estructura de los datos no es la esperada');
        }
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  return { events, loading, error };
}
