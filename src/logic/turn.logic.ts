import { rollContainsSix, rollGrantsExtraTurn } from "./dice.logic";
import type { DiceMode } from "../types";

export const determineNextTurnState = (params: {
  rolledValues: number[];
  captureOccurred: boolean;
  consecutiveSixes: number;
  allPiecesInBase: boolean;
  hasValidMoves: boolean;
  mode: DiceMode;
}): {
  grantExtraTurn: boolean;
  forfeitTurn: boolean;
  skipTurn: boolean;
} => {
  const rolledSix = rollContainsSix(params.rolledValues);
  const forfeitTurn = params.consecutiveSixes >= 3;
  const skipTurn =
    !forfeitTurn &&
    (!params.hasValidMoves || (params.allPiecesInBase && !rolledSix));

  return {
    grantExtraTurn:
      !forfeitTurn &&
      !skipTurn &&
      (params.captureOccurred || rollGrantsExtraTurn(params.rolledValues, params.mode)),
    forfeitTurn,
    skipTurn,
  };
};
