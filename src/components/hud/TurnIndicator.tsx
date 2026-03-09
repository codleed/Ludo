import { PLAYER_THEME } from "../../constants";
import type { PlayerColor } from "../../types";

interface TurnIndicatorProps {
  color: PlayerColor;
}

export const TurnIndicator = ({ color }: TurnIndicatorProps) => (
  <div className={`rounded-3xl border-4 border-amber-200 bg-white p-4 text-center shadow-md ${PLAYER_THEME[color].text}`}>
    <p className="text-sm font-bold uppercase tracking-[0.25em]">Turn</p>
    <p className="mt-2 text-2xl font-black capitalize">{color}</p>
  </div>
);
