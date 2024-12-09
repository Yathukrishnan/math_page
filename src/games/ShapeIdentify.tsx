import React from 'react';
import { useGameStore } from '../store/useGameStore';
import { FeedbackPopup } from '../components/FeedbackPopup';
import { ProgressBar } from '../components/ProgressBar';
import { Celebration } from '../components/Celebration';
import { getFeedbackMessage, calculateStars } from '../utils/feedback';

interface ShapeIdentifyProps {
  level: number;
  onBack: () => void;
}

const shapes = [
  { name: 'circle', display: 'Circle' },
  { name: 'square', display: 'Square' },
  { name: 'triangle', display: 'Triangle' },
  { name: 'rectangle', display: 'Rectangle' },
  { name: 'hexagon', display: 'Hexagon' }
];

const generateQuestion = (level: number) => {
  const shape = shapes[Math.floor(Math.random() * shapes.length)];
  const count = level === 0 ? 1 : Math.floor(Math.random() * 3) + 1;
  const options = [
    `${count} ${count === 1 ? shape.display : `${shape.display}s`}`,
    `${count + 1} ${count + 1 === 1 ? shape.display : `${shape.display}s`}`,
    `${Math.max(1, count - 1)} ${count - 1 === 1 ? shape.display : `${shape.display}s`}`,
    `${count + 2} ${count + 2 === 1 ? shape.display : `${shape.display}s`}`
  ];

  return {
    shape: shape.name,
    count,
    options: options.sort(() => Math.random() - 0.5),
    correctAnswer: `${count} ${count === 1 ? shape.display : `${shape.display}s`}`
  };
};

export const ShapeIdentify: React.FC<ShapeIdentifyProps> = ({ level, onBack }) => {
  const [question, setQuestion] = React.useState(generateQuestion(level));
  const [startTime, setStartTime] = React.useState<number>(Date.now());
  const [showFeedback, setShowFeedback] = React.useState(false);
  const [feedbackData, setFeedbackData] = React.useState({ message: '', soundUrl: '', stars: 0 });
  const { questionsAnswered, score, isComplete, resetGame, incrementScore, nextQuestion } = useGameStore();

  React.useEffect(() => {
    resetGame();
    return () => resetGame();
  }, [resetGame]);

  const handleAnswer = (answer: string) => {
    const isCorrect = answer === question.correctAnswer;
    const responseTime = (Date.now() - startTime) / 1000;
    const feedback = getFeedbackMessage(responseTime, isCorrect);
    const stars = calculateStars(responseTime, isCorrect);

    if (isCorrect) {
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
      setQuestion(generateQuestion(level));
      setStartTime(Date.now());
    }, 1500);
  };

  const renderShapes = (type: string, count: number) => {
    const shapesArray = Array(count).fill(null);
    const size = "w-16 h-16";
    const baseStyle = "inline-block mx-2";
    
    return (
      <div className="flex items-center justify-center">
        {shapesArray.map((_, index) => {
          const key = `${type}-${index}-${count}`; // Use a unique key
          switch (type) {
            case 'circle':
              return <div key={key} className={`${size} ${baseStyle} rounded-full bg-indigo-500`} />;
            case 'square':
              return <div key={key} className={`${size} ${baseStyle} bg-pink-500`} />;
            case 'triangle':
              return (
                <div key={key} 
                     className={`${size} ${baseStyle} bg-green-500`}
                     style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
              );
            case 'rectangle':
              return <div key={key} className={`w-24 h-16 ${baseStyle} bg-blue-500`} />;
            case 'hexagon':
              return (
                <div key={key}
                     className={`${size} ${baseStyle} bg-yellow-500`}
                     style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }} />
              );
            default:
              return null;
          }
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
            type="button"
          >
            Back to Menu
          </button>
          <div className="text-xl font-bold">Score: {score}/10</div> {/* Update score display */}
        </div>

        <ProgressBar current={questionsAnswered} total={10} /> {/* Update total questions */}

        {!isComplete ? (
          <div className="p-8 bg-white shadow-lg rounded-xl">
            <div className="mb-8">
              {renderShapes(question.shape, question.count)}
            </div>
            <div className="grid grid-cols-2 gap-4">
              {question.options.map((option, index) => (
                <button
                  key={option}  // Use option as the key instead of index
                  onClick={() => handleAnswer(option)}
                  className="p-4 text-lg font-semibold transition-colors bg-indigo-100 rounded-lg hover:bg-indigo-200"
                  type="button"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="mb-4 text-3xl font-bold">Game Complete!</h2>
            <p className="mb-4 text-xl">Final Score: {score}/10</p> {/* Update score display */}
            <button
              onClick={onBack}
              className="px-6 py-3 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
              type="button"
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
