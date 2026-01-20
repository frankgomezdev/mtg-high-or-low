import type { GameCard } from '../../types/card';
import { CommanderCard } from '../CommanderCard';
import { ScoreDisplay } from '../ScoreDisplay';

interface GameScreenProps {
  leftCard: GameCard;
  rightCard: GameCard;
  score: number;
  onSelectCard: (side: 'left' | 'right') => void;
  isRevealing: boolean;
  selectedSide: 'left' | 'right' | null;
  isCorrect: boolean | null;
}

export function GameScreen({
  leftCard,
  rightCard,
  score,
  onSelectCard,
  isRevealing,
  selectedSide,
  isCorrect,
}: GameScreenProps) {
  const leftIsWinner = leftCard.priceUsd >= rightCard.priceUsd;

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <header className="p-4 flex justify-center">
        <ScoreDisplay score={score} />
      </header>

      <main className="flex-1 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 p-4">
        <CommanderCard
          card={leftCard}
          onClick={() => onSelectCard('left')}
          disabled={isRevealing}
          showPrice={isRevealing}
          isSelected={selectedSide === 'left'}
          isWinner={isRevealing ? leftIsWinner : null}
        />

        <div className="text-2xl font-bold text-gray-500">VS</div>

        <CommanderCard
          card={rightCard}
          onClick={() => onSelectCard('right')}
          disabled={isRevealing}
          showPrice={isRevealing}
          isSelected={selectedSide === 'right'}
          isWinner={isRevealing ? !leftIsWinner : null}
        />
      </main>

      <footer className="p-4 text-center text-gray-500">
        {isRevealing ? (
          <span className={isCorrect ? 'text-green-400' : 'text-red-400'}>
            {isCorrect ? 'Correct!' : 'Wrong!'}
          </span>
        ) : (
          'Click the more expensive card'
        )}
      </footer>
    </div>
  );
}
