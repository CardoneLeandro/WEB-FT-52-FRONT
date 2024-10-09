import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export function SearchBar() {
  const [search, setSearch] = useState('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Agrega lógica para manejar la búsqueda
    console.log('Buscar:', search);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-auto max-w-sm items-center space-x-2"
    >
      <Input
        type="text"
        placeholder="Buscar..."
        value={search}
        onChange={handleSearch}
      />
      <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
        Buscar
      </Button>
    </form>
  );
}
