// components/ui/badge.tsx
import { cn } from '@/lib/utils';
import React from 'react';

export function Badge({
  className,
  variant = 'default',
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { variant?: 'default' | 'secondary' | 'outline' }) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors',
        {
          'bg-primary text-primary-foreground': variant === 'default',
          'bg-secondary text-secondary-foreground': variant === 'secondary',
          'border border-input': variant === 'outline',
        },
        className
      )}
      {...props}
    />
  );
}
