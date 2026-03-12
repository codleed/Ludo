import { PLAYER_THEME } from "../../constants";
import type { Player } from "../../types";

interface PlayerCardProps {
  player: Player;
  isActive: boolean;
}

export const PlayerCard = ({ player, isActive }: PlayerCardProps) => (
  <article
    className={`rounded-2xl border bg-slate-800/80 p-4 shadow-lg backdrop-blur-sm transition-all ${
      isActive
        ? `border-orange-500/50 shadow-[0_0_15px_rgba(249,115,22,0.3)]`
        : "border-slate-600"
    }`}
  >
    <h3 className={`text-sm font-black capitalize ${PLAYER_THEME[player.color].text}`}>
      {player.color}
    </h3>
    <p className="text-xs text-slate-400">
      Base: {player.pieces.filter((piece) => piece.status === "base").length}
    </p>
    <p className="text-xs text-slate-400">Finished: {player.finishedCount}</p>
  </article>
);
