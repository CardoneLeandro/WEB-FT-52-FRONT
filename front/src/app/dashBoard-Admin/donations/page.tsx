'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AdminListComponent, {
  Item,
} from '@/components/adminPanel/adminListComponent';
import { useAuth } from '@/context/AuthContext';

interface Donation {
  id: string;
  nombre: string;
  email: string;
  monto: number;
  estado: 'efectuado' | 'pendiente';
}

export default function AdminDonaciones() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [filteredDonations, setFilteredDonations] = useState<Donation[]>([]);
  const [statusFilter, setStatusFilter] = useState<
    'todas' | 'efectuado' | 'pendiente'
  >('todas');
  const [nameFilter, setNameFilter] = useState('');
  const { userSession, token } = useAuth();

  const fetchDonations = async () => {
    try {
      const response = await fetch('http://localhost:3003/donations', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const allDonations: Donation[] = data.map((donation: any) => ({
          id: donation.id,
          nombre: donation.nombre,
          email: donation.email,
          monto: donation.monto,
          estado: donation.estado,
        }));
        setDonations(allDonations);
        setFilteredDonations(allDonations);
      } else {
        console.error('Error fetching donations:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching donations:', error);
    }
  };

  useEffect(() => {
    if (userSession) {
      fetchDonations();
    }
  }, [userSession]);

  const handleConfirmPayment = async (item: Item) => {
    try {
      const response = await fetch(
        `http://localhost:3003/donations/confirm/${item.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.ok) {
        setDonations((prevDonations) =>
          prevDonations.map((d) =>
            d.id === item.id ? { ...d, estado: 'efectuado' } : d,
          ),
        );
      } else {
        console.error('Error confirming payment:', response.statusText);
      }
    } catch (error) {
      console.error('Error confirming payment:', error);
    }
  };

  const handleCancelPayment = async (item: Item) => {
    try {
      const response = await fetch(
        `http://localhost:3003/payments/pay-donation/success`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.ok) {
        setDonations((prevDonations) =>
          prevDonations.filter((d) => d.id !== item.id),
        );
      } else {
        console.error('Error canceling payment:', response.statusText);
      }
    } catch (error) {
      console.error('Error canceling payment:', error);
    }
  };

  useEffect(() => {
    const filtered = donations
      .filter((donation) => {
        if (statusFilter === 'efectuado')
          return donation.estado === 'efectuado';
        if (statusFilter === 'pendiente')
          return donation.estado === 'pendiente';
        return true;
      })
      .filter((donation) =>
        donation.nombre.toLowerCase().includes(nameFilter.toLowerCase()),
      );

    setFilteredDonations(filtered);
  }, [statusFilter, nameFilter, donations]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-gradient-to-r from-blue-500 to-green-500 py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-white">
            Panel de Administración de Donaciones
          </h1>
        </div>
      </div>
      <div className="flex-grow bg-gray-100 py-6">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mb-4">
            <div className="flex space-x-4 mb-6">
              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(
                    e.target.value as 'todas' | 'efectuado' | 'pendiente',
                  )
                }
                className="p-2 border rounded-md"
              >
                <option value="todas">Todas</option>
                <option value="efectuado">Efectuadas</option>
                <option value="pendiente">Pendientes</option>
              </select>

              <Input
                type="text"
                placeholder="Buscar por nombre"
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
                className="p-2 border rounded-md"
              />
            </div>

            <AdminListComponent
              type="donation"
              items={filteredDonations.map((donation) => ({
                id: donation.id,
                title: donation.nombre,
                description: `Monto: $${donation.monto}`,
                status: donation.estado,
                isActive: donation.estado === 'efectuado',
                email: donation.email,
                amount: donation.monto,
                highlight: false,
                isAdmin: false,
              }))}
              onToggleAction={() => {}}
              getToggleLabel={() => ''}
              onConfirmPayment={handleConfirmPayment}
              onCancelPayment={handleCancelPayment}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
