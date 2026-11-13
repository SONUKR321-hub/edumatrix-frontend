import React from 'react';
import { CheckCircle2, Clock, AlertTriangle, AlertCircle, RefreshCw, MinusCircle, Ban } from 'lucide-react';

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md';
}

const cfg: Record<string, { label: string; icon: any; bg: string; text: string }> = {
  paid:           { label: 'Paid',     icon: CheckCircle2,  bg: 'bg-emerald-100', text: 'text-emerald-800' },
  partially_paid: { label: 'Partial',  icon: Clock,         bg: 'bg-sky-100',     text: 'text-sky-800'     },
  due:            { label: 'Due',      icon: Clock,         bg: 'bg-amber-100',   text: 'text-amber-800'   },
  overdue:        { label: 'Overdue',  icon: AlertTriangle, bg: 'bg-rose-100',    text: 'text-rose-800'    },
  waived:         { label: 'Waived',   icon: MinusCircle,   bg: 'bg-violet-100',  text: 'text-violet-800'  },
  refunded:       { label: 'Refunded', icon: RefreshCw,     bg: 'bg-stone-100',   text: 'text-stone-600'   },
  present:        { label: 'Present',  icon: CheckCircle2,  bg: 'bg-emerald-100', text: 'text-emerald-800' },
  absent:         { label: 'Absent',   icon: AlertCircle,   bg: 'bg-rose-100',    text: 'text-rose-800'    },
  late:           { label: 'Late',     icon: Clock,         bg: 'bg-amber-100',   text: 'text-amber-800'   },
  excused:        { label: 'Excused',  icon: MinusCircle,   bg: 'bg-sky-100',     text: 'text-sky-800'     },
  Active:         { label: 'Active',   icon: CheckCircle2,  bg: 'bg-emerald-100', text: 'text-emerald-800' },
  Inactive:       { label: 'Inactive', icon: Clock,         bg: 'bg-stone-100',   text: 'text-stone-600'   },
  Archived:       { label: 'Archived', icon: Ban,           bg: 'bg-stone-100',   text: 'text-stone-500'   },
  Conflict:       { label: 'Conflict', icon: AlertTriangle, bg: 'bg-rose-100',    text: 'text-rose-800'    },
  Resolved:       { label: 'Resolved', icon: CheckCircle2,  bg: 'bg-emerald-100', text: 'text-emerald-800' },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const c = cfg[status] || { label: status, icon: CheckCircle2, bg: 'bg-stone-100', text: 'text-stone-600' };
  const Icon = c.icon;
  const sz = size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs';
  return (
    <span className={`inline-flex items-center gap-1 font-semibold rounded-full ${c.bg} ${c.text} ${sz} select-none`}>
      <Icon className="w-3 h-3 flex-shrink-0" />
      <span>{c.label}</span>
    </span>
  );
};
