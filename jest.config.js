module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts?$': ['ts-jest', {
      tsconfig: 'tsconfig.json',
      diagnoseCodes: true
    }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testPathIgnorePatterns: [
    "/dist/",
    "/node_modules/"
  ],
};
