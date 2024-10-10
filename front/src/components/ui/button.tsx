import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'text-white bg-blue-500 hover:bg-blue-600 transition-colors duration-300',
        destructive:
          'border bg-transparent text-red-500 border-red-500 hover:bg-red-500 hover:text-white transition-colors duration-300',
        outline:
          'bg-transparent text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white transition-colors duration-300',
        secondary:
          ' bg-red-500 text-white hover:bg-red-600 transition-colors duration-300',
        disabled: 'bg-gray-400 text-white cursor-default',
        black: 'border border-gray-500 bg-white text-gray-500 cursor-pointer',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        constructive:
          'bg-transparent text-green-600 border border-green-600 hover:bg-green-500 border-green-500 hover:text-white transition-colors duration-300',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
