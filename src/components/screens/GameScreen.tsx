import { Board } from "../board/Board";
import { DicePanel } from "../dice/DicePanel";
import { PlayerCard } from "../hud/PlayerCard";
import { ScoreTracker } from "../hud/ScoreTracker";
import { TurnIndicator } from "../hud/TurnIndicator";
import { useGameFlow } from "../../hooks/useGameFlow";

export default function GameScreen() {
  const { currentPlayer, endTurn, players } = useGameFlow();

  return (
    <main className="min-h-screen bg-amber-50 p-6">
      <section className="mx-auto grid max-w-7xl gap-6 xl:grid-cols-[280px_1fr_280px]">
        <aside className="space-y-4">
          <TurnIndicator color={currentPlayer?.color ?? "red"} />
          <ScoreTracker players={players} />
          {players.map((player) => (
            <PlayerCard
              key={player.color}
              isActive={player.color === currentPlayer?.color}
              player={player}
            />
          ))}
        </aside>
        <div className="flex justify-center">
          <Board />
        </div>
        <aside className="space-y-4">
          <DicePanel />
          <button
            className="w-full rounded-2xl border-2 border-slate-300 bg-white px-4 py-3 font-bold text-slate-700"
            onClick={endTurn}
            type="button"
          >
            End turn
          </button>
        </aside>
      </section>
    </main>
  );
}
