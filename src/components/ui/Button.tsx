import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'solid' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  asAnchor?: boolean;
  href?: string;
}

/**
 * Couture button: sharp rectangle, hairline champagne border, tracked small caps.
 * Hover only changes colour; nothing moves, scales or glows.
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  asAnchor,
  href,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-sans font-normal uppercase transition-colors duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-canvas-base cursor-pointer select-none';

  // The text-link variant carries no horizontal padding so it aligns with surrounding copy
  const isLink = variant === 'secondary';

  const sizeStyles = {
    sm: `text-[11px] tracking-[0.24em] py-2.5 min-h-[40px] ${isLink ? '' : 'px-5'}`,
    md: `text-[11px] sm:text-xs tracking-[0.26em] py-3.5 min-h-[48px] ${isLink ? '' : 'px-7'}`,
    lg: `text-xs sm:text-[13px] tracking-[0.18em] sm:tracking-[0.28em] py-4 min-h-[56px] ${isLink ? '' : 'px-6 sm:px-10'}`,
  }[size];

  const variantStyles = {
    primary: 'border border-accent text-accent-light bg-transparent hover:bg-accent hover:text-black',
    solid: 'border border-accent bg-accent text-black hover:bg-accent-light hover:border-accent-light',
    secondary: 'text-muted-light underline decoration-hairline underline-offset-8 hover:text-accent-light hover:decoration-accent',
    outline: 'border border-hairline text-white bg-transparent hover:border-accent hover:text-accent-light',
    ghost: 'text-muted hover:text-white bg-transparent border-transparent',
  }[variant];

  const fullClassName = `${baseStyles} ${sizeStyles} ${variantStyles} ${className}`;

  if (asAnchor && href) {
    return (
      <a href={href} className={fullClassName}>
        {children}
      </a>
    );
  }

  return (
    <button className={fullClassName} {...props}>
      {children}
    </button>
  );
};
