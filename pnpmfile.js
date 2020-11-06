"use strict";
module.exports = {
  hooks: { readPackage },
};

function readPackage(pkg) {
  if (pkg.dependencies["flora-colossus"]) {
    pkg.dependencies["flora-colossus"] = "Liamolucko/flora-colossus#built";
  }

  return pkg;
}
