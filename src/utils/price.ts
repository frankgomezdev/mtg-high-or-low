import type { ScryfallCard } from '../types/card';

export function parsePrice(priceStr: string | null): number | null {
  if (!priceStr) return null;
  const parsed = parseFloat(priceStr);
  return isNaN(parsed) ? null : parsed;
}

export function getCardPrice(card: ScryfallCard): number | null {
  // Priority: usd > usd_foil > usd_etched
  return (
    parsePrice(card.prices.usd) ??
    parsePrice(card.prices.usd_foil) ??
    parsePrice(card.prices.usd_etched)
  );
}

export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}
