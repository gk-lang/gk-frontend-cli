import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import babel from "@rollup/plugin-babel";
import replace from "@rollup/plugin-replace";
import hashbang from "rollup-plugin-hashbang";

const entries = ["./index.js"];

const plugins = [
  replace({
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    __buildDate__: () => JSON.stringify(new Date()),
    __buildVersion: 15,
  }),
  babel({
    babelrc: false,
    babelHelpers: "bundled",
    presets: [
      [
        "@babel/preset-env",
        {
          modules: false,
        },
      ],
    ],
  }),
  json(),
  hashbang.default(),
  commonjs(),
];

export default [
  ...entries.map((input) => ({
    input: input,
    output: [
      {
        file: `../../dist/cli/${input.replace(".js", ".mjs")}`,
        format: "esm",
      },
      {
        file: `../../dist/cli/${input.replace(".js", ".cjs")}`,
        format: "cjs",
      }
    ],
    external: [],
    plugins,
  })),
];
