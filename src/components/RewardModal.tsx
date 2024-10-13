import React from 'react';
import { Award, X } from 'lucide-react';

interface RewardModalProps {
  onClose: () => void;
}

const RewardModal: React.FC<RewardModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-sm w-full text-center relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        <Award className="text-yellow-400 w-16 h-16 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-4">Congratulations!</h2>
        <p className="text-lg mb-6">
          You've earned a new badge for your excellent math skills!
        </p>
        <button
          onClick={onClose}
          className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors"
        >
          Keep Learning
        </button>
      </div>
    </div>
  );
};

export default RewardModal;