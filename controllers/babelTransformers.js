import babel from "@babel/core";
import * as t from "@babel/types";

const addAsyncAwaitPlugin = function () {
  return {
    visitor: {
      FunctionDeclaration(path) {
        path.node.async = true;
      },

      CallExpression(path) {
        // TODO: need to check if the expressions are anything in our library
        // make any calls to OS functions async
        // check if the call is not already async before adding the await block
        if (!t.isAwaitExpression(path.parentPath.node)) {
          path.replaceWith(t.awaitExpression(path.node));
        }
      },
    },
  };
};

const addThisPlugin = function () {
  return {
    visitor: {
      MemberExpression(path) {
        // check if the child of the memebr expression is an identifier
        if (t.isIdentifier(path.node.object)) {
          // check if the identifier is not a local variable
          if (!path.scope.hasBinding(path.node.object.name)) {
            // TODO: need to check if the expressions are anything in our library
            // add this. to the OS member
            path.replaceWith(
              t.memberExpression(
                t.memberExpression(t.thisExpression(), path.node.object),
                path.node.property
              )
            );
          }
        }
      },

      CallExpression(path) {
        // TODO: need to check if the expressions are anything in our library
        // add this. to OS function calls
        if (t.isIdentifier(path.node.callee)) {
          // replace the path this.<expression>
          path.replaceWith(
            t.callExpression(
              t.memberExpression(t.thisExpression(), path.node.callee),
              path.node.arguments
            )
          );
        }
      },
    },
  };
};

export const asyncThisTransformerConfig = {
  plugins: [addAsyncAwaitPlugin, addThisPlugin],

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
