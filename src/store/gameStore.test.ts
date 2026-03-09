import { afterEach, describe, expect, it, vi } from "vitest";
import { createInitialPlayers } from "../constants";
import { useGameStore } from "./gameStore";

afterEach(() => {
  useGameStore.getState().resetGame();
  vi.restoreAllMocks();
});

describe("game store", () => {
  it("initializes a single-dice game", () => {
    useGameStore.getState().initGame("single");

    const state = useGameStore.getState();

    expect(state.phase).toBe("playing");
    expect(state.dice.mode).toBe("single");
    expect(state.players).toHaveLength(4);
  });

  it("transforms double ones into double sixes", () => {
    vi.spyOn(Math, "random").mockReturnValueOnce(0).mockReturnValueOnce(0);
    useGameStore.getState().initGame("double");

    useGameStore.getState().rollDice();

    expect(useGameStore.getState().dice.values).toEqual([6, 6]);
  });

  it("keeps showing the last rolled values after an automatic skipped turn", () => {
    vi.spyOn(Math, "random").mockReturnValueOnce(0.3).mockReturnValueOnce(0.4);
    useGameStore.getState().initGame("double");

    useGameStore.getState().rollDice();

    const state = useGameStore.getState();

    expect(state.currentPlayerIndex).toBe(1);
    expect(state.dice.values).toEqual([]);
    expect(state.dice.lastValues).toEqual([2, 3]);
  });

  it("awards an extra release six to the first qualifying player in single mode", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.99);
    useGameStore.getState().initGame("single");

    useGameStore.getState().rollDice();

    const state = useGameStore.getState();

    expect(state.dice.values).toEqual([6]);
    expect(state.extraBaseReleases).toBe(1);
    expect(state.firstReleaseBonusOwner).toBe("red");
  });

  it("awards an extra release six in double mode without removing the other die", () => {
    vi.spyOn(Math, "random").mockReturnValueOnce(0.99).mockReturnValueOnce(0.2);
    useGameStore.getState().initGame("double");

    useGameStore.getState().rollDice();

    const state = useGameStore.getState();

    expect(state.dice.values).toEqual([6, 2]);
    expect(state.extraBaseReleases).toBe(1);
    expect(state.firstReleaseBonusOwner).toBe("red");
  });

  it("awards the first-release bonus only once per game", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.99);
    useGameStore.getState().initGame("single");

    useGameStore.getState().rollDice();
    useGameStore.getState().movePiece("red-0", 6);
    useGameStore.getState().endTurn();
    useGameStore.getState().rollDice();

    const state = useGameStore.getState();

    expect(state.currentPlayerIndex).toBe(1);
    expect(state.dice.values).toEqual([6]);
    expect(state.extraBaseReleases).toBe(0);
    expect(state.firstReleaseBonusOwner).toBe("red");
  });

  it("lets the player free a second base piece using the temporary bonus action", () => {
    useGameStore.setState((state) => ({
      ...state,
      phase: "playing",
      players: createInitialPlayers(),
      dice: {
        mode: "single",
        values: [6],
        lastValues: [6],
        usedValues: [6],
        isRolled: true,
        selectionPhase: "piece-select",
      },
      extraBaseReleases: 1,
      firstReleaseBonusOwner: "red",
    }));

    useGameStore.getState().movePiece("red-1", 0);

    const movedPiece = useGameStore
      .getState()
      .players[0]?.pieces.find((piece) => piece.id === "red-1");
    const state = useGameStore.getState();

    expect(movedPiece?.status).toBe("active");
    expect(movedPiece?.position).toBe(0);
    expect(state.extraBaseReleases).toBe(0);
    expect(state.currentPlayerIndex).toBe(0);
  });

  it("does not award the bonus after any piece has left base", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.99);
    useGameStore.setState((state) => ({
      ...state,
      phase: "playing",
      players: state.players.map((player, index) => ({
        ...player,
        pieces: player.pieces.map((piece, pieceIndex) =>
          index === 1 && pieceIndex === 0
            ? { ...piece, status: "active", position: 0 }
            : piece,
        ),
      })),
      dice: {
        mode: "single",
        values: [],
        lastValues: [],
        usedValues: [],
        isRolled: false,
        selectionPhase: "idle",
      },
    }));

    useGameStore.getState().rollDice();

    const state = useGameStore.getState();

    expect(state.dice.values).toEqual([6]);
    expect(state.extraBaseReleases).toBe(0);
    expect(state.firstReleaseBonusOwner).toBe(null);
  });

  it("moves a base piece onto the board when a six is available", () => {
    useGameStore.setState((state) => ({
      ...state,
      phase: "playing",
      players: createInitialPlayers(),
      dice: {
        mode: "single",
        values: [6],
        lastValues: [6],
        usedValues: [],
        isRolled: true,
        selectionPhase: "piece-select",
      },
    }));

    useGameStore.getState().movePiece("red-0", 6);

    const movedPiece = useGameStore
      .getState()
      .players[0]?.pieces.find((piece) => piece.id === "red-0");
    const state = useGameStore.getState();

    expect(movedPiece?.status).toBe("active");
    expect(movedPiece?.position).toBe(0);
    expect(state.currentPlayerIndex).toBe(0);
    expect(state.dice.usedValues).toEqual([]);
    expect(state.dice.isRolled).toBe(false);
  });

  it("does not keep the turn in double mode after using dice from a single-six roll", () => {
    useGameStore.setState((state) => ({
      ...state,
      phase: "playing",
      players: createInitialPlayers(),
      dice: {
        mode: "double",
        values: [6, 2],
        lastValues: [6, 2],
        usedValues: [],
        isRolled: true,
        selectionPhase: "piece-select",
      },
    }));

    useGameStore.getState().movePiece("red-0", 6);
    useGameStore.getState().movePiece("red-0", 2);

    const state = useGameStore.getState();

    expect(state.currentPlayerIndex).toBe(1);
    expect(state.dice.isRolled).toBe(false);
  });
});
