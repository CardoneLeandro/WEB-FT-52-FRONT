import React from 'react';
import { Event } from '@/context/AuthContext';

export default function EventComponent({
  props,
  onToggleHighlight,
  onUpdateEvent,
}: {
  props: Event;
  onToggleHighlight: (id: string) => void;
  onUpdateEvent: (event: Event) => void;
}) {
  return (
    <div>
      <div>titulo: {props.title}</div>
      <div>descripcion: {props.description}</div>
      <div>fecha: {new Date(props.eventDate).toLocaleDateString()} </div>
      <div>HighLight: {props.highlight ? 'Si' : 'No'} </div>
      <div>Imagen: {props.images[0] || 'Sin imagen'}</div>
      <div>Direccion: {props.eventAddress}</div>
      <div>Costo: {props.price}</div>
      <div>Cupos: {props.stock}</div>
      <div>Status: {props.status}</div>
    </div>
  );
}
