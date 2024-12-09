import React from 'react';
import { Question } from '../components/Question';
import { ProgressBar } from '../components/ProgressBar';
import { FeedbackPopup } from '../components/FeedbackPopup';
import { Celebration } from '../components/Celebration';
import { useGameStore } from '../store/useGameStore';
import { getFeedbackMessage, calculateStars } from '../utils/feedback';

interface MathBuddyProps {
  level: number;
  onBack: () => void;
}

export const MathBuddy: React.FC<MathBuddyProps> = ({ level, onBack }) => {
  const [startTime, setStartTime] = React.useState<number>(Date.now());
  const [showFeedback, setShowFeedback] = React.useState(false);
  const [feedbackData, setFeedbackData] = React.useState({ message: '', soundUrl: '', stars: 0 });
  const { questionsAnswered, score, isComplete, resetGame } = useGameStore();

  const handleCorrectAnswer = () => {
    const responseTime = (Date.now() - startTime) / 1000;
    const feedback = getFeedbackMessage(responseTime, true);
    const stars = calculateStars(responseTime, true);

    setFeedbackData({
      message: feedback.message,
      soundUrl: feedback.soundUrl,
      stars
    });
    setShowFeedback(true);
    setTimeout(() => {
      setShowFeedback(false);
      setStartTime(Date.now());
    }, 1500);
  };

  React.useEffect(() => {
    resetGame();
    return () => resetGame();
  }, [resetGame]);

  const handleBackToMenu = () => {
    console.log('Navigating back to menu...');
    // Ensure resetGame is called first, then onBack
    resetGame();  // Reset the game state
    onBack();      // Navigate back to the menu
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={handleBackToMenu}
            type="button"
            className="px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
          >
            Back to Menu
          </button>
          <div className="text-xl font-bold">Score: {score}/10</div>
        </div>

        {/* Only show the progress bar if the game is not complete */}
        {!isComplete && <ProgressBar current={questionsAnswered} total={10} />}

        {/* Render the Question component only if the game is not complete */}
        {!isComplete ? (
          <Question level={level} onCorrectAnswer={handleCorrectAnswer} />
        ) : (
          <div className="text-center">
            <h2 className="mb-4 text-3xl font-bold">Game Complete!</h2>
            <p className="mb-4 text-xl">Final Score: {score}/10</p>
            <button
              onClick={handleBackToMenu}
              type="button"
              className="px-6 py-3 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
            >
              Back to Menu
            </button>
          </div>
        )}

        <FeedbackPopup
          show={showFeedback}
          message={feedbackData.message}
          stars={feedbackData.stars}
          soundUrl={feedbackData.soundUrl}
        />
        <Celebration show={isComplete} />
      </div>
    </div>
  );
};