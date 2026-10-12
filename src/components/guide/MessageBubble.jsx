import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ThumbsUp, ThumbsDown, Sparkles } from 'lucide-react';

export default function MessageBubble({ message, isGuide = false, delay = 0 }) {
  const [helpful, setHelpful] = useState(null);

  const handleHelpful = (val) => {
    if (helpful === null) setHelpful(val);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay, ease: 'easeOut' }}
      className={`flex ${isGuide ? 'justify-start' : 'justify-end'} mb-1`}
    >
      <div className="max-w-[88%]">
        {isGuide && (
          <div className="flex items-center gap-1.5 mb-1">
            <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <span className="text-[11px] font-semibold text-primary">Cheerio Guide</span>
          </div>
        )}

        {isGuide ? (
          <div
            className="px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap bg-white border border-border rounded-tl-sm text-text-primary shadow-sm"
            style={{ wordBreak: 'break-word' }}
            dangerouslySetInnerHTML={{
              __html: message.text
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\n/g, '<br/>'),
            }}
          />
        ) : (
          <div
            className="px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap bg-primary text-white rounded-tr-sm"
            style={{ wordBreak: 'break-word' }}
          >
            {message.text}
          </div>
        )}

        {/* Thumbs feedback for guide messages */}
        {isGuide && message.showFeedback !== false && (
          <div className="flex items-center gap-2 mt-1.5 ml-1">
            <span className="text-[10px] text-text-muted">Helpful?</span>
            <button
              onClick={() => handleHelpful(true)}
              className={`w-6 h-6 flex items-center justify-center rounded-full transition-colors ${
                helpful === true
                  ? 'bg-success-light text-success'
                  : 'hover:bg-surface text-text-muted'
              }`}
              aria-label="Mark as helpful"
            >
              <ThumbsUp className="w-3 h-3" />
            </button>
            <button
              onClick={() => handleHelpful(false)}
              className={`w-6 h-6 flex items-center justify-center rounded-full transition-colors ${
                helpful === false
                  ? 'bg-error-light text-error'
                  : 'hover:bg-surface text-text-muted'
              }`}
              aria-label="Mark as not helpful"
            >
              <ThumbsDown className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
