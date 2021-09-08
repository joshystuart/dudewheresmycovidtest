module.exports = {
  extends: ['@rafterjs/eslint-config/typescript'],
  rules: {
    'max-len': ['error', { code: 120, ignoreUrls: true }],
  },
};
