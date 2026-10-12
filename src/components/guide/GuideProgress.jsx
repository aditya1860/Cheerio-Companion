import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Loader2, XCircle } from 'lucide-react';
import { useGuide } from '../../context/GuideContext';
import Button from '../ui/Button';

const BASE_STEPS = [
  { id: 1, label: 'Checking template against Meta policy guidelines…' },
  { id: 2, label: 'Re-categorising template to Marketing…' },
  { id: 3, label: 'Submitting to Meta for review…' },
  { id: 4, label: 'Waiting for confirmation…' },
];

export default function GuideProgress() {
  const { setView, demoMode } = useGuide();
  const [stepIndex, setStepIndex] = useState(0);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const delays = [1500, 2600, 3700, 4800];

    delays.forEach((delay, idx) => {
      setTimeout(() => {
        if (cancelled) return;

        // ERROR mode: fail at step 3
        if (demoMode === 'ERROR' && idx === 2) {
          setStepIndex(2);
          setTimeout(() => {
            if (!cancelled) setFailed(true);
          }, 800);
          return;
        }

        if (idx < delays.length) {
          setStepIndex(idx + 1);
        }

        // After last step
        if (idx === delays.length - 1 && !cancelled) {
          setTimeout(() => {
            if (cancelled) return;
            if (demoMode === 'REJECTED_AGAIN') {
              setView('REJECTED_AGAIN');
            } else {
              setView('SUCCESS');
            }
          }, 1000);
        }
      }, delay);
    });

    return () => {
      cancelled = true;
    };
  }, [setView, demoMode]);

  if (failed) {
    return (
      <div className="px-4 pt-3 pb-4 space-y-4">
        <div className="flex flex-col items-center text-center py-4">
          <div className="w-12 h-12 rounded-full bg-error-light flex items-center justify-center mb-3">
            <XCircle className="w-6 h-6 text-error" />
          </div>
          <h3 className="text-sm font-bold text-text-primary">Submission Failed</h3>
          <p className="text-xs text-text-secondary mt-1.5 max-w-xs">
            Meta's API returned an error (Error 80007). This sometimes happens during high-traffic periods. Your template was <strong>not submitted</strong>.
          </p>
        </div>

        <div className="bg-error-light border border-error/25 rounded-xl p-4 text-xs">
          <p className="font-semibold text-error mb-1">Error 80007</p>
          <p className="text-text-secondary">Meta's review servers are under high load. This is not a problem with your template — try again in a few minutes.</p>
        </div>

        <div className="space-y-2">
          <Button variant="primary" size="md" onClick={() => setView('PROGRESS')} className="w-full">
            🔄 Retry submission
          </Button>
          <Button variant="secondary" size="md" onClick={() => setView('HUMAN_HANDOFF')} className="w-full">
            Talk to a human
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 pt-3 pb-4 space-y-4">
      <div>
        <h3 className="text-sm font-bold text-text-primary">Resubmitting your template…</h3>
        <p className="text-xs text-text-muted mt-0.5">This usually takes a few seconds.</p>
      </div>

      <div className="space-y-3">
        {BASE_STEPS.map((step, i) => {
          const isDone = stepIndex > i;
          const isActive = stepIndex === i;
          const isPending = stepIndex < i;

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: isPending ? 0.4 : 1, x: 0 }}
              transition={{ duration: 0.2, delay: i * 0.05 }}
              className="flex items-center gap-3"
            >
              <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                {isDone ? (
                  <CheckCircle className="w-5 h-5 text-success" />
                ) : isActive ? (
                  <Loader2 className="w-4 h-4 text-primary animate-spin" />
                ) : (
                  <div className="w-4 h-4 rounded-full border-2 border-border" />
                )}
              </div>
              <p
                className={`text-sm leading-snug ${
                  isDone
                    ? 'text-success font-medium'
                    : isActive
                    ? 'text-primary font-semibold'
                    : 'text-text-muted'
                }`}
              >
                {isDone ? '✓ ' : ''}{step.label}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-border rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: `${(stepIndex / BASE_STEPS.length) * 100}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
