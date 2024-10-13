'use client';
import { ComboboxDemo } from '@/components/dropDownEvents/monthFilter';
import { ComboboxDemoYear } from '@/components/dropDownEvents/yearFilter';
import EventsList from '@/components/events/eventsList';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import EventAlert from '@/components/events/eventAlert';
import { Event } from '@/context/AuthContext';
function EventsPage() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  const getEvents = async (month = '', year = '', title = '') => {
    try {
      let url = 'https://web-ft-52-back-1.onrender.com/events';

      const params = new URLSearchParams();
      if (month) params.append('month', month);
      if (year) params.append('year', year);
      if (title) params.append('title', title);

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Error fetching events');
      }

      const data = await response.json();

      setEvents(data.events);
      setFilteredEvents(data.events);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    getEvents(selectedMonth, selectedYear, search);
  }, [selectedMonth, selectedYear, search]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    if (value.length > 1) {
      const filtered = events.filter((event: Event) =>
        event.title.toLowerCase().includes(value.toLowerCase()),
      );
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents(events);
    }
  };
  const clearFilters = () => {
    setSelectedMonth('');
    setSelectedYear('');
    setSearch('');
    setFilteredEvents(events);
  };
  const hasFilters = selectedMonth || selectedYear || search;
  return (
    <div className="w-full">
      <div className="container mx-auto flex flex-col mt-4">
        <h1 className="text-3xl mt-4 font-bold">
          Participa de nuestros eventos:
        </h1>
        <div className="flex flex-row gap-10 justify-start mt-4">
          <div className="flex flex-row gap-8">
            <ComboboxDemo onChange={setSelectedMonth} value={selectedMonth} />
            <ComboboxDemoYear onChange={setSelectedYear} value={selectedYear} />
            <div className="flex w-auto max-w-sm items-center space-x-2">
              <Input
                type="text"
                placeholder="Buscar eventos"
                value={search}
                onChange={handleSearch}
                className="text-gray-500 font-semibold"
              />

              {hasFilters && (
                <Button onClick={clearFilters} variant={'destructive'}>
                  Limpiar filtros
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 mb-6 gap-12">
          {filteredEvents.length === 0 ? (
            <div className="flex justify-center items-center mt-6">
              <EventAlert />
            </div>
          ) : (
            <EventsList
              initialEvents={events}
              selectedMonth={selectedMonth}
              selectedYear={selectedYear}
              search={search}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default EventsPage;
