import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Users } from 'lucide-react';
import { useGuide } from '../../context/GuideContext';
import { agentHandoff } from '../../data/mockData';
import Button from '../ui/Button';

export default function GuideLowConfidence() {
  const { setView } = useGuide();

  return (
    <div className="px-4 pt-3 pb-6 space-y-5">
      {/* Header message */}
      <div className="flex flex-col items-center text-center py-2">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="w-12 h-12 rounded-full bg-warning-light flex items-center justify-center mb-3"
        >
          <AlertTriangle className="w-6 h-6 text-warning" />
        </motion.div>
        <h3 className="text-sm font-bold text-text-primary">I'm not fully confident here</h3>
        <p className="text-xs text-text-secondary mt-1.5 max-w-xs mx-auto">
          I found some information, but I'm not sure it applies to your exact situation. I'd rather connect you with a human than give you the wrong fix.
        </p>
      </div>

      {/* Warning card */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-warning-light border border-warning/30 rounded-xl p-4"
      >
        <div className="flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-warning flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-warning mb-1.5">Low confidence — here's what I know:</p>
            <p className="text-xs text-text-secondary leading-relaxed">
              Your template <strong>diwali_offer_v1</strong> was rejected with code <code className="bg-white px-1 rounded font-mono text-[10px]">INVALID_FORMAT</code>. This usually means category mismatch or formatting issues, but there may be additional factors specific to your Meta Business account that I can't assess automatically.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Context pre-fill */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-surface border border-border rounded-xl p-4 space-y-2"
      >
        <p className="text-[10px] font-bold text-text-muted uppercase tracking-wide">
          What I'll share with the agent
        </p>
        <div className="space-y-1.5 text-xs">
          <div className="flex items-start gap-2">
            <span className="text-text-muted w-14 flex-shrink-0">Issue</span>
            <span className="text-text-primary">{agentHandoff.contextSummary.issue}</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-text-muted w-14 flex-shrink-0">AI says</span>
            <span className="text-text-secondary italic">{agentHandoff.contextSummary.aiDiagnosis}</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-text-muted w-14 flex-shrink-0">Confidence</span>
            <span className="text-warning font-semibold">Low — needs human review</span>
          </div>
        </div>
      </motion.div>

      {/* CTA */}
      <Button
        variant="primary"
        size="md"
        className="w-full"
        icon={<Users className="w-4 h-4" />}
        onClick={() => setView('HUMAN_HANDOFF')}
      >
        Connect me with a teammate
      </Button>

      <p className="text-[10px] text-text-muted text-center">
        A human agent will pick up your case within ~8 minutes.
      </p>
    </div>
  );
}
