import type { Player } from "../../types";
import { PLAYER_THEME } from "../../constants";

interface ScoreTrackerProps {
  players: Player[];
}

export const ScoreTracker = ({ players }: ScoreTrackerProps) => (
  <section className="rounded-2xl border border-slate-600 bg-slate-800/80 p-4 shadow-lg backdrop-blur-sm">
    <h3 className="text-sm font-black text-slate-200">Score</h3>
    <div className="mt-2 space-y-1">
      {players.map((player) => (
        <p
          key={player.color}
          className="flex items-center justify-between capitalize text-xs"
        >
          <span className={PLAYER_THEME[player.color].text}>{player.color}</span>
          <span className="text-slate-400">{player.finishedCount}/4</span>
        </p>
      ))}
    </div>
  </section>
);
