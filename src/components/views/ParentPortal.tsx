import React, { useState } from 'react';
import { 
  User, 
  CalendarClock, 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  FileText, 
  GraduationCap, 
  MessageSquare, 
  Bell, 
  ChevronRight, 
  ArrowRight,
  ShieldCheck,
  Send,
  Bus
} from 'lucide-react';
import { Student } from '../../types';
import { Button } from '../ui/Button';
import { StatusBadge } from '../ui/StatusBadge';

interface ParentPortalProps {
  students: Student[];
  onOpenRecordPayment: (student: Student) => void;
}

export const ParentPortal: React.FC<ParentPortalProps> = ({
  students,
  onOpenRecordPayment
}) => {
  const [activeChildId, setActiveChildId] = useState('STU-10291'); // Default Aarav Sharma
  const activeChild = students.find((s) => s.id === activeChildId) || students[0];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Child Switcher Header */}
      <div className="bg-white rounded-2xl border border-stone-200/60 p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-amber-600 uppercase tracking-widest">
            Parent Portal • Delhi Public Academy
          </span>
          <h1 className="text-2xl font-bold text-stone-900 mt-1">
            Welcome, Mr. Rajesh Sharma
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Real-time academic feed, daily attendance, fee ledger, and direct teacher channel.
          </p>
        </div>

        {/* Child Selector Pills */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-stone-600 px-2">Viewing:</span>
          <button
            onClick={() => setActiveChildId('STU-10291')}
            className={`rounded-xl px-4 py-2 text-sm border transition-all ${
              activeChildId === 'STU-10291'
                ? 'bg-amber-50 border-amber-400 text-amber-700 font-semibold'
                : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-white'
            }`}
          >
            Aarav (Class 10B)
          </button>
          <button
            onClick={() => setActiveChildId('STU-10297')}
            className={`rounded-xl px-4 py-2 text-sm border transition-all ${
              activeChildId === 'STU-10297'
                ? 'bg-amber-50 border-amber-400 text-amber-700 font-semibold'
                : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-white'
            }`}
          >
            Kavya (Class 8A)
          </button>
        </div>
      </div>

      {/* Child Quick Snapshot Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Attendance Status */}
        <div className="bg-white rounded-2xl border border-stone-200/60 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-stone-500">Attendance This Term</span>
            <StatusBadge status="present" size="sm" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-emerald-700 tabular-nums">
              {activeChild.attendanceRate}%
            </span>
            <span className="text-xs text-stone-500">Present today at 08:15 AM</span>
          </div>
          <p className="text-xs text-stone-600 mt-2">
            Regular attendance; complies with board eligibility criteria.
          </p>
        </div>

        {/* Pending Fee Notice */}
        <div className="bg-white rounded-2xl border border-stone-200/60 p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-stone-500">Term 2 Fee Status</span>
              <StatusBadge status={activeChild.feeStatus} size="sm" />
            </div>
            <div className="mt-3 text-3xl font-bold text-rose-700 tabular-nums">
              ₹{activeChild.outstandingBalance.toLocaleString('en-IN')}
            </div>
            <p className="text-xs text-stone-500 mt-1">Due date: 20 Nov 2026</p>
          </div>

          <div className="mt-4 pt-3 border-t border-stone-100">
            {activeChild.outstandingBalance > 0 ? (
              <button
                onClick={() => onOpenRecordPayment(activeChild)}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl px-4 py-2 text-sm font-semibold shadow-lg shadow-amber-500/25"
              >
                <CreditCard className="w-4 h-4" />
                Pay ₹{activeChild.outstandingBalance.toLocaleString('en-IN')} via UPI
              </button>
            ) : (
              <div className="text-xs text-emerald-700 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                All tuition fees cleared
              </div>
            )}
          </div>
        </div>

        {/* Bus & Transport Status */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/50 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-stone-500">School Bus Route 14</span>
            <span className="px-2 py-0.5 rounded text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              On Campus
            </span>
          </div>
          <div className="mt-3 flex items-center gap-2 text-stone-900 font-bold text-lg">
            <Bus className="w-5 h-5 text-amber-600" />
            <span>Reached 08:10 AM</span>
          </div>
          <p className="text-xs text-stone-500 mt-2">
            Afternoon departure scheduled at 02:45 PM. Driver: Baljit Singh (+91 98112 00412).
          </p>
        </div>
      </div>

      {/* Today's Schedule for the Child */}
      <div className="bg-white rounded-2xl border border-stone-200/60 p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <h2 className="text-sm font-bold text-stone-900">
            Today's Timetable & Subjects ({activeChild.class})
          </h2>
          <span className="text-xs text-stone-500">Friday Schedule</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
            <span className="text-stone-500 font-mono">08:30 – 09:15 AM</span>
            <h4 className="font-bold text-stone-900 mt-1">Mathematics</h4>
            <p className="text-stone-600 mt-0.5">Dr. Ramesh Kulkarni</p>
          </div>
          <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
            <span className="text-stone-500 font-mono">09:20 – 10:05 AM</span>
            <h4 className="font-bold text-stone-900 mt-1">Physics Lab</h4>
            <p className="text-stone-600 mt-0.5">Mrs. Priya Sharma</p>
          </div>
          <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
            <span className="text-stone-500 font-mono">10:15 – 11:00 AM</span>
            <h4 className="font-bold text-stone-900 mt-1">Chemistry</h4>
            <p className="text-stone-600 mt-0.5">Dr. Amit Verma</p>
          </div>
          <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
            <span className="text-stone-500 font-mono">11:05 – 11:50 AM</span>
            <h4 className="font-bold text-stone-900 mt-1">English Literature</h4>
            <p className="text-stone-600 mt-0.5">Mr. David George</p>
          </div>
        </div>
      </div>

      {/* Recent Notice from School */}
      <div className="flex items-start gap-3 p-3 bg-stone-50 rounded-xl border border-stone-100">
        <div className="p-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white flex-shrink-0">
          <Bell className="w-5 h-5" />
        </div>
        <div className="space-y-1 text-xs flex-1">
          <div className="flex items-center gap-2">
            <span className="font-bold text-stone-900 text-sm">
              Circular: Annual Science Fair & Robotics Exhibition
            </span>
            <span className="text-amber-600 text-[11px]">• 12 Nov 2026</span>
          </div>
          <p className="text-stone-600 leading-relaxed">
            Parents are cordially invited to visit the campus on Saturday, 28th November from 10:00 AM to 01:00 PM. Students of Class 10B will demonstrate working prototypes in Hall 2.
          </p>
          <div className="pt-2 flex items-center gap-2">
            <button className="px-3 py-1.5 text-xs font-semibold rounded-xl border border-stone-200 bg-white text-stone-700 hover:bg-stone-50 transition-colors">
              Download PDF circular
            </button>
            <button
              className="flex items-center gap-1.5 text-xs font-semibold text-amber-600 hover:text-amber-700"
              onClick={() => alert('Message Class Teacher form opened')}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Message Mrs. Priya Sharma
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
