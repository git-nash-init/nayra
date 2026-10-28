import React from 'react';
import { useReveal } from '../../hooks/useReveal';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Delay in ms, for staggering siblings */
  delay?: number;
  /** Element to render, e.g. 'li' inside a list */
  as?: 'div' | 'li' | 'section' | 'figure';
}

export const Reveal: React.FC<RevealProps> = ({ children, className = '', delay = 0, as = 'div' }) => {
  const { ref, isVisible } = useReveal<HTMLElement>();
  const Tag = as as React.ElementType;
  return (
    <Tag
      ref={ref}
      className={`reveal ${isVisible ? 'is-visible' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
};
