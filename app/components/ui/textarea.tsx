import { cn } from '@/lib/utils';
import { TextareaHTMLAttributes, forwardRef, ReactNode } from 'react';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, icon, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label className="ml-1 text-sm font-semibold text-slate-700">
            {label}
          </label>
        )}
        <div className="group relative">
          {icon && (
            <div className="absolute top-4 left-4 transition-colors group-focus-within:text-indigo-600">
              {icon}
            </div>
          )}
          <textarea
            className={cn(
              'flex min-h-[120px] w-full rounded-xl border border-slate-200 bg-white py-3 text-sm ring-offset-white transition-all placeholder:text-slate-400 focus-visible:border-indigo-600 focus-visible:ring-2 focus-visible:ring-indigo-600/20 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
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
Textarea.displayName = 'Textarea';

export { Textarea };
