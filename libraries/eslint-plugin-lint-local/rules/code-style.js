const {
  checkIsReactElementDeclaration,
  checkIsTestFile,
  checkIsTSXExtensionFile,
  reactHooksList,
} = require('../helpers');

module.exports = {
  'custom-max-lines-per-function': {
    create: context => {
      if (checkIsTestFile(context)) {
        return {}; // Для оптимизации, чтобы проверялись только React компоненты
      }

      const [
        { reactComponentMaxLines = 200, functionsMaxLines = 30 } = {
          functionsMaxLines: 30,
          reactComponentMaxLines: 200,
        },
      ] = context.options;

      const checkFunctionMaxLines = node => {
        const startFunctionLine = node?.body?.loc?.start?.line || node?.loc?.start?.line;
        const endFunctionLine = node?.body?.loc?.end?.line || node?.loc?.end?.line;
        const functionSize = endFunctionLine - startFunctionLine;

        if (checkIsReactElementDeclaration(node)) {
          return (
            functionSize > reactComponentMaxLines &&
            context.report({
              message: `The React elements must be no more than ${reactComponentMaxLines} lines`,
              node,
            })
          );
        }

        functionSize > functionsMaxLines &&
          context.report({
            message: `The function must be no more than ${functionsMaxLines} lines`,
            node,
          });
      };

      return {
        ArrowFunctionExpression: node => {
          const firstThreeSymbols = node?.parent?.id?.name?.slice(0, 3);

          firstThreeSymbols !== 'use' && checkFunctionMaxLines(node); // disable checking if this react hook
        },
        FunctionDeclaration: node => {
          checkFunctionMaxLines(node);
        },
        FunctionExpression: node => {
          checkFunctionMaxLines(node);
        },
      };
    },
  },

  'no-inline-callbacks': {
    create: context => {
      if (checkIsTestFile(context)) {
        return {};
      }

      const checkCalleeArguments = (node, calleeArguments) => {
        if (!calleeArguments) {
          return;
        }

        for (let i = 0; i <= calleeArguments.length; i += 1) {
          if (calleeArguments[i]?.type === 'ArrowFunctionExpression') {
            context.report({
              message: 'Only method identifier can be passed to arguments.',
              node,
            });

            break;
          }
        }
      };

      return {
        ExpressionStatement: node => {
          const calleeArguments = node.expression?.arguments;

          checkCalleeArguments(node, calleeArguments);
        },

        VariableDeclaration: node => {
          const calleeArguments = node.declarations?.[0]?.init?.arguments;

          checkCalleeArguments(node, calleeArguments);
        },
      };
    },
  },

  'no-statement-inside-statements': {
    create: context => ({
      ForStatement: node => {
        const statementBody = node.body.body;

        statementBody?.forEach(({ type }) => {
          if (type === 'ForStatement') {
            context.report({
              message: '"for" statement cannot be inside parent "for" statement',
              node,
            });
          }
        });
      },

      IfStatement: node => {
        const consequentBody = node.consequent?.body;

        consequentBody?.forEach(({ type }) => {
          if (type === 'IfStatement') {
            context.report({
              message: '"if" statement cannot be inside parent "if" statement',
              node,
            });
          }
        });
      },
    }),
  },
  'sort-methods': {
    create: context => {
      if (!checkIsTSXExtensionFile(context)) {
        return {}; // Для оптимизации, чтобы проверялись только React компоненты
      }

      const arrowFunctions = [];

      return {
        'Program:exit': () => {
          if (!arrowFunctions.length) {
            return;
          }

          const sortedMethodsName = [...arrowFunctions].sort(([prevFunctionName], [nextFunctionName]) => {
            const [prevFunctionFirstSymbol] = prevFunctionName;
            const [nextFunctionFirstSymbol] = nextFunctionName;

            if (prevFunctionFirstSymbol === nextFunctionFirstSymbol) {
              return 0;
            }

            return prevFunctionFirstSymbol > nextFunctionFirstSymbol ? 1 : -1;
          });

          const sourceCode = context.getSourceCode();
          const replacingCode = sortedMethodsName.map(([_, methodNode]) => sourceCode.getText(methodNode));

          arrowFunctions.forEach(([methodName, node], currentMethodIndex) => {
            const sortedFunctionNameIndex = sortedMethodsName.map(([name]) => name).indexOf(methodName);

            try {
              sortedFunctionNameIndex !== currentMethodIndex &&
                context.report({
                  fix: fixer =>
                    [...arrowFunctions].map(([, { range }], index) =>
                      fixer.replaceTextRange(range, replacingCode[index]),
                    ),
                  message: 'Methods must be sorted alphabetically.',
                  node,
                });
            } catch (error) {}
          });
        },

        VariableDeclaration: node => {
          const isHasInitType = node.declarations[0]?.init;

          if (checkIsReactElementDeclaration(node) || !isHasInitType) {
            return;
          }

          const { declarations } = node;

          const [arrowFunctionDeclaration] = declarations.filter(
            ({ init: { type } }) => type === 'ArrowFunctionExpression',
          );

          if (arrowFunctionDeclaration) {
            const {
              id: { name: functionName },
            } = arrowFunctionDeclaration;

            arrowFunctions.push([functionName, node]);
          }
        },
      };
    },
  },
  'spacing-control': {
    create: context => {
      if (!checkIsTSXExtensionFile(context)) {
        return {}; // Для оптимизации, чтобы проверялись только React компоненты
      }

      const hooksList = [];
      const requiredLinesAfter = [];

      const pushSpacingRequired = (node, requiringType) => {
        const nodeData = {
          node,
          requiringType,
        };

        requiredLinesAfter.push(nodeData);
      };

      const pushHooksSpacingControl = (node, declarationName, nextLineContent) => {
        const sourceCode = context.getSourceCode();
        const nextTokenRange = sourceCode.getTokenAfter(node).loc;
        const nextNodeIndex = sourceCode.getIndexFromLoc(nextTokenRange.start);
        const nextNode = sourceCode.getNodeByRangeIndex(nextNodeIndex);
        const { type: nextNodeType } = nextNode;
        const isVariableDeclaration =
          nextNodeType === 'VariableDeclaration' || nextNodeType === 'ArrowFunctionExpression';
        const nextNodeName = isVariableDeclaration ? nextNode.declarations[0].init?.callee?.name : nextNode.name;
        const isRequiredNextLine =
          declarationName !== nextNodeName && nextLineContent !== '' && reactHooksList?.includes(declarationName);

        hooksList.push({
          isRequiredWithoutEmptyLine: declarationName === nextNodeName && nextLineContent === '',
          node,
        });

        isRequiredNextLine &&
          context.report({
            message: 'New line after every hooks blocks is required.',
            node,
            // fix: (fixer) => {
            //   return fixer.insertTextAfter(node, '\n');
            // }
          });
      };

      return {
        ExpressionStatement: node => {
          const {
            expression: {
              callee: { name: expressionName } = {
                name: null,
              },
            },
            loc: {
              end: { line: endLine },
            },
          } = node || {
            expression: {
              callee: {
                name: null,
              },
            },
          };
          const isHook = expressionName?.slice(0, 3) === 'use';
          const nextLineContent = context.getSourceCode().lines[endLine].trim();

          isHook && pushHooksSpacingControl(node, expressionName, nextLineContent);
        },

        'Program:exit': () => {
          hooksList.map(({ node, isRequiredWithoutEmptyLine }, index) => {
            const nextHook = hooksList[index + 1];

            if (!nextHook) {
              return;
            }

            const nextHookStringify = context.getSourceCode().getText(nextHook.node);

            isRequiredWithoutEmptyLine &&
              context.report({
                message: 'Remove useless space between the same hooks',
                node,
                // fix: (fixer) => {
                //   console.log({ node, nextHookNode: nextHook.node, nextHookStringify });
                //   return [
                //     fixer.remove(nextHook.node),
                //     fixer.insertTextAfter(node, `\n${nextHookStringify}`)
                //   ];
                // }
              });
          });

          requiredLinesAfter.filter(({ node, requiringType }) => {
            context.report({
              fix: fixer =>
                requiringType === 'prevLine' ? fixer.insertTextBefore(node, '\n') : fixer.insertTextAfter(node, '\n'),
              message: 'Newline before and after every methods is required',
              node,
            });
          });
        },

        VariableDeclaration: node => {
          if (!node.declarations[0].init) {
            return;
          }

          const {
            declarations: [
              {
                init: {
                  callee: { name: declarationName } = {
                    name: null,
                  },
                },
              },
            ],
            loc: {
              end: { line: endLine },
            },
          } = node;

          const [
            {
              init: { type },
            },
          ] = node.declarations;
          const isArrowFunction = type === 'ArrowFunctionExpression';
          const isHook = declarationName?.slice(0, 3) === 'use';
          const nextLineContent = context.getSourceCode().lines[endLine]?.trim();

          if (isArrowFunction) {
            const prevToken = context.getTokenBefore(node);
            const prevLine = prevToken?.loc?.end?.line;
            const prevLineContent = context.getSourceCode().lines[prevLine]?.trim();
            const isAllowedOpenFunctionalBodyPuntuator = prevToken?.value !== '{' && prevToken?.value !== 'export';

            !!prevLineContent && isAllowedOpenFunctionalBodyPuntuator && pushSpacingRequired(node, 'prevLine');
            !!nextLineContent && pushSpacingRequired(node, 'nextLine');
          }

          isHook && pushHooksSpacingControl(node, declarationName, nextLineContent);
        },
      };
    },
  },
};
