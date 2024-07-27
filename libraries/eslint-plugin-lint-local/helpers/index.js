module.exports = {
  reactHooksList: ['useEffect', 'useState', 'useMemo', 'useContext', 'useReducer', 'useRef', 'useImperativeHandle', 'useLayoutEffect', 'useDebugValue'],

  checkIsReactElementDeclaration: (node) => {
    if (!node) {
      return;
    }

    const reactElementTypes = ['ReactElement', 'ReactNode', 'JSX', 'Element', 'JSX.Element'];
    const returnType = node.hasOwnProperty('declarations')
      ? node.declarations[0]?.init?.returnType
      : node?.returnType;

    const isReactElementType = reactElementTypes.includes(
      returnType?.typeAnnotation?.typeName?.name
    );
    const isReactElementUnionType = returnType?.typeAnnotation?.types?.some((element) => {
      const isDottedNotationType = element?.typeName?.hasOwnProperty('left');

      if (isDottedNotationType) {
        const {
          left: { name: leftName },
          right: { name: rightName },
        } = element.typeName;
        return reactElementTypes.includes(`${leftName}.${rightName}`);
      }

      return reactElementTypes.includes(element?.typeName?.name);
    });

    const isReactElementDeclaration = isReactElementType || isReactElementUnionType;

    return isReactElementDeclaration;
  },

  checkIsTSXExtensionFile: (ctx) => {
    const fileNameWithPath = ctx.getFilename();
    const delimiterFileWithDot = fileNameWithPath.split('.');
    const fileExtension = delimiterFileWithDot[delimiterFileWithDot.length - 1];
    const isSingleExtension = delimiterFileWithDot.length < 3;

    return isSingleExtension && fileExtension === 'tsx';
  },

  checkIsTestFile: (ctx) => {
    const fileNameWithPath = ctx?.getFilename();

    return fileNameWithPath?.indexOf('.test.') > -1;
  },
};
