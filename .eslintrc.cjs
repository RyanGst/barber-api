/** @type {import("eslint").Linter.Config} */
const config = {
    env: {
        es2021: true, // Set the script's environment to ECMAScript 2021
        node: true, // Enable Node.js global variables
    },
    extends: [
        'eslint:recommended', // Use the recommended ESLint rules
        'plugin:@typescript-eslint/recommended', // Use the recommended rules from the @typescript-eslint/eslint-plugin
        'plugin:@typescript-eslint/eslint-recommended', // Adjusts the one from eslint appropriately for TypeScript
        'plugin:import/warnings',
        'plugin:import/typescript', // Enables import plugin to recognize TypeScript files
    ],
    parser: '@typescript-eslint/parser',
    rules: {
        // These off/not-configured-the-way-we-want lint rules we like & opt into
        "@typescript-eslint/no-explicit-any": "error",
        "@typescript-eslint/no-unused-vars": [
            "error",
            {argsIgnorePattern: "^_", destructuredArrayIgnorePattern: "^_"},
        ],
        "@typescript-eslint/consistent-type-imports": [
            "error",
            {prefer: "type-imports", fixStyle: "inline-type-imports"},
        ],
        "import/consistent-type-specifier-style": ["error", "prefer-inline"],

        // These lint rules don't make sense for us but are enabled in the preset configs
        "@typescript-eslint/no-confusing-void-expression": "off",
        "@typescript-eslint/restrict-template-expressions": "off",

        // This rule doesn't seem to be working properly
        "@typescript-eslint/prefer-nullish-coalescing": "off",
    },
};

module.exports = config;