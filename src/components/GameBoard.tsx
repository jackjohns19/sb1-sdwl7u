import React, { useState, useEffect } from 'react';
import { Sparkles, AlertCircle } from 'lucide-react';

interface GameBoardProps {
  level: number;
  onCorrectAnswer: () => void;
  onIncorrectAnswer: () => void;
  streak: number;
}

const GameBoard: React.FC<GameBoardProps> = ({
  level,
  onCorrectAnswer,
  onIncorrectAnswer,
  streak,
}) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [options, setOptions] = useState<number[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [timer, setTimer] = useState(10);

  const generateQuestion = () => {
    let num1, num2, operation;
    if (level === 1) {
      num1 = Math.floor(Math.random() * 10) + 1;
      num2 = Math.floor(Math.random() * 10) + 1;
      operation = Math.random() < 0.5 ? '+' : '-';
    } else {
      num1 = Math.floor(Math.random() * 12) + 1;
      num2 = Math.floor(Math.random() * 12) + 1;
      operation = Math.random() < 0.33 ? '+' : Math.random() < 0.66 ? '-' : '×';
    }

    let result;
    switch (operation) {
      case '+':
        result = num1 + num2;
        break;
      case '-':
        result = num1 - num2;
        break;
      case '×':
        result = num1 * num2;
        break;
      default:
        result = 0;
    }

    setQuestion(`${num1} ${operation} ${num2} = ?`);
    setAnswer(result.toString());

    const wrongOptions = [
      result + 1,
      result - 1,
      result + 2,
      result - 2,
      result + 3,
      result - 3,
    ].filter((opt) => opt > 0 && opt !== result);
    const shuffledOptions = [...wrongOptions]
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    shuffledOptions.push(result);
    setOptions(shuffledOptions.sort(() => 0.5 - Math.random()));
    setTimer(10);
  };

  useEffect(() => {
    generateQuestion();
  }, [level]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          handleAnswer(NaN);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleAnswer = (selectedAnswer: number) => {
    const correct = selectedAnswer.toString() === answer;
    setIsCorrect(correct);
    if (correct) {
      playSound('correct');
      onCorrectAnswer();
    } else {
      playSound('incorrect');
      onIncorrectAnswer();
    }
    setTimeout(() => {
      setIsCorrect(null);
      generateQuestion();
    }, 1000);
  };

  const playSound = (type: 'correct' | 'incorrect') => {
    const audio = new Audio(`/sounds/${type}.mp3`);
    audio.play();
  };

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-6">{question}</h2>
      <div className="mb-4">
        <span className="text-2xl font-semibold">Time: {timer}s</span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option)}
            className={`p-4 text-xl font-semibold rounded-lg transition-colors ${
              isCorrect === null
                ? 'bg-blue-500 hover:bg-blue-600 text-white'
                : isCorrect && option.toString() === answer
                ? 'bg-green-500 text-white'
                : 'bg-red-500 text-white'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      {isCorrect !== null && (
        <div
          className={`mt-4 font-bold text-xl animate-bounce ${
            isCorrect ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {isCorrect ? (
            <>
              <Sparkles className="inline mr-2" />
              Correct!
            </>
          ) : (
            <>
              <AlertCircle className="inline mr-2" />
              Incorrect!
            </>
          )}
        </div>
      )}
      <div className="mt-4">
        <span className="text-xl font-semibold">
          Streak: {streak} 🔥
        </span>
      </div>
    </div>
  );
};

export default GameBoard;