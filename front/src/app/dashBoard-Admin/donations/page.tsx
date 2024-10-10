'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
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
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import toast from 'react-hot-toast';

type AdminDonation = {
  id: string;
  email: string;
  amount: number;
  date: string;
  status: 'active' | 'pending';
  createdAt: string;
};

const port = process.env.NEXT_PUBLIC_APP_API_PORT;

export default function AdminDonaciones() {
  const [donations, setDonations] = useState<AdminDonation[]>([]);
  const [filteredDonations, setFilteredDonations] = useState<AdminDonation[]>(
    [],
  );
  const [statusFilter, setStatusFilter] = useState<
    'todas' | 'active' | 'pending'
  >('todas');
  const [nameFilter, setNameFilter] = useState('');
  const { userSession, token } = useAuth();

  const fetchDonations = async (): Promise<void> => {
    if (!userSession) return;

    try {
      const response = await fetch(`http://localhost:${port}/auth/donations`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setDonations(data);
      } else {
        console.error('Error fetching donations:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching donations:', error);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, [userSession]);

  const handleConfirmPayment = async (id: string) => {
    try {
      const response = await fetch(
        `http://localhost:${port}/auth/payment/donation/confirm/${id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.ok) {
        await fetchDonations();
        toast.success("Donacion Aceptada")
      } else {
        console.error('Error confirming payment:', response.statusText);
      }
    } catch (error) {
      console.error('Error confirming payment:', error);
    }
  };

  const handleCancelPayment = async (id: string) => {
    try {
      const response = await fetch(
        `http://localhost:${port}/auth/payment/donation/reject/${id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.ok) {
        await fetchDonations();
        toast.success("Donacion Rechazada")
      } else {
        console.error('Error canceling payment:', response.statusText);
      }
    } catch (error) {
      console.error('Error canceling payment:', error);
    }
  };

  useEffect(() => {
    const filtered = donations.filter((donation) => {
      if (statusFilter === 'active') return donation.status === 'active';
      if (statusFilter === 'pending') return donation.status === 'pending';
      return true;
    });

    setFilteredDonations(filtered);
  }, [statusFilter, nameFilter, donations]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        Panel de Administración de Donaciones
      </h1>
      <div className="flex space-x-4 mb-6">
        <Select
          value={statusFilter}
          onValueChange={(value) =>
            setStatusFilter(value as 'todas' | 'active' | 'pending')
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todas">Todas</SelectItem>
            <SelectItem value="active">Aceptadas</SelectItem>
            <SelectItem value="pending">Pendientes</SelectItem>
          </SelectContent>
        </Select>
        <Input
          type="text"
          placeholder="Buscar por nombre de usuario"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="border rounded-lg shadow">
        <ScrollArea className="h-[70vh]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Correo del Usuario</TableHead>
                <TableHead>Monto</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDonations.map((donation) => (
                <TableRow key={donation.id}>
                  <TableCell>{donation.email}</TableCell>
                  <TableCell>${donation.amount}</TableCell>
                  <TableCell>
                    {donation.status === 'active' ? 'Aceptada' : 'Pendiente'}
                  </TableCell>
                  <TableCell>{donation.date}</TableCell>
                  <TableCell>
                    {donation.status === 'pending' && (
                      <div className="flex space-x-2">
                        <Button
                          className="w-full"
                          variant={'constructive'}
                          onClick={() => handleConfirmPayment(donation.id)}
                        >
                          Aprobar
                        </Button>
                        <Button
                          className="w-full"
                          variant="destructive"
                          onClick={() => handleCancelPayment(donation.id)}
                        >
                          Cancelar
                        </Button>
                      </div>
                    )}
                    {donation.status === 'active' && (
                      <span className="text-green-600 font-medium">
                        Aprobada
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </div>
  );
}
