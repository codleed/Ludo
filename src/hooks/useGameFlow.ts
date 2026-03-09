import { useGameStore } from "../store";

export const useGameFlow = () => {
  const phase = useGameStore((state) => state.phase);
  const winner = useGameStore((state) => state.winner);
  const players = useGameStore((state) => state.players);
  const currentPlayerIndex = useGameStore((state) => state.currentPlayerIndex);
  const resetGame = useGameStore((state) => state.resetGame);
  const endTurn = useGameStore((state) => state.endTurn);

  return {
    phase,
    winner,
    players,
    currentPlayer: players[currentPlayerIndex] ?? players[0],
    resetGame,
    endTurn,
  };
};
