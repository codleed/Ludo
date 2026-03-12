import type { PlayerColor } from "../../types";
import { PLAYER_THEME } from "../../constants";

interface HomePathProps {
  className: string;
  color: PlayerColor;
  occupant?: PlayerColor;
  isHighlighted?: boolean;
  onClick?: () => void;
}

export const HomePath = ({
  className,
  color,
  occupant,
  isHighlighted = false,
  onClick,
}: HomePathProps) => (
  <div
    className={`${className} flex items-center justify-center border border-emerald-800/30 ${
      PLAYER_THEME[color].lane
    } ${isHighlighted ? "ring-4 ring-orange-400 ring-inset shadow-[0_0_15px_rgba(249,115,22,0.5)]" : ""} ${
      onClick ? "cursor-pointer" : ""
    }`}
    onClick={onClick}
  >
    {occupant ? <span className={`size-6 rounded-full border-2 border-emerald-900/50 ${PLAYER_THEME[occupant].piece}`} /> : null}
  </div>
);
