// Scryfall API card response (subset of fields we need)
export interface ScryfallCard {
  id: string;
  name: string;
  image_uris?: {
    small: string;
    normal: string;
    large: string;
    png: string;
    art_crop: string;
    border_crop: string;
  };
  // For double-faced cards, image_uris may be null
  card_faces?: Array<{
    image_uris?: {
      small: string;
      normal: string;
      large: string;
      png: string;
    };
  }>;
  prices: {
    usd: string | null;
    usd_foil: string | null;
    usd_etched: string | null;
    eur: string | null;
    eur_foil: string | null;
  };
}

// Normalized card for game use
export interface GameCard {
  id: string;
  name: string;
  imageUrl: string;
  priceUsd: number;
}

// Game screen states
export type GameScreen = 'start' | 'playing' | 'revealing' | 'gameover';

// Game state
export interface GameState {
  screen: GameScreen;
  score: number;
  leftCard: GameCard | null;
  rightCard: GameCard | null;
  selectedSide: 'left' | 'right' | null;
  isCorrect: boolean | null;
}
