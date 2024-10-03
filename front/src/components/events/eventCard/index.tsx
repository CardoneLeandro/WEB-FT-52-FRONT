import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { MapPin, StarIcon } from 'lucide-react';
import { HoverCard, HoverCardTrigger } from '@/components/ui/hover-card';

interface EventCardProps {
  id: string;
  key: string;
  highlight: boolean;
  createDate: Date;
  status: string;
  title: string;
  eventDate: Date;
  eventLocation: string;
  price: number;
  stock: number;
  images: string;
}

const EventCard: React.FC<EventCardProps> = ({
  id,
  key,
  highlight,
  createDate,
  status,
  title,
  eventDate,
  eventLocation,
  price,
  stock,
  images,
}) => {
  const router = useRouter();
  const [highlighted, setHighlighted] = useState(highlight);

  const handleHighlightToggle = async () => {
    setHighlighted(!highlighted);

    try {
      const response = await fetch('http://localhost:3000/events/highlight', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventId: id,
          highlight: !highlighted,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el estado del evento');
      }

      const data = await response.json();
      console.log('Evento actualizado:', data);
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  };

  const handleViewDetails = () => {
    router.push(`/eventdetail/${id}`);
  };

  return (
    <Card className="flex-shrink-0 shadow-md">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{title}</CardTitle>
        </div>
        <CardDescription>
          <time>{new Date(eventDate).toLocaleDateString()}</time>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="justify-between items-center flex flex-col">
          <div>
            <p className="flex items-center text-muted-foreground mb-4">
              <MapPin className="mr-2 h-4 w-4" />
              {eventLocation}
            </p>
          </div>
          <div
            className="ml-4 flex justify-center"
            style={{ height: '180px', width: '180px' }}
          >
            {images ? (
              <Image
                src={images}
                alt={title}
                width={180}
                height={180}
                className="rounded-md object-cover mx-auto"
                style={{ maxWidth: '100%', maxHeight: '100%' }}
              />
            ) : (
              <p>No image available</p>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-row gap-x-4 items-center justify-center">
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant={'outline'} onClick={handleViewDetails}>
              Ver detalles
            </Button>
          </HoverCardTrigger>
        </HoverCard>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
