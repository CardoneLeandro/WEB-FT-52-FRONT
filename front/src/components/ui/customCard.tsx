import * as React from "react";
import Image from "next/image";
import * as cruz from "@/public/images/cruz.jpeg";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Label } from "@/src/components/ui/label";

export function CustomCard() {
  return (
    <Card className="w-[400px] mx-auto ">
      <CardContent>
        <form>
          <div className="grid w-full items-start gap-4">
            <div className="flex">
              <div className="flex-shrink-0 mr-4">
                <Image
                  src={cruz}
                  alt="Event image"
                  width={100}
                  height={100}
                  className="rounded-lg object-cover"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1.5 font-thin mt-4"> 
                  <Label htmlFor="name">Nombre del evento:</Label>
                </div>

                <div className="flex flex-col space-y-3 font-semibold mt-4"> 
                  <Label htmlFor="date">Fecha:</Label>
                </div>

                <div className="flex flex-col space-y-1.5 font-semibold">
                  <Label htmlFor="location">Lugar:</Label>
                </div>
                <div className="flex flex-col space-y-1.5 font-semibold">
                  <Label htmlFor="location">Costo:</Label>
                </div>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Ver detalles</Button>
        <Button variant="outline">Sacar entrada</Button>
      </CardFooter>
    </Card>
  );
}
