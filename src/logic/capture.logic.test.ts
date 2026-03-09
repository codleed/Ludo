import { describe, expect, it } from "vitest";
import type { Piece } from "../types";
import { resolveCaptureAtPosition } from "./capture.logic";

const pieces: Piece[] = [
  {
    id: "red-0",
    player: "red",
    status: "active",
    position: 5,
    isBlockading: false,
  },
  {
    id: "blue-0",
    player: "blue",
    status: "active",
    position: 44,
    isBlockading: false,
  },
];

describe("resolveCaptureAtPosition", () => {
  it("captures an opponent on a non-safe shared square", () => {
    const captured = resolveCaptureAtPosition(5, "red", pieces);

    expect(captured?.player).toBe("blue");
  });
});
