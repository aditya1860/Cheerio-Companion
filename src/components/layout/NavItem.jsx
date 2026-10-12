import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useGuide } from '../../context/GuideContext';

export default function NavItem({ to, icon: Icon, label, isAdmin = false, isPrototype = false }) {
  const { showToast } = useGuide();
  const location = useLocation();

  if (isPrototype) {
    return (
      <button
        onClick={() => showToast('Not part of this prototype', 'info')}
        className={`
          w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium
          text-text-secondary hover:text-text-primary hover:bg-surface
          transition-all duration-150 min-h-[44px] text-left
          ${isAdmin ? 'mt-auto' : ''}
        `}
        aria-label={label}
      >
        {Icon && <Icon className="w-4 h-4 flex-shrink-0" />}
        <span className="hidden md:block truncate">{label}</span>
      </button>
    );
  }

  return (
    <NavLink
      to={to}
      className={({ isActive }) => `
        flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium
        transition-all duration-150 min-h-[44px]
        ${
          isActive
            ? 'bg-primary/10 text-primary font-semibold'
            : 'text-text-secondary hover:text-text-primary hover:bg-surface'
        }
        ${isAdmin ? 'mt-auto' : ''}
      `}
      aria-label={label}
    >
      {Icon && <Icon className="w-4 h-4 flex-shrink-0" />}
      <span className="hidden md:block truncate">{label}</span>
    </NavLink>
  );
}
