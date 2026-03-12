import { PLAYER_THEME } from "../../constants";
import type { PlayerColor } from "../../types";

interface TurnIndicatorProps {
  color: PlayerColor;
}

export const TurnIndicator = ({ color }: TurnIndicatorProps) => (
  <div
    className={`rounded-2xl border border-slate-600 bg-slate-800/80 p-4 text-center shadow-lg backdrop-blur-sm ${PLAYER_THEME[color].text}`}
  >
    <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-400">Turn</p>
    <p className="mt-1 text-lg font-black capitalize">{color}</p>
  </div>
);
