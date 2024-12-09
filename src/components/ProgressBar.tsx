import type React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const progress = (current / total) * 100;

  return (
    <div className="w-full h-4 mb-6 bg-gray-200 rounded-full">
      <div
        className="h-4 transition-all duration-500 bg-indigo-600 rounded-full"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};