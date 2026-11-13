import React from 'react';

interface FormFieldProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  helperText?: string;
  errorMessage?: string;
  children: React.ReactNode;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  htmlFor,
  required,
  helperText,
  errorMessage,
  children,
  className = ''
}) => {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <div className="flex items-center justify-between">
        <label
          htmlFor={htmlFor}
          className="block text-xs font-semibold text-stone-700 mb-1.5 select-none"
        >
          {label}
          {required ? (
            <span className="text-rose-600 ml-1" aria-hidden="true">*</span>
          ) : (
            <span className="text-stone-400 font-normal text-xs ml-1.5">(Optional)</span>
          )}
        </label>
      </div>

      <div>{children}</div>

      {errorMessage ? (
        <p className="text-xs font-medium text-rose-600 flex items-center gap-1" id={`${htmlFor}-error`} role="alert">
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {errorMessage}
        </p>
      ) : helperText ? (
        <p className="text-xs text-stone-500" id={`${htmlFor}-helper`}>
          {helperText}
        </p>
      ) : null}
    </div>
  );
};
