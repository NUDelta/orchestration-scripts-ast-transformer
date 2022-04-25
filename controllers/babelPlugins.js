import babel from "@babel/core";
import * as t from "@babel/types";

import {
  objectIdentifiers,
  functionIdentifiers,
} from "../imports/orchestration-pl/identifierSet.js";

export const addAsyncAwaitPlugin = function () {
  return {
    pre() {
      this.plObjIdentifiers = objectIdentifiers;
      this.plFnIdentifiers = functionIdentifiers;
    },
    visitor: {
      FunctionDeclaration(path) {
        path.node.async = true;
      },

      FunctionExpression(path) {
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

export const addThisPlugin = function () {
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
            let identifierString = path.node.object.name;

            // check if either a variable from OS
            if (this.plObjIdentifiers.has(identifierString)) {
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
            // add "this" keyword if it's a OS PL object or fn (usually a predicate)
            if (
              this.plObjIdentifiers.has(path.node.name) ||
              this.plFnIdentifiers.has(path.node.name)
            ) {
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

export const convertHumanCodeToOSCodePlugin = function () {
  return {
    pre() {
      // TODO: need to add placeholders for at() and repeat()
      this.outputScript = t.objectExpression([]);
    },
    visitor: {
      FunctionDeclaration: {
        exit(path) {
          path.get("body").replaceWith(t.blockStatement([t.returnStatement(this.outputScript)]));
        },
      },
      CallExpression(path) {
        // get identifier for call expression
        let callee = path.node.callee;
        let expressionName = "";
        if (t.isIdentifier(callee)) {
          expressionName = callee.name;
        } else if (t.isMemberExpression(callee)) {
          expressionName = callee.property.name;
        }

        // specify replacement identifiers for functions
        let replacementIdenfier = "";
        switch (expressionName) {
          case "applyTo":
            replacementIdenfier = "applicableSet";
            break;

          case "when":
            replacementIdenfier = "detector";
            break;

          case "then":
            replacementIdenfier = "feedback";
            break;

          case "at":
            replacementIdenfier = "feedbackOpportunity";
            break;

          case "shouldRepeat":
            replacementIdenfier = "repeatStrategy";
            break;
        }

        let identifierObject = t.identifier(replacementIdenfier);

        // add function to outputScript object
        this.outputScript.properties.push(
          t.objectProperty(
            identifierObject,
            t.functionExpression(
              t.identifier(""),
              [],
              t.blockStatement([t.returnStatement(path.node.arguments[0])])
            )
          )
        );

        // get only the top-level paths
        path.skip();
      },
    },
  };
};
