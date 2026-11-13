export type UserRole = 'owner' | 'teacher' | 'accountant' | 'parent' | 'public';

export type PaymentStatus = 'paid' | 'partially_paid' | 'due' | 'overdue' | 'waived' | 'refunded';

export type AttendanceStatus = 'present' | 'absent' | 'late' | 'excused';

export interface Student {
  id: string;
  rollNo: string;
  name: string;
  avatar: string;
  gender: 'Male' | 'Female' | 'Other';
  dob: string;
  class: string;
  batch: string;
  guardianName: string;
  guardianPhone: string;
  guardianEmail: string;
  guardianRelation: string;
  address: string;
  enrollmentDate: string;
  status: 'Active' | 'Inactive' | 'Archived';
  attendanceRate: number; // e.g. 94.5%
  feeStatus: PaymentStatus;
  outstandingBalance: number;
  totalFees: number;
  academicScore: number; // percentage
  emergencyContact: string;
  recentNotes?: string;
}

export interface AttendanceRecord {
  studentId: string;
  status: AttendanceStatus;
  note?: string;
  timestamp?: string;
}

export interface FeeTransaction {
  id: string;
  studentId: string;
  studentName: string;
  class: string;
  term: string;
  amount: number;
  paidAmount: number;
  dueDate: string;
  status: PaymentStatus;
  receiptNo?: string;
  paymentMethod?: 'UPI' | 'Net Banking' | 'Cheque' | 'Cash' | 'Card';
  lastPaidDate?: string;
}

export interface TimetableSlot {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  period: number;
  startTime: string;
  endTime: string;
  subject: string;
  teacher: string;
  room: string;
  class: string;
  isConflict?: boolean;
  conflictDetails?: string;
}

export interface SystemAlert {
  id: string;
  title: string;
  description: string;
  type: 'critical' | 'warning' | 'info';
  actionLabel: string;
  actionKey: string;
  timestamp: string;
}

export interface AuditLog {
  id: string;
  actor: string;
  role: string;
  action: string;
  target: string;
  timestamp: string;
}
