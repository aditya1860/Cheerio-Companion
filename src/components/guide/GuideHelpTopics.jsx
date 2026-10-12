import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Smartphone,
  XCircle,
  GitBranch,
  Plug,
  AlertTriangle,
  ChevronRight,
  Loader2,
} from 'lucide-react';
import { useGuide } from '../../context/GuideContext';
import { helpTopics } from '../../data/mockData';
import { templates } from '../../data/mockData';

const ICON_MAP = {
  Smartphone,
  XCircle,
  GitBranch,
  Plug,
  AlertTriangle,
};

const SENSITIVE_KEYWORDS = ['billing refund', 'refund', 'account banned', 'banned'];

const CANNED_RESPONSES = {
  'wa-api': "To connect your WhatsApp Business API:\n\n1. Go to **Integrations → WhatsApp**\n2. Click **Connect number**\n3. Enter your Business phone number and verify with OTP\n4. Paste your API key from Meta Business Manager\n\nNeed your API key? Go to Meta Business Manager → Business Settings → System Users → Generate Token.",
  'template-rejected': "Template rejections usually happen due to:\n\n• **Category mismatch** — promotional content in Utility templates\n• **Too many emojis** — 3+ in a row triggers spam detection\n• **Urgency language** — 'Limited stocks! Hurry!' flagged by Meta\n\nWould you like me to look at your specific rejected template?",
  'chatbot-flow': "If your chatbot flow isn't triggering:\n\n1. Check the **trigger keyword** — it must exactly match what users type\n2. Make sure the flow is **Published** (not in Draft)\n3. Verify the flow is assigned to the correct WhatsApp number\n4. Check if opt-out users are in the audience\n\nShall I check your active flows?",
  'integration': "For integration issues:\n\n**Shopify**: Go to Integrations → Shopify → Check your store URL and API key\n**WooCommerce**: Ensure the Cheerio plugin is installed and activated\n**Zapier**: Re-authenticate the Cheerio app in your Zap\n\nWhich integration are you having trouble with?",
  'campaign-delivery': "If your campaign wasn't delivered:\n\n1. Check your **credit balance** — campaigns pause if credits run low\n2. Review **opt-out list** — opted-out contacts are skipped\n3. Check **audience filters** — overly strict filters reduce reach\n4. Verify the **template was approved** before sending\n\nShall I check your last campaign's delivery report?",
};

export default function GuideHelpTopics() {
  const { setView, setActiveTemplate, showToast } = useGuide();
  const [query, setQuery] = useState('');
  const [loadingTopic, setLoadingTopic] = useState(null);
  const [activeTopic, setActiveTopic] = useState(null);
  const [canned, setCanned] = useState('');

  const handleSearch = (e) => {
    const val = e.target.value;
    setQuery(val);

    const lower = val.toLowerCase();
    if (SENSITIVE_KEYWORDS.some((kw) => lower.includes(kw))) {
      setTimeout(() => {
        showToast("I'll connect you straight to our team for this — it needs a human.", 'warning');
        setView('HUMAN_HANDOFF');
      }, 400);
    }
  };

  const handleTopicClick = (topic) => {
    setLoadingTopic(topic.id);
    setTimeout(() => {
      setLoadingTopic(null);
      setActiveTopic(topic);
      setCanned(CANNED_RESPONSES[topic.id] || 'Let me look into that for you…');

      // If they clicked template rejected, also set context
      if (topic.id === 'template-rejected') {
        const diwali = templates.find((t) => t.id === 'diwali_offer_v1');
        setActiveTemplate(diwali);
      }
    }, 1200);
  };

  const filtered = helpTopics.filter(
    (t) =>
      !query ||
      t.title.toLowerCase().includes(query.toLowerCase()) ||
      t.description.toLowerCase().includes(query.toLowerCase()),
  );

  if (activeTopic && canned) {
    return (
      <div className="px-4 pt-3 pb-4 space-y-4">
        <button
          onClick={() => { setActiveTopic(null); setCanned(''); }}
          className="text-xs text-primary font-medium hover:underline flex items-center gap-1"
        >
          ← Back to topics
        </button>

        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: `${activeTopic.color}18` }}
          >
            {React.createElement(ICON_MAP[activeTopic.icon] || AlertTriangle, {
              className: 'w-4 h-4',
              style: { color: activeTopic.color },
            })}
          </div>
          <p className="text-sm font-bold text-text-primary">{activeTopic.title}</p>
        </div>

        <div className="bg-white border border-border rounded-xl p-4">
          <p
            className="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap"
            dangerouslySetInnerHTML={{
              __html: canned
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\n/g, '<br/>'),
            }}
          />
        </div>

        {activeTopic.id === 'template-rejected' && (
          <button
            onClick={() => setView('CONVERSATION')}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-error-light border border-error/25 rounded-lg text-xs font-semibold text-error hover:bg-error/10 transition-colors"
          >
            <XCircle className="w-4 h-4" />
            Fix diwali_offer_v1 rejection
          </button>
        )}

        <div className="border-t border-border pt-3 flex items-center justify-center gap-4 text-xs text-text-muted">
          <button
            className="hover:text-primary transition-colors"
            onClick={() => showToast('Glad it helped! 😊', 'success')}
          >
            👍 Helpful
          </button>
          <span>·</span>
          <button
            className="hover:text-error transition-colors"
            onClick={() => setView('HUMAN_HANDOFF')}
          >
            👎 Talk to a human
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 pt-3 pb-4 space-y-4">
      {/* Welcome */}
      <div>
        <h3 className="text-sm font-bold text-text-primary">Hi Riya! How can I help? 👋</h3>
        <p className="text-xs text-text-muted mt-0.5">Search or pick a common issue below.</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Describe your issue…"
          className="w-full pl-9 pr-4 py-2.5 text-sm bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary/40 placeholder:text-text-muted"
          aria-label="Search for help"
        />
      </div>

      {/* Topics */}
      <div className="space-y-2">
        <p className="text-[10px] font-bold text-text-muted uppercase tracking-wide">
          Top issues we can help with
        </p>
        {filtered.map((topic, i) => {
          const IconComp = ICON_MAP[topic.icon] || AlertTriangle;
          const isLoading = loadingTopic === topic.id;
          return (
            <motion.button
              key={topic.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              onClick={() => handleTopicClick(topic)}
              className="w-full flex items-center gap-3 p-3 bg-white border border-border rounded-xl hover:border-primary/30 hover:bg-primary/3 transition-all text-left group"
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105"
                style={{ background: `${topic.color}15` }}
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" style={{ color: topic.color }} />
                ) : (
                  <IconComp className="w-4 h-4" style={{ color: topic.color }} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-text-primary leading-snug truncate">
                  {topic.title}
                </p>
                <p className="text-[10px] text-text-muted mt-0.5 truncate">{topic.description}</p>
                <p className="text-[10px] text-success font-medium mt-0.5">{topic.count}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-text-muted group-hover:text-primary transition-colors flex-shrink-0" />
            </motion.button>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-6">
            <p className="text-sm text-text-muted">No matches. Try different keywords or talk to a human.</p>
            <button
              onClick={() => setView('HUMAN_HANDOFF')}
              className="mt-2 text-xs text-primary font-semibold hover:underline"
            >
              Talk to our team →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
