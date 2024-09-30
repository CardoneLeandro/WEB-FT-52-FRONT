import React from 'react';
import Link from 'next/link';
function AboutUs() {
  return (
    <div className="w-full">
      <div className="container mx-auto flex flex-col mt-6 px-4">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6 items-start">
          Nuestra historia
        </h1>
        <div className="flex flex-col lg:flex-row lg:gap-10 py-6">
          <div className="flex flex-col">
            <p className="text-lg leading-relaxed text-gray-600 text-justify">
              En el año 1972, el <strong>padre José Manzano</strong> fundaría el
              movimiento juvenil Peregrinos, empezando a trabajar con jóvenes
              cuando fue trasladado a la Comunidad de la Parroquia Nuestra
              Señora de los Dolores de Mendoza. Su labor se basó en la
              experiencia que había adquirido en el Movimiento Cursillos de
              Cristiandad y Círculos de Juventud en la ciudad de Buenos Aires.
              El movimiento quedó oficialmente constituido el día 30 de junio de
              1972. Iniciando sus actividades el 17 de agosto de ese mismo año,
              en esa fecha se realizó el primer Oasis dirigido para varones,
              teniendo por nombre <strong>Copos de Gracia</strong>. El segundo
              Oasis se realizó en octubre de ese mismo año y se dirigió a
              mujeres.
            </p>
            <p className="text-lg leading-relaxed text-gray-600 mt-6 text-justify">
              Con el tiempo, los jóvenes del Este (San Martín y Rivadavia)
              comenzaron a participar de los Oasis y otras actividades del
              movimiento, debido a las distancias, las mismas se empezaron a
              realizar en el lugar, dando origen a Peregrinos Zona Este.
            </p>
            <p className="text-lg leading-relaxed text-gray-600 mt-6 text-justify">
              En el Movimiento Juvenil Peregrinos, creemos firmemente en el
              poder de la conversión y el servicio. Nuestra actividad principal
              es el retiro de conversión llamado &quot;Oasis&quot;, que se lleva
              a cabo una vez al año. Este retiro es un espacio de reflexión y
              renovación espiritual, donde miembros de nuestra comunidad se unen
              para profundizar en su fe y fortalecer sus lazos. El retiro es
              organizado por un grupo comprometido de voluntarios que se dedica
              a hacer de esta experiencia un momento transformador para todos
              los participantes.
            </p>
            <div className="bg-gray-50 p-6 mt-6 rounded-lg shadow-lg">
              <p className="text-lg leading-relaxed text-gray-700 text-justify">
                A lo largo del año, también nos dedicamos a diversas actividades
                que benefician a diferentes comunidades. Realizamos campañas
                para recolectar ropa y alimentos, atendiendo a las necesidades
                de aquellos que atraviesan momentos difíciles. Además,
                organizamos festejos para celebrar ocasiones especiales, como el
                Día del Niño, donde buscamos brindar alegría y amor a los más
                pequeños.
              </p>
              <p className="text-lg leading-relaxed text-gray-700 mt-6 text-justify">
                Para llevar a cabo todas estas actividades y alcanzar nuestros
                objetivos, realizamos múltiples eventos de recaudación de
                fondos. Estas iniciativas nos permiten financiar nuestros
                proyectos y, a su vez, involucrar a nuestra comunidad en
                acciones solidarias que impactan positivamente en quienes nos
                rodean. Te invitamos a unirte a nosotros en esta misión de fe y
                servicio, donde cada acción cuenta y cada vida puede ser
                transformada.
              </p>
            </div>
          </div>
          <img
            src="images/logo viejo y nuevo.jpg"
            alt="logo"
            className="rounded-xl shadow-xl w-full lg:w-1/2 h-auto max-h-[600px] object-cover mt-6 lg:mt-0 hover:shadow-2xl hover:scale-105 transition-transform duration-300 items-center"
          />
        </div>
        <div className="flex justify-center mt-8">
          <button className="bg-blue-600 border text-white py-3 px-6 rounded-lg shadow-md hover:bg-white hover:text-blue-600 hover:border-blue-600 hover:font-bold focus:outline-none transition-all mb-10">
            <Link href="/login">Únete a Nosotros</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
