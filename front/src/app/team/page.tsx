import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { IoLogoGithub } from 'react-icons/io5';
import Link from 'next/link';

const developers = [
  {
    name: 'Leandro Cardone',
    role: 'Backend',
    github: 'https://github.com/CardoneLeandro',
  },
  {
    name: 'Fernando Campellone',
    role: 'Backend',
    github: 'https://github.com/FernandoCampellone',
  },
  {
    name: 'santiago Gamma',
    role: 'Backend',
    github: 'https://github.com/Gamma1404',
  },
  {
    name: 'Rodrigo Fernandez',
    role: 'Frontend',
    github: 'https://github.com/RodrigoFernandez26',
  },
  {
    name: 'Matias Lor',
    role: 'Frontend',
    github: 'https://github.com/LorMatias',
  },
  {
    name: 'Felipe Sanchez',
    role: 'Frontend',
    github: 'https://github.com/felipesdiseno',
  },
];

export default function TeamPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl text-gray-500 font-bold mb-8 text-center">
        Los creadores digitales de nuestra comunidad
      </h1>
      <div>
        <p className="text-lg text-gray-500  text-justify">
          Cada uno de nosotros tiene talentos únicos. Nuestro equipo de
          desarrollo web usa sus habilidades para construir puentes digitales
          que nos conectan a todos.
        </p>
        <p className="text-lg text-gray-500 mb-6 text-justify">
          Con pasión, dedicación y creatividad, estos jóvenes trabajan
          incansablemente para crear espacios virtuales donde podemos compartir,
          crecer y fortalecer nuestros lazos comunitarios.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-gray-500">
              Arquitectos de Nuestra Plataforma
            </CardTitle>

            <CardDescription className="text-gray-500">
              Nuestro equipo de Backend: Construyendo bases sólidas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-6 text-gray-500">
              Como los cimientos de un rascacielos, nuestro equipo de backend
              construye la estructura que sostiene nuestra presencia digital.
              Ellos se aseguran de que nuestra comunidad en línea sea segura,
              confiable y capaz de crecer. Su trabajo, aunque invisible a simple
              vista, es fundamental para mantener unida y funcionando nuestra
              plataforma.
            </p>
            <div className="space-y-4">
              {developers
                .filter((dev) => dev.role === 'Backend')
                .map((dev, index) => (
                  <DeveloperCard key={index} {...dev} />
                ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-gray-500">
              Diseñadores de Experiencias
            </CardTitle>
            <CardDescription>
              Nuestro equipo de Frontend: Creando interfaces acogedoras para
              todos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-6 text-gray-500">
              Al igual que los artistas que crean murales impresionantes,
              nuestro equipo de frontend diseñan experiencias visuales
              cautivadoras en cada página de nuestro sitio. Con dedicación y
              pasión, reflejan la calidez y energía de nuestra comunidad,
              haciendo que cada visitante se sienta bienvenido desde el primer
              clic.
            </p>
            <div className="space-y-4">
              {developers
                .filter((dev) => dev.role === 'Frontend')
                .map((dev, index) => (
                  <DeveloperCard key={index} {...dev} />
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function DeveloperCard({ name, github }) {
  return (
    <div className="flex items-center space-x-4 p-2 rounded-lg hover:bg-secondary transition-colors">
      <Avatar>
        <AvatarImage
          src={`https://github.com/${github.split('/').pop()}.png`}
          alt={name}
        />
        <AvatarFallback>
          {name
            .split(' ')
            .map((n) => n[0])
            .join('')}
        </AvatarFallback>
      </Avatar>
      <div className="flex-grow">
        <h3 className="font-semibold">{name}</h3>
      </div>
      <Button variant="outline" size="sm" asChild>
        <Link href={github} target="_blank" rel="noopener noreferrer">
          <IoLogoGithub className="mr-2 h-4 w-4" />
          Ver perfil
        </Link>
      </Button>
    </div>
  );
}
