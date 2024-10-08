'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AdminListComponent from '@/components/adminPanel/adminListComponent';
import { useAuth } from '@/context/AuthContext';

interface Donation {
  id: string;
  title: string;
  amount: number;
  status: 'pending' | 'accepted';
}

const port = process.env.NEXT_PUBLIC_APP_API_PORT;

export default function AdminDonaciones() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [filteredDonations, setFilteredDonations] = useState<Donation[]>([]);
  const [statusFilter, setStatusFilter] = useState<
    'todas' | 'accepted' | 'pending'
  >('todas');
  const [nameFilter, setNameFilter] = useState('');
  const { userSession, token } = useAuth();
  const port = process.env.NEXT_PUBLIC_APP_API_PORT;
  const fetchDonations = async (): Promise<void> => {
    if (!userSession) return;

    try {
      const response = await fetch('http://localhost:3003/auth/donations', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Fetched donations:', data);
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
        await fetchDonations(); // Reload donations after successful confirmation
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
        if (statusFilter === 'accepted') return donation.status === 'accepted';
        if (statusFilter === 'pending') return donation.status === 'pending';
        return true;
      })
      .filter((donation) =>
        donation.title?.toLowerCase().includes(nameFilter.toLowerCase()),
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
                    e.target.value as 'todas' | 'accepted' | 'pending',
                  )
                }
                className="p-2 border rounded-md"
              >
                <option value="todas">Todas</option>
                <option value="accepted">Aceptadas</option>
                <option value="pending">Pendientes</option>
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
                title: donation.title,
                description: `Monto: $${donation.amount}`,
                status: donation.status,
                isActive: donation.status === 'accepted',
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
