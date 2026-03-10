import { Piece } from "../piece/Piece";
import { PieceStack } from "../piece/PieceStack";
import type { PlayerColor } from "../../types";

interface BoardCellProps {
  className: string;
  tone?: string;
  isSafe?: boolean;
  isHighlighted?: boolean;
  occupantColors?: PlayerColor[];
  isSelectable?: boolean;
  onClick?: () => void;
}

export const BoardCell = ({
  className,
  tone = "bg-stone-400",
  isSafe = false,
  isHighlighted = false,
  occupantColors = [],
  isSelectable = false,
  onClick,
}: BoardCellProps) => (
  <div
    className={`${className} flex items-center justify-center border border-slate-300 ${
      isHighlighted ? "ring-4 ring-amber-400 ring-inset" : ""
    } ${tone} ${onClick ? "cursor-pointer" : ""}`}
    onClick={onClick}
  >
    {occupantColors.length >= 2 ? (
      <PieceStack color={occupantColors[0]} />
    ) : occupantColors[0] ? (
      <Piece color={occupantColors[0]} isSelectable={isSelectable} />
    ) : isSafe ? (
      <span className="text-sm">⭐</span>
    ) : null}
  </div>
);
