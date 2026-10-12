import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Bell, Calendar, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useGuide } from '../../context/GuideContext';
import Button from '../ui/Button';

export default function GuideSuccess() {
  const {
    setView,
    notifyPreference,
    setNotifyPreference,
    campaignScheduled,
    setCampaignScheduled,
    feedbackGiven,
    setFeedback,
    activeTemplate,
  } = useGuide();

  const [thankYou, setThankYou] = useState(false);

  const handleFeedback = (val) => {
    setFeedback(val);
    if (val === true) {
      setThankYou(true);
    } else {
      setView('HUMAN_HANDOFF');
    }
  };

  return (
    <div className="px-4 pt-4 pb-6 space-y-5">
      {/* Success hero */}
      <div className="flex flex-col items-center text-center py-2">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 350, damping: 18, delay: 0.1 }}
          className="w-16 h-16 rounded-full bg-success-light flex items-center justify-center mb-4"
        >
          <CheckCircle className="w-8 h-8 text-success" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-lg font-bold text-text-primary">Template submitted! 🎉</h2>
          <p className="text-sm text-text-secondary mt-1.5 max-w-xs mx-auto">
            Your fixed template is now with Meta for review.
          </p>
        </motion.div>
      </div>

      {/* Status card */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-success-light border border-success/25 rounded-xl p-4 space-y-2.5"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs text-text-muted">Status</span>
          <span className="text-xs font-semibold text-success bg-success-light px-2 py-0.5 rounded-full border border-success/20">
            ⏳ Under Review
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-text-muted">Typical approval time</span>
          <span className="text-xs font-medium text-text-primary">15 mins – 24 hrs</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-text-muted">Estimated by</span>
          <span className="text-xs font-semibold text-primary">Oct 13, 2026</span>
        </div>
        <div className="pt-1 border-t border-success/15">
          <p className="text-[11px] text-text-muted">
            Most Marketing templates in your language are approved within 24 hours.
          </p>
        </div>
      </motion.div>

      {/* Notify preference */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-surface border border-border rounded-xl p-3.5 space-y-2.5"
      >
        <div className="flex items-center gap-2 mb-1">
          <Bell className="w-4 h-4 text-primary" />
          <span className="text-xs font-semibold text-text-primary">Notify me when approved</span>
        </div>
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-xs text-text-secondary">WhatsApp (+91 98765 43210)</span>
          <button
            role="switch"
            aria-checked={notifyPreference.whatsapp}
            onClick={() => setNotifyPreference({ whatsapp: !notifyPreference.whatsapp })}
            className={`relative w-9 h-5 rounded-full transition-colors ${
              notifyPreference.whatsapp ? 'bg-primary' : 'bg-border'
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${
                notifyPreference.whatsapp ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>
        </label>
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-xs text-text-secondary">Email (riya@glowbyria.in)</span>
          <button
            role="switch"
            aria-checked={notifyPreference.email}
            onClick={() => setNotifyPreference({ email: !notifyPreference.email })}
            className={`relative w-9 h-5 rounded-full transition-colors ${
              notifyPreference.email ? 'bg-primary' : 'bg-border'
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${
                notifyPreference.email ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>
        </label>
      </motion.div>

      {/* Schedule campaign */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        {!campaignScheduled ? (
          <Button
            variant="outline"
            size="md"
            className="w-full"
            onClick={() => setCampaignScheduled(true)}
            icon={<Calendar className="w-4 h-4" />}
          >
            Schedule my Diwali campaign →
          </Button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-info-light border border-info/25 rounded-xl p-4 space-y-2"
          >
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-4 h-4 text-info" />
              <span className="text-xs font-bold text-info">Campaign Scheduled ✅</span>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed">
              Your Diwali campaign will <strong>auto-start</strong> once{' '}
              <code className="bg-white px-1 rounded text-[10px] font-mono">diwali_offer_v1</code> is approved.
            </p>
            <div className="pt-1.5 border-t border-info/15 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-text-muted">Audience</span>
                <span className="text-[11px] font-semibold text-text-primary">12,847 contacts</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-text-muted">Estimated send</span>
                <span className="text-[11px] font-semibold text-primary">Oct 13–14, 2026</span>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Feedback */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="border-t border-border pt-4"
      >
        {feedbackGiven === null ? (
          <div className="text-center space-y-3">
            <p className="text-xs font-semibold text-text-secondary">Did this solve your problem?</p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => handleFeedback(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-border hover:bg-success-light hover:border-success/30 hover:text-success text-text-secondary text-sm font-medium transition-all"
              >
                <ThumbsUp className="w-4 h-4" /> Yes
              </button>
              <button
                onClick={() => handleFeedback(false)}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-border hover:bg-error-light hover:border-error/30 hover:text-error text-text-secondary text-sm font-medium transition-all"
              >
                <ThumbsDown className="w-4 h-4" /> No
              </button>
            </div>
          </div>
        ) : feedbackGiven === true && thankYou ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-1"
          >
            <p className="text-2xl">🎊✨🎉</p>
            <p className="text-sm font-semibold text-success">Thank you, Riya!</p>
            <p className="text-xs text-text-muted">Happy Diwali from Team Cheerio! 🪔</p>
          </motion.div>
        ) : null}
      </motion.div>
    </div>
  );
}
