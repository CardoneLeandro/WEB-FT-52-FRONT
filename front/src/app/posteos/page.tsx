import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { ThumbsUp, MessageCircle, Share2 } from 'lucide-react';

export default function TarjetaPublicacion({
  autorNombre = 'Líder Juvenil',
  autorAvatar = '/placeholder.svg?height=40&width=40',
  fecha = 'Hace 2 horas',
  contenido = '¡Recordatorio! Este sábado tenemos nuestro encuentro mensual. No olviden traer sus Biblias y una merienda para compartir. ¡Los esperamos a todos!',
  imagenUrl = '',
}) {
  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarImage src={autorAvatar} alt={autorNombre} />
          <AvatarFallback>{autorNombre.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-semibold">{autorNombre}</span>
          <span className="text-sm text-muted-foreground">{fecha}</span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{contenido}</p>
        {imagenUrl && (
          <img
            src={imagenUrl}
            alt="Imagen de la publicación"
            className="w-full h-auto rounded-md"
          />
        )}
      </CardContent>
    </Card>
  );
}
