import React from 'react';
import { Home, Users, UserCheck, CreditCard, CalendarClock, GraduationCap, FileText, MessageSquare, BarChart3, Settings, Layers, ShieldCheck } from 'lucide-react';
import { UserRole } from '../../types';

interface AppSidebarProps { currentRole: UserRole; activeTab: string; onNavigate: (tab: string) => void; overdueCount?: number; conflictsCount?: number; }

export const AppSidebar: React.FC<AppSidebarProps> = ({ currentRole, activeTab, onNavigate, overdueCount = 1, conflictsCount = 1 }) => {
  const items = currentRole === 'teacher' ? [
    { id: 'attendance', label: 'Mark Attendance', icon: UserCheck, badge: 'Today' },
    { id: 'students', label: 'Class Roster', icon: Users },
    { id: 'timetable', label: 'My Schedule', icon: CalendarClock },
    { id: 'exams', label: 'Exams & Grades', icon: GraduationCap },
    { id: 'communication', label: 'Messages', icon: MessageSquare },
  ] : currentRole === 'parent' ? [
    { id: 'parent-portal', label: 'Child Dashboard', icon: Home },
    { id: 'attendance', label: 'Attendance', icon: UserCheck },
    { id: 'fees', label: 'Fee Payments', icon: CreditCard, badge: '₹8.5K' },
    { id: 'timetable', label: 'Timetable', icon: CalendarClock },
    { id: 'communication', label: 'Messages', icon: MessageSquare },
  ] : currentRole === 'accountant' ? [
    { id: 'fees', label: 'Fee Collection', icon: CreditCard, badge: overdueCount ? `${overdueCount}` : undefined },
    { id: 'students', label: 'Billing Records', icon: Users },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'settings', label: 'Fee Config', icon: Settings },
  ] : [
    { id: 'dashboard', label: 'Overview', icon: Home },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'attendance', label: 'Attendance', icon: UserCheck },
    { id: 'fees', label: 'Fees', icon: CreditCard, badge: overdueCount ? `${overdueCount}` : undefined },
    { id: 'timetable', label: 'Timetable', icon: CalendarClock, badge: conflictsCount ? '!' : undefined, badgeColor: 'bg-rose-100 text-rose-600' },
    { id: 'exams', label: 'Exams', icon: GraduationCap },
    { id: 'communication', label: 'Messages', icon: MessageSquare },
    { id: 'reports', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-60 bg-white/60 backdrop-blur-sm border-r border-stone-200/50 flex flex-col flex-shrink-0 min-h-[calc(100vh-4rem)]">
      <div className="p-3 flex-1 space-y-0.5">
        <div className="px-3 py-2.5 text-[10px] font-bold uppercase tracking-[0.15em] text-stone-400">
          {currentRole === 'owner' ? 'Management' : currentRole === 'teacher' ? 'Classroom' : currentRole === 'accountant' ? 'Finance' : 'Portal'}
        </div>
        {items.map((item) => {
          const active = activeTab === item.id;
          const Icon = item.icon;
          return (
            <button key={item.id} onClick={() => onNavigate(item.id)} className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-150 group ${active ? 'bg-amber-50 text-amber-800 font-semibold shadow-sm border border-amber-200/50' : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'}`}>
              <div className="flex items-center gap-2.5">
                <Icon className={`w-[18px] h-[18px] ${active ? 'text-amber-600' : 'text-stone-400 group-hover:text-stone-500'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold tabular-nums ${item.badgeColor || (active ? 'bg-amber-200/60 text-amber-800' : 'bg-stone-100 text-stone-500')}`}>{item.badge}</span>}
            </button>
          );
        })}
      </div>
      <div className="p-3 m-3 rounded-xl bg-stone-50 border border-stone-200/50 text-[11px] text-stone-500 flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-amber-500 flex-shrink-0" />
        <span>UDISE+ Compliant • DPDP 2023</span>
      </div>
    </aside>
  );
};
