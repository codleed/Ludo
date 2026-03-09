import { SAFE_SQUARES } from "../constants";
import type { Piece, PlayerColor } from "../types";
import { isInHomeLane, relativeToAbsolute } from "./movement.logic";

export const resolveCaptureAtPosition = (
  landingAbsPosition: number,
  movingPieceColor: PlayerColor,
  allPieces: Piece[],
): Piece | null => {
  if (SAFE_SQUARES.includes(landingAbsPosition as (typeof SAFE_SQUARES)[number])) {
    return null;
  }

  const capturablePieces = allPieces.filter((piece) => {
    if (piece.player === movingPieceColor || piece.status !== "active" || piece.position === null) {
      return false;
    }

    if (isInHomeLane(piece.position)) {
      return false;
    }

    return relativeToAbsolute(piece.position, piece.player) === landingAbsPosition;
  });

  return capturablePieces.length === 1 ? capturablePieces[0] : null;
};
