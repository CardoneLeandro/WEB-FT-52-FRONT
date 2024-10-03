import React from 'react';

const DonationHistory = () => {
  
  const donations = [
    { id: 1, date: '2024-09-25', amount: 50 },
    { id: 2, date: '2024-08-14', amount: 100 },
    { id: 3, date: '2024-07-30', amount: 75 },
  ];


  const totalAmount = donations.reduce((acc, donation) => acc + donation.amount, 0);

  return (
    <div className="min-h-screen flex justify-center items-start bg-gray-100">
      <div className="p-0 w-full flex flex-col justify-between h-[90vh]">
        {/* Título del historial */}
        <div className="bg-gradient-to-r from-blue-500 to-green-500 flex justify-between items-center  py-10 w-full">
          <div className="container mx-auto">
            <h1 className="text-2xl font-bold">Historial de Donaciones</h1>
          </div>
        </div>
  
        
        <div className="w-full p-10">
          <div className="flex justify-between font-semibold text-gray-700 text-2xl border-b pb-2">
            <span>Fecha</span>
            <span>Monto</span>
          </div>
        </div>
  
        
        <ul className="space-y-4 flex-grow w-full p-10 pt-0">
          {donations.map((donation) => (
            <li key={donation.id} className="flex justify-between text-gray-700 border-b pb-2">
              <span>{donation.date}</span>
              <span>${donation.amount}</span>
            </li>
          ))}
        </ul>
  
      
        <div className="mt-6 text-right text-3xl font-medium text-gray-800 self-end w-full p-10">
          <span>Total: ${totalAmount}</span>
        </div>
      </div>
    </div>
  );
  
  
}

export default DonationHistory;

