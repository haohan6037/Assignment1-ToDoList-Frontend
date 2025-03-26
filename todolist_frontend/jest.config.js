// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-router-dom|react-router)/)',
  ],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
};
