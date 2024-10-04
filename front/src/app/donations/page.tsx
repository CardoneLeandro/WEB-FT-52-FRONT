'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CloudHail, HeartIcon } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { donate } from '@/app/donations/mercadoPago';

export default function Home() {
  const {setPaymentInfo} = useAuth();

  const donateFunction = donate;

  async function donation(formData: FormData) {
    const title: string = formData.get('message') as string;
    const amount: number = Number(formData.get('amount'));
    console.log("Antes de setPaymentInfo:", { title, amount });
    setPaymentInfo({ title, amount });
    await donateFunction({ title, amount });}
  

  return (
    <div className="min-h-screen bg-gradient-to-b to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center flex items-center justify-center">
            <HeartIcon className="w-6 h-6 text-red-500 mr-2" />
            Haz una Donación
          </CardTitle>
          <CardDescription className="text-center">
            Tu apoyo hace la diferencia. ¡Gracias por tu generosidad!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={donation} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-sm font-medium">
                Monto de la Donación
              </Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                placeholder="Ingresa el monto"
                required
                className="w-full border border-gray-400 rounded-md"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message" className="text-sm font-medium">
                Tu Mensaje
              </Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Escribe un mensaje (opcional)"
                className="w-full h-24 border-gray-400 rounded-md"
              />
            </div>
            <Button type="submit" className="w-full">
              Donar Ahora
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center text-sm text-gray-500">
          Tus donaciones son procesadas de forma segura por Mercado Pago.
        </CardFooter>
      </Card>
    </div>
  );
}
