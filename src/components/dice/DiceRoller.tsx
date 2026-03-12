interface DiceRollerProps {
  onRoll: () => void;
}

export const DiceRoller = ({ onRoll }: DiceRollerProps) => (
  <button
    className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-3 py-2.5 text-sm font-bold text-white shadow-lg transition-all hover:from-orange-400 hover:to-orange-500 hover:shadow-[0_0_20px_rgba(249,115,22,0.4)]"
    onClick={onRoll}
    type="button"
  >
    Roll dice
  </button>
);
