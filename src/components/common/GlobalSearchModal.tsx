import React, { useState } from 'react';
import { Search, User, CreditCard, CalendarClock, ArrowRight, X } from 'lucide-react';
import { Student } from '../../types';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  students: Student[];
  onSelectStudent: (student: Student) => void;
  onNavigate: (tab: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  students,
  onSelectStudent,
  onNavigate
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filtered = students.filter(
    (s) =>
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.id.toLowerCase().includes(query.toLowerCase()) ||
      s.guardianPhone.includes(query) ||
      s.class.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-stone-950/30 backdrop-blur-md" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-full max-w-xl bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-stone-200/60 overflow-hidden z-10 animate-fadeIn">
        {/* Top accent line matching Homepage modals */}
        <div className="h-1.5 bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 flex-shrink-0" />

        {/* Input Bar */}
        <div className="p-4 border-b border-stone-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-stone-400 flex-shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search students, classes, invoices, or workflows..."
            className="w-full text-sm font-medium text-stone-900 placeholder-stone-400 bg-transparent focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-stone-400 hover:text-stone-600 px-1.5 py-0.5 rounded"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-3 text-xs divide-y divide-stone-100">
          {/* Quick Nav actions if query empty */}
          {!query && (
            <div className="p-2 space-y-2">
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest px-1">
                Quick Navigation Shortcuts
              </span>
              <div className="space-y-1.5 mt-2">
                <button
                  onClick={() => {
                    onNavigate('attendance');
                    onClose();
                  }}
                  className="w-full p-2.5 rounded-xl flex items-center justify-between text-stone-700 hover:bg-amber-50/60 hover:text-stone-900 transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-amber-50 border border-amber-200/50 flex items-center justify-center text-amber-600">
                      <User className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-semibold text-xs">Mark Daily Attendance</span>
                  </span>
                  <span className="text-stone-400 font-medium">Class 10B</span>
                </button>

                <button
                  onClick={() => {
                    onNavigate('fees');
                    onClose();
                  }}
                  className="w-full p-2.5 rounded-xl flex items-center justify-between text-stone-700 hover:bg-amber-50/60 hover:text-stone-900 transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-200/50 flex items-center justify-center text-emerald-600">
                      <CreditCard className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-semibold text-xs">Record Term Fee Payment</span>
                  </span>
                  <span className="text-stone-500 font-semibold tabular-nums">₹4.15L Due</span>
                </button>

                <button
                  onClick={() => {
                    onNavigate('timetable');
                    onClose();
                  }}
                  className="w-full p-2.5 rounded-xl flex items-center justify-between text-stone-700 hover:bg-amber-50/60 hover:text-stone-900 transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-rose-50 border border-rose-200/50 flex items-center justify-center text-rose-600">
                      <CalendarClock className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-semibold text-xs">Class 10B Scheduling Conflict</span>
                  </span>
                  <span className="text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded-md text-[10px]">1 Clash</span>
                </button>
              </div>
            </div>
          )}

          {/* Filtered Students */}
          {query && filtered.length > 0 && (
            <div className="p-1 space-y-1">
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest px-2">
                Matching Student Records
              </span>
              {filtered.map((s) => (
                <div
                  key={s.id}
                  onClick={() => {
                    onSelectStudent(s);
                    onClose();
                  }}
                  className="p-2.5 rounded-xl flex items-center justify-between hover:bg-amber-50/60 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <img src={s.avatar} alt="" className="w-9 h-9 rounded-full object-cover border border-stone-200" />
                    <div>
                      <div className="font-semibold text-stone-900 group-hover:text-amber-700 transition-colors">
                        {s.name}
                      </div>
                      <div className="text-stone-400 font-mono text-[11px]">
                        {s.id} • {s.class} • {s.guardianPhone}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-amber-600 group-hover:translate-x-0.5 transition-all" />
                </div>
              ))}
            </div>
          )}

          {query && filtered.length === 0 && (
            <div className="p-8 text-center text-stone-500 text-xs">
              No matching records found for "{query}".
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-stone-50 border-t border-stone-100 text-[11px] text-stone-500 flex items-center justify-between px-5">
          <span>Press <kbd className="px-1.5 py-0.5 bg-white border border-stone-200 rounded text-stone-600 font-semibold shadow-xs">ESC</kbd> to exit</span>
          <span className="font-semibold text-amber-600 flex items-center gap-1">
            EduMatrix Instant Search
          </span>
        </div>
      </div>
    </div>
  );
};
