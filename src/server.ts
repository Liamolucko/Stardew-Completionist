import sirv from "sirv";
import polka from "polka";
import compression from "compression";
import * as sapper from "@sapper/server";
import * as cookie from "cookie";
import * as cborg from "cborg";
import * as base64 from "base64-js";
import save from "./save";

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";

polka() // You can also use Express
  .use(
    compression({ threshold: 0 }),
    sirv("static", { dev }),
    sapper.middleware({
      session(req) {
        // Since the save file is global, it's normally maintained across requests during SSR.
        // So we have to manually reset it to null to stop that.
        save.set(null);
        const cookies = req.headers.cookie === undefined
          ? null
          : cookie.parse(req.headers.cookie);
        return {
          lastSave: cookies && Object.fromEntries(
            Object.entries(cookies).map(
              ([key, value]) => [key, cborg.decode(base64.toByteArray(value))],
            ),
          ),
        };
      },
    }),
  )
  .listen(PORT, (err: unknown) => {
    if (err) console.log("error", err);
  });
