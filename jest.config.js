/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  clearMocks: true,
  preset: "ts-jest",
  testEnvironment: "node",
  coverageProvider: "v8",
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],
  roots: ["<rootDir>/dist", "<rootDir>/src"],
  testMatch: ["<rootDir>/dist/__test__/*.test.js","<rootDir>/src/__test__/*.test.js"],
};
