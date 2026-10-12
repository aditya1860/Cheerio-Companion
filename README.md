# Cheerio Guide — In-Product AI Setup Copilot 🪔

> **A polished, interactive prototype designed for non-technical business owners using Cheerio AI.**  
> Built with React 18, Vite 5, Tailwind CSS, Framer Motion, and Lucide Icons.

---

## 📌 Executive Summary

**Cheerio AI** is an official Meta Business Solution Provider that unifies WhatsApp, AI agents, Email, SMS, Instagram, RCS, and AI Voice on a single platform. Its core customer base includes small business owners and marketing operators—not software engineers.

**The Problem**: Non-technical users repeatedly get stuck on setup (WhatsApp API verification, template rejections, chatbot flow triggers, integrations). This triggers anxiety, campaign delays, and a flood of support tickets that scale linearly with user growth.

**The Solution — Cheerio Guide**: An in-product AI Setup Copilot embedded directly inside the Cheerio dashboard as a floating help button and context-aware slide-over drawer. Cheerio Guide:
1. Proactively detects where the user is stuck before they submit a ticket.
2. Diagnoses root causes in plain language with zero technical jargon.
3. Provides side-by-side comparisons with one-click fixes or inline edits.
4. Auto-resubmits to Meta policy guidelines with visual progress tracking.
5. Bridges seamlessly into scheduled campaigns.
6. Escalates to human support with full diagnostic context preserved (no repeating yourself).

---

## 👤 Target Persona: Riya Sharma

- **Age / Location**: 29, Indore, Madhya Pradesh
- **Role**: Owner, *Glow by Riya* (indie D2C Ayurvedic skincare brand)
- **Profile**: Hands-on marketing operator running WhatsApp promotions herself. No software or technical background.
- **Pain Point**: Gets deeply anxious when an operational asset is marked "Rejected" or "Failed" right before high-stakes festive sales (Diwali 2026). Meta error messages like `INVALID_FORMAT: variable parameter count mismatch` feel hostile and incomprehensible.

---

## 🎯 The Core Scenario: Diwali WhatsApp Template Fix

### Context: October 12, 2026 — 8 days before Diwali
Riya submitted a promotional template `diwali_offer_v1` under the **Utility** category with discount coupon copy and emoji stacking. Meta rejected it with code `INVALID_FORMAT`.

### End-to-End Clickable Flow:
1. **Dashboard Home (`/`)**: Riya sees an urgent red action banner: *"Template diwali_offer_v1 was rejected by Meta."* with button `[Fix with Guide]`.
2. **Templates List (`/templates`)**: Riya navigates to Templates. A prominent red banner warns her of the rejection before the Diwali rush. The row for `diwali_offer_v1` has a pulsing red status badge and a direct `[Fix with Guide]` action.
3. **Cheerio Guide Opens (Conversation View)**: Guide slides in from the right with full context loaded. In two warm, reassuring sentences, it explains:
   > *"You submitted a promotional discount (30% off + coupon code) inside a Utility template. Meta only allows service-style content there (like shipping updates). The fix is simple: we move it to Marketing."*
4. **Fix Comparison View**: Riya clicks `[Show me the fix 👀]`. Guide presents a side-by-side card comparison:
   - **Original (Rejected)**: Annotated with pills pointing out `3 emojis in a row`, `Utility + promotional`, and urgency flags.
   - **AI Suggested Fix**: Marketing category, formatted variables, clean copy.
   - Expandable accordion: *"💡 Why does this fix it?"* explains the Meta policy logic.
   - Inline editor allows Riya to tweak the wording or variables. Form validation flags violations in real time (e.g. missing `{{1}}`, excessive emojis, character limits).
5. **Execution & Policy Check**: Riya clicks `[✅ Accept & Resubmit]`. Guide shows a 4-step animated verification progress:
   - *Step 1*: Checking against Meta policy guidelines...
   - *Step 2*: Re-categorising template to Marketing...
   - *Step 3*: Submitting to Meta review servers...
   - *Step 4*: Waiting for confirmation...
6. **Success & Automation**: Green celebration screen appears.
   - Shows status: **Under Review** (typical turnaround 15 mins – 24 hrs, estimated by Oct 13, 2026).
   - Toggles for approval notifications (WhatsApp & Email).
   - Button: `[Schedule my Diwali campaign →]` auto-links the template to her 12,847 customer audience for Diwali launch.
7. **Resolution Metric Loop**: Guide asks: *"Did this solve your problem? [👍 Yes] [👎 No]"*.
   - Clicking **Yes** triggers a celebratory confetti state.
   - Clicking **No** initiates an immediate warm human handoff with zero context loss.

---

## 🖥️ Screen Directory (10 Screens)

| # | Screen | Route / State | Description |
|---|--------|---------------|-------------|
| 1 | **Dashboard Home** | `/` | 1440px/390px responsive shell, stat cards (active campaigns, approvals, contacts, credits), 3 proactive nudge cards, recent activity stream. |
| 2 | **Templates List** | `/templates` | Filter tabs (All, Approved, Pending, Rejected), counts, rejection contextual banner, template cards with status badges and one-click Guide launcher. |
| 3 | **Template Detail** | `/templates/:id` | Deep view for `diwali_offer_v1` with breadcrumbs, rejection reason callout, full message preview (header, body, footer, CTA buttons), and Guide launch CTA. |
| 4 | **Guide: Conversation View** | Drawer / `CONVERSATION` | Chat bubbles with typing indicators, plain-English diagnosis, rejection metadata card, and quick-reply action chips. |
| 5 | **Guide: Fix Comparison** | Drawer / `FIX_COMPARISON` | Side-by-side diff (Original vs AI Suggestion), warning banner for category migration, expandable policy explanation, and interactive inline editor with live validator. |
| 6 | **Guide: Resubmission Progress** | Drawer / `PROGRESS` | Multi-step animated stepper checking Meta policy, updating category, and pinging review APIs with live progress bar. |
| 7 | **Guide: Success & Campaign Scheduler** | Drawer / `SUCCESS` | Celebration view, turnaround SLA estimates, approval notification toggles, auto-campaign scheduler confirmation, and resolution feedback loop. |
| 8 | **Guide: Human Handoff** | Drawer / `HUMAN_HANDOFF` | Seamless escalation screen with agent avatar, queue wait estimate, and full diagnostic ticket card shared with the agent (user, plan, error code, steps tried, AI notes). |
| 9 | **Guide: Help Topics Launcher** | Drawer / `HELP_TOPICS` | Empty/home state with live search box and top 5 issues (WhatsApp API, Template Rejections, Chatbot Flows, Integrations, Delivery Credits). |
| 10 | **Cheerio Internal Resolution Admin** | `/admin` | Executive analytics view showing Self-Resolved % (73%), Escalated % (18%), Avg Time to Resolve (4m 32s), Top Stuck Topics bar chart, and CSAT breakdown. |

---

## ⚡ Edge Cases & Demo Controls

A collapsible floating **Demo Controls** panel is anchored at the bottom-left of every screen. Reviewers can click any mode to instantly preview all edge cases:

| Demo Control | Triggered Experience |
|--------------|----------------------|
| **Default** | Complete happy path (Riya's Diwali template rejection flow). |
| **Empty** | Guide opens to the Help Topics Launcher with instant search and the Top 5 issues. |
| **Loading** | Simulates a 2-second thinking state with animated skeletons and typing bubbles. |
| **Error** | Step 3 of resubmission simulates a Meta review server 500 (`Error 80007: High Traffic`), with plain-language explanation, `Retry` button, and `Talk to a human` escape hatch. |
| **Low Confidence** | Guide admits: *"I found some information, but I'm not fully confident this applies to your situation."* Refuses to hallucinate and routes directly to human support with prefilled context. |
| **Rejected Again** | Simulates a second rejection by Meta after resubmission. Guide recognizes repeated failure and automatically escalates to a human agent after 3 seconds. |
| **Offline** | Displays a global top banner: *"No internet connection. Changes will sync when you're back online."* Restricts network operations safely. |
| **No Permission** | For team members without admin roles. Guide displays *"Admin action required 🔒"* and generates a pre-written message with copy-to-clipboard for their workspace owner. |
| **After Hours** | Human support queue adjusts to show offline status (`Mon–Sat 9am–7pm IST`), offering 3 tappable callback time slots or ticket email routing. |
| **Destructive Action** | Clicking *"Discard fix"* opens a confirmation modal (`Are you sure? Original template will stay rejected`) followed by a 5-second undo toast notification. |
| **Sensitive Topic Guardrail** | Searching or asking about `"billing refund"`, `"refund"`, or `"account banned"` triggers an instant guardrail bypass directly to a human specialist. |

---

## 🎨 Design System Tokens

- **Primary Color**: Deep Calming Teal (`#0A7B6B`), Dark Teal (`#065F52`), Light Teal (`#0E9E89`) — feels organic, calm, and trustworthy in a WhatsApp ecosystem.
- **Accent**: Warm Amber (`#F59E0B`), Gold (`#FCD34D`) — celebratory festive tone for Diwali 2026 campaigns.
- **Surfaces**: Crisp white cards (`#FFFFFF`) on tinted sage-gray backdrop (`#F8FAF9`), soft borders (`#E2EAE8`).
- **Typography**: Google Font **Plus Jakarta Sans**, clean geometric hierarchy, 13–15px body copy, generous line heights.
- **Accessibility**: 100% WCAG AA contrast compliance, minimum 44px tap targets, visible focus rings, ARIA landmarks and roles.

---

## 📸 Screenshots Directory

Captured high-resolution 1440×900 screenshots are stored in `/screenshots`:
1. `01-templates-rejected-nudge.png` — Templates list with red Rejected badge, category pill, and contextual Guide nudge banner.
2. `02-fix-comparison-view.png` — Cheerio Guide drawer showing side-by-side comparison, change pills, and expanded policy explanation.
3. `03-success-schedule-screen.png` — Resubmission success view with estimated approval date, notification toggles, and scheduled Diwali campaign confirmation.
4. `04-edge-case-demo-controls-low-confidence.png` — Active Low-Confidence AI edge case with the Reviewer Demo Controls drawer open simultaneously.

---

## 🚀 Running Locally

### Prerequisites
- Node.js 18+ (tested on Node 20)
- npm 9+

### Commands
```bash
# 1. Clone or navigate to the directory
cd cheerio-guide

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Or build and test production bundle
npm run build
npm run preview
```
Visit `http://localhost:5173` in your browser.

---

## 🌐 Deploying to Vercel (Public Zero-Login Demo)

This prototype includes `vercel.json` with SPA routing rewrites pre-configured:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### Option A: Via Vercel CLI (1-Click)
```bash
npm i -g vercel
vercel --prod
```

### Option B: Via GitHub & Vercel Dashboard
1. Push `cheerio-guide` to any GitHub repository.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import the repository.
4. Framework Preset: **Vite**
5. Root Directory: `./` (or `cheerio-guide` if part of a monorepo).
6. Build Command: `npm run build`
7. Output Directory: `dist`
8. Click **Deploy**. Your prototype will be live with a shareable URL accessible by any reviewer with zero login.

---

## ✅ Quality Bar Verification

- [x] **Completely clickable**: Every primary and secondary workflow is operable by clicks alone.
- [x] **No dead buttons**: Every action outside the core scenario displays an informative toast notification.
- [x] **All edge cases interactive**: Switchable in 1 click via the Reviewer Demo Controls bar.
- [x] **Zero errors**: Verified with clean `npm run build` output and zero browser runtime errors.
- [x] **Real copy only**: Believable product copy, authentic Diwali dates, customer numbers, and realistic Meta error codes.
- [x] **Responsive**: Seamless experience from 390px mobile view up to 1440px desktop screens.
