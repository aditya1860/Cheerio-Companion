import React from 'react';

const VARIANTS = {
  primary: 'bg-primary text-white hover:bg-primary-light active:bg-primary-dark border-transparent',
  secondary: 'bg-transparent text-primary border-primary hover:bg-primary/5',
  danger: 'bg-transparent text-error border-transparent hover:bg-error-light',
  ghost: 'bg-transparent text-text-secondary border-transparent hover:bg-surface',
  outline: 'bg-white text-text-primary border-border hover:bg-surface',
};

const SIZES = {
  sm: 'text-xs px-3 py-1.5 min-h-[36px] rounded-md',
  md: 'text-sm px-4 py-2.5 min-h-[44px] rounded-md',
  lg: 'text-base px-6 py-3 min-h-[48px] rounded-lg',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  icon,
  iconEnd,
  ...props
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center gap-2
        font-semibold border transition-all duration-200
        focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        select-none
        ${VARIANTS[variant] || VARIANTS.primary}
        ${SIZES[size] || SIZES.md}
        ${className}
      `}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
      {iconEnd && <span className="flex-shrink-0">{iconEnd}</span>}
    </button>
  );
}
