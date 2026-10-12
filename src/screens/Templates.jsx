import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, AlertCircle, ChevronRight, ExternalLink } from 'lucide-react';
import { useGuide } from '../context/GuideContext';
import { templates } from '../data/mockData';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

const TABS = ['All', 'Approved', 'Pending', 'Rejected'];

export default function Templates() {
  const navigate = useNavigate();
  const { openGuide, showToast } = useGuide();
  const [activeTab, setActiveTab] = useState('All');

  const diwaliTemplate = templates.find((t) => t.id === 'diwali_offer_v1');

  const filtered = templates.filter((t) => {
    if (activeTab === 'All') return true;
    return t.status.toLowerCase() === activeTab.toLowerCase();
  });

  const counts = {
    All: templates.length,
    Approved: templates.filter((t) => t.status === 'APPROVED').length,
    Pending: templates.filter((t) => t.status === 'PENDING').length,
    Rejected: templates.filter((t) => t.status === 'REJECTED').length,
  };

  const handleFixWithGuide = () => {
    openGuide(diwaliTemplate);
  };

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-text-primary">Message Templates</h2>
          <p className="text-sm text-text-secondary mt-0.5">
            Manage your WhatsApp message templates submitted to Meta.
          </p>
        </div>
        <Button
          variant="primary"
          size="sm"
          icon={<Plus className="w-3.5 h-3.5" />}
          onClick={() => showToast('Not part of this prototype', 'info')}
        >
          <span className="hidden sm:inline">Create Template</span>
          <span className="sm:hidden">New</span>
        </Button>
      </div>

      {/* Contextual rejection nudge banner */}
      <motion.div
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-error-light border border-error/25 rounded-xl p-4"
      >
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-error flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-error">
              diwali_offer_v1 was rejected by Meta right before Diwali
            </p>
            <p className="text-xs text-text-secondary mt-0.5">
              Fix it now before your Diwali campaign goes live. Takes less than 2 minutes with the Guide.
            </p>
          </div>
        </div>
        <button
          onClick={handleFixWithGuide}
          className="flex-shrink-0 flex items-center gap-1.5 text-sm font-semibold text-error hover:text-error/80 transition-colors whitespace-nowrap"
        >
          Fix with Guide →
        </button>
      </motion.div>

      {/* Filter tabs */}
      <div className="flex items-center gap-1 bg-surface rounded-lg p-1 border border-border w-fit">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              activeTab === tab
                ? 'bg-white text-text-primary shadow-sm'
                : 'text-text-muted hover:text-text-primary'
            }`}
          >
            {tab}
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                activeTab === tab ? 'bg-primary/10 text-primary' : 'bg-border text-text-muted'
              }`}
            >
              {counts[tab]}
            </span>
          </button>
        ))}
      </div>

      {/* Template list */}
      <div className="space-y-2">
        {filtered.map((tpl, i) => {
          const isRejected = tpl.status === 'REJECTED';
          return (
            <motion.div
              key={tpl.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className={`card p-4 flex flex-col sm:flex-row sm:items-center gap-4 transition-all ${
                isRejected ? 'border-error/30 bg-rejected-tint' : ''
              }`}
            >
              {/* Template info */}
              <div className="flex-1 min-w-0 space-y-1.5">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <p className="text-sm font-bold text-text-primary font-mono truncate max-w-[180px]">
                    {tpl.name}
                  </p>
                  <Badge status={tpl.status} />
                  {isRejected && (
                    <span className="text-[10px] text-error font-semibold bg-error-light px-2 py-0.5 rounded-full border border-error/20">
                      Needs fix
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 flex-wrap text-[10px] text-text-muted">
                  <span className="bg-surface px-2 py-0.5 rounded border border-border">{tpl.category}</span>
                  <span>{tpl.language}</span>
                  <span>Updated {tpl.updatedAt}</span>
                </div>
                {isRejected && (
                  <p className="text-xs text-error/80 leading-snug mt-1 line-clamp-2">
                    ⚠️ {tpl.rejectionReason}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                {isRejected && (
                  <button
                    onClick={handleFixWithGuide}
                    className="flex items-center gap-1.5 px-3 py-2 bg-error text-white text-xs font-semibold rounded-lg hover:bg-error/90 transition-colors min-h-[36px]"
                  >
                    Fix with Guide
                  </button>
                )}
                <button
                  onClick={() => navigate(`/templates/${tpl.id}`)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-border hover:bg-surface text-text-muted hover:text-text-primary transition-colors"
                  aria-label={`View ${tpl.name}`}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
