##  MOVIMIENTO JUVENIL PEREGRINOS - Frontend
"Movimiento Juvenil Peregrinos"es una plataforma web diseñada para fortalecer la comunidad de la congregación. El sitio permite a los miembros explorar y registrarse para eventos, así como realizar donaciones a la iglesia de manera fácil y segura. Con un enfoque en la accesibilidad y la usabilidad, la página ofrece una navegación intuitiva y una experiencia visual atractiva. El objetivo es fomentar la participación activa de los jóvenes en la congregación, facilitando la asistencia a eventos y apoyando la misión de la iglesia.

----
### Demo en vivo<p>
Puedes entrar a ver nuestra página web [haciendo click aquí!](https://web-ft-52-front-deploy.vercel.app/).
</p>

----
### Funcionalidades:
- Autenticación de terceros: Utilizamos Auth0 para el registro e inicio de sesión, lo que permite a los usuarios acceder a la página con sus cuentas de Google. Además, ofrecemos nuestro propio sistema de registro.

- Pasarela de pagos: Para facilitar las donaciones a la iglesia integramos Mercado Pago, una plataforma de pagos en línea confiable y segura. Utilizamos su API para gestionar transacciones de pago, permitiendo a los usuarios realizar compras mediante tarjetas de crédito, débito u otros métodos de pago admitidos. Esto permite a los usuarios contribuir de manera segura y rápida a la misión de la iglesia.

- Dashboard de administración: La página incluye una sección denominada "Dashboard de Administrador", donde el administrador puede acceder a métodos CRUD específicos. Esto facilita la gestión de usuarios, eventos y donaciones de manera rápida e intuitiva.

- Sistema de notificaciones por correo: Usamos la librería Mailer para enviar notificaciones, como mensajes de bienvenida a nuevos usuarios y agradecimientos a quienes realizan aportes económicos a través de nuestra sección de donaciones.

- Manejo de stock: Implementamos un sistema de seguimiento de stock dinámico para gestionar la asistencia a eventos. Esto permite a los usuarios confirmar su asistencia, al administrador llevar un conteo de asistencias y gestionar la baja de usuarios en eventos, actualizando automáticamente el stock disponible.

- Integración con Google Maps: Utilizamos Google Maps para asignar direcciones a los eventos de la página. Esto permite a los usuarios visualizar la ubicación exacta de los eventos y obtener indicaciones para llegar, mejorando la experiencia de asistencia.

 

----
### Tecnologías utilizadas:
+ Frameworks:
  + NextJS
  + Tailwind CSS
  + React
+ Lenguaje: TypeScript
+ Librerías:
  + React Icons 5.3.0
  + React Hot Toast 2.4.1
  + Formik 2.4.6
  + Mercado Pago SDK React 0.0.19
  + Google Maps API 2.19.3
+ Manejo de imágenes: Cloudinary
+ Deployment: Vercel


----
### Documentación:<p>
Para ver nuestra documentación de Swagger  [haz click aquí!](https://web-ft-52-back-1.onrender.com/documentation "Heading link") <br>
Para ver nuestro repositorio de Back-end [haz click aquí!](https://github.com/CardoneLeandro/WEB-FT-52-BACK/tree/development "Heading link")
</p>

----
### Autores:
- [Felipe Sanchez](https://github.com/felipesdiseno "Heading link") 
- [Matías Lor](https://github.com/LorMatias "Heading link")
- [Rodrigo Fernandez](https://github.com/RodrigoFernandez26 "Heading link") 
