module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/*test.ts', '**/test/*test.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  }
};
