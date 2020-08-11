module.exports = {
  verbose: true,
  collectCoverageFrom: ['src/**/*.[jt]s?(x)', '!src/**/*.stories.[jt]s?(x)'],
  coverageReporters: ['text', 'text-summary', 'html', 'json', 'lcovonly'],
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
  },
  setupTestFrameworkScriptFile: '<rootDir>src/__testutil__/setup.js',
};
