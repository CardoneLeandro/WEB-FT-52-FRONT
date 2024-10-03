import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function SearchBar() {
  return (
    <div className="flex w-auto max-w-sm items-center space-x-2">
      <Input
        type="text"
        placeholder=""
        value={search}
        onChange={handleSearch}
      />
      <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
        Buscar
      </Button>
    </div>
  );
}
