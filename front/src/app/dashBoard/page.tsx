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
import { useRouter } from 'next/navigation';



export default function UserDashboard() {
  const [showDonations, setShowDonations] = useState(false);
  const { userSession } = useAuth();
  const Router = useRouter()


  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-7xl mx-auto">
          <Card className="shadow-xl">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-green-500 flex justify-between items-center rounded-t-xl">
              <Avatar className=" w-16 h-16 shadow-xl">
                <AvatarImage src={userSession?.image} alt="User Image" />
                <AvatarFallback>{userSession?.image}</AvatarFallback>
              </Avatar>
              <CardTitle className="text-3xl font-bold text-white cursor-default">
                {userSession?.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 rounded-b-xl shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* User Information Section */}
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

                {/* Upcoming Events Section */}
                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle className="cursor-default">
                      Próximos Eventos
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="cursor-default">
                    <ul className="space-y-2">
                      {userSession?.assistantEvents?.length > 0 ? (
                        userSession.assistantEvents.map((assistantEvents) => (
                          <li
                            key={assistantEvents.eventId}
                            className="flex justify-between items-center bg-white p-3 rounded shadow-sm"
                          >
                            <span>{assistantEvents.title}</span>
                            <span className="text-sm text-gray-500">
                              {new Date(assistantEvents.eventDate).toLocaleDateString()}
                            </span>
                            <Button onClick={() => Router.push(`/eventdetail/${assistantEvents.eventId}`)} variant="default">Ver Evento </Button>
                          </li>
                        ))
                      ) : (
                        <p>Aun no te has inscripto a ningun evento.</p>
                      )}

                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Donations History Section */}
              <div className="mt-8">
                <Button
                  onClick={() => setShowDonations(!showDonations)}
                  className="w-full justify-between text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors duration-300 curor-pointer "
                  variant="outline"
                >
                  <span>Historial de Donaciones</span>
                  {showDonations ? (
                    <ChevronUpIcon className="w-5 h-5" />
                  ) : (
                    <ChevronDownIcon className="w-5 h-5" />
                  )}
                </Button>
                {showDonations && (
                  <Card className="mt-4">
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow className="text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors duration-300 curor-pointer">
                            <TableHead>Descripcion</TableHead>
                            <TableHead>Fecha</TableHead>
                            <TableHead>Total</TableHead>
                           
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {userSession?.donations.map((donation) => (
                            <TableRow key={donation.title}>
                              <TableCell>{donation.title}</TableCell>
                              <TableCell>
                                {new Date(donation.date).toLocaleDateString()}
                              </TableCell>{' '}
                              {/* Formatear la fecha */}
                              <TableCell>${donation.amount}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
