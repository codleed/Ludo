import { useState } from "react";
import type { DiceMode } from "../types";
import { useGameStore } from "../store";

export const useGameSetup = () => {
  const initGame = useGameStore((state) => state.initGame);
  const [mode, setMode] = useState<DiceMode>("single");

  return {
    mode,
    setMode,
    startGame: () => initGame(mode),
  };
};
