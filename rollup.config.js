import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import svelte from "rollup-plugin-svelte";
import { terser } from "rollup-plugin-terser";
import config from "sapper/config/rollup.js";
import sveltePreprocess from "svelte-preprocess";
import pkg from "./package.json";
import { existsSync as exists, readdirSync } from "fs";

const mode = process.env.NODE_ENV;
const dev = mode === "development";
const legacy = !!process.env.SAPPER_LEGACY_BUILD;

const onwarn = (warning, onwarn) =>
  (warning.code === "CIRCULAR_DEPENDENCY" &&
    /[/\\]@sapper[/\\]/.test(warning.message)) || onwarn(warning);

const svelte_onwarn = (warning, handler) => {
  if (warning.code === "css-unused-selector") {
    return;
  } else {
    handler(warning);
  }
};

const smuiSetup = postcss({
  extensions: [".scss", ".sass"],
  extract: false,
  minimize: true,
  use: {
    sass: {
      includePaths: [
        "./src/theme",
        ...(exists("./node_modules/.pnpm/@smui") &&
          readdirSync("./node_modules/.pnpm/@smui")
            .map((module) =>
              `./node_modules/.pnpm/@smui/${module}/node_modules`
            )),
        ...(exists("./node_modules/.pnpm/@material") &&
          readdirSync("./node_modules/.pnpm/@material")
            .filter((module) => module.split("@")[1].startsWith("3"))
            .map((module) =>
              `./node_modules/.pnpm/@material/${module}/node_modules`
            )),
        "./node_modules",
      ],
    },
  },
});

export default {
  client: {
    input: config.client.input().replace(/\.js$/, ".ts"),
    output: config.client.output(),
    plugins: [
      replace({
        "process.browser": true,
        "process.env.NODE_ENV": JSON.stringify(mode),
      }),
      svelte({
        preprocess: sveltePreprocess({
          typescript: {
            compilerOptions: {
              target: "es2017",
            },
          },
        }),
        dev,
        hydratable: true,
        emitCss: true,
        onwarn: svelte_onwarn,
      }),
      resolve({
        browser: true,
        dedupe: ["svelte"],
      }),
      commonjs(),
      typescript(),

      smuiSetup,

      legacy && babel({
        extensions: [".js", ".mjs", ".html", ".svelte"],
        babelHelpers: "runtime",
        exclude: ["node_modules/@babel/**"],
        presets: [
          ["@babel/preset-env", {
            targets: "> 0.25%, not dead",
          }],
        ],
        plugins: [
          "@babel/plugin-syntax-dynamic-import",
          ["@babel/plugin-transform-runtime", {
            useESModules: true,
          }],
        ],
      }),

      !dev && terser({
        module: true,
      }),
    ],

    preserveEntrySignatures: false,
    onwarn,
  },

  server: {
    input: { server: config.server.input().server.replace(/\.js$/, ".ts") },
    output: config.server.output(),
    plugins: [
      replace({
        "process.browser": false,
        "process.env.NODE_ENV": JSON.stringify(mode),
      }),
      svelte({
        preprocess: sveltePreprocess({
          typescript: {
            compilerOptions: {
              target: "es2017",
            },
          },
        }),
        generate: "ssr",
        dev,
        onwarn: svelte_onwarn,
      }),
      resolve({
        dedupe: ["svelte"],
      }),
      commonjs(),
      typescript(),

      smuiSetup,
    ],
    external: Object.keys(pkg.dependencies).concat(
      require("module").builtinModules ||
        Object.keys(process.binding("natives")),
    ),

    preserveEntrySignatures: "strict",
    onwarn,
	},
	
  ...!process.env.ELECTRON_BUILD && {
    serviceworker: {
      input: config.serviceworker.input().replace(/\.js$/, ".ts"),
      output: config.serviceworker.output(),
      plugins: [
        resolve(),
        replace({
          "process.browser": true,
          "process.env.NODE_ENV": JSON.stringify(mode),
        }),
        commonjs(),
        typescript(),
        !dev && terser(),
      ],

      preserveEntrySignatures: false,
      onwarn,
    },
  },
};
