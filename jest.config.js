module.exports = {
  preset: 'ts-jest',
  testPathIgnorePatterns: ['dist', 'node_modules'],
  globals: {
    'ts-jest': {
      tsConfig: '',
    },
  },
};
