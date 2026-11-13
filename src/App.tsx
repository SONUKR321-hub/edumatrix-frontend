import React, { useState } from 'react';
import { UserRole, Student, FeeTransaction, TimetableSlot } from './types';
import { 
  INITIAL_STUDENTS, 
  INITIAL_FEES, 
  INITIAL_TIMETABLE, 
  SYSTEM_ALERTS, 
  RECENT_AUDIT_LOGS 
} from './data/mockData';
import { TopNavbar } from './components/layout/TopNavbar';
import { AppSidebar } from './components/layout/AppSidebar';
import { OwnerDashboard } from './components/views/OwnerDashboard';
import { StudentManagement } from './components/views/StudentManagement';
import { AttendanceEngine } from './components/views/AttendanceEngine';
import { FeeConsole } from './components/views/FeeConsole';
import { TimetableSchedule } from './components/views/TimetableSchedule';
import { ParentPortal } from './components/views/ParentPortal';
import { Homepage } from './components/views/Homepage';
import { Settings } from './components/views/Settings';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';

export const App: React.FC = () => {
  // Start on the public homepage (not logged in)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentRole, setCurrentRole] = useState<UserRole>('owner');
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  
  // App State
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [feeRecords, setFeeRecords] = useState<FeeTransaction[]>(INITIAL_FEES);
  const [timetableSlots, setTimetableSlots] = useState<TimetableSlot[]>(INITIAL_TIMETABLE);
  const [alerts, setAlerts] = useState(SYSTEM_ALERTS);
  const [auditLogs, setAuditLogs] = useState(RECENT_AUDIT_LOGS);
  
  // Search modal state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // Quick payment student state
  const [activePaymentStudent, setActivePaymentStudent] = useState<Student | null>(null);

  // Handle entering the app (login / demo)
  const handleEnterDashboard = () => {
    setIsLoggedIn(true);
    setCurrentRole('owner');
    setActiveTab('dashboard');
  };

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // Synchronize role change with default tab per report mental models
  const handleRoleChange = (role: UserRole) => {
    setCurrentRole(role);
    if (role === 'teacher') setActiveTab('attendance');
    else if (role === 'accountant') setActiveTab('fees');
    else if (role === 'parent') setActiveTab('parent-portal');
    else if (role === 'public') {
      setIsLoggedIn(false);
      return;
    }
    else setActiveTab('dashboard');
  };

  // Keyboard shortcut listener for Command+K / Ctrl+K
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handlers for state updates
  const handleAddStudent = (newStudent: Student) => {
    setStudents((prev) => [newStudent, ...prev]);
    setAuditLogs((prev) => [
      {
        id: `LOG-${Date.now()}`,
        actor: 'Dr. Meenakshi Sundaram',
        role: 'Principal',
        action: 'Enrolled new student',
        target: `${newStudent.name} (${newStudent.class})`,
        timestamp: 'Just now'
      },
      ...prev
    ]);
  };

  const handleRecordPayment = (tx: FeeTransaction) => {
    setFeeRecords((prev) => [tx, ...prev]);
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === tx.studentId) {
          const newBal = Math.max(0, s.outstandingBalance - tx.paidAmount);
          return {
            ...s,
            outstandingBalance: newBal,
            feeStatus: newBal === 0 ? 'paid' : 'partially_paid'
          };
        }
        return s;
      })
    );
    setAuditLogs((prev) => [
      {
        id: `LOG-${Date.now()}`,
        actor: 'Rajiv Chawla',
        role: 'Head Accountant',
        action: `Recorded fee payment of ₹${tx.paidAmount.toLocaleString('en-IN')}`,
        target: `${tx.studentName} (${tx.receiptNo})`,
        timestamp: 'Just now'
      },
      ...prev
    ]);
  };

  const handleResolveConflict = (slotId: string, substituteTeacher: string) => {
    setTimetableSlots((prev) =>
      prev.map((slot) => {
        if (slot.id === slotId) {
          return {
            ...slot,
            teacher: substituteTeacher,
            isConflict: false,
            conflictDetails: undefined
          };
        }
        return slot;
      })
    );
    setAlerts((prev) => prev.filter((a) => a.actionKey !== 'timetable'));
    setAuditLogs((prev) => [
      {
        id: `LOG-${Date.now()}`,
        actor: 'Mrs. Priya Sharma',
        role: 'Academic Coordinator',
        action: `Substituted faculty to ${substituteTeacher}`,
        target: 'Class 10B Chemistry (Period 3)',
        timestamp: 'Just now'
      },
      ...prev
    ]);
  };

  /* ═══════════════════════════════════════════ */
  /*  RENDER: PUBLIC HOMEPAGE (NOT LOGGED IN)   */
  /* ═══════════════════════════════════════════ */
  if (!isLoggedIn) {
    return <Homepage onEnterDashboard={handleEnterDashboard} />;
  }

  /* ═══════════════════════════════════════════ */
  /*  RENDER: AUTHENTICATED APP WORKSPACE       */
  /* ═══════════════════════════════════════════ */
  return (
    <div className="min-h-screen bg-[#FAFAF8] flex flex-col font-sans text-stone-900 selection:bg-amber-100 selection:text-amber-900">
      {/* Top Application Header */}
      <TopNavbar
        currentRole={currentRole}
        onRoleChange={handleRoleChange}
        activeTab={activeTab}
        onNavigate={setActiveTab}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      <div className="flex flex-1">
        {/* Responsive Sidebar */}
        <div className="hidden lg:block">
          <AppSidebar
            currentRole={currentRole}
            activeTab={activeTab}
            onNavigate={setActiveTab}
            overdueCount={feeRecords.filter((f) => f.status === 'overdue').length}
            conflictsCount={timetableSlots.filter((s) => s.isConflict).length}
          />
        </div>

        {/* Core Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {activeTab === 'dashboard' && (
            <OwnerDashboard
              alerts={alerts}
              auditLogs={auditLogs}
              onNavigate={setActiveTab}
              onOpenAddStudent={() => setActiveTab('students')}
              onOpenRecordPayment={() => {
                setActivePaymentStudent(students[0]);
                setActiveTab('fees');
              }}
            />
          )}

          {activeTab === 'students' && (
            <StudentManagement
              students={students}
              onAddStudent={handleAddStudent}
              onOpenRecordPayment={(student) => {
                setActivePaymentStudent(student);
                setActiveTab('fees');
              }}
            />
          )}

          {activeTab === 'attendance' && (
            <AttendanceEngine students={students} />
          )}

          {activeTab === 'fees' && (
            <FeeConsole
              feeRecords={feeRecords}
              students={students}
              onRecordPayment={handleRecordPayment}
              activePaymentStudent={activePaymentStudent}
              onClearActivePaymentStudent={() => setActivePaymentStudent(null)}
            />
          )}

          {activeTab === 'timetable' && (
            <TimetableSchedule
              slots={timetableSlots}
              onResolveConflict={handleResolveConflict}
            />
          )}

          {activeTab === 'parent-portal' && (
            <ParentPortal
              students={students}
              onOpenRecordPayment={(student) => {
                setActivePaymentStudent(student);
                setActiveTab('fees');
              }}
            />
          )}

          {activeTab === 'settings' && (
            <Settings />
          )}

          {activeTab === 'reports' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200/60">
                <div>
                  <h1 className="text-2xl font-bold text-stone-900 tracking-tight">Analytics & National UDISE+ Gateway</h1>
                  <p className="text-sm text-stone-500">Executive drill-down reports & statutory compliance data files</p>
                </div>
                <button 
                  onClick={() => alert('Encrypted UDISE+ XML packet downloaded successfully!')}
                  className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl text-sm font-semibold hover:from-amber-600 hover:to-orange-600 shadow-lg shadow-amber-500/25 transition-all active:scale-[0.98]"
                >
                  Download official UDISE+ data
                </button>
              </div>

              {/* Analytics Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6">
                  <span className="text-xs font-medium text-stone-400 uppercase tracking-wider">Total Enrolled</span>
                  <div className="mt-2 text-3xl font-extrabold text-stone-900 tabular-nums">1,420</div>
                  <p className="text-xs text-emerald-600 font-semibold mt-1">↑ 4.2% from last academic year</p>
                </div>
                <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6">
                  <span className="text-xs font-medium text-stone-400 uppercase tracking-wider">Overall Fee Realization</span>
                  <div className="mt-2 text-3xl font-extrabold text-stone-900 tabular-nums">89.3%</div>
                  <p className="text-xs text-stone-500 mt-1">₹34.8L of ₹38.95L collected</p>
                </div>
                <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6">
                  <span className="text-xs font-medium text-stone-400 uppercase tracking-wider">Average Daily Attendance</span>
                  <div className="mt-2 text-3xl font-extrabold text-stone-900 tabular-nums">94.6%</div>
                  <p className="text-xs text-emerald-600 font-semibold mt-1">CBSE compliant (≥ 75%)</p>
                </div>
                <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6">
                  <span className="text-xs font-medium text-stone-400 uppercase tracking-wider">Faculty Retention</span>
                  <div className="mt-2 text-3xl font-extrabold text-stone-900 tabular-nums">98.1%</div>
                  <p className="text-xs text-stone-500 mt-1">81 active teaching staff</p>
                </div>
              </div>

              {/* Compliance & Reports Table */}
              <div className="bg-white rounded-2xl border border-stone-200/60 p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <div>
                    <h3 className="font-bold text-stone-900 text-base">Statutory Data Downloads & Filings</h3>
                    <p className="text-xs text-stone-500">Government portals, CBSE returns, and tax certificates.</p>
                  </div>
                </div>

                <div className="divide-y divide-stone-100 text-sm">
                  {[
                    { title: 'UDISE+ Annual School Profile & Student Data (DCF)', format: 'XML / CSV', size: '2.4 MB', date: 'Generated 13 Nov 2026' },
                    { title: 'CBSE OASIS Faculty & Infrastructure Verification', format: 'PDF Packet', size: '840 KB', date: 'Updated Oct 2026' },
                    { title: 'Quarterly Term 2 Fee Ledger & Bank Reconciliation', format: 'XLSX / PDF', size: '1.2 MB', date: 'Generated Today' },
                    { title: 'Student Health & Medical Immunization Roster', format: 'CSV', size: '320 KB', date: 'Generated Nov 2026' }
                  ].map((report) => (
                    <div key={report.title} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="font-semibold text-stone-900">{report.title}</div>
                        <div className="text-xs text-stone-400 mt-0.5">{report.format} • {report.size} • {report.date}</div>
                      </div>
                      <button 
                        onClick={() => alert(`Downloading ${report.title}...`)}
                        className="px-3.5 py-1.5 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-xl text-xs font-semibold text-stone-700 transition-colors self-start sm:self-auto"
                      >
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Global Quick Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        students={students}
        onSelectStudent={() => {
          setActiveTab('students');
        }}
        onNavigate={(tab) => {
          setActiveTab(tab);
        }}
      />
    </div>
  );
};

export default App;
