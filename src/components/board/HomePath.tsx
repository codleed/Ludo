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
    className={`${className} flex items-center justify-center border border-slate-300 ${
      PLAYER_THEME[color].lane
    } ${isHighlighted ? "ring-4 ring-amber-400 ring-inset" : ""} ${
      onClick ? "cursor-pointer" : ""
    }`}
    onClick={onClick}
  >
    {occupant ? <span className={`size-6 rounded-full border-2 border-white ${PLAYER_THEME[occupant].piece}`} /> : null}
  </div>
);
