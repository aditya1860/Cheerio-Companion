import React from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Star,
  Users,
  Clock,
  MessageSquare,
  BarChart2,
  PieChart,
} from 'lucide-react';
import { adminStats } from '../data/mockData';

const MAX_TOPIC_COUNT = Math.max(...adminStats.topStuckTopics.map((t) => t.count));

const RECENT_SESSIONS = [
  { id: 'CHR-4821', user: 'Riya Sharma', issue: 'Template rejected', status: 'Self-resolved', time: '4m 12s', ai: '94%' },
  { id: 'CHR-4820', user: 'Amit Verma', issue: 'WhatsApp not connected', status: 'Escalated', time: '2m 03s', ai: '61%' },
  { id: 'CHR-4819', user: 'Priya Patel', issue: 'Chatbot not triggering', status: 'Self-resolved', time: '6m 48s', ai: '88%' },
  { id: 'CHR-4818', user: 'Suresh Kumar', issue: 'Integration setup', status: 'Escalated', time: '1m 22s', ai: '45%' },
  { id: 'CHR-4817', user: 'Meena Rao', issue: 'Campaign not delivered', status: 'Self-resolved', time: '3m 57s', ai: '79%' },
];

function StatCard({ label, value, sub, icon: Icon, color }) {
  return (
    <div className="card p-4 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-text-muted">{label}</span>
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: `${color}18` }}
        >
          <Icon className="w-4 h-4" style={{ color }} />
        </div>
      </div>
      <div>
        <p className="text-2xl font-bold text-text-primary">{value}</p>
        {sub && <p className="text-[10px] text-text-muted mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

function TrendIcon({ trend }) {
  if (trend === 'up') return <TrendingUp className="w-3.5 h-3.5 text-error" />;
  if (trend === 'down') return <TrendingDown className="w-3.5 h-3.5 text-success" />;
  return <Minus className="w-3.5 h-3.5 text-text-muted" />;
}

function Stars({ score }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`w-4 h-4 ${s <= Math.round(score) ? 'text-accent fill-accent' : 'text-border'}`}
        />
      ))}
    </div>
  );
}

// CSS-only donut chart
function DonutSegment({ pct, color, offset }) {
  const circumference = 2 * Math.PI * 40;
  const dash = (pct / 100) * circumference;
  return (
    <circle
      cx="50"
      cy="50"
      r="40"
      fill="none"
      stroke={color}
      strokeWidth="16"
      strokeDasharray={`${dash} ${circumference - dash}`}
      strokeDashoffset={-offset}
      transform="rotate(-90 50 50)"
    />
  );
}

const HANDOFF_COLORS = ['#0A7B6B', '#F59E0B', '#0369A1', '#DC2626'];

export default function AdminDashboard() {
  const { topStuckTopics, csat, handoffReasons, selfResolvedPct, escalatedPct, pendingPct, avgTimeToResolve, totalSessions, thisWeek } = adminStats;

  // Pre-compute donut offsets
  const circumference = 2 * Math.PI * 40;
  let donutOffset = 0;
  const donutSegments = handoffReasons.map((h, i) => {
    const seg = { ...h, offset: donutOffset, color: HANDOFF_COLORS[i] };
    donutOffset += (h.pct / 100) * circumference;
    return seg;
  });

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold text-text-primary">Cheerio Guide — Resolution Dashboard</h2>
          <span className="text-[10px] bg-warning-light text-warning border border-warning/25 px-2 py-0.5 rounded-full font-bold">
            Internal view
          </span>
        </div>
        <p className="text-sm text-text-secondary">Not visible to users. Showing data for Oct 2026.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard
          label="Self-resolved"
          value={`${selfResolvedPct}%`}
          sub={`of ${totalSessions.toLocaleString()} sessions`}
          icon={Users}
          color="#16A34A"
        />
        <StatCard
          label="Escalated to human"
          value={`${escalatedPct}%`}
          sub="of total sessions"
          icon={MessageSquare}
          color="#DC2626"
        />
        <StatCard
          label="Avg resolution"
          value={avgTimeToResolve}
          sub="AI sessions only"
          icon={Clock}
          color="#0369A1"
        />
        <StatCard
          label="Sessions this week"
          value={thisWeek}
          sub={`+12% vs last week`}
          icon={BarChart2}
          color="#0A7B6B"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Top stuck topics bar chart */}
        <div className="md:col-span-2 card p-4 space-y-4">
          <h3 className="text-sm font-bold text-text-primary">Top stuck topics</h3>
          <div className="space-y-3">
            {topStuckTopics.map((topic, i) => (
              <motion.div
                key={topic.topic}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="space-y-1"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendIcon trend={topic.trend} />
                    <span className="text-xs font-medium text-text-primary">{topic.topic}</span>
                  </div>
                  <span className="text-xs font-bold text-text-primary">{topic.count} sessions</span>
                </div>
                <div className="h-2 bg-surface rounded-full overflow-hidden border border-border">
                  <motion.div
                    className="h-full rounded-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${(topic.count / MAX_TOPIC_COUNT) * 100}%` }}
                    transition={{ duration: 0.6, delay: i * 0.08, ease: 'easeOut' }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CSAT + Donut */}
        <div className="space-y-4">
          {/* CSAT */}
          <div className="card p-4 space-y-3">
            <h3 className="text-sm font-bold text-text-primary">CSAT Score</h3>
            <div className="text-center">
              <p className="text-3xl font-bold text-text-primary">{csat}<span className="text-base text-text-muted font-normal">/5</span></p>
              <Stars score={csat} />
              <p className="text-[10px] text-text-muted mt-1">Based on {(totalSessions * 0.62).toFixed(0)} rated sessions</p>
            </div>
          </div>

          {/* Handoff reasons donut */}
          <div className="card p-4 space-y-3">
            <h3 className="text-sm font-bold text-text-primary">Handoff reasons</h3>
            <div className="flex items-center gap-4">
              <svg viewBox="0 0 100 100" className="w-20 h-20 flex-shrink-0">
                {donutSegments.map((seg, i) => (
                  <DonutSegment key={i} pct={seg.pct} color={seg.color} offset={seg.offset} />
                ))}
                <circle cx="50" cy="50" r="24" fill="white" />
              </svg>
              <div className="space-y-1.5 flex-1">
                {handoffReasons.map((h, i) => (
                  <div key={h.reason} className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: HANDOFF_COLORS[i] }} />
                    <span className="text-[10px] text-text-secondary leading-snug">{h.reason}</span>
                    <span className="text-[10px] font-bold text-text-primary ml-auto">{h.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent sessions table */}
      <div className="card overflow-hidden">
        <div className="px-4 py-3 border-b border-border">
          <h3 className="text-sm font-bold text-text-primary">Recent sessions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border bg-surface">
                <th className="text-left px-4 py-2.5 text-[10px] font-bold text-text-muted uppercase tracking-wide">Ticket</th>
                <th className="text-left px-4 py-2.5 text-[10px] font-bold text-text-muted uppercase tracking-wide">User</th>
                <th className="text-left px-4 py-2.5 text-[10px] font-bold text-text-muted uppercase tracking-wide hidden sm:table-cell">Issue</th>
                <th className="text-left px-4 py-2.5 text-[10px] font-bold text-text-muted uppercase tracking-wide">Status</th>
                <th className="text-right px-4 py-2.5 text-[10px] font-bold text-text-muted uppercase tracking-wide hidden md:table-cell">Time</th>
                <th className="text-right px-4 py-2.5 text-[10px] font-bold text-text-muted uppercase tracking-wide hidden md:table-cell">AI conf.</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_SESSIONS.map((s, i) => (
                <tr key={s.id} className="border-b border-border last:border-0 hover:bg-surface transition-colors">
                  <td className="px-4 py-3 font-mono text-text-muted">{s.id}</td>
                  <td className="px-4 py-3 font-medium text-text-primary">{s.user}</td>
                  <td className="px-4 py-3 text-text-secondary hidden sm:table-cell">{s.issue}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        s.status === 'Self-resolved'
                          ? 'bg-success-light text-success'
                          : 'bg-error-light text-error'
                      }`}
                    >
                      {s.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right text-text-muted hidden md:table-cell">{s.time}</td>
                  <td className="px-4 py-3 text-right font-semibold hidden md:table-cell">
                    <span className={parseInt(s.ai) > 70 ? 'text-success' : 'text-warning'}>
                      {s.ai}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
