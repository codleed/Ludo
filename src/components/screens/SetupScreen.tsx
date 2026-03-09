import { useGameSetup } from "../../hooks/useGameSetup";

export default function SetupScreen() {
  const { mode, setMode, startGame } = useGameSetup();

  return (
    <main className="flex min-h-screen items-center justify-center bg-amber-50 p-6">
      <section className="w-full max-w-lg rounded-[2rem] border-4 border-amber-200 bg-white px-8 py-10 shadow-xl">
        <p className="text-center text-sm font-bold uppercase tracking-[0.3em] text-amber-700">
          Ludo
        </p>
        <h1 className="mt-4 text-center text-4xl font-black text-slate-900">
          Choose your dice mode
        </h1>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {(["single", "double"] as const).map((value) => (
            <button
              key={value}
              className={`rounded-2xl border-2 px-5 py-4 text-lg font-bold capitalize transition ${
                mode === value
                  ? "border-amber-500 bg-amber-100 text-amber-900"
                  : "border-amber-200 bg-white text-slate-700"
              }`}
              onClick={() => setMode(value)}
              type="button"
            >
              {value} dice
            </button>
          ))}
        </div>
        <button
          className="mt-8 w-full rounded-2xl bg-slate-900 px-5 py-4 text-lg font-bold text-white"
          onClick={startGame}
          type="button"
        >
          Start game
        </button>
      </section>
    </main>
  );
}
