module.exports = {
  hooks: {
    readPackage(pkg) {
      if (pkg.dependencies.snowpack) {
        pkg.dependencies.snowpack = "../snowpack/snowpack";
      }

      if (pkg.dependencies["@snowpack/plugin-svelte"]) {
        pkg.dependencies["@snowpack/plugin-svelte"] = "next";
      }

      return pkg;
    },
  },
};
