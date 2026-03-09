import { PLAYER_THEME } from "../../constants";
import type { Player } from "../../types";

interface PlayerCardProps {
  player: Player;
  isActive: boolean;
}

export const PlayerCard = ({ player, isActive }: PlayerCardProps) => (
  <article
    className={`rounded-3xl border-4 bg-white p-4 shadow-md ${
      isActive ? `border-current ${PLAYER_THEME[player.color].text}` : "border-amber-200 text-slate-700"
    }`}
  >
    <h3 className="text-lg font-black capitalize">{player.color}</h3>
    <p>Base: {player.pieces.filter((piece) => piece.status === "base").length}</p>
    <p>Finished: {player.finishedCount}</p>
  </article>
);
