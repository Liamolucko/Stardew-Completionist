import * as sapper from "@sapper/server";
import compression from "compression";
import polka from "polka";
import sirv from "sirv";

const dev = process.env.NODE_ENV === "development";
process.env.PORT = process.env.PORT || "9619";

polka() // You can also use Express
  .use(
    compression({ threshold: 0 }),
    sirv("static", { dev }),
    sapper.middleware(),
  )
  .listen(process.env.PORT, (err) => {
    if (err) console.log("error", err);
  });
