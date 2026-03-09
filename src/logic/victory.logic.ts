import { FINISHED_PIECES_TO_WIN } from "../constants";
import type { Player, PlayerColor } from "../types";

export const getWinner = (players: Player[]): PlayerColor | null =>
  players.find((player) => player.finishedCount >= FINISHED_PIECES_TO_WIN)?.color ?? null;
