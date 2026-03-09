import { describe, expect, it } from "vitest";
import type { Piece } from "../types";
import {
  getValidMovesForPiece,
  isInHomeLane,
  relativeToAbsolute,
  wouldOvershoot,
} from "./movement.logic";

const redBasePiece: Piece = {
  id: "red-0",
  player: "red",
  status: "base",
  position: null,
  isBlockading: false,
};

describe("relativeToAbsolute", () => {
  it("maps red relative 0 to absolute 0", () => {
    expect(relativeToAbsolute(0, "red")).toBe(0);
  });
});

describe("getValidMovesForPiece", () => {
  it("allows a base piece to enter only on a six", () => {
    expect(
      getValidMovesForPiece(redBasePiece, [6], [], [], "single"),
    ).toEqual([{ dieValue: 6, targetRelIndex: 0 }]);
  });

  it("allows a bonus base release after the normal six has been spent", () => {
    expect(
      getValidMovesForPiece(redBasePiece, [5], [], [], "single", 1),
    ).toEqual([{ dieValue: 0, targetRelIndex: 0 }]);
  });

  it("blocks base entry if an opponent blockade occupies the start square", () => {
    expect(
      getValidMovesForPiece(
        redBasePiece,
        [6],
        [],
        [{ owner: "blue", position: 0 }],
        "double",
      ),
    ).toEqual([]);
  });
});

describe("wouldOvershoot", () => {
  it("prevents movement past the final home cell", () => {
    expect(wouldOvershoot(55, 2)).toBe(true);
  });
});

describe("isInHomeLane", () => {
  it("returns true for relative positions 52 and above", () => {
    expect(isInHomeLane(52)).toBe(true);
  });
});
