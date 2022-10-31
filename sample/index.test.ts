import { describe, it, expect } from "vitest";
import * as data from "./index";

describe("Fabricated data", () => {
  it("visits should match snapshot", () => {
    expect(data.sampleCSV).toMatchSnapshot();
  });
});
