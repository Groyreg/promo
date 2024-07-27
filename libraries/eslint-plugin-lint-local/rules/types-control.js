const {
  checkIsTestFile
} = require('../helpers');

module.exports = {
  'no-literal-types': {
    create: (context) => {
      if (checkIsTestFile(context)) {
        return {}; // Для оптимизации, чтобы проверялись только React компоненты
      }

      return {
        VariableDeclaration: (node) => {
          const isLiteralType = node?.declarations?.[0]?.init?.typeParameters?.params?.[0]?.type === 'TSTypeLiteral';

          isLiteralType && context.report({
            node,
            message: 'No literal types',
          })
        }
      }
    }
  },
  'hooks-typings': {
    create: (context) => {
      if (checkIsTestFile(context)) {
        return {}; // Для оптимизации, чтобы проверялись только React компоненты
      }

      const checkUseStateIncludingType = (node) => {
        const isHasNodeType = node?.declarations?.[0]?.init?.typeParameters;

        !isHasNodeType && context.report({
          node,
          message: 'useState hook should been with type',
        });
      }

      return {
        VariableDeclaration: (node) => {
          const calleeName = node?.declarations[0]?.init?.callee?.name;

          if (!calleeName) {
            return;
          }

          if (calleeName === 'useState' || calleeName === 'useRef') {
            checkUseStateIncludingType(node);
          }
        }
      }
    }
  },
  'no-nested-interfaces': {
    create: (context) => {
      if (checkIsTestFile(context)) {
        return {}; // Для оптимизации, чтобы проверялись только React компоненты
      }

      const [{
        maxNestedKeys = null,
      } = {
          maxNestedKeys: null,
        }] = context.options;

      return {
        TSInterfaceDeclaration: (node) => {
          node.body.body.filter((nodeBodyElement) => {
            let isError = false;
            const isLiteralType = nodeBodyElement.typeAnnotation.typeAnnotation.type === 'TSTypeLiteral';
            const keysInsideInterface = nodeBodyElement.typeAnnotation.typeAnnotation.members?.length;

            if (isLiteralType) {
              if (maxNestedKeys && keysInsideInterface <= maxNestedKeys) {
                return;
              }

              isError = true;
            }

            if (isError) {
              context.report({
                node,
                message: 'No nested interface keys, you should use custom type or interface',
              });
            }
          })
        }
      };
    }
  }
}