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
  }
> = {
  red: {
    piece: "bg-red-500",
    base: "bg-red-200",
    lane: "bg-red-400",
    ring: "ring-red-400",
    text: "text-red-700",
  },
  blue: {
    piece: "bg-blue-500",
    base: "bg-blue-200",
    lane: "bg-blue-400",
    ring: "ring-blue-400",
    text: "text-blue-700",
  },
  green: {
    piece: "bg-green-500",
    base: "bg-green-200",
    lane: "bg-green-400",
    ring: "ring-green-400",
    text: "text-green-700",
  },
  yellow: {
    piece: "bg-yellow-400",
    base: "bg-yellow-200",
    lane: "bg-yellow-300",
    ring: "ring-yellow-300",
    text: "text-yellow-700",
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
