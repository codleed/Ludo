import { describe, expect, it, vi } from "vitest";
import {
  createDiceRoll,
  getNextConsecutiveSixes,
  getUnusedDiceValues,
  qualifiesForFirstReleaseBonus,
  rollContainsSix,
} from "./dice.logic";

describe("createDiceRoll", () => {
  it("turns double ones into double sixes", () => {
    const random = vi.fn().mockReturnValueOnce(0).mockReturnValueOnce(0);

    expect(createDiceRoll("double", random)).toEqual([6, 6]);
  });
});

describe("getNextConsecutiveSixes", () => {
  it("resets the streak on a non-six single roll", () => {
    expect(getNextConsecutiveSixes([3], "single", 2)).toBe(0);
  });
});

describe("rollContainsSix", () => {
  it("reports when at least one die is a six", () => {
    expect(rollContainsSix([2, 6])).toBe(true);
  });
});

describe("qualifiesForFirstReleaseBonus", () => {
  it("qualifies when all pieces are in base and the roll contains a six", () => {
    expect(qualifiesForFirstReleaseBonus([6, 2], true, false)).toBe(true);
  });

  it("does not qualify once any piece has left base", () => {
    expect(qualifiesForFirstReleaseBonus([6], false, false)).toBe(false);
  });
});

describe("getUnusedDiceValues", () => {
  it("removes used values one at a time", () => {
    expect(getUnusedDiceValues([6, 6], [6])).toEqual([6]);
  });
});
