# Ludo

Desktop Ludo built with Tauri v2, React 18, TypeScript, Zustand, and Tailwind CSS.

## Stack

- Tauri v2
- React 18
- TypeScript (`strict`)
- Zustand
- Tailwind CSS
- Vitest

## Features

- 4-player local human-vs-human Ludo
- `single` and `double` dice modes
- Classic 15x15 Ludo board layout
- Piece release, movement, capture, safe squares, home lanes, and victory flow
- Double-dice `1,1 -> 6,6` rule
- Double-dice extra turn only on `6,6`
- One-time first-release bonus:
  - Triggered only while all 16 pieces are still in base
  - The first player to roll a `6` gets one extra base-release action
  - This is not shown as a third die and cannot be used as a normal move
- Blockades in double mode only
- Last rolled dice stay visible after automatic skipped turns

## Current Rule Notes

- A piece leaves base only on a `6`
- In double mode, dice are consumed independently
- If both dice are `1`, they are treated as `6,6`
- A blockade can form only on a player's relative positions `0` and `50`
- Captures grant an extra turn
- Pieces in home lanes cannot be captured

## Development

Install dependencies:

```bash
npm install
```

Run the web app:

```bash
npm run dev
```

Run the Tauri desktop app:

```bash
npm run tauri dev
```

Create a production build:

```bash
npm run build
```

Run tests:

```bash
npm test
```

## Project Structure

```text
src/
├── components/    # Board, dice, HUD, screens, pieces
├── constants/     # Board and game constants
├── hooks/         # UI hooks bound to store actions
├── logic/         # Pure game rules
├── store/         # Zustand orchestration layer
└── types/         # Shared TypeScript types
```

## Verification

Current local verification:

- `npx vitest run`
- `npm run build`

## Recommended IDE Setup

- VS Code
- Tauri VS Code extension
- rust-analyzer
