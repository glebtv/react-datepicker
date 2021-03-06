import nodeResolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import { list as babelHelpersList } from "babel-helpers";
import pkg from "./package.json";

import fs from "fs";
import path from "path";

var dateFnsDirs = fs
  .readdirSync(path.join(".", "node_modules", "date-fns"))
  .map(d => `date-fns/${d}`);

const config = {
  output: {
    format: process.env.BABEL_ENV
  },
  plugins: [
    nodeResolve({
      jsnext: true,
      extensions: [".js", ".jsx"]
    }),
    babel({
      exclude: "node_modules/**",
      plugins: ["external-helpers"],
      externalHelpersWhitelist: babelHelpersList.filter(
        helperName => helperName !== "asyncGenerator"
      )
    }),
    commonjs()
  ],
  external: Object.keys(pkg.dependencies)
    .concat(Object.keys(pkg.peerDependencies))
    .concat(dateFnsDirs)
};
export default config;
