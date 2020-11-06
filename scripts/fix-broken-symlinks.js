// PNPM is creating broken symlinks to non-installed dependencies (https://github.com/pnpm/pnpm/issues/2038#issuecomment-661505353)
// so I'm removing them manually here.

const fs = require("fs");
const path = require("path");
const del = require("del");

function fixSymlinks(dir) {
  for (const entry of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, entry);
    // This returns false for broken symlinks (on windows anyway)
    if (!fs.existsSync(fullPath)) {
      del(fullPath);
    } else if (entry.startsWith("@")) {
      fixSymlinks(fullPath);
    } else if (fs.existsSync(path.join(fullPath, "node_modules"))) {
      fixSymlinks(path.join(fullPath, "node_modules"));
    }
  }
}

// This is only a PNPM issue, don't bother for regular node_modules
if (fs.existsSync("./node_modules/.pnpm")) {
  process.stdout.write("fixing broken symlinks... ");
  fixSymlinks("./node_modules");
  fixSymlinks("./node_modules/.pnpm");
  process.stdout.write("done\n");
}
