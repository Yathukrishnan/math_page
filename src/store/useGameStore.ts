import { create } from 'zustand';
import type { GameState } from '../types';

interface GameStore extends GameState {
  incrementScore: () => void;
  nextQuestion: () => void;
  resetGame: () => void;
}

export const useGameStore = create<GameStore>((set) => ({
  currentQuestion: 0,
  score: 0,
  questionsAnswered: 0,
  isComplete: false,
  
  // Add missing properties here
  currentGame: "ShapeIdentify", // Example game name
  level: 1, // Set a default level
  stars: 0, // Initial star count
  responseTime: 0, // Response time (initially 0)
  
  incrementScore: () => set((state) => ({ score: state.score + 1 })),
  
  nextQuestion: () => set((state) => ({
    currentQuestion: state.currentQuestion + 1,
    questionsAnswered: state.questionsAnswered + 1,
    isComplete: state.questionsAnswered + 1 === 10,
    // Reset response time on each question
    responseTime: 0 
  })),
  
  resetGame: () => set({
    currentQuestion: 0,
    score: 0,
    questionsAnswered: 0,
    isComplete: false,
    currentGame: "ShapeIdentify", // Reset game name
    level: 1, // Reset to level 1
    stars: 0, // Reset stars
    responseTime: 0 // Reset response time
  })
}));
