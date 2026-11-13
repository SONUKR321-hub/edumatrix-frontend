import React, { useState } from 'react';
import { CreditCard, Download, Search, CheckCircle2, Receipt, Printer, Send } from 'lucide-react';
import { FeeTransaction, Student, PaymentStatus } from '../../types';
import { Button } from '../ui/Button';
import { StatusBadge } from '../ui/StatusBadge';
import { Modal } from '../ui/Modal';

interface FeeConsoleProps { feeRecords: FeeTransaction[]; students: Student[]; onRecordPayment: (tx: FeeTransaction) => void; activePaymentStudent?: Student | null; onClearActivePaymentStudent?: () => void; }

export const FeeConsole: React.FC<FeeConsoleProps> = ({ feeRecords, students, onRecordPayment, activePaymentStudent, onClearActivePaymentStudent }) => {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [isPayOpen, setIsPayOpen] = useState(false);
  const [targetId, setTargetId] = useState(activePaymentStudent?.id || 'STU-10291');
  const [amount, setAmount] = useState(String(activePaymentStudent?.outstandingBalance || 8500));
  const [method, setMethod] = useState('UPI');
  const [error, setError] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<FeeTransaction | null>(null);

  React.useEffect(() => { if (activePaymentStudent) { setTargetId(activePaymentStudent.id); setAmount(String(activePaymentStudent.outstandingBalance || 8500)); setIsPayOpen(true); } }, [activePaymentStudent]);

  const target = students.find((s) => s.id === targetId);
  const maxBal = target?.outstandingBalance || 8500;
  const totalCollected = feeRecords.reduce((a, f) => a + f.paidAmount, 0);
  const totalDue = feeRecords.reduce((a, f) => a + (f.amount - f.paidAmount), 0);
  const overdueN = feeRecords.filter((f) => f.status === 'overdue').length;
  const filtered = feeRecords.filter((f) => (f.studentName.toLowerCase().includes(search.toLowerCase()) || f.id.toLowerCase().includes(search.toLowerCase())) && (filter === 'All' || f.status === filter));

  const submit = () => {
    const n = parseFloat(amount);
    if (isNaN(n) || n <= 0) { setError('Enter a valid amount.'); return; }
    if (n > maxBal) { setError(`Cannot exceed outstanding balance of ₹${maxBal.toLocaleString('en-IN')}.`); return; }
    setError(null);
    const tx: FeeTransaction = { id: `INV-${Date.now()}`, studentId: targetId, studentName: target?.name || '', class: target?.class || '', term: 'Term 2', amount: maxBal, paidAmount: n, dueDate: '20/11/2026', status: n >= maxBal ? 'paid' : 'partially_paid', receiptNo: `REC-${Math.floor(1000 + Math.random() * 9000)}`, paymentMethod: method as any, lastPaidDate: '13/11/2026' };
    onRecordPayment(tx);
    setIsPayOpen(false);
    setReceipt(tx);
    onClearActivePaymentStudent?.();
  };

  const paymentMethods = ['UPI', 'Net Banking', 'Cash', 'Cheque'];

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-stone-900 tracking-tight">Fees &amp; Billing</h1>
          <p className="mt-1 text-sm text-stone-500">Reconcile invoices, track balances, issue receipts</p>
        </div>
        <div className="flex gap-2.5">
          <button
            onClick={() => alert('Exporting...')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-stone-200 text-stone-700 rounded-xl hover:bg-stone-50 shadow-sm text-sm font-semibold transition-all"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
          <button
            onClick={() => { setError(null); setIsPayOpen(true); }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl shadow-lg shadow-amber-500/25 hover:from-amber-600 hover:to-orange-600 active:scale-[0.97] text-sm font-semibold transition-all"
          >
            <CreditCard className="w-4 h-4" />
            Record payment
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Collected (Nov)', value: `₹${totalCollected.toLocaleString('en-IN')}`, color: 'text-emerald-600', sub: 'Verified across all channels' },
          { label: 'Outstanding', value: `₹${totalDue.toLocaleString('en-IN')}`, color: 'text-amber-600', sub: 'Pending for Term 2' },
          { label: 'Overdue', value: `${overdueN} accounts`, color: 'text-rose-600', sub: 'Grace period expired' },
        ].map((c) => (
          <div key={c.label} className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6">
            <span className="text-xs font-medium text-stone-400 uppercase tracking-wider">{c.label}</span>
            <div className={`mt-2 text-2xl font-bold ${c.color} tabular-nums`}>{c.value}</div>
            <p className="text-xs text-stone-500 mt-1">{c.sub}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-stone-200/60 p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search student or invoice..."
            className="w-full pl-9 pr-3 py-2 text-sm bg-stone-50 border border-stone-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400/40"
          />
        </div>
        <div className="flex gap-1 text-xs flex-wrap">
          {['All', 'paid', 'partially_paid', 'due', 'overdue', 'waived'].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-colors ${filter === s ? 'bg-stone-900 text-white' : 'bg-stone-50 text-stone-600 hover:bg-stone-100'}`}
            >
              {s === 'All' ? 'All' : s.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Fee Table */}
      <div className="bg-white rounded-2xl border border-stone-200/60 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-stone-50/80 border-b border-stone-100 text-[11px] font-bold text-stone-400 uppercase tracking-wider">
              <th className="py-3 px-4">Invoice</th>
              <th className="py-3 px-4">Student</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">Paid / Due</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Receipt</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {filtered.map((tx) => (
              <tr key={tx.id} className="hover:bg-amber-50/30 transition-colors">
                <td className="py-3 px-4">
                  <div className="font-mono text-xs font-semibold text-stone-700">{tx.id}</div>
                  <div className="text-[11px] text-stone-400">{tx.term}</div>
                </td>
                <td className="py-3 px-4">
                  <div className="font-semibold text-stone-900">{tx.studentName}</div>
                  <div className="text-[11px] text-stone-400">{tx.class}</div>
                </td>
                <td className="py-3 px-4 font-semibold text-stone-900 tabular-nums">₹{tx.amount.toLocaleString('en-IN')}</td>
                <td className="py-3 px-4 text-xs">
                  <div className="font-semibold text-emerald-600 tabular-nums">₹{tx.paidAmount.toLocaleString('en-IN')} paid</div>
                  {tx.amount > tx.paidAmount && <div className="text-rose-500 tabular-nums">₹{(tx.amount - tx.paidAmount).toLocaleString('en-IN')} due</div>}
                </td>
                <td className="py-3 px-4"><StatusBadge status={tx.status} size="sm" /></td>
                <td className="py-3 px-4 text-right">
                  {tx.paidAmount > 0 ? (
                    <button
                      onClick={() => setReceipt(tx)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 hover:bg-stone-50 rounded-xl transition-colors"
                    >
                      <Receipt className="w-3.5 h-3.5" />View
                    </button>
                  ) : <span className="text-xs text-stone-400">—</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Payment Modal */}
      <Modal
        isOpen={isPayOpen}
        onClose={() => { setIsPayOpen(false); onClearActivePaymentStudent?.(); }}
        title="Record Payment"
        description="Verify amount & method before generating receipt"
        maxWidth="md"
        footer={
          <div className="w-full flex justify-between">
            <button
              onClick={() => { setIsPayOpen(false); onClearActivePaymentStudent?.(); }}
              className="px-4 py-2 bg-white border border-stone-200 text-stone-700 rounded-xl hover:bg-stone-50 shadow-sm text-sm font-semibold transition-all"
            >
              Cancel
            </button>
            <button
              onClick={submit}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl shadow-lg shadow-amber-500/25 hover:from-amber-600 hover:to-orange-600 active:scale-[0.97] text-sm font-semibold transition-all"
            >
              <CheckCircle2 className="w-4 h-4" />Confirm payment
            </button>
          </div>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Student</label>
            <select
              value={targetId}
              onChange={(e) => { setTargetId(e.target.value); const s = students.find((st) => st.id === e.target.value); if (s) setAmount(String(s.outstandingBalance || 8500)); }}
              className="w-full bg-stone-50 border border-stone-200/60 rounded-xl px-3 py-2 text-sm font-semibold text-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-400/40"
            >
              {students.map((s) => <option key={s.id} value={s.id}>{s.name} — ₹{s.outstandingBalance.toLocaleString('en-IN')} due</option>)}
            </select>
          </div>
          <div className="p-3 bg-amber-50 border border-amber-200/60 rounded-xl flex justify-between text-xs">
            <span className="text-amber-800 font-medium">Outstanding balance</span>
            <span className="font-bold text-amber-900 tabular-nums">₹{maxBal.toLocaleString('en-IN')}</span>
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Amount (₹)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => { setAmount(e.target.value); setError(null); }}
              className={`w-full px-3 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 ${error ? 'border-rose-300 focus:ring-rose-400/40 bg-rose-50/30' : 'border-stone-200 bg-stone-50 focus:ring-amber-400/40'}`}
            />
            {error && <p className="text-xs text-rose-600 mt-1 font-medium">{error}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">Payment Method</label>
            <div className="flex gap-2 flex-wrap">
              {paymentMethods.map((m) => (
                <button
                  key={m}
                  onClick={() => setMethod(m)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${method === m ? 'bg-amber-50 border-amber-400 text-amber-700' : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'}`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Modal>

      {/* Receipt Modal */}
      {receipt && (
        <Modal
          isOpen={!!receipt}
          onClose={() => setReceipt(null)}
          title="Payment Receipt"
          description={`#${receipt.receiptNo}`}
          maxWidth="md"
          footer={
            <div className="flex gap-2">
              <button
                onClick={() => alert('Sent to WhatsApp!')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-stone-200 text-stone-700 rounded-xl hover:bg-stone-50 shadow-sm text-xs font-semibold transition-all"
              >
                <Send className="w-3.5 h-3.5" />WhatsApp
              </button>
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl shadow-lg shadow-amber-500/25 hover:from-amber-600 hover:to-orange-600 active:scale-[0.97] text-xs font-semibold transition-all"
              >
                <Printer className="w-3.5 h-3.5" />Print
              </button>
            </div>
          }
        >
          {/* Receipt success card */}
          <div className="space-y-4">
            <div className="bg-emerald-50/60 border border-emerald-200/60 rounded-2xl p-4 flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7 text-emerald-600" />
              </div>
              <p className="text-sm font-bold text-emerald-800">Payment Recorded</p>
              <p className="text-xs text-emerald-700 tabular-nums font-semibold">₹{receipt.paidAmount.toLocaleString('en-IN')} via {receipt.paymentMethod}</p>
            </div>
            <div className="p-5 border-2 border-dashed border-stone-200 rounded-xl text-xs space-y-4">
              <div className="text-center pb-3 border-b border-stone-200">
                <h3 className="font-bold text-base text-stone-900">DELHI PUBLIC ACADEMY</h3>
                <p className="text-stone-500">CBSE Affiliation No: 2130894</p>
              </div>
              <div className="grid grid-cols-2 gap-2 text-stone-600">
                <div><b className="text-stone-900">Student:</b> {receipt.studentName}</div><div><b className="text-stone-900">Class:</b> {receipt.class}</div>
                <div><b className="text-stone-900">Receipt:</b> {receipt.receiptNo}</div><div><b className="text-stone-900">Date:</b> {receipt.lastPaidDate}</div>
                <div><b className="text-stone-900">Mode:</b> {receipt.paymentMethod}</div><div><b className="text-stone-900">Term:</b> {receipt.term}</div>
              </div>
              <div className="pt-3 border-t border-stone-200 flex justify-between font-bold text-sm text-stone-900">
                <span>Amount Paid</span>
                <span className="tabular-nums">₹{receipt.paidAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
