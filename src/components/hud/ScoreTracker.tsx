import type { Player } from "../../types";

interface ScoreTrackerProps {
  players: Player[];
}

export const ScoreTracker = ({ players }: ScoreTrackerProps) => (
  <section className="rounded-3xl border-4 border-amber-200 bg-white p-4 shadow-md">
    <h3 className="text-lg font-black text-slate-900">Score</h3>
    <div className="mt-3 space-y-2">
      {players.map((player) => (
        <p key={player.color} className="flex items-center justify-between capitalize text-slate-700">
          <span>{player.color}</span>
          <span>{player.finishedCount}/4</span>
        </p>
      ))}
    </div>
  </section>
);
