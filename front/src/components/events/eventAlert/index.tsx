import React from 'react';
import { LuAlertCircle } from 'react-icons/lu';
function EventAlert() {
  return (
    <div className="flex flex-col  w-2/4 items-center border p-6 border-blue-400 rounded-lg shadow-xl bg-blue-50">
      <LuAlertCircle className="text-6xl text-blue-600 mb-4" />
      <h1 className="font-bold text-2xl text-gray-800 text-center mb-2">
        No hay eventos programados en esta fecha
      </h1>
      <h2 className="text-gray-700 text-lg text-center mb-4">
        ¡La comunidad está llena de vida! Hay más eventos esperándote.
      </h2>
    </div>
  );
}

export default EventAlert;
