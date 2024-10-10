import { Event } from "@/context/AuthContext";

export default async function getEventById(id: string) {
  // const port = process.env.NEXT_PUBLIC_APP_API_PORT || 3003;
  try {
<<<<<<< HEAD
    const res = await fetch(
      `https://web-ft-52-back-1.onrender.com/events/getone?id=${id}`,
      {
        cache: 'no-store',
      },
    );
=======
    const res = await fetch(`http://localhost:${port}/events/getone/${id}`, {
      cache: 'no-store',
    });
>>>>>>> 55b17464711f90fa3b83d0c879427f94471d4153

    if (!res.ok) {
      throw new Error(
        `Error al obtener el evento: ${res.status} ${res.statusText}`,
      );
    }

    const event: Event = await res.json();
    return event;
  } catch (error) {
    console.error('Error al obtener el evento por ID:', error);
    return null;
  }
}
