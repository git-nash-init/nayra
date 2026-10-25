import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
  asAnchor?: boolean;
  href?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  className = '',
  asAnchor,
  href,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium uppercase tracking-wider transition-all duration-300 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas-base cursor-pointer select-none';

  const sizeStyles = {
    sm: 'text-xs px-4 py-2 gap-2 min-h-[36px]',
    md: 'text-xs sm:text-sm px-6 py-3 gap-2.5 min-h-[44px]',
    lg: 'text-sm sm:text-base px-8 py-4 gap-3 min-h-[52px]',
  }[size];

  const variantStyles = {
    primary: 'border border-accent text-white bg-accent/10 hover:bg-accent hover:text-black hover:shadow-[0_0_24px_rgba(255,73,37,0.35)] active:scale-[0.98]',
    secondary: 'border border-white/15 text-muted-light bg-white/[0.03] hover:bg-white/10 hover:text-white hover:border-white/30 active:scale-[0.98]',
    outline: 'border border-white/20 text-white bg-transparent hover:bg-white/5 hover:border-white/40',
    ghost: 'text-muted hover:text-white bg-transparent hover:bg-white/[0.04] border-transparent',
  }[variant];

  const fullClassName = `${baseStyles} ${sizeStyles} ${variantStyles} ${className}`;

  if (asAnchor && href) {
    return (
      <a href={href} className={fullClassName}>
        <span>{children}</span>
        {icon && <span className="transition-transform group-hover:translate-x-0.5">{icon}</span>}
      </a>
    );
  }

  return (
    <button className={fullClassName} {...props}>
      <span>{children}</span>
      {icon && <span className="transition-transform group-hover:translate-x-0.5">{icon}</span>}
    </button>
  );
};
