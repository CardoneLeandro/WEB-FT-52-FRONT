'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    router.push('/');
  }, [router]);

  return <div>{/* Puedes agregar contenido aquí si lo necesitas */}</div>;
}
