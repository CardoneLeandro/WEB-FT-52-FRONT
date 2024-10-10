'use client';

import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const PasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .matches(/[A-Z]/, 'Debe contener al menos una letra mayúscula')
    .matches(/[0-9]/, 'Debe contener al menos un número')
    .required('La contraseña es requerida'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
    .required('La confirmación de contraseña es requerida'),
});

export default function CambioContrasena() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Cambiar Contraseña</CardTitle>
        <CardDescription>
          Ingresa tu nueva contraseña y confírmala
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Formik
          initialValues={{ password: '', confirmPassword: '' }}
          validationSchema={PasswordSchema}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ errors, touched }) => (
            <Form className="space-y-4">
              <div>
                <Label htmlFor="password">Nueva Contraseña</Label>
                <div className="relative">
                  <Field
                    as={Input}
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    className={
                      errors.password && touched.password
                        ? 'border-red-500'
                        : ''
                    }
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </button>
                </div>
                {errors.password && touched.password && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.password}
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                <div className="relative">
                  <Field
                    as={Input}
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    className={
                      errors.confirmPassword && touched.confirmPassword
                        ? 'border-red-500'
                        : ''
                    }
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword}
                  </div>
                )}
              </div>

              <Button type="submit" className="w-full">
                Cambiar Contraseña
              </Button>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
}
