import React from 'react';
import { Button } from '../../../components/ui/button';
import { AdminDonation } from '../../../context/AuthContext';


export default function DonationComponent({ props, confirmPayment, cancelPayment }: { props: AdminDonation, confirmPayment: (id: string) => void, cancelPayment: (id: string) => void }) {
  return (
    <div className="cursor-pointer">
        
      <div>title: {props.title}</div>
      <div>amount: {props.amount}</div>
      {props.status === 'pending' ?
        <div>
          <Button 
          variant={'constructive'}
          onClick={() => confirmPayment(props.id)}>CONFIRMAR</Button>
          <Button
           variant={'destructive'}
           onClick={() => cancelPayment(props.id)}>CANCELAR</Button>
        </div>
        : 
        <div>status: {props.status}</div>
        }
    </div>
  );
}
