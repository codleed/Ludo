import { PLAYER_THEME } from "../../constants";
import type { PlayerColor } from "../../types";

interface PieceProps {
  color: PlayerColor;
  isSelectable?: boolean;
}

export const Piece = ({ color, isSelectable = false }: PieceProps) => (
  <span
    className={`flex size-6 items-center justify-center rounded-full border-2 border-white shadow-md transition-transform ${
      PLAYER_THEME[color].piece
    } ${isSelectable ? `ring-4 ${PLAYER_THEME[color].ring} animate-pulse` : ""}`}
  />
);
