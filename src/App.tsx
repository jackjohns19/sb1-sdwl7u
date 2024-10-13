import React, { useState, useEffect } from 'react';
import { Brain, Star, TrendingUp, Heart } from 'lucide-react';
import GameBoard from './components/GameBoard';
import ProgressBar from './components/ProgressBar';
import RewardModal from './components/RewardModal';
import GameOverModal from './components/GameOverModal';

function App() {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [showReward, setShowReward] = useState(false);
  const [streak, setStreak] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (score > 0 && score % 5 === 0) {
      setShowReward(true);
      if (score % 10 === 0) {
        setLevel((prevLevel) => prevLevel + 1);
      }
    }
  }, [score]);

  const handleCorrectAnswer = () => {
    setScore((prevScore) => prevScore + 1);
    setStreak((prevStreak) => prevStreak + 1);
  };

  const handleIncorrectAnswer = () => {
    setStreak(0);
    setLives((prevLives) => prevLives - 1);
    if (lives === 1) {
      setGameOver(true);
    }
  };

  const closeRewardModal = () => {
    setShowReward(false);
  };

  const restartGame = () => {
    setScore(0);
    setLevel(1);
    setStreak(0);
    setLives(3);
    setGameOver(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-purple-200 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-blue-600 mb-8 flex items-center">
        <Brain className="mr-2" /> Math Adventure
      </h1>
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <Star className="text-yellow-400 mr-2" />
            <span className="text-xl font-semibold">Score: {score}</span>
          </div>
          <div className="flex items-center">
            <TrendingUp className="text-green-500 mr-2" />
            <span className="text-xl font-semibold">Level: {level}</span>
          </div>
          <div className="flex items-center">
            <Heart className="text-red-500 mr-2" />
            <span className="text-xl font-semibold">Lives: {lives}</span>
          </div>
        </div>
        <ProgressBar progress={(score % 10) * 10} />
        <GameBoard
          level={level}
          onCorrectAnswer={handleCorrectAnswer}
          onIncorrectAnswer={handleIncorrectAnswer}
          streak={streak}
        />
      </div>
      {showReward && <RewardModal onClose={closeRewardModal} />}
      {gameOver && <GameOverModal score={score} onRestart={restartGame} />}
    </div>
  );
}

export default App;