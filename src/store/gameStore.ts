import { create } from "zustand";
import {
  createInitialDiceState,
  createInitialPlayers,
  INITIAL_PLAYER_INDEX,
  STARTING_CONSECUTIVE_SIXES,
} from "../constants";
import {
  canFormBlockade,
  createDiceRoll,
  determineNextTurnState,
  getNextConsecutiveSixes,
  getWinner,
  getUnusedDiceValues,
  getValidMovesForPiece,
  isBlockadedForPlayer,
  isThreeConsecutiveSixes,
  qualifiesForFirstReleaseBonus,
  relativeToAbsolute,
  resolveCaptureAtPosition,
  rollGrantsExtraTurn,
} from "../logic";
import type { DiceMode, GameState, Piece } from "../types";

interface MoveChoice {
  dieValue: number;
  targetRelIndex: number;
}

export interface GameStore extends GameState {
  initGame: (mode: DiceMode) => void;
  resetGame: () => void;
  rollDice: () => void;
  selectPiece: (pieceId: string) => void;
  movePiece: (pieceId: string, dieValue: number) => void;
  endTurn: () => void;
  getValidMovesForCurrentPiece: (pieceId: string) => MoveChoice[];
  isBlockadedForCurrentPlayer: (absPosition: number) => boolean;
}

const createInitialGameState = (mode: DiceMode = "single"): GameState => ({
  players: createInitialPlayers(),
  currentPlayerIndex: INITIAL_PLAYER_INDEX,
  dice: createInitialDiceState(mode),
  blockades: [],
  phase: "setup",
  winner: null,
  consecutiveSixes: STARTING_CONSECUTIVE_SIXES,
  firstReleaseBonusOwner: null,
  extraBaseReleases: 0,
});

const resetTurnDice = (mode: DiceMode, lastValues: number[]) => ({
  ...createInitialDiceState(mode),
  lastValues,
});

const getCurrentPlayer = (state: GameState) =>
  state.players[state.currentPlayerIndex];

const getAllPieces = (players: GameState["players"]): Piece[] =>
  players.flatMap((player) => player.pieces);

const getPlayerMoves = (state: GameState, piece: Piece): MoveChoice[] =>
  getValidMovesForPiece(
    piece,
    getUnusedDiceValues(state.dice.values, state.dice.usedValues),
    getAllPieces(state.players),
    state.dice.mode === "double" ? state.blockades : [],
    state.dice.mode,
    state.extraBaseReleases,
  );

const hasAnyValidMoves = (state: GameState): boolean =>
  getCurrentPlayer(state).pieces.some((piece) => getPlayerMoves(state, piece).length > 0);

const advanceTurnState = (state: GameState): GameState => ({
  ...state,
  currentPlayerIndex: (state.currentPlayerIndex + 1) % state.players.length,
  dice: resetTurnDice(state.dice.mode, state.dice.lastValues),
  consecutiveSixes: STARTING_CONSECUTIVE_SIXES,
  extraBaseReleases: 0,
});

const buildRolledState = (state: GameState, values: number[]): GameState => {
  const shouldAwardFirstReleaseBonus = qualifiesForFirstReleaseBonus(
    values,
    getAllPieces(state.players).every((piece) => piece.status === "base"),
    state.firstReleaseBonusOwner !== null,
  );
  const nextConsecutiveSixes = getNextConsecutiveSixes(
    values,
    state.dice.mode,
    state.consecutiveSixes,
  );
  const rolledState: GameState = {
    ...state,
    dice: {
      ...state.dice,
      values,
      lastValues: values,
      usedValues: [],
      isRolled: true,
      selectionPhase: state.dice.mode === "double" ? "die-select" : "piece-select",
    },
    consecutiveSixes: nextConsecutiveSixes,
    firstReleaseBonusOwner: shouldAwardFirstReleaseBonus
      ? getCurrentPlayer(state).color
      : state.firstReleaseBonusOwner,
    extraBaseReleases: shouldAwardFirstReleaseBonus ? 1 : 0,
  };
  const nextTurn = determineNextTurnState({
    rolledValues: values,
    captureOccurred: false,
    consecutiveSixes: nextConsecutiveSixes,
    allPiecesInBase: getCurrentPlayer(rolledState).pieces.every(
      (piece) => piece.status === "base",
    ),
    hasValidMoves: hasAnyValidMoves(rolledState),
    mode: state.dice.mode,
  });

  if (isThreeConsecutiveSixes(nextConsecutiveSixes) || nextTurn.forfeitTurn || nextTurn.skipTurn) {
    return advanceTurnState(rolledState);
  }

  return rolledState;
};

const replacePiece = (
  players: GameState["players"],
  pieceId: string,
  updater: (piece: Piece) => Piece,
): GameState["players"] =>
  players.map((player) => ({
    ...player,
    pieces: player.pieces.map((piece) => (piece.id === pieceId ? updater(piece) : piece)),
  }));

const syncBlockades = (
  players: GameState["players"],
  mode: DiceMode,
): Pick<GameState, "players" | "blockades"> => {
  if (mode === "single") {
    return {
      players: players.map((player) => ({
        ...player,
        pieces: player.pieces.map((piece) => ({ ...piece, isBlockading: false })),
      })),
      blockades: [],
    };
  }

  const blockades: GameState["blockades"] = [];
  const nextPlayers = players.map((player) => {
    const pieces = player.pieces.map((piece) => {
      const isBlockading =
        piece.status === "active" &&
        piece.position !== null &&
        canFormBlockade(piece, piece.position, player.pieces);

      if (isBlockading && piece.position !== null && piece.position < 52) {
        const position = relativeToAbsolute(piece.position, piece.player);

        if (!blockades.some((blockade) => blockade.position === position)) {
          blockades.push({ position, owner: piece.player });
        }
      }

      return { ...piece, isBlockading };
    });

    return { ...player, pieces };
  });

  return { players: nextPlayers, blockades };
};

const applyCapture = (
  players: GameState["players"],
  movedPiece: Piece,
): { captureOccurred: boolean; players: GameState["players"] } => {
  if (movedPiece.position === null || movedPiece.position >= 52) {
    return { captureOccurred: false, players };
  }

  const capturedPiece = resolveCaptureAtPosition(
    relativeToAbsolute(movedPiece.position, movedPiece.player),
    movedPiece.player,
    players.flatMap((player) => player.pieces),
  );

  if (!capturedPiece) {
    return { captureOccurred: false, players };
  }

  return {
    captureOccurred: true,
    players: replacePiece(players, capturedPiece.id, (piece) => ({
      ...piece,
      status: "base",
      position: null,
      isBlockading: false,
    })),
  };
};

const finalizeMoveState = (
  state: GameState,
  players: GameState["players"],
  dieValue: number,
  captureOccurred: boolean,
): GameState => {
  const synced = syncBlockades(players, state.dice.mode);
  const usedValues =
    dieValue === 0 ? state.dice.usedValues : [...state.dice.usedValues, dieValue];
  const nextState: GameState = {
    ...state,
    players: synced.players,
    blockades: synced.blockades,
    extraBaseReleases:
      dieValue === 0 ? Math.max(state.extraBaseReleases - 1, 0) : state.extraBaseReleases,
    dice: {
      ...state.dice,
      usedValues,
      selectionPhase: "piece-select",
    },
  };
  const winner = getWinner(nextState.players);
  const unusedValues = getUnusedDiceValues(
    nextState.dice.values,
    nextState.dice.usedValues,
  );
  const hasMoreActions =
    nextState.extraBaseReleases > 0 ||
    (nextState.dice.mode === "double" && unusedValues.length > 0);
  const hasMoreMoves = hasMoreActions && hasAnyValidMoves(nextState);

  if (winner) {
    return { ...nextState, phase: "finished", winner };
  }

  if (hasMoreMoves) {
    return nextState;
  }

  if (captureOccurred || rollGrantsExtraTurn(nextState.dice.values, nextState.dice.mode)) {
    return {
      ...nextState,
      dice: resetTurnDice(nextState.dice.mode, nextState.dice.lastValues),
      extraBaseReleases: 0,
    };
  }

  return advanceTurnState(nextState);
};

export const useGameStore = create<GameStore>((set, get) => ({
  ...createInitialGameState(),
  initGame: (mode) =>
    set({
      ...createInitialGameState(mode),
      phase: "playing",
      dice: createInitialDiceState(mode),
    }),
  resetGame: () => set(createInitialGameState()),
  rollDice: () => set((state) => buildRolledState(state, createDiceRoll(state.dice.mode))),
  selectPiece: (_pieceId) =>
    set((state) => ({
      ...state,
      dice: { ...state.dice, selectionPhase: "piece-select" },
    })),
  movePiece: (pieceId, dieValue) =>
    set((state) => {
      const currentPlayer = getCurrentPlayer(state);
      const piece = currentPlayer.pieces.find((candidate) => candidate.id === pieceId);

      if (!piece) {
        return state;
      }

      const move = getPlayerMoves(state, piece).find(
        (candidate) => candidate.dieValue === dieValue,
      );

      if (!move) {
        return state;
      }

      const updatedPlayers = state.players.map((player) => {
        if (player.color !== currentPlayer.color) {
          return player;
        }

        const pieces = player.pieces.map((candidate) => {
          if (candidate.id !== pieceId) {
            return candidate;
          }

          const isFinished = move.targetRelIndex === 56;
          const status: Piece["status"] = isFinished ? "finished" : "active";
          return {
            ...candidate,
            status,
            position: move.targetRelIndex,
            isBlockading: false,
          };
        });

        return {
          ...player,
          finishedCount: pieces.filter((candidate) => candidate.status === "finished").length,
          pieces,
        };
      });
      const movedPiece =
        updatedPlayers[state.currentPlayerIndex]?.pieces.find(
          (candidate) => candidate.id === pieceId,
        ) ?? piece;
      const captureResult = applyCapture(updatedPlayers, movedPiece);

      return finalizeMoveState(
        state,
        captureResult.players,
        dieValue,
        captureResult.captureOccurred,
      );
    }),
  endTurn: () => set((state) => advanceTurnState(state)),
  getValidMovesForCurrentPiece: (pieceId) => {
    const state = get();
    const piece = getCurrentPlayer(state).pieces.find((candidate) => candidate.id === pieceId);

    return piece ? getPlayerMoves(state, piece) : [];
  },
  isBlockadedForCurrentPlayer: (absPosition) => {
    const state = get();
    const playerColor = getCurrentPlayer(state).color;

    return isBlockadedForPlayer(absPosition, playerColor, state.blockades);
  },
}));
