/** @type { import("eslint").Linter.Config } */
module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:unicorn/all",
    "plugin:@typescript-eslint/recommended",
    "plugin:svelte/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier"],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2020,
    extraFileExtensions: [".svelte"],
  },
  env: {
    browser: true,
    es2017: true,
    node: true,
  },
  overrides: [
    {
      files: ["*.svelte"],
      parser: "svelte-eslint-parser",
      parserOptions: { parser: "@typescript-eslint/parser" },
    },
  ],
  rules: {
    "unicorn/no-null": ["off"],
    "unicorn/filename-case": ["off"],
    "unicorn/prefer-module": ["off"],
    "unicorn/prefer-includes": ["off"],
    "unicorn/no-array-reduce": ["off"],
    "unicorn/new-for-builtins": ["off"],
    "unicorn/prefer-node-protocol": ["off"],
    "unicorn/numeric-separators-style": ["warn"],
    "unicorn/no-object-as-default-parameter": ["off"],
    "unicorn/no-keyword-prefix": [
      "error",
      { disallowedPrefixes: ["new", "for"] },
    ],
    "unicorn/consistent-function-scoping": [
      "off",
      { checkArrowFunctions: false },
    ],
    "unicorn/prefer-top-level-await": ["off"],
    "unicorn/prefer-event-target": ["off"],
    "unicorn/prevent-abbreviations": [
      "error",
      {
        checkFilenames: false,
        allowList: {
          ProcessEnv: true,
          ImportMetaEnv: true,
          Props: true,
          Env: true,
        },
      },
    ],
    "import/no-anonymous-default-export": ["off"],
    "no-unused-vars": ["off"],
    "@typescript-eslint/no-unused-vars": ["off"],
    "array-element-newline": ["error", "consistent"],
    "object-curly-spacing": ["error", "always"],
    "prettier/prettier": [
      "warn",
      {},
      {
        usePrettierrc: true,
        fileInfoOptions: { withNodeModules: true },
      },
    ],
    "no-ex-assign": ["off"],
    "no-mixed-operators": ["off"],
    "no-multiple-empty-lines": ["off"],
    "no-unexpected-multiline": ["off"],
    "@typescript-eslint/triple-slash-reference": ["off"],
    "@typescript-eslint/no-var-requires": ["off"],
    "@typescript-eslint/no-explicit-any": ["off"],
    "@typescript-eslint/prefer-namespace-keyword": ["off"],
    "@typescript-eslint/no-empty-interface": ["off"],
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      { prefer: "type-imports", fixStyle: "inline-type-imports" },
    ],
    "@typescript-eslint/ban-ts-comment": ["off"],
    "@typescript-eslint/ban-types": [
      "warn",
      {
        types: {
          "{}": false,
          String: { message: "Use string instead", fixWith: "string" },
        },
      },
    ],
  },
};
