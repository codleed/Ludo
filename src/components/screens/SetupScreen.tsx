import { useGameSetup } from "../../hooks/useGameSetup";

export default function SetupScreen() {
  const { mode, setMode, startGame } = useGameSetup();

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 p-6">
      <section className="w-full max-w-lg rounded-[2rem] border border-slate-700 bg-slate-900 px-8 py-10 shadow-2xl">
        <div className="absolute inset-0 rounded-[2rem] border-2 border-orange-500/30 pointer-events-none" style={{ margin: '-2px' }} />
        <p className="text-center text-sm font-bold uppercase tracking-[0.3em] text-orange-500">
          Ludo
        </p>
        <h1 className="mt-4 text-center text-4xl font-black text-slate-50">
          Choose your dice mode
        </h1>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {(["single", "double"] as const).map((value) => (
            <button
              key={value}
              className={`rounded-2xl border-2 px-5 py-4 text-lg font-bold capitalize transition-all ${
                mode === value
                  ? "border-orange-500 bg-orange-500/20 text-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.3)]"
                  : "border-slate-600 bg-slate-800 text-slate-300 hover:border-slate-500 hover:bg-slate-700"
              }`}
              onClick={() => setMode(value)}
              type="button"
            >
              {value} dice
            </button>
          ))}
        </div>
        <button
          className="mt-8 w-full rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 px-5 py-4 text-lg font-bold text-white shadow-lg transition-all hover:from-orange-400 hover:to-orange-500 hover:shadow-[0_0_30px_rgba(249,115,22,0.4)]"
          onClick={startGame}
          type="button"
        >
          Start game
        </button>
      </section>
    </main>
  );
}
