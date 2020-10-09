module.exports = {
    extends: ["eslint:recommended", "plugin:prettier/recommended", 'plugin:react/recommended',],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module",
    },
    plugins: [
        'react',
    ],
    rules: {
        'indent': ['error', 4],
        'react/prop-types': ['off'],
    },
    globals: {
        window: true
    }
};
