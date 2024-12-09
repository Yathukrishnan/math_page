import type React from 'react';
import { motion } from 'framer-motion';
import { Brain, Shapes, Square } from 'lucide-react';

interface GameCardProps {
  type: string;
  title: string;
  description: string;
  onSelect: () => void;
}

const gameIcons = {
  mathBuddy: Brain,
  oddOneOut: Shapes,
  shapeIdentify: Square,
};

export const GameCard: React.FC<GameCardProps> = ({ type, title, description, onSelect }) => {
  const Icon = gameIcons[type as keyof typeof gameIcons];

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="p-6 bg-white shadow-lg cursor-pointer rounded-xl"
      onClick={onSelect}
    >
      <div className="flex items-center justify-center mb-4">
        <Icon className="w-12 h-12 text-indigo-600" />
      </div>
      <h3 className="mb-2 text-xl font-bold text-center">{title}</h3>
      <p className="text-center text-gray-600">{description}</p>
    </motion.div>
  );
};