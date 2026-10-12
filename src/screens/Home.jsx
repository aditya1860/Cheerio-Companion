import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Megaphone,
  FileText,
  Users,
  CreditCard,
  AlertTriangle,
  AlertCircle,
  Info,
  CheckCircle,
  Calendar,
  GitBranch,
  XCircle,
} from 'lucide-react';
import { useGuide } from '../context/GuideContext';
import { nudges, recentActivity, templates } from '../data/mockData';

const STAT_CARDS = [
  { label: 'Active Campaigns', value: '3', icon: Megaphone, color: '#0369A1', bg: '#EFF6FF' },
  { label: 'Templates Approved', value: '4/6', icon: FileText, color: '#16A34A', bg: '#F0FDF4' },
  { label: 'WhatsApp Contacts', value: '12,847', icon: Users, color: '#0A7B6B', bg: '#F0FDF4' },
  { label: 'Credits Remaining', value: '₹2,340', icon: CreditCard, color: '#D97706', bg: '#FFFBEB' },
];

const NUDGE_ICONS = {
  warning: AlertTriangle,
  error: AlertCircle,
  info: Info,
};

const NUDGE_STYLES = {
  warning: {
    bg: 'bg-warning-light border-warning/30',
    icon: 'text-warning',
    btn: 'bg-warning text-white hover:bg-warning/90',
    text: 'text-warning',
  },
  error: {
    bg: 'bg-error-light border-error/30',
    icon: 'text-error',
    btn: 'bg-error text-white hover:bg-error/90',
    text: 'text-error',
  },
  info: {
    bg: 'bg-info-light border-info/30',
    icon: 'text-info',
    btn: 'bg-info text-white hover:bg-info/90',
    text: 'text-info',
  },
};

const ACTIVITY_ICONS = {
  XCircle,
  Calendar,
  Users,
  CheckCircle,
  GitBranch,
};

export default function Home() {
  const navigate = useNavigate();
  const { openGuide, showToast } = useGuide();
  const diwaliTemplate = templates.find((t) => t.id === 'diwali_offer_v1');

  const handleNudgeCta = (nudge) => {
    if (nudge.id === 'template-rejected') {
      navigate('/templates');
      setTimeout(() => openGuide(diwaliTemplate), 200);
    } else {
      showToast('Not part of this prototype', 'info');
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-6">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-xl md:text-2xl font-bold text-text-primary">
          Good evening, Riya 👋
        </h2>
        <p className="text-sm text-text-secondary mt-1">
          Mon, 12 Oct 2026 · 5:13 PM IST · Glow by Riya
        </p>
      </motion.div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {STAT_CARDS.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="card p-4 space-y-3"
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: stat.bg }}
              >
                <Icon className="w-4.5 h-4.5" style={{ color: stat.color }} />
              </div>
              <div>
                <p className="text-xl font-bold text-text-primary">{stat.value}</p>
                <p className="text-xs text-text-muted mt-0.5">{stat.label}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Nudge cards */}
      <div className="space-y-2.5">
        <h3 className="text-sm font-bold text-text-primary">Action needed</h3>
        {nudges.map((nudge, i) => {
          const Icon = NUDGE_ICONS[nudge.type] || Info;
          const style = NUDGE_STYLES[nudge.type] || NUDGE_STYLES.info;
          const isRejected = nudge.id === 'template-rejected';

          return (
            <motion.div
              key={nudge.id}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              className={`flex items-center justify-between gap-4 p-3.5 rounded-xl border ${style.bg} ${
                isRejected ? 'ring-1 ring-error/30' : ''
              }`}
            >
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <Icon className={`w-4 h-4 flex-shrink-0 mt-0.5 ${style.icon}`} />
                <p className={`text-sm font-medium leading-snug ${isRejected ? 'text-error' : 'text-text-primary'}`}>
                  {nudge.message}
                </p>
              </div>
              <button
                onClick={() => handleNudgeCta(nudge)}
                className={`flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors min-h-[32px] ${style.btn}`}
              >
                {nudge.cta}
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Recent activity */}
      <div className="card overflow-hidden">
        <div className="px-4 py-3 border-b border-border">
          <h3 className="text-sm font-bold text-text-primary">Recent activity</h3>
        </div>
        <ul className="divide-y divide-border">
          {recentActivity.map((item, i) => {
            const Icon = ACTIVITY_ICONS[item.icon] || Info;
            return (
              <motion.li
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 + i * 0.06 }}
                className="flex items-center gap-3 px-4 py-3 hover:bg-surface transition-colors"
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: `${item.color}18` }}
                >
                  <Icon className="w-3.5 h-3.5" style={{ color: item.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-text-primary truncate">{item.title}</p>
                </div>
                <span className="text-[10px] text-text-muted flex-shrink-0">{item.time}</span>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
