'use client';

import { useEffect, useState } from 'react';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  UserIcon,
  PhoneIcon,
  MapPinIcon,
  MailIcon,
  CalendarIcon,
  CreditCardIcon,
} from 'lucide-react';
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
import { useRouter } from 'next/navigation';
import { LuAlertCircle } from 'react-icons/lu';

export default function UserDashboard() {
  const [showDonations, setShowDonations] = useState(false);
  const { userSession, token } = useAuth();
  const Router = useRouter();

  useEffect(() => {
    if (userSession.role !== 'user' || !token) {
      Router.push('/');
    }
  }, [userSession, token, Router]);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Card className="shadow-xl">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-green-500 flex justify-between items-center rounded-t-xl">
            <Avatar className="w-16 h-16 shadow-xl">
              <AvatarImage src={userSession?.image} alt="User Image" />
              <AvatarFallback>{userSession?.image}</AvatarFallback>
            </Avatar>
            <CardTitle className="text-3xl font-bold text-white cursor-default">
              {userSession?.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 rounded-b-xl shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card className="shadow-md bg-white">
                <CardHeader className="border-b border-gray-200">
                  <CardTitle className="text-xl font-semibold text-gray-800 flex items-center">
                    <UserIcon className="text-xl mr-2 text-blue-500" />
                    Información del Usuario
                  </CardTitle>
                </CardHeader>
                <CardContent className="cursor-default space-y-8 p-4">
                  <div className="text-l font-semibold text-gray-800 flex items-center mt-5 ">
                    <UserIcon className="text-l mr-2 text-blue-500" />
                    <p className="text-gray-700">{userSession?.name}</p>
                  </div>
                  <div className="text-l font-semibold text-gray-800 flex items-center">
                    <MailIcon className="text-l mr-2 text-blue-500" />
                    <p className="text-gray-700">{userSession?.email}</p>
                  </div>
                  <div className="text-l font-semibold text-gray-800 flex items-center">
                    <MapPinIcon className="text-l mr-2 text-blue-500" />
                    <p className="text-gray-700">{userSession?.address}</p>
                  </div>
                  <div className="text-l font-semibold text-gray-800 flex items-center">
                    <PhoneIcon className="text-l mr-2 text-blue-500" />
                    <p className="text-gray-700">{userSession?.phone}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-md bg-white">
                <CardHeader className="border-b border-gray-200">
                  <CardTitle className="text-xl font-semibold text-gray-800 flex items-center">
                    <CalendarIcon className="w-5 h-5 mr-2 text-blue-500" />
                    Próximos Eventos
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 overflow-y-auto max-h-[300px]">
                  {userSession?.assistantEvents?.length > 0 ? (
                    <ul className="space-y-4">
                      {userSession.assistantEvents.map((assistantEvent) => (
                        <li
                          key={assistantEvent.eventId}
                          className="bg-gray-50 p-4 rounded-lg shadow-sm"
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className="font-semibold text-gray-800">
                                {assistantEvent.title}
                              </h3>
                              <span className="text-sm text-gray-500">
                                {new Date(
                                  assistantEvent.eventDate,
                                ).toLocaleDateString()}
                              </span>
                            </div>
                            <Button
                              onClick={() =>
                                Router.push(
                                  `/eventdetail/${assistantEvent.eventId}`,
                                )
                              }
                              variant="outline"
                              className="text-blue-600 hover:bg-blue-50 transition-colors duration-300"
                            >
                              Ver Evento
                            </Button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="flex flex-col  w-full items-center border p-6 border-blue-400 rounded-lg shadow-xl bg-blue-50">
                      <LuAlertCircle className="text-5xl text-blue-600 mb-4" />
                      <h1 className="font-bold text-xl text-gray-800 text-center mb-2">
                        Aun no te has registrado en ningun evento
                      </h1>
                      <h2 className="text-gray-700 text-lg text-center mb-4">
                        ¡La comunidad está llena de vida! Hay eventos
                        esperándote.
                      </h2>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-md bg-white">
              <CardHeader className="border-b border-gray-200">
                <CardTitle className="text-xl font-semibold text-gray-800 flex items-center">
                  <CreditCardIcon className="w-5 h-5 mr-2 text-blue-500" />
                  Historial de Donaciones
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <Button
                  onClick={() => setShowDonations(!showDonations)}
                  className="w-full justify-between text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors duration-300 cursor-pointer mb-4"
                  variant="outline"
                >
                  <span className="font-semibold">
                    {showDonations ? 'Ocultar Donaciones' : 'Ver Donaciones'}
                  </span>
                  {showDonations ? (
                    <ChevronUpIcon className="w-5 h-5" />
                  ) : (
                    <ChevronDownIcon className="w-5 h-5" />
                  )}
                </Button>
                {showDonations && (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead className="font-semibold text-gray-600">
                            Descripción
                          </TableHead>
                          <TableHead className="font-semibold text-gray-600">
                            Fecha
                          </TableHead>
                          <TableHead className="font-semibold text-gray-600">
                            Total
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {userSession?.donations.map((donation, index) => (
                          <TableRow
                            key={donation.title}
                            className={
                              index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                            }
                          >
                            <TableCell className="font-medium">
                              {donation.title}
                            </TableCell>
                            <TableCell>
                              {new Date(donation.date).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="text-green-600 font-semibold">
                              ${donation.amount}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
