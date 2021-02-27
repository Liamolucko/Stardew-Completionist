module.exports = {
  hooks: {
    readPackage(pkg) {
      if (pkg.dependencies.snowpack) {
        pkg.dependencies.snowpack = "../snowpack/snowpack";
      }

      if (pkg.devDependencies.snowpack) {
        pkg.devDependencies.snowpack = "../snowpack/snowpack";
      }

      return pkg;
    },
  },
};
