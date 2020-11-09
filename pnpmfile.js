const fs = require("fs");
const path = require("path");

module.exports = {
  hooks: { afterAllResolved },
};

/**
 * Checks if a package is contained within some dependencies.
 * @param {Record<string, string>} deps The dependencies to search
 * @param {{key: string, version: string}} pkg The package to check for
 */
function includesDep(deps, pkg) {
  return Object.entries(deps)
    .some((dep) => dep.key === pkg.key && dep.version === pkg.version);
}

function afterAllResolved(lockfile, context) {
  const packages = Object.entries(lockfile.packages).map(([path, pkg]) => {
    const [key, version] = path.split(/\/(?=[^/]*$)/);
    return { ...pkg, key: key.slice(1), version };
  });

  const toRemove = packages.filter((pkg) =>
    pkg.os && !pkg.os.includes(process.platform) ||
    pkg.cpu && !pkg.cpu.includes(process.arch)
  );

  // It needs to run after the packages have actually been _installed_, so set it to run before exit.
  process.once("beforeExit", async () => {
    console.log(
      `\n[pnpmfile] Removing platform-specific dependencies (pnpm/pnpm#2038):\n- ${
        toRemove.map((pkg) => `${pkg.key}@${pkg.version}`).join("\n- ")
      }`,
    );
  
    for (const pkg of toRemove) {
      if (
        includesDep(lockfile.importers["."].dependencies, pkg) ||
        includesDep(lockfile.importers["."].devDependencies, pkg)
      ) {
        fs.promises.unlink(
          path.join("./node_modules", `${pkg.key}@${pkg.version}`),
        );
      } else {
        fs.promises.unlink(
          path.join("./node_modules/.pnpm/node_modules", `${pkg.key}`),
        );
      }
  
      for (
        const newPkg of packages.filter((newPkg) =>
          newPkg.dependencies &&
          includesDep(newPkg.dependencies, pkg)
        )
      ) {
        fs.promises.unlink(
          path.join(
            "./node_modules/.pnpm",
            `${newPkg.key}@${newPkg.version}/node_modules/${pkg.key}`,
          ),
        );
      }
    }
  })

  return lockfile;
}
