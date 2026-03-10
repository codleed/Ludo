import { PLAYER_THEME } from "../../constants";
import type { PlayerColor } from "../../types";

interface TurnIndicatorProps {
  color: PlayerColor;
}

export const TurnIndicator = ({ color }: TurnIndicatorProps) => (
  <div
    className={`rounded border-2 border-amber-200 bg-slate-700 p-4 text-center shadow-md ${PLAYER_THEME[color].text}`}
  >
    <p className="text-xs font-bold uppercase tracking-[0.25em]">Turn</p>
    <p className="mt-1 text-lg font-black capitalize">{color}</p>
  </div>
);
