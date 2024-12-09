export const generateQuestion = (level: number): {
  question: string;
  options: string[];
  correctAnswer: string;
} => {
  let num1: number;
  let num2: number;
  let operation: string;

  console.log(`Generating question for Level ${level}`);

  switch (level) {
    case 1: // Addition and subtraction with single digits
      num1 = Math.floor(Math.random() * 10);
      num2 = Math.floor(Math.random() * (num1 + 1)); // Ensure positive results for subtraction
      operation = Math.random() < 0.5 ? '+' : '-';
      break;
    case 2: // Two digit addition
      num1 = Math.floor(Math.random() * 90) + 10;
      num2 = Math.floor(Math.random() * 90) + 10;
      operation = '+';
      break;
    case 3: // Two digit addition and subtraction
      num1 = Math.floor(Math.random() * 90) + 10;
      num2 = Math.floor(Math.random() * (num1 - 9)) + 10;
      operation = Math.random() < 0.5 ? '+' : '-';
      break;
    case 4: // Simple multiplication
      num1 = Math.floor(Math.random() * 10);
      num2 = Math.floor(Math.random() * 10);
      operation = '×';
      break;
    default:
      // If an invalid level is passed, we default to level 1
      num1 = Math.floor(Math.random() * 10);
      num2 = Math.floor(Math.random() * (num1 + 1)); // Ensure positive results for subtraction
      operation = Math.random() < 0.5 ? '+' : '-';
      console.log("Invalid level provided. Defaulting to level 1.");
  }

  let correctAnswer: number;
  if (operation === '×') {
    correctAnswer = num1 * num2;
  } else {
    correctAnswer = operation === '+' ? num1 + num2 : num1 - num2;
  }

  const correctAnswerStr = String(correctAnswer);

  console.log(`Correct Answer: ${correctAnswerStr}`);

  // Generate wrong options
  const options: string[] = [correctAnswerStr];
  while (options.length < 4) {
    const offset = Math.floor(Math.random() * 5) + 1; // Random offset for wrong answers
    const wrongAnswer = String(Number.parseInt(correctAnswerStr) + (Math.random() < 0.5 ? offset : -offset));
    if (!options.includes(wrongAnswer)) {
      options.push(wrongAnswer);
    }
  }

  // Shuffle options to randomize the order
  options.sort(() => Math.random() - 0.5);

  return {
    question: `${num1} ${operation} ${num2} = ?`,
    options,
    correctAnswer: correctAnswerStr,
  };
};
