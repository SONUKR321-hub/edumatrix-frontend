import React from 'react';
import { Building2, Calendar, ChevronDown, Bell, Search, LogOut } from 'lucide-react';
import { UserRole } from '../../types';

interface TopNavbarProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  activeTab: string;
  onNavigate: (tab: string) => void;
  onOpenSearch: () => void;
}

const roleNames: Record<string, { name: string; title: string; initials: string }> = {
  owner:      { name: 'Dr. M. Sundaram', title: 'Director',       initials: 'MS' },
  teacher:    { name: 'Priya Sharma',    title: 'Class Teacher',  initials: 'PS' },
  accountant: { name: 'Rajiv Chawla',    title: 'Head Accounts',  initials: 'RC' },
  parent:     { name: 'Rajesh Sharma',   title: 'Guardian',       initials: 'RS' },
  public:     { name: 'Guest',           title: 'Visitor',        initials: 'G'  },
};

export const TopNavbar: React.FC<TopNavbarProps> = ({ currentRole, onRoleChange, onNavigate, onOpenSearch }) => {
  const user = roleNames[currentRole] || roleNames.owner;
  return (
    <header className="sticky top-0 z-40 bg-[#FAFAF8]/80 backdrop-blur-xl border-b border-stone-200/50">
      <div className="px-5 sm:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-5">
          <button onClick={() => onNavigate('dashboard')} className="flex items-center gap-2.5 rounded-lg p-1 -m-1">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-amber-500/20">E</div>
            <div className="hidden sm:block">
              <span className="font-bold text-stone-900 text-base tracking-tight">EduMatrix</span>
              <p className="text-[11px] text-stone-400 -mt-0.5">Education OS</p>
            </div>
          </button>
          <div className="hidden md:flex items-center gap-2 pl-4 border-l border-stone-200/60 text-xs text-stone-500">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-stone-50 rounded-xl border border-stone-200/60 font-medium text-stone-700">
              <Building2 className="w-3.5 h-3.5 text-amber-500" />
              <span className="max-w-[140px] truncate">Delhi Public Academy</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-stone-50 rounded-xl border border-stone-200/60">
              <Calendar className="w-3.5 h-3.5 text-stone-400" />
              <span>2026–27 • Term 2</span>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-sm hidden lg:block">
          <button onClick={onOpenSearch} className="w-full flex items-center justify-between px-4 py-2 text-sm text-stone-400 bg-stone-50 hover:bg-stone-100 border border-stone-200/60 rounded-xl transition-colors">
            <span className="flex items-center gap-2"><Search className="w-4 h-4" />Search students...</span>
            <kbd className="px-1.5 py-0.5 text-[10px] font-semibold bg-white border border-stone-200 rounded text-stone-400">⌘K</kbd>
          </button>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <select
            value={currentRole}
            onChange={(e) => onRoleChange(e.target.value as UserRole)}
            className="text-xs font-semibold bg-stone-50 border border-stone-200/60 text-stone-700 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400/40 cursor-pointer"
          >
            <option value="owner">Owner / Principal</option>
            <option value="teacher">Teacher</option>
            <option value="accountant">Accountant</option>
            <option value="parent">Parent Portal</option>
            <option value="public">← Exit to Homepage</option>
          </select>
          <button className="relative p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
          </button>
          <div className="flex items-center gap-2.5 pl-3 border-l border-stone-200/60">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white font-bold flex items-center justify-center text-xs shadow-md shadow-amber-500/15">{user.initials}</div>
            <div className="hidden xl:block text-left">
              <p className="text-xs font-semibold text-stone-900 leading-none">{user.name}</p>
              <p className="text-[11px] text-stone-400 mt-0.5">{user.title}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
