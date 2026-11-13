import React from 'react';
import { Users, UserCheck, CreditCard, CalendarClock, ArrowRight, PlusCircle, Send, ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { StatCard } from '../ui/StatCard';
import { SystemAlert, AuditLog } from '../../types';

interface OwnerDashboardProps {
  alerts: SystemAlert[];
  auditLogs: AuditLog[];
  onNavigate: (tab: string) => void;
  onOpenAddStudent: () => void;
  onOpenRecordPayment: () => void;
}

export const OwnerDashboard: React.FC<OwnerDashboardProps> = ({
  alerts,
  auditLogs,
  onNavigate,
  onOpenAddStudent,
  onOpenRecordPayment,
}) => (
  <div className="space-y-6 animate-fadeIn">
    {/* Header */}
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-stone-900 tracking-tight">
          Good afternoon, Dr. Sundaram
        </h1>
        <p className="mt-1 text-sm text-stone-500">
          Delhi Public Academy • Term 2 • Friday, 13 Nov 2026
        </p>
      </div>
      <div className="flex items-center flex-wrap gap-2.5">
        <Button variant="secondary" size="md" icon={UserCheck} onClick={() => onNavigate('attendance')}>
          Mark attendance
        </Button>
        <Button variant="secondary" size="md" icon={CreditCard} onClick={onOpenRecordPayment}>
          Record payment
        </Button>
        <Button variant="primary" size="md" icon={PlusCircle} onClick={onOpenAddStudent}>
          Add student
        </Button>
      </div>
    </div>

    {/* Metric stat cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        label="Today's Attendance"
        value="94.6%"
        change="+1.2%"
        isPositiveChange
        subtitle="1,344 of 1,420 students present"
        icon={UserCheck}
        onClick={() => onNavigate('attendance')}
      />
      <StatCard
        label="November Collection"
        value="₹34.8L"
        change="82% target"
        isPositiveChange
        subtitle="₹4.15L outstanding across 48 families"
        icon={CreditCard}
        onClick={() => onNavigate('fees')}
      />
      <StatCard
        label="Active Teachers"
        value="81/84"
        change="3 absent"
        isPositiveChange={false}
        subtitle="4 substitution slots need assignment"
        icon={Users}
        onClick={() => onNavigate('timetable')}
      />
      <StatCard
        label="Classes Today"
        value="42"
        subtitle="1 schedule conflict flagged in Class 10B"
        icon={CalendarClock}
        onClick={() => onNavigate('timetable')}
      />
    </div>

    {/* Alerts + Sidebar */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      {/* Alerts panel */}
      <div className="lg:col-span-2 bg-white rounded-2xl border border-stone-200/60 p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <h2 className="text-sm font-bold text-stone-900 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            Needs your attention
          </h2>
          <span className="text-xs text-stone-400">{alerts.length} items</span>
        </div>
        {alerts.map((a) => (
          <div
            key={a.id}
            className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
              a.type === 'critical'
                ? 'bg-rose-50/50 border-rose-200/60'
                : a.type === 'warning'
                ? 'bg-amber-50/50 border-amber-200/60'
                : 'bg-sky-50/50 border-sky-200/60'
            }`}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                    a.type === 'critical'
                      ? 'bg-rose-100 text-rose-700'
                      : a.type === 'warning'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-sky-100 text-sky-700'
                  }`}
                >
                  {a.type}
                </span>
                <span className="text-sm font-semibold text-stone-900">{a.title}</span>
              </div>
              <p className="text-xs text-stone-600">{a.description}</p>
            </div>
            <Button
              variant={a.type === 'critical' ? 'destructive' : 'primary'}
              size="sm"
              onClick={() => onNavigate(a.actionKey)}
              icon={ArrowRight}
              iconPosition="right"
            >
              {a.actionLabel}
            </Button>
          </div>
        ))}
      </div>

      {/* Right sidebar */}
      <div className="space-y-4">
        {/* Benchmarks progress */}
        <div className="bg-white rounded-2xl border border-stone-200/60 p-5 shadow-sm">
          <h3 className="text-sm font-bold text-stone-900 pb-3 border-b border-stone-100 mb-4">
            Benchmarks
          </h3>
          {[
            { label: 'Fee realization', value: '89.3%', pct: 89.3, color: 'bg-amber-500' },
            { label: 'Attendance verified', value: '39/42', pct: 92.8, color: 'bg-emerald-500' },
            { label: 'Syllabus pacing', value: 'On track', pct: 75, color: 'bg-sky-500' },
          ].map((b) => (
            <div key={b.label} className="mb-3">
              <div className="flex justify-between text-xs text-stone-600 mb-1.5">
                <span>{b.label}</span>
                <span className="font-semibold text-stone-900 tabular-nums">{b.value}</span>
              </div>
              <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden">
                <div
                  className={`${b.color} h-full rounded-full transition-all`}
                  style={{ width: `${b.pct}%` }}
                />
              </div>
            </div>
          ))}
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-between mt-2 text-amber-700"
            onClick={() => onNavigate('reports')}
            icon={ChevronRight}
            iconPosition="right"
          >
            View analytics
          </Button>
        </div>

        {/* Broadcast card */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/50 rounded-2xl p-4 flex items-start gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/20">
            <Send className="w-4 h-4" />
          </div>
          <div className="space-y-1 text-xs">
            <h4 className="font-bold text-stone-900">Send Announcement</h4>
            <p className="text-stone-600">Broadcast to parents via WhatsApp &amp; Portal.</p>
            <Button
              variant="soft"
              size="sm"
              className="mt-1.5"
              onClick={() => onNavigate('communication')}
            >
              Compose
            </Button>
          </div>
        </div>
      </div>
    </div>

    {/* Audit log */}
    <div className="bg-white rounded-2xl border border-stone-200/60 p-5 shadow-sm">
      <h2 className="text-sm font-bold text-stone-900 pb-3 border-b border-stone-100">
        Recent Activity
      </h2>
      <div className="divide-y divide-stone-100">
        {auditLogs.slice(0, 5).map((l) => (
          <div key={l.id} className="py-3 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-stone-100 text-stone-600 font-semibold flex items-center justify-center text-[11px]">
                {l.actor
                  .split(' ')
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join('')}
              </div>
              <div>
                <span className="font-semibold text-stone-900">{l.actor}</span>
                <span className="text-stone-400 ml-1">({l.role})</span>
                <p className="text-stone-500 mt-0.5">
                  {l.action} →{' '}
                  <span className="font-medium text-stone-700">{l.target}</span>
                </p>
              </div>
            </div>
            <span className="text-stone-400 tabular-nums whitespace-nowrap">{l.timestamp}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);
