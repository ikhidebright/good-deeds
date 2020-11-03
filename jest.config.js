module.exports = {
    verbose: true,
    moduleFileExtensions: ['js'],
    collectCoverage: true,
    "collectCoverageFrom": [
        "**/*.{js}",
        "!**/node_modules/**",
        "!**/vendor/**"
    ],
    testMatch: [ "**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)" ],
    coverageDirectory: "<rootDir>/tests/coverage"
};