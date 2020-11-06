const { spawn } = require("child_process");
const del = require("del");

module.exports = {
  packagerConfig: {
    executableName: "stardew-completionist",
    icon: "static/favicon",
    afterCopy: [async (path, electronVersion, platform, arch, callback) => {
      // PNPM's structure gets ruined by copying, so reinstall with regular npm.
      await del(`${path}/node_modules`, { force: true });
      spawn(
        process.platform === "win32" ? "npm.cmd" : "npm",
        ["install", "--only=prod"],
        { cwd: path },
      ).on("exit", callback);
    }],
  },
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        name: "stardew_completionist",
        exe: "stardew-completionist.exe",
        iconUrl:
          "https://raw.githubusercontent.com/Liamolucko/Stardew-Completionist/master/static/favicon.ico",
        setupIcon: "static/favicon.ico",
      },
    },
    {
      name: "@electron-forge/maker-zip",
      platforms: [
        "darwin",
      ],
    },
    {
      name: "@electron-forge/maker-deb",
      config: {
        options: {
          maintainer: "Liamolucko <liampm32@gmail.com>",
        },
      },
    },
    {
      name: "@electron-forge/maker-rpm",
      config: {},
    },
  ],
};
