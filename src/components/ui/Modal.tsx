import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  footer?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, description, children, maxWidth = 'lg', footer }) => {
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape' && isOpen) onClose(); };
    if (isOpen) { document.body.style.overflow = 'hidden'; window.addEventListener('keydown', h); }
    return () => { document.body.style.overflow = 'unset'; window.removeEventListener('keydown', h); };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const widths: Record<string, string> = { sm: 'max-w-md', md: 'max-w-lg', lg: 'max-w-xl', xl: 'max-w-2xl', '2xl': 'max-w-3xl' };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-stone-950/30 backdrop-blur-md" onClick={onClose} />
      {/* Panel */}
      <div
        className={`relative w-full ${widths[maxWidth]} bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-stone-200/60 my-8 z-10 flex flex-col max-h-[90vh]`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top accent */}
        <div className="h-1.5 bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 flex-shrink-0" />
        {/* Header */}
        <div className="p-6 pb-0 flex-shrink-0">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-bold text-stone-900">{title}</h2>
              {description && <p className="mt-1 text-sm text-stone-500">{description}</p>}
            </div>
            <button
              onClick={onClose}
              className="rounded-xl p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors ml-4"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1">{children}</div>
        {/* Footer */}
        {footer && (
          <div className="px-6 py-4 bg-stone-50/50 border-t border-stone-100 flex items-center justify-end gap-3 flex-shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
