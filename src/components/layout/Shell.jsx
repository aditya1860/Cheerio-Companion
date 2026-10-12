import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Home,
  Megaphone,
  FileText,
  GitBranch,
  Plug,
  Inbox,
  CreditCard,
  LayoutDashboard,
  Bell,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import NavItem from './NavItem';
import { useGuide } from '../../context/GuideContext';
import GuideButton from '../guide/GuideButton';
import GuidePanel from '../guide/GuidePanel';
import ToastContainer from '../ui/ToastContainer';
import OfflineBanner from '../ui/OfflineBanner';

const PAGE_TITLES = {
  '/': 'Home',
  '/templates': 'Message Templates',
  '/admin': 'Resolution Dashboard',
};

function CheerioLogo() {
  return (
    <div className="flex items-center gap-2.5 px-3 py-4 border-b border-border">
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="8" fill="#0A7B6B" />
        <path
          d="M8 10C8 8.895 8.895 8 10 8H22C23.105 8 24 8.895 24 10V19C24 20.105 23.105 21 22 21H18L14 24V21H10C8.895 21 8 20.105 8 19V10Z"
          fill="white"
          fillOpacity="0.95"
        />
        <circle cx="13" cy="14" r="1.2" fill="#0A7B6B" />
        <circle cx="16" cy="14" r="1.2" fill="#0A7B6B" />
        <circle cx="19" cy="14" r="1.2" fill="#0A7B6B" />
      </svg>
      <span className="hidden md:block text-base font-bold text-text-primary tracking-tight">
        Cheerio
      </span>
    </div>
  );
}

export default function Shell({ children }) {
  const location = useLocation();
  const { showToast, demoMode } = useGuide();
  const [notifOpen, setNotifOpen] = useState(false);

  const pageTitle = PAGE_TITLES[location.pathname] || 'Cheerio';
  const isOffline = demoMode === 'OFFLINE';

  return (
    <div className="flex h-screen bg-surface overflow-hidden">
      {/* Left Sidebar */}
      <aside className="flex-shrink-0 w-14 md:w-60 flex flex-col bg-white border-r border-border z-30 overflow-y-auto">
        <CheerioLogo />

        <nav className="flex-1 flex flex-col gap-1 p-2 pt-3" aria-label="Main navigation">
          <NavItem to="/" icon={Home} label="Home" />
          <NavItem to="/campaigns" icon={Megaphone} label="Campaigns" isPrototype />
          <NavItem to="/templates" icon={FileText} label="Templates" />
          <NavItem to="/chatbot-flows" icon={GitBranch} label="Chatbot Flows" isPrototype />
          <NavItem to="/integrations" icon={Plug} label="Integrations" isPrototype />
          <NavItem to="/inbox" icon={Inbox} label="Inbox" isPrototype />
          <NavItem to="/billing" icon={CreditCard} label="Billing" isPrototype />

          <div className="mt-auto pt-2 border-t border-border">
            <NavItem to="/admin" icon={LayoutDashboard} label="Admin" />
          </div>
        </nav>

        {/* Plan badge */}
        <div className="hidden md:block px-3 pb-4">
          <div className="bg-primary/8 rounded-lg px-3 py-2.5 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-primary flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-xs font-semibold text-primary truncate">Growth Plan</p>
              <p className="text-[10px] text-text-muted truncate">Glow by Riya</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Offline banner */}
        <OfflineBanner visible={isOffline} />

        {/* Topbar */}
        <header className="flex-shrink-0 h-14 bg-white border-b border-border flex items-center justify-between px-4 md:px-6 gap-4 z-20">
          <h1 className="text-base font-bold text-text-primary truncate">{pageTitle}</h1>

          <div className="flex items-center gap-2">
            {/* Notification bell */}
            <button
              onClick={() => showToast('Not part of this prototype', 'info')}
              className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-surface text-text-secondary transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-4.5 h-4.5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full flex items-center justify-center">
                <span className="text-[8px] text-white font-bold leading-none hidden">2</span>
              </span>
            </button>

            {/* User avatar */}
            <button
              onClick={() => showToast('Not part of this prototype', 'info')}
              className="flex items-center gap-2 h-9 pl-1 pr-2 rounded-full hover:bg-surface transition-colors"
              aria-label="User menu"
            >
              <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0">
                RS
              </div>
              <span className="hidden md:block text-sm font-medium text-text-primary">
                Riya Sharma
              </span>
              <ChevronDown className="hidden md:block w-3.5 h-3.5 text-text-muted" />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto scrollbar-thin relative">
          {children}
        </main>
      </div>

      {/* Guide floating button */}
      <GuideButton />

      {/* Guide panel */}
      <GuidePanel />

      {/* Toasts */}
      <ToastContainer />
    </div>
  );
}
