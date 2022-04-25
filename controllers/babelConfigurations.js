import babel from "@babel/core";
import {
  addAsyncAwaitPlugin,
  addThisPlugin,
  convertHumanCodeToOSCodePlugin,
} from "./babelPlugins.js";

/**
 * Transforms input code based on the babel configuration passed in.
 * @param {string} code: block of code to tranform.
 * @param {object} config: babel configuration with plugins that is used to transform the code.
 */
export const transformOSCode = function (code, config) {
  let output = babel.transformSync(code, config);
  return output.code;
};

/**
 * Babel configuration that adds async/await flags, and this keywords to OS code.
 */
export const asyncThisConfig = {
  plugins: [addAsyncAwaitPlugin, addThisPlugin],

  // keep any white space so code stays pretty
  retainLines: true,
};

export const humanToOsConfig = {
  plugins: [convertHumanCodeToOSCodePlugin],

  // keep any white space so code stays pretty
  retainLines: true,
};
