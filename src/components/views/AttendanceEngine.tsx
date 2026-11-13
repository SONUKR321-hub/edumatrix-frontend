import React, { useState } from 'react';
import { UserCheck, Calendar, Check, X, Clock, Minus, Save, CheckCircle2 } from 'lucide-react';
import { Student, AttendanceStatus } from '../../types';
import { Button } from '../ui/Button';

interface AttendanceEngineProps { students: Student[]; }

export const AttendanceEngine: React.FC<AttendanceEngineProps> = ({ students }) => {
  const [selectedClass, setSelectedClass] = useState('Class 10B');
  const [roster, setRoster] = useState<Record<string, { status: AttendanceStatus; note: string }>>(() => {
    const init: Record<string, { status: AttendanceStatus; note: string }> = {};
    students.forEach((s) => { init[s.id] = { status: s.id === 'STU-10293' ? 'excused' : 'present', note: s.id === 'STU-10293' ? 'Medical leave' : '' }; });
    return init;
  });
  const [dirty, setDirty] = useState(false);
  const [saved, setSaved] = useState<string | null>(null);

  const filtered = students.filter((s) => s.class === selectedClass);
  const total = filtered.length;
  const counts = { present: 0, absent: 0, late: 0, excused: 0 };
  filtered.forEach((s) => { const st = roster[s.id]?.status || 'present'; counts[st]++; });

  const setStatus = (id: string, status: AttendanceStatus) => { setRoster((p) => ({ ...p, [id]: { ...p[id], status } })); setDirty(true); setSaved(null); };
  const setNote = (id: string, note: string) => { setRoster((p) => ({ ...p, [id]: { ...p[id], note } })); setDirty(true); };
  const markAll = () => { const u = { ...roster }; filtered.forEach((s) => { u[s.id] = { status: 'present', note: '' }; }); setRoster(u); setDirty(true); setSaved(null); };
  const save = () => { setDirty(false); setSaved('Attendance saved! Parents of absent students notified via WhatsApp.'); setTimeout(() => setSaved(null), 5000); };

  const statusBtns: { key: AttendanceStatus; label: string; icon: any; active: string }[] = [
    { key: 'present', label: 'P', icon: Check, active: 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20' },
    { key: 'absent', label: 'A', icon: X, active: 'bg-rose-500 text-white shadow-md shadow-rose-500/20' },
    { key: 'late', label: 'L', icon: Clock, active: 'bg-amber-500 text-white shadow-md shadow-amber-500/20' },
    { key: 'excused', label: 'E', icon: Minus, active: 'bg-sky-500 text-white shadow-md shadow-sky-500/20' },
  ];

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-stone-900 tracking-tight">Daily Attendance</h1>
          <p className="mt-1 text-sm text-stone-500">Single-tap marking • Period 1 Morning</p>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            onClick={markAll}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-stone-200 text-stone-700 rounded-xl hover:bg-stone-50 shadow-sm text-sm font-semibold transition-all"
          >
            <Check className="w-4 h-4" />
            Mark all present
          </button>
          <button
            onClick={save}
            disabled={!dirty && !saved}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl shadow-lg shadow-amber-500/25 hover:from-amber-600 hover:to-orange-600 active:scale-[0.97] text-sm font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4" />
            Save attendance
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-2xl border border-stone-200/60 p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="bg-stone-50 border border-stone-200/60 rounded-xl px-3 py-2 text-sm font-semibold text-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-400/40"
          >
            <option value="Class 10B">Class 10B</option>
            <option value="Class 8A">Class 8A</option>
          </select>
          <div className="flex items-center gap-1.5 px-3 py-2 bg-stone-50 rounded-xl border border-stone-200/60 text-sm text-stone-600">
            <Calendar className="w-4 h-4 text-amber-500" />
            <span>Today, 13 Nov 2026</span>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 tabular-nums">{counts.present} Present</span>
          <span className="px-3 py-1.5 rounded-xl text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200 tabular-nums">{counts.absent} Absent</span>
          <span className="px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 tabular-nums">{counts.late} Late</span>
          <span className="px-3 py-1.5 rounded-xl text-xs font-bold bg-sky-50 text-sky-700 border border-sky-200 tabular-nums">{counts.excused} Excused</span>
        </div>
      </div>

      {/* Success Banner */}
      {saved && (
        <div className="bg-emerald-50/60 border border-emerald-200/60 rounded-2xl p-4 flex items-center justify-between text-emerald-800 text-sm font-medium animate-slideUp">
          <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-600" />{saved}</span>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-2xl border border-stone-200/60 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-stone-50/80 border-b border-stone-100 text-[11px] font-bold text-stone-400 uppercase tracking-wider">
              <th className="py-3 px-4 w-16">Roll</th>
              <th className="py-3 px-4">Student</th>
              <th className="py-3 px-4 text-center">Status</th>
              <th className="py-3 px-4">Note</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {filtered.map((s) => {
              const cur = roster[s.id] || { status: 'present', note: '' };
              return (
                <tr key={s.id} className="hover:bg-amber-50/30 transition-colors">
                  <td className="py-3 px-4 text-xs font-mono text-stone-400">{s.rollNo}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img src={s.avatar} alt="" className="w-9 h-9 rounded-full object-cover border border-stone-200/60" />
                      <div>
                        <div className="text-sm font-semibold text-stone-900">{s.name}</div>
                        <div className="text-[11px] text-stone-400">{s.guardianName}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center gap-1.5">
                      {statusBtns.map((b) => (
                        <button
                          key={b.key}
                          onClick={() => setStatus(s.id, b.key)}
                          className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${cur.status === b.key ? b.active : 'bg-stone-100 text-stone-500 hover:bg-stone-200'}`}
                          title={b.key}
                        >
                          <b.icon className="w-3.5 h-3.5" />
                        </button>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <input
                      type="text"
                      value={cur.note}
                      onChange={(e) => setNote(s.id, e.target.value)}
                      placeholder="Reason..."
                      className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-200 rounded-lg text-xs placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400/40"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {dirty && (
          <div className="sticky bottom-0 bg-stone-900 text-white p-4 flex items-center justify-between">
            <span className="text-sm"><span className="text-amber-400 font-bold">●</span> Unsaved changes</span>
            <div className="flex gap-2">
              <button
                onClick={() => setDirty(false)}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold text-stone-400 hover:text-white transition-colors"
              >
                Discard
              </button>
              <button
                onClick={save}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl shadow-lg shadow-amber-500/25 hover:from-amber-600 hover:to-orange-600 active:scale-[0.97] text-xs font-semibold transition-all"
              >
                <Save className="w-3.5 h-3.5" />Save
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
