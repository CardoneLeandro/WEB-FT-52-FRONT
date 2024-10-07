interface Event {
  id: string;
  highlight: boolean;
  createDate: Date;
  status: string;
  title: string;
  eventDate: Date;
  eventLocation: string;
  eventAdress: string;
  price: number;
  stock: number;
  images: string[];
  description: string;
}

export default async function getEventById(id: string) {
  const port = process.env.NEXT_PUBLIC_APP_API_PORT || 3003;
  try {
    const res = await fetch(`http://localhost:${port}/events/getone/${id}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error(
        `Error al obtener el evento: ${res.status} ${res.statusText}`
      );
    }

    const event: Event = await res.json();
    return event
  } catch (error) {
    console.error('Error al obtener el evento por ID:', error);
    return null;
  }
}