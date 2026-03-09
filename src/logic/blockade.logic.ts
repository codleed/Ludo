import {
  BLOCKADE_ELIGIBLE_RELATIVE,
  BLOCKADE_SIZE,
  SHARED_TRACK_LENGTH,
} from "../constants";
import type { BlockadeCell, Piece, PlayerColor } from "../types";
import { relativeToAbsolute } from "./movement.logic";

export const canFormBlockade = (
  piece: Piece,
  targetRelIndex: number,
  playerPieces: Piece[],
): boolean => {
  if (!BLOCKADE_ELIGIBLE_RELATIVE.includes(targetRelIndex as 0 | 50)) {
    return false;
  }

  const occupants = playerPieces.filter(
    (candidate) =>
      candidate.id !== piece.id &&
      candidate.status === "active" &&
      candidate.position === targetRelIndex,
  ).length;

  return occupants === BLOCKADE_SIZE - 1;
};

export const isBlockadedForPlayer = (
  targetAbsPosition: number,
  movingColor: PlayerColor,
  blockades: BlockadeCell[],
): boolean =>
  blockades.some(
    (blockade) =>
      blockade.owner !== movingColor && blockade.position === targetAbsPosition,
  );

export const updateBlockadesAfterMove = (
  movedPiece: Piece,
  previousRelIndex: number,
  blockades: BlockadeCell[],
): BlockadeCell[] => {
  const nextBlockades = blockades.filter(
    (blockade) =>
      blockade.position !== relativeToAbsolute(previousRelIndex, movedPiece.player),
  );

  if (
    !movedPiece.isBlockading ||
    movedPiece.position === null ||
    movedPiece.position >= SHARED_TRACK_LENGTH
  ) {
    return nextBlockades;
  }

  return [
    ...nextBlockades,
    {
      position: relativeToAbsolute(movedPiece.position, movedPiece.player),
      owner: movedPiece.player,
    },
  ];
};
