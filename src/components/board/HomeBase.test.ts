import { describe, expect, it } from "vitest";
import { HOME_BASE_CLASSES } from "./HomeBase";

describe("HOME_BASE_CLASSES", () => {
  it("pins each base to an explicit quadrant", () => {
    expect(HOME_BASE_CLASSES.red).toContain("col-start-1");
    expect(HOME_BASE_CLASSES.red).toContain("row-start-1");
    expect(HOME_BASE_CLASSES.blue).toContain("col-start-10");
    expect(HOME_BASE_CLASSES.blue).toContain("row-start-1");
    expect(HOME_BASE_CLASSES.yellow).toContain("col-start-1");
    expect(HOME_BASE_CLASSES.yellow).toContain("row-start-10");
    expect(HOME_BASE_CLASSES.green).toContain("col-start-10");
    expect(HOME_BASE_CLASSES.green).toContain("row-start-10");
  });
});
