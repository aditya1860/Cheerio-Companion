import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown, Settings2, RotateCcw } from 'lucide-react';
import { useGuide } from './context/GuideContext';
import { templates } from './data/mockData';

const DEMO_MODES = [
  { id: null, label: 'Default', description: 'Full scenario flow', emoji: '✅' },
  { id: 'EMPTY', label: 'Empty', description: 'Help topics state', emoji: '🔍' },
  { id: 'LOADING', label: 'Loading', description: 'Skeleton + typing', emoji: '⏳' },
  { id: 'ERROR', label: 'Error', description: 'Submission fails', emoji: '❌' },
  { id: 'LOW_CONFIDENCE', label: 'Low Confidence', description: 'AI unsure', emoji: '🤔' },
  { id: 'REJECTED_AGAIN', label: 'Rejected Again', description: 'Re-escalate', emoji: '🔄' },
  { id: 'OFFLINE', label: 'Offline', description: 'No internet', emoji: '📵' },
  { id: 'NO_PERMISSION', label: 'No Permission', description: 'Non-admin', emoji: '🔒' },
  { id: 'AFTER_HOURS', label: 'After Hours', description: 'Team offline', emoji: '🌙' },
];

export default function DemoControls() {
  const { demoMode, setDemoMode, openGuide, closeGuide, resetGuide, showToast } = useGuide();
  const [expanded, setExpanded] = useState(false);

  const handleModeSelect = (mode) => {
    setDemoMode(mode);
    closeGuide();

    if (mode === null) {
      resetGuide();
      showToast('Reset to default state', 'success');
    } else {
      showToast(`Demo mode: ${mode || 'DEFAULT'}`, 'info');
    }
  };

  const handleOpenGuide = (mode) => {
    handleModeSelect(mode);
    const diwali = templates.find((t) => t.id === 'diwali_offer_v1');
    setTimeout(() => {
      openGuide(mode ? null : diwali);
    }, 100);
  };

  return (
    <div className="fixed bottom-6 left-4 z-[60] max-w-[280px]">
      {/* Toggle button */}
      <button
        onClick={() => setExpanded((p) => !p)}
        className="flex items-center gap-2 bg-text-primary text-white text-xs font-semibold px-3 py-2 rounded-full shadow-lg hover:bg-text-secondary transition-colors min-h-[36px]"
        aria-expanded={expanded}
        aria-label="Toggle demo controls"
      >
        <Settings2 className="w-3.5 h-3.5" />
        <span>Demo Controls</span>
        <span className="bg-accent text-text-primary text-[9px] font-bold px-1.5 py-0.5 rounded-full">
          Reviewer
        </span>
        {expanded ? (
          <ChevronDown className="w-3.5 h-3.5" />
        ) : (
          <ChevronUp className="w-3.5 h-3.5" />
        )}
      </button>

      {/* Panel */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="absolute bottom-full mb-2 left-0 bg-white border border-border rounded-xl shadow-lg p-3 w-72"
          >
            <div className="flex items-center justify-between mb-2.5">
              <p className="text-xs font-bold text-text-primary">Demo States</p>
              <button
                onClick={() => handleModeSelect(null)}
                className="flex items-center gap-1 text-[10px] text-text-muted hover:text-primary transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            </div>

            <div className="grid grid-cols-2 gap-1.5">
              {DEMO_MODES.map((m) => {
                const isActive = demoMode === m.id;
                return (
                  <button
                    key={m.id ?? 'default'}
                    onClick={() => handleOpenGuide(m.id)}
                    className={`flex flex-col items-start px-2.5 py-2 rounded-lg text-left transition-all border ${
                      isActive
                        ? 'bg-primary text-white border-primary'
                        : 'bg-surface border-border hover:bg-primary/5 hover:border-primary/30 text-text-primary'
                    }`}
                  >
                    <span className="text-base leading-none mb-1">{m.emoji}</span>
                    <span className={`text-[11px] font-semibold leading-tight ${isActive ? 'text-white' : 'text-text-primary'}`}>
                      {m.label}
                    </span>
                    <span className={`text-[9px] leading-tight mt-0.5 ${isActive ? 'text-white/75' : 'text-text-muted'}`}>
                      {m.description}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-2.5 pt-2 border-t border-border">
              <p className="text-[9px] text-text-muted text-center leading-snug">
                Click any state to instantly switch context.<br/>
                For reviewer / prototype demo use only.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
