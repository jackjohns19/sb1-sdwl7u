import React from 'react';
import { RefreshCw } from 'lucide-react';

interface GameOverModalProps {
  score: number;
  onRestart: () => void;
}

const GameOverModal: React.FC<GameOverModalProps> = ({ score, onRestart }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-sm w-full text-center relative">
        <h2 className="text-3xl font-bold mb-4">Game Over</h2>
        <p className="text-xl mb-6">Your final score: {score}</p>
        <button
          onClick={onRestart}
          className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors flex items-center justify-center mx-auto"
        >
          <RefreshCw className="mr-2" />
          Play Again
        </button>
      </div>
    </div>
  );
};

export default GameOverModal;