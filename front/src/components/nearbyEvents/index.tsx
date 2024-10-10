import React from 'react';
import EventCard from '../events/eventCard';

function NearbyEvents({ setEvents }) {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
      {setEvents.map((event) => (
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
              ? event.images[0]
              : '/path/to/placeholder-image.jpg'
          }
        />
      ))}
    </div>
  );
}

export default NearbyEvents;
