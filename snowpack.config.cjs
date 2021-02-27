/** @type {import("snowpack").SnowpackConfig} */
module.exports = {
  extends: "@sveltejs/snowpack-config",
  plugins: ["@snowpack/plugin-typescript"],
  mount: {
    "src/components": "/_components",
  },
  alias: {
    $components: "./src/components",
  },
  // packageOptions: {
  //   externalEsm: ["svelte-materialify"],
  // },
};
