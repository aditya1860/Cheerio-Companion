import React from 'react';

const VARIANTS = {
  APPROVED: {
    bg: 'bg-success-light',
    text: 'text-success',
    border: 'border-success/20',
    dot: 'bg-success',
    label: 'Approved',
  },
  PENDING: {
    bg: 'bg-warning-light',
    text: 'text-warning',
    border: 'border-warning/20',
    dot: 'bg-warning',
    label: 'Pending',
  },
  REJECTED: {
    bg: 'bg-error-light',
    text: 'text-error',
    border: 'border-error/20',
    dot: 'bg-error pulse-dot',
    label: 'Rejected',
  },
};

export default function Badge({ status, className = '' }) {
  const variant = VARIANTS[status] || VARIANTS.PENDING;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-600 border ${variant.bg} ${variant.text} ${variant.border} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${variant.dot}`} />
      {variant.label}
    </span>
  );
}
