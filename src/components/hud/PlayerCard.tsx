import { PLAYER_THEME } from "../../constants";
import type { Player } from "../../types";

interface PlayerCardProps {
  player: Player;
  isActive: boolean;
}

export const PlayerCard = ({ player, isActive }: PlayerCardProps) => (
  <article
    className={`rounded border-2 bg-slate-700 p-4 shadow-md ${
      isActive
        ? `border-current ${PLAYER_THEME[player.color].text}`
        : "border-amber-200 text-white"
    }`}
  >
    <h3 className="text-sm font-black capitalize">{player.color}</h3>
    <p className="text-xs">
      Base: {player.pieces.filter((piece) => piece.status === "base").length}
    </p>
    <p className="text-xs">Finished: {player.finishedCount}</p>
  </article>
);
