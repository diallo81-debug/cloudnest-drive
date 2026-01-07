import { Cloud } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: 'h-6 w-6',
  md: 'h-8 w-8',
  lg: 'h-10 w-10',
};

const textSizeClasses = {
  sm: 'text-lg',
  md: 'text-xl',
  lg: 'text-2xl',
};

export function Logo({ size = 'md', showText = true, className }: LogoProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="relative">
        <div className="absolute inset-0 gradient-primary rounded-lg blur-sm opacity-50" />
        <div className="relative gradient-primary rounded-lg p-1.5">
          <Cloud className={cn('text-primary-foreground', sizeClasses[size])} />
        </div>
      </div>
      {showText && (
        <span className={cn('font-bold gradient-text', textSizeClasses[size])}>
          CloudNest
        </span>
      )}
    </div>
  );
}
