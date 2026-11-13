import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Users, 
  CreditCard, 
  CalendarClock, 
  Sparkles, 
  Building2, 
  HelpCircle, 
  Layers, 
  X, 
  TrendingUp, 
  Zap, 
  Smartphone,
  Lock,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Button } from '../ui/Button';

interface PublicLandingPageProps {
  onEnterDashboard: () => void;
}

export const PublicLandingPage: React.FC<PublicLandingPageProps> = ({ onEnterDashboard }) => {
  const [workflowTab, setWorkflowTab] = useState<'before' | 'after'>('after');
  const [billingCycle, setBillingCycle] = useState<'annual' | 'monthly'>('annual');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Does EduMatrix support UDISE+ compliance for Indian state education boards?',
      a: 'Yes. EduMatrix includes pre-built validation schemas for UDISE+ census requirements. With one click, school administrators can export encrypted, verified XML/CSV reports compliant with Ministry of Education mandates.'
    },
    {
      q: 'How does EduMatrix prevent timetable clashes when managing large faculties?',
      a: 'EduMatrix runs a real-time constraint solver across teacher allocations, room availability, and batch requirements. When a collision occurs, it provides explicit human-readable diagnostics (e.g. "Priya Sharma is already assigned to Class 9B from 10:00–11:00 AM") with suggested available substitutes.'
    },
    {
      q: 'Can parents pay school fees directly through UPI, Google Pay, or PhonePe?',
      a: 'Yes. Each fee demand automatically creates a zero-friction UPI dynamic QR code and payment link. Once paid, the school ledger updates in sub-second time, and a computer-generated GST tax receipt is instantly sent to the parent\'s WhatsApp.'
    },
    {
      q: 'Is EduMatrix accessible on low-bandwidth rural connections?',
      a: 'EduMatrix is engineered with strict performance budgets, lightweight payloads, and resilient offline-caching for mobile attendance, allowing teachers to mark attendance even during momentary network dropouts.'
    }
  ];

  return (
    <div className="space-y-16 py-6 max-w-6xl mx-auto px-4 sm:px-6">
      {/* 1. HERO SECTION (Clear prioritization, no generic purple gradients per Report p. 6 & 19) */}
      <section className="text-center space-y-6 pt-6 pb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-800 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-brand-600" />
          <span>EduMatrix 2.6 • The Modern Education Management OS</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-ink-950 tracking-tight max-w-4xl mx-auto leading-tight">
          Powerful enough to operate an institution.{' '}
          <span className="text-brand-600">Simple enough to use every day.</span>
        </h1>

        <p className="text-lg sm:text-xl text-ink-600 max-w-2xl mx-auto font-normal leading-relaxed">
          Replace fragmented Excel spreadsheets, manual fee registers, and lost WhatsApp circulars with one unified, dependable operating system built for Indian schools, coaching institutes, and colleges.
        </p>

        {/* Primary and Secondary CTA */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button
            variant="primary"
            size="lg"
            icon={ArrowRight}
            iconPosition="right"
            onClick={onEnterDashboard}
          >
            Launch interactive live system
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => {
              const el = document.getElementById('before-after-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            See before & after workflow
          </Button>
        </div>

        {/* Executive Trust Badges */}
        <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-ink-500 font-medium">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>UDISE+ Ready</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>WCAG 2.2 AA Accessible</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Zero-Friction UPI Fee Engine</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>DPDP Act 2023 Compliant</span>
          </div>
        </div>
      </section>

      {/* 2. REAL WORKFLOW ILLUSTRATION: BEFORE VS AFTER EDUMATRIX (Mandated by Report p. 7 & 14) */}
      <section id="before-after-section" className="bg-white rounded-modal border border-ink-200 p-6 sm:p-8 shadow-card space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-ink-200">
          <div>
            <span className="text-xs font-semibold text-brand-700 uppercase tracking-wider">
              Workflow Diagnostic
            </span>
            <h2 className="text-2xl font-bold text-ink-950 mt-1">
              How EduMatrix Solves Institutional Chaos
            </h2>
            <p className="text-sm text-ink-600 mt-1">
              A direct comparison of operational friction vs. unified clarity.
            </p>
          </div>

          {/* Toggle Button */}
          <div className="flex items-center bg-ink-100 p-1 rounded-lg">
            <button
              onClick={() => setWorkflowTab('before')}
              className={`px-4 py-2 rounded-md text-xs font-semibold transition-all ${
                workflowTab === 'before'
                  ? 'bg-rose-600 text-white shadow-subtle'
                  : 'text-ink-700 hover:text-ink-950'
              }`}
            >
              Before EduMatrix (Chaos)
            </button>
            <button
              onClick={() => setWorkflowTab('after')}
              className={`px-4 py-2 rounded-md text-xs font-semibold transition-all ${
                workflowTab === 'after'
                  ? 'bg-brand-600 text-white shadow-subtle'
                  : 'text-ink-700 hover:text-ink-950'
              }`}
            >
              With EduMatrix (Unified)
            </button>
          </div>
        </div>

        {workflowTab === 'before' ? (
          /* BEFORE STATE */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-fadeIn">
            <div className="p-5 rounded-lg border-2 border-rose-200 bg-rose-50/50 space-y-3">
              <div className="flex items-center justify-between text-rose-700">
                <span className="text-xs font-bold uppercase tracking-wider">Attendance Register</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-200 text-rose-900">Paper</span>
              </div>
              <h4 className="font-bold text-ink-950 text-sm">Physical Registers & Lost Records</h4>
              <p className="text-xs text-ink-600 leading-relaxed">
                Teachers spend 15 minutes per period marking paper books. Parents only find out about unexplained absences days later.
              </p>
              <div className="text-[11px] font-medium text-rose-700">❌ High proxy rate, zero live audit</div>
            </div>

            <div className="p-5 rounded-lg border-2 border-rose-200 bg-rose-50/50 space-y-3">
              <div className="flex items-center justify-between text-rose-700">
                <span className="text-xs font-bold uppercase tracking-wider">Fee Collection</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-200 text-rose-900">Cash & Diaries</span>
              </div>
              <h4 className="font-bold text-ink-950 text-sm">Unreconciled Cash & Lost Chits</h4>
              <p className="text-xs text-ink-600 leading-relaxed">
                Accountants balance handwritten receipt books against bank entries. Overdue reminders require endless awkward phone calls.
              </p>
              <div className="text-[11px] font-medium text-rose-700">❌ ₹4L+ average uncollected dues</div>
            </div>

            <div className="p-5 rounded-lg border-2 border-rose-200 bg-rose-50/50 space-y-3">
              <div className="flex items-center justify-between text-rose-700">
                <span className="text-xs font-bold uppercase tracking-wider">Timetable & Rooms</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-200 text-rose-900">Excel / Whiteboard</span>
              </div>
              <h4 className="font-bold text-ink-950 text-sm">Double Bookings & Class Collisions</h4>
              <p className="text-xs text-ink-600 leading-relaxed">
                When a teacher falls sick, finding an available substitute takes 45 minutes of frantic phone calls across staff rooms.
              </p>
              <div className="text-[11px] font-medium text-rose-700">❌ Frequent empty periods & chaos</div>
            </div>

            <div className="p-5 rounded-lg border-2 border-rose-200 bg-rose-50/50 space-y-3">
              <div className="flex items-center justify-between text-rose-700">
                <span className="text-xs font-bold uppercase tracking-wider">Parent Updates</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-200 text-rose-900">Noisy WhatsApp</span>
              </div>
              <h4 className="font-bold text-ink-950 text-sm">Cluttered WhatsApp Groups</h4>
              <p className="text-xs text-ink-600 leading-relaxed">
                Important exam dates and holiday notices get buried under 300 messages and teacher numbers are exposed to spam.
              </p>
              <div className="text-[11px] font-medium text-rose-700">❌ Zero privacy, missed notices</div>
            </div>
          </div>
        ) : (
          /* AFTER STATE */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-fadeIn">
            <div className="p-5 rounded-lg border-2 border-emerald-300 bg-emerald-50/50 space-y-3">
              <div className="flex items-center justify-between text-emerald-800">
                <span className="text-xs font-bold uppercase tracking-wider">Attendance Register</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-200 text-emerald-950">1-Tap Sync</span>
              </div>
              <h4 className="font-bold text-ink-950 text-sm">Rapid Tap & Instant WhatsApp</h4>
              <p className="text-xs text-ink-600 leading-relaxed">
                Teachers mark attendance in under 30 seconds with 1-tap "Mark all present". Instant notification dispatched to absent parents.
              </p>
              <div className="text-[11px] font-semibold text-emerald-800">✓ 99.4% record accuracy</div>
            </div>

            <div className="p-5 rounded-lg border-2 border-emerald-300 bg-emerald-50/50 space-y-3">
              <div className="flex items-center justify-between text-emerald-800">
                <span className="text-xs font-bold uppercase tracking-wider">Fee Collection</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-200 text-emerald-950">Automated UPI</span>
              </div>
              <h4 className="font-bold text-ink-950 text-sm">Automated Invoicing & Instant Receipt</h4>
              <p className="text-xs text-ink-600 leading-relaxed">
                Parents pay through UPI/GPay in 1-click. Instant verified PDF tax receipt issued with zero ledger reconciliation overhead.
              </p>
              <div className="text-[11px] font-semibold text-emerald-800">✓ 38% faster fee realization</div>
            </div>

            <div className="p-5 rounded-lg border-2 border-emerald-300 bg-emerald-50/50 space-y-3">
              <div className="flex items-center justify-between text-emerald-800">
                <span className="text-xs font-bold uppercase tracking-wider">Timetable Engine</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-200 text-emerald-950">Conflict Free</span>
              </div>
              <h4 className="font-bold text-ink-950 text-sm">Proactive Conflict Detection</h4>
              <p className="text-xs text-ink-600 leading-relaxed">
                Intelligent matrix flags teacher or room double-bookings in advance with plain English explanations and recommended substitutes.
              </p>
              <div className="text-[11px] font-semibold text-emerald-800">✓ Zero scheduling overlaps</div>
            </div>

            <div className="p-5 rounded-lg border-2 border-emerald-300 bg-emerald-50/50 space-y-3">
              <div className="flex items-center justify-between text-emerald-800">
                <span className="text-xs font-bold uppercase tracking-wider">Parent Portal</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-200 text-emerald-950">Dedicated App</span>
              </div>
              <h4 className="font-bold text-ink-950 text-sm">Clean, Safe Communication Hub</h4>
              <p className="text-xs text-ink-600 leading-relaxed">
                Parents track daily homework, timetable, bus status, and report cards in a clean, uncluttered, private interface.
              </p>
              <div className="text-[11px] font-semibold text-emerald-800">✓ 100% guardian engagement</div>
            </div>
          </div>
        )}
      </section>

      {/* 3. INDIAN PRICING MATRIX (INR ₹ Currency per Report p. 6 & 37) */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-semibold text-brand-700 uppercase tracking-wider">
            Transparent Pricing
          </span>
          <h2 className="text-3xl font-bold text-ink-950 tracking-tight">
            Fair, Predictable Pricing for Institutions of Every Size
          </h2>
          <p className="text-sm text-ink-600 max-w-xl mx-auto">
            No hidden setup fees. Fully inclusive of SMS gateways, cloud hosting, and UDISE+ automated compliance exports.
          </p>

          {/* Billing Frequency Switcher */}
          <div className="pt-4 flex items-center justify-center gap-3 text-xs font-semibold">
            <span className={billingCycle === 'monthly' ? 'text-ink-950' : 'text-ink-500'}>
              Monthly Billing
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'annual' ? 'monthly' : 'annual')}
              className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none bg-brand-600"
              role="switch"
              aria-checked={billingCycle === 'annual'}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  billingCycle === 'annual' ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={billingCycle === 'annual' ? 'text-brand-700' : 'text-ink-500'}>
              Annual (Save 20%)
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {/* Starter Plan */}
          <div className="bg-white rounded-card border border-ink-200 p-6 shadow-card space-y-4">
            <div>
              <h3 className="text-lg font-bold text-ink-950">Tuition & Coaching</h3>
              <p className="text-xs text-ink-500 mt-1">For independent tutors and single-branch centers.</p>
            </div>
            <div className="text-3xl font-extrabold text-ink-950 tabular-nums">
              ₹18{' '}
              <span className="text-xs font-normal text-ink-500">/ student / month</span>
            </div>
            <ul className="text-xs text-ink-700 space-y-2 pt-2 border-t border-ink-100">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-600 flex-shrink-0" />
                <span>Up to 300 active students</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-600 flex-shrink-0" />
                <span>Mobile attendance & SMS alerts</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-600 flex-shrink-0" />
                <span>UPI fee collection & receipts</span>
              </li>
            </ul>
            <Button variant="secondary" size="md" className="w-full" onClick={onEnterDashboard}>
              Start 14-day trial
            </Button>
          </div>

          {/* School Pro (Recommended) */}
          <div className="bg-white rounded-card border-2 border-brand-600 p-6 shadow-dropdown relative space-y-4">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-600 text-white px-3 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-subtle">
              Most Popular for K-12 Schools
            </div>
            <div>
              <h3 className="text-lg font-bold text-ink-950">Institutional School OS</h3>
              <p className="text-xs text-ink-500 mt-1">For private schools, CBSE, ICSE, and state boards.</p>
            </div>
            <div className="text-3xl font-extrabold text-brand-700 tabular-nums">
              ₹35{' '}
              <span className="text-xs font-normal text-ink-500">/ student / month</span>
            </div>
            <ul className="text-xs text-ink-700 space-y-2 pt-2 border-t border-ink-100">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-600 flex-shrink-0" />
                <span>Unlimited students & faculty roles</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-600 flex-shrink-0" />
                <span>Automated UDISE+ census reports</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-600 flex-shrink-0" />
                <span>Intelligent timetable conflict engine</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-600 flex-shrink-0" />
                <span>Parent & student dedicated portal</span>
              </li>
            </ul>
            <Button variant="primary" size="md" className="w-full" onClick={onEnterDashboard}>
              Get started now
            </Button>
          </div>

          {/* Group / Multi-branch */}
          <div className="bg-white rounded-card border border-ink-200 p-6 shadow-card space-y-4">
            <div>
              <h3 className="text-lg font-bold text-ink-950">Multi-Branch Group</h3>
              <p className="text-xs text-ink-500 mt-1">For educational trusts, chains, and colleges.</p>
            </div>
            <div className="text-3xl font-extrabold text-ink-950 tabular-nums">
              Custom{' '}
              <span className="text-xs font-normal text-ink-500">tailored SLA</span>
            </div>
            <ul className="text-xs text-ink-700 space-y-2 pt-2 border-t border-ink-100">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-600 flex-shrink-0" />
                <span>Multi-campus centralized governance</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-600 flex-shrink-0" />
                <span>Custom ERP & accounting integrations</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-600 flex-shrink-0" />
                <span>Dedicated relationship manager & training</span>
              </li>
            </ul>
            <Button variant="secondary" size="md" className="w-full" onClick={() => alert('Contacting enterprise sales...')}>
              Contact enterprise sales
            </Button>
          </div>
        </div>
      </section>

      {/* 4. FREQUENTLY ASKED QUESTIONS */}
      <section className="bg-white rounded-modal border border-ink-200 p-6 sm:p-8 shadow-card space-y-4">
        <div className="pb-3 border-b border-ink-200">
          <h3 className="text-xl font-bold text-ink-950">Frequently Asked Questions</h3>
          <p className="text-xs text-ink-500">Key questions about deployment, data security, and rollout.</p>
        </div>

        <div className="divide-y divide-ink-100">
          {faqs.map((faq, i) => (
            <div key={i} className="py-3.5">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between text-left text-sm font-semibold text-ink-900 hover:text-brand-600 transition-colors"
              >
                <span>{faq.q}</span>
                {openFaq === i ? (
                  <ChevronUp className="w-4 h-4 text-ink-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-ink-500 flex-shrink-0" />
                )}
              </button>
              {openFaq === i && (
                <p className="mt-2 text-xs text-ink-600 leading-relaxed max-w-3xl">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 5. FINAL CALL TO ACTION */}
      <section className="bg-gradient-to-br from-brand-900 to-brand-700 text-white rounded-modal p-8 sm:p-10 text-center space-y-5 shadow-modal">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Ready to experience the EduMatrix difference?
        </h2>
        <p className="text-brand-100 max-w-xl mx-auto text-sm leading-relaxed">
          Join over 450+ forward-thinking schools and institutes modernizing daily operations with zero friction.
        </p>
        <div className="pt-2">
          <Button
            variant="primary"
            size="lg"
            className="bg-white text-brand-700 hover:bg-brand-50"
            icon={ArrowRight}
            iconPosition="right"
            onClick={onEnterDashboard}
          >
            Enter live EduMatrix workspace
          </Button>
        </div>
      </section>
    </div>
  );
};
