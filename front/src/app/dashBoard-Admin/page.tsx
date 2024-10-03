'use client';

import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/context/AuthContext';

const aportes = [
  {
    aporte: 'Donación',
    paymentStatus: 'Paid',
    totalAmount: '$250.00',
    paymentMethod: 'Credit Card',
  },
  {
    aporte: 'Donación',
    paymentStatus: 'Pending',
    totalAmount: '$150.00',
    paymentMethod: 'PayPal',
  },
  {
    aporte: 'Donación',
    paymentStatus: 'Unpaid',
    totalAmount: '$350.00',
    paymentMethod: 'Bank Transfer',
  },
];

const upcomingEvents = [
  { id: 1, name: 'Evento 1', date: '2023-07-15' },
  { id: 2, name: 'Evento 2', date: '2023-07-22' },
  { id: 3, name: 'Evento 3', date: '2023-07-29' },
];

export default function PanelAdmin() {
  const [showDonations, setShowDonations] = useState(false);
  const { userSession } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header con gradiente y estilos */}
      <div className="bg-gradient-to-r from-blue-500 to-green-500 flex justify-between items-center rounded-t-xl py-10">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold text-white">
            Panel de Administración de Usuarios
          </h1>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-grow bg-gray-100 py-6">
        <div className="container mx-auto px-4 max-w-7xl">
          <Card>
            <CardContent className="p-6 rounded-b-xl shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Sección de Información del Usuario */}
                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle>Información del Usuario</CardTitle>
                  </CardHeader>
                  <CardContent className="cursor-default">
                    <p>
                      <strong>Nombre:</strong> {userSession?.name}
                    </p>
                    <p>
                      <strong>Email:</strong> {userSession?.email}
                    </p>
                    <p>
                      <strong>Dirección:</strong> {userSession?.address}
                    </p>
                    <p>
                      <strong>Teléfono:</strong> {userSession?.phone}
                    </p>
                  </CardContent>
                </Card>

                {/* Sección de Próximos Eventos */}
                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle className="cursor-default">
                      Próximos Eventos
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="cursor-default">
                    <ul className="space-y-2">
                      {upcomingEvents.map((event) => (
                        <li
                          key={event.id}
                          className="flex justify-between items-center bg-white p-3 rounded shadow-sm"
                        >
                          <span>{event.name}</span>
                          <span className="text-sm text-gray-500">
                            {event.date}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
