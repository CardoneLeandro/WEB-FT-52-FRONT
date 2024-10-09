'use client';

import { useEffect, useState } from 'react';
import EventCardDetail from '@/components/events/eventDetail/indext';
import getEventById from '@/utils/eventsdetail';
import { Event } from '@/context/AuthContext';


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

  return (
    <div className="flex justify-center items-center min-h-screen nim-w-screen ">
      <EventCardDetail {...event} />;
    </div>
  );
};

export default EventDetailPage;
