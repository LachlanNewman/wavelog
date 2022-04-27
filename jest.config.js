module.exports = {
  preset: 'ts-jest',
  bail: true,
  verbose: true,
  testEnvironment: 'node',
  collectCoverage: false,
  testMatch: ['**/**/*.test.ts'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  collectCoverageFrom: ['<rootDir>/src/**', '!<rootDir>/src/index.ts'],
  coveragePathIgnorePatterns: ['<rootDir>/node_modules'],
};
