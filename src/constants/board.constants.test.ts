import { describe, expect, it } from "vitest";
import { HOME_LANE_COORDINATES } from "./board.constants";

describe("HOME_LANE_COORDINATES", () => {
  it("rotates lane colors anticlockwise around the center", () => {
    expect(HOME_LANE_COORDINATES.blue[0]).toMatchObject({ row: 2, col: 8 });
    expect(HOME_LANE_COORDINATES.blue[4]).toMatchObject({ row: 6, col: 8 });
    expect(HOME_LANE_COORDINATES.green[0]).toMatchObject({ row: 8, col: 14 });
    expect(HOME_LANE_COORDINATES.green[4]).toMatchObject({ row: 8, col: 10 });
    expect(HOME_LANE_COORDINATES.yellow[0]).toMatchObject({ row: 14, col: 8 });
    expect(HOME_LANE_COORDINATES.yellow[4]).toMatchObject({ row: 10, col: 8 });
    expect(HOME_LANE_COORDINATES.red[0]).toMatchObject({ row: 8, col: 2 });
    expect(HOME_LANE_COORDINATES.red[4]).toMatchObject({ row: 8, col: 6 });
  });
});
