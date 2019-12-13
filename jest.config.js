module.exports = {
  setupFilesAfterEnv: [
    './__tests__/utils/jest.setup.js',
  ],
  testPathIgnorePatterns: [
    'node_modules',
    './__tests__/factories',
    './__tests__/utils',
  ],
};
