import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useGuide } from '../../context/GuideContext';
import Toast from './Toast';

export default function ToastContainer() {
  const { toast, dismissToast } = useGuide();

  return (
    <div
      className="fixed bottom-6 right-6 z-[200] flex flex-col gap-2"
      aria-live="polite"
      aria-atomic="true"
    >
      <AnimatePresence>
        {toast && (
          <Toast
            key={toast.message}
            message={toast.message}
            type={toast.type}
            onDismiss={dismissToast}
            action={toast.action}
            actionLabel={toast.actionLabel}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
