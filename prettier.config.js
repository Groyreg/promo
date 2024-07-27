module.exports = {
  arrowParens: 'avoid',
  bracketSpacing: true,
  jsxSingleQuote: false,
  overrides: [
    {
      files: ['*.html'],
      options: {
        parser: 'html',
      },
    },
    {
      files: ['*.js', '*.cjs', '*.mjs'],
      options: {
        parser: 'flow',
      },
    },

    {
      files: '*.ts',
      options: {
        parser: 'typescript',
      },
    },

    {
      files: ['*.json', '*.jsonc', '.babelrc', '.prettierrc', '.eslintrc', '.stylelintrc'],
      options: {
        parser: 'json',
      },
    },
  ],
  parser: 'typescript',
  printWidth: 120,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
};
