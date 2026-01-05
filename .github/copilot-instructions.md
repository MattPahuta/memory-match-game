# Memory Match Game - Copilot Instructions

## Architecture Overview

This is a **React + Vite + Tailwind CSS** memory card game frontend from a Frontend Mentor challenge. The game fetches emoji data from an external API, creates card pairs, and tracks game state through React hooks.

### Data Flow

1. **Start Screen** (`Start.jsx`) → User initiates game
2. **API Fetch** in `App.jsx` → Retrieves emoji data from `emojihub.yurace.pro`
3. **Card Generation** → Duplicates emojis, shuffles with Fisher-Yates algorithm
4. **Game Loop** → User clicks cards, selected cards tracked in state, matches detected via `useEffect`

### Key State Management (App.jsx)

- `isGameStarted` - Game begun after button click
- `emojisData` - Array of emoji objects from API
- `selectedCards` - Currently flipped cards (max 2 per turn)
- `matchedCards` - Permanent matches found
- `isGameOver` - Win condition detected when all cards matched

## Critical Patterns

### Matching Detection

The `useEffect` in `App.jsx` (line 16-26) automatically detects when two cards are selected and compares their `name` property. **Never modify this without updating both the selectedCards state and the matching logic.**

### Card State Representation

Cards are stored as objects with: `{ name, htmlCode, index }`. The `index` field is essential for identifying which card in the grid corresponds to the match/selection. Use `find()` to locate cards by index in both `MemoryGrid` and `CardButton`.

### Emoji Rendering

HTML-encoded entities from the API require `decodeEntity()` from `html-entities` package before display. Applied in `MemoryGrid.jsx` (line 8) - **always decode before rendering emojis**.

### Conditional Rendering Logic

`CardButton` shows:

- `"?"` when unselected
- Emoji when selected OR matched
- Different text sizes based on state (7xl → 5xl → 6xl)

This is purely presentational; logic is in the parent `MemoryGrid`.

## Build & Development

```bash
npm run dev      # Start Vite dev server on http://localhost:5173
npm run build    # Production build to dist/
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

**ESLint Configuration**: Uses flat config (eslint.config.js). Watch for React hooks warnings.

## Known Limitations & TODOs

1. **Grid Size Not Implemented**: Code structure supports 5 emojis (10 cards). Functions `getRandomIndices()` and `getEmojisArray()` have comments for 16 (4x4) or 36 (6x6) grids but are hardcoded to 5.
2. **Single Player Only**: Game structure supports multiplayer but not implemented.
3. **Fixed Theme**: Only animals-and-nature emoji category. Would need theme selector UI and conditional API endpoint.
4. **No Reset Button**: After game over, user must refresh page.

## External Dependencies

- **EmojiHub API**: `https://emojihub.yurace.pro/api/all/category/animals-and-nature` - No auth required, returns `{ name, htmlCode: [] }` objects
- **html-entities**: Decodes HTML entities in emoji codes
- **Tailwind CSS v4**: Uses Vite plugin, not PostCSS. Custom colors not yet added to config.

## File Reference Map

| File             | Purpose                                       |
| ---------------- | --------------------------------------------- |
| `App.jsx`        | Root state, API fetch, game logic             |
| `MemoryGrid.jsx` | Renders card grid, manages card state styling |
| `CardButton.jsx` | Individual card button, conditional display   |
| `Start.jsx`      | Simple start form wrapper                     |
| `Button.jsx`     | Reusable button component                     |
| `utils.js`       | Fisher-Yates shuffle algorithm                |

## Notes for AI Agents

- **Cards never reset mid-game**: Once matched, they stay visible. If modifying match logic, preserve this.
- **No card flip animation**: CSS is commented in component files. CSS 3D transforms would be needed.
- **Console logging**: Debug statements present; remove or use proper logging before production.
- **Error handling**: API fetch has try-catch but logs to console only; consider user feedback UI.
