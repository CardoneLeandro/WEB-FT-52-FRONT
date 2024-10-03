import { XCircle } from 'lucide-react';
import Link from 'next/link';

export default function PaymentFailed() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md text-center">
        <XCircle className="w-16 h-16 mx-auto text-red-500 mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Pago Fallido</h1>
        <p className="text-gray-600 mb-4">
          Lo sentimos, hubo un problema al procesar tu pago. Por favor, verifica
          tu información e intenta nuevamente.
        </p>
        <Link
          href="/donations"
          className="inline-block px-6 py-2 text-white bg-red-500 rounded hover:bg-red-600 transition-colors"
        >
          Intentar de nuevo
        </Link>
      </div>
    </div>
  );
}
