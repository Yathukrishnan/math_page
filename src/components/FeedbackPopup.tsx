import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useSound from 'use-sound';
import { StarRating } from './StarRating';

interface FeedbackPopupProps {
  show: boolean;
  message: string;
  stars: number;
  soundUrl: string;
}

export const FeedbackPopup: React.FC<FeedbackPopupProps> = ({
  show,
  message,
  stars,
  soundUrl,
}) => {
  const [play] = useSound(soundUrl);

  React.useEffect(() => {
    if (show) {
      play();
    }
  }, [show, play]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center z-50"
        >
          <div className="bg-white p-8 rounded-xl shadow-2xl text-center">
            <h3 className="text-2xl font-bold mb-4">{message}</h3>
            <StarRating rating={stars} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};