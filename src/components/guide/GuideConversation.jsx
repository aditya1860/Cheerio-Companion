import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGuide } from '../../context/GuideContext';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';

const MESSAGES = [
  {
    id: 1,
    isGuide: true,
    text: "Hi Riya! I can see that your template **diwali_offer_v1** was rejected by Meta. Don't worry — this happens often and is fixable! 😊",
    delay: 0,
  },
  {
    id: 2,
    isGuide: true,
    text: "Here's what went wrong: You submitted a **promotional discount** (30% off + coupon code) inside a **Utility** template. Meta only allows service-style content there — things like order confirmations or shipping updates. The fix is simple: we move it to the **Marketing** category, which is made for offers like yours.",
    delay: 0.15,
  },
];

function RejectionDetailsCard({ template, onShowFix }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: 0.3 }}
      className="mx-0 mb-3"
    >
      <div className="bg-error-light border border-error/25 rounded-xl p-4">
        <p className="text-xs font-bold text-error uppercase tracking-wide mb-2.5">Rejection Details</p>
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <span className="text-xs text-text-muted flex-shrink-0">Template</span>
            <span className="text-xs font-semibold text-text-primary font-mono">{template?.name}</span>
          </div>
          <div className="flex items-start justify-between gap-2">
            <span className="text-xs text-text-muted flex-shrink-0">Code</span>
            <span className="text-xs font-semibold text-error font-mono">{template?.rejectionCode}</span>
          </div>
          <div className="flex items-start justify-between gap-2">
            <span className="text-xs text-text-muted flex-shrink-0">Category</span>
            <span className="text-xs font-semibold text-text-primary">
              {template?.category} → should be {template?.suggestedCategory}
            </span>
          </div>
          <div className="pt-1">
            <p className="text-xs text-text-secondary leading-snug">{template?.rejectionReason}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function GuideConversation() {
  const { activeTemplate, setView, demoMode } = useGuide();
  const [visibleMsgs, setVisibleMsgs] = useState([]);
  const [showTyping, setShowTyping] = useState(true);
  const [showCard, setShowCard] = useState(false);
  const [showChips, setShowChips] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    const timers = [];

    setVisibleMsgs([]);
    setShowTyping(true);
    setShowCard(false);
    setShowChips(false);

    // Show messages one by one
    timers.push(
      setTimeout(() => {
        if (cancelled) return;
        setShowTyping(false);
        setVisibleMsgs([MESSAGES[0]]);
        setShowTyping(true);
      }, 800),
    );

    timers.push(
      setTimeout(() => {
        if (cancelled) return;
        setShowTyping(false);
        setVisibleMsgs(MESSAGES);
        setShowTyping(true);
      }, 1800),
    );

    timers.push(
      setTimeout(() => {
        if (cancelled) return;
        setShowTyping(false);
        setShowCard(true);
        setShowChips(true);
      }, 2600),
    );

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [visibleMsgs, showCard, showChips, showTyping]);

  const handleChip = (chip) => {
    if (chip === 'fix') setView('FIX_COMPARISON');
    if (chip === 'human') setView('HUMAN_HANDOFF');
    if (chip === 'diff') {
      // Show a brief explanation then fix
      setView('FIX_COMPARISON');
    }
  };

  return (
    <div className="flex flex-col gap-2 px-4 pt-3 pb-2">
      <AnimatePresence>
        {visibleMsgs.map((msg, i) => (
          <MessageBubble key={msg.id} message={msg} isGuide={msg.isGuide} delay={0} />
        ))}
      </AnimatePresence>

      {showTyping && !showChips && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="pl-1"
        >
          <TypingIndicator />
        </motion.div>
      )}

      {showCard && activeTemplate && (
        <RejectionDetailsCard template={activeTemplate} onShowFix={() => setView('FIX_COMPARISON')} />
      )}

      {showChips && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="flex flex-wrap gap-2 mt-1"
        >
          <button
            onClick={() => handleChip('fix')}
            className="px-3 py-2 bg-primary text-white text-xs font-semibold rounded-full hover:bg-primary-light transition-colors min-h-[36px]"
          >
            Show me the fix 👀
          </button>
          <button
            onClick={() => handleChip('diff')}
            className="px-3 py-2 bg-white border border-border text-xs font-semibold text-text-primary rounded-full hover:bg-surface transition-colors min-h-[36px]"
          >
            What's the difference?
          </button>
          <button
            onClick={() => handleChip('human')}
            className="px-3 py-2 bg-white border border-border text-xs font-semibold text-text-secondary rounded-full hover:bg-surface transition-colors min-h-[36px]"
          >
            Talk to a human
          </button>
        </motion.div>
      )}

      <div ref={bottomRef} className="h-1" />
    </div>
  );
}
