interface StartScreenProps {
  onStart: () => void;
  isLoading: boolean;
}

export function StartScreen({ onStart, isLoading }: StartScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-900">
      <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-4">
        MTG Higher or Lower
      </h1>
      <p className="text-gray-400 text-center mb-8 max-w-md">
        Pick the more expensive commander card. How long can you keep your streak going?
      </p>
      <button
        onClick={onStart}
        disabled={isLoading}
        className={`
          px-8 py-4 text-xl font-bold rounded-lg transition-all
          ${
            isLoading
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105'
          }
        `}
      >
        {isLoading ? 'Loading...' : 'Play'}
      </button>
    </div>
  );
}
