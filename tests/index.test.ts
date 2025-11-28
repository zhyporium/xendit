import { expect, test, describe } from "vitest";
import { Xendit } from "../src";

describe("Xendit", () => {
  test("should create a new Xendit instance", () => {
    const xendit = new Xendit("apiKey", "webhookSecret");

    expect(xendit).toBeInstanceOf(Xendit);
    expect(xendit.apiKey).toBe("apiKey");
  });
});
