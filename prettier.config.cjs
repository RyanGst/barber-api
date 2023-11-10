/** @typedef  {import("prettier").Config} PrettierConfig */

/** @type { PrettierConfig | SortImportsConfig } */
const config = {
    arrowParens: "always",
    printWidth: 120,
    singleQuote: false,
    semi: true,
    trailingComma: "all",
    tabWidth: 2,
};

module.exports = config;