import { describe, expect, it } from "vitest";
import { createInitialPlayers } from "./game.constants";

describe("createInitialPlayers", () => {
  it("creates four players with four base pieces each", () => {
    const players = createInitialPlayers();

    expect(players).toHaveLength(4);
    expect(players[0]?.pieces).toHaveLength(4);
    expect(players[0]?.pieces[0]?.status).toBe("base");
    expect(players[0]?.pieces[0]?.position).toBeNull();
    expect(players[0]?.pieces[0]?.id).toBe("red-0");
  });
});
