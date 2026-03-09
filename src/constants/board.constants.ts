import type { PlayerColor } from "../types";

export const BOARD_DIMENSION = 15;
export const SHARED_TRACK_LENGTH = 52;
export const HOME_LANE_LENGTH = 5;
export const FINAL_RELATIVE_INDEX = SHARED_TRACK_LENGTH + HOME_LANE_LENGTH - 1;
export const PLAYER_PATH_LENGTH = SHARED_TRACK_LENGTH + HOME_LANE_LENGTH;

export const PLAYER_START_POSITIONS: Record<PlayerColor, number> = {
  red: 0,
  blue: 13,
  green: 26,
  yellow: 39,
};

export const HOME_LANE_ABSOLUTE_START: Record<PlayerColor, number> = {
  red: 52,
  blue: 57,
  green: 62,
  yellow: 67,
};

export const SAFE_SQUARES = [0, 8, 13, 21, 26, 34, 39, 47] as const;
export const BLOCKADE_ELIGIBLE_RELATIVE = [0, 50] as const;

const ROW_START_CLASSES = [
  "",
  "row-start-1",
  "row-start-2",
  "row-start-3",
  "row-start-4",
  "row-start-5",
  "row-start-6",
  "row-start-7",
  "row-start-8",
  "row-start-9",
  "row-start-10",
  "row-start-11",
  "row-start-12",
  "row-start-13",
  "row-start-14",
  "row-start-15",
] as const;

const COL_START_CLASSES = [
  "",
  "col-start-1",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
  "col-start-8",
  "col-start-9",
  "col-start-10",
  "col-start-11",
  "col-start-12",
  "col-start-13",
  "col-start-14",
  "col-start-15",
] as const;

const toGridClass = (row: number, col: number): string =>
  `${ROW_START_CLASSES[row]} ${COL_START_CLASSES[col]}`;

export interface GridPoint {
  row: number;
  col: number;
  className: string;
}

const createPoint = (row: number, col: number): GridPoint => ({
  row,
  col,
  className: toGridClass(row, col),
});

export const SHARED_TRACK_COORDINATES: GridPoint[] = [
  createPoint(7, 2),
  createPoint(7, 3),
  createPoint(7, 4),
  createPoint(7, 5),
  createPoint(7, 6),
  createPoint(6, 7),
  createPoint(5, 7),
  createPoint(4, 7),
  createPoint(3, 7),
  createPoint(2, 7),
  createPoint(1, 7),
  createPoint(1, 8),
  createPoint(1, 9),
  createPoint(2, 9),
  createPoint(3, 9),
  createPoint(4, 9),
  createPoint(5, 9),
  createPoint(6, 9),
  createPoint(7, 10),
  createPoint(7, 11),
  createPoint(7, 12),
  createPoint(7, 13),
  createPoint(7, 14),
  createPoint(7, 15),
  createPoint(8, 15),
  createPoint(9, 15),
  createPoint(9, 14),
  createPoint(9, 13),
  createPoint(9, 12),
  createPoint(9, 11),
  createPoint(9, 10),
  createPoint(10, 9),
  createPoint(11, 9),
  createPoint(12, 9),
  createPoint(13, 9),
  createPoint(14, 9),
  createPoint(15, 9),
  createPoint(15, 8),
  createPoint(15, 7),
  createPoint(14, 7),
  createPoint(13, 7),
  createPoint(12, 7),
  createPoint(11, 7),
  createPoint(10, 7),
  createPoint(9, 6),
  createPoint(9, 5),
  createPoint(9, 4),
  createPoint(9, 3),
  createPoint(9, 2),
  createPoint(9, 1),
  createPoint(8, 1),
  createPoint(7, 1),
];

export const HOME_LANE_COORDINATES: Record<PlayerColor, GridPoint[]> = {
  red: [1, 2, 3, 4, 5].map((offset) => createPoint(8, offset + 1)),
  blue: [1, 2, 3, 4, 5].map((row) => createPoint(row + 1, 8)),
  green: [1, 2, 3, 4, 5].map((offset) => createPoint(8, 15 - offset)),
  yellow: [1, 2, 3, 4, 5].map((row) => createPoint(15 - row, 8)),
};

export const BASE_SLOT_COORDINATES: Record<PlayerColor, GridPoint[]> = {
  red: [
    createPoint(3, 3),
    createPoint(3, 5),
    createPoint(5, 3),
    createPoint(5, 5),
  ],
  blue: [
    createPoint(3, 11),
    createPoint(3, 13),
    createPoint(5, 11),
    createPoint(5, 13),
  ],
  green: [
    createPoint(11, 3),
    createPoint(11, 5),
    createPoint(13, 3),
    createPoint(13, 5),
  ],
  yellow: [
    createPoint(11, 11),
    createPoint(11, 13),
    createPoint(13, 11),
    createPoint(13, 13),
  ],
};
