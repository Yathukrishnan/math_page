import React from 'react';
import { useGameStore } from '../store/useGameStore';
import { generateQuestion } from '../utils/questionGenerator';

interface QuestionProps {
  level: number;
  onCorrectAnswer: () => void;
}

export const Question: React.FC<QuestionProps> = ({ level, onCorrectAnswer }) => {
  const [question, setQuestion] = React.useState(generateQuestion(level));
  const [selectedAnswer, setSelectedAnswer] = React.useState<string | null>(null);
  const [showFeedback, setShowFeedback] = React.useState(false);
  const nextQuestion = useGameStore((state) => state.nextQuestion);
  const incrementScore = useGameStore((state) => state.incrementScore);

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);

    if (answer === question.correctAnswer) {
      incrementScore();
      onCorrectAnswer();
    }

    setTimeout(() => {
      setShowFeedback(false);
      setSelectedAnswer(null);
      nextQuestion();
      setQuestion(generateQuestion(level));
    }, 1500);
  };

  return (
    <div className="w-full max-w-2xl p-6 bg-white shadow-lg rounded-xl">
      <h2 className="mb-8 text-3xl font-bold text-center text-indigo-600">
        {question.question}
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {question.options.map((option, index) => (
          <button
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            key={index}
            onClick={() => !showFeedback && handleAnswerSelect(option)}
            disabled={showFeedback}
            type="button" // Explicit type for the button
            className={`p-4 text-xl font-semibold rounded-lg transition-all duration-200
              ${
                showFeedback
                  ? option === question.correctAnswer
                    ? 'bg-green-500 text-white'
                    : option === selectedAnswer
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-100'
                  : 'bg-indigo-100 hover:bg-indigo-200 active:bg-indigo-300'
              }
            `}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};
