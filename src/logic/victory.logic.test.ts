import { describe, expect, it } from "vitest";
import type { Player } from "../types";
import { getWinner } from "./victory.logic";

describe("getWinner", () => {
  it("returns the color when all four pieces are finished", () => {
    const players = [
      { color: "red", finishedCount: 4, pieces: [] },
      { color: "blue", finishedCount: 1, pieces: [] },
    ] as Player[];

    expect(getWinner(players)).toBe("red");
  });
});
