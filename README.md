# MTG High or Low - EDH Edition

A guessing game built with Magic: The Gathering cards. Guess which Commander card's price value is higher or lower.

## Description

MTG High or Low - EDH Edition is a small browser-based game that uses the Scryfall API to fetch random Magic: The Gathering cards, specifically cards that can be used as a Commander in the EDH format. Players are shown a card and must guess whether the next card will have a higher or lower mana value. 

### Features

- Random MTG card fetching via Scryfall API
- Streak tracking
- Card artwork display
- Responsive design

## Tech Stack

- Vite
- TypeScript
- Tailwind CSS
- SWR for data fetching

## Installation

### Requirements

- Node.js 18+
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/mtg-high-or-low.git

# Navigate to the project directory
cd mtg-high-or-low

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Usage

Once the development server is running, open your browser to `http://localhost:5173` (or whatever next port is available). You'll see two Magic cards displayed - click on whichever card you think has the higher price value. Once your selection is made, you will see the price for both cards. If you are correct, the card you selected will be kept and a new card will be introduced where you will have to make your selection again.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Roadmap

- [ ] Update UI
- [ ] Add sound effects
- [ ] Implement leaderboard
- [ ] Add difficulty modes

## License

MIT

## Acknowledgments

- Card data provided by [Scryfall API](https://scryfall.com/docs/api)
- Magic: The Gathering is a trademark of Wizards of the Coast
