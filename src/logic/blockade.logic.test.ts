import { describe, expect, it } from "vitest";
import type { Piece } from "../types";
import {
  canFormBlockade,
  isBlockadedForPlayer,
  updateBlockadesAfterMove,
} from "./blockade.logic";

const movedPiece: Piece = {
  id: "red-0",
  player: "red",
  status: "active",
  position: 0,
  isBlockading: true,
};

describe("canFormBlockade", () => {
  it("allows blockade formation only on relative 0 or 50", () => {
    expect(
      canFormBlockade(movedPiece, 0, [
        { ...movedPiece, id: "red-1", isBlockading: false },
      ]),
    ).toBe(true);
    expect(
      canFormBlockade(movedPiece, 10, [
        { ...movedPiece, id: "red-1", position: 10, isBlockading: false },
      ]),
    ).toBe(false);
  });
});

describe("isBlockadedForPlayer", () => {
  it("blocks opponents but not the owner", () => {
    const blockades = [{ position: 13, owner: "blue" as const }];

    expect(isBlockadedForPlayer(13, "red", blockades)).toBe(true);
    expect(isBlockadedForPlayer(13, "blue", blockades)).toBe(false);
  });
});

describe("updateBlockadesAfterMove", () => {
  it("removes the old blockade and adds the new one when needed", () => {
    const blockades = updateBlockadesAfterMove(
      { ...movedPiece, position: 50 },
      0,
      [{ position: 0, owner: "red" }],
    );

    expect(blockades).toEqual([{ position: 50, owner: "red" }]);
  });
});
