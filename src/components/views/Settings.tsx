import React, { useState } from 'react';
import { 
  Building2, 
  Clock, 
  CreditCard, 
  Bell, 
  ShieldCheck, 
  Save, 
  CheckCircle2, 
  Smartphone, 
  Mail, 
  Lock, 
  Download, 
  RefreshCw,
  Sliders,
  Globe
} from 'lucide-react';
import { Button } from '../ui/Button';

export const Settings: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'general' | 'academic' | 'fees' | 'notifications' | 'security'>('general');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // General Settings State
  const [generalForm, setGeneralForm] = useState({
    schoolName: 'Delhi Public Academy',
    affiliationBoard: 'CBSE (Central Board of Secondary Education)',
    udiseCode: '07040209801',
    schoolEmail: 'contact@delhipublicacademy.edu.in',
    phone: '+91 11 2789 4400',
    address: 'Plot 12, Institutional Area, Sector 5, Rohini, New Delhi - 110085',
    academicYear: '2026–2027',
    currentTerm: 'Term 2 (Mid-Session)'
  });

  // Academic & Attendance State
  const [academicConfig, setAcademicConfig] = useState({
    minAttendancePercent: 75,
    cutoffTime: '08:30',
    autoNotifyParentsOnAbsent: true,
    periodsPerDay: 8,
    workingDays: 'Monday to Saturday',
    conflictWarningSensitivity: 'High'
  });

  // Fee Config State
  const [feeConfig, setFeeConfig] = useState({
    upiId: 'dpa.fees@icici',
    merchantName: 'Delhi Public Academy Society',
    gracePeriodDays: 7,
    lateFeeAmount: 250,
    receiptPrefix: 'REC-2026-',
    allowPartialPayments: true,
    autoGenerateReceipts: true
  });

  // Notification Toggles
  const [notificationConfig, setNotificationConfig] = useState({
    whatsappFeeReminders: true,
    whatsappAttendanceAlerts: true,
    emailDailySummary: true,
    smsEmergencyBroadcast: true,
    parentPortalFeed: true
  });

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 4000);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200/60">
        <div>
          <h1 className="text-2xl font-bold text-stone-900 tracking-tight">System Settings & Configuration</h1>
          <p className="mt-1 text-sm text-stone-500">
            Configure institutional profile, academic thresholds, payment gateways, and compliance policies.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button 
            variant="primary" 
            icon={Save} 
            onClick={handleSave}
          >
            Save changes
          </Button>
        </div>
      </div>

      {/* Success Banner */}
      {saveSuccess && (
        <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between text-emerald-800 text-sm font-semibold animate-slideUp">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <span>Settings saved successfully! Updated configurations are now live across all portals.</span>
          </div>
          <span className="text-xs text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">Updated</span>
        </div>
      )}

      {/* Settings Navigation Tabs */}
      <div className="bg-white rounded-2xl border border-stone-200/60 p-1.5 shadow-sm flex flex-wrap gap-1">
        {[
          { id: 'general', label: 'Institution Profile', icon: Building2 },
          { id: 'academic', label: 'Attendance & Timetable', icon: Clock },
          { id: 'fees', label: 'Fee & Payment Gateway', icon: CreditCard },
          { id: 'notifications', label: 'Alerts & WhatsApp', icon: Bell },
          { id: 'security', label: 'Compliance & Backups', icon: ShieldCheck },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-amber-50 text-amber-800 shadow-xs border border-amber-200/60'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-amber-600' : 'text-stone-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ─── TAB 1: INSTITUTION PROFILE ─── */}
      {activeSubTab === 'general' && (
        <div className="bg-white rounded-2xl border border-stone-200/60 p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div>
              <h2 className="text-base font-bold text-stone-900">Institution Information</h2>
              <p className="text-xs text-stone-500">Official registry details appearing on fee receipts and report cards.</p>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              CBSE Affiliated
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">School / Institution Legal Name</label>
              <input
                type="text"
                value={generalForm.schoolName}
                onChange={(e) => setGeneralForm({ ...generalForm, schoolName: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">Affiliation Board</label>
              <input
                type="text"
                value={generalForm.affiliationBoard}
                onChange={(e) => setGeneralForm({ ...generalForm, affiliationBoard: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">National UDISE+ Code</label>
              <input
                type="text"
                value={generalForm.udiseCode}
                onChange={(e) => setGeneralForm({ ...generalForm, udiseCode: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm font-mono text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              />
              <p className="text-[11px] text-stone-400 mt-1">Required for statutory Ministry of Education XML exports</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">Official Administrative Email</label>
              <input
                type="email"
                value={generalForm.schoolEmail}
                onChange={(e) => setGeneralForm({ ...generalForm, schoolEmail: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">Primary Contact Hotline</label>
              <input
                type="tel"
                value={generalForm.phone}
                onChange={(e) => setGeneralForm({ ...generalForm, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">Active Academic Session</label>
              <select
                value={generalForm.academicYear}
                onChange={(e) => setGeneralForm({ ...generalForm, academicYear: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              >
                <option value="2026–2027">2026–2027 (Current Active)</option>
                <option value="2027–2028">2027–2028 (Next Session)</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">Campus Registered Address</label>
              <textarea
                rows={2}
                value={generalForm.address}
                onChange={(e) => setGeneralForm({ ...generalForm, address: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              />
            </div>
          </div>
        </div>
      )}

      {/* ─── TAB 2: ATTENDANCE & SCHEDULE ─── */}
      {activeSubTab === 'academic' && (
        <div className="bg-white rounded-2xl border border-stone-200/60 p-6 shadow-sm space-y-6">
          <div className="pb-3 border-b border-stone-100">
            <h2 className="text-base font-bold text-stone-900">Attendance Rules & Scheduling Parameters</h2>
            <p className="text-xs text-stone-500">Configure academic threshold triggers and conflict detection sensitivity.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-4 rounded-xl border border-stone-200/60 bg-stone-50/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-stone-900">CBSE Minimum Attendance Requirement</span>
                <span className="text-amber-700 font-bold tabular-nums text-sm">{academicConfig.minAttendancePercent}%</span>
              </div>
              <p className="text-xs text-stone-500">
                Students dropping below this percentage are automatically flagged for principal review and hall-ticket restrictions.
              </p>
              <input
                type="range"
                min="60"
                max="90"
                value={academicConfig.minAttendancePercent}
                onChange={(e) => setAcademicConfig({ ...academicConfig, minAttendancePercent: Number(e.target.value) })}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            <div className="p-4 rounded-xl border border-stone-200/60 bg-stone-50/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-stone-900">Daily Morning Attendance Cut-Off</span>
                <span className="text-stone-700 font-mono text-xs font-semibold">{academicConfig.cutoffTime} AM</span>
              </div>
              <p className="text-xs text-stone-500">
                Marks arriving students as "Late" if checked in after this time.
              </p>
              <input
                type="time"
                value={academicConfig.cutoffTime}
                onChange={(e) => setAcademicConfig({ ...academicConfig, cutoffTime: e.target.value })}
                className="px-3 py-1.5 bg-white border border-stone-200 rounded-lg text-sm text-stone-900"
              />
            </div>

            <div className="p-4 rounded-xl border border-stone-200/60 bg-stone-50/50 flex items-center justify-between gap-4">
              <div>
                <span className="text-sm font-semibold text-stone-900 block">Instant Parent WhatsApp Absence Alert</span>
                <span className="text-xs text-stone-500">Send WhatsApp SMS to guardian as soon as teacher marks absent.</span>
              </div>
              <input
                type="checkbox"
                checked={academicConfig.autoNotifyParentsOnAbsent}
                onChange={(e) => setAcademicConfig({ ...academicConfig, autoNotifyParentsOnAbsent: e.target.checked })}
                className="w-5 h-5 rounded text-amber-500 focus:ring-amber-400 accent-amber-500 cursor-pointer"
              />
            </div>

            <div className="p-4 rounded-xl border border-stone-200/60 bg-stone-50/50 flex items-center justify-between gap-4">
              <div>
                <span className="text-sm font-semibold text-stone-900 block">Double-Booking Conflict Engine</span>
                <span className="text-xs text-stone-500">Block overlapping rooms and faculty assignments in real-time.</span>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">Active</span>
            </div>
          </div>
        </div>
      )}

      {/* ─── TAB 3: FEES & PAYMENTS ─── */}
      {activeSubTab === 'fees' && (
        <div className="bg-white rounded-2xl border border-stone-200/60 p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div>
              <h2 className="text-base font-bold text-stone-900">Payment Gateway & Billing Configuration</h2>
              <p className="text-xs text-stone-500">Manage instant UPI collection, merchant accounts, and receipt numbering.</p>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              NPCI UPI Connected
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">Institutional UPI VPA / Handle</label>
              <input
                type="text"
                value={feeConfig.upiId}
                onChange={(e) => setFeeConfig({ ...feeConfig, upiId: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm font-mono text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              />
              <p className="text-[11px] text-stone-400 mt-1">Parents scan QR or tap to pay directly into this verified ICICI bank account</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">Merchant Display Name</label>
              <input
                type="text"
                value={feeConfig.merchantName}
                onChange={(e) => setFeeConfig({ ...feeConfig, merchantName: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">Grace Period After Due Date (Days)</label>
              <input
                type="number"
                value={feeConfig.gracePeriodDays}
                onChange={(e) => setFeeConfig({ ...feeConfig, gracePeriodDays: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">Automated Receipt Number Prefix</label>
              <input
                type="text"
                value={feeConfig.receiptPrefix}
                onChange={(e) => setFeeConfig({ ...feeConfig, receiptPrefix: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm font-mono text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              />
            </div>

            <div className="md:col-span-2 p-4 rounded-xl border border-stone-200/60 bg-stone-50/50 flex items-center justify-between">
              <div>
                <span className="text-sm font-semibold text-stone-900 block">Allow Partial & Installment Payments</span>
                <span className="text-xs text-stone-500">Parents can pay in modular installments with automated balance reconciliation.</span>
              </div>
              <input
                type="checkbox"
                checked={feeConfig.allowPartialPayments}
                onChange={(e) => setFeeConfig({ ...feeConfig, allowPartialPayments: e.target.checked })}
                className="w-5 h-5 rounded text-amber-500 focus:ring-amber-400 accent-amber-500 cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

      {/* ─── TAB 4: NOTIFICATIONS & CHANNELS ─── */}
      {activeSubTab === 'notifications' && (
        <div className="bg-white rounded-2xl border border-stone-200/60 p-6 shadow-sm space-y-6">
          <div className="pb-3 border-b border-stone-100">
            <h2 className="text-base font-bold text-stone-900">Communication & Alert Dispatch Channels</h2>
            <p className="text-xs text-stone-500">Configure WhatsApp Business API, SMS routes, and automated guardian reminders.</p>
          </div>

          <div className="space-y-3.5">
            {[
              {
                id: 'whatsappFeeReminders',
                title: 'WhatsApp Fee Due Reminders',
                desc: 'Automated gentle reminders sent 3 days before due date with instant payment link.',
                icon: Smartphone
              },
              {
                id: 'whatsappAttendanceAlerts',
                title: 'Instant Morning Attendance SMS / WhatsApp',
                desc: 'Notifies parents when child is marked late or absent during Period 1 check-in.',
                icon: Bell
              },
              {
                id: 'emailDailySummary',
                title: 'Principal Daily Operational Digest (Email)',
                desc: 'Delivers summary of total fees collected, teacher substitutions, and student count at 05:00 PM.',
                icon: Mail
              },
              {
                id: 'smsEmergencyBroadcast',
                title: 'High-Priority Emergency Broadcast Channel',
                desc: 'Overrides silent filters for weather alerts, early dispersal, or bus delay announcements.',
                icon: ShieldCheck
              }
            ].map((channel) => {
              const Icon = channel.icon;
              const isChecked = (notificationConfig as any)[channel.id];
              return (
                <div key={channel.id} className="p-4 rounded-xl border border-stone-200/60 bg-stone-50/40 flex items-center justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200/50 flex items-center justify-center text-amber-600 flex-shrink-0 mt-0.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-stone-900">{channel.title}</h4>
                      <p className="text-xs text-stone-500 mt-0.5">{channel.desc}</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => setNotificationConfig({ ...notificationConfig, [channel.id]: e.target.checked })}
                    className="w-5 h-5 rounded text-amber-500 focus:ring-amber-400 accent-amber-500 cursor-pointer flex-shrink-0"
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ─── TAB 5: COMPLIANCE & BACKUPS ─── */}
      {activeSubTab === 'security' && (
        <div className="bg-white rounded-2xl border border-stone-200/60 p-6 shadow-sm space-y-6">
          <div className="pb-3 border-b border-stone-100">
            <h2 className="text-base font-bold text-stone-900">Data Protection (DPDP 2023) & Backup Governance</h2>
            <p className="text-xs text-stone-500">Compliance checkpoints, cryptographic audit logs, and data exports.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border border-stone-200/60 bg-stone-50/50">
              <span className="text-xs font-semibold text-stone-500 uppercase">DPDP Act 2023</span>
              <p className="text-lg font-bold text-emerald-700 mt-1">Fully Compliant</p>
              <p className="text-xs text-stone-500 mt-1">Parent consent recorded for all student records & media.</p>
            </div>

            <div className="p-4 rounded-xl border border-stone-200/60 bg-stone-50/50">
              <span className="text-xs font-semibold text-stone-500 uppercase">Automated Backups</span>
              <p className="text-lg font-bold text-stone-900 mt-1">Daily at 02:00 AM</p>
              <p className="text-xs text-stone-500 mt-1">Encrypted AES-256 replica stored in AWS ap-south-1 (Mumbai).</p>
            </div>

            <div className="p-4 rounded-xl border border-stone-200/60 bg-stone-50/50">
              <span className="text-xs font-semibold text-stone-500 uppercase">Role-Based Access</span>
              <p className="text-lg font-bold text-stone-900 mt-1">Active (4 Roles)</p>
              <p className="text-xs text-stone-500 mt-1">Strict boundary separation between Teacher, Accounts, and Parents.</p>
            </div>
          </div>

          <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h4 className="text-sm font-semibold text-stone-900">Institutional Archive Export</h4>
              <p className="text-xs text-stone-500">Download complete encrypted ZIP packet containing student records, fee ledgers, and attendance history.</p>
            </div>
            <Button
              variant="secondary"
              icon={Download}
              onClick={() => alert('Packaging encrypted institution backup (ZIP) — Download will begin shortly.')}
            >
              Export full institutional backup
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
