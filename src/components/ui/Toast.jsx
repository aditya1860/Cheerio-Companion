import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';

const TYPE_CONFIG = {
  success: {
    bg: 'bg-success-light border-success/30',
    icon: <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />,
    bar: 'bg-success',
    text: 'text-success',
  },
  error: {
    bg: 'bg-error-light border-error/30',
    icon: <AlertCircle className="w-4 h-4 text-error flex-shrink-0" />,
    bar: 'bg-error',
    text: 'text-error',
  },
  warning: {
    bg: 'bg-warning-light border-warning/30',
    icon: <AlertTriangle className="w-4 h-4 text-warning flex-shrink-0" />,
    bar: 'bg-warning',
    text: 'text-warning',
  },
  info: {
    bg: 'bg-info-light border-info/30',
    icon: <Info className="w-4 h-4 text-info flex-shrink-0" />,
    bar: 'bg-info',
    text: 'text-info',
  },
};

export default function Toast({ message, type = 'info', onDismiss, action, actionLabel }) {
  const cfg = TYPE_CONFIG[type] || TYPE_CONFIG.info;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.96 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`relative overflow-hidden rounded-lg border shadow-md w-72 max-w-[calc(100vw-32px)] ${cfg.bg}`}
      role="alert"
    >
      <div className="flex items-start gap-3 px-4 py-3">
        {cfg.icon}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-text-primary leading-snug">{message}</p>
          {action && actionLabel && (
            <button
              onClick={action}
              className={`mt-1 text-xs font-semibold underline underline-offset-2 ${cfg.text}`}
            >
              {actionLabel}
            </button>
          )}
        </div>
        <button
          onClick={onDismiss}
          className="flex-shrink-0 text-text-muted hover:text-text-primary transition-colors p-0.5 rounded"
          aria-label="Dismiss notification"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
      {/* Progress bar */}
      <div className="h-0.5 bg-black/5 absolute bottom-0 left-0 right-0">
        <div className={`h-full toast-progress ${cfg.bar} opacity-60`} />
      </div>
    </motion.div>
  );
}
