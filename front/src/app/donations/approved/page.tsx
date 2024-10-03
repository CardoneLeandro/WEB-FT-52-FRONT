import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function PaymentSuccess() {
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
        <Link
          href="/"
          className="inline-block px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition-colors"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
