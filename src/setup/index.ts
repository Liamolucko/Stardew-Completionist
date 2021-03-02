import * as cookie from "cookie";
import * as cborg from "cborg";
import * as base64 from "base64-js";
import save from "$components/save";

export function prepare(headers: Record<string, string>) {
  // Since the save file is global, it's normally maintained across requests during SSR.
  // So we have to manually reset it to null to stop that.
  save.set(null);
  const cookies = headers.cookie ? cookie.parse(headers.cookie) : null;
  return {
    // Context passed to getSession.
    context: {
      lastSave: cookies && Object.fromEntries(
        Object.entries(cookies).map(
          ([key, value]) => [key, cborg.decode(base64.toByteArray(value))],
        ),
      ),
    },
    // Response headers, probably?
    headers: {},
  };
}

export function getSession(context: unknown) {
  // Session passed to app.
  return context;
}
