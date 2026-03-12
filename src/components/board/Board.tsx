import {
  BOARD_DIMENSION,
  HOME_LANE_COORDINATES,
  SAFE_SQUARES,
  SHARED_TRACK_COORDINATES,
} from "../../constants";
import { usePieceSelection } from "../../hooks/usePieceSelection";
import { useGameStore } from "../../store";
import { absoluteToRelative, relativeToAbsolute } from "../../logic";
import type { Piece, PlayerColor } from "../../types";
import { BoardCell } from "./BoardCell";
import { CenterZone } from "./CenterZone";
import { HomeBase } from "./HomeBase";
import { HomePath } from "./HomePath";

const toTrackMap = (pieces: Piece[]) =>
  pieces.reduce<Record<number, PlayerColor[]>>((accumulator, piece) => {
    if (
      piece.status !== "active" ||
      piece.position === null ||
      piece.position >= 52
    ) {
      return accumulator;
    }

    const position = relativeToAbsolute(piece.position, piece.player);
    accumulator[position] = [...(accumulator[position] ?? []), piece.player];
    return accumulator;
  }, {});

const toLaneMap = (pieces: Piece[]) =>
  pieces.reduce<Record<string, PlayerColor>>((accumulator, piece) => {
    if (
      piece.status === "active" &&
      piece.position !== null &&
      piece.position >= 52
    ) {
      accumulator[`${piece.player}-${piece.position}`] = piece.player;
    }

    return accumulator;
  }, {});

export const getHighlightedTrackTargets = (
  validMoves: Array<{ dieValue: number; targetRelIndex: number }>,
  color: PlayerColor,
): Set<number> =>
  new Set(
    validMoves
      .filter((move) => move.targetRelIndex < 52)
      .map((move) => relativeToAbsolute(move.targetRelIndex, color)),
  );

export const getHighlightedHomeLaneTargets = (
  validMoves: Array<{ dieValue: number; targetRelIndex: number }>,
  color: PlayerColor,
): Set<string> =>
  new Set(
    validMoves
      .filter((move) => move.targetRelIndex >= 52)
      .map((move) => `${color}-${move.targetRelIndex}`),
  );

export const resolveTrackTargetRelIndex = (
  absoluteIndex: number,
  color: PlayerColor,
): number => absoluteToRelative(absoluteIndex, color);

export const shouldHandleTargetClick = (
  selectedPieceId: string | null,
  validMoves: Array<{ dieValue: number; targetRelIndex: number }>,
  targetRelIndex: number,
): boolean =>
  Boolean(selectedPieceId) &&
  validMoves.some((candidate) => candidate.targetRelIndex === targetRelIndex);

export const Board = () => {
  const players = useGameStore((state) => state.players);
  const movePiece = useGameStore((state) => state.movePiece);
  const currentPlayerIndex = useGameStore((state) => state.currentPlayerIndex);
  const allPieces = players.flatMap((player) => player.pieces);
  const { choosePiece, clearSelection, selectedPieceId, validMoves } =
    usePieceSelection();
  const trackMap = toTrackMap(allPieces);
  const laneMap = toLaneMap(allPieces);
  const currentPlayer = players[currentPlayerIndex];
  const highlightedTrackTargets = currentPlayer
    ? getHighlightedTrackTargets(validMoves, currentPlayer.color)
    : new Set<number>();
  const highlightedHomeLaneTargets = currentPlayer
    ? getHighlightedHomeLaneTargets(validMoves, currentPlayer.color)
    : new Set<string>();
  const handlePieceClick = (pieceId: string) => {
    if (!currentPlayer?.pieces.some((piece) => piece.id === pieceId)) {
      return;
    }

    choosePiece(pieceId);
  };

  const handleTargetClick = (targetRelIndex: number) => {
    if (!selectedPieceId) {
      return;
    }

    const move = validMoves.find(
      (candidate) => candidate.targetRelIndex === targetRelIndex,
    );

    if (!move) {
      return;
    }

    movePiece(selectedPieceId, move.dieValue);
    clearSelection();
  };

  return (
    <section className="aspect-square w-full max-w-[min(95vh,85vw)] rounded-xl border-2 border-emerald-700 bg-emerald-950 shadow-2xl">
      <div className="grid size-full grid-cols-[repeat(15,minmax(0,1fr))] grid-rows-[repeat(15,minmax(0,1fr))] overflow-hidden rounded-[1.5rem] bg-emerald-950">
        {Array.from(
          { length: BOARD_DIMENSION * BOARD_DIMENSION },
          (_, index) => (
            <div key={index} className="border border-emerald-800/50" />
          ),
        )}
        <HomeBase
          color="red"
          onPieceClick={handlePieceClick}
          pieces={
            players[0]?.pieces.filter((piece) => piece.status === "base") ?? []
          }
          selectedPieceId={selectedPieceId}
        />
        <HomeBase
          color="yellow"
          onPieceClick={handlePieceClick}
          pieces={
            players[1]?.pieces.filter((piece) => piece.status === "base") ?? []
          }
          selectedPieceId={selectedPieceId}
        />
        <HomeBase
          color="green"
          onPieceClick={handlePieceClick}
          pieces={
            players[2]?.pieces.filter((piece) => piece.status === "base") ?? []
          }
          selectedPieceId={selectedPieceId}
        />
        <HomeBase
          color="blue"
          onPieceClick={handlePieceClick}
          pieces={
            players[3]?.pieces.filter((piece) => piece.status === "base") ?? []
          }
          selectedPieceId={selectedPieceId}
        />
        {SHARED_TRACK_COORDINATES.map((point, index) => (
          <BoardCell
            key={`${point.row}-${point.col}`}
            className={point.className}
            isSafe={SAFE_SQUARES.includes(
              index as (typeof SAFE_SQUARES)[number],
            )}
            isHighlighted={highlightedTrackTargets.has(index)}
            isSelectable={Boolean(selectedPieceId)}
            occupantColors={trackMap[index]}
            onClick={() => {
              const targetRelIndex = currentPlayer
                ? resolveTrackTargetRelIndex(index, currentPlayer.color)
                : null;
              if (
                targetRelIndex !== null &&
                shouldHandleTargetClick(
                  selectedPieceId,
                  validMoves,
                  targetRelIndex,
                )
              ) {
                handleTargetClick(targetRelIndex);
                return;
              }

              const currentPiece = currentPlayer?.pieces.find(
                (piece) =>
                  piece.status === "active" &&
                  piece.position !== null &&
                  piece.position < 52 &&
                  relativeToAbsolute(piece.position, piece.player) === index,
              );

              if (currentPiece) {
                handlePieceClick(currentPiece.id);
                return;
              }

              if (currentPlayer) {
                handleTargetClick(targetRelIndex ?? 0);
              }
            }}
            tone={index % 13 === 0 ? "bg-emerald-600" : "bg-emerald-700/50"}
          />
        ))}
        {Object.entries(HOME_LANE_COORDINATES).flatMap(([color, points]) =>
          points.map((point, index) => (
            <HomePath
              key={`${color}-${point.row}-${point.col}`}
              className={point.className}
              color={color as PlayerColor}
              isHighlighted={highlightedHomeLaneTargets.has(
                `${color}-${index + 52}`,
              )}
              occupant={laneMap[`${color}-${index + 52}`]}
              onClick={() => {
                if (
                  shouldHandleTargetClick(
                    selectedPieceId,
                    validMoves,
                    index + 52,
                  )
                ) {
                  handleTargetClick(index + 52);
                  return;
                }

                const currentPiece = currentPlayer?.pieces.find(
                  (piece) =>
                    piece.status === "active" &&
                    piece.position === index + 52 &&
                    piece.player === color,
                );

                if (currentPiece) {
                  handlePieceClick(currentPiece.id);
                  return;
                }

                handleTargetClick(index + 52);
              }}
            />
          )),
        )}
        <CenterZone />
      </div>
    </section>
  );
};
