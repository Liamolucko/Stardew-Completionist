import * as cookie from "cookie";
import * as cborg from "cborg";
import * as base64 from "base64-js";
import save, { SaveInfo } from "$lib/save";
import type { Incoming } from "@sveltejs/kit";

type Context = { lastSave: SaveInfo };

export function getContext({ headers }: Incoming) {
  // Since the save file is global, it's normally maintained across requests during SSR.
  // So we have to manually reset it to null to stop that.
  save.set(null);
  const cookies = headers.cookie ? cookie.parse(headers.cookie) : null;
  return {
    lastSave: cookies && Object.fromEntries(
      Object.entries(cookies).map(
        ([key, value]) => [key, cborg.decode(base64.toByteArray(value))],
      ),
    ),
  };
}

export function getSession({ context }: { context: Context }): Context {
  return context;
}
