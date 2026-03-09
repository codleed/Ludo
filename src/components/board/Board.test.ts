import { describe, expect, it } from "vitest";
import {
  getHighlightedHomeLaneTargets,
  getHighlightedTrackTargets,
  resolveTrackTargetRelIndex,
  shouldHandleTargetClick,
} from "./Board";

describe("board highlight helpers", () => {
  it("maps shared-track move targets using the current player's color", () => {
    expect(
      getHighlightedTrackTargets([{ dieValue: 6, targetRelIndex: 0 }], "green"),
    ).toEqual(new Set([26]));
    expect(
      getHighlightedTrackTargets([{ dieValue: 6, targetRelIndex: 0 }], "yellow"),
    ).toEqual(new Set([39]));
  });

  it("only highlights home-lane targets for the current player's lane", () => {
    expect(
      getHighlightedHomeLaneTargets([{ dieValue: 1, targetRelIndex: 52 }], "blue"),
    ).toEqual(new Set(["blue-52"]));
  });

  it("converts clicked shared-track cells back to player-relative targets", () => {
    expect(resolveTrackTargetRelIndex(26, "green")).toBe(0);
    expect(resolveTrackTargetRelIndex(39, "yellow")).toBe(0);
  });

  it("prioritizes moving to an occupied highlighted target over selecting the occupant", () => {
    expect(
      shouldHandleTargetClick("red-1", [{ dieValue: 6, targetRelIndex: 0 }], 0),
    ).toBe(true);
    expect(
      shouldHandleTargetClick("red-1", [{ dieValue: 6, targetRelIndex: 1 }], 0),
    ).toBe(false);
  });
});
