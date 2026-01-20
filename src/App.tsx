import { useGame } from './hooks/useGame';
import { StartScreen } from './components/screens/StartScreen';
import { GameScreen } from './components/screens/GameScreen';
import { GameOverScreen } from './components/screens/GameOverScreen';

function App() {
  const {
    screen,
    score,
    leftCard,
    rightCard,
    selectedSide,
    isCorrect,
    isLoading,
    error,
    startGame,
    selectCard,
    resetGame,
  } = useGame();

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-900">
        <p className="text-red-400 text-center mb-4">{error}</p>
        <button
          onClick={resetGame}
          className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (screen === 'start') {
    return <StartScreen onStart={startGame} isLoading={isLoading} />;
  }

  if (screen === 'gameover') {
    return <GameOverScreen score={score} onPlayAgain={resetGame} />;
  }

  if ((screen === 'playing' || screen === 'revealing') && leftCard && rightCard) {
    return (
      <GameScreen
        leftCard={leftCard}
        rightCard={rightCard}
        score={score}
        onSelectCard={selectCard}
        isRevealing={screen === 'revealing' || isLoading}
        selectedSide={selectedSide}
        isCorrect={isCorrect}
      />
    );
  }

  // Loading state while fetching initial cards
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="text-white text-xl">Loading cards...</div>
    </div>
  );
}

export default App;
