export type PlayerColor = "red" | "blue" | "green" | "yellow";
export type DiceMode = "single" | "double";
export type PieceStatus = "base" | "active" | "finished";
export type GamePhase = "setup" | "playing" | "finished";
export type SelectionPhase =
  | "idle"
  | "die-select"
  | "piece-select"
  | "complete";

export interface Piece {
  id: string;
  player: PlayerColor;
  status: PieceStatus;
  position: number | null;
  isBlockading: boolean;
}

export interface Player {
  color: PlayerColor;
  pieces: Piece[];
  finishedCount: number;
}

export interface DiceState {
  mode: DiceMode;
  values: number[];
  lastValues: number[];
  usedValues: number[];
  isRolled: boolean;
  selectionPhase: SelectionPhase;
}

export interface BlockadeCell {
  position: number;
  owner: PlayerColor;
}

export interface GameState {
  players: Player[];
  currentPlayerIndex: number;
  dice: DiceState;
  blockades: BlockadeCell[];
  phase: GamePhase;
  winner: PlayerColor | null;
  consecutiveSixes: number;
  firstReleaseBonusOwner: PlayerColor | null;
  extraBaseReleases: number;
}
