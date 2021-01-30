module.exports = {
  env: {
    browser: true,
  },
  extends: ['react-app', 'prettier', 'prettier/react'],
  parser: 'react-scripts/node_modules/babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['prettier', 'prettier', 'react'],
  rules: {
    'no-console': 'error',
    'react/jsx-filename-extension': [
      'error',
      { extensions: ['.jsx', '.tsx', '.ts', '.js'] },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
        js: 'never',
        jsx: 'never',
      },
    ],
  },
};
