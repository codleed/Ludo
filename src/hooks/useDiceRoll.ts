import { useGameStore } from "../store";

export const useDiceRoll = () => {
  const dice = useGameStore((state) => state.dice);
  const rollDice = useGameStore((state) => state.rollDice);

  return { dice, rollDice };
};
