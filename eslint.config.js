const {
    defineConfig,
    globalIgnores,
} = require("eslint/config");

const globals = require("globals");
const tsParser = require("@typescript-eslint/parser");
const _import = require("eslint-plugin-import");
const typescriptEslint = require("@typescript-eslint/eslint-plugin");

const {
    fixupPluginRules,
} = require("@eslint/compat");

const js = require("@eslint/js");

const {
    FlatCompat,
} = require("@eslint/eslintrc");

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

module.exports = defineConfig([{
    languageOptions: {
        globals: {
            ...globals.node,
            ...globals.jest,
        },

        parser: tsParser,
        ecmaVersion: 2022,
        sourceType: "module",
        parserOptions: {},
    },

    plugins: {
        import: fixupPluginRules(_import),
        "@typescript-eslint": typescriptEslint,
    },

    extends: compat.extends("eslint:recommended", "plugin:@typescript-eslint/recommended"),

    rules: {
        indent: ["error", 2],

        camelcase: ["error", {
            properties: "always",
        }],

        "no-var": "error",
        "no-void": "error",
        "prefer-template": "error",
        "block-scoped-var": "error",
        "linebreak-style": ["error", "unix"],
        "no-multi-spaces": ["error"],

        "no-empty": ["error", {
            allowEmptyCatch: true,
        }],

        "no-restricted-syntax": ["error", "LabeledStatement", "WithStatement"],

        "no-trailing-spaces": ["error", {
            skipBlankLines: true,
            ignoreComments: true,
        }],

        "prefer-const": ["warn", {
            destructuring: "all",
            ignoreReadBeforeAssign: true,
        }],

        "object-shorthand": ["error", "always", {
            ignoreConstructors: false,
            avoidQuotes: true,
        }],

        "no-constant-condition": ["error", {
            checkLoops: false,
        }],

        "no-multiple-empty-lines": ["error", {
            max: 1,
        }],

        "space-infix-ops": ["error", {
            int32Hint: false,
        }],

        semi: ["error", "always"],
        quotes: ["error", "single"],
        "quote-props": ["error", "as-needed"],

        "keyword-spacing": ["error", {
            before: true,
            after: true,
        }],

        "key-spacing": ["error", {
            beforeColon: false,
            afterColon: true,
        }],

        "space-before-function-paren": ["error", {
            anonymous: "never",
            named: "never",
            asyncArrow: "always",
        }],

        "spaced-comment": ["error", "always"],
        "object-curly-spacing": ["error", "always"],
        "block-spacing": ["error", "always"],
        "space-in-parens": ["error", "never"],
        "space-before-blocks": ["error", "always"],
        "space-unary-ops": "error",
        "func-call-spacing": ["error", "never"],
        "arrow-spacing": "error",
        "no-redeclare": "off",
        "@typescript-eslint/no-redeclare": "error",
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/ban-types": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-non-null-asserted-optional-chain": "off",
        "@typescript-eslint/consistent-type-imports": "error",
        "@typescript-eslint/array-type": "error",
        "@typescript-eslint/no-inferrable-types": "error",
        "@typescript-eslint/adjacent-overload-signatures": "error",
        "@typescript-eslint/consistent-indexed-object-style": "error",
        "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
        "@typescript-eslint/no-confusing-non-null-assertion": "error",
        "@typescript-eslint/no-duplicate-enum-values": "error",
        "@typescript-eslint/no-empty-interface": "error",
        "@typescript-eslint/no-for-in-array": "error",
        "@typescript-eslint/no-invalid-void-type": "error",
        "@typescript-eslint/no-misused-new": "error",
        "@typescript-eslint/no-require-imports": "error",
        "@typescript-eslint/no-this-alias": "error",
        "@typescript-eslint/no-var-requires": "error",
        "no-unused-vars": "off",

        "@typescript-eslint/no-unused-vars": ["error", {
            argsIgnorePattern: "^_",
            varsIgnorePattern: "^_",
        }],
    },
}, globalIgnores([
    "**/*.sh",
    "**/node_modules",
    "**/*.md",
    "**/.idea",
    "**/dist",
    "**/.husky",
    "**/.local",
    "**/babel.config.js",
    "**/jest.config.js",
    "**/commitlint.config.js",
])]);
