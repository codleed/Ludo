import { FINAL_RELATIVE_INDEX, PLAYER_PATH_LENGTH } from "./board.constants";
import type { DiceState, Player, PlayerColor } from "../types";

export const PLAYER_COLORS: PlayerColor[] = ["red", "yellow", "green", "blue"];
export const PIECES_PER_PLAYER = 4;
export const DICE_FACES = 6;
export const BLOCKADE_SIZE = 2;
export const INITIAL_PLAYER_INDEX = 0;
export const STARTING_CONSECUTIVE_SIXES = 0;
export const FINISHED_PIECES_TO_WIN = PIECES_PER_PLAYER;
export const LAST_HOME_POSITION = FINAL_RELATIVE_INDEX;
export const PLAYER_RELATIVE_PATH_LENGTH = PLAYER_PATH_LENGTH;

export const PLAYER_THEME: Record<
  PlayerColor,
  {
    piece: string;
    base: string;
    lane: string;
    ring: string;
    text: string;
    glow: string;
  }
> = {
  red: {
    piece: "bg-red-500",
    base: "bg-red-500/20",
    lane: "bg-red-500/30",
    ring: "ring-red-400",
    text: "text-red-400",
    glow: "shadow-[0_0_12px_rgba(239,68,68,0.5)]",
  },
  blue: {
    piece: "bg-blue-500",
    base: "bg-blue-500/20",
    lane: "bg-blue-500/30",
    ring: "ring-blue-400",
    text: "text-blue-400",
    glow: "shadow-[0_0_12px_rgba(59,130,246,0.5)]",
  },
  green: {
    piece: "bg-green-500",
    base: "bg-green-500/20",
    lane: "bg-green-500/30",
    ring: "ring-green-400",
    text: "text-green-400",
    glow: "shadow-[0_0_12px_rgba(34,197,94,0.5)]",
  },
  yellow: {
    piece: "bg-yellow-400",
    base: "bg-yellow-400/20",
    lane: "bg-yellow-400/30",
    ring: "ring-yellow-300",
    text: "text-yellow-400",
    glow: "shadow-[0_0_12px_rgba(250,204,21,0.5)]",
  },
};

export const createInitialPlayers = (): Player[] =>
  PLAYER_COLORS.map((color) => ({
    color,
    finishedCount: 0,
    pieces: Array.from({ length: PIECES_PER_PLAYER }, (_, index) => ({
      id: `${color}-${index}`,
      player: color,
      status: "base",
      position: null,
      isBlockading: false,
    })),
  }));

export const createInitialDiceState = (mode: DiceState["mode"]): DiceState => ({
  mode,
  values: [],
  lastValues: [],
  usedValues: [],
  isRolled: false,
  selectionPhase: "idle",
});
