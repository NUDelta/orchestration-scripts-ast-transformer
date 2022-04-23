import babel from "@babel/core";
import * as t from "@babel/types";

// babel configuration to add async/await and this
export const asyncThisTransformerConfig = {
  plugins: [
    function orchestrationScriptTransformer() {
      return {
        visitor: {
          FunctionDeclaration(path) {
            path.node.async = true;
          },

          VariableDeclaration(path) {
            // TODO: may also need to add a check for variables that are stored as objects in the PL
          },

          Identifier(path) {
            // don't work on the highest-level identifier
            // TODO: is there a more elegant way to do this? (maybe check parent?)
            if (path.node.name === "detector") {
              return;
            }

            // TODO: need to check if the expressions are anything in our library
            // add this keyword to member expression
            if (t.isCallExpression(path.parentPath.node)) {
              path.replaceWith(t.memberExpression(t.thisExpression(), path.node));
            }

            // skip children so we don't repeat
            path.skip();
          },

          CallExpression(path) {
            // TODO: need to check if the expressions are anything in our library
            // make any calls to OS functions async
            if (!t.isAwaitExpression(path.parentPath.node)) {
              path.replaceWith(t.awaitExpression(path.node));
            }
          },
        },
      };
    },
  ],

  // keep any white space so code stays pretty
  retainLines: true,
};

/**
 * Transforms input code based on the babel configuration passed in.
 * @param {string} code: block of code to tranform.
 * @param {object} config: babel configuration with plugins that is used to transform the code.
 */
export const transformOSCode = function (code, config) {
  let output = babel.transformSync(code, config);
  return output.code;
};
