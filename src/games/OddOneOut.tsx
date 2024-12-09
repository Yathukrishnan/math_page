import React from 'react';
import { useGameStore } from '../store/useGameStore';
import { FeedbackPopup } from '../components/FeedbackPopup';
import { ProgressBar } from '../components/ProgressBar';
import { Celebration } from '../components/Celebration';
import { getFeedbackMessage, calculateStars } from '../utils/feedback';

interface OddOneOutProps {
  level: number;
  onBack: () => void;
}

const shapes = ['circle', 'square', 'triangle', 'hexagon', 'star'];

const generateShapes = (level: number) => {
  const baseShape = shapes[Math.floor(Math.random() * shapes.length)];
  const oddShape = shapes.filter(s => s !== baseShape)[Math.floor(Math.random() * (shapes.length - 1))];
  const count = level + 4; // More shapes for higher levels
  const oddPosition = Math.floor(Math.random() * count);

  return Array(count).fill(null).map((_, index) => ({
    id: `shape-${index}`,
    type: index === oddPosition ? oddShape : baseShape,
    isOdd: index === oddPosition
  }));
};

export const OddOneOut: React.FC<OddOneOutProps> = ({ level, onBack }) => {
  const [currentShapes, setCurrentShapes] = React.useState(generateShapes(level));
  const [startTime, setStartTime] = React.useState<number>(Date.now());
  const [showFeedback, setShowFeedback] = React.useState(false);
  const [feedbackData, setFeedbackData] = React.useState({ message: '', soundUrl: '', stars: 0 });
  const { questionsAnswered, score, isComplete, resetGame, incrementScore, nextQuestion } = useGameStore();

  React.useEffect(() => {
    resetGame();
    return () => resetGame();
  }, [resetGame]);

  const handleShapeClick = (isOdd: boolean) => {
    const responseTime = (Date.now() - startTime) / 1000;
    const feedback = getFeedbackMessage(responseTime, isOdd);
    const stars = calculateStars(responseTime, isOdd);

    if (isOdd) {
      incrementScore();
    }

    setFeedbackData({
      message: feedback.message,
      soundUrl: feedback.soundUrl,
      stars
    });
    setShowFeedback(true);

    setTimeout(() => {
      setShowFeedback(false);
      nextQuestion();
      setCurrentShapes(generateShapes(level));
      setStartTime(Date.now());
    }, 1500);
  };

  const renderShape = (type: string) => {
    const size = "w-16 h-16";
    const baseStyle = "transition-transform hover:scale-110";
    
    switch (type) {
      case 'circle':
        return <div className={`${size} rounded-full bg-indigo-500 ${baseStyle}`} />;
      case 'square':
        return <div className={`${size} bg-pink-500 ${baseStyle}`} />;
      case 'triangle':
        return (
          <div className={`${size} clip-triangle bg-green-500 ${baseStyle}`}
               style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
        );
      case 'hexagon':
        return (
          <div className={`${size} bg-yellow-500 ${baseStyle}`}
               style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }} />
        );
      case 'star':
        return (
          <div className={`${size} bg-purple-500 ${baseStyle}`}
               style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }} />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
            type="button" // Explicit type added
          >
            Back to Menu
          </button>
          <div className="text-xl font-bold">Score: {score}/10</div>
        </div>

        <ProgressBar current={questionsAnswered} total={10} />

        {!isComplete ? (
          <>
            <h2 className="mb-8 text-2xl font-bold text-center">Find the Odd Shape</h2>
            <div className="grid grid-cols-3 gap-8 justify-items-center">
              {currentShapes.map((shape) => (
                <button
                  key={shape.id}
                  onClick={() => handleShapeClick(shape.isOdd)}
                  className="p-4 transition-shadow bg-white shadow-md rounded-xl hover:shadow-lg"
                  type="button" // Explicit type added
                >
                  {renderShape(shape.type)}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center">
            <h2 className="mb-4 text-3xl font-bold">Game Complete!</h2>
            <p className="mb-4 text-xl">Final Score: {score}/10</p>
            <button
              onClick={onBack}
              className="px-6 py-3 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
              type="button" // Explicit type added
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
