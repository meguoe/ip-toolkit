module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
    es2022: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['import', '@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  rules: {
    indent: ['error', 2],
    camelcase: ['error', { properties: 'always' }],

    'no-var': 'error',
    'no-void': 'error',
    'prefer-template': 'error',
    'block-scoped-var': 'error',
    'linebreak-style': ['error', 'unix'],
    'no-multi-spaces': ['error'],
    'no-empty': ['error', { allowEmptyCatch: true }],
    'no-restricted-syntax': ['error', 'LabeledStatement', 'WithStatement'],
    'no-trailing-spaces': ['error', { skipBlankLines: true, ignoreComments: true }],
    'prefer-const': ['warn', { destructuring: 'all', ignoreReadBeforeAssign: true }],
    'object-shorthand': ['error', 'always', { ignoreConstructors: false, avoidQuotes: true }],
    'no-constant-condition': ['error', { checkLoops: false }],
    'no-multiple-empty-lines': ['error', { max: 1 }],
    
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    'quote-props': ['error', 'as-needed'],
    'keyword-spacing': ['error', {
      before: true,
      after: true
    }],
    'key-spacing': ['error', {
      beforeColon: false,
      afterColon: true
    }],
    'space-before-function-paren': ['error', {
      anonymous: 'never',
      named: 'never',
      asyncArrow: 'always'
    }],
    'spaced-comment': ['error', 'always'],
    'object-curly-spacing': ['error', 'always'],
    'block-spacing': ['error', 'always'],
    'space-in-parens': ['error', 'never'],
    'space-before-blocks': ['error', 'always'],
    'space-unary-ops': 'error',
    'func-call-spacing': ['error', 'never'],
    'arrow-spacing': 'error',
    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': 'error',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/array-type': 'error',
    '@typescript-eslint/no-inferrable-types': 'error',
    '@typescript-eslint/adjacent-overload-signatures': 'error',
    '@typescript-eslint/consistent-indexed-object-style': 'error',
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    '@typescript-eslint/no-confusing-non-null-assertion': 'error',
    '@typescript-eslint/no-duplicate-enum-values': 'error',
    '@typescript-eslint/no-empty-interface': 'error',
    '@typescript-eslint/no-for-in-array': 'error',
    '@typescript-eslint/no-invalid-void-type': 'error',
    '@typescript-eslint/no-misused-new': 'error',
    '@typescript-eslint/no-require-imports': 'error',
    '@typescript-eslint/no-this-alias': 'error',
    '@typescript-eslint/no-var-requires': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/type-annotation-spacing': ['error', {
      before: false,
      after: true
    }]
  },
};
