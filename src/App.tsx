import React from 'react';
import { GameCard } from './components/GameCard';
import { LevelSelector } from './components/LevelSelector';
import { MathBuddy } from './games/MathBuddy';
import { OddOneOut } from './games/OddOneOut';
import { ShapeIdentify } from './games/ShapeIdentify';
import type { GameType } from './types';

function App() {
  const [selectedGame, setSelectedGame] = React.useState<GameType | null>(null);
  const [selectedLevel, setSelectedLevel] = React.useState<number | null>(null);
  const [gameStarted, setGameStarted] = React.useState(false);

  const handleGameSelect = (game: GameType) => {
    setSelectedGame(game);
    setSelectedLevel(null);
    setGameStarted(false);
  };

  const handleLevelSelect = (level: number) => {
    setSelectedLevel(level);
  };

  const handleStartGame = () => {
    setGameStarted(true);
  };

  const handleBackToMenu = () => {
    setSelectedGame(null);
    setSelectedLevel(null);
    setGameStarted(false);
  };

  if (gameStarted && selectedGame && selectedLevel !== null) {
    const GameComponent = {
      mathBuddy: MathBuddy,
      oddOneOut: OddOneOut,
      shapeIdentify: ShapeIdentify,
    }[selectedGame];

    return (
      <GameComponent
        level={selectedLevel}
        onBack={handleBackToMenu}
      />
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="mb-8 text-4xl font-bold text-center text-indigo-600">
          Math Learning Games
        </h1>

        {!selectedGame ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <GameCard
              type="mathBuddy"
              title="Math Buddy"
              description="Practice arithmetic operations with instant feedback"
              onSelect={() => handleGameSelect('mathBuddy')}
            />
            <GameCard
              type="oddOneOut"
              title="Odd One Out"
              description="Find the different shape in the group"
              onSelect={() => handleGameSelect('oddOneOut')}
            />
            <GameCard
              type="shapeIdentify"
              title="Shape Master"
              description="Identify shapes and count their occurrences"
              onSelect={() => handleGameSelect('shapeIdentify')}
            />
          </div>
        ) : !selectedLevel ? (
          <div>
            <h2 className="mb-6 text-2xl font-bold text-center">
              Select Difficulty Level
            </h2>
            <LevelSelector onSelect={handleLevelSelect} />
          </div>
        ) : (
          <div className="text-center">
            <button
              type="button" // Explicitly specifying the type
              onClick={handleStartGame}
              className="px-8 py-4 text-xl font-bold text-white transition-colors bg-indigo-600 rounded-lg hover:bg-indigo-700"
            >
              Start Game
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
