import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  steps: { label: string }[];
}

export default function StepIndicator({
  currentStep,
  steps,
}: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-0 px-4 pb-2">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isCompleted = stepNumber < currentStep;

        return (
          <div key={index} className="flex items-center">
            {/* Step circle + label */}
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all duration-300 ${
                  isCompleted
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                    : isActive
                      ? 'scale-110 bg-blue-600 text-white shadow-lg shadow-blue-300'
                      : 'border-2 border-gray-200 bg-white text-gray-400'
                }`}
              >
                {isCompleted ? (
                  <Check className="h-4 w-4" strokeWidth={3} />
                ) : (
                  stepNumber
                )}
              </div>
              <span
                className={`text-[11px] font-medium transition-colors duration-300 ${
                  isActive || isCompleted ? 'text-blue-600' : 'text-gray-400'
                }`}
              >
                {step.label}
              </span>
            </div>

            {index < steps.length - 1 && (
              <div className="mx-3 mb-5 h-[2px] w-12 sm:w-16">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isCompleted ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
