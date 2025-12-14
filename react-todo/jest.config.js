export default {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testMatch: [
        '**/__tests__/**/*.jsx',
        '**/?(*.)+(spec|test).jsx'
    ],
};