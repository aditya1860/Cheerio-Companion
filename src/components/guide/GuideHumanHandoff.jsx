import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, MessageCircle, Phone, Mail, Clock, Copy, CheckCircle, Calendar } from 'lucide-react';
import { useGuide } from '../../context/GuideContext';
import { agentHandoff } from '../../data/mockData';
import Button from '../ui/Button';

const CALLBACK_SLOTS = [
  'Today, 6:00 PM IST',
  'Tomorrow, 10:00 AM IST',
  'Tomorrow, 2:00 PM IST',
];

export default function GuideHumanHandoff() {
  const { demoMode, showToast, activeTemplate } = useGuide();
  const isAfterHours = demoMode === 'AFTER_HOURS';
  const isNoPermission = demoMode === 'NO_PERMISSION';
  const [copied, setCopied] = useState(false);
  const [callbackBooked, setCallbackBooked] = useState(null);

  const adminMessage = `Hi, I need help fixing our WhatsApp template 'diwali_offer_v1'. It was rejected by Meta (INVALID_FORMAT) — promotional content in a Utility template. The AI suggested moving it to Marketing. Ticket ID: ${agentHandoff.ticketId}`;

  const copyAdminMessage = () => {
    navigator.clipboard.writeText(adminMessage).then(() => {
      setCopied(true);
      showToast('Message copied to clipboard!', 'success');
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (isNoPermission) {
    return (
      <div className="px-4 pt-3 pb-6 space-y-4">
        <div className="flex flex-col items-center text-center py-2">
          <div className="w-12 h-12 rounded-full bg-warning-light flex items-center justify-center mb-3">
            <Users className="w-6 h-6 text-warning" />
          </div>
          <h3 className="text-sm font-bold text-text-primary">Admin action required 🔒</h3>
          <p className="text-xs text-text-secondary mt-1.5 max-w-xs">
            Only admins can submit templates for Meta review. Share this fix with your account admin.
          </p>
        </div>

        <div className="bg-surface border border-border rounded-xl p-4">
          <p className="text-xs font-semibold text-text-primary mb-2">Pre-written message for your admin:</p>
          <div className="bg-white border border-border rounded-lg p-3">
            <p className="text-xs text-text-secondary leading-relaxed">{adminMessage}</p>
          </div>
          <button
            onClick={copyAdminMessage}
            className="mt-3 w-full flex items-center justify-center gap-2 px-3 py-2.5 bg-primary/5 hover:bg-primary/10 border border-primary/20 rounded-lg text-xs font-semibold text-primary transition-colors"
          >
            {copied ? <CheckCircle className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied!' : 'Copy message'}
          </button>
        </div>

        <div className="border-t border-border pt-3">
          <p className="text-[10px] text-text-muted text-center">Ticket ID: {agentHandoff.ticketId}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 pt-3 pb-6 space-y-5">
      {/* Hero */}
      <div className="flex flex-col items-center text-center py-2">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3"
        >
          <Users className="w-6 h-6 text-primary" />
        </motion.div>
        <h3 className="text-sm font-bold text-text-primary">Bringing in a teammate 👥</h3>
        <p className="text-xs text-text-secondary mt-1.5 max-w-xs mx-auto">
          No worries — I'm connecting you with our support team. They'll already know your situation so you don't have to repeat anything.
        </p>
      </div>

      {/* Context summary */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-success-light border border-success/25 rounded-xl p-4 space-y-2.5"
      >
        <p className="text-[10px] font-bold text-success uppercase tracking-wide mb-2">
          Context shared with agent
        </p>
        <div className="space-y-1.5 text-xs">
          <div className="flex items-start gap-2">
            <span className="text-text-muted flex-shrink-0 w-16">User</span>
            <span className="text-text-primary font-medium">{agentHandoff.contextSummary.user}</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-text-muted flex-shrink-0 w-16">Plan</span>
            <span className="text-text-primary">{agentHandoff.contextSummary.plan}</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-text-muted flex-shrink-0 w-16">Issue</span>
            <span className="text-text-primary">{agentHandoff.contextSummary.issue}</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-text-muted flex-shrink-0 w-16">Tried</span>
            <ul className="text-text-primary space-y-0.5">
              {agentHandoff.contextSummary.stepsTried.map((s, i) => (
                <li key={i}>• {s}</li>
              ))}
            </ul>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-text-muted flex-shrink-0 w-16">AI says</span>
            <span className="text-text-secondary italic">{agentHandoff.contextSummary.aiDiagnosis}</span>
          </div>
        </div>
        <div className="pt-1.5 border-t border-success/20">
          <p className="text-[10px] text-text-muted">Ticket ID: <strong className="font-mono text-text-primary">{agentHandoff.ticketId}</strong></p>
        </div>
      </motion.div>

      {/* After hours or available */}
      {isAfterHours ? (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <div className="flex items-start gap-2.5 bg-warning-light border border-warning/25 rounded-xl p-4">
            <Clock className="w-4 h-4 text-warning flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-warning">Our team is offline right now</p>
              <p className="text-xs text-text-secondary mt-0.5">Available Mon–Sat, 9am–7pm IST. It's currently after hours.</p>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-text-primary mb-2.5">📅 Book a callback:</p>
            <div className="space-y-2">
              {CALLBACK_SLOTS.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setCallbackBooked(slot)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg border text-xs font-medium transition-all ${
                    callbackBooked === slot
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white text-text-primary border-border hover:border-primary/40 hover:bg-primary/5'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5" />
                    {slot}
                  </span>
                  {callbackBooked === slot && <CheckCircle className="w-4 h-4" />}
                </button>
              ))}
            </div>
            {callbackBooked && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-success font-medium mt-2.5 text-center"
              >
                ✅ Callback booked for {callbackBooked}. Ticket: {agentHandoff.ticketId}
              </motion.p>
            )}
          </div>

          <button
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-border rounded-lg text-xs font-medium text-text-primary hover:bg-surface transition-colors"
            onClick={() => showToast('Email sent to support@cheerio.in', 'success')}
          >
            <Mail className="w-4 h-4" />
            Email us instead
          </button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-2"
        >
          {/* Agent info */}
          <div className="flex items-center gap-3 bg-white border border-border rounded-xl p-3.5">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
              {agentHandoff.agentAvatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-text-primary">{agentHandoff.agentName}</p>
              <p className="text-xs text-text-muted">Est. wait: {agentHandoff.estimatedWait}</p>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-[10px] text-success font-medium">Online</span>
            </div>
          </div>

          <Button
            variant="primary"
            size="md"
            className="w-full"
            icon={<MessageCircle className="w-4 h-4" />}
            onClick={() => showToast('Live chat opening… (~8 min wait)', 'info')}
          >
            Chat now — ~8 min wait
          </Button>
          <Button
            variant="outline"
            size="md"
            className="w-full"
            icon={<Phone className="w-4 h-4" />}
            onClick={() => showToast('Not part of this prototype', 'info')}
          >
            Schedule a callback
          </Button>
          <Button
            variant="ghost"
            size="md"
            className="w-full"
            icon={<Mail className="w-4 h-4" />}
            onClick={() => showToast('Email sent to support@cheerio.in', 'success')}
          >
            Email us
          </Button>
        </motion.div>
      )}
    </div>
  );
}
