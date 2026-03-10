import type { Player } from "../../types";

interface ScoreTrackerProps {
  players: Player[];
}

export const ScoreTracker = ({ players }: ScoreTrackerProps) => (
  <section className="rounded border-2 border-amber-200 bg-slate-700 p-4 shadow-md">
    <h3 className="text-sm font-black text-slate-900">Score</h3>
    <div className="mt-2 space-y-1">
      {players.map((player) => (
        <p
          key={player.color}
          className="flex items-center justify-between capitalize text-white text-xs"
        >
          <span>{player.color}</span>
          <span>{player.finishedCount}/4</span>
        </p>
      ))}
    </div>
  </section>
);
