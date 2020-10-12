module.exports = {
    extends: ["eslint:recommended", "plugin:prettier/recommended", "plugin:jest/recommended",],
    env: {
        jest: true,
    },
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module",
    },
    rules: {
        'indent': ['error', 4]
    },
    globals: {
        window: true,
        document: true,
        module: true,
    }
};
