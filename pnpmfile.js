const fs = require("fs").promises;
const path = require("path");

/**
 * Checks if a package is contained within some dependencies.
 * @param {Record<string, string>} deps The dependencies to search
 * @param {{key: string, version: string}} pkg The package to check for
 */
function includesDep(deps, pkg) {
  return Object.entries(deps)
    .some((dep) => dep.key === pkg.key && dep.version === pkg.version);
}

// Don't actually run this as a hook, because those aren't called when nothing is changed, but the broken symlinks are still created.
process.once("beforeExit", async () => {
  // Don't require js-yaml until PNPM has actually installed it.
  const yaml = require("js-yaml");

  const lockfile = yaml.safeLoad(
    await fs.readFile("./pnpm-lock.yaml", "utf-8"),
  );

  const packages = Object.entries(lockfile.packages).map(([path, pkg]) => {
    const [key, version] = path.split(/\/(?=[^/]*$)/);
    return { ...pkg, key: key.slice(1), version };
  });

  const toRemove = packages.filter((pkg) =>
    pkg.optional && (pkg.os && !pkg.os.includes(process.platform) ||
      pkg.cpu && !pkg.cpu.includes(process.arch))
  );

  for (const pkg of toRemove) {
    for (
      const [key, version] of [
        ...Object.entries(pkg.dependencies ?? {}),
        ...Object.entries(pkg.devDependencies ?? {}),
      ]
    ) {
      const pkg = packages.find((pkg) =>
        pkg.key === key && pkg.version === version
      );
      if (pkg?.optional && !toRemove.includes(pkg)) {
        toRemove.push(pkg);
      }
    }
  }

  console.log(
    `\n[pnpmfile] Removing platform-specific dependencies (pnpm/pnpm#2038):\n- ${
      toRemove.map((pkg) => `${pkg.key}@${pkg.version}`).join("\n- ")
    }`,
  );

  for (const pkg of toRemove) {
    if (
      includesDep(lockfile.dependencies ?? {}, pkg) ||
      includesDep(lockfile.devDependencies ?? {}, pkg)
    ) {
      fs.unlink(
        path.join("./node_modules", `${pkg.key}@${pkg.version}`),
      );
    } else {
      // It might have already been removed in an earlier pass
      fs.unlink(
        path.join("./node_modules/.pnpm/node_modules", `${pkg.key}`),
      ).catch(() => {});
    }

    for (
      const newPkg of packages.filter((newPkg) =>
        newPkg.dependencies &&
        includesDep(newPkg.dependencies, pkg)
      )
    ) {
      fs.unlink(
        path.join(
          "./node_modules/.pnpm",
          `${newPkg.key}@${newPkg.version}/node_modules/${pkg.key}`,
        ),
      );
    }
  }
});
