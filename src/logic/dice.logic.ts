import { DICE_FACES } from "../constants";
import type { DiceMode } from "../types";

export const createDiceRoll = (
  mode: DiceMode,
  random: () => number = Math.random,
): number[] => {
  const rollDie = () => Math.floor(random() * DICE_FACES) + 1;

  if (mode === "single") {
    return [rollDie()];
  }

  const values = [rollDie(), rollDie()];
  return values[0] === 1 && values[1] === 1 ? [6, 6] : values;
};

export const rollContainsSix = (values: number[]): boolean =>
  values.some((value) => value === 6);

export const qualifiesForFirstReleaseBonus = (
  values: number[],
  allPiecesInBase: boolean,
  hasBonusOwner: boolean,
): boolean => !hasBonusOwner && allPiecesInBase && rollContainsSix(values);

export const rollGrantsExtraTurn = (
  values: number[],
  mode: DiceMode,
): boolean => {
  if (mode === "single") {
    return values[0] === 6;
  }

  return values.length === 2 && values.every((value) => value === 6);
};

export const getNextConsecutiveSixes = (
  values: number[],
  mode: DiceMode,
  currentCount: number,
): number => {
  if (mode === "single") {
    return values[0] === 6 ? currentCount + 1 : 0;
  }

  return rollContainsSix(values) ? currentCount + 1 : 0;
};

export const isThreeConsecutiveSixes = (count: number): boolean => count >= 3;

export const getUnusedDiceValues = (
  values: number[],
  usedValues: number[],
): number[] => {
  const remainingUsedValues = [...usedValues];

  return values.filter((value) => {
    const usedIndex = remainingUsedValues.indexOf(value);

    if (usedIndex === -1) {
      return true;
    }

    remainingUsedValues.splice(usedIndex, 1);
    return false;
  });
};
