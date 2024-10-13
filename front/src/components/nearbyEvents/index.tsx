import React from 'react';
import EventCard from '../events/eventCard';
import { Event } from '@/context/AuthContext';
interface NearbyEventsProps {
  events: Event[]; 
}
function NearbyEvents({ events }: NearbyEventsProps) {
 
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
      {Array.isArray(events) &&
        events.map((event: Event) => (
          <EventCard
            key={event.id}
            id={event.id}
            title={event.title}
            eventDate={event.eventDate}
            eventLocation={event.eventLocation}
            eventAddress={event.eventAddress}
            price={event.price}
            stock={event.stock}
            images={
              event.images && event.images.length > 0
                ? [...event.images.slice(0, 1)]
                : ['/path/to/placeholder-image.jpg']
            }
            highlight={event.highlight}
            status={event.status}
            createDate={event.createDate}
            vacancy={event.vacancy}
            description={event.description}
            assistantEvents={event.assistantEvents}
          />
        ))}
    </div>
  );
}

export default NearbyEvents;
