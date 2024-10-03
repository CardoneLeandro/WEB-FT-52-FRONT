import { Button } from '@/components/ui/button';
import React from 'react';
import Link from 'next/link';
function FelipeTestPage() {
  return (
    <div className="flex gap-6 justify-center items-center min-h-screen ">
      <div>
        <Button variant="default">botón relleno azul </Button>
        <h1> variant: default</h1>
      </div>
      <div>
        <Button variant={'outline'}>botón borde azul y relleno blanco</Button>
        <h1> variant: outline</h1>
      </div>
      <div>
        <Button variant={'destructive'}>
          botón borde rojo y relleno blanco
        </Button>
        <h1> variant: destructive</h1>
      </div>
      <div>
        <Button variant={'secondary'}>
          <Link href="/">relleno rojo</Link>
        </Button>
        <h1> variant: secondary</h1>
      </div>
      <div>
        <Button variant={'disabled'}>
          <Link href="/">relleno rojo</Link>
        </Button>
        <h1> variant: disabled</h1>
      </div>
    </div>
  );
}

export default FelipeTestPage;
