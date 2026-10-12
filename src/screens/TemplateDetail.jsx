import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, AlertCircle, Sparkles, MessageSquare, ExternalLink, ArrowLeft } from 'lucide-react';
import { useGuide } from '../context/GuideContext';
import { templates } from '../data/mockData';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

export default function TemplateDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { openGuide } = useGuide();

  const tpl = templates.find((t) => t.id === id);

  if (!tpl) {
    return (
      <div className="p-6 text-center">
        <p className="text-text-muted">Template not found.</p>
        <button onClick={() => navigate('/templates')} className="mt-2 text-primary text-sm underline">
          ← Back to Templates
        </button>
      </div>
    );
  }

  const isRejected = tpl.status === 'REJECTED';

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto space-y-5">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-text-muted" aria-label="Breadcrumb">
        <button onClick={() => navigate('/templates')} className="hover:text-primary transition-colors flex items-center gap-1">
          <ArrowLeft className="w-3 h-3" />
          Templates
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-text-primary font-semibold font-mono">{tpl.name}</span>
      </nav>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start justify-between gap-4"
      >
        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-lg font-bold text-text-primary font-mono">{tpl.name}</h2>
            <Badge status={tpl.status} />
          </div>
          <div className="flex items-center gap-3 text-xs text-text-muted">
            <span className="bg-surface px-2 py-0.5 rounded border border-border">{tpl.category}</span>
            <span>{tpl.language}</span>
            <span>Updated {tpl.updatedAt}</span>
          </div>
        </div>
        {isRejected && (
          <Button
            variant="primary"
            size="sm"
            icon={<Sparkles className="w-3.5 h-3.5" />}
            onClick={() => openGuide(tpl)}
          >
            Fix with Guide
          </Button>
        )}
      </motion.div>

      {/* Rejection reason card */}
      {isRejected && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-error-light border border-error/25 rounded-xl p-4"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-error flex-shrink-0 mt-0.5" />
            <div className="space-y-2">
              <p className="text-sm font-bold text-error">Why was it rejected?</p>
              <p className="text-sm text-text-secondary leading-relaxed">{tpl.rejectionReason}</p>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-text-muted">Code:</span>
                <code className="text-xs bg-white text-error px-2 py-0.5 rounded border border-error/20 font-mono">
                  {tpl.rejectionCode}
                </code>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Template preview */}
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="card overflow-hidden"
      >
        <div className="px-4 py-3 border-b border-border bg-surface flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-text-muted" />
          <span className="text-sm font-semibold text-text-primary">Template Preview</span>
        </div>

        <div className="p-4 space-y-4">
          {/* Header */}
          {tpl.headerText && (
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-text-muted uppercase tracking-wide">Header</p>
              <p className="text-sm font-semibold text-text-primary bg-surface rounded-lg p-3 border border-border">
                {tpl.headerText}
              </p>
            </div>
          )}

          {/* Body */}
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-text-muted uppercase tracking-wide">Body</p>
            <div className="bg-surface rounded-lg p-3 border border-border">
              <p className="text-sm text-text-primary whitespace-pre-wrap leading-relaxed">
                {tpl.originalBody}
              </p>
            </div>
          </div>

          {/* Footer */}
          {tpl.footerText && (
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-text-muted uppercase tracking-wide">Footer</p>
              <p className="text-xs text-text-muted bg-surface rounded-lg p-3 border border-border">
                {tpl.footerText}
              </p>
            </div>
          )}

          {/* Buttons */}
          {tpl.buttons && tpl.buttons.length > 0 && (
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-text-muted uppercase tracking-wide">Buttons</p>
              <div className="space-y-1.5">
                {tpl.buttons.map((btn, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between bg-info-light rounded-lg px-3 py-2 border border-info/20"
                  >
                    <span className="text-xs font-semibold text-info">{btn.text}</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] text-text-muted uppercase font-bold">{btn.type}</span>
                      <ExternalLink className="w-3 h-3 text-text-muted" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* CTA */}
      {isRejected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex gap-3"
        >
          <Button
            variant="primary"
            size="md"
            icon={<Sparkles className="w-4 h-4" />}
            onClick={() => openGuide(tpl)}
            className="flex-1"
          >
            Fix with Cheerio Guide
          </Button>
          <Button
            variant="outline"
            size="md"
            onClick={() => navigate('/templates')}
          >
            Back
          </Button>
        </motion.div>
      )}
    </div>
  );
}
