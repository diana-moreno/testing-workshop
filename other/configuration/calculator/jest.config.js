module.exports = {
  // en node no existe document, tendremos error
  // testEnvironment: 'node',
  moduleNameMapper: {
    '\\.module\\.scc$': 'identity-obj-proxy',
    '\\.css$': require.resolve('./test/style-mock'),
  },
  // coverageDirectory: '../coverage',
  testURL: 'http://localhost/',
  collectCoverageFrom: [
    '**/src/**/*.js',
    '!**/__tests__/**',
    '!**/node_modules/**',
  ],
}
