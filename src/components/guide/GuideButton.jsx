import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, HelpCircle } from 'lucide-react';
import { useGuide } from '../../context/GuideContext';
import { templates } from '../../data/mockData';

export default function GuideButton() {
  const { openGuide, isOpen, demoMode, showToast } = useGuide();

  const handleClick = () => {
    if (demoMode === 'OFFLINE') {
      showToast("You're offline. Check your connection and try again.", 'error');
      return;
    }
    if (!isOpen) {
      const diwaliTemplate = templates.find((t) => t.id === 'diwali_offer_v1');
      openGuide(demoMode ? null : diwaliTemplate);
    }
  };

  if (isOpen) return null;

  return (
    <motion.button
      onClick={handleClick}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25, delay: 0.3 }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-primary text-white px-4 py-3 rounded-full shadow-guide font-semibold text-sm min-h-[52px] transition-shadow hover:shadow-lg"
      aria-label="Open Cheerio Guide"
    >
      <div className="relative">
        <Sparkles className="w-4.5 h-4.5" />
        <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full animate-pulse" />
      </div>
      <span>Cheerio Guide</span>
    </motion.button>
  );
}
