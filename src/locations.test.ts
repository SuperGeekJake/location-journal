import { describe, it, expect } from "vitest";
import * as data from "./locations";

describe("Fabricated data", () => {
  it("locations should match snapshot", () => {
    expect(data.locations).toMatchSnapshot();
  });

  it("visits should match snapshot", () => {
    expect(data.visits).toMatchSnapshot();
  });
});
