import React from 'react';
import { motion } from 'framer-motion';

export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3 bg-white border border-border rounded-2xl rounded-tl-sm w-fit shadow-sm">
      <span className="w-2 h-2 rounded-full bg-text-muted typing-dot" />
      <span className="w-2 h-2 rounded-full bg-text-muted typing-dot" />
      <span className="w-2 h-2 rounded-full bg-text-muted typing-dot" />
    </div>
  );
}
