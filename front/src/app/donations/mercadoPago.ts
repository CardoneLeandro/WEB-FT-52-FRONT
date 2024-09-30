'use server'
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { redirect } from 'next/navigation';

const client = new MercadoPagoConfig({
    accessToken:
      'APP_USR-3070431824896779-092618-b54618ee9085c599b72dfc57e22210f7-151488918',
  });

export const donate = async({title, amount}:{title: string, amount: number}) => {
      
        const preference = await new Preference(client).create({
          body: {
            items: [
              {
                id: 'donacion',
                title: title,
                quantity: 1,
                unit_price: amount,
              },
            ],
          },
        });   
        redirect(preference.sandbox_init_point!);
      }