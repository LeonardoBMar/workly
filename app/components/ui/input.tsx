import { cn } from '@/lib/utils';
import { InputHTMLAttributes, forwardRef, ReactNode } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, type, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label className="ml-1 text-sm font-semibold text-slate-700">
            {label}
          </label>
        )}
        <div className="group relative">
          {icon && (
            <div className="absolute top-1/2 left-4 -translate-y-1/2 transition-colors group-focus-within:text-indigo-600">
              {icon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              'flex h-11 w-full rounded-xl border border-slate-200 bg-white py-2 text-sm ring-offset-white transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:border-indigo-600 focus-visible:ring-2 focus-visible:ring-indigo-600/20 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
              icon ? 'pl-11' : 'px-4',
              error &&
                'border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20',
              className,
            )}
            ref={ref}
            {...props}
          />
        </div>
        {error && (
          <p className="ml-1 text-xs font-medium text-red-500">{error}</p>
        )}
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input };
