export const getFeedbackMessage = (responseTime: number, isCorrect: boolean): {
  message: string;
  soundUrl: string;
} => {
  if (!isCorrect) {
    return {
      message: "Never Give Up! Keep Going!",
      soundUrl: "/sounds/never-give-up.mp3"
    };
  }

  if (responseTime < 3) {
    return {
      message: "Lightning Speed! Amazing!",
      soundUrl: "/sounds/lightning-speed.mp3"
    };
  }

  if (responseTime < 6) {
    return {
      message: "Great Work! Keep it up!",
      soundUrl: "/sounds/great-work.mp3"
    };
  }

  return {
    message: "Good effort! Try to be faster next time!",
    soundUrl: "/sounds/good-effort.mp3"
  };
};

export const calculateStars = (responseTime: number, isCorrect: boolean): number => {
  if (!isCorrect) return 0;
  if (responseTime < 3) return 5;
  if (responseTime < 5) return 4;
  if (responseTime < 7) return 3;
  if (responseTime < 10) return 2;
  return 1;
};
