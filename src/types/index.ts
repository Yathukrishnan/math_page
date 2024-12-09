export interface GameState {
  currentGame: string | null;
  level: number;
  currentQuestion: number;
  score: number;
  questionsAnswered: number;
  isComplete: boolean;
  stars: number;
  responseTime: number;
}

export interface FeedbackMessage {
  text: string;
  sound: string;
  color: string;
}

export interface Shape {
  id: string;
  type: string;
  count?: number;
  isOdd?: boolean;
}

export type GameType = 'mathBuddy' | 'oddOneOut' | 'shapeIdentify';