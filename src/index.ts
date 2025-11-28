import { REST } from "@zhyporium/rest";
import { createHmac, timingSafeEqual } from "crypto";
import type { XenditAPI } from "./types";

export class Xendit extends REST<XenditAPI.Routes> {
  public constructor(apiKey: string, private readonly webhookSecret: string) {
    super("https://api.xendit.co", {
      "Content-Type": "application/json", // everything is JSON
      Authorization: `Basic ${Buffer.from(`${apiKey}:`).toString("base64")}`, // basic auth
    });
  }

  public verifyWebhookSignature(body: Buffer, signature: string): boolean {
    // 1. Compute expected HMAC as raw buffer (NOT hex string)
    const expected = createHmac("sha256", this.webhookSecret)
      .update(body)
      .digest(); // Buffer

    // 2. Decode provided signature — if invalid, normalize timing
    let provided: Buffer;

    try {
      provided = Buffer.from(signature, "hex");
    } catch {
      // normalize timing to avoid leaking invalid hex vs wrong signature
      timingSafeEqual(expected, expected);

      return false;
    }

    // 3. Length mismatch handling — must normalize timing
    if (provided.length !== expected.length) {
      timingSafeEqual(expected, expected); // normalize timing

      return false;
    }

    // 4. Constant-time comparison
    return timingSafeEqual(provided, expected);
  }
}
