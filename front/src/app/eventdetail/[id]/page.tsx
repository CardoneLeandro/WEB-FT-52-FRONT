'use client';

import { useEffect, useState } from 'react';
import EventCardDetail from '@/components/events/eventDetail/indext';
import getEventById from '@/utils/eventsdetail';

interface Event {
  id: string;
  highlight: boolean;
  createDate: Date;
  status: string;
  title: string;
  eventDate: Date;
  eventLocation: string;
  eventAddress: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
}

const EventDetailPage = ({ params }: { params: { id: string } }) => {
  const [event, setEvent] = useState<Event | null>();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const fetchedEvent = await getEventById(params.id);
        setEvent(fetchedEvent);
      } catch (error) {
        window.console.error('error', error);
      }
    };

    fetchEvent();
  }, [params.id]);

  
  console.log('id del evento', params.id);

  if (!event) {
    return <div>Evento no disponible</div>;
  }

  return <EventCardDetail {...event} />;
};

export default EventDetailPage;
