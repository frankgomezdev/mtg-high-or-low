import { useReducer, useCallback } from 'react';
import type { GameState, GameCard } from '../types/card';
import { fetchTwoCommanders, fetchRandomCommander } from '../utils/api';

type GameAction =
  | { type: 'START_GAME' }
  | { type: 'CARDS_LOADED'; left: GameCard; right: GameCard }
  | { type: 'CARD_SELECTED'; side: 'left' | 'right' }
  | { type: 'NEXT_CARD_LOADED'; newCard: GameCard }
  | { type: 'GAME_OVER' }
  | { type: 'RESET_GAME' }
  | { type: 'SET_ERROR'; error: string };

interface FullGameState extends GameState {
  isLoading: boolean;
  error: string | null;
}

const initialState: FullGameState = {
  screen: 'start',
  score: 0,
  leftCard: null,
  rightCard: null,
  selectedSide: null,
  isCorrect: null,
  isLoading: false,
  error: null,
};

function gameReducer(state: FullGameState, action: GameAction): FullGameState {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...initialState,
        screen: 'start',
        isLoading: true,
      };

    case 'CARDS_LOADED':
      return {
        ...state,
        screen: 'playing',
        leftCard: action.left,
        rightCard: action.right,
        isLoading: false,
        error: null,
      };

    case 'CARD_SELECTED': {
      const { leftCard, rightCard } = state;
      if (!leftCard || !rightCard) return state;

      const selectedCard =
        action.side === 'left' ? leftCard : rightCard;
      const otherCard =
        action.side === 'left' ? rightCard : leftCard;
      const isCorrect = selectedCard.priceUsd >= otherCard.priceUsd;

      return {
        ...state,
        screen: 'revealing',
        selectedSide: action.side,
        isCorrect,
      };
    }

    case 'NEXT_CARD_LOADED': {
      const { leftCard, rightCard, selectedSide } = state;
      if (!leftCard || !rightCard || !selectedSide) return state;

      // Winner stays on left, new card on right
      const winner =
        selectedSide === 'left' ? leftCard : rightCard;

      return {
        ...state,
        screen: 'playing',
        score: state.score + 1,
        leftCard: winner,
        rightCard: action.newCard,
        selectedSide: null,
        isCorrect: null,
        isLoading: false,
      };
    }

    case 'GAME_OVER':
      return {
        ...state,
        screen: 'gameover',
        isLoading: false,
      };

    case 'RESET_GAME':
      return initialState;

    case 'SET_ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };

    default:
      return state;
  }
}

export function useGame() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const startGame = useCallback(async () => {
    dispatch({ type: 'START_GAME' });
    try {
      const [left, right] = await fetchTwoCommanders();
      dispatch({ type: 'CARDS_LOADED', left, right });
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        error: error instanceof Error ? error.message : 'Failed to load cards',
      });
    }
  }, []);

  const selectCard = useCallback(
    async (side: 'left' | 'right') => {
      dispatch({ type: 'CARD_SELECTED', side });

      const { leftCard, rightCard } = state;
      if (!leftCard || !rightCard) return;

      const selectedCard = side === 'left' ? leftCard : rightCard;
      const otherCard = side === 'left' ? rightCard : leftCard;
      const isCorrect = selectedCard.priceUsd >= otherCard.priceUsd;

      // Wait for reveal animation
      await new Promise((resolve) => setTimeout(resolve, 3000));

      if (isCorrect) {
        try {
          const winner = side === 'left' ? leftCard : rightCard;
          const newCard = await fetchRandomCommander(winner.id);
          dispatch({ type: 'NEXT_CARD_LOADED', newCard });
        } catch (error) {
          dispatch({
            type: 'SET_ERROR',
            error:
              error instanceof Error ? error.message : 'Failed to load next card',
          });
        }
      } else {
        dispatch({ type: 'GAME_OVER' });
      }
    },
    [state]
  );

  const resetGame = useCallback(() => {
    dispatch({ type: 'RESET_GAME' });
  }, []);

  return {
    ...state,
    startGame,
    selectCard,
    resetGame,
  };
}
