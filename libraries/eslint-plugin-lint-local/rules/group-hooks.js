const { checkIsReactElementDeclaration, checkIsTSXExtensionFile, reactHooksList } = require('../helpers');

module.exports = {
  'group-hooks': {
    create: context => {
      if (!checkIsTSXExtensionFile(context)) {
        return {}; // Для оптимизации, чтобы проверялись только React компоненты
      }

      const defaultHookSorting = ['useRef', 'useState', 'methods', 'useMemo', 'useContext', 'useEffect', 'customHooks'];
      const [{ groups }] = context.options.includes('groups')
        ? context.options
        : [
            {
              groups: defaultHookSorting,
            },
          ];
      const orderHooks = [];

      const pushHookOrderElement = (calleeName, node) => {
        if (!calleeName) {
          return;
        }

        orderHooks.push([calleeName, node]);
      };

      return {
        // This method is required when we is works with useEffect, because its non variable declaration node type
        ExpressionStatement: node => {
          const {
            expression: {
              callee: { name: expressionName } = {
                name: null,
              },
            } = {
              expression: {
                callee: {
                  name: null,
                },
              },
            },
          } = node;
          const isReactHook = expressionName?.slice(0, 3) === 'use';

          if (isReactHook && !reactHooksList.includes(expressionName)) {
            return pushHookOrderElement('customHooks', node);
          }

          expressionName && groups.includes(expressionName) && pushHookOrderElement(expressionName, node);
        },

        'Program:exit': () => {
          const matchingHooks = [...orderHooks].filter(([hook]) => groups.includes(hook));

          const orderHooksCorrect = [...matchingHooks].sort(
            ([prevElement], [nextElement]) => groups.indexOf(prevElement) - groups.indexOf(nextElement),
          );

          if (orderHooksCorrect.length < 1) {
            return;
          }

          let reportElement = null;

          const availableHooksList = orderHooksCorrect
            .map(([hookName]) => hookName)
            .reduce((accumulation, value) => {
              !accumulation.includes(value) && accumulation.push(value);

              return accumulation;
            }, []);

          matchingHooks.filter(([checkingHook, hookNode], index) => {
            const sourceCode = context.getSourceCode();
            const [orderHookElement] = orderHooksCorrect[index];
            const replacingCode = orderHooksCorrect.map(hook => sourceCode.getText(hook[1]));
            const nextHookIndex = availableHooksList.indexOf(checkingHook) + 1;
            const nextHookName = availableHooksList[nextHookIndex];
            const isMatchCheckingHook = orderHookElement !== checkingHook;

            reportElement = isMatchCheckingHook
              ? {
                  fix: fixer =>
                    [...matchingHooks].map(([_, { range }], index) =>
                      fixer.replaceTextRange(range, replacingCode[index]),
                    ),
                  message: `Non-matching declaration order. ${checkingHook} comes before ${nextHookName}.`,
                  node: hookNode,
                }
              : reportElement;
          });

          try {
            reportElement && context.report(reportElement);
          } catch (error) {}
        },

        VariableDeclaration: node => {
          const isHasInitType = node.declarations[0]?.init;

          if (checkIsReactElementDeclaration(node) || !isHasInitType) {
            return;
          }

          const {
            declarations: [
              {
                init: {
                  type,
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
          const isArrowFunction = type === 'ArrowFunctionExpression';
          const isReactHook = declarationName?.slice(0, 3) === 'use';

          if (isReactHook) {
            return pushHookOrderElement(declarationName, node, endLine);
          }

          return isArrowFunction && pushHookOrderElement('methods', node);
        },
      };
    },
  },
};
