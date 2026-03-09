import {
  BLOCKADE_ELIGIBLE_RELATIVE,
  HOME_LANE_ABSOLUTE_START,
  PLAYER_START_POSITIONS,
  SHARED_TRACK_LENGTH,
} from "../constants";
import type { BlockadeCell, DiceMode, Piece, PlayerColor } from "../types";

const isBlockadeEligible = (targetRelIndex: number): boolean =>
  BLOCKADE_ELIGIBLE_RELATIVE.includes(targetRelIndex as 0 | 50);

const canShareTarget = (
  piece: Piece,
  targetRelIndex: number,
  allPieces: Piece[],
): boolean => {
  const occupants = allPieces.filter(
    (candidate) =>
      candidate.id !== piece.id &&
      candidate.player === piece.player &&
      candidate.status === "active" &&
      candidate.position === targetRelIndex,
  ).length;

  return occupants === 0 || (occupants === 1 && isBlockadeEligible(targetRelIndex));
};

const crossesOpponentBlockade = (
  startRelIndex: number,
  targetRelIndex: number,
  color: PlayerColor,
  blockades: BlockadeCell[],
): boolean => {
  if (targetRelIndex >= SHARED_TRACK_LENGTH) {
    return false;
  }

  for (let step = startRelIndex + 1; step <= targetRelIndex; step += 1) {
    const absPosition = relativeToAbsolute(step, color);
    const isBlocked = blockades.some(
      (blockade) => blockade.owner !== color && blockade.position === absPosition,
    );

    if (isBlocked) {
      return true;
    }
  }

  return false;
};

export const relativeToAbsolute = (
  relIndex: number,
  color: PlayerColor,
): number => {
  if (relIndex >= SHARED_TRACK_LENGTH) {
    return HOME_LANE_ABSOLUTE_START[color] + (relIndex - SHARED_TRACK_LENGTH);
  }

  return (PLAYER_START_POSITIONS[color] + relIndex) % SHARED_TRACK_LENGTH;
};

export const absoluteToRelative = (
  absIndex: number,
  color: PlayerColor,
): number => {
  if (absIndex >= HOME_LANE_ABSOLUTE_START[color]) {
    return SHARED_TRACK_LENGTH + (absIndex - HOME_LANE_ABSOLUTE_START[color]);
  }

  return (absIndex - PLAYER_START_POSITIONS[color] + SHARED_TRACK_LENGTH) % SHARED_TRACK_LENGTH;
};

export const isInHomeLane = (relIndex: number): boolean =>
  relIndex >= SHARED_TRACK_LENGTH;

export const wouldOvershoot = (relIndex: number, dieValue: number): boolean =>
  relIndex + dieValue > SHARED_TRACK_LENGTH + 4;

export const getValidMovesForPiece = (
  piece: Piece,
  unusedDieValues: number[],
  allPieces: Piece[],
  blockades: BlockadeCell[],
  mode: DiceMode,
  extraBaseReleases = 0,
): Array<{ dieValue: number; targetRelIndex: number }> => {
  if (piece.status === "finished") {
    return [];
  }

  if (piece.status === "base") {
    const releaseDieValue = unusedDieValues.includes(6)
      ? 6
      : extraBaseReleases > 0
        ? 0
        : null;

    if (releaseDieValue === null || !canShareTarget(piece, 0, allPieces)) {
      return [];
    }

    if (
      mode === "double" &&
      blockades.some(
        (blockade) =>
          blockade.owner !== piece.player &&
          blockade.position === relativeToAbsolute(0, piece.player),
      )
    ) {
      return [];
    }

    return [{ dieValue: releaseDieValue, targetRelIndex: 0 }];
  }

  return unusedDieValues.flatMap((dieValue) => {
    const targetRelIndex = (piece.position ?? 0) + dieValue;

    if (wouldOvershoot(piece.position ?? -1, dieValue)) {
      return [];
    }

    if (!canShareTarget(piece, targetRelIndex, allPieces)) {
      return [];
    }

    if (
      mode === "double" &&
      targetRelIndex < SHARED_TRACK_LENGTH &&
      blockades.some(
        (blockade) =>
          blockade.owner !== piece.player &&
          blockade.position === relativeToAbsolute(targetRelIndex, piece.player),
      )
    ) {
      return [];
    }

    if (
      mode === "double" &&
      piece.status === "active" &&
      piece.position !== null &&
      crossesOpponentBlockade(piece.position, targetRelIndex, piece.player, blockades)
    ) {
      return [];
    }

    return [{ dieValue, targetRelIndex }];
  });
};
