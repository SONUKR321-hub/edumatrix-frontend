import React, { useState } from 'react';
import {
  Search,
  Plus,
  Download,
  Eye,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';
import { Student } from '../../types';
import { Button } from '../ui/Button';
import { StatusBadge } from '../ui/StatusBadge';
import { Modal } from '../ui/Modal';
import { FormField } from '../ui/FormField';
import { EmptyState } from '../ui/EmptyState';

interface StudentManagementProps {
  students: Student[];
  onAddStudent: (newStudent: Student) => void;
  onOpenRecordPayment: (student: Student) => void;
}

const INPUT_CLS =
  'w-full px-3.5 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-400';

export const StudentManagement: React.FC<StudentManagementProps> = ({
  students,
  onAddStudent,
  onOpenRecordPayment
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [profileTab, setProfileTab] = useState<'overview' | 'attendance' | 'fees' | 'academics'>('overview');

  // Add Student Multi-step Modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addStep, setAddStep] = useState<1 | 2 | 3>(1);
  const [newStudentForm, setNewStudentForm] = useState({
    name: '',
    gender: 'Male' as 'Male' | 'Female',
    dob: '',
    class: 'Class 10B',
    batch: 'JEE Foundation Batch A',
    guardianName: '',
    guardianPhone: '',
    guardianEmail: '',
    guardianRelation: 'Father',
    emergencyContact: '',
    address: '',
    feePlan: 'Standard Annual Plan (₹48,000)'
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Filter students
  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.guardianPhone.includes(searchQuery);

    const matchesClass = selectedClass === 'All' || s.class === selectedClass;
    const matchesStatus = selectedStatus === 'All' || s.status === selectedStatus;

    return matchesSearch && matchesClass && matchesStatus;
  });

  const handleValidateStep1 = () => {
    const errors: Record<string, string> = {};
    if (!newStudentForm.name.trim()) errors.name = 'Please enter student full name.';
    if (!newStudentForm.dob.trim()) {
      errors.dob = "Enter the student's date of birth in DD/MM/YYYY format.";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleValidateStep2 = () => {
    const errors: Record<string, string> = {};
    if (!newStudentForm.guardianName.trim()) errors.guardianName = 'Parent or guardian name is required.';
    if (!newStudentForm.guardianPhone.trim() || newStudentForm.guardianPhone.length < 10) {
      errors.guardianPhone = 'Enter a valid 10-digit Indian mobile number.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreateStudent = () => {
    const created: Student = {
      id: `STU-${Math.floor(10000 + Math.random() * 90000)}`,
      rollNo: `${newStudentForm.class.replace('Class ', '')}-${Math.floor(10 + Math.random() * 89)}`,
      name: newStudentForm.name,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
      gender: newStudentForm.gender,
      dob: newStudentForm.dob,
      class: newStudentForm.class,
      batch: newStudentForm.batch,
      guardianName: newStudentForm.guardianName,
      guardianPhone: newStudentForm.guardianPhone,
      guardianEmail: newStudentForm.guardianEmail || 'contact@parent.com',
      guardianRelation: newStudentForm.guardianRelation,
      address: newStudentForm.address || 'Civil Lines, New Delhi',
      enrollmentDate: '13/11/2026',
      status: 'Active',
      attendanceRate: 100,
      feeStatus: 'due',
      outstandingBalance: 12000,
      totalFees: 48000,
      academicScore: 90,
      emergencyContact: newStudentForm.emergencyContact || newStudentForm.guardianPhone
    };
    onAddStudent(created);
    setIsAddModalOpen(false);
    setAddStep(1);
    setNewStudentForm({
      name: '',
      gender: 'Male',
      dob: '',
      class: 'Class 10B',
      batch: 'JEE Foundation Batch A',
      guardianName: '',
      guardianPhone: '',
      guardianEmail: '',
      guardianRelation: 'Father',
      emergencyContact: '',
      address: '',
      feePlan: 'Standard Annual Plan (₹48,000)'
    });
  };

  /* ─── Tab pill helper ─── */
  const tabCls = (active: boolean) =>
    `pb-2.5 border-b-2 transition-colors text-sm ${
      active
        ? 'border-amber-500 text-amber-700 font-semibold'
        : 'border-transparent text-stone-500 hover:text-stone-900'
    }`;

  return (
    <div className="space-y-5">
      {/* Page heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-stone-900 tracking-tight">Student Directory</h1>
          <p className="mt-1 text-sm text-stone-500">
            Manage student records, enrollment status, parent contacts, and fee balances.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="secondary"
            size="md"
            icon={Download}
            onClick={() => alert('Exporting student directory as UDISE+ compliant CSV...')}
          >
            Export directory
          </Button>
          <Button
            variant="primary"
            size="md"
            icon={Plus}
            onClick={() => setIsAddModalOpen(true)}
          >
            Add student
          </Button>
        </div>
      </div>

      {/* Filter bar */}
      <div className="bg-white rounded-2xl border border-stone-200/60 p-4 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <label htmlFor="student-search-input" className="sr-only">
              Search students by name, ID or phone
            </label>
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              id="student-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search students by name, ID or phone..."
              className="pl-10 pr-4 py-2.5 w-full bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-stone-500 hover:text-stone-900"
              >
                Clear
              </button>
            )}
          </div>

          {/* Class filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-stone-600 whitespace-nowrap">Class:</span>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium px-3 py-2 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
            >
              <option value="All">All Classes</option>
              <option value="Class 10B">Class 10B (JEE/NEET)</option>
              <option value="Class 8A">Class 8A</option>
            </select>
          </div>

          {/* Status filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-stone-600 whitespace-nowrap">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium px-3 py-2 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active Enrolled</option>
              <option value="Inactive">On Leave</option>
              <option value="Archived">Archived</option>
            </select>
          </div>
        </div>

        {/* Summary / reset row */}
        <div className="flex items-center justify-between text-xs text-stone-500 pt-2 border-t border-stone-100">
          <div>
            Showing <span className="font-semibold text-stone-900 tabular-nums">{filteredStudents.length}</span> of{' '}
            <span className="font-semibold text-stone-900 tabular-nums">{students.length}</span> students
          </div>
          {(searchQuery || selectedClass !== 'All' || selectedStatus !== 'All') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedClass('All');
                setSelectedStatus('All');
              }}
              className="text-amber-600 hover:underline font-medium"
            >
              Reset all filters
            </button>
          )}
        </div>
      </div>

      {/* Student table / empty state */}
      {filteredStudents.length === 0 ? (
        <EmptyState
          title="No students match the criteria"
          description="We couldn't find any students matching your search query or selected class filter."
          reason={`Query: "${searchQuery}" | Class: ${selectedClass}`}
          primaryAction={{
            label: 'Clear search filters',
            onClick: () => {
              setSearchQuery('');
              setSelectedClass('All');
              setSelectedStatus('All');
            }
          }}
        />
      ) : (
        <div className="bg-white rounded-2xl border border-stone-200/60 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-stone-50/80 border-b border-stone-200 text-[11px] font-semibold text-stone-600 uppercase tracking-wider">
                  <th scope="col" className="py-3 px-4">Student Name &amp; ID</th>
                  <th scope="col" className="py-3 px-4">Class &amp; Batch</th>
                  <th scope="col" className="py-3 px-4">Guardian Contact</th>
                  <th scope="col" className="py-3 px-4">Attendance</th>
                  <th scope="col" className="py-3 px-4">Fee Status</th>
                  <th scope="col" className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-sm">
                {filteredStudents.map((student) => (
                  <tr
                    key={student.id}
                    className="hover:bg-amber-50/30 transition-colors cursor-pointer group"
                    onClick={() => { setSelectedStudent(student); setProfileTab('overview'); }}
                  >
                    {/* Name & Avatar */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={student.avatar}
                          alt=""
                          className="w-10 h-10 rounded-full object-cover border border-stone-200 flex-shrink-0"
                        />
                        <div>
                          <div className="font-semibold text-stone-900 group-hover:text-amber-700 transition-colors">
                            {student.name}
                          </div>
                          <div className="text-xs text-stone-400 font-mono">
                            {student.id} • Roll {student.rollNo}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Class & Batch */}
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-stone-900">{student.class}</div>
                      <div className="text-xs text-stone-500">{student.batch}</div>
                    </td>

                    {/* Guardian */}
                    <td className="py-3.5 px-4">
                      <div className="text-xs font-medium text-stone-900">{student.guardianName}</div>
                      <div className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                        <Phone className="w-3 h-3 text-stone-400" />
                        <span>{student.guardianPhone}</span>
                      </div>
                    </td>

                    {/* Attendance */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-stone-900 tabular-nums">{student.attendanceRate}%</span>
                        <div className="w-16 bg-stone-100 h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              student.attendanceRate >= 90
                                ? 'bg-emerald-500'
                                : student.attendanceRate >= 75
                                ? 'bg-amber-500'
                                : 'bg-rose-500'
                            }`}
                            style={{ width: `${student.attendanceRate}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Fee status */}
                    <td className="py-3.5 px-4">
                      <div className="space-y-1">
                        <StatusBadge status={student.feeStatus} size="sm" />
                        {student.outstandingBalance > 0 ? (
                          <div className="text-xs text-rose-700 font-semibold tabular-nums">
                            ₹{student.outstandingBalance.toLocaleString('en-IN')} due
                          </div>
                        ) : (
                          <div className="text-xs text-emerald-700">All dues cleared</div>
                        )}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          variant="ghost"
                          size="sm"
                          icon={Eye}
                          onClick={() => { setSelectedStudent(student); setProfileTab('overview'); }}
                          title="Open Student 360 profile"
                        >
                          View
                        </Button>
                        {student.outstandingBalance > 0 && (
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => onOpenRecordPayment(student)}
                            title="Collect Fee Payment"
                          >
                            Pay
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── STUDENT 360 PROFILE MODAL ── */}
      {selectedStudent && (
        <Modal
          isOpen={!!selectedStudent}
          onClose={() => setSelectedStudent(null)}
          title={`Student Profile — ${selectedStudent.name}`}
          description={`ID: ${selectedStudent.id} • ${selectedStudent.class} • ${selectedStudent.batch}`}
          maxWidth="2xl"
          footer={
            <div className="w-full flex items-center justify-between">
              <span className="text-xs text-stone-500">
                Enrolled since {selectedStudent.enrollmentDate}
              </span>
              <div className="flex items-center gap-2">
                <Button variant="secondary" size="sm" onClick={() => setSelectedStudent(null)}>
                  Close
                </Button>
                {selectedStudent.outstandingBalance > 0 && (
                  <Button
                    variant="primary"
                    size="sm"
                    icon={CreditCard}
                    onClick={() => {
                      const stu = selectedStudent;
                      setSelectedStudent(null);
                      onOpenRecordPayment(stu);
                    }}
                  >
                    Record payment
                  </Button>
                )}
              </div>
            </div>
          }
        >
          <div className="space-y-6">
            {/* Top summary */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-stone-50/50 rounded-xl border border-stone-100 gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={selectedStudent.avatar}
                  alt={selectedStudent.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-amber-400"
                />
                <div>
                  <h3 className="text-lg font-bold text-stone-900">{selectedStudent.name}</h3>
                  <div className="text-xs text-stone-500 flex items-center gap-2 mt-0.5">
                    <span>DOB: {selectedStudent.dob}</span>
                    <span>•</span>
                    <span>Gender: {selectedStudent.gender}</span>
                    <span>•</span>
                    <StatusBadge status={selectedStudent.status} size="sm" />
                  </div>
                </div>
              </div>

              <div className="text-right sm:border-l sm:border-stone-200 sm:pl-4">
                <div className="text-xs text-stone-500">Academic Standing</div>
                <div className="text-xl font-bold text-stone-900 tabular-nums">
                  {selectedStudent.academicScore}%
                </div>
                <div className="text-xs text-emerald-600 font-medium">Top 5% in Class</div>
              </div>
            </div>

            {/* Profile tabs */}
            <div className="flex border-b border-stone-200 gap-6">
              <button onClick={() => setProfileTab('overview')} className={tabCls(profileTab === 'overview')}>
                Overview &amp; Family
              </button>
              <button onClick={() => setProfileTab('attendance')} className={tabCls(profileTab === 'attendance')}>
                Attendance Record
              </button>
              <button onClick={() => setProfileTab('fees')} className={tabCls(profileTab === 'fees')}>
                Fee Ledger &amp; Invoices
              </button>
              <button onClick={() => setProfileTab('academics')} className={tabCls(profileTab === 'academics')}>
                Academics &amp; Remarks
              </button>
            </div>

            {/* TAB 1: OVERVIEW */}
            {profileTab === 'overview' && (
              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3.5 rounded-xl border border-stone-100 bg-stone-50/50 space-y-1.5">
                    <span className="font-semibold text-stone-900 uppercase text-[10px] tracking-wider">
                      Parent / Guardian Information
                    </span>
                    <div className="pt-1 space-y-1.5">
                      <p className="font-medium text-stone-900 text-sm">
                        {selectedStudent.guardianName} ({selectedStudent.guardianRelation})
                      </p>
                      <p className="text-stone-500 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-stone-400" />
                        {selectedStudent.guardianPhone}
                      </p>
                      <p className="text-stone-500 flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-stone-400" />
                        {selectedStudent.guardianEmail}
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl border border-stone-100 bg-stone-50/50 space-y-1.5">
                    <span className="font-semibold text-stone-900 uppercase text-[10px] tracking-wider">
                      Emergency &amp; Address
                    </span>
                    <div className="pt-1 space-y-1.5">
                      <p className="text-stone-500">
                        <span className="font-medium text-stone-900">Emergency:</span> {selectedStudent.emergencyContact}
                      </p>
                      <p className="text-stone-500 flex items-start gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-stone-400 mt-0.5 flex-shrink-0" />
                        <span>{selectedStudent.address}</span>
                      </p>
                    </div>
                  </div>
                </div>

                {selectedStudent.recentNotes && (
                  <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-xl">
                    <span className="font-semibold text-amber-900 text-xs">Class Teacher Note:</span>
                    <p className="text-amber-800 text-xs mt-1">{selectedStudent.recentNotes}</p>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: ATTENDANCE */}
            {profileTab === 'attendance' && (
              <div className="space-y-4 text-xs">
                <div className="flex items-center justify-between p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <div>
                    <span className="font-semibold text-emerald-900">Overall Attendance Rate</span>
                    <p className="text-emerald-700">Complies with CBSE 75% minimum examination requirement</p>
                  </div>
                  <span className="text-2xl font-bold text-emerald-800 tabular-nums">
                    {selectedStudent.attendanceRate}%
                  </span>
                </div>

                <div className="rounded-xl border border-stone-200 overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-stone-50/80 border-b border-stone-200 text-[11px] font-semibold text-stone-600 uppercase tracking-wider">
                      <tr>
                        <th className="py-2.5 px-3">Date</th>
                        <th className="py-2.5 px-3">Status</th>
                        <th className="py-2.5 px-3">Recorded By</th>
                        <th className="py-2.5 px-3">Remarks</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      <tr className="hover:bg-amber-50/30 transition-colors">
                        <td className="py-2 px-3 font-medium text-stone-900">Today (13 Nov 2026)</td>
                        <td className="py-2 px-3"><StatusBadge status="present" size="sm" /></td>
                        <td className="py-2 px-3 text-stone-500">Priya Sharma</td>
                        <td className="py-2 px-3 text-stone-500">Morning assembly on time</td>
                      </tr>
                      <tr className="hover:bg-amber-50/30 transition-colors">
                        <td className="py-2 px-3 font-medium text-stone-900">12 Nov 2026</td>
                        <td className="py-2 px-3"><StatusBadge status="present" size="sm" /></td>
                        <td className="py-2 px-3 text-stone-500">Priya Sharma</td>
                        <td className="py-2 px-3 text-stone-500">—</td>
                      </tr>
                      <tr className="hover:bg-amber-50/30 transition-colors">
                        <td className="py-2 px-3 font-medium text-stone-900">11 Nov 2026</td>
                        <td className="py-2 px-3"><StatusBadge status="late" size="sm" /></td>
                        <td className="py-2 px-3 text-stone-500">Priya Sharma</td>
                        <td className="py-2 px-3 text-stone-500">School bus delayed by traffic (15m)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 3: FEES */}
            {profileTab === 'fees' && (
              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl border border-stone-100 bg-stone-50/50">
                    <span className="text-stone-500">Total Academic Fee</span>
                    <p className="text-lg font-bold text-stone-900 tabular-nums">
                      ₹{selectedStudent.totalFees.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div className="p-3.5 bg-rose-50 rounded-xl border border-rose-200">
                    <span className="text-rose-700">Outstanding Balance</span>
                    <p className="text-lg font-bold text-rose-700 font-semibold tabular-nums">
                      ₹{selectedStudent.outstandingBalance.toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>

                <div className="rounded-xl border border-stone-200 overflow-hidden">
                  <div className="bg-stone-50/80 px-3 py-2.5 font-semibold text-stone-900 uppercase text-[10px] tracking-wider border-b border-stone-200">
                    Term-wise Invoices &amp; Receipts
                  </div>
                  <div className="p-3 space-y-2.5">
                    <div className="flex items-center justify-between p-3.5 rounded-xl border border-stone-100 bg-stone-50/50">
                      <div>
                        <div className="font-semibold text-stone-900">Term 2 (Quarterly Tuition &amp; Labs)</div>
                        <div className="text-stone-500 text-[11px] mt-0.5">Due Date: 20 Nov 2026 • Invoice #INV-2026-0881</div>
                      </div>
                      <div className="text-right">
                        <StatusBadge status={selectedStudent.feeStatus} size="sm" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: ACADEMICS */}
            {profileTab === 'academics' && (
              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-xl border border-stone-100 bg-stone-50/50 flex items-center justify-between">
                  <span className="font-semibold text-stone-900">Term 1 Assessment Report Card</span>
                  <Button variant="secondary" size="sm" icon={Download}>Download PDF</Button>
                </div>
                <div className="divide-y divide-stone-100 border border-stone-200 rounded-xl overflow-hidden">
                  <div className="p-3 flex justify-between hover:bg-amber-50/30 transition-colors">
                    <span className="text-stone-700">Advanced Mathematics (CBSE)</span>
                    <span className="font-semibold tabular-nums text-stone-900">98/100 (Grade A1)</span>
                  </div>
                  <div className="p-3 flex justify-between hover:bg-amber-50/30 transition-colors">
                    <span className="text-stone-700">Physics (Mechanics &amp; Waves)</span>
                    <span className="font-semibold tabular-nums text-stone-900">92/100 (Grade A1)</span>
                  </div>
                  <div className="p-3 flex justify-between hover:bg-amber-50/30 transition-colors">
                    <span className="text-stone-700">Chemistry (Organic &amp; Physical)</span>
                    <span className="font-semibold tabular-nums text-stone-900">89/100 (Grade A2)</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* ── ADD STUDENT MULTI-STEP MODAL ── */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Student"
        description={`Step ${addStep} of 3: ${
          addStep === 1
            ? 'Student Identification & Class'
            : addStep === 2
            ? 'Parent / Guardian Details'
            : 'Enrollment Review & Confirmation'
        }`}
        maxWidth="lg"
        footer={
          <div className="w-full flex items-center justify-between">
            {addStep > 1 ? (
              <Button
                variant="secondary"
                size="md"
                onClick={() => setAddStep((prev) => (prev - 1) as 1 | 2)}
              >
                Back
              </Button>
            ) : (
              <Button variant="secondary" size="md" onClick={() => setIsAddModalOpen(false)}>
                Cancel
              </Button>
            )}

            {addStep < 3 ? (
              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  if (addStep === 1 && handleValidateStep1()) setAddStep(2);
                  else if (addStep === 2 && handleValidateStep2()) setAddStep(3);
                }}
              >
                Save &amp; Continue
              </Button>
            ) : (
              <Button
                variant="primary"
                size="md"
                icon={CheckCircle2}
                onClick={handleCreateStudent}
              >
                Confirm &amp; Add Student
              </Button>
            )}
          </div>
        }
      >
        <div className="space-y-4">
          {/* Step progress */}
          <div className="flex items-center justify-between text-xs font-medium text-stone-400 mb-2">
            <span className={addStep === 1 ? 'font-bold text-amber-600' : ''}>1. Student Info</span>
            <span>→</span>
            <span className={addStep === 2 ? 'font-bold text-amber-600' : ''}>2. Guardian Details</span>
            <span>→</span>
            <span className={addStep === 3 ? 'font-bold text-amber-600' : ''}>3. Review &amp; Enroll</span>
          </div>

          {/* STEP 1 */}
          {addStep === 1 && (
            <div className="space-y-3">
              <FormField
                label="Student Full Name"
                htmlFor="student-name"
                required
                helperText="Enter as registered on birth certificate or previous school leaving certificate"
                errorMessage={formErrors.name}
              >
                <input
                  id="student-name"
                  type="text"
                  placeholder="e.g. Aarav Sharma"
                  value={newStudentForm.name}
                  onChange={(e) => setNewStudentForm({ ...newStudentForm, name: e.target.value })}
                  className={INPUT_CLS}
                />
              </FormField>

              <div className="grid grid-cols-2 gap-3">
                <FormField
                  label="Date of Birth"
                  htmlFor="student-dob"
                  required
                  helperText="Format: DD/MM/YYYY"
                  errorMessage={formErrors.dob}
                >
                  <input
                    id="student-dob"
                    type="text"
                    placeholder="14/05/2010"
                    value={newStudentForm.dob}
                    onChange={(e) => setNewStudentForm({ ...newStudentForm, dob: e.target.value })}
                    className={INPUT_CLS}
                  />
                </FormField>

                <FormField label="Gender" htmlFor="student-gender" required>
                  <select
                    id="student-gender"
                    value={newStudentForm.gender}
                    onChange={(e) => setNewStudentForm({ ...newStudentForm, gender: e.target.value as any })}
                    className={INPUT_CLS}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </FormField>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <FormField label="Assign Class" htmlFor="student-class" required>
                  <select
                    id="student-class"
                    value={newStudentForm.class}
                    onChange={(e) => setNewStudentForm({ ...newStudentForm, class: e.target.value })}
                    className={INPUT_CLS}
                  >
                    <option value="Class 10B">Class 10B</option>
                    <option value="Class 8A">Class 8A</option>
                  </select>
                </FormField>

                <FormField label="Batch Track" htmlFor="student-batch" required>
                  <select
                    id="student-batch"
                    value={newStudentForm.batch}
                    onChange={(e) => setNewStudentForm({ ...newStudentForm, batch: e.target.value })}
                    className={INPUT_CLS}
                  >
                    <option value="JEE Foundation Batch A">JEE Foundation Batch A</option>
                    <option value="NEET Evening Batch">NEET Evening Batch</option>
                    <option value="General Academic Track">General Academic Track</option>
                  </select>
                </FormField>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {addStep === 2 && (
            <div className="space-y-3">
              <FormField
                label="Parent / Guardian Name"
                htmlFor="guardian-name"
                required
                errorMessage={formErrors.guardianName}
              >
                <input
                  id="guardian-name"
                  type="text"
                  placeholder="e.g. Rajesh Sharma"
                  value={newStudentForm.guardianName}
                  onChange={(e) => setNewStudentForm({ ...newStudentForm, guardianName: e.target.value })}
                  className={INPUT_CLS}
                />
              </FormField>

              <div className="grid grid-cols-2 gap-3">
                <FormField
                  label="Primary Phone Number"
                  htmlFor="guardian-phone"
                  required
                  helperText="Receives official WhatsApp attendance alerts"
                  errorMessage={formErrors.guardianPhone}
                >
                  <input
                    id="guardian-phone"
                    type="tel"
                    placeholder="+91 98201 44521"
                    value={newStudentForm.guardianPhone}
                    onChange={(e) => setNewStudentForm({ ...newStudentForm, guardianPhone: e.target.value })}
                    className={INPUT_CLS}
                  />
                </FormField>

                <FormField label="Relationship" htmlFor="guardian-relation" required>
                  <select
                    id="guardian-relation"
                    value={newStudentForm.guardianRelation}
                    onChange={(e) => setNewStudentForm({ ...newStudentForm, guardianRelation: e.target.value })}
                    className={INPUT_CLS}
                  >
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Guardian">Guardian</option>
                  </select>
                </FormField>
              </div>

              <FormField label="Residential Address" htmlFor="address" helperText="Permanent correspondence address">
                <input
                  id="address"
                  type="text"
                  placeholder="Street address, City, PIN"
                  value={newStudentForm.address}
                  onChange={(e) => setNewStudentForm({ ...newStudentForm, address: e.target.value })}
                  className={INPUT_CLS}
                />
              </FormField>
            </div>
          )}

          {/* STEP 3 */}
          {addStep === 3 && (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl border border-stone-100 bg-stone-50/50 space-y-2">
                <h4 className="font-bold text-stone-900 text-sm">Review Enrollment Summary</h4>
                <div className="grid grid-cols-2 gap-2 text-stone-700">
                  <div><span className="font-semibold text-stone-900">Name:</span> {newStudentForm.name}</div>
                  <div><span className="font-semibold text-stone-900">DOB:</span> {newStudentForm.dob}</div>
                  <div><span className="font-semibold text-stone-900">Class:</span> {newStudentForm.class}</div>
                  <div><span className="font-semibold text-stone-900">Batch:</span> {newStudentForm.batch}</div>
                  <div><span className="font-semibold text-stone-900">Guardian:</span> {newStudentForm.guardianName}</div>
                  <div><span className="font-semibold text-stone-900">Phone:</span> {newStudentForm.guardianPhone}</div>
                </div>
              </div>

              <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2 text-amber-900">
                <ShieldCheck className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <p>
                  Upon saving, EduMatrix will automatically generate the unique Student ID, initialize the fee ledger, and send a welcome link to the guardian's phone.
                </p>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};
