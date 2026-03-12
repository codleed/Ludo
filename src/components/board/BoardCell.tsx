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
  tone = "bg-emerald-700/50",
  isSafe = false,
  isHighlighted = false,
  occupantColors = [],
  isSelectable = false,
  onClick,
}: BoardCellProps) => (
  <div
    className={`${className} flex items-center justify-center border border-emerald-800/30 ${
      isHighlighted ? "ring-4 ring-orange-400 ring-inset shadow-[0_0_15px_rgba(249,115,22,0.5)]" : ""
    } ${tone} ${onClick ? "cursor-pointer" : ""}`}
    onClick={onClick}
  >
    {occupantColors.length >= 2 ? (
      <PieceStack color={occupantColors[0]} />
    ) : occupantColors[0] ? (
      <Piece color={occupantColors[0]} isSelectable={isSelectable} />
    ) : isSafe ? (
      <span className="text-sm text-emerald-300/70">★</span>
    ) : null}
  </div>
);
