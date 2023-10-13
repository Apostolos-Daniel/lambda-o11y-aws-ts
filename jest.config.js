module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/*test.ts', '**/test/*test.ts'],
  automock: false,
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  }
};
