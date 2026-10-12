import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Users, ArrowLeft, RotateCcw } from 'lucide-react';
import { useGuide } from '../../context/GuideContext';
import GuideConversation from './GuideConversation';
import GuideFixComparison from './GuideFixComparison';
import GuideProgress from './GuideProgress';
import GuideSuccess from './GuideSuccess';
import GuideHumanHandoff from './GuideHumanHandoff';
import GuideHelpTopics from './GuideHelpTopics';
import GuideLowConfidence from './GuideLowConfidence';
import TypingIndicator from './TypingIndicator';

const VIEW_TITLES = {
  HELP_TOPICS: 'Cheerio Guide',
  LOADING: 'Cheerio Guide',
  CONVERSATION: 'Template Issue',
  FIX_COMPARISON: 'Review Fix',
  PROGRESS: 'Resubmitting…',
  SUCCESS: 'All Done!',
  HUMAN_HANDOFF: 'Connect to Team',
  LOW_CONFIDENCE: 'Needs Human',
  ERROR: 'Error',
  REJECTED_AGAIN: 'Escalating…',
};

const VIEW_BACK = {
  CONVERSATION: 'HELP_TOPICS',
  FIX_COMPARISON: 'CONVERSATION',
  HUMAN_HANDOFF: null,
  LOW_CONFIDENCE: 'HELP_TOPICS',
};

function RejectedAgainView({ setView }) {
  useEffect(() => {
    const t = setTimeout(() => {
      setView('HUMAN_HANDOFF');
    }, 3000);
    return () => clearTimeout(t);
  }, [setView]);

  return (
    <div className="px-4 pt-4 pb-6 space-y-4 text-center">
      <div className="w-12 h-12 rounded-full bg-error-light flex items-center justify-center mx-auto">
        <X className="w-6 h-6 text-error" />
      </div>
      <div>
        <h3 className="text-sm font-bold text-text-primary">Meta rejected it again 😔</h3>
        <p className="text-xs text-text-secondary mt-2 max-w-xs mx-auto">
          I've tried two different fixes and Meta has rejected the template for a different reason this time. I think a human should look at this now.
        </p>
        <p className="text-xs text-primary font-semibold mt-3">Connecting you to our team in 3 seconds…</p>
      </div>
      <div className="flex justify-center">
        <TypingIndicator />
      </div>
    </div>
  );
}

function LoadingView() {
  return (
    <div className="px-4 pt-4 pb-6 space-y-4">
      {/* Skeleton */}
      {[1, 2, 3].map((i) => (
        <div key={i} className="space-y-2 animate-pulse">
          <div className="h-3 bg-border rounded-full w-3/4" />
          <div className="h-3 bg-border rounded-full w-full" />
          <div className="h-3 bg-border rounded-full w-5/6" />
        </div>
      ))}
      <div className="pt-2">
        <TypingIndicator />
      </div>
    </div>
  );
}

export default function GuidePanel() {
  const { isOpen, closeGuide, currentView, setView, demoMode } = useGuide();
  const contentRef = useRef(null);

  const title = VIEW_TITLES[currentView] || 'Cheerio Guide';
  const backView = VIEW_BACK[currentView];

  // Handle LOADING → CONVERSATION transition
  useEffect(() => {
    if (currentView === 'LOADING') {
      const t = setTimeout(() => {
        setView('CONVERSATION');
      }, 2000);
      return () => clearTimeout(t);
    }
  }, [currentView, setView]);

  // Scroll to top on view change
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [currentView]);

  const renderContent = () => {
    switch (currentView) {
      case 'HELP_TOPICS':
        return <GuideHelpTopics />;
      case 'LOADING':
        return <LoadingView />;
      case 'CONVERSATION':
        return <GuideConversation />;
      case 'FIX_COMPARISON':
        return <GuideFixComparison />;
      case 'PROGRESS':
        return <GuideProgress />;
      case 'SUCCESS':
        return <GuideSuccess />;
      case 'HUMAN_HANDOFF':
        return <GuideHumanHandoff />;
      case 'LOW_CONFIDENCE':
        return <GuideLowConfidence />;
      case 'REJECTED_AGAIN':
        return <RejectedAgainView setView={setView} />;
      case 'ERROR':
        return <GuideProgress />;
      default:
        return <GuideHelpTopics />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop on mobile */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/30 z-40 md:hidden"
            onClick={closeGuide}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.aside
            key="guide-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            className="fixed top-0 right-0 h-full w-full md:w-[420px] bg-white z-50 flex flex-col guide-panel border-l border-border"
            aria-label="Cheerio Guide"
            role="complementary"
          >
            {/* Header */}
            <div className="flex-shrink-0 flex items-center justify-between px-4 py-3.5 border-b border-border bg-white">
              <div className="flex items-center gap-2">
                {backView && (
                  <button
                    onClick={() => setView(backView)}
                    className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-surface text-text-muted transition-colors mr-0.5"
                    aria-label="Go back"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                )}
                <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-text-primary leading-tight">Cheerio Guide</p>
                  <p className="text-[10px] text-text-muted leading-tight">{title}</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setView('HUMAN_HANDOFF')}
                  className="flex items-center gap-1 text-[10px] font-medium text-text-muted hover:text-primary transition-colors px-2 py-1 rounded-md hover:bg-surface"
                  aria-label="Talk to a human"
                >
                  <Users className="w-3 h-3" />
                  <span className="hidden sm:inline">Human</span>
                </button>
                <button
                  onClick={closeGuide}
                  className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-surface text-text-muted hover:text-text-primary transition-colors"
                  aria-label="Close guide"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div
              ref={contentRef}
              className="flex-1 overflow-y-auto scrollbar-thin"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentView}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.18 }}
                >
                  {renderContent()}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer persistent link */}
            {!['HUMAN_HANDOFF', 'SUCCESS'].includes(currentView) && (
              <div className="flex-shrink-0 border-t border-border px-4 py-2.5 flex items-center justify-between">
                <button
                  onClick={() => setView('HUMAN_HANDOFF')}
                  className="text-xs text-text-muted hover:text-primary transition-colors font-medium"
                >
                  👤 Talk to a human
                </button>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                  <span className="text-[10px] text-text-muted">AI • Cheerio Guide</span>
                </div>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
