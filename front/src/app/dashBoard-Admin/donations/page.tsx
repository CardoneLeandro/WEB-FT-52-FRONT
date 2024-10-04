'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Download, Search } from 'lucide-react';

// Datos de ejemplo (ampliados para demostrar el scroll)
const donaciones = [
  { id: 1, nombre: 'Juan Pérez', email: 'juan@example.com', monto: 100 },
  { id: 2, nombre: 'María García', email: 'maria@example.com', monto: 250 },
  { id: 3, nombre: 'Carlos Rodríguez', email: 'carlos@example.com', monto: 50 },
  { id: 4, nombre: 'Ana Martínez', email: 'ana@example.com', monto: 75 },
  { id: 5, nombre: 'Luis Sánchez', email: 'luis@example.com', monto: 200 },
  { id: 6, nombre: 'Elena Fernández', email: 'elena@example.com', monto: 150 },
  { id: 7, nombre: 'Pedro Gómez', email: 'pedro@example.com', monto: 80 },
  { id: 8, nombre: 'Laura Torres', email: 'laura@example.com', monto: 120 },
  {
    id: 9,
    nombre: 'Miguel Ángel Ruiz',
    email: 'miguel@example.com',
    monto: 300,
  },
  { id: 10, nombre: 'Isabel López', email: 'isabel@example.com', monto: 90 },
  {
    id: 11,
    nombre: 'Francisco Morales',
    email: 'francisco@example.com',
    monto: 180,
  },
  { id: 12, nombre: 'Carmen Jiménez', email: 'carmen@example.com', monto: 220 },
  { id: 13, nombre: 'Javier Díaz', email: 'javier@example.com', monto: 130 },
  { id: 14, nombre: 'Sofía Hernández', email: 'sofia@example.com', monto: 170 },
  { id: 15, nombre: 'Antonio Muñoz', email: 'antonio@example.com', monto: 110 },
];

export default function AdminDonaciones() {
  const [busqueda, setBusqueda] = useState('');

  const donacionesFiltradas = donaciones.filter(
    (donacion) =>
      donacion.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      donacion.email.toLowerCase().includes(busqueda.toLowerCase()),
  );

  const totalDonaciones = donacionesFiltradas.reduce(
    (sum, donacion) => sum + donacion.monto,
    0,
  );

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">
        Panel de Administración de Donaciones
      </h1>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative flex-grow sm:flex-grow-0">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar por nombre"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
        </div>
      </div>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Nombre</TableHead>
              <TableHead className="w-[250px]">Email</TableHead>
              <TableHead className="text-right">Monto</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
        <div className="max-h-[400px] overflow-y-auto">
          <Table>
            <TableBody>
              {donacionesFiltradas.map((donacion) => (
                <TableRow key={donacion.id}>
                  <TableCell className="font-medium">
                    {donacion.nombre}
                  </TableCell>
                  <TableCell>{donacion.email}</TableCell>
                  <TableCell className="text-right">
                    ${donacion.monto}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
