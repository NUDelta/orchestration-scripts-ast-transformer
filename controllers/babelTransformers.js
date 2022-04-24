import babel from "@babel/core";
import * as t from "@babel/types";

import {
  objectIdentifiers,
  functionIdentifiers,
} from "../imports/orchestration-pl/identifierSet.js";

const addAsyncAwaitPlugin = function () {
  return {
    pre() {
      this.plObjIdentifiers = objectIdentifiers;
      this.plFnIdentifiers = functionIdentifiers;
    },
    visitor: {
      FunctionDeclaration(path) {
        path.node.async = true;
      },

      CallExpression(path) {
        // make any calls to OS functions async
        // check if the call is not already async before adding the await block
        if (!t.isAwaitExpression(path.parentPath.node)) {
          // get callee
          let callee = path.node.callee;
          let expressionName = "";

          // check if callee is a member expression or identifier
          if (t.isIdentifier(callee)) {
            expressionName = callee.name;
          } else if (t.isMemberExpression(callee)) {
            expressionName = callee.property.name;
          }

          if (this.plFnIdentifiers.has(expressionName)) {
            path.replaceWith(t.awaitExpression(path.node));
          }
        }
      },
    },
  };
};

const addThisPlugin = function () {
  return {
    pre() {
      this.plObjIdentifiers = objectIdentifiers;
      this.plFnIdentifiers = functionIdentifiers;
    },
    visitor: {
      MemberExpression(path) {
        // check if the child of the memebr expression is an identifier
        if (t.isIdentifier(path.node.object)) {
          // check if the identifier is not a local variable
          if (!path.scope.hasBinding(path.node.object.name)) {
            let variableName = path.node.object.name;
            if (this.plObjIdentifiers.has(variableName)) {
              // add this. to the OS PL function
              path.replaceWith(
                t.memberExpression(
                  t.memberExpression(t.thisExpression(), path.node.object),
                  path.node.property
                )
              );
            }
          }
        }
      },

      Identifier: {
        exit(path) {
          // on exit (after the node has been visted), check if identifier is a member
          if (!t.isMemberExpression(path.parentPath.node)) {
            // if not, add this. if it's a OS PL object
            if (this.plObjIdentifiers.has(path.node.name)) {
              path.replaceWith(t.memberExpression(t.thisExpression(), path.node));
            }
          }
        },
      },

      CallExpression(path) {
        // add this. to OS function calls
        if (t.isIdentifier(path.node.callee)) {
          // get callee
          let callee = path.node.callee;
          let expressionName = "";

          // check if callee is a member expression or identifier
          if (t.isIdentifier(callee)) {
            expressionName = callee.name;
          } else if (t.isMemberExpression(callee)) {
            expressionName = callee.property.name;
          }

          if (this.plFnIdentifiers.has(expressionName)) {
            // replace the path this.<expression>
            path.replaceWith(
              t.callExpression(
                t.memberExpression(t.thisExpression(), path.node.callee),
                path.node.arguments
              )
            );
          }
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
