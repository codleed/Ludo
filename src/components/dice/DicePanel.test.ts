import { describe, expect, it } from "vitest";
import { getDisplayedDiceSlots } from "./DicePanel";

describe("getDisplayedDiceSlots", () => {
  it("shows two placeholder dice in double mode before or after a roll", () => {
    expect(getDisplayedDiceSlots("double", [], [], [])).toEqual([
      { value: 1, dimmed: false },
      { value: 1, dimmed: false },
    ]);
  });

  it("shows one placeholder die in single mode", () => {
    expect(getDisplayedDiceSlots("single", [], [], [])).toEqual([
      { value: 1, dimmed: false },
    ]);
  });

  it("preserves rolled values", () => {
    expect(getDisplayedDiceSlots("double", [6, 2], [], [])).toEqual([
      { value: 6, dimmed: false },
      { value: 2, dimmed: false },
    ]);
  });

  it("shows the last rolled values after the turn auto-advances", () => {
    expect(getDisplayedDiceSlots("double", [], [], [6, 6])).toEqual([
      { value: 6, dimmed: false },
      { value: 6, dimmed: false },
    ]);
  });

  it("dims duplicate dice one use at a time", () => {
    expect(getDisplayedDiceSlots("double", [6, 6], [6], [])).toEqual([
      { value: 6, dimmed: true },
      { value: 6, dimmed: false },
    ]);
    expect(getDisplayedDiceSlots("double", [6, 6], [6, 6], [])).toEqual([
      { value: 6, dimmed: true },
      { value: 6, dimmed: true },
    ]);
  });
});
