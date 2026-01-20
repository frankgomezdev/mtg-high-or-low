interface GameOverScreenProps {
  score: number;
  onPlayAgain: () => void;
}

export function GameOverScreen({ score, onPlayAgain }: GameOverScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-900">
      <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-4">
        Game Over
      </h1>
      <p className="text-gray-400 text-center mb-2">Your final score</p>
      <div className="text-6xl md:text-8xl font-bold text-blue-400 mb-8">
        {score}
      </div>
      <button
        onClick={onPlayAgain}
        className="px-8 py-4 text-xl font-bold rounded-lg bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 transition-all"
      >
        Play Again
      </button>
    </div>
  );
}
