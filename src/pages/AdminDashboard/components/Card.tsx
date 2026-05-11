import { ReactNode, HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  glow?: boolean;
}

export function Card({ children, className = '', glow = false, ...props }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm ${
        glow ? 'shadow-lg shadow-emerald-500/5' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
