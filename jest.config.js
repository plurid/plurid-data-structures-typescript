module.exports = {
    transform: {
        '.(ts|tsx)': 'ts-jest'
    },
    testRegex: '(/__specs__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
    moduleFileExtensions: [
        'ts',
        'tsx',
        'js'
    ],
    testPathIgnorePatterns: [
        '/node_modules/',
        '/fixtures/',
    ],
    collectCoverage: true,
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '/fixtures/',
        '/dist/'
    ],
    coverageThreshold: {
        global: {
            branches: 0,
            functions: 0,
            lines: 0,
            statements: 0
        }
        // global: {
        //     branches: 90,
        //     functions: 95,
        //     lines: 95,
        //     statements: 95
        // }
    },
    collectCoverageFrom: [
        'src/*.{js,ts}'
    ]
}
