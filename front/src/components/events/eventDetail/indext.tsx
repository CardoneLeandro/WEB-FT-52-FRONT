'use client';

interface EventCardProps {
  id: string;
  highlight: boolean;
  createDate: Date;
  status: string;
  title: string;
  eventDate: Date;
  eventLocation: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
}

const EventCardDetail: React.FC<EventCardProps> = ({
  id,
  images = [],
  title,
  status,
  eventDate,
  eventLocation,
  stock,
  price,
  description,

}) => {

  console.log ("id que recibo", id)
  return (
    <div className="m-auto">
    <aside className="bg-white shadow-md rounded-lg flex flex-col md:flex-row w-full max-w-4xl mx-auto my-6 md:ml-4 md:max-w-6xl">
      <div className="w-full md:w-2/5">
        <img
          src={
            images && images.length > 0
              ? images[0]
              : 'https://via.placeholder.com/400'
          }
          alt="Event Image"
          className="object-cover w-full h-64 md:h-full rounded-t-lg md:rounded-l-lg md:rounded-t-none"
        />
      </div>

      <div className="flex flex-col justify-between p-6 w-full md:w-3/5 space-y-4">
        <div>
          <h2 className="text-xl font-bold mb-2">{title}</h2>
          <p className="text-gray-700 font-semibold">{description}</p>
          <div className="space-y-2 mt-2">
            <div className="flex flex-row gap-2 text-gray-700 gap-2">
              <p className="font-bold">Ubicación: </p>
              <p>{eventLocation}</p>
            </div>
            <div className="flex flex-row gap-2 text-gray-700 gap-2">
              <p className="font-bold">Fecha:</p>
              <p>{new Date(eventDate).toLocaleDateString()}</p>
            </div>
            <div className="flex flex-row gap-2 text-gray-700">
              <p className="font-bold">Hora:</p>
              {new Date(eventDate).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </div>
            <div className="flex flex-row gap-2 text-gray-700 gap-2">
              <p className="font-bold">Lugares:</p>
              <p>{stock}</p>
            </div>
            <div className="flex flex-row gap-2 text-gray-700">
              <p className="font-bold">Precio:</p>
              <p>{price > 0 ? price : 'gratuito'}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-4 ">
          <button className="bg-transparent border border-blue-500 text-blue-500 hover:bg-blue-600 hover:text-white font-semibold py-2 px-4 rounded-lg w-full md:w-auto transition-colors duration-300">
            Volver a eventos
          </button>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg w-full md:w-auto transition-colors duration-300">
            Asistiré
          </button>
        </div>
      </div>
    </aside>
    </div>
  );
};

export default EventCardDetail;
