import type { GameCard } from '../types/card';
import { formatPrice } from '../utils/price';

interface CommanderCardProps {
  card: GameCard;
  onClick: () => void;
  disabled: boolean;
  showPrice: boolean;
  isSelected: boolean;
  isWinner: boolean | null;
}

export function CommanderCard({
  card,
  onClick,
  disabled,
  showPrice,
  isSelected,
  isWinner,
}: CommanderCardProps) {
  const getBorderColor = () => {
    if (!showPrice) return 'border-transparent';
    if (isWinner) return 'border-green-500';
    return 'border-red-500';
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={onClick}
        disabled={disabled}
        className={`
          relative rounded-xl overflow-hidden border-4 transition-all duration-300
          ${getBorderColor()}
          ${disabled ? 'cursor-not-allowed' : 'cursor-pointer hover:scale-105 hover:shadow-2xl'}
          ${isSelected ? 'ring-4 ring-blue-400 ring-offset-2' : ''}
          focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-2
        `}
      >
        <img
          src={card.imageUrl}
          alt={card.name}
          className="w-full h-auto max-w-[250px] md:max-w-[300px] lg:max-w-[350px]"
          loading="eager"
        />
      </button>

      {showPrice && (
        <div
          className={`
            text-2xl font-bold px-4 py-2 rounded-lg transition-all duration-300
            ${isWinner ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}
          `}
        >
          {formatPrice(card.priceUsd)}
        </div>
      )}
    </div>
  );
}
