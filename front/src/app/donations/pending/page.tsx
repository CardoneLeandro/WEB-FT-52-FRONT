'use client';
import { Button } from '@/components/ui/button';
import { PaymentInfo, useAuth } from '@/context/AuthContext';
import { CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';



export default function PaymentPending() {
  const redirect = useRouter()
  const port = process.env.NEXT_PUBLIC_APP_API_PORT
  const [disabled, setDisabled] = useState(true);
  const { userSession, token, paymentInfo, setPaymentInfo, setDonation} = useAuth();
  
  const pay = async (params:any, token:string|null) => {
    const response = await fetch(`http://localhost:${port}/payments/pay-donations/pending`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    });
    const data = await response.json();
    return data;
    }
  

    useEffect(() => {
      if (!paymentInfo) return;
      const paymentData = {
        creator: userSession?.creatorId,
        title: paymentInfo?.title,
        amount: paymentInfo?.amount,
      };
    
      pay(paymentData, token)
      .then((data) => {
        if (data.ok) {
          const {donation} = data
          setDonation(donation);
          setPaymentInfo(null);
          setDisabled(false);
          window.alert('¡Gracias por tu donación!');
          redirect.push('/');
        }
      }).catch((error) => {
        window.alert(`ERROR AL REGISTRAR EL PAGO EN LA BASE DE DATOS ${error}`);
        redirect.push('/');
      });
    }, [paymentInfo, userSession, token])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md text-center">
        <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          ¡Pago Exitoso!
        </h1>
        <p className="text-gray-600 mb-4">
          Tu pago ha sido procesado correctamente o está pendiente de
          confirmación. Pronto recibirás un correo electrónico con los detalles
          de tu transacción.
        </p>
        <Button
        disabled={disabled}
        onClick={() => redirect.push('/')}
          className="inline-block px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition-colors"
        >
          Volver al inicio
        </Button>
      </div>
    </div>
  );
}
