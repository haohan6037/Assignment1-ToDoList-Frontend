// todolist_frontend/jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [
    'node_modules/(?!(react-router-dom|react-router)/)'
  ],
};
