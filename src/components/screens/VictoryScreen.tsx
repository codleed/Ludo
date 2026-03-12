import { useGameFlow } from "../../hooks/useGameFlow";
import { PLAYER_THEME } from "../../constants";

export default function VictoryScreen() {
  const { winner, resetGame } = useGameFlow();
  const winnerTheme = winner ? PLAYER_THEME[winner] : PLAYER_THEME.red;

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 p-6">
      <section className="w-full max-w-xl rounded-[2rem] border border-slate-700 bg-slate-900 px-8 py-10 text-center shadow-2xl">
        <div className="absolute inset-0 rounded-[2rem] border-2 border-orange-500/30 pointer-events-none" style={{ margin: '-2px' }} />
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-orange-500">
          Victory
        </p>
        <h1 className="mt-4 text-4xl font-black text-slate-50">
          <span className={winnerTheme.text}>{winner ?? "Red"}</span> wins!
        </h1>
        <button
          className="mt-8 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4 text-lg font-bold text-white shadow-lg transition-all hover:from-orange-400 hover:to-orange-500 hover:shadow-[0_0_30px_rgba(249,115,22,0.4)]"
          onClick={resetGame}
          type="button"
        >
          Play again
        </button>
      </section>
    </main>
  );
}
