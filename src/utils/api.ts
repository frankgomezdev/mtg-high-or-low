import type { ScryfallCard, GameCard } from '../types/card';
import { getCardPrice } from './price';

const SCRYFALL_RANDOM_COMMANDER =
  'https://api.scryfall.com/cards/random?q=is:commander';
const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 100;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getImageUrl(card: ScryfallCard): string {
  if (card.image_uris) {
    return card.image_uris.large;
  }
  if (card.card_faces?.[0]?.image_uris) {
    return card.card_faces[0].image_uris.large;
  }
  throw new Error('No image available for card');
}

function normalizeCard(card: ScryfallCard, price: number): GameCard {
  return {
    id: card.id,
    name: card.name,
    imageUrl: getImageUrl(card),
    priceUsd: price,
  };
}

async function fetchScryfallCard(): Promise<ScryfallCard> {
  const response = await fetch(SCRYFALL_RANDOM_COMMANDER, {
    headers: {
      Accept: 'application/json',
    },
  });

  if (response.status === 429) {
    throw new Error('Rate limited. Please wait a moment.');
  }

  if (!response.ok) {
    throw new Error('Failed to fetch card from Scryfall');
  }

  return response.json();
}

export async function fetchRandomCommander(
  excludeId?: string
): Promise<GameCard> {
  for (let i = 0; i < MAX_RETRIES; i++) {
    try {
      const card = await fetchScryfallCard();
      const price = getCardPrice(card);

      // Skip cards without a price
      if (price === null) {
        await delay(RETRY_DELAY_MS);
        continue;
      }

      // Skip if same as excluded card
      if (excludeId && card.id === excludeId) {
        await delay(RETRY_DELAY_MS);
        continue;
      }

      return normalizeCard(card, price);
    } catch (error) {
      if (i === MAX_RETRIES - 1) throw error;
      await delay(RETRY_DELAY_MS);
    }
  }

  throw new Error('Could not find a valid commander after multiple attempts');
}

export async function fetchTwoCommanders(): Promise<[GameCard, GameCard]> {
  const first = await fetchRandomCommander();
  await delay(RETRY_DELAY_MS); // Rate limit compliance
  const second = await fetchRandomCommander(first.id);
  return [first, second];
}
