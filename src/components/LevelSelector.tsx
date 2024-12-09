import type React from 'react';
import { motion } from 'framer-motion';

interface LevelSelectorProps {
  onSelect: (level: number) => void;
}

export const LevelSelector: React.FC<LevelSelectorProps> = ({ onSelect }) => {
  // Mapping level numbers to corresponding labels
  const levelDescriptions = [
    "Beginner", "Easy", "Medium", "Hard", "Expert"
  ];

  return (
    <div className="grid max-w-2xl grid-cols-3 gap-4 mx-auto">
      {[1, 2, 3, 4].map((level) => (
        <motion.button
          key={level}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-4 bg-white rounded-lg shadow-md hover:bg-indigo-50"
          onClick={() => onSelect(level)}
        >
          <h3 className="text-xl font-bold text-indigo-600">Level {level}</h3>
          <p className="text-sm text-gray-600">
            {levelDescriptions[level]}
          </p>
        </motion.button>
      ))}
    </div>
  );
};
