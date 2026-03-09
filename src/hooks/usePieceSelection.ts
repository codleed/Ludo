import { useState } from "react";
import { useGameStore } from "../store";

export const usePieceSelection = () => {
  const [selectedPieceId, setSelectedPieceId] = useState<string | null>(null);
  const selectPiece = useGameStore((state) => state.selectPiece);
  const getValidMovesForCurrentPiece = useGameStore(
    (state) => state.getValidMovesForCurrentPiece,
  );

  const choosePiece = (pieceId: string) => {
    setSelectedPieceId(pieceId);
    selectPiece(pieceId);
  };

  return {
    selectedPieceId,
    clearSelection: () => setSelectedPieceId(null),
    choosePiece,
    validMoves: selectedPieceId
      ? getValidMovesForCurrentPiece(selectedPieceId)
      : [],
  };
};
