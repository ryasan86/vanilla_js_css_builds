// eslint-disable-next-line no-undef
module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: 'eslint:recommended',
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module'
    },
    rules: {
        'no-unused-vars': [
            'warn',
            { vars: 'all', args: 'after-used', ignoreRestSiblings: false }
        ],
        'no-prototype-builtins': 0,
        'no-inner-declarations': 0
    }
};
