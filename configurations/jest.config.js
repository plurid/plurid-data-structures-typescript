module.exports = {
    rootDir: '../',
    transform: {
        '.(ts|tsx)': 'ts-jest',
    },
    testEnvironment: 'node',
    testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
    testTimeout: 10000,
    moduleFileExtensions: [
        'ts',
        'tsx',
        'js',
    ],
    collectCoverage: false,
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '/distribution/',
    ],
    coverageThreshold: {
        global: {
            branches: 0,
            functions: 0,
            lines: 0,
            statements: 0,
            // branches: 90,
            // functions: 95,
            // lines: 95,
            // statements: 95
        },
    },
    collectCoverageFrom: [
        'source/*.{js,ts}',
    ],
    moduleDirectories: [
        'node_modules',
        'source',
    ],
    moduleNameMapper: {
        "data/(.*)": "<rootDir>/source/data/$1",
        "libraries/(.*)": "<rootDir>/source/libraries/$1",
        "utilities/(.*)": "<rootDir>/source/utilities/$1",
    },
};
