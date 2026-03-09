interface DiceRollerProps {
  onRoll: () => void;
}

export const DiceRoller = ({ onRoll }: DiceRollerProps) => (
  <button
    className="w-full rounded-2xl bg-slate-900 px-4 py-3 font-bold text-white"
    onClick={onRoll}
    type="button"
  >
    Roll dice
  </button>
);
