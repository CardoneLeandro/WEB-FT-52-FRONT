'use client';
import { ComboboxDemo } from '@/components/dropDownEvents/monthFilter';
import { ComboboxDemoYear } from '@/components/dropDownEvents/yearFilter';
import EventsList from '@/components/events/eventsList';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import EventAlert from '@/components/events/eventAlert';
function EventsPage() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  const getEvents = async (month = '', year = '') => {
    try {
      let url = 'http://localhost:3003/events';

      if (month || year) {
        const params = new URLSearchParams();
        if (month) params.append('month', month);
        if (year) params.append('year', year);
        url += `?${params.toString()}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Error fetching events');
      }

      const data = await response.json();
      console.log('Data received:', data);
      setEvents(data.events);
      setFilteredEvents(data.events);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  // useEffect para cargar los eventos la primera vez o cuando cambian mes/año
  useEffect(() => {
    getEvents(selectedMonth, selectedYear); // Llamar a getEvents con los valores de mes y año
  }, [selectedMonth, selectedYear]);

  // Función para manejar la búsqueda por título
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value.length > 1) {
      const filtered = events.filter((event) =>
        event.title.toLowerCase().includes(value.toLowerCase()),
      );
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents(events); // Reiniciar a todos los eventos si la búsqueda está vacía
    }
  };
  const clearFilters = () => {
    setSelectedMonth('');
    setSelectedYear('');
    setSearch('');
    setFilteredEvents(events); // Restablecer la lista de eventos filtrados
  };
  const hasFilters = selectedMonth || selectedYear || search;
  return (
    <div className="w-full">
      <div className="container mx-auto flex flex-col mt-4 ">
        <h1 className="text-3xl mt-4 font-bold">
          Participa de nuestros eventos:
        </h1>
        <div className="flex flex-row gap-2 justify-start mt-4">
          <div className="flex flex-row gap-6">
            <ComboboxDemo onChange={setSelectedMonth} />
            <ComboboxDemoYear onChange={setSelectedYear} />
            <div className="flex w-auto max-w-sm items-center space-x-2">
              <Input
                type="text"
                placeholder="Buscar eventos"
                value={search}
                onChange={handleSearch}
              />
              <Button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 transition-colors duration-300"
              >
                Buscar
              </Button>
              {hasFilters && (
                <Button
                  onClick={clearFilters}
                  className="border bg-transparent text-red-500 border-red-500 hover:bg-red-500 hover:text-white transition-colors duration-300"
                >
                  Limpiar filtros
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="mt-4 mb-6">
          {filteredEvents.length === 0 ? (
            <div className="flex justify-center items-center mt-6 ">
              <EventAlert />
            </div>
          ) : (
            <EventsList events={filteredEvents} />
          )}
        </div>
      </div>
    </div>
  );
}

export default EventsPage;
