module.exports = {
  setupFilesAfterEnv: [
    './__tests__/utils/jest.setup.js',
  ],
  testPathIgnorePatterns: [
    'node_modules',
    './__tests__/utils',
  ],
};
