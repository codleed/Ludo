import { useState } from "react";
import { useDiceRoll } from "../../hooks/useDiceRoll";
import type { DiceMode } from "../../types";
import { DiceRoller } from "./DiceRoller";
import { Die } from "./Die";

interface DisplayDieSlot {
  value: number;
  dimmed: boolean;
}

const getPlaceholderSlots = (mode: DiceMode): DisplayDieSlot[] =>
  (mode === "double" ? [1, 1] : [1]).map((value) => ({
    value,
    dimmed: false,
  }));

export const getDisplayedDiceSlots = (
  mode: DiceMode,
  values: number[],
  usedValues: number[],
  lastValues: number[],
): DisplayDieSlot[] => {
  const valuesToDisplay = values.length > 0 ? values : lastValues;

  if (valuesToDisplay.length === 0) {
    return getPlaceholderSlots(mode);
  }

  const remainingUsed = [...usedValues];
  return valuesToDisplay.map((value) => {
    const usedIndex = remainingUsed.indexOf(value);
    const dimmed = usedIndex !== -1;

    if (dimmed) {
      remainingUsed.splice(usedIndex, 1);
    }

    return { value, dimmed };
  });
};

export const DicePanel = () => {
  const { dice, rollDice } = useDiceRoll();
  const [rolling, setRolling] = useState(false);

  const handleRoll = () => {
    setRolling(true);
    window.setTimeout(() => {
      rollDice();
      setRolling(false);
    }, 500);
  };

  return (
    <section className="space-y-2 rounded border-4 border-amber-200 bg-slate-700 p-4 shadow-lg">
      <h2 className="text-lg font-black text-slate-900">Dice</h2>
      <div className="flex gap-2">
        {getDisplayedDiceSlots(
          dice.mode,
          dice.values,
          dice.usedValues,
          dice.lastValues,
        ).map(({ value, dimmed }, index) => (
          <Die
            key={`${value}-${index}`}
            dimmed={dimmed}
            rolling={rolling}
            value={value}
          />
        ))}
      </div>
      <DiceRoller onRoll={handleRoll} />
    </section>
  );
};
