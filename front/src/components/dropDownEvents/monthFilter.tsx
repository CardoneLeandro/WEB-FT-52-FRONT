'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const meses = [
  { value: '01', label: 'Enero' },
  { value: '02', label: 'Febrero' },
  { value: '03', label: 'Marzo' },
  { value: '04', label: 'Abril' },
  { value: '05', label: 'Mayo' },
  { value: '06', label: 'Junio' },
  { value: '07', label: 'Julio' },
  { value: '08', label: 'Agosto' },
  { value: '09', label: 'Septiembre' },
  { value: '10', label: 'Octubre' },
  { value: '11', label: 'Noviembre' },
  { value: '12', label: 'Diciembre' },
];

export function ComboboxDemo({ onChange, value }) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(value || '');
  React.useEffect(() => {
    setSelectedValue(value);
  }, [value]);
  const handleSelect = (currentValue) => {
    const newValue = currentValue === value ? '' : currentValue;
    setSelectedValue(newValue);
    onChange(newValue);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="black"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedValue
            ? meses.find((mes) => mes.value === selectedValue)?.label
            : 'Filtrar por mes...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Buscar mes..." />
          <CommandList>
            <CommandEmpty>Mes no encontrado.</CommandEmpty>
            <CommandGroup>
              {meses.map((mes) => (
                <CommandItem
                  key={mes.value}
                  value={mes.value}
                  onSelect={() => handleSelect(mes.value)}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === mes.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {mes.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
