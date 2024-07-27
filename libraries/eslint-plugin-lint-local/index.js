const hooksRule = require('./rules/group-hooks');
const typesControl = require('./rules/types-control');
const codeStyleRules = require('./rules/code-style');
const { mergeObjects } = require('./utils/mergeObjects');

module.exports = {
  meta: {
    fixable: 'code',
  },
  rules: mergeObjects([hooksRule, typesControl, codeStyleRules]),
};
