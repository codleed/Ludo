import { Board } from "../board/Board";
import { DicePanel } from "../dice/DicePanel";
import { PlayerCard } from "../hud/PlayerCard";
import { ScoreTracker } from "../hud/ScoreTracker";
import { TurnIndicator } from "../hud/TurnIndicator";
import { useGameFlow } from "../../hooks/useGameFlow";

export default function GameScreen() {
  const { currentPlayer, endTurn, players } = useGameFlow();

  return (
    <main className="h-screen w-screen bg-slate-950 px-6 py-4">
      <section className="mx-auto grid h-full gap-3 lg:grid-cols-[180px_1fr_180px]">
        <aside className="space-y-2">
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
        <div className="flex items-center justify-center">
          <Board />
        </div>
        <aside className="space-y-2">
          <DicePanel />
          <button
            className="w-full rounded-2xl border border-slate-600 bg-slate-800 px-3 py-2 text-sm font-bold text-slate-200 transition-all hover:border-orange-500/50 hover:bg-slate-700"
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
