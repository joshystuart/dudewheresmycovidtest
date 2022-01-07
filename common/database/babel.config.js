// eslint-disable-next-line @typescript-eslint/no-var-requires
const { plugins, presets } = require('../../babel.config');

module.exports = {
  ignore: ['**/*.spec.ts'],
  plugins,
  presets,
};
