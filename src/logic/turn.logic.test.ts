import { describe, expect, it } from "vitest";
import { determineNextTurnState } from "./turn.logic";

describe("determineNextTurnState", () => {
  it("forfeits the turn on three consecutive sixes", () => {
    expect(
      determineNextTurnState({
        rolledValues: [6],
        captureOccurred: false,
        consecutiveSixes: 3,
        allPiecesInBase: false,
        hasValidMoves: true,
        mode: "single",
      }).forfeitTurn,
    ).toBe(true);
  });

  it("skips the turn when no valid moves exist", () => {
    expect(
      determineNextTurnState({
        rolledValues: [2, 3],
        captureOccurred: false,
        consecutiveSixes: 0,
        allPiecesInBase: false,
        hasValidMoves: false,
        mode: "double",
      }).skipTurn,
    ).toBe(true);
  });

  it("does not grant an extra turn in double mode for a single six", () => {
    expect(
      determineNextTurnState({
        rolledValues: [6, 2],
        captureOccurred: false,
        consecutiveSixes: 0,
        allPiecesInBase: false,
        hasValidMoves: true,
        mode: "double",
      }).grantExtraTurn,
    ).toBe(false);
  });

  it("grants an extra turn in double mode only for double sixes", () => {
    expect(
      determineNextTurnState({
        rolledValues: [6, 6],
        captureOccurred: false,
        consecutiveSixes: 0,
        allPiecesInBase: false,
        hasValidMoves: true,
        mode: "double",
      }).grantExtraTurn,
    ).toBe(true);
  });
});
