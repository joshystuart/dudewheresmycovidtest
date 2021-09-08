module.exports = {
  ignore: ['**/*.spec.ts'],
  plugins: [['@babel/plugin-proposal-decorators', { legacy: true }]],
  presets: [['@rafterjs/babel-preset-rafter', { typescript: true }]],
};
