import type React from 'react';
import Confetti from 'react-confetti';
import { Star } from 'lucide-react';

interface CelebrationProps {
  show: boolean;
}

export const Celebration: React.FC<CelebrationProps> = ({ show }) => {
  if (!show) return null;

  return (
    <>
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        recycle={false}
        numberOfPieces={200}
      />
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="flex space-x-2 animate-bounce">
          <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />
          <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />
          <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />
        </div>
      </div>
    </>
  );
};