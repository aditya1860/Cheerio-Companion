import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, AlertTriangle, CheckCircle, Edit3 } from 'lucide-react';
import { useGuide } from '../../context/GuideContext';
import Button from '../ui/Button';
import Modal from '../ui/Modal';

function validateBody(text) {
  const errors = [];
  if (!text.includes('{{1}}')) {
    errors.push('Variable {{1}} is required — it will be the customer\'s name.');
  }
  if (text.length > 1024) {
    errors.push(`Template body is too long (${text.length}/1,024 characters max).`);
  }
  // Check for 4+ consecutive emojis using a rough heuristic
  const emojiPattern = /(\p{Emoji_Presentation}|\p{Extended_Pictographic}){4,}/gu;
  if (emojiPattern.test(text)) {
    errors.push('Too many emojis in a row may trigger spam flags.');
  }
  return errors;
}

export default function GuideFixComparison() {
  const {
    activeTemplate,
    editedSuggestion,
    setEditedSuggestion,
    setView,
    showToast,
    demoMode,
  } = useGuide();

  const [whyOpen, setWhyOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [showDiscardModal, setShowDiscardModal] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);

  const handleTextChange = (e) => {
    const val = e.target.value;
    setEditedSuggestion(val);
    setValidationErrors(validateBody(val));
  };

  const handleAccept = () => {
    if (validationErrors.length > 0) {
      showToast('Please fix the highlighted errors before resubmitting.', 'error');
      return;
    }
    if (demoMode === 'NO_PERMISSION') {
      setView('HUMAN_HANDOFF');
      return;
    }
    setView('PROGRESS');
  };

  const handleDiscard = () => {
    setShowDiscardModal(true);
  };

  const confirmDiscard = () => {
    setShowDiscardModal(false);
    setView('HELP_TOPICS');
    showToast('Fix discarded. Original template stays rejected.', 'warning');
  };

  const isModified = editedSuggestion !== activeTemplate?.suggestedBody;

  return (
    <div className="px-4 pt-3 pb-4 space-y-4">
      {/* Header */}
      <div>
        <h3 className="text-sm font-bold text-text-primary">Here's what I'm changing</h3>
        <p className="text-xs text-text-muted mt-0.5">Review the changes before resubmitting to Meta.</p>
      </div>

      {/* Category change banner */}
      <div className="flex items-start gap-2.5 bg-warning-light border border-warning/25 rounded-lg px-3 py-2.5">
        <AlertTriangle className="w-4 h-4 text-warning flex-shrink-0 mt-0.5" />
        <p className="text-xs text-warning font-medium leading-snug">
          Category will change from <strong>UTILITY → MARKETING</strong>. A one-time review fee may apply.
        </p>
      </div>

      {/* Comparison cards */}
      <div className="grid grid-cols-1 gap-3">
        {/* Original */}
        <div className="bg-error-light border border-error/25 rounded-xl p-3">
          <div className="flex items-center gap-1.5 mb-2">
            <span className="w-2 h-2 rounded-full bg-error flex-shrink-0" />
            <span className="text-xs font-bold text-error uppercase tracking-wide">Original (Rejected)</span>
          </div>
          <p className="text-xs text-text-secondary leading-relaxed whitespace-pre-wrap">
            {activeTemplate?.originalBody}
          </p>
          <div className="mt-2 pt-2 border-t border-error/15">
            <div className="flex flex-wrap gap-1.5">
              <span className="text-[10px] bg-error/10 text-error px-2 py-0.5 rounded-full font-medium">🎉🎉🎉 → 3 emojis in a row</span>
              <span className="text-[10px] bg-error/10 text-error px-2 py-0.5 rounded-full font-medium">Utility + promotional = rejected</span>
              <span className="text-[10px] bg-error/10 text-error px-2 py-0.5 rounded-full font-medium">"Hurry up!" triggers urgency flag</span>
            </div>
          </div>
        </div>

        {/* Suggested */}
        <div className="bg-success-light border border-success/25 rounded-xl p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-success flex-shrink-0" />
              <span className="text-xs font-bold text-success uppercase tracking-wide">AI Suggested Fix</span>
            </div>
            {!editing && (
              <button
                onClick={() => setEditing(true)}
                className="flex items-center gap-1 text-[10px] text-primary font-medium hover:underline"
              >
                <Edit3 className="w-3 h-3" /> Edit
              </button>
            )}
          </div>

          {editing ? (
            <div>
              <textarea
                value={editedSuggestion}
                onChange={handleTextChange}
                rows={8}
                className="w-full text-xs text-text-primary leading-relaxed p-2 bg-white border border-success/40 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 font-mono"
                aria-label="Edit suggested template body"
              />
              {/* Character count */}
              <p className={`text-right text-[10px] mt-1 ${editedSuggestion.length > 1024 ? 'text-error font-semibold' : 'text-text-muted'}`}>
                {editedSuggestion.length} / 1,024
              </p>
              {/* Validation errors */}
              <AnimatePresence>
                {validationErrors.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2 space-y-1"
                  >
                    {validationErrors.map((err, i) => (
                      <div key={i} className="flex items-start gap-1.5 bg-error-light rounded-md px-2 py-1.5">
                        <AlertTriangle className="w-3 h-3 text-error flex-shrink-0 mt-0.5" />
                        <p className="text-[10px] text-error leading-snug">{err}</p>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
              <button
                onClick={() => setEditing(false)}
                className="mt-2 text-xs text-primary font-medium hover:underline"
              >
                ← Done editing
              </button>
            </div>
          ) : (
            <p className="text-xs text-text-secondary leading-relaxed whitespace-pre-wrap">
              {editedSuggestion}
            </p>
          )}

          {isModified && !editing && (
            <p className="text-[10px] text-primary mt-2 font-medium">✏️ You've customised this suggestion.</p>
          )}
        </div>
      </div>

      {/* Why it fixes section */}
      <div className="border border-border rounded-xl overflow-hidden">
        <button
          onClick={() => setWhyOpen((p) => !p)}
          className="w-full flex items-center justify-between px-3 py-2.5 text-xs font-semibold text-text-primary bg-surface hover:bg-border/30 transition-colors"
        >
          <span>💡 Why does this fix it?</span>
          {whyOpen ? (
            <ChevronUp className="w-4 h-4 text-text-muted" />
          ) : (
            <ChevronDown className="w-4 h-4 text-text-muted" />
          )}
        </button>
        <AnimatePresence>
          {whyOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <p className="px-3 pb-3 pt-2 text-xs text-text-secondary leading-relaxed bg-white">
                {activeTemplate?.whyItFixes}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Action buttons */}
      <div className="space-y-2 pt-1">
        <Button
          variant="primary"
          size="md"
          onClick={handleAccept}
          disabled={validationErrors.length > 0}
          className="w-full"
        >
          {demoMode === 'NO_PERMISSION' ? '🔒 Ask admin to resubmit' : '✅ Accept & Resubmit'}
        </Button>
        <Button
          variant="secondary"
          size="md"
          onClick={() => setEditing(true)}
          className="w-full"
        >
          ✏️ Edit suggestion
        </Button>
        <button
          onClick={handleDiscard}
          className="w-full text-xs text-error font-medium hover:underline py-2"
        >
          Discard fix
        </button>
      </div>

      {/* Discard confirmation modal */}
      <Modal
        isOpen={showDiscardModal}
        onClose={() => setShowDiscardModal(false)}
        title="Discard this fix?"
        danger
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setShowDiscardModal(false)}>
              Keep editing
            </Button>
            <Button variant="danger" size="sm" onClick={confirmDiscard}>
              Yes, discard
            </Button>
          </>
        }
      >
        <p className="text-sm text-text-secondary">
          Are you sure? Your original template will stay <strong className="text-error">rejected</strong> and won't be sent to Meta for review.
        </p>
      </Modal>
    </div>
  );
}
