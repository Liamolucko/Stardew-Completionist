const fs = require("fs-extra");
const { pathToFileURL } = require("url");

module.exports = {
  packagerConfig: {
    executableName: "stardew-completionist",
    icon: "www/favicon",

    ignore: [
      /^\/src/,
      /^\/.gitignore/,
      /^\/forge.config.js/,
      /^\/package-lock.json/,
      /^\/tsconfig.json/,
      /^\/yarn.lock/,
    ],
  },
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        exe: "stardew-completionist.exe",
        iconUrl: pathToFileURL("www/favicon.ico").toString(),
        setupIcon: "www/favicon.ico",
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
          icon: "./www/logo-512.png",
        },
      },
    },
    {
      name: "@electron-forge/maker-rpm",
      config: {},
    },
  ],
  hooks: {
    async generateAssets() {
      await fs.copy("../build", "./www");

      const pkg = await fs.readJson("./package.json");
      const rootPkg = await fs.readJson("../package.json");

      pkg.name = rootPkg.name;
      pkg.version = rootPkg.version;
      pkg.description = rootPkg.description;
      pkg.homepage = rootPkg.homepage;
      pkg.license = rootPkg.license;
      pkg.repository = rootPkg.repository;
      pkg.author = rootPkg.author;

      await fs.writeJson("./package.json", pkg, { spaces: 2 });
    },
  },
};
