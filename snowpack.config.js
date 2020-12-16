/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    "assets": "/",
    "src": "/dist",
  },
  plugins: [
    "@snowpack/plugin-svelte",
    "@snowpack/plugin-typescript",
  ],
  install: [
    /* ... */
  ],
  installOptions: {
    /* ... */
  },
  devOptions: {
    open: "none",
  },
  buildOptions: {
    baseUrl: "./",
  },
  proxy: {
    /* ... */
  },
  alias: {
    "imagescript": "./imagescript.js",
  },
  experiments: {
    optimize: {
      bundle: true,
    },
  },
};
