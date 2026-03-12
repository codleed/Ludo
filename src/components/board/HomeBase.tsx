import { PLAYER_THEME } from "../../constants";
import type { Piece as GamePiece, PlayerColor } from "../../types";
import { Piece } from "../piece/Piece";

export const HOME_BASE_CLASSES: Record<PlayerColor, string> = {
  red: "col-span-6 col-start-1 row-span-6 row-start-1",
  blue: "col-span-6 col-start-10 row-span-6 row-start-1",
  green: "col-span-6 col-start-10 row-span-6 row-start-10",
  yellow: "col-span-6 col-start-1 row-span-6 row-start-10",
};

interface HomeBaseProps {
  color: PlayerColor;
  pieces: GamePiece[];
  onPieceClick: (pieceId: string) => void;
  selectedPieceId: string | null;
}

export const HomeBase = ({
  color,
  pieces,
  onPieceClick,
  selectedPieceId,
}: HomeBaseProps) => (
  <div
    className={`grid ${HOME_BASE_CLASSES[color]} place-items-center border-4 border-emerald-900 ${PLAYER_THEME[color].base}`}
  >
    <div className="grid grid-cols-2 gap-4 rounded-[1.75rem] border-4 border-emerald-900/50 bg-emerald-950/50 p-5 shadow-inner">
      {pieces.map((piece) => (
        <button
          key={piece.id}
          className="flex size-12 items-center justify-center rounded-full border-2 border-emerald-800/50 bg-emerald-900/30"
          onClick={() => onPieceClick(piece.id)}
          type="button"
        >
          <Piece color={color} isSelectable={selectedPieceId === piece.id} />
        </button>
      ))}
    </div>
  </div>
);
