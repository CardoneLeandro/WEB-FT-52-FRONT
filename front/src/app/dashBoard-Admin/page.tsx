'use client';

import { useEffect, useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function PanelAdmin() {
  const { userSession } = useAuth();
  const Router = useRouter();
  return (
    <div className="container mx-auto p-6 ">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-6">
          Panel de Administración de Eventos
        </h1>
      </div>

      <div className="flex-grow bg-gray-100 py-6">
        <div className="container mx-auto px-4 max-w-7xl">
          <Card>
            <CardContent className="p-6 rounded-b-xl shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                <Card className="shadow-md flex flex-col">
                  <CardHeader>
                    <CardTitle className="cursor-default">
                      Próximos Eventos
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="cursor-default flex-grow overflow-y-auto max-h-[300px]">
                    <ul className="space-y-2">
                      {userSession?.assistantEvents?.length > 0 ? (
                        userSession.assistantEvents.map((assistantEvent) => (
                          <li
                            key={assistantEvent.eventId}
                            className="flex items-center bg-white p-3 rounded shadow-sm"
                          >
                            <span className="flex-grow truncate mr-2">
                              {assistantEvent.title}
                            </span>
                            <div className="flex items-center space-x-2 flex-shrink-0">
                              <span className="text-sm text-gray-500 w-24 text-right">
                                {new Date(
                                  assistantEvent.eventDate,
                                ).toLocaleDateString()}
                              </span>
                              <Button
                                onClick={() =>
                                  Router.push(
                                    `/eventdetail/${assistantEvent.eventId}`,
                                  )
                                }
                                variant="default"
                              >
                                Ver Evento
                              </Button>
                            </div>
                          </li>
                        ))
                      ) : (
                        <p>Aun no te has inscripto a ningun evento.</p>
                      )}
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
