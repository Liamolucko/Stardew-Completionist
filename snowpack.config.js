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
  devOptions: {
    open: "none",
  },
  buildOptions: {
    baseUrl: "./",
    sourcemap: true,
  },
  optimize: {
    bundle: true,
    minify: true,
    treeshake: true,
    target: "es2018",
  },
};
