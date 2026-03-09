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
    className={`grid ${HOME_BASE_CLASSES[color]} place-items-center border-4 border-white ${PLAYER_THEME[color].base}`}
  >
    <div className="grid grid-cols-2 gap-6 rounded-[1.75rem] border-4 border-white bg-white/70 p-6 shadow-inner">
      {pieces.map((piece) => (
        <button
          key={piece.id}
          className="flex size-12 items-center justify-center rounded-full border-2 border-white bg-white/70"
          onClick={() => onPieceClick(piece.id)}
          type="button"
        >
          <Piece color={color} isSelectable={selectedPieceId === piece.id} />
        </button>
      ))}
    </div>
  </div>
);
