import { useGameFlow } from "../../hooks/useGameFlow";

export default function VictoryScreen() {
  const { winner, resetGame } = useGameFlow();

  return (
    <main className="flex min-h-screen items-center justify-center bg-amber-50 p-6">
      <section className="w-full max-w-xl rounded-[2rem] border-4 border-amber-200 bg-white px-8 py-10 text-center shadow-xl">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-amber-700">
          Victory
        </p>
        <h1 className="mt-4 text-4xl font-black text-slate-900">
          {winner ?? "Red"} wins
        </h1>
        <button
          className="mt-8 rounded-2xl bg-slate-900 px-6 py-4 text-lg font-bold text-white"
          onClick={resetGame}
          type="button"
        >
          Play again
        </button>
      </section>
    </main>
  );
}
