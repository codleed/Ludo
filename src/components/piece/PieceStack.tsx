import type { PlayerColor } from "../../types";
import { Piece } from "./Piece";

interface PieceStackProps {
  color: PlayerColor;
}

export const PieceStack = ({ color }: PieceStackProps) => (
  <span className="relative flex size-8 items-center justify-center">
    <span className="absolute left-1 top-1">
      <Piece color={color} />
    </span>
    <span className="absolute right-1 bottom-1">
      <Piece color={color} />
    </span>
    <span className="absolute -right-1 -top-1 text-[10px]">🛡</span>
  </span>
);
