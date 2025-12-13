module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
        'jest/globals': true, // Jest globals
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:jest/recommended', // Jest plugin
        'plugin:testing-library/react', // Testing Library plugin
    ],
    parserOptions: {
        ecmaFeatures: {
        jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react', 'jest', 'testing-library'],
    rules: {
        'react/prop-types': 'off',
        'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
    settings: {
        react: {
        version: 'detect',
        },
    },
};