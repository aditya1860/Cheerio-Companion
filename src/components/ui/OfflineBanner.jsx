import React from 'react';
import { WifiOff } from 'lucide-react';
import { motion } from 'framer-motion';

export default function OfflineBanner({ visible }) {
  if (!visible) return null;
  return (
    <motion.div
      initial={{ y: -48, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -48, opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="bg-error text-white flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold w-full z-50"
      role="alert"
      aria-live="assertive"
    >
      <WifiOff className="w-4 h-4 flex-shrink-0" />
      <span>No internet connection. Changes will sync when you're back online.</span>
    </motion.div>
  );
}
