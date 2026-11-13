import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, Clock, MapPin, User, Printer, Plus } from 'lucide-react';
import { TimetableSlot } from '../../types';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';

interface TimetableScheduleProps { slots: TimetableSlot[]; onResolveConflict: (slotId: string, sub: string) => void; }

export const TimetableSchedule: React.FC<TimetableScheduleProps> = ({ slots, onResolveConflict }) => {
  const [day, setDay] = useState('Monday');
  const [resolving, setResolving] = useState<TimetableSlot | null>(null);
  const [sub, setSub] = useState('Dr. Amit Verma');
  const conflict = slots.find((s) => s.isConflict);

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-stone-900 tracking-tight flex items-center gap-2">
            Timetable
            {conflict && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-600 border border-rose-200/50 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />1 Conflict
              </span>
            )}
          </h1>
          <p className="mt-1 text-sm text-stone-500">Real-time conflict detection across faculty &amp; rooms</p>
        </div>
        <div className="flex gap-2.5">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-stone-200 text-stone-700 rounded-xl hover:bg-stone-50 shadow-sm text-sm font-semibold transition-all"
          >
            <Printer className="w-4 h-4" />Print
          </button>
          <button
            onClick={() => alert('Add slot')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl shadow-lg shadow-amber-500/25 hover:from-amber-600 hover:to-orange-600 active:scale-[0.97] text-sm font-semibold transition-all"
          >
            <Plus className="w-4 h-4" />Add slot
          </button>
        </div>
      </div>

      {/* Conflict Banner */}
      {conflict && (
        <div className="bg-rose-50/60 border border-rose-200/60 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-slideUp">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-rose-100 text-rose-600">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-rose-900">Faculty Double-Booking Detected</h3>
              <p className="text-xs text-rose-700 font-medium mt-1">{conflict.conflictDetails}</p>
              <p className="text-[11px] text-rose-600 mt-0.5">Room 304 • Period 3 • Class 10B Chemistry</p>
            </div>
          </div>
          <button
            onClick={() => setResolving(conflict)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-rose-500 text-white rounded-xl hover:bg-rose-600 active:scale-[0.97] text-sm font-semibold transition-all shadow-sm"
          >
            <CheckCircle2 className="w-4 h-4" />Resolve now
          </button>
        </div>
      )}

      {/* Day Tabs */}
      <div className="bg-white rounded-2xl border border-stone-200/60 p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex gap-1 overflow-x-auto">
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((d) => (
            <button
              key={d}
              onClick={() => setDay(d)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${day === d ? 'bg-stone-900 text-white' : 'text-stone-600 hover:bg-stone-100'}`}
            >
              {d}
            </button>
          ))}
        </div>
        <span className="text-xs text-stone-400 font-medium">Class 10B • JEE Foundation</span>
      </div>

      {/* Period Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {slots.map((s) => (
          <div
            key={s.id}
            className={`bg-white rounded-xl border border-stone-200/60 p-3.5 shadow-sm transition-all ${s.isConflict ? 'bg-rose-50/60 border-rose-200/60' : 'hover:shadow-md hover:-translate-y-0.5'}`}
          >
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded-lg text-[11px] font-bold bg-stone-100 text-stone-600 tabular-nums">P{s.period}</span>
              <span className="text-xs text-stone-400 flex items-center gap-1 tabular-nums">
                <Clock className="w-3.5 h-3.5" />{s.startTime} – {s.endTime}
              </span>
            </div>
            <h3 className="font-semibold text-stone-900 mt-3">{s.subject}</h3>
            <div className="mt-2.5 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs text-stone-500">
                <User className="w-3.5 h-3.5 text-stone-400" />
                <span className="font-medium text-stone-700">{s.teacher}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-stone-500">
                <MapPin className="w-3.5 h-3.5 text-stone-400" />{s.room}
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
              {s.isConflict ? (
                <>
                  <span className="text-[11px] font-bold text-rose-600">Double booked</span>
                  <button
                    onClick={() => setResolving(s)}
                    className="px-2.5 py-1 bg-rose-500 text-white rounded-lg hover:bg-rose-600 active:scale-[0.97] text-xs font-semibold transition-all"
                  >
                    Fix
                  </button>
                </>
              ) : (
                <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />No clashes
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Resolve Conflict Modal */}
      {resolving && (
        <Modal
          isOpen={!!resolving}
          onClose={() => setResolving(null)}
          title="Resolve Conflict"
          maxWidth="md"
          footer={
            <div className="w-full flex justify-between">
              <button
                onClick={() => setResolving(null)}
                className="px-4 py-2 bg-white border border-stone-200 text-stone-700 rounded-xl hover:bg-stone-50 shadow-sm text-sm font-semibold transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => { onResolveConflict(resolving.id, sub); setResolving(null); }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl shadow-lg shadow-amber-500/25 hover:from-amber-600 hover:to-orange-600 active:scale-[0.97] text-sm font-semibold transition-all"
              >
                <CheckCircle2 className="w-4 h-4" />Apply substitution
              </button>
            </div>
          }
        >
          <div className="space-y-4 text-xs">
            <div className="bg-rose-50/60 border border-rose-200/60 rounded-2xl p-5 text-rose-800 font-semibold text-sm">
              {resolving.conflictDetails}
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Available Faculty</label>
              <select
                value={sub}
                onChange={(e) => setSub(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200/60 rounded-xl px-3 py-2 text-sm font-semibold text-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-400/40"
              >
                <option>Dr. Amit Verma</option>
                <option>Ms. Shalini Saxena</option>
              </select>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
