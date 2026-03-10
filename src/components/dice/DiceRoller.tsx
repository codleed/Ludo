interface DiceRollerProps {
  onRoll: () => void;
}

export const DiceRoller = ({ onRoll }: DiceRollerProps) => (
  <button
    className="w-full rounded bg-slate-900 px-3 py-2 text-sm font-bold text-white"
    onClick={onRoll}
    type="button"
  >
    Roll dice
  </button>
);
