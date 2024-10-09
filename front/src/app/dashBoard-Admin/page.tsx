'use client';

import { useEffect, useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';



export default function PanelAdmin() {
  const { userSession } = useAuth();
  const Router = useRouter()
  return (
    <div className="container mx-auto p-6">
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
                              {new Date(
                                assistantEvents.eventDate,
                              ).toLocaleDateString()}
                            </span>
                            <Button
                              onClick={() =>
                                Router.push(
                                  `/eventdetail/${assistantEvents.eventId}`,
                                )
                              }
                              variant="default"
                            >
                              Ver Evento{' '}
                            </Button>
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